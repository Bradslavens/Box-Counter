# Box Counter

A simple offline-capable web app for counting boxes lifted over time. Built as a Progressive Web App (PWA) for iPhone home-screen use.

## Phase 1 (current)

- Large **+1 Box** button with persistent count via IndexedDB
- Mobile-first layout
- Test-driven development with Vitest

## Development

```bash
npm install
npm test          # run tests once
npm run test:watch  # watch mode
```

Serve locally (any static server):

```bash
npx serve .
```

Then open in a browser — use your phone on the same network for mobile testing.

## Project structure

```
├── index.html       # UI shell
├── css/style.css    # Mobile-first styles
├── js/
│   ├── db.js        # IndexedDB persistence
│   ├── counter.js   # Pure counter logic
│   └── app.js       # DOM wiring
└── tests/           # Vitest test suite
```
