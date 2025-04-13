const CACHE_NAME = 'ffv-cache-v1';

// self.addEventListener('install', event => {
//     event.waitUntil(
//         caches.open(CACHE_NAME)
//             .then(cache => {
//                 // Cache essential files only
//                 return cache.add('/')
//                     .then(() => cache.add('/index.html'))
//                     .then(() => cache.add('/manifest.json'))
//                     .catch(error => {
//                         console.error('Cache add error:', error);
//                         // Continue installation even if caching fails
//                         return Promise.resolve();
//                     });
//             })
//     );
// });

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll([
                    '/',
                    '/index.html',
                    '/manifest.json'
                ]).catch(error => {
                    console.error('Cache addAll error:', error);
                    return Promise.resolve(); // continue installation despite the error
                });
            })
    );
});


self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .catch(() => caches.match(event.request))
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