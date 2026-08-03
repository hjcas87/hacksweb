# HACKS — Universo HACKS

Marketing agency one-pager for **HACKS Digital**. Dark, space-themed, motion-heavy landing
built to feel modern and "fly" (custom rocket cursor, scroll reveals, rotating headline,
smooth scroll, marquees).

> Content is Spanish (es-AR) — code, naming and comments are English.

## Stack

- **[Astro](https://astro.build)** — static output, fast, SEO-friendly
- **[Tailwind CSS v4](https://tailwindcss.com)** — via `@tailwindcss/vite`, CSS-first tokens in `src/styles/global.css`
- **[GSAP](https://gsap.com)** + ScrollTrigger — scroll animations, counters, magnetic + rocket cursor
- **[Lenis](https://github.com/darkroomengineering/lenis)** — smooth scroll (synced with ScrollTrigger)

## Commands

| Command           | Action                                    |
| ----------------- | ----------------------------------------- |
| `npm install`     | Install dependencies                      |
| `npm run dev`     | Dev server at `localhost:4321`            |
| `npm run build`   | Build to `./dist/`                        |
| `npm run preview` | Preview the production build locally      |

## Structure

```
src/
  data/site.ts          # single source of truth for content (ES copy, EN keys)
  layouts/Layout.astro  # <head>, fonts, space backdrop, rocket cursor markup
  scripts/motion.js     # Lenis + GSAP: cursor, magnetic, reveals, rotator, counters
  styles/global.css     # design tokens + base styles
  components/            # Nav, Hero, Marquee, Services, Projects, About,
                         # Testimonials, Podcast, Contact, Footer
  pages/index.astro      # composes the page
public/
  brand/                 # curated brand assets (logos, stickers, icons) — committed
  images/                # curated content photos (studio, badges) — committed
  LOGO_RECURSOS/         # raw brand kit from the client — gitignored, source only
  client_images/         # raw client photos (HEIC) — gitignored, source only
```

## Brand

Accents come from the client's kit: yellow `#f5dc89` and lila `#e4d2e9`, exposed as the
`yellow` / `lila` Tailwind tokens in `global.css`. The logo uses the "VERSION NEGRO"
artwork (white lockup made for dark backgrounds); the neon lambda is the favicon and
app icon. `public/LOGO_RECURSOS/` holds the untouched kit and is not committed — to
regenerate `public/brand/`, re-crop from there.

## Deploy (Vercel)

Static build — no adapter needed. Import the repo in Vercel; it auto-detects Astro
(`npm run build` → `dist/`). Or `vercel --prod` from the project root.

## Notes / next steps

- The founder photo (`[ Foto · Belu ]`) and project cards are still colored
  placeholders. Swap for real assets in the relevant components + `public/images/`.
- Real client photos ship web-optimized in `public/images/`; the raw HEIC/JPEG
  sources live in the gitignored `public/client_images/` (re-crop from there).
  The `#estudio` section (`Studio.astro`) is the `@hacksestudio_` Instagram feed.
- Content lives in `src/data/site.ts` — edit copy there, not in components.
- Reduced-motion and touch devices are handled: rocket cursor and heavy animation are
  disabled; the layout degrades gracefully.
