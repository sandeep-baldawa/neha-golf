const results = [
  {date:"2024-08-17", event:"Coyote Creek", tour:"U.S. Kids Golf", score:"113", notes:"Historical tournament round"},
  {date:"2024-09-07", event:"Blue Rock Springs West", tour:"U.S. Kids Golf", score:"109", notes:"Historical tournament round"},
  {date:"2024-09-08", event:"Blue Rock Springs West", tour:"U.S. Kids Golf", score:"105", notes:"Historical tournament round"},
  {date:"2024-10-27", event:"Shoreline Golf Links", tour:"U.S. Kids Golf", score:"105", notes:"Historical tournament round"},
  {date:"2024-10-28", event:"Shoreline Golf Links", tour:"U.S. Kids Golf", score:"104", notes:"Historical tournament round"},
  {date:"2025-03-15", event:"Las Positas", tour:"JGANC", score:"89", notes:"Historical tournament round"},
  {date:"2025-03-23", event:"Blue Rock Springs West", tour:"JGANC", score:"96", notes:"Historical tournament round"},
  {date:"2025-03-30", event:"Shoreline Golf Links", tour:"JGANC", score:"104", notes:"Historical tournament round"},
  {date:"2025-04-13", event:"Diablo Creek", tour:"JGANC", score:"90", notes:"Historical tournament round"},
  {date:"2025-04-21", event:"Bay View", tour:"JGANC", score:"89", notes:"Historical tournament round"},
  {date:"2025-05-03", event:"Moffett Field", tour:"JGANC", score:"87", notes:"Historical tournament round"},
  {date:"2025-05-04", event:"Moffett Field", tour:"JGANC", score:"89", notes:"Historical tournament round"},
  {date:"2025-05-10", event:"Baylands", tour:"JGANC", score:"102", notes:"Historical tournament round"},
  {date:"2025-05-17", event:"Coyote Creek", tour:"JGANC", score:"89", notes:"Historical tournament round"},
  {date:"2025-06-07", event:"Coyote Creek", tour:"JGANC", score:"91", notes:"Historical tournament round"},
  {date:"2025-06-08", event:"Bay View", tour:"JGANC", score:"97", notes:"Historical tournament round"},
  {date:"2025-06-24", event:"Bay View", tour:"JGANC", score:"101", notes:"Historical tournament round"},
  {date:"2025-06-25", event:"Bay View", tour:"JGANC", score:"105", notes:"Historical tournament round"},
  {date:"2025-07-16", event:"Bay View", tour:"JGANC", score:"92", notes:"Historical tournament round"},
  {date:"2025-07-17", event:"Bay View", tour:"JGANC", score:"93", notes:"Historical tournament round"},
  {date:"2025-07-19", event:"Las Positas", tour:"JGANC", score:"83", notes:"Historical tournament round"},
  {date:"2025-07-21", event:"Spring Valley", tour:"JGANC", score:"84", notes:"Historical tournament round"},
  {date:"2025-07-29", event:"Santa Teresa", tour:"JGANC", score:"90", notes:"Historical tournament round"},
  {date:"2025-07-30", event:"Santa Teresa", tour:"JGANC", score:"86", notes:"Historical tournament round"},
  {date:"2025-08-04", event:"Diablo Creek", tour:"JGANC", score:"85", notes:"Historical tournament round"},
  {date:"2025-08-05", event:"Diablo Creek", tour:"JGANC", score:"90", notes:"Historical tournament round"},
  {date:"2025-08-06", event:"Bay View", tour:"JGANC", score:"87", notes:"Uploaded workbook identifies JGANC"},
  {date:"2025-08-07", event:"Bay View", tour:"JGANC", score:"91", notes:"Uploaded workbook identifies JGANC"},
  {date:"2025-08-16", event:"Shoreline Golf Links", tour:"JGANC", score:"89", notes:"Historical tournament round"},
  {date:"2025-08-17", event:"Shoreline Golf Links", tour:"JGANC", score:"92", notes:"Historical tournament round"},
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
  {date:"2026-08-16", event:"Moffett Field", tour:"U.S. Kids Golf", score:"81", notes:"Peninsula Fall 2026"},
  {date:"2026-08-15", event:"Moffett Field", tour:"U.S. Kids Golf", score:"88", notes:"Peninsula Fall 2026"},
  {date:"2026-08-09", event:"Coyote Creek", tour:"U.S. Kids Golf", score:"79", notes:"1st place • Peninsula Fall 2026"},
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

function movingAverage(values, windowSize = 5) {
  return values.map((_, i) => {
    if (i < windowSize - 1) return null;
    const slice = values.slice(i - windowSize + 1, i + 1);
    return slice.reduce((a, b) => a + b, 0) / slice.length;
  });
}

function formatShortDate(date) {
  return new Date(date + "T12:00:00").toLocaleDateString("en-US", {month:"short", day:"numeric", year:"2-digit"});
}

function drawScoreChart(containerId, rounds, options = {}) {
  const container = document.getElementById(containerId);
  if (!container || !rounds.length) return;

  const width = 1040;
  const height = options.height || 390;
  const pad = {top: 28, right: 28, bottom: 76, left: 58};
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  const values = rounds.map(r => r.numericScore);
  const avg = movingAverage(values, options.windowSize || 5);

  const minData = Math.min(...values);
  const maxData = Math.max(...values);
  const minScore = options.minScore ?? Math.max(70, Math.floor((minData - 3) / 5) * 5);
  const maxScore = options.maxScore ?? Math.min(120, Math.ceil((maxData + 3) / 5) * 5);

  const x = i => pad.left + (rounds.length === 1 ? plotW/2 : i * plotW / (rounds.length - 1));
  const y = value => pad.top + ((value - minScore) / (maxScore - minScore)) * plotH;

  let svg = `<svg viewBox="0 0 ${width} ${height}" aria-hidden="true">`;

  for (let tick = minScore; tick <= maxScore; tick += 5) {
    const yy = y(tick);
    svg += `<line x1="${pad.left}" x2="${width-pad.right}" y1="${yy}" y2="${yy}" stroke="#dfe4df" stroke-width="1"/>`;
    svg += `<text x="${pad.left-12}" y="${yy+4}" text-anchor="end" font-size="12" fill="#66706a">${tick}</text>`;
  }

  [80, 85, 90].forEach(benchmark => {
    if (benchmark >= minScore && benchmark <= maxScore) {
      const yy = y(benchmark);
      const dash = benchmark === 80 ? "6 6" : "3 6";
      const opacity = benchmark === 80 ? ".55" : ".22";
      svg += `<line x1="${pad.left}" x2="${width-pad.right}" y1="${yy}" y2="${yy}" stroke="#1f6a43" stroke-width="1.3" stroke-dasharray="${dash}" opacity="${opacity}"/>`;
      if (benchmark === 80) {
        svg += `<text x="${width-pad.right}" y="${yy-7}" text-anchor="end" font-size="11" font-weight="700" fill="#1f6a43">80 benchmark</text>`;
      }
    }
  });

  // Year separator bands on the career chart.
  if (options.showYears) {
    let previousYear = null;
    rounds.forEach((r, i) => {
      const year = r.date.slice(0,4);
      if (year !== previousYear) {
        if (i > 0) {
          const xx = (x(i-1)+x(i))/2;
          svg += `<line x1="${xx}" x2="${xx}" y1="${pad.top}" y2="${height-pad.bottom+14}" stroke="#b9c2bc" stroke-width="1" stroke-dasharray="4 5"/>`;
        }
        previousYear = year;
      }
    });
  }

  const rawPts = rounds.map((r,i) => `${x(i)},${y(r.numericScore)}`).join(" ");
  svg += `<polyline points="${rawPts}" fill="none" stroke="#1f6a43" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round" opacity=".38"/>`;

  let current = [];
  avg.forEach((v,i) => {
    if (v == null) {
      if (current.length) {
        svg += `<polyline points="${current.join(" ")}" fill="none" stroke="#15231b" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"/>`;
      }
      current = [];
    } else {
      current.push(`${x(i)},${y(v)}`);
    }
  });
  if (current.length) {
    svg += `<polyline points="${current.join(" ")}" fill="none" stroke="#15231b" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  }

  const labelEvery = options.labelEvery || Math.max(1, Math.ceil(rounds.length / 10));
  rounds.forEach((r,i) => {
    const xx = x(i), yy = y(r.numericScore);
    svg += `<circle class="score-point" data-chart="${containerId}" data-index="${i}" cx="${xx}" cy="${yy}" r="5.5" fill="#1f6a43" stroke="#ffffff" stroke-width="2.5" tabindex="0"/>`;

    if (i === 0 || i === rounds.length-1 || i % labelEvery === 0) {
      const label = formatShortDate(r.date);
      svg += `<text x="${xx}" y="${height-42}" text-anchor="middle" font-size="11" fill="#66706a">${label}</text>`;
    }
  });

  if (options.showYears) {
    const yearGroups = {};
    rounds.forEach((r,i) => {
      const year = r.date.slice(0,4);
      yearGroups[year] ||= [];
      yearGroups[year].push(i);
    });
    Object.entries(yearGroups).forEach(([year, idxs]) => {
      const center = (x(idxs[0]) + x(idxs[idxs.length-1]))/2;
      svg += `<text x="${center}" y="${height-18}" text-anchor="middle" font-size="13" font-weight="800" fill="#15231b">${year}</text>`;
    });
  }

  svg += `<text x="17" y="${pad.top + plotH/2}" transform="rotate(-90 17 ${pad.top + plotH/2})" text-anchor="middle" font-size="12" fill="#66706a">18-hole score • lower is better</text>`;
  svg += `</svg>`;
  container.innerHTML = svg;

  let tooltip = document.querySelector(".chart-tooltip");
  if (!tooltip) {
    tooltip = document.createElement("div");
    tooltip.className = "chart-tooltip";
    document.body.appendChild(tooltip);
  }
  const allCharts = {scoreChart: rounds, recentScoreChart: rounds};
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
}

function renderScoreChart() {
  const rounds = trackedRounds();
  drawScoreChart("scoreChart", rounds, {showYears:true, windowSize:5, minScore:75, maxScore:115, labelEvery:Math.max(1, Math.ceil(rounds.length/9))});

  const recent = rounds.slice(-15);
  const recentMin = Math.max(75, Math.floor((Math.min(...recent.map(r=>r.numericScore))-2)/5)*5);
  const recentMax = Math.min(105, Math.ceil((Math.max(...recent.map(r=>r.numericScore))+2)/5)*5);
  drawScoreChart("recentScoreChart", recent, {windowSize:5, minScore:recentMin, maxScore:recentMax, height:330, labelEvery:2});

  const recent5 = rounds.slice(-5).map(r => r.numericScore);
  if (recent5.length) {
    const recentAvg = recent5.reduce((a,b)=>a+b,0)/recent5.length;
    document.getElementById("recentAvg").textContent = recentAvg.toFixed(1);
    document.getElementById("recentLow").textContent = Math.min(...recent5);
  }
  document.getElementById("sub82Count").textContent = rounds.filter(r => r.numericScore <= 81).length;

  const byYear = {};
  rounds.forEach(r => {
    const year = r.date.slice(0,4);
    byYear[year] ||= [];
    byYear[year].push(r.numericScore);
  });
  const yearSummary = document.getElementById("yearSummary");
  if (yearSummary) {
    yearSummary.innerHTML = Object.entries(byYear).map(([year, vals]) => {
      const avg = vals.reduce((a,b)=>a+b,0)/vals.length;
      const low = Math.min(...vals);
      return `<article class="year-card">
        <div class="year">${year}</div>
        <div class="year-main"><span class="year-avg">${avg.toFixed(1)}</span><span class="year-label">avg</span></div>
        <div class="year-meta">${vals.length} rounds • low ${low}</div>
      </article>`;
    }).join("");
  }
}


document.getElementById("lastUpdated").textContent = "August 23, 2026";
renderResults();
renderSchedule();
renderScoreChart();
