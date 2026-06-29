import { describe, it, expect } from 'vitest';
import { CACHE_NAME, PRECACHE_URLS } from '../js/sw-config.js';

describe('sw-config', () => {
  it('uses a versioned cache name', () => {
    expect(CACHE_NAME).toMatch(/^box-counter-v\d+$/);
  });

  it('includes all app shell resources', () => {
    expect(PRECACHE_URLS).toEqual(
      expect.arrayContaining([
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
      ]),
    );
  });
});
