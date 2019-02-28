importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

var version = 2;

workbox.setConfig({
  debug: false
})

workbox.routing.registerRoute(/\.(?:html)$/,
  workbox.strategies.staleWhileRevalidate()
);

workbox.router.registerRoute('https://fonts.googleapis.com/(.*)',
  workbox.strategies.cacheFirst({
    cacheName: 'googleapis-v' + version,
    cacheExpiration: {
      maxEntries: 30
    },
    cacheableResponse: {statuses: [0, 200]}
  })
);

workbox.router.registerRoute(/\.(?:png|gif|jpg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'images-cache-v' + version
  })
);

workbox.router.registerRoute(/\.(?:js|css)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'static-resources-v' + version
  })
);

workbox.router.registerRoute('index.html',
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'homepage-resources-v' + version
  })
);

workbox.routing.setCatchHandler(() => {
  return caches.match('index.html')
});