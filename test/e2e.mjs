// Drives the real page in Chromium, as a phone:  node test/e2e.mjs
// Plays every case by the lieutenant's route, tapping the same buttons a player would, files a
// correct report and checks the result. Along the way it checks the name prompt, saving and reloading
// mid-scene, double taps, two tabs at once, the notebook, a wrong report, that text is readable in
// both palettes, that nothing scrolls sideways or loads from elsewhere, and that it works offline.
// Starts its own static server. Needs Playwright and its Chromium (npm i -g playwright, then
// npx playwright install chromium).

import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { CASES } from '../js/cases/index.js';
import { newState, clockAt, walk, fileReport as submit, reportOptions } from '../js/engine.js';

const require = createRequire(import.meta.url);
let pw;
try { pw = require('playwright'); } catch { pw = require(join(execSync('npm root -g').toString().trim(), 'playwright')); }
const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json' };
let down = false; // the offline check takes the server away: setOffline alone doesn't stop the service worker's own fetches
const server = createServer(async (req, res) => {
  if (down) { req.socket.destroy(); return; }
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  try {
    const body = await readFile(join(root, path === '/' ? 'index.html' : path));
    res.writeHead(200, { 'content-type': TYPES[extname(path)] || 'text/html' });
    res.end(body);
  } catch { res.writeHead(404); res.end(); }
}).listen(0);
const base = `http://localhost:${server.address().port}/`;
// The offline copy only installs away from localhost (js/app.js), so the offline check opens the same
// server as legwork.test, which this browser treats as a secure site. That takes Playwright's full
// Chromium rather than its headless shell.
const site = `http://legwork.test:${server.address().port}/`;

const browser = await pw.chromium.launch({
  channel: 'chromium',
  args: ['--host-resolver-rules=MAP legwork.test 127.0.0.1', `--unsafely-treat-insecure-origin-as-secure=${site.slice(0, -1)}`],
});
const PHONE = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true };
const errors = [];
// Errors, and anything that reaches outside the site (it loads nothing from elsewhere).
const watch = p => {
  p.on('pageerror', e => errors.push(e.message));
  p.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  p.on('request', r => { if (![base, site, 'data:'].some(ok => r.url().startsWith(ok))) errors.push(`left the site: ${r.url()}`); });
  return p;
};
const ctx = await browser.newContext(PHONE);
const page = watch(await ctx.newPage());

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
  // A gradient counts as its last colour, which fills the rest of the element: the case folders fade
  // from --manila-2 to --manila in their top 7 px, and what's on them sits below that.
  const fill = e => {
    const s = getComputedStyle(e);
    return (s.backgroundImage.startsWith('linear-gradient') && s.backgroundImage.match(/(?:rgba?|color)\([^)]*\)/g)?.at(-1)) || s.backgroundColor;
  };
  const layers = [];
  for (let e = el; e; e = e.parentElement) {
    const c = rgba(fill(e));
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
    await fits(`the scene at "${s}"`);
  }
  if (await inScene()) { await page.click('#leave'); await settle(); }
  await fits('the board');
}

async function fileReport(def, pick) {
  await page.goto(base + `#/case/${def.id}/report`);
  await settle();
  for (const q of def.report) await page.check(`input[name="${q.id}"][value="${pick(q)}"]`);
  await fits('the report');
  await page.click('#file');
  await settle();
  await page.click('#file');
  await settle();
}

