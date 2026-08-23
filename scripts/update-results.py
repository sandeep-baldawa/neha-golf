#!/usr/bin/env python3
"""
Neha golf results updater.

Reads public tournament result pages and safely merges newly posted scores
into the `const results = [...]` array in script.js.

Important:
- JGS is intentionally NOT scraped.
- Existing rows are never overwritten automatically.
- Ambiguous/conflicting results go to data/review-needed.json.
"""

from __future__ import annotations

import json
import re
import sys
from dataclasses import dataclass, asdict
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
SCRIPT_JS = ROOT / "script.js"
SOURCES_JSON = ROOT / "data" / "sources.json"
LOG_JSON = ROOT / "data" / "update-log.json"
REVIEW_JSON = ROOT / "data" / "review-needed.json"

UA = "NehaGolfProfileUpdater/1.0 (+GitHub Pages personal recruiting profile)"
TIMEOUT = 25


@dataclass(frozen=True)
class Round:
    date: str
    event: str
    tour: str
    score: int
    notes: str
    source_url: str


def get(url: str) -> tuple[str, str]:
    r = requests.get(
        url,
        timeout=TIMEOUT,
        headers={"User-Agent": UA, "Accept-Language": "en-US,en;q=0.9"},
    )
    r.raise_for_status()
    return r.text, r.url


def clean(s: str) -> str:
    return re.sub(r"\s+", " ", s or "").strip()


def player_regex(first: str, last: str):
    return re.compile(rf"\b{re.escape(first)}\b.*\b{re.escape(last)}\b|\b{re.escape(last)}\b.*\b{re.escape(first)}\b", re.I)


def extract_year(text: str, fallback: int | None = None) -> int:
    years = [int(x) for x in re.findall(r"\b(20\d{2})\b", text)]
    if years:
        return max(years)
    return fallback or datetime.now().year


MONTHS = {
    "jan": 1, "january": 1, "feb": 2, "february": 2, "mar": 3, "march": 3,
    "apr": 4, "april": 4, "may": 5, "jun": 6, "june": 6, "jul": 7, "july": 7,
    "aug": 8, "august": 8, "sep": 9, "sept": 9, "september": 9,
    "oct": 10, "october": 10, "nov": 11, "november": 11, "dec": 12, "december": 12,
}


def parse_dates(text: str) -> list[str]:
    """Parse common tournament date strings, including Aug 4-5, 2026."""
    year = extract_year(text)
    out: list[str] = []

    # "Aug 04 - 05, 2026" or "August 4-5 2026"
    rg = re.compile(
        r"\b(" + "|".join(MONTHS.keys()) + r")\.?\s+(\d{1,2})\s*(?:-|–|to)\s*(\d{1,2})(?:,)?\s+(20\d{2})\b",
        re.I,
    )
    for m in rg.finditer(text):
        month = MONTHS[m.group(1).lower()]
        d1, d2, yy = int(m.group(2)), int(m.group(3)), int(m.group(4))
        out.extend([f"{yy:04d}-{month:02d}-{d1:02d}", f"{yy:04d}-{month:02d}-{d2:02d}"])
    if out:
        return sorted(set(out))

    # "Aug 4, 2026"
    rg2 = re.compile(
        r"\b(" + "|".join(MONTHS.keys()) + r")\.?\s+(\d{1,2})(?:,)?\s+(20\d{2})\b",
        re.I,
    )
    for m in rg2.finditer(text):
        month = MONTHS[m.group(1).lower()]
        out.append(f"{int(m.group(4)):04d}-{month:02d}-{int(m.group(2)):02d}")
    return sorted(set(out))


def scores_from_row(row_text: str) -> list[int]:
    """Conservative score extraction from a player row."""
    nums = [int(x) for x in re.findall(r"(?<![\d.])(\d{2,3})(?![\d.])", row_text)]
    # Real 18-hole junior tournament scores. Exclude rankings, yards, totals, years.
    nums = [n for n in nums if 60 <= n <= 130]
    # Remove obvious duplicate consecutive values.
    result = []
    for n in nums:
        if not result or result[-1] != n:
            result.append(n)
    return result


