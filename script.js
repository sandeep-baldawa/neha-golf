const results = [
  {date:"2025-12-23", event:"Shoreline Holiday Classic", tour:"JGANC", score:"86", notes:"Round 2"},
  {date:"2025-12-22", event:"Shoreline Holiday Classic", tour:"JGANC", score:"88", notes:"Round 1"},
  {date:"2025-11-09", event:"Fairfield Junior Series #4 — Paradise Valley", tour:"JGANC", score:"87", notes:"Round 2"},
  {date:"2025-11-08", event:"Fairfield Junior Series #4 — Paradise Valley", tour:"JGANC", score:"86", notes:"Round 1"},
  {date:"2025-09-07", event:"Silicon Valley Autumn Series #1 — Bay View", tour:"JGANC", score:"95", notes:"Round 2"},
  {date:"2025-09-06", event:"Silicon Valley Autumn Series #1 — Bay View", tour:"JGANC", score:"91", notes:"Round 1"},
  {date:"2025-08-24", event:"Fairfield Junior Series #3 — Rancho Solano", tour:"JGANC", score:"81", notes:"Round 2"},
  {date:"2025-08-23", event:"Fairfield Junior Series #3 — Rancho Solano", tour:"JGANC", score:"90", notes:"Round 1"},
  {date:"2025-08-16", event:"Mountain View Junior Series #4 — Shoreline", tour:"JGANC", score:"89", notes:"Tournament round"},
  {date:"2025-08-07", event:"Srixon Cup @ The Yard Series #3 — Bay View", tour:"JGANC", score:"91", notes:"Round 2"},
  {date:"2025-08-06", event:"Srixon Cup @ The Yard Series #3 — Bay View", tour:"JGANC", score:"87", notes:"Round 1"},
  {date:"2024-06-23", event:"Northern California Invitational — Coyote Creek", tour:"U.S. Kids Golf", score:"89", notes:"Round 2 • T15 (22-player field)"},
  {date:"2024-06-22", event:"Northern California Invitational — Coyote Creek", tour:"U.S. Kids Golf", score:"95", notes:"Round 1"},
  {date:"2026-08-16", event:"Moffett Field", tour:"U.S. Kids", score:"81", notes:"Tournament round"},
  {date:"2026-08-15", event:"Moffett Field", tour:"U.S. Kids", score:"88", notes:"Tournament round"},
  {date:"2026-08-09", event:"Coyote Creek", tour:"U.S. Kids", score:"79", notes:"1st place"},
  {date:"2026-08-06", event:"San Leandro City Junior Championship", tour:"JGANC", score:"85", notes:"Round 1"},
  {date:"2026-08-05", event:"Shoreline Golf Links", tour:"Junior tournament", score:"83*", notes:"Score before WD on hole 18"},
  {date:"2026-08-04", event:"Shoreline Golf Links", tour:"Junior tournament", score:"84", notes:"White tees"},
  {date:"2026-07-29", event:"Metropolitan Golf Links", tour:"JGANC", score:"84", notes:"Blue/White combo"},
  {date:"2026-07-24", event:"98th San Francisco Junior", tour:"JGANC", score:"89", notes:"Round 2"},
  {date:"2026-07-23", event:"98th San Francisco Junior", tour:"JGANC", score:"81", notes:"Round 1"},
  {date:"2026-07-15", event:"90th East Bay Junior Championship", tour:"JGANC", score:"85", notes:"Round 2"},
  {date:"2026-07-14", event:"90th East Bay Junior Championship", tour:"JGANC", score:"90", notes:"Round 1"},
  {date:"2026-01-18", event:"Paradise Valley", tour:"Junior tournament", score:"88", notes:"Day 2"},
  {date:"2026-01-17", event:"Paradise Valley", tour:"Junior tournament", score:"84", notes:"Day 1"},
  {date:"2025-11-25", event:"Del Monte", tour:"JTNC", score:"101", notes:"Day 2"},
  {date:"2025-11-24", event:"Del Monte", tour:"JTNC", score:"105", notes:"Day 1"},
  {date:"2025-11-03", event:"NCS Division I — Windsor", tour:"High School", score:"77", notes:"Postseason"},
  {date:"2025-10-01", event:"EBAL Championship — Dublin Ranch", tour:"High School", score:"77", notes:"Career low tournament round"},
  {date:"2025-01-01", event:"Monarch Bay", tour:"JGANC", score:"79", notes:"2025 personal best noted in tracker"}
];

