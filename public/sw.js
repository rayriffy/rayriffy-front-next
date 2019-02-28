importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

workbox.setConfig({
  debug: false
})

workbox.routing.registerRoute(/\.(?:html)$/,
  workbox.strategies.staleWhileRevalidate()
);

self.addEventListener('install', event => {
  const urls = [
    'https://fonts.googleapis.com/css?family=Roboto:300,400',
    'https://use.fontawesome.com/releases/v5.7.2/css/regular.css',
    'https://use.fontawesome.com/releases/v5.7.2/css/brands.css',
    'https://use.fontawesome.com/releases/v5.7.2/css/fontawesome.css',
    'resources/P64UlbFd9LK9aeUT3S.png',
    'resources/NfJeVlcPAu0b7L3es4.jpg',
    'main.js',
    'index.html',
    '/'
  ];
  const cacheName = 'rayriffy-v2';
  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(urls))
  );
});

workbox.routing.setCatchHandler(() => {
  return caches.match('index.html')
});