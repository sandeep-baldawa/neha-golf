#!/usr/bin/env python3
"""
Neha golf ranking fetcher.

Reads her TUGR and (optionally) Junior Golf Scoreboard figures once a day and
rewrites the RANKINGS block in script.js, keeping a short history so the page
can show movement rather than just today's number.

Design notes, because the failure modes here are nastier than they look:

- TUGR is a client-rendered React app, so the HTML is useless. It talks to an
  unauthenticated JSON API on the same origin, and that is what we call.
- A fetch that fails is survivable: we keep yesterday's numbers and exit 0, so
  one flaky morning does not blank the site or fail the workflow.
- A fetch that *succeeds* but parses to nothing is NOT survivable, because the
  dangerous outcome is silently publishing zeros. That exits non-zero and
  leaves the existing block untouched.
- Nothing here is written to script.js unless at least one source produced a
  usable record.

Usage:
    python3 scripts/fetch-rankings.py --dry-run     # print, change nothing
    python3 scripts/fetch-rankings.py               # write script.js
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import date
from pathlib import Path

import requests

ROOT = Path(__file__).resolve().parents[1]
SCRIPT_JS = ROOT / "script.js"
SOURCES_JSON = ROOT / "data" / "sources.json"

BEGIN = "/* RANKINGS:BEGIN */"
END = "/* RANKINGS:END */"

UA = "NehaGolfProfileUpdater/1.1 (+GitHub Pages personal recruiting profile)"
TIMEOUT = 25
HISTORY_MAX = 400


def fetch_tugr(cfg: dict) -> dict:
    """Return a flat dict of TUGR figures, or {} if the source is unusable.

    The player key splits across two parameters: `player_id` stops at the
    graduation year, and the division travels separately as `category`. The
    profile URL joins them with "||", which is why passing the whole thing as
    player_id returns an error.
    """
    base = cfg.get("api_base", "https://tugr.org/api/plus2").rstrip("/")
    player_id = cfg.get("player_id", "")
    category = cfg.get("category", "JUNIOR_GIRLS")
    if not player_id:
        print("tugr: no player_id configured, skipping")
        return {}

    r = requests.get(
        f"{base}/player",
        params={"player_id": player_id, "category": category},
        headers={"User-Agent": UA, "Accept": "application/json"},
        timeout=TIMEOUT,
    )
    r.raise_for_status()
    p = r.json().get("player")
    if not isinstance(p, dict) or not p:
        raise ValueError(
            f"tugr: /player returned no player object for {player_id!r}. "
            "The key format or the category has probably changed."
        )

    got = str(p.get("player_id", "")).strip().lower()
    if got != player_id.strip().lower():
        raise ValueError(f"tugr: response is for {got!r}, expected {player_id!r}")

    def num(key):
        v = p.get(key)
        return v if isinstance(v, (int, float)) else None

    out = {
        "global": num("ranking_global"),
        "relative_strokes": num("rel_strokes_global"),
        "country": num("ranking_country"),
        "state": num("ranking_state"),
        "county": num("ranking_county"),
        "hometown": num("ranking_hometown"),
        "rounds": num("num_rounds"),
        "competitors_played": num("competitors_played"),
        "competitors_beaten": num("competitors_beat"),
    }
    wr = num("win_rate")
    if wr is not None:
        out["win_rate"] = round(wr * 100, 1)

    out = {k: v for k, v in out.items() if v is not None}
    if not out:
        raise ValueError("tugr: player object carried no recognised numbers")
    return out


JGS_HEADERS = {
    "rank overall": "rank_overall",
    "gross scoring average": "gross_scoring_average",
    "class 2028": "class_rank",
    "state overall": "state_rank",
    "state class 2028": "state_class_rank",
    "events": "events",
    "str. of tourn.": "strength_of_tournaments",
    "scoring diff.": "scoring_diff",
    "avg. yd.": "average_yardage",
}


def fetch_jgs(cfg: dict) -> dict:
    """UNVERIFIED as of 2026-11-25. Run --dry-run before enabling."""
    url = cfg.get("profile_url", "")
    if not url:
        print("jgs: no profile_url configured, skipping")
        return {}

    from bs4 import BeautifulSoup

    r = requests.get(url, headers={"User-Agent": UA}, timeout=TIMEOUT)
    r.raise_for_status()
    html = r.text

    surname = cfg.get("surname", "Baldawa")
    if surname.lower() not in html.lower():
        raise ValueError(
            f"jgs: {surname!r} does not appear on the fetched page. "
            "That usually means a login redirect rather than a layout change."
        )

    soup = BeautifulSoup(html, "html.parser")
    out: dict = {}
    for table in soup.find_all("table"):
        rows = table.find_all("tr")
        if len(rows) < 2:
            continue
        headers = [c.get_text(" ", strip=True).lower()
                   for c in rows[0].find_all(["th", "td"])]
        if "scoring diff." not in headers and "rank overall" not in headers:
            continue
        values = [c.get_text(" ", strip=True) for c in rows[1].find_all(["th", "td"])]
        for head, raw in zip(headers, values):
            key = JGS_HEADERS.get(head)
            if not key:
                continue
            m = re.search(r"-?\d+(?:\.\d+)?", raw.replace(",", ""))
            if m:
                out[key] = float(m.group()) if "." in m.group() else int(m.group())
        if out:
            break

    if not out:
        raise ValueError(
            "jgs: fetched the page but parsed no stats table. The page is "
            "probably client-rendered, which needs a headless browser."
        )
    return out


# ---------------------------------------------------------------------------
# Manual JGS entry
# ---------------------------------------------------------------------------

# Junior Golf Scoreboard's player dashboard sits behind a paid subscription, so
# it is not fetched. These figures are typed in from the dashboard instead,
# which in practice means a handful of times a year, after an event posts.
JGS_ALIASES = {
    "rank": "rank_overall",
    "gross": "gross_scoring_average",
    "class": "class_rank",
    "state": "state_rank",
    "state_class": "state_class_rank",
    "events": "events",
    "sot": "strength_of_tournaments",
    "diff": "scoring_diff",
    "yards": "average_yardage",
}

# Light sanity bounds. The point is not validation for its own sake — it is
# that a fat-fingered 1117 instead of 11.17 would publish nonsense to a page
# college coaches read, and there is no review step between here and live.
JGS_BOUNDS = {
    "rank_overall": (1, 100000),
    "class_rank": (1, 100000),
    "state_rank": (1, 100000),
    "state_class_rank": (1, 100000),
    "events": (0, 200),
    "gross_scoring_average": (50, 130),
    "scoring_diff": (0, 60),
    "strength_of_tournaments": (0, 300),
    "average_yardage": (3000, 8000),
}


def parse_set_jgs(pairs: list[str]) -> dict:
    """Turn `diff=11.17 rank=3317` into the stored field names."""
    out: dict = {}
    for pair in pairs:
        if "=" not in pair:
            raise ValueError(f"{pair!r} is not key=value")
        key, _, raw = pair.partition("=")
        key = key.strip().lower()
        field = JGS_ALIASES.get(key)
        if not field:
            raise ValueError(
                f"unknown field {key!r}. Known: " + ", ".join(sorted(JGS_ALIASES))
            )
        raw = raw.strip().replace(",", "")
        try:
            value = float(raw) if "." in raw else int(raw)
        except ValueError:
            raise ValueError(f"{key}={raw!r} is not a number")
        lo, hi = JGS_BOUNDS[field]
        if not (lo <= value <= hi):
            raise ValueError(
                f"{key}={value} is outside the sane range {lo}-{hi}. "
                "Check for a misplaced decimal point."
            )
        out[field] = value
    return out


def read_existing(js: str) -> dict:
    try:
        start = js.index(BEGIN) + len(BEGIN)
        end = js.index(END)
    except ValueError:
        raise RuntimeError(
            "Could not find the RANKINGS markers in script.js. They are what "
            "this script rewrites between — do not remove them."
        )
    m = re.search(r"const rankings\s*=\s*(\{.*\});", js[start:end], re.S)
    if not m:
        return {}
    text = re.sub(r"(\{|,)\s*([A-Za-z_][A-Za-z0-9_]*)\s*:", r'\1"\2":', m.group(1))
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        return {}


def write_block(js: str, data: dict) -> str:
    start = js.index(BEGIN) + len(BEGIN)
    end = js.index(END)
    return js[:start] + "\nconst rankings = " + json.dumps(data, indent=2) + ";\n" + js[end:]


def finish(js: str, merged: dict, history: list, dry_run: bool,
           hard_failures: list) -> int:
    """Append today's history point, then write or print."""
    today = merged["updated"]
    # History carries flat keys so the renderer can look one up by path.
    point = {"date": today}
    for group in ("jgs", "tugr"):
        for key, value in (merged.get(group) or {}).items():
            point[f"{group}.{key}"] = value
    history = [h for h in history if h.get("date") != today]
    history.append(point)
    history.sort(key=lambda h: h.get("date", ""))
    merged["history"] = history[-HISTORY_MAX:]

    if dry_run:
        print(json.dumps(merged, indent=2))
        print("\n--dry-run: script.js not modified")
        return 1 if hard_failures else 0

    SCRIPT_JS.write_text(write_block(js, merged))
    counts = ", ".join(f"{g} ({len(merged.get(g) or {})} fields)"
                       for g in ("jgs", "tugr") if merged.get(g))
    print(f"Wrote rankings for {today}: {counts}")
    print(f"History points: {len(merged['history'])}")
    return 1 if hard_failures else 0


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true",
                    help="print what would be written and change nothing")
    ap.add_argument("--set-jgs", nargs="+", metavar="KEY=VALUE", default=None,
                    help="type JGS figures in by hand, e.g. diff=11.17 gross=86.9 "
                         "rank=3317 class=797 events=10. Skips the network entirely.")
    args = ap.parse_args()

    cfg = json.loads(SOURCES_JSON.read_text()).get("rankings", {})
    if not cfg:
        print("No `rankings` block in data/sources.json — nothing to do.")
        return 0

    js = SCRIPT_JS.read_text()
    previous = read_existing(js)
    history = previous.get("history") or []

    results: dict = {}
    hard_failures: list[str] = []

    if args.set_jgs:
        # Merged over whatever is already stored, so a partial update is fine.
        try:
            typed = parse_set_jgs(args.set_jgs)
        except ValueError as e:
            print(f"jgs: {e}")
            return 2
        results["jgs"] = {**(previous.get("jgs") or {}), **typed}
        print("jgs: set by hand — " + ", ".join(f"{k}={v}" for k, v in typed.items()))
        merged = {
            "updated": date.today().isoformat(),
            "jgs": results["jgs"],
            "tugr": previous.get("tugr", {}),
        }
        return finish(js, merged, previous.get("history") or [], args.dry_run, [])

    for name, fn in (("tugr", fetch_tugr), ("jgs", fetch_jgs)):
        source = cfg.get(name) or {}
        if not source.get("enabled"):
            print(f"{name}: disabled")
            continue
        try:
            results[name] = fn(source)
        except requests.RequestException as e:
            print(f"{name}: fetch failed, keeping previous values ({e})")
        except ValueError as e:
            print(f"{name}: PARSE FAILURE — {e}")
            hard_failures.append(name)

    results = {k: v for k, v in results.items() if v}
    if not results:
        print("No source produced usable figures; script.js left untouched.")
        return 1 if hard_failures else 0

    merged = {
        "updated": date.today().isoformat(),
        "jgs": results.get("jgs", previous.get("jgs", {})),
        "tugr": results.get("tugr", previous.get("tugr", {})),
    }
    return finish(js, merged, history, args.dry_run, hard_failures)


if __name__ == "__main__":
    sys.exit(main())
