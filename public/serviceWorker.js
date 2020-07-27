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

});

//Activate the SW
self.addEventListener('activate', (e) => {

});