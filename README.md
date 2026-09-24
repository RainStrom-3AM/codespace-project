# UA Index

A client-only User-Agent reference for developers. Browse and filter representative browser, device, legacy, and crawler strings, then select an exact record or pick one at random from the current results.

All catalog filtering, selection, and copying happen in the browser. The app has no backend, account, analytics, or persistence. User-Agent strings are test fixtures and do not change your browser's identity.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Development

```sh
npm install
npm run dev
```

## Validation and build

```sh
npm test
npm run lint
npm run build
npm run preview
```

The production build is static and can be hosted by any static-file server.

## Updating the catalog

Add records in `src/data/catalog.ts`. Keep IDs unique and include a concrete full User-Agent string, category, family, platform/device metadata, HTTPS provenance URL, tags, and an ISO review date. Prefer representative known combinations over synthesized or independently randomized tokens. Update `catalogRevision` when reviewing a catalog change and add or adjust tests for new filtering cases. Clearly classify retired agents, embedded clients, and crawlers so they are not mistaken for current interactive browsers.
