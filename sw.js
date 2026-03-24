const CACHE_VERSION = 'numerology-v2';
const STATIC_ASSETS = [
  './',
  './index.html',
  './css/main.css',
  './css/components.css',
  './js/app.js',
  './js/registry.js',
  './js/calculator.js',
  './js/renderer.js',
  './js/i18n.js',
  './data/letter-values.js',
  './data/reduce.js',
  './data/master-numbers.js',
  './i18n/en.json',
  './i18n/ro.json',
  './js/modules/modules.json',
  './manifest.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_VERSION);
      // Cache static assets
      await cache.addAll(STATIC_ASSETS);
      // Dynamically cache all modules listed in modules.json
      try {
        const resp = await fetch('./js/modules/modules.json');
        const { modules } = await resp.json();
        const modulePaths = modules.map(p => `./js/modules/${p}`);
        await cache.addAll(modulePaths);
      } catch (err) {
        console.warn('Failed to precache modules:', err);
      }
      self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
