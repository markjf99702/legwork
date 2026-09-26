// Offline support: keep a copy of the app and the cases so a case can be played with no signal.
// Your progress lives in localStorage, not here.
// Network first, so a new version shows up as soon as you're online.

const CACHE = 'legwork-v1';
const SHELL = [
  './', 'index.html', 'css/app.css', 'icon.svg', 'manifest.webmanifest',
  'fonts/source-serif-4.woff2', 'fonts/source-serif-4-italic.woff2', 'fonts/courier-prime.woff2',
  'fonts/courier-prime-bold.woff2', 'fonts/special-elite.woff2',
  'js/app.js', 'js/engine.js', 'js/text.js', 'js/store.js', 'js/cases/index.js',
  'js/cases/night-deposit.js',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match('index.html'))),
  );
});
