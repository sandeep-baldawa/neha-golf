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
and are marked `verified:false`. The flag is informational and does not affect
the page. Dublin Ranch and Ruby Hill have no `par` recorded, so their over-par
column prints a dash.

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

Only one round currently has it: the EBAL Championship 77 at Dublin Ranch, a
**par 63** (5,079 yards from the tips), which makes that round +14.

Add `par` to other rounds as each course's number is confirmed. Leave it out
rather than guessing.

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

`config.showLeagueMatches` set to `false` hides the EBAL league matches, leaving
only tournaments and championships.

The CIF postseason rows are date windows rather than fixed dates. The NCS site
and date are set at the seeding meeting; NorCal and State depend on advancing.
Replace the window with the real date once each is known.

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

`config.priorityStatusUrl` takes an official U.S. Kids Golf player URL. It is
left empty rather than pointing at a third-party lookup site.

The Fall 2025 Peninsula round is in the log: 80 at San Ramon on 2025-10-25,
first place, which is the finish behind the Level 8 status.

## The development-focus copy

Rendered by `renderDevelopmentFocus()` in `script.js`.

`config.mentionInjury` toggles the sentence about the wrist injury on or off.
Everything else in the section is unchanged either way.

## Round shape — the doubles tracker (local preview only)

A score says what happened; it doesn't say why. Two rounds of 84 can be
fourteen pars and four blow-ups, or eighteen bogeys — different problems with
different fixes.

Add two optional 18-element arrays to any round in `results`:

```js
{date:"2026-09-26", event:"…", tour:"U.S. Kids Golf", score:"84", par:72,
 holePars:[4,4,4,3,5,4,3,4,4, 3,4,5,5,4,4,5,3,4],
 holes:   [4,6,6,3,5,5,3,4,6, 3,5,6,5,4,5,5,5,4]},
```

Both must be present and both must have 18 entries, or the round is skipped.
Nothing else about the round changes — `score` is still what the table shows.

A **Round shape** section then appears, listing birdies, pars, bogeys and
doubles-or-worse per round, plus two derived numbers:

- **Lost** — strokes spent beyond a bogey on the holes that went wrong.
- **Capped** — what the round would have been with every double played as a
  bogey. No extra good shots, just no compounding. The gap between the actual
  average and the capped average is the whole opportunity.

**This section renders only on `file://` and `localhost`.** It is hidden on
nehabaldawa.com the same way the setup checklist is, via `isPreviewHost()`.
It is a coaching number, not a recruiting one.

The metric to watch is **doubles-or-worse per round**. It can go 4 → 3 → 2
while the scoring average sits still, and it moves before the average does.

### Where the doubles come from

A second block breaks the same doubles down by cause rather than count:

- **By hole type** — doubles as a share of par 3s, 4s and 5s *played*. The rate
  is the comparable figure; a raw count just reflects there being more par 4s.
- **Front nine / back nine** — whether they cluster early or late.
- **Immediately after another double** — compounding. One bad hole becoming
  two is a different problem from two unrelated bad holes.
- **Worse than a double** — separates a bad hole from a lost one.
- **Hole numbers** per round, so a card can be pulled up against them.

Seeded with the two rounds that have hole-by-hole cards on file: Monarch Bay
09-26 and San Ramon R2 09-06. Add cards from the JGS or U.S. Kids result page
as they post.

## Things deliberately left off the page

- **The JGS rank number.** The linked profile carries the current ranking.
  Set `config.showJgsRankNumber = true` to publish the number itself.
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

The current build is `2026-08-27k`. Anything else — or no output at all —
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

Recipients live in the secret rather than in the code, since this repository is
public.

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

## Analytics

`config.goatCounterUrl` — paste a GoatCounter endpoint and the script loads;
leave it empty and nothing is tracked at all.

GoatCounter is cookieless, so no consent banner is required. On a site with
this little traffic the pageview count is noise — the useful figure is the
**referrer list**, which shows whether visits came from outreach emails or
from search.

Google Analytics is deliberately not used here: it sets cookies, may require a
consent notice, and would send visitor data about a minor's page to a third
party.

## Publishing

GitHub Pages is already configured via `CNAME`. Netlify, Vercel and Cloudflare
Pages all work with no configuration — there is nothing to build.

If a push does not appear on the live site, check in this order:
Settings → Pages source, then the "pages build and deployment" run in the
Actions tab, then any CDN sitting in front of the domain.
