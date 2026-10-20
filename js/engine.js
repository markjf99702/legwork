// The rules of a case, with no DOM: conditions, the clock, leads, scenes, timers and the report.
// A case is plain data (js/cases/*.js, described in docs/WRITING.md). A save is plain JSON.

// ---------- Conditions ----------
// A condition is a small expression over what you know:
//   pawn_ticket            you have that clue, or that flag is set
//   @bank                  you have been to the lead "bank"
//   !a & (b | c)           not, and, or, parentheses
//   time >= 6, hour < 12, day = 1   working hours spent, the clock's hour (0-24), day number (0 = first)

const NUMERIC = new Set(['time', 'hour', 'day']);
const parsed = new Map();

export function parseCond(src) {
  if (parsed.has(src)) return parsed.get(src);
  const toks = String(src).match(/\s*(>=|<=|!=|[()&|!<>=]|@?[a-z0-9_]+|\d+(?:\.\d+)?|\S)/gi)?.map(s => s.trim()) || [];
  let i = 0;
  const peek = () => toks[i];
  const next = () => toks[i++];
  const fail = msg => { throw new Error(`Bad condition "${src}": ${msg}`); };

  const or = () => {
    let left = and();
    while (peek() === '|') { next(); left = { op: 'or', a: left, b: and() }; }
    return left;
  };
  const and = () => {
    let left = not();
    while (peek() === '&') { next(); left = { op: 'and', a: left, b: not() }; }
    return left;
  };
  const not = () => {
    if (peek() === '!') { next(); return { op: 'not', a: not() }; }
    return atom();
  };
  const atom = () => {
    const t = next();
    if (t === undefined) fail('ended early');
    if (t === '(') {
      const e = or();
      if (next() !== ')') fail('missing )');
      return e;
    }
    if (!/^@?[a-z0-9_]+$/i.test(t)) fail(`unexpected "${t}"`);
    if (NUMERIC.has(t)) {
      const cmp = next();
      if (!['>=', '<=', '>', '<', '=', '!='].includes(cmp)) fail(`${t} needs a comparison`);
      const n = Number(next());
      if (!Number.isFinite(n)) fail(`${t} ${cmp} needs a number`);
      return { op: 'cmp', v: t, cmp, n };
    }
    if (t.startsWith('@')) return { op: 'visited', id: t.slice(1) };
    return { op: 'has', id: t };
  };

  const ast = or();
  if (i < toks.length) fail(`unexpected "${toks[i]}"`);
  parsed.set(src, ast);
  return ast;
}

// Every name a condition mentions, for the case checker: { has: [...], visited: [...] }
export function condNames(src) {
  const out = { has: [], visited: [] };
  const walkAst = n => {
    if (n.op === 'has') out.has.push(n.id);
    else if (n.op === 'visited') out.visited.push(n.id);
    else { if (n.a) walkAst(n.a); if (n.b) walkAst(n.b); }
  };
  walkAst(parseCond(src));
  return out;
}

export function test(src, st, def) {
  if (src === undefined || src === null || src === '') return true;
  const ev = n => {
    switch (n.op) {
      case 'or': return ev(n.a) || ev(n.b);
      case 'and': return ev(n.a) && ev(n.b);
      case 'not': return !ev(n.a);
      case 'has': return n.id in st.clues || !!st.flags[n.id];
      case 'visited': return (st.visits[n.id] || 0) > 0;
      case 'cmp': {
        const c = clockAt(def, st.t);
        const v = n.v === 'time' ? st.t : n.v === 'hour' ? c.hour : c.day;
        switch (n.cmp) {
          case '>=': return v >= n.n; case '<=': return v <= n.n;
          case '>': return v > n.n; case '<': return v < n.n;
          case '=': return v === n.n; default: return v !== n.n;
        }
      }
    }
    return false;
  };
  return ev(parseCond(src));
}

// ---------- Text ----------
// [if cond]shown when true[else]shown when false[/if] (not nested). Resolved when the text is shown,
// so a scene reads differently depending on what you already know.
const IF_BLOCK = /\[if ([^\]]+)\]([\s\S]*?)(?:\[else\]([\s\S]*?))?\[\/if\]/g;

export function resolveText(src, st, def) {
  if (!src) return '';
  return String(src).replace(IF_BLOCK, (_, c, yes, no = '') => (test(c.trim(), st, def) ? yes : no));
}

export function textConds(src) {
  return [...String(src || '').matchAll(IF_BLOCK)].map(m => m[1].trim());
}

// ---------- The clock ----------
// Time is counted in working hours. The day runs from workday[0] to workday[1] (8 a.m. to 8 p.m. unless
// the case says otherwise); going past the end of one day carries on the next morning.

