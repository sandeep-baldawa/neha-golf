# Automatic tournament-result updates

A GitHub Action checks public result pages each morning and commits any newly
posted rounds.

## What it checks

- JGANC / BlueGolf public program and leaderboard pages
- U.S. Kids Golf public tour/event/results pages listed in `data/sources.json`

## What it deliberately does not scrape

- Junior Golf Scoreboard (JGS)

## Schedule

`.github/workflows/update-results.yml` runs daily at 13:10 UTC (about 6:10 AM
Pacific) and can be run by hand:
**GitHub repository → Actions → Update golf results → Run workflow**

## Safety behaviour

- Existing rounds are never silently overwritten.
- An exact date + score already on the site is ignored.
- A discovered score that conflicts with an existing score on the same date is
  written to `data/review-needed.json` instead of changing the site.
- If the parser reads zero existing rounds out of `script.js`, the run aborts
  rather than re-importing the entire log as duplicates.
- Every check is recorded in `data/update-log.json`.

## Fixes in this version

- **Single-day events no longer crash the date parser.** The single-date branch
  referenced a capture group that does not exist, so any one-round event raised
  an `IndexError` and the whole run failed.
- **Rows with optional fields are now recognised.** The old parser matched a
  fixed field order, so a round carrying `tees`, `yardage` or `finish` looked
  like it was not on the site, and the updater would re-add it as a duplicate.
- **Scraped event titles are escaped for angle brackets.** Titles come from
  third-party pages and are written into `script.js`, then rendered into the
  DOM. They are now escaped both on write and on render.

## Adding another U.S. Kids local tour

Edit `data/sources.json` and add its public local-tour URL to
`us_kids.tour_urls`:

```json
"tour_urls": [
  "https://tournaments.uskidsgolf.com/tournaments/local/find-local-tour/284864/bay-area-ca",
  "PASTE-ANOTHER-US-KIDS-LOCAL-TOUR-URL-HERE"
]
```

## First run

1. Push these files.
2. Open the repository's **Actions** tab.
3. Open **Update golf results** and click **Run workflow**.
4. Check the log line `Existing rounds on site:` — it should read 58, not 0.
5. If anything looked ambiguous, inspect `data/review-needed.json`.

GitHub Pages redeploys automatically whenever the updater commits a new score.
