// src/sw.js

// ESLint global registration
/* global serviceWorkerOption: false */

const cacheName = 'dalat-cache';
const isExcluded = f => /hot-update|sockjs/.test(f);

const filesToCache = [
  ...serviceWorkerOption.assets.filter(file => !isExcluded(file)),
  '/',
  'https://www.gstatic.com/firebasejs/8.2.3/firebase-app.js',
  'https://www.gstatic.com/firebasejs/8.2.3/firebase-database.js'
  /*
  'https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0-beta.2/superhero/bootstrap.min.css',
  'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
  */
];

// Cache known assets up-front
const preCache = () =>
  caches.open(cacheName).then(cache => {
    cache.addAll(filesToCache);
  });

// Handle the 'install' event
self.addEventListener('install', event => {
  event.waitUntil(preCache());
});

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then((res) => {
    return res ? res : handleNoCacheMatch(event);
  }));
});
