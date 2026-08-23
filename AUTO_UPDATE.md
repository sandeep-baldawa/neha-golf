# Automatic tournament-result updates

The site now includes a GitHub Actions updater.

## What it checks
- JGANC / BlueGolf public program and leaderboard pages
- U.S. Kids Golf public tour/event/results pages listed in `data/sources.json`

## What it deliberately does NOT scrape
- Junior Golf Scoreboard (JGS)

## Schedule
The GitHub Action runs once each morning and can also be run manually:
`GitHub repository → Actions → Update golf results → Run workflow`

## Safety behavior
- Existing rounds are never silently overwritten.
- An exact date+score already on the site is ignored.
- If an automatically discovered score conflicts with an existing score on the same date,
  it is written to `data/review-needed.json` instead of changing the site.
- Every check is recorded in `data/update-log.json`.

## Adding another U.S. Kids local tour
Edit `data/sources.json` and add its public local-tour URL to `us_kids.tour_urls`.

Example:
```json
"tour_urls": [
  "https://tournaments.uskidsgolf.com/tournaments/local/find-local-tour/284864/bay-area-ca",
  "PASTE-ANOTHER-US-KIDS-LOCAL-TOUR-URL-HERE"
]
```

## First run
After pushing these files:
1. Open the repository's **Actions** tab.
2. Open **Update golf results**.
3. Click **Run workflow**.
4. Review the log.
5. If the result extractor sees anything ambiguous, inspect `data/review-needed.json`.

GitHub Pages will redeploy automatically whenever the updater commits a new score.
