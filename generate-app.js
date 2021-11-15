#!/usr/bin/env node
'use strict';

const fs = require('fs');

// Copy contents of index.js, generate an index.html file and copy index.js inline
fs.readFile('./tmp/index.js', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  const html = `<!DOCTYPE html>
<html lang="en" translate="no">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
  <title>Bugger</title>
  <meta name="description" content="Try to swat as many bugs as you can before the timer runs out. #GitHubGameOff">
  <meta name="google" content="notranslate">
  <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon-16x16.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="mask-icon" href="/img/safari-pinned-tab.svg" color="#101010">
  <meta name="msapplication-TileColor" content="#101010">
  <meta name="theme-color" content="#101010">
</head>
<body>
<div id="game" class="game"></div>
<script>
${data}
</script>
<script src="/service-worker.js"></script>
</body>
</html>`;
  fs.writeFile('./dist/index.html', html, 'utf8', function (err) {
    if (err) return console.log(err);
    console.log('index.html has been written to dist/');
  });
});

// Generate new version of service worker
const version = new Date().getTime();
const sw = `// Service Worker
var CACHE_NAME = 'v-${version}'
var urlsToCache = [
  '/'
]

self.addEventListener('install', function(event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      console.log('Opened cache', CACHE_NAME)
      return cache.addAll(urlsToCache)
    })
  )
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      if (response) {
        console.log('Found ', event.request.url, ' in cache')
        return response
      }
      return fetch(event.request).then(function(response) {
        if(!response || response.status !== 200 || response.type !== 'basic') {
          return response
        }
        var responseToCache = response.clone()
        caches.open(CACHE_NAME)
        .then(function(cache) {
          cache.put(event.request, responseToCache)
        })
        return response
      })
    })
  )
})

self.addEventListener('activate', (event) => {
  var cacheKeeplist = [CACHE_NAME]

  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (cacheKeeplist.indexOf(key) === -1) {
          return caches.delete(key)
        }
      }))
    })
  )
})`;
fs.writeFile('./dist/sw.js', sw, 'utf8', function (err) {
  if (err) return console.log(err);
  console.log('sw.js has been written to dist/');
});

// Generate service worker
const serviceworker = `// Service Worker
(function(serviceWorker) {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope)
      }, function(err) {
        console.log('ServiceWorker registration failed: ', err)
      })
    })
  }
})(window.serviceWorker = window.serviceWorker || {})`;
fs.writeFile('./dist/service-worker.js', serviceworker, 'utf8', function (err) {
  if (err) return console.log(err);
  console.log('service-worker.js has been written to dist/');
});

// Generate site.webmanifest
const sitewebmanifest = `{
  "display": "standalone",
  "icons": [
    {
      "sizes": "144x144",
      "src": "/img/android-chrome-144x144.png",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "sizes": "192x192",
      "src": "/img/android-chrome-192x192.png",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "sizes": "512x512",
      "src": "/img/android-chrome-512x512.png",
      "type": "image/png",
      "purpose": "maskable"
    }
  ],
  "name": "Bugger",
  "short_name": "Bugger",
  "description": "Try to swat as many bugs as you can before the timer runs out. #GitHubGameOff",
  "start_url": "/index.html",
  "scope": "/",
  "theme_color": "#101010",
  "background_color": "#101010"
}`;
fs.writeFile('./dist/site.webmanifest', sitewebmanifest, 'utf8', function (err) {
  if (err) return console.log(err);
  console.log('site.webmanifest has been written to dist/');
});