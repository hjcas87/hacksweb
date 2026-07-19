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
```

## Deploy (Vercel)

Static build — no adapter needed. Import the repo in Vercel; it auto-detects Astro
(`npm run build` → `dist/`). Or `vercel --prod` from the project root.

## Notes / next steps

- Images are colored placeholders (`[ Foto ]`). Swap for real assets in the relevant
  components + `public/`.
- Content lives in `src/data/site.ts` — edit copy there, not in components.
- Reduced-motion and touch devices are handled: rocket cursor and heavy animation are
  disabled; the layout degrades gracefully.
