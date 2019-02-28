importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

var version = 3;

workbox.setConfig({
  debug: false
})

workbox.routing.registerRoute(/\.(?:html)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'html-cache-v' + version,
  })
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

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg|ico)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'image-cache-v' + version,
  })
)

workbox.routing.registerRoute(
  new RegExp('.*\.js'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'js-cache-v' + version,
  })
)

workbox.routing.registerRoute(
  new RegExp('.*\.css'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'css-cache-v' + version,
  })
)

workbox.routing.setCatchHandler(() => {
  return caches.match('index.html')
});