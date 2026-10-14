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
