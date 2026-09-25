// Checks a case for mistakes a player would trip over: a lead with no scene, a clue nobody can find,
// a condition naming a flag that's never set, a report answer that isn't one of its options, or a
// solution that can't be reached in the hours given. Used by the tests (npm test).

import { parseCond, condNames, textConds, walk } from './engine.js';

export function checkCase(def) {
  const errs = [];
  const err = m => errs.push(`${def.id || '(no id)'}: ${m}`);

  for (const k of ['id', 'title', 'crime', 'summary', 'hours', 'briefing', 'people', 'clues', 'leads', 'scenes', 'report', 'solution']) {
    if (def[k] === undefined) err(`missing ${k}`);
  }
  if (errs.length) return errs;

  const clueIds = new Set(Object.keys(def.clues));
  const leadIds = new Set(Object.keys(def.leads));
  const sceneIds = new Set(Object.keys(def.scenes));
  const people = new Set(Object.keys(def.people));

  // Everything that can have effects, with a name for messages.
  const holders = [];
  holders.push(['start', { clues: def.startClues, set: def.startFlags }]);
  for (const [sid, sc] of Object.entries(def.scenes)) {
    holders.push([`scene ${sid}`, sc]);
    if (sc.timer) holders.push([`scene ${sid} timer`, sc.timer]);
    for (const c of sc.choices || []) {
      holders.push([`scene ${sid} choice "${c.label}"`, c]);
      if (c.timer) holders.push([`scene ${sid} choice "${c.label}" timer`, c.timer]);
    }
  }
  (def.events || []).forEach((ev, i) => holders.push([`event ${i}`, ev]));

  const flags = new Set();
  const gainable = new Set();
  for (const [where, h] of holders) {
    for (const id of h.clues || []) {
      if (!clueIds.has(id)) err(`${where} gives unknown clue "${id}"`);
      gainable.add(id);
    }
    for (const id of [...(h.set || []), ...(h.unset || [])]) flags.add(id);
  }
  for (const id of flags) if (clueIds.has(id)) err(`"${id}" is both a clue and a flag`);
  for (const id of clueIds) if (!gainable.has(id)) err(`clue "${id}" can never be found`);

  const checkCond = (where, src) => {
    if (src === undefined) return;
    try {
      parseCond(src);
      const n = condNames(src);
      for (const id of n.has) if (!clueIds.has(id) && !flags.has(id)) err(`${where}: condition "${src}" names "${id}", which is no clue or flag`);
      for (const id of n.visited) if (!leadIds.has(id)) err(`${where}: condition "${src}" names lead "@${id}", which doesn't exist`);
    } catch (e) { err(`${where}: ${e.message}`); }
  };
  const checkText = (where, text) => {
    if (text === undefined) return;
    if (typeof text !== 'string') { err(`${where}: text should be a string`); return; }
    const opens = (text.match(/\[if /g) || []).length;
    const closes = (text.match(/\[\/if\]/g) || []).length;
    if (opens !== closes) err(`${where}: ${opens} [if] but ${closes} [/if]`);
    for (const c of textConds(text)) checkCond(where, c);
    for (const m of text.matchAll(/\{(\w+)\}/g)) if (!['det', 'name'].includes(m[1])) err(`${where}: unknown placeholder {${m[1]}}`);
  };

  checkText('briefing', def.briefing);

  const reachedScenes = new Set();
  for (const [lid, lead] of Object.entries(def.leads)) {
    const sid = lead.scene || lid;
    if (!sceneIds.has(sid)) err(`lead ${lid} goes to missing scene "${sid}"`);
    reachedScenes.add(sid);
    if (!lead.title) err(`lead ${lid} has no title`);
    if (!['place', 'person', 'records', 'lab', 'phone'].includes(lead.kind)) err(`lead ${lid} has kind "${lead.kind}"`);
    if (typeof lead.cost !== 'number' || lead.cost < 0 || lead.cost * 4 % 1) err(`lead ${lid} cost should be a number of quarter hours`);
    checkCond(`lead ${lid} if`, lead.if);
    checkCond(`lead ${lid} until`, lead.until);
  }

  for (const [sid, sc] of Object.entries(def.scenes)) {
    checkText(`scene ${sid}`, sc.text);
    checkText(`scene ${sid} again`, sc.again);
    if (!sc.text) err(`scene ${sid} has no text`);
    const labels = new Set();
    for (const c of sc.choices || []) {
      const key = c.id || c.label;
      if (!c.label) err(`scene ${sid} has a choice with no label`);
      if (labels.has(key)) err(`scene ${sid} has two choices "${key}"`);
      labels.add(key);
      checkCond(`scene ${sid} choice "${c.label}"`, c.if);
      checkText(`scene ${sid} choice "${c.label}"`, c.text);
      if (c.go && c.go !== 'board') {
        if (!sceneIds.has(c.go)) err(`scene ${sid} choice "${c.label}" goes to missing scene "${c.go}"`);
        reachedScenes.add(c.go);
      }
      if (c.cost !== undefined && (typeof c.cost !== 'number' || c.cost * 4 % 1)) err(`scene ${sid} choice "${c.label}" cost should be quarter hours`);
      if (!c.text && !c.go && !c.clues && !c.set) err(`scene ${sid} choice "${c.label}" does nothing`);
    }
  }
  for (const sid of sceneIds) if (!reachedScenes.has(sid)) err(`scene ${sid} is never reached`);

  (def.events || []).forEach((ev, i) => {
    if (typeof ev.at !== 'number') err(`event ${i} has no "at"`);
    checkCond(`event ${i}`, ev.if);
    checkText(`event ${i}`, ev.text);
  });
  for (const [where, h] of holders) if (h.timer) checkText(`${where} timer`, h.timer.text);

  for (const [cid, clue] of Object.entries(def.clues)) {
    if (!clue.title || !clue.text) err(`clue ${cid} needs a title and text`);
    for (const p of [].concat(clue.who || [])) if (!people.has(p)) err(`clue ${cid} names unknown person "${p}"`);
    if (clue.at && !/^[A-Z][a-z]{2} \d{1,2}:\d{2}$/.test(clue.at)) err(`clue ${cid} "at" should look like "Sat 22:08"`);
    if (clue.at) {
      const days = (def.days || []).map(d => d.slice(0, 3));
      if (!days.includes(clue.at.slice(0, 3))) err(`clue ${cid} "at" day isn't one of the case's days`);
    }
  }
  for (const [pid, p] of Object.entries(def.people)) {
    if (!p.name || !p.role) err(`person ${pid} needs a name and role`);
    checkCond(`person ${pid}`, p.if);
  }

  if (!Array.isArray(def.report) || def.report.length < 2) err('report needs at least two questions');
  else {
    const ids = new Set();
    for (const q of def.report) {
      if (ids.has(q.id)) err(`report question id "${q.id}" repeats`);
      ids.add(q.id);
      if (!q.q || !q.options || !q.points) err(`report question ${q.id} needs q, options and points`);
      for (const a of [].concat(q.answer)) if (!(a in (q.options || {}))) err(`report question ${q.id} answer "${a}" isn't an option`);
      if (!q.why) err(`report question ${q.id} needs a "why"`);
    }
    const culpritOpts = Object.keys(def.report[0].options || {});
    for (const k of Object.keys(def.outcomes || {})) if (k !== 'default' && !culpritOpts.includes(k)) err(`outcome "${k}" isn't an option of the first question`);
  }

  const sol = def.solution;
  if (!sol.text || !Array.isArray(sol.chain) || !Array.isArray(sol.walk)) err('solution needs text, chain and walk');
  else {
    for (const id of sol.chain) if (!clueIds.has(id)) err(`solution chain names unknown clue "${id}"`);
    try {
      const { st } = walk(def, sol.walk);
      const missing = sol.chain.filter(id => !(id in st.clues));
      if (missing.length) err(`the lieutenant's route doesn't find: ${missing.join(', ')}`);
      if (st.t > def.hours) err(`the lieutenant's route takes ${st.t} h of ${def.hours}`);
    } catch (e) { err(`the lieutenant's route fails: ${e.message}`); }
  }

  return errs;
}
