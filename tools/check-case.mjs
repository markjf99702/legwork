// Checks one case file and plays its solution route:  node tools/check-case.mjs js/cases/<id>.js
// Prints problems, the route's hours against the budget, what arrived in the inbox along the way,
// and how much work the case holds in total.
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { checkCase } from '../js/check.js';
import { walk, clockAt, deadline, newState, leads, visit, choices, choose, leave, hoursLabel } from '../js/engine.js';

const file = process.argv[2];
if (!file) { console.error('usage: node tools/check-case.mjs js/cases/<id>.js'); process.exit(2); }
const def = (await import(pathToFileURL(resolve(file)).href)).default;

const errs = checkCase(def);
if (errs.length) {
  console.log(`${errs.length} problem(s):`);
  for (const e of errs) console.log('  - ' + e);
} else console.log('checker: ok');

try {
  const { st } = walk(def, def.solution.walk);
  console.log(`route: ${hoursLabel(st.t)} of ${hoursLabel(def.hours)} (ends ${clockAt(def, st.t).label}, deadline ${deadline(def).label})`);
  console.log(`route finds ${Object.keys(st.clues).length} of ${Object.keys(def.clues).length} clues`);
  for (const m of st.inbox) console.log(`  inbox @${m.at} h: ${m.title}`);
} catch (e) { console.log('route FAILS: ' + e.message); }

const firstVisits = Object.values(def.leads).reduce((s, l) => s + l.cost, 0);
const choiceCosts = Object.values(def.scenes).flatMap(s => s.choices || []).reduce((s, c) => s + (c.cost || 0), 0);
console.log(`work in the case: ${firstVisits} h of first visits + ${choiceCosts} h of costly choices, budget ${def.hours} h`);

let words = 0;
const count = t => { if (t) words += String(t).split(/\s+/).length; };
count(def.briefing);
for (const s of Object.values(def.scenes)) { count(s.text); count(s.again); count(s.timer?.text); for (const c of s.choices || []) { count(c.text); count(c.timer?.text); } }
for (const e of def.events || []) count(e.text);
count(def.solution.text);
for (const o of Object.values(def.outcomes || {})) count(o);
console.log(`about ${words} words, ${Object.keys(def.leads).length} leads, ${Object.keys(def.scenes).length} scenes, ${Object.keys(def.clues).length} clues`);

// Random players, to shake out anything that throws.
let crashes = 0;
for (let seed = 1; seed <= 200; seed++) {
  let r = seed;
  const rand = n => { r = (r * 1103515245 + 12345) % 2147483648; return r % n; };
  const st = newState(def);
  try {
    for (let guard = 0; guard < 400; guard++) {
      if (st.scene) {
        const cs = choices(def, st).filter(c => c.enabled);
        if (!cs.length || rand(6) === 0) { leave(def, st); continue; }
        choose(def, st, cs[rand(cs.length)].key);
        continue;
      }
      const open = leads(def, st).filter(l => l.open);
      if (!open.length) break;
      visit(def, st, open[rand(open.length)].id);
    }
  } catch (e) { crashes++; if (crashes < 4) console.log(`random player ${seed} crashed: ${e.message}`); }
}
console.log(crashes ? `${crashes} of 200 random players crashed` : '200 random players: no crashes');
