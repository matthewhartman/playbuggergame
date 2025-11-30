// Service Worker
var CACHE_NAME = 'v-1764473480489'
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
})