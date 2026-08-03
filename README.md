# Portfolio — Jordan Hale (starter)

A premium, animated personal portfolio built with Next.js 15, TypeScript,
Tailwind CSS, and Framer Motion — aimed at Business Information
Systems / ERP / Supply Chain / Digital Transformation candidates.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Make it yours

**Everything is data-driven.** Open `data/content.ts` and replace the
placeholder values — name, tagline, timeline, skills, projects, experience,
leadership, certifications, achievements, testimonials, links. No component
code needs to change for a full content update.

Then:
1. Drop your headshot at `public/images/portrait.jpg` and wire it into
   `components/sections/hero.tsx` (an `<Image />` slot is easy to add next
   to the systems graphic, or swap the graphic for your photo).
2. Drop your résumé PDF at `public/resume.pdf` (already linked from the
   "Download CV" buttons via `profile.resumeUrl`).
3. Update `app/layout.tsx`'s `siteUrl` and `app/sitemap.ts` /
   `app/robots.ts` with your real domain once deployed.
4. Replace the `og-image` / social preview if you add one under `public/`.

## What's included

- Hero with typewriter role rotation, availability badge, and an animated
  SVG "systems graph" (ERP · Supply Chain · CRM · Analytics) as the visual
  signature
- Scroll progress bar, sticky glass navbar, mobile menu
- About: animated stat counters, career timeline, education, core values
- Skills: filterable, animated progress bars by category
- Projects: searchable/filterable, alternating layout, detail modal with
  problem/solution/impact/challenges/lessons
- Experience timeline, Leadership grid, Certification gallery, Achievements
- Tools marquee, Testimonials, Contact card with copy-to-clipboard
- Command palette (⌘K / Ctrl+K) for quick navigation and actions
- Dark/light theme toggle with persistence (next-themes)
- Subtle cursor glow (desktop only, respects `prefers-reduced-motion`)
- SEO: metadata, Open Graph, Twitter card, JSON-LD, sitemap, robots
- Accessibility: skip link, visible focus rings, semantic headings, alt text
  hooks, reduced-motion support throughout

## Deploy

Ready for Vercel: push to a GitHub repo, import it in Vercel, no config
needed.

## Structure

```
app/                 # routes, layout, metadata, global styles
components/sections/  # one file per page section
components/ui/        # small reusable primitives (button, reveal, counter)
data/content.ts        # all copy — the only file most edits touch
lib/utils.ts            # className helper
```
