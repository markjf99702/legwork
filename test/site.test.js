import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const file = name => readFile(new URL(`../${name}`, import.meta.url), 'utf8');

test('the installed app opens in the page’s colours', async () => {
  const manifest = JSON.parse(await file('manifest.webmanifest'));
  const light = (await file('index.html')).match(/<meta name="theme-color" content="(#[0-9a-f]+)" media="\(prefers-color-scheme: light\)">/i)[1];
  assert.equal(manifest.theme_color, light);
  assert.equal(manifest.background_color, light);
});

// sw.js changes whenever a file it keeps does, so a release replaces the whole offline copy at once: FILES in sw.js is
// a fingerprint of every file in SHELL (sha1 of each, in the list's order, an address like './' read as its
// index.html; the first 8 hex of the sha1 of those).
test('sw.js changes whenever a file in the offline copy does', async () => {
  const { createHash } = await import('node:crypto');
  const sw = await file('sw.js');
  const shell = [...sw.match(/SHELL = \[([^\]]*)\]/)[1].replace(/\/\/.*/g, '').matchAll(/'([^']*)'/g)].map(m => m[1]);
  const all = createHash('sha1');
  for (const f of shell) all.update(createHash('sha1').update(await readFile(new URL(`../${f.endsWith('/') ? f + 'index.html' : f}`, import.meta.url))).digest());
  const files = all.digest('hex').slice(0, 8);
  assert.equal(sw.match(/const FILES = '([0-9a-f]*)'/)?.[1], files, `a file sw.js keeps for offline has changed: set FILES in sw.js to '${files}'`);
});
