# Box Counter

A simple offline-capable web app for counting boxes lifted over time. Built as a Progressive Web App (PWA) for iPhone home-screen use.

**Live site:** https://Bradslavens.github.io/Box-Counter/

## Features

- Large **+1 Box** button with persistent count via IndexedDB
- Works **offline** after first visit (service worker)
- **Add to Home Screen** on iPhone for a full-screen app experience
- Mobile-first layout
- Test-driven development with Vitest

## Install on iPhone

1. Open **https://Bradslavens.github.io/Box-Counter/** in Safari
2. Tap **Share** → **Add to Home Screen**
3. Launch from the new icon — works offline after the first load

## Development

```bash
npm install
npm test          # run tests once
npm run test:watch  # watch mode
npm start         # local server at http://localhost:3000
```

## Project structure

```
├── index.html       # UI shell + PWA meta tags
├── manifest.json    # Install metadata
├── sw.js            # Service worker (offline cache)
├── css/style.css    # Mobile-first styles
├── icons/           # App icons
├── js/
│   ├── db.js        # IndexedDB persistence
│   ├── counter.js   # Pure counter logic
│   ├── app.js       # DOM wiring
│   ├── pwa.js       # Service worker registration
│   └── sw-config.js # Cache manifest
└── tests/           # Vitest test suite
```