const schedule = [
  {date:"Aug 23, 2026", event:"Shoreline", tour:"U.S. Kids", status:"Playing"},
  {date:"Aug 30, 2026", event:"Baylands Tour Championship", tour:"U.S. Kids", status:"Confirmed"},
  {date:"Sep 5–6, 2026", event:"San Ramon Junior Series #2", tour:"JGANC", status:"Confirmed"},
  {date:"Sep 12, 2026", event:"Napa — Kennedy Park", tour:"U.S. Kids", status:"Confirmed"},
  {date:"Sep 20, 2026", event:"Paradise Valley", tour:"U.S. Kids", status:"Confirmed"},
  {date:"Sep 27, 2026", event:"Las Positas", tour:"U.S. Kids", status:"Confirmed"},
  {date:"Oct 3–4, 2026", event:"San Ramon + Tour Championship", tour:"U.S. Kids", status:"Confirmed"}
];

function prettyDate(value) {
  const d = new Date(value + "T12:00:00");
  return d.toLocaleDateString("en-US", {month:"short", day:"numeric", year:"numeric"});
}

function renderResults(filter="all") {
  const body = document.getElementById("resultsBody");
  const filtered = results.filter(r => filter === "all" || r.date.startsWith(filter));
  body.innerHTML = filtered.map(r => `
    <tr>
      <td>${prettyDate(r.date)}</td>
      <td><strong>${r.event}</strong></td>
      <td>${r.tour}</td>
      <td class="score">${r.score}</td>
      <td>${r.notes}</td>
    </tr>`).join("");
}

function renderSchedule() {
  const grid = document.getElementById("scheduleGrid");
  grid.innerHTML = schedule.map(item => `
    <article class="schedule-card">
      <div class="schedule-date">${item.date.toUpperCase()}</div>
      <h3>${item.event}</h3>
      <p>${item.tour}</p>
      <span class="badge">${item.status}</span>
    </article>`).join("");
}

document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderResults(btn.dataset.filter);
  });
});



function numericScore(score) {
  const match = String(score).match(/\d+/);
  return match ? Number(match[0]) : null;
}

function trackedRounds() {
  return results
    .map(r => ({...r, numericScore: numericScore(r.score)}))
    .filter(r => Number.isFinite(r.numericScore) && !String(r.score).includes("*"))
    .sort((a, b) => a.date.localeCompare(b.date));
}

function movingAverage(values, windowSize = 3) {
  return values.map((_, i) => {
    if (i < windowSize - 1) return null;
    const slice = values.slice(i - windowSize + 1, i + 1);
    return slice.reduce((a, b) => a + b, 0) / slice.length;
  });
}

