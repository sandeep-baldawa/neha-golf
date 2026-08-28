/* ==========================================================================
   Neha Baldawa — junior golf recruiting profile
   --------------------------------------------------------------------------
   EDIT THIS BLOCK, NOT THE MARKUP.
   Anything left as an empty string hides its section rather than showing a
   placeholder. Run the page from a local file or localhost to see which
   fields are still unset.
   ========================================================================== */

const config = {
  // --- Contact ------------------------------------------------------------
  recruitingEmail: "",          // e.g. "neha.golf@example.com" — a parent-monitored address
  emailOwner: "parent-monitored inbox",

  // --- Optional. Each one appears only once it has a value ----------------
  swingVideoUrl: "",            // unlisted YouTube link is fine
  resumeUrl: "",                // one-page PDF in this repo, e.g. "neha-baldawa-golf-resume.pdf"
  jgsProfileUrl: "https://www.juniorgolfscoreboard.com/",
  tugrProfileUrl: "https://www.tugr.org/",
  ncsaProfileUrl: "",

  // Press coverage. Each entry appears in the verification links row.
  press: [
    {label: "NCS girls' golf, 2025", url: "", source: "Pleasanton Weekly"},
  ],

  // --- Player facts -------------------------------------------------------
  gradYear: 2028,
  school: "Foothill High School",
  location: "Pleasanton, California",
  team: "Varsity girls golf",
  handedness: "Right-handed",
  tours: "JGANC • U.S. Kids Golf • CIF high school",
  heightFtIn: "",               // e.g. "5'4\"" — coaches ask
  driverCarryYds: "",           // e.g. "205" — coaches ask

  // --- Academics ----------------------------------------------------------
  gpaUnweighted: "4.00",
  gpaNote: "Unweighted, through sophomore year",
  sat: "1460",
  satNote: "Retaking in the fall",
  coursework: "PLTW Principles of Biomedical Sciences",
  intendedMajor: "Pre-med / sports medicine",

  // --- Videos. Add objects here and the section appears -------------------
  // { title: "Driver, face-on and down-the-line", url: "https://youtu.be/…", note: "Recorded Aug 2026" }
  videos: [],

  // --- Schedule -----------------------------------------------------------
  // false hides EBAL league matches, leaving tournaments and championships.
  showLeagueMatches: true,

  // --- Development focus copy ---------------------------------------------
  // Toggles the wrist-injury sentence on or off.
  mentionInjury: true,

  // --- U.S. Kids Golf priority status -------------------------------------
  // Set level to "" to hide the card entirely.
  priorityStatus: {
    level: "8",
    division: "Girls 15-18",
    valid: "Mar 2026 – Feb 2027",
    // The finish that earned it is listed under tourFinishes below.
  },

  // Season-long local tour finishes. Newest first.
  tourFinishes: [
    {finish: "1st", tour: "Peninsula Local Tour", season: "Fall 2025", division: "Girls 15-18"},
    {finish: "2nd", tour: "San Francisco Local Tour", season: "Spring 2025", division: "Girls 15-18"},
  ],

  // Official U.S. Kids Golf player URL only.
  priorityStatusUrl: "",

  // --- Publish the JGS rank number? ---------------------------------------
  // Off by default. The linked JGS profile carries the current ranking.
  showJgsRankNumber: false,
  jgsRankNumber: "~3,240",
};

/* ==========================================================================
   Tournament results. Newest anywhere in the list is fine — they get sorted.
   Optional fields: tees, yardage, finish, par. Leave out what you do not know;
   the table prints a dash rather than a guess.
   `par` is the 18-hole course par. When present, the score cell also shows the
   round to par. Add it only where the number is confirmed; leave it out
   otherwise.
   A trailing "*" on a score marks an incomplete round: shown in the table,
   excluded from every average and chart.
   ========================================================================== */