def title_from_soup(soup: BeautifulSoup) -> str:
    for sel in ["h1", "h2", ".event-name", ".tournament-name"]:
        el = soup.select_one(sel)
        if el and clean(el.get_text(" ", strip=True)):
            t = clean(el.get_text(" ", strip=True))
            if "leaderboard" not in t.lower() and "results" not in t.lower():
                return t
    if soup.title:
        return clean(soup.title.get_text(" ", strip=True)).split("|")[0].strip()
    return "Tournament"


def find_player_rows(soup: BeautifulSoup, first: str, last: str):
    rx = player_regex(first, last)
    found = []
    for tr in soup.find_all("tr"):
        txt = clean(tr.get_text(" ", strip=True))
        if rx.search(txt):
            found.append((tr, txt))
    if found:
        return found

    # Some responsive scoreboards use divs instead of tables.
    for node in soup.find_all(string=rx):
        parent = node.parent
        for _ in range(5):
            if not parent:
                break
            txt = clean(parent.get_text(" ", strip=True))
            nums = scores_from_row(txt)
            if nums:
                found.append((parent, txt))
                break
            parent = parent.parent
    return found


def discover_links(page_url: str, html: str, patterns: list[str]) -> list[str]:
    soup = BeautifulSoup(html, "html.parser")
    links = set()
    for a in soup.find_all("a", href=True):
        href = a["href"]
        label = clean(a.get_text(" ", strip=True)).lower()
        hay = (href + " " + label).lower()
        if any(p.lower() in hay for p in patterns):
            links.add(urljoin(page_url, href))
    return sorted(links)


def parse_result_page(url: str, tour: str, first: str, last: str) -> list[Round]:
    html, final_url = get(url)
    soup = BeautifulSoup(html, "html.parser")
    page_text = clean(soup.get_text(" ", strip=True))
    rows = find_player_rows(soup, first, last)
    if not rows:
        return []

    event = title_from_soup(soup)
    dates = parse_dates(page_text)

    rounds: list[Round] = []
    for _, txt in rows:
        scores = scores_from_row(txt)
        if not scores:
            continue

        # Many result rows contain round scores plus a total. If there are 3 values and
        # the last equals the first two combined, drop the total.
        if len(scores) >= 3 and scores[-1] == scores[0] + scores[1]:
            scores = scores[:-1]

        # Cap to four competitive rounds to avoid unrelated numeric fields.
        scores = scores[:4]

        if not dates:
            # We never invent a date. Send to review queue instead.
            continue

        # Match dates to scores in order. For single-day pages use the one date.
        for i, score in enumerate(scores):
            date = dates[min(i, len(dates) - 1)]
            rounds.append(
                Round(
                    date=date,
                    event=event[:140],
                    tour=tour,
                    score=score,
                    notes="Auto-imported from public results",
                    source_url=final_url,
                )
            )
    return rounds


def collect_jganc(cfg, first, last) -> list[Round]:
    if not cfg.get("enabled"):
        return []
    html, final = get(cfg["program_url"])
    # Public BlueGolf program pages expose Leaderboard links after events post.
    links = discover_links(final, html, ["leaderboard", "results"])
    rounds = []
    for url in links:
        try:
            rounds.extend(parse_result_page(url, "JGANC", first, last))
        except Exception as e:
            print(f"[warn] JGANC {url}: {e}", file=sys.stderr)
    return rounds


