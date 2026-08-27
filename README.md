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

The current build is `2026-08-26a`. Anything else — or no output at all —
means the deploy has not reached the origin yet.

## Publishing

GitHub Pages is already configured via `CNAME`. Netlify, Vercel and Cloudflare
Pages all work with no configuration — there is nothing to build.

If a push does not appear on the live site, check in this order:
Settings → Pages source, then the "pages build and deployment" run in the
Actions tab, then any CDN sitting in front of the domain.
