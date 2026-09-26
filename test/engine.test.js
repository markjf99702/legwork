import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  parseCond, test as cond, resolveText, clockAt, hoursLabel, deadline, newState, leads, visit, choices, choose,
  walk, grade, fileReport, timeLeft, leave,
} from '../js/engine.js';
import { toHTML } from '../js/text.js';

// A tiny case that exercises every rule.
const tiny = {
  id: 'tiny', title: 'Tiny', crime: 'Test', summary: 'x', days: ['Monday', 'Tuesday'], start: { day: 0, hour: 18 }, hours: 6,
  briefing: 'Go.',
  people: { a: { name: 'A', role: 'r' } },
  clues: {
    c1: { title: 'One', text: 'one' },
    c2: { title: 'Two', text: 'two' },
    c3: { title: 'Three', text: 'three' },
    late: { title: 'Late', text: 'late' },
  },
  leads: {
    home: { title: 'Home', kind: 'place', cost: 1, again: 0.5 },
    lab: { title: 'Lab', kind: 'lab', cost: 0.5, if: 'c1', once: true },
    far: { title: 'Far', kind: 'place', cost: 5, if: '@home' },
    gone: { title: 'Gone', kind: 'person', cost: 1, until: 'fled' },
  },
  scenes: {
    home: {
      text: 'Home. [if c2]You know two.[else]You know nothing.[/if]',
      again: 'Home again.',
      clues: ['c1'],
      choices: [
        { label: 'Ask', text: 'Answer.', clues: ['c2'] },
        { label: 'Dig', cost: 1, text: 'Dug.', clues: ['c3'] },
        { label: 'Upstairs', go: 'up' },
      ],
    },
    up: { text: 'Up.', choices: [{ label: 'Down', go: 'home' }, { label: 'Leave', go: 'board', set: ['left'] }] },
    lab: { text: 'Sent.', timer: { in: 2, text: 'Results.', clues: ['late'] }, choices: [] },
    far: { text: 'Far.', choices: [] },
    gone: { text: 'Gone.', choices: [] },
  },
  events: [{ at: 3, text: 'They fled.', set: ['fled'] }],
  report: [
    { id: 'who', q: 'Who?', options: { a: 'A', b: 'B' }, answer: 'a', points: 60, why: 'x' },
    { id: 'how', q: 'How?', options: { x: 'X', y: 'Y' }, answer: ['x', 'y'], points: 40, why: 'x' },
  ],
  outcomes: { a: 'Right.', default: 'Wrong.' },
  solution: { text: 'x', chain: ['c1', 'c2'], walk: ['@home', 'Ask'] },
};

test('conditions', () => {
  const st = newState(tiny);
  st.clues.c1 = 0; st.flags.f = true; st.visits.home = 1;
  assert.equal(cond('c1', st, tiny), true);
  assert.equal(cond('c2', st, tiny), false);
  assert.equal(cond('c1 & f', st, tiny), true);
  assert.equal(cond('c2 | f', st, tiny), true);
  assert.equal(cond('!(c2 | c3) & @home', st, tiny), true);
  assert.equal(cond('@lab', st, tiny), false);
  assert.equal(cond('time >= 0 & hour >= 18 & day = 0', st, tiny), true);
  assert.equal(cond(undefined, st, tiny), true);
  assert.throws(() => parseCond('c1 &'), /ended early/);
  assert.throws(() => parseCond('(c1'), /missing \)/);
  assert.throws(() => parseCond('time c1'), /comparison/);
});

test('text blocks follow what you know', () => {
  const st = newState(tiny);
  assert.equal(resolveText('[if c1]yes[else]no[/if] and [if !c1]not[/if].', st, tiny), 'no and not.');
  st.clues.c1 = 0;
  assert.equal(resolveText('[if c1]yes[else]no[/if] and [if !c1]not[/if].', st, tiny), 'yes and .');
});

test('the clock rolls over at the end of the working day', () => {
  assert.equal(clockAt(tiny, 0).label, 'Mon 6:00 PM');
  assert.equal(clockAt(tiny, 1.5).label, 'Mon 7:30 PM');
  assert.equal(clockAt(tiny, 2).label, 'Tue 8:00 AM');
  assert.equal(clockAt(tiny, 6).label, 'Tue 12:00 PM');
  assert.equal(clockAt({ start: { hour: 9 }, days: ['Sunday'] }, 3.25).label, 'Sun 12:15 PM');
  assert.equal(deadline({ start: { hour: 9 }, hours: 11, days: ['Sunday', 'Monday'] }).label, 'Sun 8:00 PM');
  assert.equal(hoursLabel(1.5), '1½ h');
  assert.equal(hoursLabel(0.5), '½ h');
  assert.equal(hoursLabel(2), '2 h');
  assert.equal(hoursLabel(0.25), '¼ h');
});

test('visiting a lead spends time, gains clues and opens new leads', () => {
  const st = newState(tiny);
  assert.deepEqual(leads(tiny, st).map(l => l.id), ['home', 'gone']);
  visit(tiny, st, 'home');
  assert.equal(st.t, 1);
  assert.ok('c1' in st.clues);
  assert.deepEqual(leads(tiny, st).map(l => l.id), ['home', 'lab', 'far', 'gone']);
  assert.equal(st.scene.lines[0].text, 'Home. You know nothing.');
  assert.equal(st.scene.lines[1].kind, 'clue');
});

