// Drives the real page in Chromium, as a phone:  node test/e2e.mjs
// Plays every case by the lieutenant's route, tapping the same buttons a player would, files a
// correct report and checks the result. Along the way it checks the name prompt, saving and reloading
// mid-scene, double taps, two tabs at once, the notebook, a wrong report, that text is readable in
// both palettes and that nothing scrolls sideways. Starts its own static server. Needs Playwright
// (npm i -g playwright, or a local install).

import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { CASES } from '../js/cases/index.js';
import { newState, clockAt, walk } from '../js/engine.js';

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
const PHONE = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true };
const ctx = await browser.newContext(PHONE);
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });

const text = async sel => (await page.locator(sel).first().textContent()).replace(/\s+/g, ' ').trim();
const step = (name, fn) => fn().then(() => console.log('ok  ', name), e => { console.log('FAIL', name); throw e; });
// The page ignores taps for a moment after it changes (so a double tap can't land on what just
// appeared), so wait that long after each tap that changes it.
const settle = (p = page) => p.waitForTimeout(500);
// Nothing scrolls sideways. A phone widens the page to fit anything wider than the screen, so check
// the page's width as well as the viewport's.
const fits = async (where, p = page) => {
  const w = p.viewportSize().width;
  assert.deepEqual(await p.evaluate(() => [document.documentElement.scrollWidth, innerWidth]), [w, w], `${where} scrolls sideways on a ${w} px phone`);
};

// Taps, then taps again 120 ms later on what the first tap brought up, as a double tap does.
async function doubleTap(one, two = one) {
  await page.evaluate(([a, b]) => new Promise(done => {
    document.querySelector(a).click();
    setTimeout(() => { document.querySelector(b)?.click(); done(); }, 120);
  }), [one, two]);
  await settle();
}