const results = [
  {date:"2026-08-23", event:"Shoreline Golf Links", tour:"U.S. Kids Golf", score:"79", finish:"1st", notes:"40–39 • 1 birdie • 10 pars • 2 doubles"},
  {date:"2026-08-16", event:"Moffett Field", tour:"U.S. Kids Golf", score:"81", notes:"Peninsula Fall 2026"},
  {date:"2026-08-15", event:"Moffett Field", tour:"U.S. Kids Golf", score:"88", notes:"Peninsula Fall 2026"},
  {date:"2026-08-09", event:"Coyote Creek", tour:"U.S. Kids Golf", score:"79", finish:"1st", notes:"Peninsula Fall 2026"},
  {date:"2026-08-06", event:"San Leandro City Junior Championship", tour:"JGANC", score:"85", notes:"Round 1"},
  {date:"2026-08-05", event:"Shoreline Golf Links", tour:"Junior tournament", score:"83*", notes:"Withdrew on hole 18 — round not counted"},
  {date:"2026-08-04", event:"Shoreline Golf Links", tour:"Junior tournament", score:"84", tees:"White", notes:""},
  {date:"2026-07-29", event:"Metropolitan Golf Links", tour:"JGANC", score:"84", tees:"Blue/White combo", notes:""},
  {date:"2026-07-24", event:"98th San Francisco Junior", tour:"JGANC", score:"89", notes:"Round 2"},
  {date:"2026-07-23", event:"98th San Francisco Junior", tour:"JGANC", score:"81", notes:"Round 1"},
  {date:"2026-07-15", event:"90th East Bay Junior Championship", tour:"JGANC", score:"85", notes:"Round 2"},
  {date:"2026-07-14", event:"90th East Bay Junior Championship", tour:"JGANC", score:"90", notes:"Round 1"},
  {date:"2026-01-18", event:"Paradise Valley", tour:"Junior tournament", score:"88", notes:"Round 2"},
  {date:"2026-01-17", event:"Paradise Valley", tour:"Junior tournament", score:"84", notes:"Round 1"},
  {date:"2025-12-23", event:"Shoreline Holiday Classic", tour:"JGANC", score:"86", notes:"Round 2"},
  {date:"2025-12-22", event:"Shoreline Holiday Classic", tour:"JGANC", score:"88", notes:"Round 1"},
  {date:"2025-11-25", event:"Del Monte", tour:"JTNC", score:"101", notes:"Round 2"},
  {date:"2025-11-24", event:"Del Monte", tour:"JTNC", score:"105", notes:"Round 1"},
  {date:"2025-11-22", event:"Peninsula Tour Championship — Baylands Golf Links", tour:"U.S. Kids Golf", score:"87", par:72, finish:"1st", notes:"Girls 15-18 • season tour championship"},
  {date:"2025-11-09", event:"Fairfield Junior Series #4 — Paradise Valley", tour:"JGANC", score:"87", notes:"Round 2"},
  {date:"2025-11-08", event:"Fairfield Junior Series #4 — Paradise Valley", tour:"JGANC", score:"86", notes:"Round 1"},
  {date:"2025-10-25", event:"Peninsula Local Tour — San Ramon Golf Club", tour:"U.S. Kids Golf", score:"80", par:72, finish:"1st", notes:"Girls 15-18"},
  {date:"2025-11-03", event:"NCS Division I Championship", tour:"High school", score:"77", notes:"Low score for Foothill by 13 strokes • team 446 • 5 off the individual winner"},
  {date:"2025-10-01", event:"EBAL Championship — Dublin Ranch", tour:"High school", score:"77", par:63, notes:"Par-63 layout — eleven par 3s"},
  {date:"2025-09-07", event:"Silicon Valley Autumn Series #1 — Bay View", tour:"JGANC", score:"95", notes:"Round 2"},
  {date:"2025-09-06", event:"Silicon Valley Autumn Series #1 — Bay View", tour:"JGANC", score:"91", notes:"Round 1"},
  {date:"2025-08-24", event:"Fairfield Junior Series #3 — Rancho Solano", tour:"JGANC", score:"81", notes:"Round 2"},
  {date:"2025-08-23", event:"Fairfield Junior Series #3 — Rancho Solano", tour:"JGANC", score:"90", notes:"Round 1"},
  {date:"2025-08-17", event:"Shoreline Golf Links", tour:"JGANC", score:"92", notes:""},
  {date:"2025-08-16", event:"Mountain View Junior Series #4 — Shoreline", tour:"JGANC", score:"89", notes:""},
  {date:"2025-08-07", event:"Srixon Cup @ The Yard Series #3 — Bay View", tour:"JGANC", score:"91", notes:"Round 2"},
  {date:"2025-08-06", event:"Srixon Cup @ The Yard Series #3 — Bay View", tour:"JGANC", score:"87", notes:"Round 1"},
  {date:"2025-08-05", event:"Diablo Creek", tour:"JGANC", score:"90", notes:"Round 2"},
  {date:"2025-08-04", event:"Diablo Creek", tour:"JGANC", score:"85", notes:"Round 1"},
  {date:"2025-07-30", event:"Santa Teresa", tour:"JGANC", score:"86", notes:"Round 2"},
  {date:"2025-07-29", event:"Santa Teresa", tour:"JGANC", score:"90", notes:"Round 1"},
  {date:"2025-07-21", event:"Spring Valley", tour:"JGANC", score:"84", notes:""},
  {date:"2025-07-19", event:"Las Positas", tour:"JGANC", score:"83", notes:""},
  {date:"2025-07-17", event:"Bay View", tour:"JGANC", score:"93", notes:"Round 2"},
  {date:"2025-07-16", event:"Bay View", tour:"JGANC", score:"92", notes:"Round 1"},
  {date:"2025-06-25", event:"Bay View", tour:"JGANC", score:"105", notes:"Round 2"},
  {date:"2025-06-24", event:"Bay View", tour:"JGANC", score:"101", notes:"Round 1"},
  {date:"2025-06-08", event:"Bay View", tour:"JGANC", score:"97", notes:""},
  {date:"2025-06-07", event:"Coyote Creek", tour:"JGANC", score:"91", notes:""},
  {date:"2025-05-18", event:"Coyote Creek Golf Club — Tour Championship", tour:"U.S. Kids Golf", score:"89", finish:"2nd", notes:"Tour Championship"},
  {date:"2025-05-10", event:"Baylands Golf Links", tour:"U.S. Kids Golf", score:"102", finish:"3rd", notes:""},
  {date:"2025-05-04", event:"The Club at Moffett Field", tour:"U.S. Kids Golf", score:"89", finish:"2nd", notes:"Round 2"},
  {date:"2025-05-03", event:"The Club at Moffett Field", tour:"U.S. Kids Golf", score:"87", finish:"2nd", notes:"Round 1"},
  {date:"2025-04-21", event:"Bay View", tour:"JGANC", score:"89", notes:""},
  {date:"2025-04-19", event:"East Bay Tour Championship — San Ramon Golf Club", tour:"U.S. Kids Golf", score:"94", par:72, finish:"5th", notes:"Girls 15-18"},
  {date:"2025-04-13", event:"Diablo Creek", tour:"JGANC", score:"90", notes:""},
  {date:"2025-03-30", event:"Shoreline Golf Links", tour:"JGANC", score:"104", notes:""},
  {date:"2025-03-23", event:"Blue Rock Springs West", tour:"JGANC", score:"96", notes:""},
  {date:"2025-02-02", event:"Teen Series — San Ramon Golf Club", tour:"U.S. Kids Golf", score:"108", par:72, finish:"28th", notes:"Round 2 of a 27-hole event • Girls 13-18 • round 1 was a 9-hole 51"},
  {date:"2025-03-15", event:"Las Positas", tour:"JGANC", score:"89", notes:""},
  {date:"2024-10-28", event:"Shoreline Golf Links", tour:"U.S. Kids Golf", score:"104", notes:"Round 2"},
  {date:"2024-10-27", event:"Shoreline Golf Links", tour:"U.S. Kids Golf", score:"105", notes:"Round 1"},
  {date:"2024-09-08", event:"Blue Rock Springs West", tour:"U.S. Kids Golf", score:"105", notes:"Round 2"},
  {date:"2024-09-07", event:"Blue Rock Springs West", tour:"U.S. Kids Golf", score:"109", notes:"Round 1"},
  {date:"2024-08-24", event:"San Ramon Golf Club", tour:"U.S. Kids Golf", score:"101", notes:"San Francisco Local Tour"},
  {date:"2024-08-17", event:"Coyote Creek Golf Club", tour:"U.S. Kids Golf", score:"113", notes:"San Francisco Local Tour"},
  {date:"2024-08-05", event:"Presidio Golf Course", tour:"U.S. Kids Golf", score:"114", notes:"San Francisco Local Tour"},
];