test('choices: once by default, costs, subscenes, leaving', () => {
  const st = newState(tiny);
  visit(tiny, st, 'home');
  const ask = choices(tiny, st).find(c => c.label === 'Ask');
  choose(tiny, st, ask.key);
  assert.ok('c2' in st.clues);
  assert.equal(choices(tiny, st).find(c => c.label === 'Ask'), undefined, 'asked once, gone');
  choose(tiny, st, choices(tiny, st).find(c => c.label === 'Dig').key);
  assert.equal(st.t, 2);
  choose(tiny, st, choices(tiny, st).find(c => c.label === 'Upstairs').key);
  assert.equal(st.scene.id, 'up');
  choose(tiny, st, choices(tiny, st).find(c => c.label === 'Down').key);
  assert.equal(st.scene.lines.at(-1).text, 'Home again.');
  assert.ok(choices(tiny, st).find(c => c.label === 'Upstairs'), 'navigation stays');
  choose(tiny, st, choices(tiny, st).find(c => c.label === 'Upstairs').key);
  choose(tiny, st, choices(tiny, st).find(c => c.label === 'Leave').key);
  assert.equal(st.scene.ended, true, 'the last words stay on screen');
  assert.deepEqual(choices(tiny, st), []);
  assert.equal(st.flags.left, true);
  leave(tiny, st);
  assert.equal(st.scene, null);
});

test('revisits cost less, once-leads close, and leads cost more than the time left are shut', () => {
  const st = newState(tiny);
  visit(tiny, st, 'home');
  const home = leads(tiny, st).find(l => l.id === 'home');
  assert.equal(home.cost, 0.5);
  visit(tiny, st, 'lab');
  const lab = leads(tiny, st).find(l => l.id === 'lab');
  assert.equal(lab.open, false);
  const far = leads(tiny, st).find(l => l.id === 'far');
  assert.equal(far.open, false);
  assert.equal(far.why, 'Not enough time');
  assert.throws(() => visit(tiny, st, 'far'));
});

test('timers and events arrive in the inbox when their time comes', () => {
  const st = newState(tiny);
  visit(tiny, st, 'home');     // t = 1
  visit(tiny, st, 'lab');      // t = 1.5, results due at 3.5
  assert.equal(st.inbox.length, 0);
  visit(tiny, st, 'home');     // t = 2
  visit(tiny, st, 'gone');     // t = 3: the event fires; the lead closes behind you
  assert.equal(st.flags.fled, true);
  assert.equal(leads(tiny, st).find(l => l.id === 'gone').open, false);
  assert.equal(st.inbox.length, 1);
  visit(tiny, st, 'home');     // t = 3.5: results
  assert.ok('late' in st.clues);
  assert.deepEqual(st.inbox.map(m => m.text), ['They fled.', 'Results.']);
  assert.deepEqual(st.inbox[1].clues, ['late']);
  assert.equal(timeLeft(tiny, st), 2.5);
});

test('walking a route and grading a report', () => {
  const { st } = walk(tiny, tiny.solution.walk);
  assert.equal(st.t, 1);
  assert.throws(() => walk(tiny, ['@home', 'Nope']), /isn't a choice/);
  const right = grade(tiny, st, { who: 'a', how: 'y' });
  assert.equal(right.pts, 100);
  assert.equal(right.stars, 3);
  assert.equal(right.par, 1);
  assert.equal(right.beatPar, true);
  assert.equal(right.outcome, 'Right.');
  const half = grade(tiny, st, { who: 'a', how: 'z' });
  assert.equal(half.stars, 1);
  const wrong = grade(tiny, st, { who: 'b', how: 'x' });
  assert.equal(wrong.stars, 0);
  assert.equal(wrong.outcome, 'Wrong.');
  fileReport(tiny, st, { who: 'a', how: 'x' });
  assert.equal(st.done, true);
  assert.equal(leads(tiny, st).find(l => l.id === 'home').open, false);
});

test('saves survive JSON', () => {
  const st = newState(tiny);
  visit(tiny, st, 'home');
  visit(tiny, st, 'lab');
  const back = JSON.parse(JSON.stringify(st));
  for (let i = 0; i < 4; i++) visit(tiny, back, 'home'); // 1.5 + 4 × ½ = 3.5, when the results are due
  assert.ok('late' in back.clues);
});

test('text markup', () => {
  assert.equal(toHTML('Hello *there*, {det}.\nSame para.\n\nNext.', 'Kerr'), '<p>Hello <em>there</em>, Detective Kerr. Same para.</p><p>Next.</p>');
  assert.equal(toHTML('> LOG\n> 22:08 **ARMED**'), '<div class="doc">LOG<br>22:08 <strong>ARMED</strong></div>');
  assert.equal(toHTML('<b>&</b>'), '<p>&lt;b&gt;&amp;&lt;/b&gt;</p>');
});