// How well an element's text stands out from what's behind it (the WCAG contrast ratio), as drawn.
const contrast = (p, sel) => p.locator(sel).first().evaluate(el => {
  const rgba = c => {
    const n = c.match(/[\d.]+/g).map(Number);
    const [r, g, b, a = 1] = c.startsWith('color(') ? [n[0] * 255, n[1] * 255, n[2] * 255, n[3]] : n;
    return [r, g, b, a];
  };
  const over = (top, under) => [0, 1, 2].map(i => top[i] * top[3] + under[i] * (1 - top[3])).concat(1);
  const layers = [];
  for (let e = el; e; e = e.parentElement) {
    const c = rgba(getComputedStyle(e).backgroundColor);
    if (c[3]) { layers.unshift(c); if (c[3] === 1) break; }
  }
  const bg = layers.reduce((under, c) => over(c, under), [255, 255, 255, 1]);
  const fg = over(rgba(getComputedStyle(el).color), bg);
  const lum = c => [0.2126, 0.7152, 0.0722].reduce((s, k, i) => { const v = c[i] / 255; return s + k * (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4); }, 0);
  const [hi, lo] = [lum(fg), lum(bg)].sort((a, b) => b - a);
  return (hi + 0.05) / (lo + 0.05);
});

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
  await settle();
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
    await settle();
    assert.match(await text('.who'), /Detective Kerr/);
    assert.equal(await page.locator('.folder').count(), CASES.length);
  });

  const first = CASES[0];
  await step('the briefing uses your name and takes the case', async () => {
    await page.click('.folder a');
    await settle();
    assert.match(await text('.briefing'), /Detective Kerr/);
    await page.click('#take');
    await settle();
    assert.match(await text('.clock'), /8 h left/);
  });

  await step('a scene survives a reload', async () => {
    await page.click(`[data-lead="market"]`);
    await settle();
    await page.locator('.choice', { hasText: 'Ask Irene what she found' }).click();
    const before = await page.locator('.transcript > *').count();
    await page.reload();
    await page.waitForSelector('.transcript');
    assert.equal(await page.locator('.transcript > *').count(), before);
    assert.match(await text('.bar-case'), /7½ h left/);
    await settle();
    await page.click('#leave');
    await settle();
  });

  await step('a double tap does one thing, not two', async () => {
    const st = async () => (await page.evaluate(() => JSON.parse(localStorage.getItem('legwork.v1')))).cases[first.id].st;
    const choice = '.choice[data-key]:not([disabled])';
    await doubleTap('[data-lead="amato"]', choice);
    assert.equal((await st()).scene.lines.filter(l => l.kind === 'you').length, 0, 'opening a lead asked nothing');
    await doubleTap(choice);
    assert.equal((await st()).scene.lines.filter(l => l.kind === 'you').length, 1, 'one question, not two');
    const visits = (await st()).log.length;
    await doubleTap('#leave', '[data-lead]:not([disabled])');
    assert.equal((await st()).scene, null, 'back on the board');
    assert.equal((await st()).log.length, visits, 'no visit started');
  });

  await step('two tabs keep each other’s progress', async () => {
    const two = await browser.newContext(PHONE);
    await two.addInitScript(() => { if (!localStorage.getItem('legwork.v1')) localStorage.setItem('legwork.v1', JSON.stringify({ name: 'Kerr', cases: {} })); });
    try {
      const a = await two.newPage(), b = await two.newPage();
      for (const p of [a, b]) p.on('pageerror', e => errors.push(e.message));
      await a.goto(base); await b.goto(base); await settle(b);
      await b.click(`a[href="#/case/${CASES[1].id}"]`);
      await settle(b);
      await b.click('#take');
      await a.locator('.folder').nth(1).locator('.status.open').waitFor({ timeout: 2000 }); // without a reload
      await settle(a);
      await a.click(`a[href="#/case/${CASES[0].id}"]`);
      await settle(a);
      await a.click('#take');
      await settle(a);
      const cases = await b.evaluate(() => JSON.parse(localStorage.getItem('legwork.v1')).cases);
      assert.ok(cases[CASES[0].id]?.st && cases[CASES[1].id]?.st, 'both cases are still saved');
      // A tab in the background on the same board doesn't take the new leads' NEW tags away.
      const c = await two.newPage();
      c.on('pageerror', e => errors.push(e.message));
      await c.addInitScript(() => Object.defineProperty(Document.prototype, 'hidden', { get: () => true }));
      await c.goto(base + `#/case/${first.id}/board`);
      await settle(c);
      await a.click('[data-lead="market"]');
      await settle(a);
      await a.click('#leave');
      await settle(a);
      assert.equal(await a.locator('[data-lead="amato"] .tag.new').count(), 1, 'Amato’s Pizza is marked NEW');
    } finally { await two.close(); }
  });

  await step('the casebook fits a narrow phone with every case in progress', async () => {
    const cases = {};
    for (const def of CASES) { // at the widest time on its clock, like "Mon 10:00 AM"
      const st = newState(def);
      for (let t = 0; t <= def.hours; t += 0.25) if (clockAt(def, t).label.length > clockAt(def, st.t).label.length) st.t = t;
      cases[def.id] = { st };
    }
    for (const width of [360, 390]) {
      const narrow = await browser.newContext({ ...PHONE, viewport: { width, height: 800 } });
      try {
        const p = await narrow.newPage();
        await p.addInitScript(s => localStorage.setItem('legwork.v1', s), JSON.stringify({ name: 'Kerr', cases }));
        await p.goto(base);
        assert.equal(await p.locator('.status.open').count(), CASES.length);
        await fits('the casebook', p);
      } finally { await narrow.close(); }
    }
  });

  await step('a double tap isn’t a yes to “Sure?”', async () => {
    const saved = async () => (await page.evaluate(() => JSON.parse(localStorage.getItem('legwork.v1')))).cases[first.id].st;
    await page.goto(base + `#/case/${first.id}/briefing`);
    await settle();
    await doubleTap('#restart');
    assert.ok(await saved(), 'the case is still in progress');
    assert.match(await text('#restart'), /Sure\?/);
    await page.click('#restart');
    await settle();
    assert.equal(await saved(), null, 'a second, separate tap starts it over');
    await page.click('#take');
    await settle();
    await page.goto(base + `#/case/${first.id}/report`);
    await settle();
    for (const q of first.report) await page.check(`input[name="${q.id}"][value="${[].concat(q.answer)[0]}"]`);
    await doubleTap('#file');
    assert.equal((await saved()).done, false, 'the report isn’t filed');
    assert.match(await text('#file'), /Sure\?/);
    await page.goto(base + `#/case/${first.id}/board`);
    await settle();
  });

  await step('text is readable in light and dark', async () => {
    const fresh = newState(first);
    const visited = walk(first, ['@market', 'Ask Irene what she found']).st;
    const late = newState(first);
    late.t = first.hours;
    // [colour scheme, the game in progress, page, the things on it to check]
    const checks = [];
    for (const scheme of ['light', 'dark']) {
      checks.push(
        [scheme, null, '#/', ['.hero p', '.who', '.footnote']],
        [scheme, null, `#/case/${first.id}`, ['.eyebrow', '.facts span', '#take']],
        [scheme, fresh, `#/case/${first.id}/board`, ['.tag.new', '.clock .left', '.group h2']],
        [scheme, late, `#/case/${first.id}/board`, ['.timesup h3']],
        [scheme, visited, `#/case/${first.id}/notes/clues`, ['.card .src', '.tabs a:not([aria-current])']],
      );
    }
    for (const [colorScheme, st, hash, sels] of checks) {
      const look = await browser.newContext({ ...PHONE, colorScheme });
      try {
        const p = await look.newPage();
        const cases = st ? { [first.id]: { st } } : {};
        await p.addInitScript(s => localStorage.setItem('legwork.v1', s), JSON.stringify({ name: 'Kerr', cases }));
        await p.goto(base + hash);
        for (const sel of sels) {
          const ratio = await contrast(p, sel);
          assert.ok(ratio >= 4.5, `${sel} on ${hash} in ${colorScheme} is ${ratio.toFixed(2)}:1, under 4.5:1`);
        }
      } finally { await look.close(); }
    }
  });

  await step('a wrong report says so, and the case can be played again', async () => {
    await fileReport(first, q => Object.keys(q.options).find(k => ![].concat(q.answer).includes(k)));
    assert.match(await text('.stamp'), /Wrong suspect/);
    await page.waitForTimeout(600); // the stamp has landed
    await fits('the result');
    await page.click('#again');
    await settle();
    await page.click('#take');
    await settle();
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
      for (const tab of ['timeline', 'people', 'log']) {
        await page.click(`.tabs a[href$="${tab}"]`);
        await settle();
        assert.equal(await page.locator('.tabs a[aria-current="page"]').getAttribute('href'), `#/case/${def.id}/notes/${tab}`);
      }
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
    await fits('the casebook');
  });

  assert.deepEqual(errors, [], 'no errors in the console');
  console.log('all good');
} finally {
  await browser.close();
  server.close();
}
