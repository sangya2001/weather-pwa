const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];

const self = this;

// installation SW
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log('Opened Cache');

            return cache.addAll(urlsToCache)
        })
    )
});

//Listen for requests
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(event.request)
        .then(() => {
            return fetch(event.request)
            .catch(() => caches.match('offline.html')) 
        })
    )
});

//Activate the SW
self.addEventListener('activate', (e) => {
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME)

    e.waitUntil(
        caches.keys()
        .then((cacheNames) => Promise.all(cacheNames.map(cacheName => {
                if(!cacheWhiteList.includes(cacheName)) return caches.delete(cacheName)
        }))))
});