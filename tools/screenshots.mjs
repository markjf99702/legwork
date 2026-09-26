// Renders the README screenshots (docs/*.png) and the link preview (og.png):  node tools/screenshots.mjs
// Plays part of a case by its route so the pictures show a case in progress.
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CASES, byId } from '../js/cases/index.js';

const require = createRequire(import.meta.url);
let pw;
try { pw = require('playwright'); } catch { pw = require(join(execSync('npm root -g').toString().trim(), 'playwright')); }
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json' };
const server = createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let body;
  try { body = await readFile(join(root, path === '/' ? 'index.html' : path)); } catch { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYPES[extname(path)] || 'text/html' });
  res.end(body);
}).listen(0);
const base = `http://localhost:${server.address().port}/`;
const browser = await pw.chromium.launch();
const pause = p => p.waitForTimeout(80);

async function play(page, walk) {
  for (const s of walk) {
    const inScene = await page.locator('#leave').count();
    if (s === '/') { if (inScene) await page.click('#leave'); await pause(page); continue; }
    if (s.startsWith('@')) {
      if (inScene) { await page.click('#leave'); await pause(page); }
      await page.click(`[data-lead="${s.slice(1)}"]`);
      await pause(page);
      continue;
    }
    await page.evaluate(want => {
      [...document.querySelectorAll('.choice[data-key]')]
        .find(x => x.querySelector('span').textContent.trim().toLowerCase().startsWith(want.toLowerCase()))?.click();
    }, s);
    await pause(page);
  }
}

async function start(ctx, id) {
  const page = await ctx.newPage();
  await page.addInitScript(() => { if (!localStorage.getItem('legwork.v1')) localStorage.setItem('legwork.v1', JSON.stringify({ name: 'Kerr', cases: {} })); });
  await page.goto(base + `#/case/${id}`);
  await page.click('#take');
  await pause(page);
  return page;
}

const shot = async (page, name, opts = {}) => {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  await page.screenshot({ path: join(root, 'docs', name), ...opts });
};

const def = byId('night-deposit');
const walk = def.solution.walk;

// Phone: the board with a message in, a scene in progress, and a closed case.
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true });
  let page = await start(ctx, def.id);
  await play(page, walk.slice(0, walk.indexOf('@keystone') + 1));
  await play(page, ['@tasha', 'Ask about closing up', '@landlord', 'Ask about Danny']);
  await page.click('#leave');
  await shot(page, 'phone-board.png');

  await page.click('[data-lead="market"]');
  await play(page, ['Tell Irene what the alarm', 'Talk to Danny', 'Show him the alarm log']);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await shot(page, 'phone-scene.png');

  await page.click('#leave');
  await page.goto(base + `#/case/${def.id}/notes/timeline`);
  await shot(page, 'phone-timeline.png');

  await page.goto(base + `#/case/${def.id}/report`);
  for (const q of def.report) await page.check(`input[name="${q.id}"][value="${[].concat(q.answer)[0]}"]`);
  await page.click('#file');
  await page.click('#file');
  await shot(page, 'phone-result.png');
  await ctx.close();
}

// Laptop: the board with the notebook beside it, in dark mode.
{
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 860 }, deviceScaleFactor: 1.5, colorScheme: 'dark' });
  const page = await start(ctx, def.id);
  await play(page, walk);
  await page.click('[data-dismiss="0"]').catch(() => {});
  await page.evaluate(() => window.scrollTo(0, 0));
  await shot(page, 'desk.png');
  await ctx.close();
}

// The casebook on a phone.
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.addInitScript(() => localStorage.setItem('legwork.v1', JSON.stringify({ name: 'Kerr', cases: {} })));
  await page.goto(base);
  await shot(page, 'phone-cases.png');
  await ctx.close();
}

// The link preview: the stamp, and the case folders fanned out.
{
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 } });
  const page = await ctx.newPage();
  await page.goto(base + 'index.html');
  const css = await readFile(join(root, 'css/app.css'), 'utf8');
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const folders = CASES.map((c, i) => `<div class="folder og-f" style="--i:${i}"><span class="tab">Case ${c.n}</span><div class="body"><h2>${esc(c.title)}</h2><p>${esc(c.crime)}</p></div></div>`).join('');
  await page.setContent(`<!doctype html><html><head><base href="${base}css/"><style>${css}
    body { margin: 0; width: 1200px; height: 630px; overflow: hidden; display: grid; grid-template-columns: 520px 1fr; align-items: center; padding: 0 60px; gap: 40px; }
    .og-text .logo { display: inline-block; font: 88px/1 var(--type); letter-spacing: .06em; color: var(--red); border: 7px solid var(--red); border-radius: 10px; padding: 18px 26px 10px; transform: rotate(-4deg); box-shadow: inset 0 0 0 3px var(--desk), inset 0 0 0 6px var(--red); }
    .og-text p { font-size: 32px; line-height: 1.3; margin: 40px 0 0; }
    .og-stack { position: relative; height: 560px; }
    .og-f { position: absolute; left: 0; right: 0; top: calc(20px + var(--i) * 78px); transform: rotate(calc(-3deg + var(--i) * 1.2deg)); }
    .og-f .body { padding: 18px 22px 44px; }
    .og-f h2 { font-size: 30px; }
    .og-f p { font: 700 16px/1.3 var(--mono); text-transform: uppercase; letter-spacing: .08em; margin-top: 6px; }
  </style></head><body>
    <div class="og-text"><div class="logo">LEGWORK</div><p>Six grounded crimes. Too many leads and not enough hours. Somebody’s story doesn’t add up.</p></div>
    <div class="og-stack">${folders}</div>
  </body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  await page.screenshot({ path: join(root, 'og.png') });
  await ctx.close();
}

await browser.close();
server.close();
console.log('screenshots written');
