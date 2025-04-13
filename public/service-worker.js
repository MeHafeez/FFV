const CACHE_NAME = 'ffv-cache-v1';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(async cache => {
                // Essential static files
                const staticFiles = [
                    '/',
                    '/manifest.json',
                    '/logo192.png',
                    '/logo512.png',
                    '/favicon.ico'
                ];

                // Try to cache each file individually
                for (const file of staticFiles) {
                    try {
                        const response = await fetch(file, { 
                            credentials: 'same-origin',
                            headers: {
                                'Cache-Control': 'no-cache'
                            }
                        });
                        if (response.ok) {
                            await cache.put(file, response);
                            console.log('Successfully cached:', file);
                        } else {
                            console.warn('Failed to fetch:', file, response.status);
                        }
                    } catch (error) {
                        console.error('Cache error for:', file, error);
                    }
                }
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(cached => {
                return cached || fetch(event.request)
                    .then(response => {
                        // Cache successful responses for future
                        if (response.ok) {
                            const responseToCache = response.clone();
                            caches.open(CACHE_NAME)
                                .then(cache => cache.put(event.request, responseToCache));
                        }
                        return response;
                    });
            })
            .catch(() => {
                // Return cached homepage as fallback
                return caches.match('/');
            })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
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