const round = n => Math.round(n * 4) / 4;

export function clockAt(def, t, { endOfDay = false } = {}) {
  const [open, close] = def.workday || [8, 20];
  let day = def.start?.day || 0;
  let hour = (def.start?.hour ?? open) + t;
  while (endOfDay ? hour > close + 1e-9 : hour >= close - 1e-9) { hour = hour - close + open; day++; }
  const names = def.days || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayName = names[day % names.length];
  return { day, hour, dayName, label: `${dayName.slice(0, 3)} ${hourLabel(hour)}` };
}

export function hourLabel(hour) {
  const h = Math.floor(hour + 1e-9);
  const m = Math.round((hour - h) * 60);
  const h12 = ((h + 11) % 12) + 1;
  return `${h12}:${String(m).padStart(2, '0')} ${h % 24 < 12 ? 'AM' : 'PM'}`;
}

export function hoursLabel(h) {
  const whole = Math.floor(h + 1e-9);
  const frac = round(h - whole);
  const f = frac === 0.25 ? '¼' : frac === 0.5 ? '½' : frac === 0.75 ? '¾' : '';
  if (!whole && f) return `${f} h`;
  return `${whole}${f} h`;
}

export function deadline(def) {
  return clockAt(def, def.hours, { endOfDay: true });
}

export function timeLeft(def, st) {
  return Math.max(0, round(def.hours - st.t));
}

// ---------- State ----------

export function newState(def) {
  const st = {
    v: 1, t: 0, clues: {}, src: {}, flags: {}, visits: {}, used: {}, entered: {},
    timers: [], fired: {}, log: [], inbox: [], fresh: {}, seenLeads: {},
    scene: null, done: false, report: null,
  };
  applyEffects(def, st, { clues: def.startClues, set: def.startFlags }, null);
  st.fresh = {};
  return st;
}

// A saved game that can carry on: everything newState() makes, and the report once it's filed. One that's
// been damaged or edited by hand counts as no game in progress rather than breaking the page.
export function usable(st) {
  const obj = x => !!x && typeof x === 'object' && !Array.isArray(x);
  return obj(st) && st.v === 1 && typeof st.t === 'number'
    && ['clues', 'flags', 'visits', 'used', 'entered', 'fired', 'fresh', 'seenLeads'].every(k => obj(st[k]))
    && ['timers', 'log', 'inbox'].every(k => Array.isArray(st[k]))
    && (st.scene == null || (obj(st.scene) && Array.isArray(st.scene.lines)))
    && (!st.done || (obj(st.report) && obj(st.report.answers)));
}

function gainClue(def, st, id, sink, from) {
  if (id in st.clues) return;
  st.clues[id] = st.t;
  (st.src ||= {})[id] = from ?? null; // the lead you were at; null when it came in by phone, mail or the lab
  st.fresh[id] = true;
  if (sink) sink.push({ kind: 'clue', id });
}

// Effects shared by scenes, choices, events and timers:
//   clues: [...]  set: [...]  unset: [...]  timer: { in, text, title, clues, set }
function applyEffects(def, st, fx, sink, from) {
  if (!fx) return;
  for (const id of fx.clues || []) gainClue(def, st, id, sink, from);
  for (const id of fx.set || []) st.flags[id] = true;
  for (const id of fx.unset || []) delete st.flags[id];
  if (fx.timer) {
    const { in: after, ...rest } = fx.timer;
    st.timers.push({ at: round(st.t + after), ...rest, done: false });
  }
}

// Spend working hours. Timers and events that come due are applied and land in the inbox. When you're
// in a scene (including on the way there) the message shows up right there, as your phone ringing, and
// is marked read; otherwise it waits on the board.
function spend(def, st, hours) {
  st.t = round(st.t + (hours || 0));
  for (;;) {
    const due = [];
    st.timers.forEach((tm, i) => { if (!tm.done && tm.at <= st.t + 1e-9) due.push({ at: tm.at, kind: 'timer', i }); });
    (def.events || []).forEach((ev, i) => { if (!st.fired[i] && ev.at <= st.t + 1e-9) due.push({ at: ev.at, kind: 'event', i }); });
    if (!due.length) break;
    due.sort((a, b) => a.at - b.at);
    const d = due[0];
    const item = d.kind === 'timer' ? st.timers[d.i] : def.events[d.i];
    if (d.kind === 'timer') item.done = true; else st.fired[d.i] = true;
    if (item.if && !test(item.if, st, def)) continue;
    const got = [];
    applyEffects(def, st, { clues: item.clues, set: item.set, unset: item.unset }, got);
    if (!item.text) continue;
    const msg = { at: d.at, title: item.title || 'Word comes in', text: resolveText(item.text, st, def), clues: got.map(g => g.id), read: !!st.scene };
    st.inbox.push(msg);
    if (st.scene) st.scene.lines.push({ kind: 'msg', at: msg.at, title: msg.title, text: msg.text, clues: msg.clues });
  }
}