/* ==========================================================================
   High school matches — 9 holes.
   These are kept in their own array on purpose. A 9-hole 38 is not comparable
   to an 18-hole 79, so these never enter the 18-hole averages, the career low,
   or either chart. They get their own section and their own average.

   `date` is optional here: EBAL match dates were not recorded, so the section
   presents the season as a block rather than inventing dates. Add a date to a
   row and it will display; leave it out and the row still counts.
   `par` is the 9-hole par for the tees played — omit it if you are unsure and
   the row prints a dash rather than a wrong number over par.
   `verified` records whether a score came from a scorecard or from the season
   spreadsheet. Informational only; it does not affect the page.
   `datePrecision:"month"` means the day is not trusted — these dates came from
   Google Photos sync times, not from the scorecards — so the page prints only
   the month while still using the full date to sort. Remove that key on any
   row once you have confirmed the real match date.
   ========================================================================== */

const matches = [
  {date:"2026-08-26", event:"Dublin Ranch Golf Course", score:34, par:31, tees:"White", yardage:"2109", notes:"4·4·2·3·6·3·4·4·4", verified:true},
  {date:"2025-09-28", datePrecision:"month", event:"The Bridges Golf Club", score:43, par:38, notes:"4·7·4·5·4·5·4·6·4", verified:true},
  {date:"2025-09-21", datePrecision:"month", event:"Dublin Ranch Golf Course", score:35, verified:false},
  {date:"2025-09-14", datePrecision:"month", event:"Crow Canyon Country Club", score:38, par:34, notes:"5·6·5·4·4·3·4·3·4", verified:true},
  {date:"2025-09-09", datePrecision:"month", event:"Ruby Hill Golf Club", score:36, verified:false},
];

matches.sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));

const matchSeason = {
  label: "High school match play",
  window: "2025–2026 seasons",
};

/* One entry per event. U.S. Kids local-tour stops are separate one-day events
   with their own registration and deadlines, so two stops at the same course on
   back-to-back days are two rows, not one date range. Only genuine multi-day
   tournaments (the JGANC events below) use a date range. */
/* League matches are tagged tour:"High school". Set config.showLeagueMatches
   to false to hide them and leave only tournaments and championships. */
const schedule = [
  {sortDate:"2026-09-02", date:"Sep 2, 2026", event:"EBAL match vs. San Ramon Valley (home)", tour:"High school", venue:"League match", status:"Scheduled"},
  {sortDate:"2026-09-05", date:"Sep 5–6, 2026", event:"San Ramon Junior Series #2: 12–18", tour:"JGANC", venue:"San Ramon Golf Club", status:"Confirmed"},
  {sortDate:"2026-09-09", date:"Sep 9, 2026", event:"EBAL match at California (away)", tour:"High school", venue:"League match", status:"Scheduled"},
  {sortDate:"2026-09-12", date:"Sep 12–13, 2026", event:"Mountain View Fall Series #2", tour:"JGANC", venue:"Shoreline Golf Links", status:"Confirmed"},
  {sortDate:"2026-09-16", date:"Sep 16, 2026", event:"EBAL match at Granada (away)", tour:"High school", venue:"League match", status:"Scheduled"},
  {sortDate:"2026-09-19", date:"Sep 19, 2026", event:"East Bay Fall Local Tour", tour:"U.S. Kids Golf", venue:"Paradise Valley Golf Course, Fairfield", status:"Registered"},
  {sortDate:"2026-09-20", date:"Sep 20, 2026", event:"East Bay Fall Local Tour", tour:"U.S. Kids Golf", venue:"Paradise Valley Golf Course, Fairfield", status:"Registered"},
  {sortDate:"2026-09-23", date:"Sep 23, 2026", event:"EBAL match at Carondelet (away)", tour:"High school", venue:"League match", status:"Scheduled"},
  {sortDate:"2026-09-24", date:"Sep 24, 2026", event:"EBAL match vs. Livermore (home)", tour:"High school", venue:"League match", status:"Scheduled"},
  {sortDate:"2026-09-26", date:"Sep 26, 2026", event:"East Bay Fall Local Tour", tour:"U.S. Kids Golf", venue:"Monarch Bay Golf Club, San Leandro", status:"Registered"},
  {sortDate:"2026-09-27", date:"Sep 27, 2026", event:"East Bay Fall Local Tour", tour:"U.S. Kids Golf", venue:"Las Positas Golf Course, Livermore", status:"Registered"},
  {sortDate:"2026-09-30", date:"Sep 30, 2026", event:"EBAL match vs. Monte Vista (home)", tour:"High school", venue:"League match", status:"Scheduled"},
  {sortDate:"2026-10-03", date:"Oct 3, 2026", event:"East Bay Fall Local Tour", tour:"U.S. Kids Golf", venue:"San Ramon Golf Club", status:"Registered"},
  {sortDate:"2026-10-04", date:"Oct 4, 2026", event:"East Bay Fall Tour Championship", tour:"U.S. Kids Golf", venue:"San Ramon Golf Club", status:"Registered"},
  {sortDate:"2026-10-07", date:"Oct 7, 2026", event:"EBAL match vs. Dougherty Valley (home)", tour:"High school", venue:"League match", status:"Scheduled"},
  {sortDate:"2026-10-10", date:"Oct 10, 2026", event:"Peninsula Fall Local Tour", tour:"U.S. Kids Golf", venue:"Shoreline Golf Links, Mountain View", status:"Registered"},
  {sortDate:"2026-10-14", date:"Oct 14, 2026", event:"EBAL match at Amador Valley (away)", tour:"High school", venue:"League match", status:"Scheduled"},
  {sortDate:"2026-10-19", date:"Oct 19, 2026", event:"EBAL Championship", tour:"High school", venue:"Poppy Ridge Golf Course, Livermore — par 72, NCGA championship layout", status:"Championship"},
  {sortDate:"2026-10-24", date:"Oct 24–25, 2026", event:"Halloween Junior Championship: 12–18", tour:"JGANC", venue:"Haggin Oaks", status:"Confirmed"},
  {sortDate:"2026-10-27", date:"Oct 27 – Nov 7, 2026", event:"CIF North Coast Section Championships", tour:"High school", venue:"Site and date set at the Oct 25 seeding meeting", status:"Postseason window"},
  {sortDate:"2026-11-07", date:"Nov 7–8, 2026", event:"Paradise Valley Junior #4: 12–18", tour:"JGANC", venue:"Paradise Valley", status:"Confirmed"},
  {sortDate:"2026-11-10", date:"Nov 10–17, 2026", event:"CIF NorCal Championships", tour:"High school", venue:"On advancing from NCS", status:"Postseason window"},
  {sortDate:"2026-11-20", date:"Nov 20–21, 2026", event:"CIF State Championship", tour:"High school", venue:"On advancing from NorCal", status:"Postseason window"},
];

