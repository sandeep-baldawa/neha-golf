# Neha Baldawa — junior golf recruiting profile

Static site, no build step. Open `index.html` in a browser to preview.

- `index.html` — page structure
- `styles.css` — visual design
- `script.js` — **the config block plus every tournament round**
- `scripts/update-results.py` — daily results checker
- `.github/workflows/update-results.yml` — runs the checker

## Everything you edit lives at the top of `script.js`

There are no placeholders in the markup any more. Sections read their content
from the `config` object, and **a section with nothing in it hides itself**
rather than showing "Add link here" to a college coach.

Open the page from `file://` or `localhost` and a checklist banner appears at
the top listing what is still missing. That banner never renders on
nehabaldawa.com, so an unfinished item is invisible to visitors but impossible
for you to forget.

## Before sending the URL to any coach

1. **`config.recruitingEmail`** — until this is set, the whole Contact section
   and its nav link are hidden, and a coach has no way to reply. Use a
   parent-monitored address. Do not publish a phone number or home address.
2. **`config.videos`** — at least one swing video. Face-on and down-the-line,
   driver and iron. An unlisted YouTube link is fine.
3. **`config.jgsProfileUrl` / `config.tugrProfileUrl`** — these currently point
   at the JGS and TUGR homepages, which is useless to a coach. Point them at
   Neha's own profile pages.
4. **`config.resumeUrl`** — a one-page PDF. The page prints cleanly to PDF
   already (Cmd-P), which is a reasonable starting point.
5. **`config.heightFtIn` and `config.driverCarryYds`** — both are standard
   questions and both are blank.
6. **`preview.png`** — a 1200×630 image in the repo root. The Open Graph tags
   in `index.html` reference it, so without it a link texted to a coach shows a
   blank preview card.

## High school matches are 9 holes and live in their own array

`matches` in `script.js` holds the EBAL match scores. They are deliberately
separate from `results`: a 9-hole 38 is not comparable to an 18-hole 79, so
they never enter the 18-hole averages, the career low, or either chart.

Match dates came from Google Photos, but those turned out to be **sync times,
not play dates** — three of the four land on a Sunday, which EBAL match play
does not. Each row therefore carries `datePrecision:"month"`, so the page prints
only "Sep 2025" while still using the full date to sort. Nothing on the site
claims a day it cannot support.

The 2026-08-26 round at Dublin Ranch is an exact date read off the card, so it
carries no `datePrecision` and displays in full. The 2025 values are Ruby Hill
09-09, Crow Canyon 09-14, Dublin Ranch 09-21, Bridges 09-28. If you confirm a real match date, replace it and delete
that row's `datePrecision` key — the exact date will then display.

`date` is optional on a match row. A row without one still renders and still
counts toward the match average; it just prints a dash in the date column.

Two of the four scores came from spreadsheet tab names rather than a scorecard
and are marked `verified:false`. That flag is informational only — it does not
affect the page and the checklist does not nag about it. Dublin Ranch and Ruby
Hill have no `par` recorded, so their over-par column prints a dash.

## Rounds needing verification against official results

- **2025-08-17, Shoreline Golf Links, 92.** Probably round 2 of the Mountain
  View Junior Series #4, which shows on 8/16. Confirm and merge the event name.
- Three rounds were entered twice under two different event names and have been
  merged: 2025-08-06 (87) and 2025-08-07 (91) at Bay View / Srixon Cup Series #3,
  and 2025-08-16 (89) at Shoreline / Mountain View Series #4. The vaguer entry
  was dropped in each case. The front end also collapses any future duplicate
  by date and score and logs a console warning.

The site now shows **57 counting rounds**. It previously showed 61 rows, which
inflated the round count and skewed every average.

## Course par is optional and shown inline

An 18-hole round may carry a `par`. When it does, the score cell shows the round
to par underneath the score; when it doesn't, the cell looks exactly as before.
No column of dashes.

Only one round currently has it: the EBAL Championship 77 at Dublin Ranch, which
is a **par 63** — eleven par 3s, five par 4s, two par 5s, 5,079 yards from the
tips. That 77 is therefore +14, while the 77 at NCS Windsor a month later was on
a full-length course. The two are not equivalent rounds, and the career-low
highlight card now leads with Windsor for that reason.

Add `par` to other rounds as you confirm each course's number. Do not guess it —
a wrong par is worse than no par, because it silently misrepresents the round.

## Adding an upcoming event

`schedule` in `script.js`. Each entry has a `sortDate` (ISO, the first day of
the event) and a `date` (the display string). The list sorts itself by
`sortDate`, so paste a new entry anywhere:

```js
{sortDate:"2026-10-10", date:"Oct 10, 2026", event:"Peninsula Fall Local Tour",
 tour:"U.S. Kids Golf", venue:"Shoreline Golf Links, Mountain View", status:"Registered"},
```