function renderScoreChart() {
  const container = document.getElementById("scoreChart");
  if (!container) return;

  const rounds = trackedRounds();
  const values = rounds.map(r => r.numericScore);
  const avg = movingAverage(values, 3);

  const width = 1000;
  const height = 390;
  const pad = {top: 24, right: 24, bottom: 76, left: 52};
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  // Slightly padded range; lower scores are visually higher on the chart.
  const minScore = Math.max(65, Math.floor(Math.min(...values) / 5) * 5 - 5);
  const maxScore = Math.ceil(Math.max(...values) / 5) * 5 + 5;

  const x = i => pad.left + (rounds.length === 1 ? plotW/2 : i * plotW / (rounds.length - 1));
  const y = value => pad.top + ((value - minScore) / (maxScore - minScore)) * plotH;

  let svg = `<svg viewBox="0 0 ${width} ${height}" aria-hidden="true">`;

  // Horizontal grid + labels
  for (let tick = minScore; tick <= maxScore; tick += 5) {
    const yy = y(tick);
    svg += `<line x1="${pad.left}" x2="${width-pad.right}" y1="${yy}" y2="${yy}" stroke="#dfe4df" stroke-width="1"/>`;
    svg += `<text x="${pad.left-12}" y="${yy+4}" text-anchor="end" font-size="12" fill="#66706a">${tick}</text>`;
  }

  // 80 benchmark
  if (80 >= minScore && 80 <= maxScore) {
    const yy = y(80);
    svg += `<line x1="${pad.left}" x2="${width-pad.right}" y1="${yy}" y2="${yy}" stroke="#1f6a43" stroke-width="1.5" stroke-dasharray="6 6" opacity=".55"/>`;
    svg += `<text x="${width-pad.right}" y="${yy-7}" text-anchor="end" font-size="11" font-weight="700" fill="#1f6a43">80 benchmark</text>`;
  }

  // Raw score line
  const rawPts = rounds.map((r,i) => `${x(i)},${y(r.numericScore)}`).join(" ");
  svg += `<polyline points="${rawPts}" fill="none" stroke="#1f6a43" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" opacity=".58"/>`;

  // Moving average line
  const avgSegments = [];
  let current = [];
  avg.forEach((v,i) => {
    if (v === null) {
      if (current.length) avgSegments.push(current);
      current = [];
    } else current.push(`${x(i)},${y(v)}`);
  });
  if (current.length) avgSegments.push(current);
  avgSegments.forEach(seg => {
    svg += `<polyline points="${seg.join(" ")}" fill="none" stroke="#15231b" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>`;
  });

  // Points + sparse labels
  rounds.forEach((r,i) => {
    const xx = x(i), yy = y(r.numericScore);
    const label = new Date(r.date + "T12:00:00").toLocaleDateString("en-US",{month:"short",year:"2-digit"});
    svg += `<circle class="score-point" data-index="${i}" cx="${xx}" cy="${yy}" r="5.5" fill="#1f6a43" stroke="#ffffff" stroke-width="2.5" tabindex="0"/>`;
    if (i === 0 || i === rounds.length-1 || i % 2 === 0) {
      svg += `<text x="${xx}" y="${height-39}" text-anchor="middle" font-size="11" fill="#66706a">${label}</text>`;
    }
  });

  svg += `<text x="16" y="${pad.top + plotH/2}" transform="rotate(-90 16 ${pad.top + plotH/2})" text-anchor="middle" font-size="12" fill="#66706a">18-hole score • lower is better</text>`;
  svg += `</svg>`;

  container.innerHTML = svg;

  let tooltip = document.querySelector(".chart-tooltip");
  if (!tooltip) {
    tooltip = document.createElement("div");
    tooltip.className = "chart-tooltip";
    document.body.appendChild(tooltip);
  }

  function showTip(el, evt) {
    const r = rounds[Number(el.dataset.index)];
    const d = new Date(r.date + "T12:00:00").toLocaleDateString("en-US",{month:"short", day:"numeric", year:"numeric"});
    tooltip.innerHTML = `<strong>${r.numericScore}</strong> · ${r.event}<br>${d} · ${r.tour}`;
    const box = el.getBoundingClientRect();
    tooltip.style.left = `${evt?.clientX || box.left + box.width/2}px`;
    tooltip.style.top = `${evt?.clientY || box.top}px`;
    tooltip.style.opacity = "1";
  }
  function hideTip() { tooltip.style.opacity = "0"; }

  container.querySelectorAll(".score-point").forEach(el => {
    el.addEventListener("mouseenter", e => showTip(el,e));
    el.addEventListener("mousemove", e => showTip(el,e));
    el.addEventListener("mouseleave", hideTip);
    el.addEventListener("focus", e => showTip(el,e));
    el.addEventListener("blur", hideTip);
  });

  const recent5 = rounds.slice(-5).map(r => r.numericScore);
  if (recent5.length) {
    const recentAvg = recent5.reduce((a,b)=>a+b,0)/recent5.length;
    document.getElementById("recentAvg").textContent = recentAvg.toFixed(1);
    document.getElementById("recentLow").textContent = Math.min(...recent5);
  }
  document.getElementById("sub82Count").textContent = rounds.filter(r => r.numericScore <= 81).length;
}


document.getElementById("lastUpdated").textContent = "August 23, 2026";
renderResults();
renderSchedule();
renderScoreChart();
