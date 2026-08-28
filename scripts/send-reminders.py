#!/usr/bin/env python3
"""
Emails a reminder a few days before each scheduled tournament.

Reads the same `schedule` array in script.js that the website renders, so an
event added to the site is automatically covered — there is no second list to
keep in sync.

Configuration comes from environment variables (set as GitHub repository
secrets, never committed):

  MAIL_SERVER    smtp.gmail.com
  MAIL_PORT      587
  MAIL_USERNAME  the sending account
  MAIL_PASSWORD  an app password, NOT the account password
  MAIL_TO        comma-separated recipients
  LEAD_DAYS      optional, default "3,1" — days before the event to send.
                 A reminder goes out three days out and again the day before.

Recipient addresses live in the MAIL_TO secret rather than in this file: the
repository is public, and committed addresses get scraped.
"""

from __future__ import annotations

import os
import re
import smtplib
import sys
from datetime import date, datetime, timedelta
from email.message import EmailMessage
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPT_JS = ROOT / "script.js"

ROW_RE = re.compile(r"\{\s*sortDate:\s*\"(\d{4}-\d{2}-\d{2})\".*?\}", re.S)
FIELD_RE = re.compile(r"(\w+)\s*:\s*\"((?:[^\"\\]|\\.)*)\"")


def schedule_rows() -> list[dict]:
    text = SCRIPT_JS.read_text()
    start = text.find("const schedule = [")
    if start < 0:
        raise RuntimeError("Could not find the schedule array in script.js")
    end = text.find("\n];", start)
    rows = []
    for match in ROW_RE.finditer(text, start, end):
        fields = dict(FIELD_RE.findall(match.group(0)))
        if "sortDate" in fields:
            rows.append(fields)
    return rows


def due(rows: list[dict], today: date, lead_days: list[int]) -> list[tuple[int, dict]]:
    hits = []
    for row in rows:
        try:
            event_day = datetime.strptime(row["sortDate"], "%Y-%m-%d").date()
        except ValueError:
            continue
        delta = (event_day - today).days
        if delta in lead_days:
            hits.append((delta, row))
    return sorted(hits, key=lambda x: x[0])


def build_message(hits, today: date) -> tuple[str, str]:
    lines = []
    for delta, row in hits:
        when = "tomorrow" if delta == 1 else f"in {delta} days"
        lines.append(f"{row.get('event', 'Event')} — {when}")
        lines.append(f"  Date:  {row.get('date', row['sortDate'])}")
        lines.append(f"  Where: {row.get('venue', 'TBD')}")
        lines.append(f"  Tour:  {row.get('tour', '')}")
        lines.append(f"  Status: {row.get('status', '')}")
        lines.append("")

    first = hits[0][1]
    subject = (
        f"Golf reminder: {first.get('event', 'event')} on {first.get('date', '')}"
        if len(hits) == 1
        else f"Golf reminder: {len(hits)} upcoming events"
    )
    body = (
        f"Upcoming tournaments as of {today:%A, %d %B %Y}:\n\n"
        + "\n".join(lines)
        + "Full schedule: https://nehabaldawa.com/#schedule\n"
    )
    return subject, body


def main() -> int:
    lead_days = [int(x) for x in os.environ.get("LEAD_DAYS", "3,1").split(",") if x.strip()]
    today = date.today()

    rows = schedule_rows()
    if not rows:
        print("No schedule entries parsed from script.js — nothing to do.", file=sys.stderr)
        return 1

    hits = due(rows, today, lead_days)
    print(f"{len(rows)} scheduled events; {len(hits)} due for a reminder today.")
    if not hits:
        return 0

    subject, body = build_message(hits, today)

    recipients = [x.strip() for x in os.environ.get("MAIL_TO", "").split(",") if x.strip()]
    username = os.environ.get("MAIL_USERNAME", "")
    password = os.environ.get("MAIL_PASSWORD", "")
    if not (recipients and username and password):
        print("Mail credentials or recipients missing — printing instead of sending.\n")
        print(subject)
        print(body)
        return 0

    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = username
    msg["To"] = ", ".join(recipients)
    msg.set_content(body)

    server = os.environ.get("MAIL_SERVER", "smtp.gmail.com")
    port = int(os.environ.get("MAIL_PORT", "587"))
    with smtplib.SMTP(server, port) as smtp:
        smtp.starttls()
        smtp.login(username, password)
        smtp.send_message(msg)

    print(f"Sent to {len(recipients)} recipient(s).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
