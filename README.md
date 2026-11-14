# Santhome Alumni Association

Responsive four-page alumni website built with React and Tailwind CSS. It takes cues from the official Santhome school site, Adhi Constructions' GSAP/ScrollTrigger and SplitType motion, Dani's strong visual contrast, Skillang's reusable page structure, and zero2infinity's education-focused navy and blue palette. Local Manrope display typography and DM Sans reading typography keep headings bold and long messages clear.

## Run locally

Use two terminals from this folder:

1. `npm run server` starts the registration API on `http://localhost:4000`.
2. `npm start` starts the React app on `http://localhost:3000` and proxies `/api` requests to the API.

The contact form posts to `POST /api/registrations`. Local submissions are saved in `data/registrations.json`, which is ignored by Git. `GET /api/health` reports whether the API is available.

The JSON file store is for local development. Before collecting real alumni information in production, connect an access-controlled database and configure secure deployment, backups, privacy notice, and retention rules.

## GitHub Pages reference site

The `main` branch deploys the React frontend to [https://daniel15maria.github.io/santhome](https://daniel15maria.github.io/santhome) through GitHub Actions. GitHub Pages serves static files, so the local Express registration API is not deployed there; event registration requires a separately hosted API.

## Pages

- `src/pages/Overview`
- `src/pages/Events`
- `src/pages/Gallery`
- `src/pages/Contact`

The photo albums use the local archive in `src/assets/images/shared_images`; the five playable alumni clips are in `src/assets/videos/our-videos`.

Shared navigation lives in `src/App.js`; Tailwind tokens and reusable component utilities live in `tailwind.config.js` and `src/index.css`; shared responsive styles live in `src/App.css`; and GSAP motion is scoped through `src/animations/usePageAnimations.js`.