// ---------- Leads ----------

export function leadCost(def, st, id) {
  const lead = def.leads[id];
  return (st.visits[id] || 0) > 0 ? (lead.again ?? lead.cost) : lead.cost;
}

export function leadStatus(def, st, id) {
  const lead = def.leads[id];
  const visible = test(lead.if, st, def);
  const closed = !!lead.until && test(lead.until, st, def);
  const visits = st.visits[id] || 0;
  const spent = lead.once && visits > 0;
  const cost = leadCost(def, st, id);
  const affordable = st.t + cost <= def.hours + 1e-9;
  let why = '';
  if (closed) why = lead.closed || 'Closed';
  else if (spent) why = lead.onceNote || 'Done';
  else if (st.done) why = 'Case filed';
  else if (!affordable) why = 'Not enough time';
  return { id, lead, visible, closed, visits, cost, open: visible && !closed && !spent && affordable && !st.done, why };
}

export function leads(def, st) {
  return Object.keys(def.leads).map(id => leadStatus(def, st, id)).filter(s => s.visible);
}

export function visit(def, st, id) {
  const s = leadStatus(def, st, id);
  if (!s.visible || !s.open) throw new Error(`Can't go to ${id}: ${s.why || 'not available'}`);
  st.scene = { lead: id, id: null, lines: [] }; // before the travel time, so calls on the way show up here
  st.visits[id] = s.visits + 1;
  st.log.push({ t: st.t, lead: id });
  spend(def, st, s.cost);
  enter(def, st, s.lead.scene || id);
}

// ---------- Scenes ----------

function enter(def, st, sceneId) {
  const sc = def.scenes[sceneId];
  if (!sc) throw new Error(`No scene ${sceneId}`);
  const first = !st.entered[sceneId];
  st.entered[sceneId] = (st.entered[sceneId] || 0) + 1;
  st.scene.id = sceneId;
  const text = first || !sc.again ? sc.text : sc.again;
  st.scene.lines.push({ kind: 'scene', title: sc.title || '', text: resolveText(text, st, def) });
  if (first) applyEffects(def, st, sc, st.scene.lines, st.scene.lead);
}

const choiceKey = (sceneId, c) => `${sceneId}:${c.id || c.label}`;

export function choices(def, st) {
  if (!st.scene || st.scene.ended) return [];
  const sc = def.scenes[st.scene.id];
  const left = timeLeft(def, st);
  return (sc.choices || [])
    .filter(c => test(c.if, st, def))
    .filter(c => {
      const once = c.once ?? (!!c.text && !c.go);
      return !(once && st.used[choiceKey(st.scene.id, c)]);
    })
    .map(c => ({
      key: choiceKey(st.scene.id, c), label: c.label, cost: c.cost || 0,
      enabled: (c.cost || 0) <= left + 1e-9, why: (c.cost || 0) > left + 1e-9 ? 'Not enough time' : '',
      leaves: c.go === 'board',
      nav: !!c.go && c.go !== 'board' && !c.text, // just a move to another room or person
    }));
}

export function choose(def, st, key) {
  if (!st.scene) throw new Error('Not in a scene');
  const sceneId = st.scene.id;
  const c = (def.scenes[sceneId].choices || []).find(x => choiceKey(sceneId, x) === key);
  if (!c) throw new Error(`No choice ${key}`);
  const offered = choices(def, st).find(x => x.key === key);
  if (!offered || !offered.enabled) throw new Error(`Choice not available: ${key}`);
  st.used[key] = true;
  // What you do and what you learn come first; anything that comes in while it takes (a call from the
  // lab, an event) follows it, and a timer this choice starts counts from when it's done.
  st.scene.lines.push({ kind: 'you', text: c.say || c.label, cost: c.cost || 0 });
  if (c.text) st.scene.lines.push({ kind: 'reply', text: resolveText(c.text, st, def) });
  const { timer, ...now } = c;
  applyEffects(def, st, now, st.scene.lines, st.scene.lead);
  spend(def, st, c.cost || 0);
  if (timer) applyEffects(def, st, { timer }, null);
  // A choice that ends the scene keeps its text on screen until you head back to the board.
  if (c.go === 'board') st.scene.ended = true;
  else if (c.go) enter(def, st, c.go);
}

export function leave(def, st) {
  st.scene = null;
}

