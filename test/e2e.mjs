// Drives the real page in Chromium:  node test/e2e.mjs
// Plays every case by the lieutenant's route, tapping the same buttons a player would, files a
// correct report and checks the result. Along the way it checks the name prompt, saving and reloading
// mid-scene, the notebook, the inbox and a wrong report. Starts its own static server. Needs
// Playwright (npm i -g playwright, or a local install).

import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { CASES } from '../js/cases/index.js';

const require = createRequire(import.meta.url);
let pw;
try { pw = require('playwright'); } catch { pw = require(join(execSync('npm root -g').toString().trim(), 'playwright')); }
const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json' };
const server = createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  try {
    const body = await readFile(join(root, path === '/' ? 'index.html' : path));
    res.writeHead(200, { 'content-type': TYPES[extname(path)] || 'text/html' });
    res.end(body);
  } catch { res.writeHead(404); res.end(); }
}).listen(0);
const base = `http://localhost:${server.address().port}/`;

const browser = await pw.chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });

const text = async sel => (await page.locator(sel).first().textContent()).replace(/\s+/g, ' ').trim();
const step = (name, fn) => fn().then(() => console.log('ok  ', name), e => { console.log('FAIL', name); throw e; });
const settle = () => page.waitForTimeout(60);

async function inScene() { return (await page.locator('#leave').count()) > 0; }

// Plays a route: "@lead", "/" or the start of a choice label.
async function play(walk) {
  for (const s of walk) {
    if (s === '/') { if (await inScene()) await page.click('#leave'); await settle(); continue; }
    if (s.startsWith('@')) {
      if (await inScene()) { await page.click('#leave'); await settle(); }
      await page.click(`[data-lead="${s.slice(1)}"]`);
      await settle();
      continue;
    }
    const clicked = await page.evaluate(want => {
      const b = [...document.querySelectorAll('.choice[data-key]')]
        .find(x => !x.disabled && x.querySelector('span').textContent.trim().toLowerCase().startsWith(want.toLowerCase()));
      if (b) b.click();
      return !!b;
    }, s);
    assert.ok(clicked, `choice "${s}" is on screen`);
    await settle();
  }
  if (await inScene()) { await page.click('#leave'); await settle(); }
}

async function fileReport(def, pick) {
  await page.goto(base + `#/case/${def.id}/report`);
  await settle();
  for (const q of def.report) await page.check(`input[name="${q.id}"][value="${pick(q)}"]`);
  await page.click('#file');
  await page.click('#file');
  await settle();
}

try {
  await page.goto(base);
  await step('first visit asks for a name', async () => {
    await page.waitForSelector('dialog[open]');
    await page.fill('dialog input', 'kerr');
    await page.click('dialog button');
    await page.waitForSelector('dialog', { state: 'detached' }); // the name is saved when it closes
    assert.match(await text('.who'), /Detective Kerr/);
    assert.equal(await page.locator('.folder').count(), CASES.length);
  });

  const first = CASES[0];
  await step('the briefing uses your name and takes the case', async () => {
    await page.click('.folder a');
    assert.match(await text('.briefing'), /Detective Kerr/);
    await page.click('#take');
    assert.match(await text('.clock'), /8 h left/);
  });

  await step('a scene survives a reload', async () => {
    await page.click(`[data-lead="market"]`);
    await page.locator('.choice', { hasText: 'Ask Irene what she found' }).click();
    const before = await page.locator('.transcript > *').count();
    await page.reload();
    await page.waitForSelector('.transcript');
    assert.equal(await page.locator('.transcript > *').count(), before);
    assert.match(await text('.bar-case'), /7½ h left/);
    await page.click('#leave');
  });

  await step('a wrong report says so, and the case can be played again', async () => {
    await fileReport(first, q => Object.keys(q.options).find(k => ![].concat(q.answer).includes(k)));
    assert.match(await text('.stamp'), /Wrong suspect/);
    await page.click('#again');
    await page.click('#take');
  });

  for (const def of CASES) {
    await step(`${def.id}: the lieutenant's route closes the case`, async () => {
      await page.goto(base + `#/case/${def.id}`);
      await settle();
      if (await page.locator('#take').count()) await page.click('#take');
      await settle();
      await play(def.solution.walk);
      await page.goto(base + `#/case/${def.id}/notes/clues`);
      await settle();
      const titles = await page.locator('.card h3').allTextContents();
      for (const id of def.solution.chain) assert.ok(titles.includes(def.clues[id].title), `notebook has "${def.clues[id].title}"`);
      await page.click('.tabs a[href$="timeline"]');
      await page.click('.tabs a[href$="people"]');
      await page.click('.tabs a[href$="log"]');
      await fileReport(def, q => [].concat(q.answer)[0]);
      assert.match(await text('.stamp'), /Case closed/);
      assert.equal((await text('.verdict .stars')), '★★★');
      assert.match(await text('.chain'), new RegExp(def.clues[def.solution.chain[0]].title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    });
  }

  await step('the casebook shows the closed cases', async () => {
    await page.goto(base + '#/');
    await settle();
    assert.equal(await page.locator('.status.closed').count(), CASES.length);
  });

  assert.deepEqual(errors, [], 'no errors in the console');
  console.log('all good');
} finally {
  await browser.close();
  server.close();
}
