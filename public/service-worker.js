const CACHE_NAME = 'ffv-cache-v2'; // Increment cache version

self.addEventListener('install', event => {
    event.waitUntil(
        Promise.all([
            caches.open(CACHE_NAME).then(cache => {
                // Only cache the homepage and manifest initially
                return cache.add(new Request('/', { 
                    credentials: 'same-origin',
                    mode: 'no-cors'
                })).catch(err => console.log('Home page cache failed:', err));
            }),
            caches.open(CACHE_NAME).then(cache => {
                return cache.add(new Request('/manifest.json', { 
                    credentials: 'same-origin',
                    mode: 'no-cors'
                })).catch(err => console.log('Manifest cache failed:', err));
            })
        ]).catch(error => {
            console.log('Initial caching failed:', error);
            // Continue with installation even if caching fails
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .then(response => {
                // Cache successful responses
                if (response.ok) {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });
                }
                return response;
            })
            .catch(() => {
                return caches.match(event.request);
            })
    );
});

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