try {
  await page.goto(base);
  await step('first visit asks for a name', async () => {
    await page.waitForSelector('dialog[open]');
    assert.equal(await page.getByRole('dialog', { name: 'What’s your name, Detective?' }).count(), 1, 'the dialog has a name');
    await page.fill('dialog input', 'kerr');
    await page.click('dialog button');
    await page.waitForSelector('dialog', { state: 'detached' }); // the name is saved when it closes
    await settle();
    assert.match(await text('.who'), /Detective Kerr/);
    assert.equal(await page.locator('.folder').count(), CASES.length);
    const rename = async (name, how) => {
      await page.click('#rename');
      await page.fill('dialog input', name);
      if (how === 'button') await page.click('dialog button'); else await page.press('dialog input', how);
      await page.waitForSelector('dialog', { state: 'detached' });
      await settle();
    };
    await rename('Okafor', 'Enter');
    assert.match(await text('.who'), /Detective Okafor/);
    await rename('Novakowski', 'Escape');
    assert.match(await text('.who'), /Detective Okafor/, 'Escape keeps the name you had');
    await rename('kerr', 'button');
    assert.match(await text('.who'), /Detective Kerr/);
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

  await step('a screen reader hears what the board shows', async () => {
    // On a phone the notebook button is just a pencil and a count.
    assert.equal(await page.getByRole('link', { name: /^Notebook, \d+ new$/ }).count(), 1, 'the notebook button says what it is');
    assert.match(await page.locator('[data-lead="market"]').getAttribute('aria-label'), /^Kowalczyk’s Market\. Visited\. Place\./);
    assert.match(await page.locator('[data-lead="amato"]').getAttribute('aria-label'), /^Amato’s Pizza\. New\. Place\./);
  });

  await step('after a choice, focus moves to what it brought', async () => {
    const keys = await browser.newContext(PHONE);
    try {
      await keys.addInitScript(() => { if (!localStorage.getItem('legwork.v1')) localStorage.setItem('legwork.v1', JSON.stringify({ name: 'Kerr', cases: {} })); });
      const p = watch(await keys.newPage());
      await p.goto(base + `#/case/${first.id}`);
      await settle(p);
      await p.click('#take');
      await settle(p);
      await p.click('[data-lead="market"]');
      await settle(p);
      const before = await p.locator('.transcript > *').count();
      await p.focus('.choice[data-key]:not([disabled])');
      await p.keyboard.press('Enter');
      await settle(p);
      const focused = () => p.evaluate(() => { const a = document.activeElement; return { line: a.closest('.transcript') ? a.dataset.i : a.tagName }; });
      assert.deepEqual(await focused(), { line: String(before) }, 'focus is on the first new line, not the page');
      await p.keyboard.press('Tab');
      assert.ok(await p.evaluate(() => document.activeElement.matches('.choice')), 'Tab carries on to the choices');
    } finally { await keys.close(); }
  });

  await step('Back leaves a case in one step', async () => {
    const nav = await browser.newContext(PHONE);
    try {
      await nav.addInitScript(() => { if (!localStorage.getItem('legwork.v1')) localStorage.setItem('legwork.v1', JSON.stringify({ name: 'Kerr', cases: {} })); });
      const p = watch(await nav.newPage());
      const back = async () => { await p.evaluate(() => history.back()); await settle(p); };
      const casebook = async () => (await p.locator('.folders').count()) === 1;
      await p.goto(base);
      await settle(p);
      const steps = await p.evaluate(() => history.length);
      await p.click(`a[href="#/case/${first.id}"]`);
      await settle(p);
      await p.click('#take');
      await settle(p);
      for (const lead of ['market', 'amato']) {
        await p.click(`[data-lead="${lead}"]`);
        await settle(p);
        await p.click('.choice[data-key]:not([disabled])');
        await settle(p);
        await p.click('#leave');
        await settle(p);
      }
      assert.equal(await p.evaluate(() => history.length), steps + 1, 'the case is one step in the history, however many leads you follow');
      // The notebook opens on top of the board; its tabs add nothing.
      await p.click('.dock a[href$="/notes"]');
      await settle(p);
      for (const tab of ['people', 'timeline']) { await p.click(`.tabs a[href$="${tab}"]`); await settle(p); }
      await back();
      assert.equal(await p.evaluate(() => location.hash), `#/case/${first.id}/board`, 'Back from the notebook goes to the board');
      await back();
      assert.ok(await casebook(), 'Back from the board goes to the casebook');
      // Filing the report steps down to the case, so the result is one Back from the casebook too.
      await p.click(`a[href="#/case/${first.id}"]`);
      await settle(p);
      await p.click('.dock a[href$="/report"]');
      await settle(p);
      for (const q of first.report) await p.check(`input[name="${q.id}"][value="${[].concat(q.answer)[0]}"]`);
      await p.click('#file');
      await settle(p);
      await p.click('#file');
      await settle(p);
      assert.equal(await p.locator('.stamp').count(), 1, 'the result is showing');
      await back();
      assert.ok(await casebook(), 'Back from the result goes to the casebook');
    } finally { await nav.close(); }
  });

  await step('small buttons and links are easy to tap', async () => {
    // A tap just past the edges of each, above and below it (and beside the logo), still reaches it.
    const roomy = (sel, sides = [[0, -1], [0, 1]]) => page.locator(sel).first().evaluate((el, sides) => {
      el.scrollIntoView({ block: 'center' });
      const r = el.getBoundingClientRect();
      return sides.every(([dx, dy]) => el.contains(document.elementFromPoint(r.left + r.width / 2 + dx * (r.width / 2 + 6), r.top + r.height / 2 + dy * (r.height / 2 + 6))));
    }, sides);
    // ...without taking taps from the edges of the buttons and links around them.
    const covered = () => page.evaluate(() => {
      const big = [...document.querySelectorAll('.brand, .chip, .linkish, .tap, details.how summary')];
      return [...document.querySelectorAll('#app a, #app button')].filter(c => c.getClientRects().length && !big.includes(c)).filter(c => {
        c.scrollIntoView({ block: 'center' });
        const r = c.getBoundingClientRect();
        return [r.top + 1, r.bottom - 1].some(y => [r.left + 2, r.left + r.width / 2, r.right - 2].some(x => big.some(b => b.contains(document.elementFromPoint(x, y)))));
      }).map(c => c.textContent.trim());
    });
    const where = { [`#/case/${first.id}/board`]: ['.brand', '.chip', '.chip.book', `a[href$="/briefing"]`], '#/': ['#rename', 'details.how summary'], [`#/case/${first.id}/briefing`]: ['#restart'] };
    for (const [hash, sels] of Object.entries(where)) {
      await page.goto(base + hash);
      for (const sel of sels) assert.ok(await roomy(sel), `${sel} on ${hash} is hard to tap`);
      assert.deepEqual(await covered(), [], `on ${hash}, a bigger tap area covers the edge of these`);
    }
    assert.ok(await roomy('.brand', [[-1, 0], [1, 0]]), 'the logo is hard to tap');
    await page.goto(base + `#/case/${first.id}/board`);
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
      const a = watch(await two.newPage()), b = watch(await two.newPage());
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
      const c = watch(await two.newPage());
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

  await step('a damaged save doesn’t blank the page', async () => {
    const done = { ...newState(first), done: true }; // filed, but the report is missing
    for (const save of [{ name: 'Kerr', cases: { [first.id]: null } }, { name: 'Kerr', cases: { [first.id]: { st: { v: 1 } } } },
      { name: 42, cases: {} }, { name: 'Kerr', cases: { [first.id]: { st: done } } }]) {
      const odd = await browser.newContext(PHONE);
      try {
        const p = watch(await odd.newPage());
        await p.addInitScript(s => localStorage.setItem('legwork.v1', s), JSON.stringify(save));
        await p.goto(base + `#/case/${first.id}`);
        assert.match(await p.locator('#app').innerText(), /Take the case/i, JSON.stringify(save).slice(0, 60));
        await p.goto(base + '#/');
        assert.equal(await p.locator('.folder').count(), CASES.length);
      } finally { await odd.close(); }
    }
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
        const p = watch(await narrow.newPage());
        await p.addInitScript(s => localStorage.setItem('legwork.v1', s), JSON.stringify({ name: 'Kerr', cases }));
        await p.goto(base);
        assert.equal(await p.locator('.status.open').count(), CASES.length);
        await fits('the casebook', p);
      } finally { await narrow.close(); }
    }
  });

  await step('the top bar and the notebook fit the smallest phones', async () => {
    const small = await browser.newContext({ ...PHONE, viewport: { width: 320, height: 640 } });
    try {
      for (const def of CASES) {
        const st = newState(def); // at its longest top bar, like "Tue 10:15 AM · 10¾ h left", with 10 new clues
        const bar = t => clockAt(def, t).label.length + String(def.hours - t).length;
        for (let t = 0; t <= def.hours; t += 0.25) if (bar(t) > bar(st.t)) st.t = t;
        for (const id of Object.keys(def.clues).slice(0, 10)) st.fresh[id] = true;
        const p = watch(await small.newPage());
        await p.addInitScript(s => localStorage.setItem('legwork.v1', s), JSON.stringify({ name: 'Kerr', cases: { [def.id]: { st } } }));
        for (const where of ['board', 'notes/people']) {
          await p.goto(base + `#/case/${def.id}/${where}`);
          await fits(`${def.id}'s ${where}`, p);
        }
        await p.close();
      }
    } finally { await small.close(); }
  });

  await step('a lead’s tags stay in one piece', async () => {
    const def = CASES[1]; // The Shared Wall, out of time: long "Not enough time" tags
    const st = newState(def);
    st.t = def.hours;
    for (const width of [390, 320]) {
      const narrow = await browser.newContext({ ...PHONE, viewport: { width, height: 800 } });
      try {
        const p = watch(await narrow.newPage());
        await p.addInitScript(s => localStorage.setItem('legwork.v1', s), JSON.stringify({ name: 'Kerr', cases: { [def.id]: { st } } }));
        await p.goto(base + `#/case/${def.id}/board`);
        const split = await p.locator('.lead .tag').evaluateAll(tags => tags.filter(t => t.getClientRects().length > 1).map(t => t.textContent));
        assert.deepEqual(split, [], `tags split across two lines at ${width} px`);
        await fits('the board', p);
      } finally { await narrow.close(); }
    }
  });

  await step('the result’s stamp lands whole on narrow phones', async () => {
    const { st } = walk(first, first.solution.walk);
    submit(first, st, Object.fromEntries(first.report.map(q => [q.id, Object.keys(q.options).find(k => ![].concat(q.answer).includes(k))])));
    for (const width of [320, 360]) {
      const narrow = await browser.newContext({ ...PHONE, viewport: { width, height: 800 } });
      try {
        const p = watch(await narrow.newPage());
        await p.addInitScript(s => localStorage.setItem('legwork.v1', s), JSON.stringify({ name: 'Kerr', cases: { [first.id]: { st } } }));
        await p.goto(base + `#/case/${first.id}/result`);
        assert.match(await p.locator('.stamp').textContent(), /Wrong suspect/);
        await p.evaluate(() => Promise.all(document.getAnimations().map(a => a.finished)));
        // The verdict clips the stamp sideways while it lands; once it has, none of it is cut off.
        const [stamp, clip] = await p.evaluate(() => ['.stamp', '.verdict'].map(s => { const r = document.querySelector(s).getBoundingClientRect(); return [Math.round(r.left), Math.round(r.right)]; }));
        assert.ok(stamp[0] >= clip[0] && stamp[1] <= clip[1], `the stamp's corners are cut off at ${width} px: ${stamp} in ${clip}`);
        await fits('the result', p);
      } finally { await narrow.close(); }
    }
  });

  await step('a report filed before the case changed keeps its grade', async () => {
    const { st } = walk(first, first.solution.walk);
    submit(first, st, Object.fromEntries(first.report.map(q => [q.id, [].concat(q.answer)[0]])));
    const [one, two] = first.report.slice(-2).map(q => q.id);
    delete st.report.answers[one]; // as if this question came later
    st.report.answers[two] = 'gone'; // and this answer's option had been taken off the form
    const old = await browser.newContext(PHONE);
    try {
      const p = watch(await old.newPage());
      await p.addInitScript(s => localStorage.setItem('legwork.v1', s), JSON.stringify({ name: 'Kerr', cases: { [first.id]: { st } } }));
      await p.goto(base + `#/case/${first.id}/result`);
      assert.equal(await p.locator('.verdict .stars').textContent(), '★★★', 'its stars stand');
      assert.match(await p.locator('.score').innerText(), /100\/100/);
      assert.equal(await p.locator('.answers > li').count(), first.report.length - 1, 'the question it wasn’t asked is left out');
      assert.match(await p.locator('.answers').innerText(), /✗ An option no longer on the form/);
    } finally { await old.close(); }
  });

  await step('a report filed on a hunch gets two stars and says why', async () => {
    const st = newState(first); // filed at once, every answer right, none of the chain
    submit(first, st, Object.fromEntries(first.report.map(q => [q.id, [].concat(q.answer)[0]])));
    const hunch = await browser.newContext(PHONE);
    try {
      const p = watch(await hunch.newPage());
      await p.addInitScript(s => localStorage.setItem('legwork.v1', s), JSON.stringify({ name: 'Kerr', cases: { [first.id]: { st } } }));
      await p.goto(base + `#/case/${first.id}/result`);
      assert.equal(await p.locator('.verdict .stars').textContent(), '★★☆');
      const verdict = (await p.locator('.verdict').innerText()).replace(/\s+/g, ' ');
      assert.match(verdict, /the third star takes the clues that prove each one, and you couldn’t prove any of them\./);
      assert.doesNotMatch(verdict, /as fast as the lieutenant/);
      assert.equal(await p.locator('.answers .unproved').count(), first.report.length, 'every answer is marked');
      await fits('the result', p);
    } finally { await hunch.close(); }
  });

  await step('the third star takes the clues behind each answer, not the whole chain', async () => {
    const right = Object.fromEntries(first.report.map(q => [q.id, [].concat(q.answer)[0]]));
    const routeWithout = (...skip) => {
      const st = walk(first, first.solution.walk.filter(s => !skip.includes(s))).st;
      submit(first, st, right);
      return st;
    };
    // Without Amato's, the night drop that worked never turns up, but the alarm log still breaks Danny's story:
    // every answer proved, half an hour quicker than the lieutenant. Without asking Tasha, nothing in the
    // chain says where the bag was at closing.
    const games = [
      [routeWithout('@amato', 'Ask if he uses'), '★★★', [], /as fast as the lieutenant/],
      [routeWithout('Ask about closing up'), '★★☆', ['where'], /the third star takes the clues that prove each one, and you couldn’t prove 1 of the 4\./],
    ];
    for (const [st, stars, marked, line] of games) {
      const own = await browser.newContext(PHONE);
      try {
        const p = watch(await own.newPage());
        await p.addInitScript(s => localStorage.setItem('legwork.v1', s), JSON.stringify({ name: 'Kerr', cases: { [first.id]: { st } } }));
        await p.goto(base + `#/case/${first.id}/result`);
        assert.equal(await p.locator('.verdict .stars').textContent(), stars);
        assert.match((await p.locator('.verdict').innerText()).replace(/\s+/g, ' '), line);
        const isMarked = await p.locator('.answers > li').evaluateAll(lis => lis.map(li => !!li.querySelector('.unproved')));
        assert.deepEqual(first.report.filter((q, i) => isMarked[i]).map(q => q.id), marked, 'the answers it couldn’t prove are marked');
        await fits('the result', p);
      } finally { await own.close(); }
    }
  });

  await step('a half-filled report asks again for an answer no longer on the form', async () => {
    const st = walk(first, first.solution.walk).st;
    st.draft = Object.fromEntries(first.report.map(q => [q.id, [].concat(q.answer)[0]]));
    st.draft[first.report.at(-1).id] = 'gone'; // picked before that option was taken off the form
    const old = await browser.newContext(PHONE);
    try {
      const p = watch(await old.newPage());
      await p.addInitScript(s => localStorage.setItem('legwork.v1', s), JSON.stringify({ name: 'Kerr', cases: { [first.id]: { st } } }));
      await p.goto(base + `#/case/${first.id}/report`);
      await settle(p);
      await p.click('#file');
      assert.match(await p.locator('#toast').textContent(), /Answer every question first \(1 to go\)/);
      await settle(p);
      await p.click('#file');
      await settle(p);
      assert.equal(await p.locator('#rep').count(), 1, 'nothing was filed');
    } finally { await old.close(); }
  });

  await step('a message fits across the screen', async () => {
    await page.goto(base + `#/case/${first.id}/report`);
    await settle();
    await page.click('#file'); // with nothing answered
    const toast = await page.locator('#toast.show').boundingBox();
    assert.match(await text('#toast'), /Answer every question first/);
    assert.ok(toast.height < 50, `the message is ${Math.round(toast.width)} × ${Math.round(toast.height)} px, on more than one line`);
  });

  await step('the report deals its options in this game’s own order', async () => {
    const shown = () => page.evaluate(() => [...document.querySelectorAll('#rep fieldset')].map(f => [...f.querySelectorAll('input')].map(i => i.value)));
    const before = await shown();
    const { mix } = (await page.evaluate(() => JSON.parse(localStorage.getItem('legwork.v1')))).cases[first.id].st;
    assert.equal(typeof mix, 'number', 'the game keeps its order');
    assert.deepEqual(before, first.report.map(q => reportOptions(q, mix).map(([k]) => k)));
    await page.reload();
    await page.waitForSelector('#rep');
    assert.deepEqual(await shown(), before, 'the same order after a reload');
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
    const closed = { best: { stars: 3, pts: 100, max: 100, hours: 4, beatPar: true } };
    const hunch = newState(first); // filed at once with every answer right: each one marked as not proved
    submit(first, hunch, Object.fromEntries(first.report.map(q => [q.id, [].concat(q.answer)[0]])));
    // [colour scheme, the case's save, page, the things on it to check]
    const checks = [];
    for (const scheme of ['light', 'dark']) {
      checks.push(
        [scheme, null, '#/', ['.hero p', '.who', '.footnote']],
        [scheme, closed, '#/', ['.status .stars']],
        [scheme, null, `#/case/${first.id}`, ['.eyebrow', '.facts span', '#take']],
        [scheme, { st: fresh }, `#/case/${first.id}/board`, ['.tag.new', '.clock .left', '.group h2']],
        [scheme, { st: late }, `#/case/${first.id}/board`, ['.timesup h3']],
        [scheme, { st: visited }, `#/case/${first.id}/notes/clues`, ['.card .src', '.tabs a:not([aria-current])']],
        [scheme, { st: hunch }, `#/case/${first.id}/result`, ['.answers .unproved']],
      );
    }
    for (const [colorScheme, saved, hash, sels] of checks) {
      const look = await browser.newContext({ ...PHONE, colorScheme });
      try {
        const p = watch(await look.newPage());
        const cases = saved ? { [first.id]: saved } : {};
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
      await fits('the notebook');
      const dock = await page.locator('.dock .btn').evaluateAll(bs => bs.map(b => Math.round(b.getBoundingClientRect().height)));
      assert.equal(new Set(dock).size, 1, `the notebook's buttons are ${dock.join(' and ')} px tall`);
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
      assert.equal(await page.locator('.answers .unproved').count(), 0, 'every answer proved');
      assert.match(await text('.chain'), new RegExp(def.clues[def.solution.chain[0]].title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    });
  }

  await step('the casebook shows the closed cases', async () => {
    await page.goto(base + '#/');
    await settle();
    assert.equal(await page.locator('.status.closed').count(), CASES.length);
    await fits('the casebook');
  });

  await step('the maskable icon keeps its picture inside the safe zone', async () => {
    // Android crops a maskable icon to a circle, a squircle or a rounded square, and only the middle
    // circle, 80% across, survives every shape. Outside it there should be nothing but background.
    const look = await browser.newContext();
    try {
      const p = watch(await look.newPage());
      await p.goto(base);
      const stray = await p.evaluate(async () => {
        const icons = (await (await fetch('manifest.webmanifest')).json()).icons;
        const src = icons.find(i => i.purpose === 'maskable').src;
        const img = await createImageBitmap(await (await fetch(src)).blob());
        const n = img.width;
        const g = new OffscreenCanvas(n, n).getContext('2d');
        g.drawImage(img, 0, 0);
        const px = g.getImageData(0, 0, n, n).data;
        const background = [[0xef, 0xd7, 0xa0], [0xe2, 0xc2, 0x7c]]; // the paper and the desk edge
        let count = 0;
        for (let y = 0; y < n; y++) {
          for (let x = 0; x < n; x++) {
            if (Math.hypot(x + 0.5 - n / 2, y + 0.5 - n / 2) <= 0.4 * n) continue;
            const i = (y * n + x) * 4;
            if (!background.some(b => b.every((v, k) => Math.abs(v - px[i + k]) <= 8))) count++;
          }
        }
        return count;
      });
      assert.equal(stray, 0, `${stray} pixels of the picture fall outside the safe zone`);
    } finally { await look.close(); }
  });

  await step('it works offline once it has been opened', async () => {
    const away = await browser.newContext(PHONE);
    try {
      await away.addInitScript(() => { if (!localStorage.getItem('legwork.v1')) localStorage.setItem('legwork.v1', JSON.stringify({ name: 'Kerr', cases: {} })); });
      const p = watch(await away.newPage());
      await p.goto(site);
      await p.waitForFunction(() => navigator.serviceWorker.controller, null, { timeout: 20000 });
      down = true;
      await away.setOffline(true);
      await p.reload();
      assert.equal(await p.locator('.folder').count(), CASES.length, 'the casebook loads offline');
      const q = watch(await away.newPage()); // a case opened from scratch, offline
      await q.goto(site + `#/case/${CASES.at(-1).id}`);
      await settle(q);
      await q.click('#take');
      await settle(q);
      await q.click('[data-lead]:not([disabled])');
      await settle(q);
      assert.equal(await q.locator('#leave').count(), 1, 'a lead opens offline');
    } finally { down = false; await away.setOffline(false); await away.close(); }
  });

  assert.deepEqual(errors, [], 'no errors in the console, and nothing loaded from elsewhere');
  console.log('all good');
} finally {
  await browser.close();
  server.close();
}