// With nothing left on the board that fits in the time left, you wait, so anything still due by the
// deadline (a result, a call) comes in. Only as long as that takes: to the quarter hour it's due in,
// since the clock moves in quarter hours. True if any time passed.
export function waitOut(def, st) {
  if (st.done || st.scene || leads(def, st).some(s => s.open)) return false;
  const due = [
    ...st.timers.filter(tm => !tm.done).map(tm => tm.at),
    ...(def.events || []).filter((ev, i) => !st.fired[i]).map(ev => ev.at),
  ].filter(at => at > st.t + 1e-9 && at <= def.hours + 1e-9);
  if (!due.length) return false;
  spend(def, st, Math.ceil(Math.min(...due) * 4 - 1e-9) / 4 - st.t);
  return true;
}

// Clues gained in this scene so far, newest last.
export function sceneClues(st) {
  return (st.scene?.lines || []).filter(l => l.kind === 'clue').map(l => l.id);
}

// ---------- The report ----------

// A question's options as [key, label] pairs, in the order the form shows them. Cases list the right
// answer first, so each game deals them in its own order from a seed it keeps (st.mix): the same
// every time the form opens, and different the next time the case is played.
export function reportOptions(q, seed = 0) {
  const opts = Object.entries(q.options);
  let r = seed | 0;
  for (const ch of String(q.id)) r = Math.imul(r ^ ch.codePointAt(0), 16777619); // a stream per question
  const rand = n => { r = (r + 0x6D2B79F5) | 0; let x = Math.imul(r ^ (r >>> 15), 1 | r); x ^= x + Math.imul(x ^ (x >>> 7), 61 | x); return ((x ^ (x >>> 14)) >>> 0) % n; }; // mulberry32
  for (let i = opts.length - 1; i > 0; i--) {
    const j = rand(i + 1);
    [opts[i], opts[j]] = [opts[j], opts[i]];
  }
  return opts;
}

export function grade(def, st, answers) {
  let pts = 0, max = 0;
  const per = def.report.map(q => {
    const right = [].concat(q.answer).includes(answers[q.id]);
    max += q.points;
    if (right) pts += q.points;
    return { id: q.id, right, answer: answers[q.id] };
  });
  const culprit = per[0].right;
  // Three stars, and matching the lieutenant, take the chain as well as the answers: every clue that
  // proves it. A report that's all right without them (a hunch, or a replay filed at once) gets two.
  const chain = def.solution.chain.every(id => id in st.clues);
  const stars = !culprit ? 0 : pts === max && chain ? 3 : pts >= 0.7 * max ? 2 : 1;
  const par = walk(def, def.solution.walk).st.t;
  const key = answers[def.report[0].id];
  const outcome = def.outcomes?.[key] ?? def.outcomes?.default ?? '';
  return { pts, max, per, stars, hours: st.t, par, beatPar: pts === max && chain && st.t <= par + 1e-9, outcome };
}

export function fileReport(def, st, answers) {
  const g = grade(def, st, answers);
  st.scene = null;
  st.done = true;
  st.report = { answers: { ...answers }, pts: g.pts, max: g.max, stars: g.stars, hours: g.hours, beatPar: g.beatPar };
  return g;
}

// A filed report with the grade it was given when it was filed, which stands even if the case's
// questions or the rules for stars change later. Each answer is still checked against the case as it
// is now; a question added since then is marked as not asked (asked: false).
export function filedGrade(def, st) {
  const kept = st.report;
  const g = grade(def, st, kept.answers);
  if ([kept.stars, kept.pts, kept.max].every(Number.isFinite)) Object.assign(g, { stars: kept.stars, pts: kept.pts, max: kept.max, beatPar: !!kept.beatPar });
  g.per = g.per.map(a => ({ ...a, asked: a.id in kept.answers }));
  return g;
}

// ---------- Walking a route ----------
// A route is a list of steps: "@lead" goes there, "/" goes back to the board, and anything else picks
// the choice in the current scene whose label starts with it. Each case's solution.walk is the
// lieutenant's route: the tests play it to prove the case can be solved in time, and the result page
// shows it.

export function walk(def, steps, st = newState(def)) {
  for (const step of steps) {
    if (step === '/') { leave(def, st); continue; }
    if (step.startsWith('@')) {
      if (st.scene) leave(def, st);
      visit(def, st, step.slice(1));
      continue;
    }
    const want = step.toLowerCase();
    const c = choices(def, st).find(x => x.label.toLowerCase().startsWith(want));
    if (!c) throw new Error(`Route step "${step}" isn't a choice in scene ${st.scene?.id ?? '(board)'} at ${st.t} h`);
    choose(def, st, c.key);
  }
  if (st.scene) leave(def, st);
  return { st };
}

export function routeLeads(def) {
  return def.solution.walk.filter(s => s.startsWith('@')).map(s => s.slice(1));
}
