# Alameda Explorer

A React + Vite single-page app for exploring things to do in Alameda, CA — beaches, trails, shops, and local landmarks.

Originally the final project for INFO6150 (Web UI/UX Engineering).

## Pages

- **Home** — landing page with hero image and intro
- **Explore** — filterable gallery of Alameda activities/places (`ExplorePage`, `ActivityCard`)
- **Detail** — full detail view for a selected activity (`DetailPage`)
- **Settings** — app-wide preferences (`SettingsPage`)
- **Submit** — form to submit a new activity, with JS-based validation (`SubmitPage`)

## Design

- Client-side routing between pages without full reloads, built on React component state (no router library, per course restrictions)
- Shared `Header`/`Footer`/`SkipLink` components; a `<dialog>`-based `Modal` component
- Activity data in `src/data/activities.js`
- Semantic, kebab-case/BEM CSS split per component, with a responsive layout and at least one adaptive breakpoint

## Running

```bash
npm install
npm run build
npx serve -s dist
```

(Or `npm run dev` for local development with HMR.)

## Credits

All images are sourced from Unsplash — see `licenses.txt` for attribution and licensing.
