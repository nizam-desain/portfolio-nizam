# Nizam Zahrani — Portfolio

Personal portfolio of **Nizamuddin Giffa Abdul Aziz Zahrani** (Nizam Zahrani): Information Systems undergraduate at
President University and HR Information Systems intern at Mattel Indonesia, focused on business and functional analysis.

Next.js 15 (App Router), TypeScript, Tailwind CSS 3, Framer Motion, next-themes. Deployed on Vercel.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # no environment variables required
npm run lint
```

## Creative direction — "The Operating Manual"

The site reads like an annotated analysis document: Swiss 12-column grid, section references (§01), figure numbers,
hairline rules, registration marks and a process-line motif (steps, decision diamonds, documents, friction points)
that appears in the hero figure, the method diagram, project covers and case-study flows. Two cinematic moments
(the dark Experience band and the pinned Method section) break the rhythm.

## Design system

| Token | Light | Dark |
| --- | --- | --- |
| `paper` | Warm Ivory `#F2F0E8` | Ink `#101110` |
| `sheet` (inset plates) | `#EAE7DC` | `#191A18` |
| `ink` | `#101110` | `#F2F0E8` |
| `stone` (secondary text, AA) | `#5F625C` | `#9A9D96` |
| `sage` (fills) / `sage-ink` (text) | `#B8CB9B` / `#4D6638` | `#B8CB9B` |
| `oxide` (review-pencil marks, focus) | `#A3441C` | `#DB7B50` |
| `night` (bands) | `#101110` | `#1A1B19` |

- **Type** (self-hosted, SIL OFL — see `app/fonts/LICENSES.md`): Archivo variable at condensed width for display,
  Instrument Sans for text, Newsreader Italic for accents, IBM Plex Mono for metadata. Fluid scale in
  `tailwind.config.ts` (`meta` → `mega`).
- **Grid & spacing:** 4 columns → 12 columns at 768 px; `--gutter`, `--margin`, `--section` and `--frame` in
  `app/globals.css`.
- **Shape:** square corners and 1 px rules; no shadows, gradients or pills.
- **Motion tokens:** `--ease-out` `cubic-bezier(.16,1,.3,1)`, `--ease-inout` `cubic-bezier(.65,0,.35,1)`;
  180 / 320 / 640 / 1100 ms.

## Motion system

- One IntersectionObserver (`components/motion-root.tsx`) sets `data-in` on `[data-reveal]` blocks; CSS handles
  masked line reveals (`.mask`), fades, rule draws and clip-path wipes. Content is visible without JavaScript.
- Above-the-fold blocks (`.now`) animate with CSS keyframes from first paint.
- Opening sequence: CSS only, once per session, ~2 s, skipped on small screens and under reduced motion.
- Hero Fig. 0: pointer-reactive process map (magnetic nodes, relationship highlighting, a request token).
- Work index: cursor-following cover preview on fine pointers only; method section: pinned diagram drawn to the
  active step; theme change: top-down View Transition wipe.
- `prefers-reduced-motion` disables all of it.

## Content & confidentiality

All copy is in `data/content.ts`. Mattel work is described at a sanitised, high level under descriptive names
(no internal system names, people, rules, data or screenshots); flows and covers are conceptual and labelled.
Case studies separate **confirmed** outcomes from **proposed / open** items.

## Routes

`/` (home), `/work/[slug]` (7 statically generated case studies), `sitemap.xml`, `robots.txt`, `opengraph-image`.

## Environment variables (all optional)

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL. Defaults to `https://portfolio-nizam-zgvx.vercel.app`. |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Store contact-form messages in a Supabase `messages` table (`name`, `email`, `message`); without them the form opens the visitor's mail app. Unchanged from the previous version. |
