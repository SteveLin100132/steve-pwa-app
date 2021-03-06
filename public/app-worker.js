var dataCacheName = 'steveapp-data-v1';
var cacheName = 'steveapp-pwa';
var filesToCache = [
    "/",
    "./index.html",
    "./bower_components/firebase/firebase.js",
    "./bower_components/less/dist/less.min.js",
    "./scripts/app.js",
    "./script/models/firebase-connection.js",
    "./script/models/login-model.js",
    "./script/controllers/login-controller.js",
    "./script/views/login-view.js",
    "./styles/globla.less",
    "./styles/index.less",
    "./styles/theme.less",
    "./images/logo.svg",
    "./images/icons/icon-128x128.png",
    "./images/icons/icon-144x144.png",
    "./images/icons/icon-152x152.png",
    "./images/icons/icon-192x192.png",
    "./images/icons/icon-256x256.png",
    "./images/750x1334-startup.png",
    "./images/icons8_Cloud_50px.png",
    "./images/icons8_Key_50px.png"
];

self.addEventListener('install', function(e) {
    console.log("[AppWorker] Install");
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log("[AppWorker] Caching app shell");
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', function(e) {
    console.log("[AppWorker] Activate");
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName && key !== dataCacheName) {
                    console.log("[AppWorker] Removing old cache", key);
                    return caches.delete(key);
                }
            }));
        })
    );

    return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});
