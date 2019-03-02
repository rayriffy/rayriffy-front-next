var EXTRA_FILES = [];

var CHECKSUM = "v2019.03.02-3";

var FILES = [
  '/',
  'index.html',
  'manifest.json',
  'favicon.png',
  'https://fonts.googleapis.com/css?family=Roboto:300,400',
  'https://use.fontawesome.com/releases/v5.7.2/css/regular.css',
  'https://use.fontawesome.com/releases/v5.7.2/css/brands.css',
  'https://use.fontawesome.com/releases/v5.7.2/css/fontawesome.css',
  'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css',
  'resources/NfJeVlcPAu0b7L3es4.jpg',
  'resources/pOxOyHESM2YTPOrpiP.js',
  'resources/IaRMTeYINxFwPlzAZZ.css',
].concat(EXTRA_FILES || []);

var CACHENAME = 'rayriffy-front-' + CHECKSUM;

self.addEventListener('install', function(event) {
  event.waitUntil(caches.open(CACHENAME).then(function(cache) {
    return cache.addAll(FILES);
  }));
});

self.addEventListener('activate', function(event) {
  return event.waitUntil(caches.keys().then(function(keys) {
    return Promise.all(keys.map(function(k) {
      if (k != CACHENAME && k.indexOf('rayriffy-front-') == 0) {
        return caches.delete(k);
      } else {
        return Promise.resolve();
      }
    }));
  }));
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response=>response||fetch(event.request))
      .catch(() => {
        if(event.request.mode == 'navigate') {
          return caches.match('index.html');
        }
      })
  );
});