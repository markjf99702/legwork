// The pages: the casebook, a briefing, the board of leads, a scene, the notebook, the report and the
// result. Routing is by hash: #/, #/case/<id>, #/case/<id>/board|scene|notes/<tab>|report|result|briefing.

import { CASES, byId } from './cases/index.js';
import * as E from './engine.js';
import { toHTML, toPlain } from './text.js';
import { load, save, better } from './store.js';

const app = document.getElementById('app');
const barCase = document.getElementById('barCase');
let data = load();

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const who = () => data.name || 'Novak';
const html = (t) => toHTML(t, who());
const persist = () => save(data);
const go = hash => { if (location.hash === hash) route(); else location.hash = hash; };
const KIND = { place: 'Place', person: 'Person', records: 'Records', lab: 'Lab', phone: 'Call' };
const dots = n => '●'.repeat(n) + '○'.repeat(3 - n);
const starText = n => '★'.repeat(n) + '☆'.repeat(3 - n);
const hl = h => E.hoursLabel(h).replace(' ', '\u00a0');

function caseState(def) {
  const st = data.cases[def.id]?.st;
  return st && st.v === 1 ? st : null;
}

function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => el.classList.remove('show'), 2600);
}

// ---------- Router ----------

window.addEventListener('hashchange', route);
route();
if (!data.name) askName();

