const CACHE_NAME = 'ffv-cache-v1';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                // Start with minimal cache and add more as needed
                return cache.addAll([
                    '/',
                    '/index.html',
                    '/manifest.json',
                    '/logo512.png'
                ]).catch(error => {
                    console.error('Cache addAll error:', error);
                });
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
            .catch(() => {
                // Return offline fallback or continue with fetch
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});