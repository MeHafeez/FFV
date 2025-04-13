const CACHE_NAME = 'ffv-cache-v1';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(async cache => {
                const filesToCache = [
                    '/',
                    '/static/js/bundle.js',        // Development bundle
                    '/static/js/main.chunk.js',    // Main application code
                    '/static/js/vendors~main.chunk.js', // Vendor code
                    '/manifest.json',
                    '/logo192.png',
                    '/logo512.png',
                    '/favicon.ico'
                ];

                // Cache files one by one
                for (const file of filesToCache) {
                    try {
                        await cache.add(file);
                        console.log('Cached:', file);
                    } catch (error) {
                        console.error('Failed to cache:', file, error);
                    }
                }
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
            .catch(() => {
                // If both cache and fetch fail, return a fallback
                if (event.request.url.indexOf('/api/') === -1) {
                    return caches.match('/');
                }
            })
    );
});

// Keep the activate event listener the same
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});