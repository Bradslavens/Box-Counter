export const CACHE_VERSION = 1;
export const CACHE_NAME = `box-counter-v${CACHE_VERSION}`;

/** Relative to sw.js — works locally and on GitHub Pages subpaths */
export const PRECACHE_URLS = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './js/counter.js',
  './js/db.js',
  './js/pwa.js',
  './js/sw-config.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
];