schedule.sort((a, b) => String(a.sortDate || "").localeCompare(String(b.sortDate || "")));

/* Sorted by sortDate (the first day of the event) so a new entry can be pasted
   anywhere in the list above and still land in the right place. `date` is the
   display string; `sortDate` is never shown. */
schedule.sort((a, b) => String(a.sortDate || "").localeCompare(String(b.sortDate || "")));

/* Sorted by sortDate (the first day of the event) so a new entry can be pasted
   anywhere in the list above and still land in the right place. `date` is the
   display string; `sortDate` is never shown. */
schedule.sort((a, b) => String(a.sortDate || "").localeCompare(String(b.sortDate || "")));

/* ==========================================================================
   Helpers
   ========================================================================== */

const esc = value => String(value ?? "").replace(/[&<>"']/g, ch => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[ch]));

const $ = id => document.getElementById(id);

const numericScore = score => {
  const match = String(score).match(/\d+/);
  return match ? Number(match[0]) : null;
};

const mean = values => values.reduce((a, b) => a + b, 0) / values.length;

const prettyDate = value =>
  new Date(value + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

function setText(id, value) {
  const el = $(id);
  if (el) el.textContent = value;
}

/* Guard against the same round being entered twice under two event names.
   Keeps the entry with the more specific event title. */
function dedupe(rows) {
  const byKey = new Map();
  rows.forEach(row => {
    const key = `${row.date}|${numericScore(row.score)}`;
    const existing = byKey.get(key);
    if (!existing) {
      byKey.set(key, row);
      return;
    }
    const keep = row.event.length > existing.event.length ? row : existing;
    byKey.set(key, keep);
    console.warn(`Duplicate round collapsed for ${row.date}: kept "${keep.event}".`);
  });
  return [...byKey.values()];
}

const allRounds = dedupe(results).sort((a, b) => b.date.localeCompare(a.date));

/* Rounds that count toward averages: complete, numeric. */
const countingRounds = allRounds
  .filter(r => !String(r.score).includes("*"))
  .map(r => ({ ...r, value: numericScore(r.score) }))
  .filter(r => Number.isFinite(r.value))
  .sort((a, b) => a.date.localeCompare(b.date));

const stats = (() => {
  const values = countingRounds.map(r => r.value);
  const bySeason = {};
  countingRounds.forEach(r => {
    const year = r.date.slice(0, 4);
    (bySeason[year] ||= []).push(r.value);
  });
  const seasons = Object.keys(bySeason).sort();
  const last = n => values.slice(-n);
  return {
    bySeason,
    seasons,
    total: values.length,
    careerLow: Math.min(...values),
    last5: last(5),
    last10: last(10),
    currentSeason: seasons[seasons.length - 1],
    sub80: values.filter(v => v <= 80).length,
    sub86: values.filter(v => v <= 85).length,
    firstSeasonAvg: mean(bySeason[seasons[0]]),
    currentSeasonAvg: mean(bySeason[seasons[seasons.length - 1]]),
  };
})();

/* ==========================================================================
   Hero, snapshot, stroke ladder
   ========================================================================== */

function renderHero() {
  const improvement = stats.firstSeasonAvg - stats.currentSeasonAvg;
  setText("heroDelta", improvement.toFixed(1));
  setText("heroSub80Count", stats.sub80);

  const seasonAverages = stats.seasons.map(year => ({ year, avg: mean(stats.bySeason[year]), n: stats.bySeason[year].length }));
  const worst = Math.max(...seasonAverages.map(s => s.avg));
  const best = Math.min(...seasonAverages.map(s => s.avg));
  const span = Math.max(worst - best, 1);

  $("strokeLadder").innerHTML = seasonAverages.map(season => {
    // Bar length is proportional to the improvement, not to the raw score.
    const width = 24 + ((worst - season.avg) / span) * 72;
    return `
      <div class="rung">
        <span class="rung-year">${esc(season.year)}</span>
        <span class="rung-bar" style="width:${width.toFixed(1)}%"></span>
        <span class="rung-avg">${season.avg.toFixed(1)}</span>
        <span class="rung-n">${season.n} rds</span>
      </div>`;
  }).join("");

  setText("ladderNote", `${improvement.toFixed(1)} strokes of scoring average removed between ${stats.seasons[0]} and ${stats.currentSeason}.`);

  setText("snapLast10", mean(stats.last10).toFixed(1));
  setText("snapSeason", stats.currentSeasonAvg.toFixed(1));
  setText("snapLow", stats.careerLow);
  setText("snapRounds", stats.total);
  setText("lastUpdated", prettyDate(countingRounds[countingRounds.length - 1].date));
}

/* ==========================================================================
   Verification links — only what actually exists
   ========================================================================== */

function renderQuickLinks() {
  const links = [
    { url: config.jgsProfileUrl, label: "Junior Golf Scoreboard", sub: "Open JGS profile ↗" },
    { url: config.tugrProfileUrl, label: "TUGR rankings", sub: "Open TUGR profile ↗" },
    { url: config.ncsaProfileUrl, label: "NCSA profile", sub: "Open NCSA ↗" },
    { url: config.priorityStatusUrl, label: "U.S. Kids priority status", sub: "Verify status ↗" },
    ...(config.press || []).filter(p => p.url).map(p => ({ url: p.url, label: p.label, sub: `${p.source} ↗` })),
    { url: config.swingVideoUrl, label: "Swing video", sub: "Watch ↗" },
    { url: config.resumeUrl, label: "Golf resume", sub: "Download PDF ↗" },
  ].filter(link => link.url);

  const container = $("quickLinks");
  if (!links.length) {
    container.hidden = true;
    return;
  }
  container.style.setProperty("--link-count", Math.min(links.length, 4));
  container.innerHTML = links.map(link => `
    <a class="link-card" href="${esc(link.url)}" target="_blank" rel="noopener">
      ${esc(link.label)}<span>${esc(link.sub)}</span>
    </a>`).join("");
}

/* ==========================================================================
   Results table + CSV export
   ========================================================================== */

const toPar = r => {
  const n = numericScore(r.score);
  return Number.isFinite(r.par) && Number.isFinite(n) && !String(r.score).includes("*")
    ? n - r.par
    : null;
};

const toParText = v => (v > 0 ? `+${v}` : v === 0 ? "E" : String(v));

const toParBadge = r => {
  const v = toPar(r);
  return v === null ? "" : `<span class="to-par">${esc(toParText(v))}</span>`;
};

let activeFilter = "all";

function renderResults(filter = activeFilter) {
  activeFilter = filter;
  const rows = allRounds.filter(r => filter === "all" || r.date.startsWith(filter));
  const body = $("resultsBody");

  if (!rows.length) {
    body.innerHTML = `<tr><td colspan="7">No rounds logged for this season yet.</td></tr>`;
    setText("resultsCount", "");
    return;
  }

  body.innerHTML = rows.map(r => {
    const tees = [r.tees, r.yardage ? `${r.yardage} yds` : ""].filter(Boolean).join(" • ");
    const incomplete = String(r.score).includes("*");
    return `
      <tr${incomplete ? ' class="row-incomplete"' : ""}>
        <td class="cell-date">${esc(prettyDate(r.date))}</td>
        <td><strong>${esc(r.event)}</strong></td>
        <td>${esc(r.tour)}</td>
        <td class="cell-muted">${esc(tees) || "—"}</td>
        <td class="score">${esc(r.score)}${toParBadge(r)}</td>
        <td>${r.finish ? `<span class="finish">${esc(r.finish)}</span>` : "—"}</td>
        <td class="cell-muted">${esc(r.notes) || "—"}</td>
      </tr>`;
  }).join("");

  const counting = rows.filter(r => !String(r.score).includes("*"));
  const avg = counting.length ? mean(counting.map(r => numericScore(r.score))).toFixed(1) : "—";
  setText("resultsCount", filter === "all"
    ? `${counting.length} counting rounds since ${stats.seasons[0]} • career scoring average ${avg}`
    : `${counting.length} counting rounds in ${filter} • scoring average ${avg}`);
}

function downloadCsv() {
  const header = ["Date", "Event", "Tour", "Tees", "Yardage", "Score", "Par", "To par", "Finish", "Notes"];
  const cell = v => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const lines = [header.join(",")].concat(
    allRounds.map(r => {
      const v = toPar(r);
      return [r.date, r.event, r.tour, r.tees, r.yardage, r.score, r.par, v === null ? "" : toParText(v), r.finish, r.notes].map(cell).join(",");
    })
  );
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "neha-baldawa-tournament-results.csv";
  a.click();
  URL.revokeObjectURL(url);
}

/* ==========================================================================
   Schedule, profile, academics, highlights
   ========================================================================== */

function renderSchedule() {
  const shown = config.showLeagueMatches
    ? schedule
    : schedule.filter(item => item.status !== "Scheduled");
  $("scheduleGrid").innerHTML = shown.map(item => `
    <article class="schedule-card">
      <div class="schedule-date">${esc(item.date)}</div>
      <h3>${esc(item.event)}</h3>
      <p>${esc(item.venue)} • ${esc(item.tour)}</p>
      <span class="badge">${esc(item.status)}</span>
    </article>`).join("");
}

function renderDetailList(id, rows) {
  const el = $(id);
  if (!el) return;
  el.innerHTML = rows
    .filter(([, value]) => value)
    .map(([label, value, note]) => `
      <div>
        <dt>${esc(label)}</dt>
        <dd>${esc(value)}${note ? `<span class="dd-note">${esc(note)}</span>` : ""}</dd>
      </div>`).join("");
}

function renderDevelopmentFocus() {
  const el = $("developmentFocus");
  if (!el) return;

  const injury = config.mentionInjury
    ? "She returned to competition in 2025 after six months out with a wrist injury, and has been building competitive volume back since. "
    : "";

  el.innerHTML = `
    <p>${injury}She has been competing on the U.S. Kids local tours through 2026, winning at Coyote Creek
      and Shoreline this August and reaching Level 8 priority status. Those wins open entry into stronger
      fields, and the next step is 36-hole regional events on full-length courses.</p>
    <p>On the golf itself: cutting penalty strokes and double bogeys, tightening putting through the L.A.B.
      method, and holding backswing length under pressure.</p>`;
}

function renderProfile() {
  renderDetailList("profileDetails", [
    ["Graduation year", config.gradYear],
    ["High school", config.school],
    ["Location", config.location],
    ["Team", config.team],
    ["Handedness", config.handedness],
    ["Height", config.heightFtIn],
    ["Driver carry", config.driverCarryYds ? `${config.driverCarryYds} yds` : ""],
    ["Primary tours", config.tours],
    ["U.S. Kids priority status", config.priorityStatus && config.priorityStatus.level
      ? `Level ${config.priorityStatus.level} (${config.priorityStatus.division})`
      : ""],
    ["Scoring average, last 10", mean(stats.last10).toFixed(1)],
    ["Rounds logged", `${stats.total} tournament rounds since ${stats.seasons[0]}`],
  ]);

  renderDetailList("academicDetails", [
    ["School", config.school],
    ["Class", config.gradYear],
    ["GPA", config.gpaUnweighted, config.gpaNote],
    ["SAT", config.sat, config.satNote],
    ["Coursework", config.coursework],
    ["Intended major", config.intendedMajor],
  ]);
}

const prettyMonth = value =>
  new Date(value + "T12:00:00").toLocaleDateString("en-US", { month: "short", year: "numeric" });

const matchDate = m => {
  if (!m.date) return "—";
  return m.datePrecision === "month" ? prettyMonth(m.date) : prettyDate(m.date);
};

function renderMatches() {
  const section = $("matches");
  const navLink = document.querySelector('[data-nav="matches"]');
  if (!matches.length) {
    section.hidden = true;
    if (navLink) navLink.remove();
    return;
  }
  section.hidden = false;

  const scores = matches.map(m => m.score);
  const withPar = matches.filter(m => Number.isFinite(m.par));

  const dated = matches.filter(m => m.date).map(m => m.date).sort();
  const anyApprox = matches.some(m => m.datePrecision === "month");
  const span = !dated.length
    ? matchSeason.window
    : anyApprox
      ? (prettyMonth(dated[0]) === prettyMonth(dated[dated.length - 1])
          ? prettyMonth(dated[0])
          : `${prettyMonth(dated[0])} to ${prettyMonth(dated[dated.length - 1])}`)
      : `${prettyDate(dated[0])} to ${prettyDate(dated[dated.length - 1])}`;
  setText("matchIntro",
    `${matches.length} nine-hole high school matches, ${span}, averaging ${mean(scores).toFixed(1)}. ` +
    `Nine-hole scores are excluded from every 18-hole average and chart on this page.`);

  $("matchBody").innerHTML = matches.map(m => {
    const toPar = Number.isFinite(m.par) ? (m.score - m.par) : null;
    const toParText = toPar === null ? "—" : (toPar > 0 ? `+${toPar}` : toPar === 0 ? "E" : String(toPar));
    return `
      <tr>
        <td class="cell-date">${esc(matchDate(m))}</td>
        <td><strong>${esc(m.event)}</strong></td>
        <td class="cell-muted">${esc([m.tees, m.yardage ? m.yardage + " yds" : ""].filter(Boolean).join(" • ")) || "—"}</td>
        <td class="score">${esc(m.score)}</td>
        <td class="cell-muted">${Number.isFinite(m.par) ? esc(m.par) : "—"}</td>
        <td><span class="finish">${esc(toParText)}</span></td>
        <td class="cell-muted">${esc(m.notes) || "—"}</td>
      </tr>`;
  }).join("");

  setText("matchAvg", mean(scores).toFixed(1));
  setText("matchLow", Math.min(...scores));
  if (withPar.length) {
    const best = withPar.reduce((a, b) => (a.score - a.par <= b.score - b.par ? a : b));
    setText("matchBestPar", `+${best.score - best.par}`);
    setText("matchBestParLabel", `Best round vs. par — ${best.event}`);
  } else {
    $("matchBestParStat").hidden = true;
  }
}

function renderHighlights() {
  const recent = countingRounds.slice(-3).map(r => r.value).join(" • ");
  const latest = countingRounds[countingRounds.length - 1];
  const cards = [
    {
      kicker: "CURRENT FORM",
      value: `${mean(stats.last5).toFixed(1)} avg`,
      body: `Last five counting rounds: ${stats.last5.join(" • ")}. Most recent three: ${recent}.`,
    },
    {
      kicker: "LATEST ROUND",
      value: `${latest.value}${latest.finish ? ` • ${latest.finish}` : ""}`,
      body: `${latest.event} • ${prettyDate(latest.date)}${latest.notes ? ` • ${latest.notes}` : ""}.`,
    },
    {
      kicker: "CAREER LOW",
      value: String(stats.careerLow),
      body: "NCS Division I Championship at Windsor, Nov. 3 2025 — full-length postseason course. She also shot 77 at the EBAL Championship a month earlier, on Dublin Ranch's par-63 layout.",
    },
    {
      kicker: "HIGH SCHOOL",
      value: "EBAL All-League",
      body: `EBAL All-League in 2025, and through to the CIF North Coast Section Division I Championship. ${matches.length} nine-hole matches on record averaging ${mean(matches.map(m => m.score)).toFixed(1)}, low ${Math.min(...matches.map(m => m.score))}.`,
    },
    {
      kicker: "SCHOOL HONORS",
      value: "Athlete of the Month",
      body: "Named a Foothill Athletic Booster Athlete of the Month, November 2025 — a school-wide award across fall sports.",
    },
    {
      kicker: "ACADEMICS",
      value: `${config.gpaUnweighted} GPA`,
      body: `SAT ${config.sat}. CIF North Coast Section President's List, 2025–26.`,
    },
    {
      kicker: "TAEKWONDO",
      value: "2nd-degree black belt",
      body: "In progress with Kukkiwon certification. First degree earned September 2024.",
    },
  ];

  const ps = config.priorityStatus;
  if (ps && ps.level) {
    cards.unshift({
      kicker: "U.S. KIDS GOLF PRIORITY STATUS",
      value: `Level ${ps.level}`,
      body: `${ps.division}, valid ${ps.valid}.`,
    });
  }

  if (config.tourFinishes && config.tourFinishes.length) {
    const f = config.tourFinishes;
    const divisions = [...new Set(f.map(x => x.division))];
    cards.splice(1, 0, {
      kicker: "SEASON TOUR FINISHES",
      value: f.map(x => x.finish).join(" & "),
      body: f.map(x => `${x.finish} on the ${x.tour}, ${x.season}`).join(". ") +
        (divisions.length === 1 ? `. Both in ${divisions[0]}.` : "."),
    });
  }

  if (config.showJgsRankNumber && config.jgsRankNumber) {
    cards.push({
      kicker: "JUNIOR GOLF SCOREBOARD",
      value: `Rank ${config.jgsRankNumber}`,
      body: "See the linked JGS profile for the current ranking.",
    });
  }

  $("highlightGrid").innerHTML = cards.map(card => `
    <article class="highlight-card">
      <span class="highlight-kicker">${esc(card.kicker)}</span>
      <strong>${esc(card.value)}</strong>
      <p>${esc(card.body)}</p>
    </article>`).join("");
}

function renderVideos() {
  const section = $("videos");
  const navLink = document.querySelector('[data-nav="videos"]');
  if (!config.videos.length) {
    section.hidden = true;
    if (navLink) navLink.remove();
    return;
  }
  section.hidden = false;
  $("videoGrid").innerHTML = config.videos.map(video => `
    <a class="video-card" href="${esc(video.url)}" target="_blank" rel="noopener">
      <span aria-hidden="true">▶</span>
      <h3>${esc(video.title)}</h3>
      <p>${esc(video.note || "Watch ↗")}</p>
    </a>`).join("");
}

function renderContact() {
  const section = $("contact");
  const navLink = document.querySelector('[data-nav="contact"]');
  if (!config.recruitingEmail) {
    section.hidden = true;
    if (navLink) navLink.remove();
    return;
  }
  section.hidden = false;
  setText("contactCopy", `Email is the fastest way to reach Neha and her family. Messages go to a ${config.emailOwner}.`);
  $("contactActions").innerHTML =
    `<a class="button primary" href="mailto:${esc(config.recruitingEmail)}">${esc(config.recruitingEmail)}</a>` +
    (config.resumeUrl ? `<a class="button secondary" href="${esc(config.resumeUrl)}" target="_blank" rel="noopener">Golf resume (PDF)</a>` : "");
  setText("contactCompliance",
    "NCAA Division I coaches may contact class-of-2028 prospects directly as of June 15, 2026.");
}

/* ==========================================================================
   Charts
   ========================================================================== */

function movingAverage(values, windowSize = 5) {
  return values.map((_, i) => {
    if (i < windowSize - 1) return null;
    return mean(values.slice(i - windowSize + 1, i + 1));
  });
}

function drawScoreChart(containerId, rounds, options = {}) {
  const container = $(containerId);
  if (!container || !rounds.length) return;

  // On a phone the SVG is scaled down to fit, so a wide viewBox would render
  // 12px labels at ~4px. A narrower box means less downscaling.
  const narrow = typeof window !== "undefined" && window.innerWidth < 700;
  const width = narrow ? 620 : 1040;
  const height = options.height || (narrow ? 440 : 390);
  const pad = { top: 28, right: 28, bottom: 76, left: 58 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  const values = rounds.map(r => r.value);
  const avg = movingAverage(values, options.windowSize || 5);
  const minScore = options.minScore ?? Math.max(70, Math.floor((Math.min(...values) - 3) / 5) * 5);
  const maxScore = options.maxScore ?? Math.min(120, Math.ceil((Math.max(...values) + 3) / 5) * 5);

  const x = i => pad.left + (rounds.length === 1 ? plotW / 2 : (i * plotW) / (rounds.length - 1));
  const y = value => pad.top + ((maxScore - value) / (maxScore - minScore)) * plotH;

  const label = options.showYears
    ? `Career scoring chart: ${rounds.length} tournament rounds from ${rounds[0].date.slice(0, 4)} to ${rounds[rounds.length - 1].date.slice(0, 4)}, scoring average falling from ${stats.firstSeasonAvg.toFixed(1)} to ${stats.currentSeasonAvg.toFixed(1)}.`
    : `Recent form: last ${rounds.length} rounds, averaging ${mean(values).toFixed(1)}, low ${Math.min(...values)}.`;

  let svg = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(label)}">`;

  for (let tick = minScore; tick <= maxScore; tick += 5) {
    const yy = y(tick);
    svg += `<line x1="${pad.left}" x2="${width - pad.right}" y1="${yy}" y2="${yy}" stroke="#dfe4df" stroke-width="1"/>`;
    svg += `<text x="${pad.left - 12}" y="${yy + 4}" text-anchor="end" font-size="12" fill="#66706a">${tick}</text>`;
  }

  [80, 85, 90].forEach(benchmark => {
    if (benchmark < minScore || benchmark > maxScore) return;
    const yy = y(benchmark);
    const isPrimary = benchmark === 80;
    svg += `<line x1="${pad.left}" x2="${width - pad.right}" y1="${yy}" y2="${yy}" stroke="#1f6a43" stroke-width="1.3" stroke-dasharray="${isPrimary ? "6 6" : "3 6"}" opacity="${isPrimary ? ".55" : ".22"}"/>`;
    // No inline label: at some data shapes it lands on top of the points.
    // The dashed line is identified in the chart legend instead.
  });

  if (options.showYears) {
    let previousYear = null;
    rounds.forEach((r, i) => {
      const year = r.date.slice(0, 4);
      if (year !== previousYear) {
        if (i > 0) {
          const xx = (x(i - 1) + x(i)) / 2;
          svg += `<line x1="${xx}" x2="${xx}" y1="${pad.top}" y2="${height - pad.bottom + 14}" stroke="#b9c2bc" stroke-width="1" stroke-dasharray="4 5"/>`;
        }
        previousYear = year;
      }
    });
  }

  svg += `<polyline points="${rounds.map((r, i) => `${x(i)},${y(r.value)}`).join(" ")}" fill="none" stroke="#1f6a43" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round" opacity=".38"/>`;

  let segment = [];
  const flush = () => {
    if (segment.length) {
      svg += `<polyline points="${segment.join(" ")}" fill="none" stroke="#15231b" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"/>`;
    }
    segment = [];
  };
  avg.forEach((v, i) => (v == null ? flush() : segment.push(`${x(i)},${y(v)}`)));
  flush();

  rounds.forEach((r, i) => {
    const xx = x(i);
    const yy = y(r.value);
    const tip = `${r.value} at ${r.event}, ${prettyDate(r.date)}, ${r.tour}`;
    svg += `<circle class="score-point" data-index="${i}" cx="${xx}" cy="${yy}" r="${narrow ? 7 : 5.5}" fill="#1f6a43" stroke="#ffffff" stroke-width="2.5" tabindex="0" role="img" aria-label="${esc(tip)}"><title>${esc(tip)}</title></circle>`;

    if (!options.showYears && (i === 0 || i === rounds.length - 1)) {
      svg += `<text x="${xx}" y="${height - 30}" text-anchor="middle" font-size="12" font-weight="700" fill="#66706a">${i === 0 ? "Earlier" : "Latest"}</text>`;
    }
  });

  if (options.showYears) {
    const groups = {};
    rounds.forEach((r, i) => ((groups[r.date.slice(0, 4)] ||= []).push(i)));
    Object.entries(groups).forEach(([year, idxs]) => {
      const center = (x(idxs[0]) + x(idxs[idxs.length - 1])) / 2;
      svg += `<text x="${center}" y="${height - 30}" text-anchor="middle" font-size="15" font-weight="850" fill="#15231b">${year}</text>`;
    });
  }

  svg += `<text x="17" y="${pad.top + plotH / 2}" transform="rotate(-90 17 ${pad.top + plotH / 2})" text-anchor="middle" font-size="12" fill="#66706a">18-hole score • lower is better</text>`;
  svg += `</svg>`;
  container.innerHTML = svg;

  attachTooltips(container, rounds);
}

function attachTooltips(container, rounds) {
  let tooltip = document.querySelector(".chart-tooltip");
  if (!tooltip) {
    tooltip = document.createElement("div");
    tooltip.className = "chart-tooltip";
    tooltip.setAttribute("aria-hidden", "true");
    document.body.appendChild(tooltip);
  }

  const show = (el, evt) => {
    const r = rounds[Number(el.dataset.index)];
    tooltip.innerHTML = `<strong>${esc(r.value)}</strong> · ${esc(r.event)}<br>${esc(prettyDate(r.date))} · ${esc(r.tour)}`;
    const box = el.getBoundingClientRect();
    tooltip.style.left = `${evt?.clientX ?? box.left + box.width / 2}px`;
    tooltip.style.top = `${evt?.clientY ?? box.top}px`;
    tooltip.style.opacity = "1";
  };
  const hide = () => { tooltip.style.opacity = "0"; };

  container.querySelectorAll(".score-point").forEach(el => {
    el.addEventListener("mouseenter", e => show(el, e));
    el.addEventListener("mousemove", e => show(el, e));
    el.addEventListener("mouseleave", hide);
    el.addEventListener("focus", () => show(el));
    el.addEventListener("blur", hide);
  });
}

function renderCharts() {
  drawScoreChart("scoreChart", countingRounds, { showYears: true, minScore: 75, maxScore: 115 });

  const recent = countingRounds.slice(-15);
  const recentValues = recent.map(r => r.value);
  drawScoreChart("recentScoreChart", recent, {
    height: 330,
    minScore: Math.max(70, Math.floor((Math.min(...recentValues) - 2) / 5) * 5),
    maxScore: Math.min(110, Math.ceil((Math.max(...recentValues) + 2) / 5) * 5),
  });

  setText("recentAvg", mean(stats.last5).toFixed(1));
  setText("recentLow", Math.min(...stats.last5));
  setText("sub80Count", stats.sub80);
  setText("sub86Count", stats.sub86);

  $("yearSummary").innerHTML = stats.seasons.map(year => {
    const vals = stats.bySeason[year];
    return `<article class="year-card">
      <div class="year">${esc(year)} SEASON</div>
      <div class="year-main"><span class="year-avg">${mean(vals).toFixed(1)}</span><span class="year-label">scoring avg</span></div>
      <div class="year-meta">${vals.length} rounds • low ${Math.min(...vals)}</div>
    </article>`;
  }).join("");
}

/* ==========================================================================
   Local setup checklist — never renders on the live domain
   ========================================================================== */

function renderSetupBanner() {
  const isPreview = ["localhost", "127.0.0.1", ""].includes(location.hostname) || location.protocol === "file:";
  if (!isPreview) return;

  const todo = [
    [!config.recruitingEmail, "Add config.recruitingEmail — the contact section is hidden without it"],
    [!config.swingVideoUrl && !config.videos.length, "Add at least one swing video to config.videos"],
    [!config.resumeUrl, "Add a one-page PDF golf resume and set config.resumeUrl"],
    [config.jgsProfileUrl === "https://www.juniorgolfscoreboard.com/", "Point config.jgsProfileUrl at Neha's JGS profile, not the JGS homepage"],
    [config.tugrProfileUrl === "https://www.tugr.org/", "Point config.tugrProfileUrl at Neha's TUGR profile, not the TUGR homepage"],
    [!config.heightFtIn, "Add config.heightFtIn — coaches ask for it"],
    [!config.driverCarryYds, "Add config.driverCarryYds — coaches ask for it"],
    [!allRounds.some(r => r.tees), "Add tees and yardage to recent rounds so scores can be read in context"],
  ].filter(([show]) => show).map(([, text]) => text);

  const banner = $("setupBanner");
  if (!todo.length) {
    banner.hidden = true;
    return;
  }
  banner.hidden = false;
  banner.innerHTML =
    `<strong>Local preview only — ${todo.length} item${todo.length === 1 ? "" : "s"} to finish before sharing this URL</strong>
     <ul>${todo.map(item => `<li>${esc(item)}</li>`).join("")}</ul>`;
}

/* ==========================================================================
   Boot
   ========================================================================== */

document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");
    renderResults(btn.dataset.filter);
  });
});

$("downloadCsv").addEventListener("click", downloadCsv);

/* Each section renders independently so one bad row cannot blank the rest. */
[
  ["hero", renderHero],
  ["quick links", renderQuickLinks],
  ["results", renderResults],
  ["schedule", renderSchedule],
  ["matches", renderMatches],
  ["profile", renderProfile],
  ["highlights", renderHighlights],
  ["videos", renderVideos],
  ["contact", renderContact],
  ["charts", renderCharts],
  ["development focus", renderDevelopmentFocus],
  ["setup banner", renderSetupBanner],
].forEach(([name, fn]) => {
  try {
    fn();
  } catch (err) {
    console.error(`Failed to render ${name}:`, err);
  }
});

let resizeTimer;
let lastNarrow = window.innerWidth < 700;
window.addEventListener("resize", () => {
  const nowNarrow = window.innerWidth < 700;
  if (nowNarrow === lastNarrow) return;
  lastNarrow = nowNarrow;
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(renderCharts, 150);
});
