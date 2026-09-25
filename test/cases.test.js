import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CASES } from '../js/cases/index.js';
import { checkCase } from '../js/check.js';
import { walk, newState, leads, visit, choices, choose, grade, leave } from '../js/engine.js';

test('case ids and numbers are unique', () => {
  const ids = CASES.map(c => c.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.deepEqual(CASES.map(c => c.n), CASES.map((_, i) => i + 1));
});

for (const def of CASES) {
  test(`${def.id}: passes the case checker`, () => {
    assert.deepEqual(checkCase(def), []);
  });

  test(`${def.id}: the lieutenant's route solves it in time`, () => {
    const { st } = walk(def, def.solution.walk);
    for (const id of def.solution.chain) assert.ok(id in st.clues, `route finds ${id}`);
    assert.ok(st.t <= def.hours, `route takes ${st.t} of ${def.hours} h`);
    const answers = Object.fromEntries(def.report.map(q => [q.id, [].concat(q.answer)[0]]));
    const g = grade(def, st, answers);
    assert.equal(g.stars, 3);
    assert.equal(g.beatPar, true);
  });

  test(`${def.id}: there isn't time to do everything`, () => {
    const firstVisits = Object.values(def.leads).reduce((s, l) => s + l.cost, 0);
    const choiceCosts = Object.values(def.scenes).flatMap(s => s.choices || []).reduce((s, c) => s + (c.cost || 0), 0);
    assert.ok(firstVisits + choiceCosts > def.hours, `${firstVisits + choiceCosts} h of work in ${def.hours} h`);
  });

  // A careless detective: go everywhere open, pick every choice, until the time runs out. Nothing
  // should throw, and the case should end with the clock at or under the deadline.
  test(`${def.id}: a player who tries everything never breaks it`, () => {
    for (let seed = 1; seed <= 25; seed++) {
      let r = seed;
      const rand = n => { r = (r * 1103515245 + 12345) % 2147483648; return r % n; };
      const st = newState(def);
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
      assert.ok(st.t <= def.hours + 1e-9, `seed ${seed}: ${st.t} h`);
      JSON.parse(JSON.stringify(st));
    }
  });
}
