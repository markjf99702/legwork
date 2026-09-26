// Saves live in localStorage under one key: your name, and for each case the game in progress and
// your best filed report. Nothing leaves the browser.

const KEY = 'legwork.v1';

function blank() {
  return { name: '', cases: {} };
}

export function load() {
  try {
    const d = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (d && typeof d === 'object' && d.cases) return { ...blank(), ...d };
  } catch { /* private mode, blocked storage or a bad save: start fresh */ }
  return blank();
}

export function save(d) {
  try { localStorage.setItem(KEY, JSON.stringify(d)); } catch { /* storage full or blocked */ }
}

// A better report is more stars, then more points, then fewer hours.
export function better(a, b) {
  if (!b) return true;
  if (a.stars !== b.stars) return a.stars > b.stars;
  if (a.pts !== b.pts) return a.pts > b.pts;
  return a.hours < b.hours;
}
