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

## Creative direction — v2 "Strategic Intelligence × Creative Technology × Cinematic Editorial"

A multidisciplinary personal portfolio (business, people, technology, design). Serif display headings in
sentence case, original 3D artwork and conceptual mockups next to analytical diagrams, soft gradient
section washes in light mode and a midnight-navy / indigo atmosphere in dark mode. The full, current
specification lives in the "Portfolio Design Specification" doc.

- **Type** (self-hosted, SIL OFL — `app/fonts/LICENSES.md`): Instrument Serif (display, italic accents) and
  Plus Jakarta Sans (text, labels). Two families only; no monospace.
- **Colour:** porcelain / mist / lavender / sage / peach washes, charcoal text, refined indigo and coral
  accents (light); deep midnight, navy surfaces, lavender and teal accents, ivory text (dark). Tokens in
  `app/globals.css`.
- **Imagery:** `public/art/` — original 3D renders (Three.js, rendered offline) and conceptual UI mockups made
  for this site. Mockups are labelled "Conceptual mockup"; none are production screenshots. Stock photo
  libraries were not reachable from the build environment, so no stock photography is used.
- **Motion:** cinematic image reveals, masked headings, layered hero depth, pinned method stages, credential
  filtering, a before/after slider, an interactive approval-scenario player and order-lifecycle stepper. All
  respect `prefers-reduced-motion`.

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