function route() {
  const [, id, sub, arg] = location.hash.replace(/^#\/?/, '').split('/');
  const def = id && location.hash.startsWith('#/case/') ? byId(id) : null;
  const was = route.last;
  route.last = location.hash;
  if (!def) { home(); bar(null); }
  else {
    const st = caseState(def);
    let page = sub || (!st ? 'briefing' : st.done ? 'result' : st.scene ? 'scene' : 'board');
    if (!st && page !== 'briefing') page = 'briefing';
    if (st?.done && ['board', 'scene', 'report'].includes(page)) page = 'result';
    if (st && !st.done && page === 'result') page = 'board';
    if (page === 'scene' && !st.scene) page = 'board';
    ({ briefing, board, scene, notes, report, result }[page] || board)(def, st, arg);
    bar(def, caseState(def));
  }
  if (was !== location.hash) { window.scrollTo(0, 0); app.focus({ preventScroll: true }); }
}

function bar(def, st) {
  if (!def || !st || st.done) { barCase.innerHTML = ''; return; }
  const left = E.timeLeft(def, st);
  const fresh = Object.keys(st.fresh || {}).length;
  barCase.innerHTML = `
    <a class="chip${left <= 2 ? ' low' : ''}" href="#/case/${def.id}/board" title="Back to the board">${esc(E.clockAt(def, st.t).label)}<span aria-hidden="true">·</span>${esc(hl(left))} left</a>
    <a class="chip book" href="#/case/${def.id}/notes" title="Notebook"><span class="l">Notebook</span><span aria-hidden="true" class="l-s">✎</span>${fresh ? `<span class="n" aria-label="${fresh} new">${fresh}</span>` : ''}</a>`;
}

// ---------- Home ----------

function home() {
  document.title = 'Legwork';
  const folders = CASES.map(def => {
    const r = data.cases[def.id] || {};
    const st = caseState(def);
    let status = '';
    if (r.best) status = r.best.stars ? `<span class="status closed">Closed <span class="stars" aria-label="${r.best.stars} of 3 stars">${starText(r.best.stars)}</span></span>` : '<span class="status wrong">Wrong suspect</span>';
    if (st && !st.done) status = `<span class="status open">In progress · ${esc(E.clockAt(def, st.t).label)}</span>`;
    return `<li class="folder">
      <a href="#/case/${def.id}">
        <span class="tab">Case ${def.n}</span>
        <div class="body">
          <h2>${esc(def.title)}</h2>${status}
          <p>${esc(def.summary)}</p>
          <div class="meta"><span>${esc(def.crime)}</span><span class="dots" aria-label="Difficulty ${def.difficulty} of 3">${dots(def.difficulty)}</span><span>${hl(def.hours)} to solve it</span></div>
        </div>
      </a>
    </li>`;
  }).join('');
  app.innerHTML = `<div class="wrap">
    <div class="hero">
      <div class="logo">LEGWORK</div>
      <p>Six cases from the Investigations Unit in Port Calder, a Great Lakes city of grain elevators and old money. The hours are short, the leads are many, and somebody’s story doesn’t add up.</p>
    </div>
    <p class="who">Detective <strong>${esc(who())}</strong> · <button class="linkish" id="rename">change name</button></p>
    <ul class="folders">${folders}</ul>
    <details class="how">
      <summary>How it works</summary>
      <ul>
        <li><b>Every lead costs time.</b> A drive across town, an interview, a records request. The lieutenant wants your report by the deadline, and there isn’t time to chase everything.</li>
        <li><b>What you learn opens doors.</b> A name in one interview becomes a place to go; a fact becomes a question you can put to someone else. Go back when you have something new to ask.</li>
        <li><b>Labs and records take hours.</b> Send the request early, and the answer turns up while you work.</li>
        <li><b>Your notebook keeps everything:</b> the clues, the people, and a timeline of the night in question.</li>
        <li><b>File your report</b> when you’re sure, or when the clock runs out: who did it, how, and why. Then see what really happened, and how the lieutenant would have worked it.</li>
      </ul>
    </details>
    <p class="footnote">Your cases are saved in this browser. Nothing is sent anywhere.</p>
  </div>`;
  app.querySelector('#rename').onclick = askName;
}

function askName() {
  const d = document.createElement('dialog');
  d.innerHTML = `<form method="dialog">
    <p class="eyebrow">Investigations Unit · Port Calder PD</p>
    <h2>What’s your name, Detective?</h2>
    <p class="muted">Your surname is enough. It’s what people will call you.</p>
    <label class="field"><span>Detective</span><input name="n" maxlength="24" autocomplete="family-name" placeholder="Novak" value="${esc(data.name)}" required></label>
    <div class="row"><button class="btn" value="ok">That’s me</button></div>
  </form>`;
  document.body.append(d);
  const input = d.querySelector('input');
  d.addEventListener('close', () => {
    const v = input.value.trim().replace(/\s+/g, ' ');
    if (v) { data.name = v.charAt(0).toUpperCase() + v.slice(1); persist(); }
    else if (!data.name) { data.name = 'Novak'; persist(); }
    d.remove();
    route();
  });
  d.showModal();
  input.focus();
}

// ---------- Briefing ----------

function caseHead(def, extra = '') {
  return `<div class="case-head">
    <p class="eyebrow">Case ${def.n} · ${esc(def.crime)}</p>
    <h1 class="title">${esc(def.title)}</h1>
    ${extra}
  </div>`;
}

function briefing(def, st) {
  document.title = `${def.title} · Legwork`;
  const due = E.deadline(def).label;
  const facts = `<div class="facts"><span>Report due <b>${esc(due)}</b></span><span><b>${hl(def.hours)}</b> of legwork</span><span>Difficulty <b class="dots">${dots(def.difficulty)}</b></span></div>`;
  let actions;
  if (!st) actions = `<button class="btn red block" id="take">Take the case</button>`;
  else if (st.done) actions = `<a class="btn block" href="#/case/${def.id}/result">Read your result</a>`;
  else actions = `<div class="row"><a class="btn" href="#/case/${def.id}/board">Back to the board</a><button class="linkish" id="restart">Start this case over</button></div>`;
  const played = Object.values(data.cases).some(r => r.st || r.best);
  app.innerHTML = `<div class="wrap">
    ${caseHead(def, facts)}
    <article class="paper briefing">
      <p class="from">From the desk of Lt. R. Okafor</p>
      <div class="prose">${html(def.briefing)}</div>
    </article>
    ${!st && !played ? `<div class="primer"><b>Your hours are the game.</b> Each lead on the board shows what it costs. Talking to people, digging through records and waiting on the lab all use up the day. You won’t have time for everything, so follow what matters, go back when you have something new to ask, and file your report when you can prove it.</div>` : ''}
    <div style="margin-top:22px">${actions}</div>
  </div>`;
  app.querySelector('#take')?.addEventListener('click', () => {
    const r = data.cases[def.id] ||= {};
    r.st = E.newState(def);
    persist();
    go(`#/case/${def.id}/board`);
  });
  app.querySelector('#restart')?.addEventListener('click', e => {
    if (e.currentTarget.dataset.sure) {
      data.cases[def.id].st = null;
      persist();
      go(`#/case/${def.id}/briefing`);
      toast('Case reset. The clock is back to the start.');
    } else {
      e.currentTarget.dataset.sure = '1';
      e.currentTarget.textContent = 'Sure? Tap again to lose your progress';
    }
  });
}

// ---------- Board ----------

function clockBlock(def, st) {
  const left = E.timeLeft(def, st);
  const cells = [];
  for (let i = 0; i < Math.ceil(def.hours); i++) {
    const fill = Math.max(0, Math.min(1, st.t - i));
    cells.push(`<i><b style="width:${fill * 100}%"></b></i>`);
  }
  return `<div class="clock">
    <div><p class="eyebrow">${esc(E.clockAt(def, st.t).dayName)}</p><div class="now">${esc(E.hourLabel(E.clockAt(def, st.t).hour))}</div></div>
    <div class="left"><b>${esc(hl(left))}</b> left<br>due ${esc(E.deadline(def).label)}</div>
    <div class="hours${left <= 2 ? ' low' : ''}" aria-hidden="true">${cells.join('')}</div>
  </div>`;
}

function leadCard(def, st, s) {
  const tags = [];
  if (!st.seenLeads[s.id] && !s.visits) tags.push('<span class="tag new">New</span>');
  if (s.visits && s.open) tags.push(`<span class="tag seen">Visited${s.visits > 1 ? ` ×${s.visits}` : ''}</span>`);
  if (!s.open && s.why) tags.push(`<span class="tag shut">${esc(s.why)}</span>`);
  const kind = KIND[s.lead.kind] || '';
  return `<li><button class="lead" data-lead="${s.id}" ${s.open ? '' : 'disabled'} aria-label="${esc(`${s.lead.title}. ${kind}. ${s.lead.where || ''}. ${s.open ? hl(s.cost) : s.why}`)}">
    <span class="t">${esc(s.lead.title)}${tags.join('')}</span>
    <span class="w">${esc(kind)}${s.lead.where ? ' · ' + esc(s.lead.where) : ''}</span>
    ${s.open ? `<span class="cost">${esc(hl(s.cost))}</span>` : ''}
  </button></li>`;
}

function board(def, st) {
  document.title = `${def.title} · Legwork`;
  const all = E.leads(def, st);
  const groups = [
    ['Places', all.filter(s => s.lead.kind === 'place')],
    ['People', all.filter(s => s.lead.kind === 'person')],
    ['Calls, records and the lab', all.filter(s => ['records', 'lab', 'phone'].includes(s.lead.kind))],
  ].filter(([, list]) => list.length);
  const left = E.timeLeft(def, st);
  const anyOpen = all.some(s => s.open);
  const inbox = st.inbox.map((m, i) => `<div class="msg" role="note">
      <h3>${esc(m.title)} · ${esc(E.clockAt(def, m.at).label)}</h3>
      <div class="prose">${html(m.text)}</div>
      ${m.clues?.length ? `<p class="got">Noted: ${m.clues.map(c => esc(def.clues[c]?.title)).join(' · ')}</p>` : ''}
      <div class="row"><button class="btn" data-dismiss="${i}">Got it</button></div>
    </div>`).join('');
  const timesUp = left <= 0 || !anyOpen;
  const recent = Object.entries(st.clues).sort((a, b) => b[1] - a[1]).slice(0, 8)
    .map(([id]) => def.clues[id] && `<li class="card${st.fresh[id] ? ' fresh' : ''}"><h3>${esc(def.clues[id].title)}</h3><p>${esc(toPlain(def.clues[id].text, who()))}</p></li>`).join('');
  app.innerHTML = `<div class="wrap wide">
    <div class="board-grid">
      <div>
        ${caseHead(def)}
        ${clockBlock(def, st)}
        ${inbox ? `<div class="inbox">${inbox}</div>` : ''}
        ${timesUp ? `<div class="timesup"><h3>${left <= 0 ? 'Time’s up' : 'Nowhere left to go'}</h3><p>${left <= 0 ? 'Lieutenant Okafor wants your report. It’s time to put a name on it.' : 'There’s nothing left you have time for. Time to write it up.'}</p><a class="btn red" href="#/case/${def.id}/report">Write the report</a></div>` : ''}
        ${groups.map(([name, list]) => `<section class="group"><h2>${name}</h2><ul class="leads">${list.map(s => leadCard(def, st, s)).join('')}</ul></section>`).join('')}
        <p style="margin-top:22px"><a href="#/case/${def.id}/briefing" class="mono" style="font-size:.85rem">Reread the briefing</a></p>
      </div>
      <aside class="side" aria-label="Latest in your notebook">
        <h2>Latest in your notebook</h2>
        ${recent ? `<ul class="cards">${recent}</ul>` : '<p class="empty">Nothing yet. Go and find something.</p>'}
        <div class="row" style="margin-top:12px"><a class="btn ghost block" href="#/case/${def.id}/notes">Open the notebook</a><a class="btn block${timesUp ? ' red' : ''}" href="#/case/${def.id}/report">File report</a></div>
      </aside>
    </div>
  </div>
  <div class="dock on-board"><div class="row">
    <a class="btn ghost" href="#/case/${def.id}/notes">Notebook</a>
    <a class="btn${timesUp ? ' red' : ''}" href="#/case/${def.id}/report">File report</a>
  </div></div>`;

  for (const s of all) st.seenLeads[s.id] = true;
  persist();

  app.querySelectorAll('[data-lead]').forEach(b => b.addEventListener('click', () => {
    try { E.visit(def, st, b.dataset.lead); } catch (e) { toast(e.message); return; }
    persist();
    go(`#/case/${def.id}/scene`);
  }));
  app.querySelectorAll('[data-dismiss]').forEach(b => b.addEventListener('click', () => {
    st.inbox.splice(Number(b.dataset.dismiss), 1);
    persist();
    route();
  }));
}

// ---------- Scene ----------

function lineHTML(def, l, i, old, leadTitle) {
  const cls = old ? ' old' : '';
  switch (l.kind) {
    case 'scene': return `<div class="t-scene prose${cls}" data-i="${i}">${l.title && l.title !== leadTitle ? `<h2>${esc(l.title)}</h2>` : ''}${html(l.text)}</div>`;
    case 'you': return `<div class="t-you${cls}" data-i="${i}">${esc(toPlain(l.text, who()))}${l.cost ? `<span class="c"> · ${esc(hl(l.cost))}</span>` : ''}</div>`;
    case 'reply': return `<div class="t-reply prose${cls}" data-i="${i}">${html(l.text)}</div>`;
    case 'clue': return `<div class="t-clue${cls}" data-i="${i}"><span>Noted</span>${esc(def.clues[l.id]?.title || l.id)}</div>`;
  }
  return '';
}

function scene(def, st, _arg, seen = null) {
  const lead = def.leads[st.scene.lead];
  document.title = `${lead.title} · ${def.title} · Legwork`;
  const lines = st.scene.lines;
  const firstNew = seen ?? 0;
  const cs = E.choices(def, st);
  app.innerHTML = `<div class="wrap">
    <div class="scene-head">
      <p class="eyebrow">${esc(KIND[lead.kind] || '')}${lead.where ? ' · ' + esc(lead.where) : ''}</p>
      <h1>${esc(lead.title)}</h1>
    </div>
    <div class="transcript" aria-live="polite">${lines.map((l, i) => lineHTML(def, l, i, i < firstNew, lead.title)).join('')}</div>
    <div class="choices">
      ${cs.map(c => `<button class="choice${c.nav ? ' nav' : ''}" data-key="${esc(c.key)}" ${c.enabled ? '' : 'disabled'}>
        <span>${esc(toPlain(c.label, who()))}</span>${c.cost ? `<span class="cost">${esc(hl(c.cost))}</span>` : ''}
      </button>`).join('')}
      <button class="choice leave" id="leave"><span>${st.scene.ended || !cs.length ? 'Back to the board' : 'Leave · back to the board'}</span><span aria-hidden="true">→</span></button>
    </div>
  </div>`;
  if (seen !== null) {
    const el = app.querySelector(`.transcript [data-i="${firstNew}"]`);
    if (el) el.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  }
  app.querySelectorAll('[data-key]').forEach(b => b.addEventListener('click', () => {
    const before = st.scene.lines.length;
    try { E.choose(def, st, b.dataset.key); } catch (e) { toast(e.message); return; }
    persist();
    bar(def, st);
    if (st.scene) scene(def, st, null, before);
    else go(`#/case/${def.id}/board`);
  }));
  app.querySelector('#leave').addEventListener('click', () => {
    E.leave(def, st);
    persist();
    go(`#/case/${def.id}/board`);
  });
}

// ---------- Notebook ----------

function dayIndex(def, at) {
  return (def.days || []).findIndex(d => d.slice(0, 3) === at.slice(0, 3));
}

function notes(def, st, tab = 'clues') {
  document.title = `Notebook · ${def.title} · Legwork`;
  const tabs = [['clues', 'Clues'], ['people', 'People'], ['timeline', 'Timeline'], ['log', 'Your day']];
  const found = Object.entries(st.clues).filter(([id]) => def.clues[id]);
  let body = '';
  if (tab === 'people') {
    const people = Object.entries(def.people).filter(([, p]) => E.test(p.if, st, def));
    body = `<ul class="cards">${people.map(([pid, p]) => {
      const theirs = found.filter(([id]) => [].concat(def.clues[id].who || []).includes(pid)).sort((a, b) => a[1] - b[1]);
      return `<li class="card person"><h3>${esc(p.name)}</h3><div class="role">${esc(p.role)}</div>${p.about ? `<p>${esc(p.about)}</p>` : ''}
        ${theirs.length ? `<ul>${theirs.map(([id]) => `<li>${esc(def.clues[id].title)}</li>`).join('')}</ul>` : ''}</li>`;
    }).join('')}</ul>`;
  } else if (tab === 'timeline') {
    const events = found.filter(([id]) => def.clues[id].at).map(([id]) => {
      const at = def.clues[id].at;
      const [h, m] = at.slice(4).split(':').map(Number);
      return { id, day: dayIndex(def, at), mins: h * 60 + m, h: h + m / 60 };
    }).sort((a, b) => a.day - b.day || a.mins - b.mins);
    let lastDay = -1;
    body = events.length ? `<ol class="timeline">${events.map(e => {
      const head = e.day !== lastDay ? `<li class="day">${esc(def.days[e.day])}</li>` : '';
      lastDay = e.day;
      return `${head}<li class="ev"><time>${esc(E.hourLabel(e.h))}</time> · <b>${esc(def.clues[e.id].title)}</b><p>${esc(toPlain(def.clues[e.id].text, who()))}</p></li>`;
    }).join('')}</ol>` : '<p class="empty">Nothing with a time on it yet. When someone tells you when something happened, it goes here.</p>';
  } else if (tab === 'log') {
    body = `<ol class="log">${st.log.map(l => `<li><time>${esc(E.clockAt(def, l.t).label)}</time><span>${esc(def.leads[l.lead]?.title || l.lead)}</span></li>`).join('')}
      <li><time>${esc(E.clockAt(def, st.t).label)}</time><span>${st.done ? 'Report filed' : 'Now'}</span></li></ol>`;
  } else {
    tab = 'clues';
    const sorted = found.sort((a, b) => b[1] - a[1]);
    body = sorted.length ? `<ul class="cards">${sorted.map(([id, t]) => {
      const c = def.clues[id];
      const from = st.src?.[id];
      return `<li class="card${st.fresh[id] ? ' fresh' : ''}"><h3>${esc(c.title)}</h3><p>${esc(toPlain(c.text, who()))}</p>
        <div class="src">${from ? esc(def.leads[from]?.title) + ' · ' : ''}${esc(E.clockAt(def, t).label)}</div></li>`;
    }).join('')}</ul>` : '<p class="empty">Nothing yet. Get out there.</p>';
  }
  app.innerHTML = `<div class="wrap">
    ${caseHead(def, `<p class="muted mono" style="font-size:.9rem;margin:0">${found.length} clue${found.length === 1 ? '' : 's'} so far</p>`)}
    <nav class="tabs" aria-label="Notebook">${tabs.map(([k, n]) => `<a href="#/case/${def.id}/notes/${k}" ${k === tab ? 'aria-current="page"' : ''}>${n}</a>`).join('')}</nav>
    ${body}
  </div>
  <div class="dock"><div class="row">
    <a class="btn ghost" href="#/case/${def.id}/${st.done ? 'result' : st.scene ? 'scene' : 'board'}">${st.done ? 'Back to the result' : st.scene ? 'Back to the scene' : 'Back to the board'}</a>
    ${st.done ? '' : `<a class="btn" href="#/case/${def.id}/report">File report</a>`}
  </div></div>`;
  if (tab === 'clues' && Object.keys(st.fresh).length) { st.fresh = {}; persist(); }
}

// ---------- Report ----------

function report(def, st) {
  document.title = `Report · ${def.title} · Legwork`;
  st.draft ||= {};
  const left = E.timeLeft(def, st);
  app.innerHTML = `<div class="wrap">
    ${caseHead(def, '<p class="muted" style="margin:0">Case report for Lt. Okafor. Answer every question. Once it’s filed, the case is closed.</p>')}
    ${left > 0 ? `<p class="primer" style="margin-top:0">You still have <b>${esc(hl(left))}</b>. Filing now ends the case. If you’re not sure, <a href="#/case/${def.id}/board">go back to the board</a>.</p>` : ''}
    <form id="rep">
      ${def.report.map((q, qi) => `<fieldset class="q">
        <legend>${qi + 1}. ${esc(q.q)}<span class="pts">${q.points} pts</span></legend>
        ${Object.entries(q.options).map(([k, label]) => `<label class="opt"><input type="radio" name="${esc(q.id)}" value="${esc(k)}" ${st.draft[q.id] === k ? 'checked' : ''}><span>${esc(label)}</span></label>`).join('')}
      </fieldset>`).join('')}
      <button class="btn red block" id="file" type="submit">File the report</button>
    </form>
  </div>`;
  const form = app.querySelector('#rep');
  form.addEventListener('change', e => { st.draft[e.target.name] = e.target.value; persist(); });
  form.addEventListener('submit', e => {
    e.preventDefault();
    const missing = def.report.filter(q => !st.draft[q.id]);
    if (missing.length) { toast(`Answer every question first (${missing.length} to go).`); return; }
    const btn = app.querySelector('#file');
    if (!btn.dataset.sure) { btn.dataset.sure = '1'; btn.textContent = 'Sure? Tap again to file it'; return; }
    const g = E.fileReport(def, st, st.draft);
    const r = data.cases[def.id];
    const mine = { stars: g.stars, pts: g.pts, max: g.max, hours: g.hours, beatPar: g.beatPar };
    if (better(mine, r.best)) r.best = mine;
    persist();
    go(`#/case/${def.id}/result`);
  });
}

// ---------- Result ----------

function result(def, st) {
  document.title = `Result · ${def.title} · Legwork`;
  const g = E.grade(def, st, st.report.answers);
  const closed = g.stars > 0;
  const lt = E.routeLeads(def);
  const mine = st.log.map(l => l.lead);
  app.innerHTML = `<div class="wrap">
    ${caseHead(def)}
    <div class="verdict">
      <span class="stamp ${closed ? 'ok' : 'bad'}">${closed ? 'Case closed' : 'Wrong suspect'}</span>
      <span class="stars" aria-label="${g.stars} of 3 stars">${starText(g.stars)}</span>
      ${g.beatPar ? '<p class="mono" style="margin:.4rem 0 0">Every answer right, as fast as the lieutenant. She’s impressed. She won’t say so.</p>' : ''}
    </div>
    <div class="score">
      <div><b>${g.pts}/${g.max}</b><span>Points</span></div>
      <div><b>${esc(hl(g.hours))}</b><span>Your hours</span></div>
      <div><b>${esc(hl(g.par))}</b><span>Lieutenant’s</span></div>
    </div>
    <article class="paper prose">${html(g.outcome)}</article>

    <section class="block"><h2>Your report</h2><ol class="answers">
      ${def.report.map((q, i) => {
        const a = g.per[i];
        const right = [].concat(q.answer)[0];
        return `<li><div class="qq">${esc(q.q)}</div>
          <div class="mine ${a.right ? 'right' : 'wrong'}">${a.right ? '✓' : '✗'} ${esc(q.options[a.answer] || 'No answer')}</div>
          ${a.right ? '' : `<div class="mine right">✓ ${esc(q.options[right])}</div>`}
          <div class="why">${esc(toPlain(q.why, who()))}</div></li>`;
      }).join('')}
    </ol></section>

    <section class="block"><h2>What really happened</h2><article class="paper prose">${html(def.solution.text)}</article></section>

    <section class="block"><h2>The chain</h2>
      <p class="muted" style="margin:0 0 10px;font-size:.98rem">The clues that prove it. You found ${def.solution.chain.filter(id => id in st.clues).length} of ${def.solution.chain.length}.</p>
      <ul class="chain">${def.solution.chain.map(id => {
        const had = id in st.clues;
        return `<li><span class="mark ${had ? 'had' : 'miss'}">${had ? '✓' : '○'}</span><span><b>${esc(def.clues[id].title)}.</b> ${esc(toPlain(def.clues[id].text, who()))}</span></li>`;
      }).join('')}</ul>
    </section>

    <section class="block routes"><h2>The legwork</h2>
      <div class="route paper"><h3>Your route · ${esc(hl(g.hours))}</h3><ol>${mine.map(id => `<li>${esc(def.leads[id]?.title || id)}</li>`).join('')}</ol></div>
      <div class="route paper"><h3>Lt. Okafor’s route · ${esc(hl(g.par))}</h3><ol>${lt.map(id => `<li>${esc(def.leads[id].title)}</li>`).join('')}</ol></div>
    </section>

    <div class="row" style="margin-top:28px">
      <button class="btn" id="again">Play it again</button>
      <a class="btn ghost" href="#/">All cases</a>
      <a class="btn ghost" href="#/case/${def.id}/notes">Your notebook</a>
    </div>
  </div>`;
  app.querySelector('#again').addEventListener('click', () => {
    data.cases[def.id].st = null;
    persist();
    go(`#/case/${def.id}/briefing`);
  });
}

// Offline support. Not on localhost, so a changed file always shows up while working on it.
if ('serviceWorker' in navigator && !['localhost', '127.0.0.1'].includes(location.hostname)) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
