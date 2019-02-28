importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

var version = 2;

workbox.setConfig({
  debug: false
})

workbox.routing.registerRoute(/\.(?:html)$/,
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  new RegExp('.*(?:googleapis|gstatic)\.com.*$'),
  workbox.strategies.cacheFirst({
    cacheName: 'googleapis-v' + version,
    cacheExpiration: {
      maxEntries: 30
    },
    cacheableResponse: {statuses: [0, 200]}
  }),
);

workbox.routing.registerRoute('/resources/(.*)',
  workbox.strategies.cacheFirst({
    cacheName: 'images-cache-v' + version
  })
);

workbox.routing.registerRoute('/\.(?:js|css)$/',
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'static-resources-v' + version
  })
);

workbox.routing.setCatchHandler(() => {
  return caches.match('index.html')
});