const CACHE_NAME = 'anlik-cache-v1';
const urlsToCache = [
  '/web/app.html',
  '/web/index.html',
  '/web/manifest.json',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/lucide@latest',
  'https://rsms.me/inter/inter.css',
  // Diğer statik varlıklar eklenebilir
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Önbelleğe başarıyla eklendi');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
