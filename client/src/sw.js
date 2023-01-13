self.__WB_MANIFEST.push({
  url: 'index.html',
  // random string
  revision: 'b3d9b0b0b0b0b0b0b0b0b0b0b0b0b0b0',
});

// Pas super utile, mais ça permet de voir que le service worker est bien installé et qu'il fonctionne
self.addEventListener('install', function (event) {
  console.log('installing');
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  console.log('activating');
  self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  console.log('fetching');
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
