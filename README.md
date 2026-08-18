# Atlas — Country Explorer

A React app for browsing every country in the world — search by name, filter by region, save favorites, and view details (capital, population, languages, currencies) pulled live from the [countries.dev](https://countries.dev/) API.

**🔗 Live demo:** [add your Netlify/Vercel URL here after deploying]

> **Note:** this project originally used restcountries.com's v3.1 API, which was shut down after this project was built (its replacement, v5, requires a paid-tiered API key). It now uses [countries.dev](https://countries.dev/), a free, keyless, CORS-enabled alternative with an equivalent dataset.

## Features

- Live data for 250 countries from a free, keyless REST API — no backend, no signup, no API key
- Debounced search (filters as you type, without re-filtering on every keystroke)
- Region filter and a "favorites only" toggle, favorites persisted in `localStorage`
- Detail panel with capital, population, area, languages, currencies, and coordinates
- Responsive grid, down to small mobile screens
- Performance: memoized filtering (`useMemo`), memoized cards (`React.memo`) so typing stays smooth even with 250 cards on screen, lazy-loaded flag images

## Tech stack

React 18, Vite, plain CSS (no UI framework) — deliberately no extra dependencies beyond React itself, to keep the bundle small and the code readable.
