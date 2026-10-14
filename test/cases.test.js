import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CASES } from '../js/cases/index.js';
import { checkCase } from '../js/check.js';
import { walk, newState, leads, visit, choices, choose, grade, leave, fileReport, usable, reportOptions, waitOut } from '../js/engine.js';

test('case ids and numbers are unique', () => {
  const ids = CASES.map(c => c.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.deepEqual(CASES.map(c => c.n), CASES.map((_, i) => i + 1));
});

test('no two cases share a character’s first or last name', () => {
  const owner = new Map();
  for (const def of CASES) {
    for (const p of Object.values(def.people)) {
      for (const part of p.name.replace(/^(Dr\.|Officer|Special Agent|ADA|Lt\.) /, '').split(/\s+/)) {
        const was = owner.get(part);
        assert.ok(!was || was === def.id, `"${part}" is in both ${was} and ${def.id}`);
        owner.set(part, def.id);
      }
    }
  }
});

// The cases list each right answer first; the form mustn't. Over many games, taking the top option
// for every question scores what guessing does, and almost never closes the case.
test('the report form doesn’t give its answers away by their order', () => {
  for (const def of CASES) {
    const games = 2000;
    let pts = 0, perfect = 0;
    for (let seed = 1; seed <= games; seed++) {
      const got = def.report.filter(q => [].concat(q.answer).includes(reportOptions(q, seed)[0][0]));
      pts += got.reduce((s, q) => s + q.points, 0);
      if (got.length === def.report.length) perfect++;
    }
    const guessing = def.report.reduce((s, q) => s + q.points * [].concat(q.answer).length / Object.keys(q.options).length, 0);
    assert.ok(Math.abs(pts / games - guessing) < 3, `${def.id}: the top option scores ${(pts / games).toFixed(1)} a game, guessing ${guessing.toFixed(1)}`);
    assert.ok(perfect / games < 0.01, `${def.id}: the top option is right every time in ${perfect} of ${games} games`);
  }
});

// The first question names the suspects. A later question that names the culprit answers it for you.
test('no later report question names the culprit', () => {
  for (const def of CASES) {
    const who = def.report[0];
    const names = who.options[[].concat(who.answer)[0]].split(',')[0].replace(/^(Councilman|Dr\.|Officer) /, '').split(/\s+/);
    for (const q of def.report.slice(1)) {
      for (const n of names) assert.doesNotMatch(q.q, new RegExp(`\\b${n}\\b`), `${def.id}: “${q.q}” names the culprit`);
    }
  }
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
    fileReport(def, st, answers);
    assert.ok(usable(JSON.parse(JSON.stringify(st))), 'a filed case loads again');
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
      const rand = n => { r = (r + 0x6D2B79F5) | 0; let x = Math.imul(r ^ (r >>> 15), 1 | r); x ^= x + Math.imul(x ^ (x >>> 7), 61 | x); return ((x ^ (x >>> 14)) >>> 0) % n; }; // mulberry32
      const st = newState(def);
      for (let guard = 0; guard < 400; guard++) {
        assert.ok(usable(JSON.parse(JSON.stringify(st))), `seed ${seed}: a save from step ${guard} loads again`);
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
      if (st.scene) leave(def, st);
      while (waitOut(def, st)); // as the board does when nothing fits
      if (!leads(def, st).some(l => l.open)) assert.deepEqual(st.timers.filter(tm => !tm.done && tm.at <= def.hours + 1e-9), [], `seed ${seed}: a result due by the deadline never came`);
      JSON.parse(JSON.stringify(st));
    }
  });
}

// Case 1: Danny's own story is the only road to Tasha, his landlord and the bank, so the alarm log
// (which ends his interviews) can't be put to him until he has told it.
test('night-deposit: Danny tells his story before he can be shown the alarm log', () => {
  const def = CASES.find(d => d.id === 'night-deposit');
  const { st } = walk(def, ['@market', 'Ask Irene what she found', 'Look over the office', '@keystone', '@amato', 'Ask if he uses', 'Ask if he saw', '@market', '@amato']);
  visit(def, st, 'market'); // the alarm log comes in on the way
  assert.ok('alarm_log' in st.clues, 'the log has come back');
  choose(def, st, choices(def, st).find(c => c.label === 'Talk to Danny').key);
  const offered = () => choices(def, st).map(c => c.label);
  assert.ok(!offered().includes('Show him the alarm log'), 'not before he has said where he was');
  choose(def, st, choices(def, st).find(c => c.label.startsWith('Ask him to walk you through')).key);
  assert.ok(offered().includes('Show him the alarm log'), 'once he has told his story');

  for (let seed = 1; seed <= 200; seed++) { // and no player ever loses him before his story
    let r = seed;
    const rand = n => { r = (r + 0x6D2B79F5) | 0; let x = Math.imul(r ^ (r >>> 15), 1 | r); x ^= x + Math.imul(x ^ (x >>> 7), 61 | x); return ((x ^ (x >>> 14)) >>> 0) % n; }; // mulberry32
    const s = newState(def);
    for (let guard = 0; guard < 400; guard++) {
      if (s.scene) {
        const cs = choices(def, s).filter(c => c.enabled);
        if (!cs.length || rand(6) === 0) { leave(def, s); continue; }
        choose(def, s, cs[rand(cs.length)].key);
        continue;
      }
      const open = leads(def, s).filter(l => l.open);
      if (!open.length) break;
      visit(def, s, open[rand(open.length)].id);
    }
    assert.ok(!('danny_lawyer' in s.clues) || 'danny_story' in s.clues, `seed ${seed}: Danny asked for a lawyer before he told his story`);
  }
});

// Case 1: Danny stays at the store all day (his interviews are the only road to his story), so
// Irene's call at two mustn't say he has gone home.
test('night-deposit: Irene’s call at two leaves Danny where the store says he is', () => {
  const def = CASES.find(d => d.id === 'night-deposit');
  const { st } = walk(def, ['@market', 'Ask Irene what she found', 'Talk to Danny', 'Ask him to walk', '@amato', '@tasha', '@landlord', '@amato', '@amato', '@amato', '@market']);
  const call = st.inbox.find(m => m.title === 'A call from Irene');
  assert.ok(call, 'the call came in');
  assert.doesNotMatch(call.text, /I let him go\.|went home|has gone home/, 'she says he has left');
  visit(def, st, 'market');
  assert.match(st.scene.lines.at(-1).text, /Danny is still in the back/);
  assert.ok(choices(def, st).some(c => c.label === 'Talk to Danny'));
});
