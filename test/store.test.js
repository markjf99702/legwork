import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load, save, KEY } from '../js/store.js';
import { byId } from '../js/cases/index.js';
import { walk } from '../js/engine.js';

// The page's localStorage, for Node.
const kept = new Map();
globalThis.localStorage = { getItem: k => kept.get(k) ?? null, setItem: (k, v) => kept.set(k, String(v)) };
const put = v => kept.set(KEY, typeof v === 'string' ? v : JSON.stringify(v));

test('a save loads exactly as it was saved', () => {
  const def = byId('night-deposit');
  const d = { name: 'Kerr', cases: { [def.id]: { st: walk(def, def.solution.walk.slice(0, 6)).st, best: { stars: 2, pts: 80, max: 100, hours: 5, beatPar: false } } } };
  save(d);
  const text = kept.get(KEY);
  const back = load();
  assert.deepEqual(back, d);
  save(back);
  assert.equal(kept.get(KEY), text, 'and saves back unchanged');
});

test('nothing saved, or a save that won’t read, starts fresh', () => {
  kept.clear();
  assert.deepEqual(load(), { name: '', cases: {} });
  for (const bad of ['{', 'null', '[]', '"x"', JSON.stringify({ name: 'Kerr' }), JSON.stringify({ name: 'Kerr', cases: 'x' })]) {
    put(bad);
    assert.deepEqual(load(), { name: '', cases: {} }, bad);
  }
});

test('a damaged save loads without the damage', () => {
  put({ name: 42, cases: { 'night-deposit': null, 'shared-wall': 'x', 'low-water': { best: { stars: 1 } } } });
  const d = load();
  assert.equal(d.name, '42');
  assert.deepEqual(d.cases, { 'low-water': { best: { stars: 1 } } });
  put({ name: { first: 'Kerr' }, cases: {} });
  assert.equal(load().name, '');
});