One entry per event. U.S. Kids local-tour stops on back-to-back days are
separate events with their own registrations, so they get separate rows; only
genuine multi-day tournaments use a date range in `date`.

## Adding a round by hand

Add an object anywhere in the `results` array in `script.js` — sort order is
handled for you:

```js
{date:"2026-09-05", event:"San Ramon Junior Series #2", tour:"JGANC", score:"82",
 tees:"White", yardage:"5340", finish:"T4", notes:"Round 1"},
```

`date`, `event`, `tour` and `score` are required. `tees`, `yardage` and
`finish` are optional and print a dash when absent — always better than a guess.

A trailing `*` on a score marks an incomplete round: it stays visible in the
table and is excluded from every average and chart.

**Add tees and yardage going forward.** A 79 from 5,200 yards and a 79 from
5,900 read very differently to a coach, and right now only two rounds carry
that context.

## U.S. Kids priority status and tour finishes

`config.priorityStatus` and `config.tourFinishes` drive two highlight cards and
one profile row. Set `priorityStatus.level` to `""` to hide the card.

`config.priorityStatusUrl` is intentionally empty. Her status is listed on
juniorgolfstatus.com, but that is a third-party lookup site that wraps a minor's
profile in coach-referral listings, an AI product upsell and an "Add to
Watchlist" button. Only put an official U.S. Kids Golf player URL here.

Open question: the Level 8 status came from a 1st place on the Peninsula Local
Tour in Fall 2025, but the results log has no U.S. Kids rounds in that window.
Few events were played that season, so the standing may rest on a small number
of starts. If any Fall 2025 U.S. Kids rounds are missing from `results`, add
them — a coach reading "1st place, Peninsula Fall 2025" will look for them.

## Things deliberately left off the page

- **The JGS rank number.** A rank in the thousands argues against her; the
  linked profile lets a coach look it up if they want it. Set
  `config.showJgsRankNumber = true` to publish it.
- **Advisor names for the ISEF project.** The academics section describes two
  university biomechanics faculty advisors without naming them. Add names only
  with their permission.
- **Phone number, home address, daily schedule.** Standard practice for a
  minor's public page.

School name and city are published. That is a judgment call worth revisiting as
a family; a coach can find the school from any tournament result anyway.

## Build stamp — how to tell which version is live

`index.html` carries a build id in three places: a `<meta name="build">` tag,
the footer, and a `?v=` query on the CSS and JS links. Bump all four
occurrences whenever you deploy something you need to confirm went out.

The `?v=` query matters most: without it, a browser that already has
`script.js` cached will keep running the old one even after the new HTML
lands, which looks exactly like a failed deploy.

To check what is actually being served, ignoring every cache in between:

```
curl -s https://nehabaldawa.com/ | grep 'name="build"'
```

The current build is `2026-08-27e`. Anything else — or no output at all —
means the deploy has not reached the origin yet.

## If a section of the page looks empty

Each section renders inside its own try/catch, so one bad data row can only
blank that section rather than everything after it. Open the browser console —
a failure logs as `Failed to render <section>:` with the underlying error.

The charts scale to their container via the SVG viewBox. They do not use a fixed
pixel width, and there is no horizontal scroll. On screens under 700px wide they
switch to a narrower, taller viewBox so the axis labels stay legible after
downscaling, and they redraw on rotation.

## Tournament reminder emails

`.github/workflows/event-reminders.yml` runs `scripts/send-reminders.py` daily
at 15:00 UTC (about 8:00 AM Pacific) and emails a reminder when an event is a
few days out. It reads the same `schedule` array the site renders, so adding an
event to the site schedules its reminder too.

Set these as repository secrets (Settings -> Secrets and variables -> Actions):

| Secret | Value |
| --- | --- |
| `MAIL_SERVER` | `smtp.gmail.com` |
| `MAIL_PORT` | `587` |
| `MAIL_USERNAME` | the sending Gmail address |
| `MAIL_PASSWORD` | a Gmail **app password**, not the account password |
| `MAIL_TO` | `sandeepbaldawa@gmail.com,ruchita.rathi@gmail.com,nehabaldawa2020@gmail.com` |

Recipients live in the secret, not in the code. This repository is public, and
committed email addresses get harvested by scrapers.

A Gmail app password requires 2-Step Verification on the account, then
Google Account -> Security -> App passwords. Never commit it.

Lead times default to **3 days and 1 day** before each event. To change that,
add a repository **variable** (not a secret) named `LEAD_DAYS` — for example
`5,2,1`.

To test without sending anything, run it locally with no credentials set — it
prints the email it would have sent instead:

```
python3 scripts/send-reminders.py
```

## Publishing

GitHub Pages is already configured via `CNAME`. Netlify, Vercel and Cloudflare
Pages all work with no configuration — there is nothing to build.

If a push does not appear on the live site, check in this order:
Settings → Pages source, then the "pages build and deployment" run in the
Actions tab, then any CDN sitting in front of the domain.