def collect_us_kids(cfg, first, last) -> list[Round]:
    if not cfg.get("enabled"):
        return []
    candidate_pages = set(cfg.get("extra_event_urls", []))

    for tour_url in cfg.get("tour_urls", []):
        try:
            html, final = get(tour_url)
            # Tour pages expose event links; event pages then expose Results links.
            event_links = discover_links(final, html, ["find-tournament", "results"])
            candidate_pages.update(event_links)
            for ev in event_links:
                try:
                    ev_html, ev_final = get(ev)
                    candidate_pages.update(discover_links(ev_final, ev_html, ["results", "leaderboard"]))
                except Exception as e:
                    print(f"[warn] US Kids event discovery {ev}: {e}", file=sys.stderr)
        except Exception as e:
            print(f"[warn] US Kids tour {tour_url}: {e}", file=sys.stderr)

    rounds = []
    for url in sorted(candidate_pages):
        try:
            rounds.extend(parse_result_page(url, "U.S. Kids Golf", first, last))
        except Exception as e:
            print(f"[warn] US Kids {url}: {e}", file=sys.stderr)
    return rounds


def existing_rounds(js_text: str):
    rg = re.compile(
        r'\{date:"([^"]+)",\s*event:"([^"]+)",\s*tour:"([^"]+)",\s*score:"([^"]+)",\s*notes:"([^"]*)"\}'
    )
    rows = []
    for m in rg.finditer(js_text):
        score_match = re.search(r"\d+", m.group(4))
        if not score_match:
            continue
        rows.append({
            "date": m.group(1),
            "event": m.group(2),
            "tour": m.group(3),
            "score": int(score_match.group()),
            "notes": m.group(5),
        })
    return rows


def js_escape(s: str) -> str:
    return s.replace("\\", "\\\\").replace('"', '\\"')


def insert_rounds(js_text: str, rounds: list[Round]) -> str:
    marker = "const results = [\n"
    pos = js_text.find(marker)
    if pos < 0:
        raise RuntimeError("Could not find results array in script.js")
    insert_at = pos + len(marker)
    block = "".join(
        f'  {{date:"{r.date}", event:"{js_escape(r.event)}", tour:"{js_escape(r.tour)}", '
        f'score:"{r.score}", notes:"{js_escape(r.notes)}"}},\n'
        for r in sorted(rounds, key=lambda x: x.date, reverse=True)
    )
    return js_text[:insert_at] + block + js_text[insert_at:]


def main():
    cfg = json.loads(SOURCES_JSON.read_text())
    first = cfg["player"]["first_name"]
    last = cfg["player"]["last_name"]

    js = SCRIPT_JS.read_text()
    existing = existing_rounds(js)
    exact = {(r["date"], r["score"]) for r in existing}

    discovered = []
    discovered.extend(collect_jganc(cfg["jganc"], first, last))
    discovered.extend(collect_us_kids(cfg["us_kids"], first, last))

    # Deduplicate discovery.
    unique = {}
    for r in discovered:
        unique[(r.date, r.tour, r.score, r.event)] = r
    discovered = list(unique.values())

    additions = []
    review = []
    for r in discovered:
        if (r.date, r.score) in exact:
            continue

        same_date = [x for x in existing if x["date"] == r.date]
        if same_date:
            review.append({
                "reason": "Existing score on same date differs; not overwritten",
                "discovered": asdict(r),
                "existing": same_date,
            })
            continue

        additions.append(r)

    if additions:
        SCRIPT_JS.write_text(insert_rounds(js, additions))

    now = datetime.now(timezone.utc).isoformat()
    old_log = []
    if LOG_JSON.exists():
        try:
            old_log = json.loads(LOG_JSON.read_text())
        except Exception:
            old_log = []
    old_log.append({
        "checked_at": now,
        "discovered_count": len(discovered),
        "added": [asdict(x) for x in additions],
        "review_count": len(review),
    })
    LOG_JSON.write_text(json.dumps(old_log[-100:], indent=2) + "\n")
    REVIEW_JSON.write_text(json.dumps(review, indent=2) + "\n")

    print(f"Discovered: {len(discovered)}")
    print(f"Added: {len(additions)}")
    print(f"Needs review: {len(review)}")


if __name__ == "__main__":
    main()
