# Nizamuddin Zahrani — Portfolio

Personal portfolio of **Nizamuddin Giffa Abdul Aziz Zahrani** — Information Systems undergraduate at President
University and HR Information Systems intern at Mattel Indonesia, focused on business analysis, process improvement,
and strategy & operations.

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion and next-themes. Deployed on Vercel.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (no environment variables required)
npm run lint
```

## Content

All copy lives in **`data/content.ts`** — profile, experience, case studies, academic projects, skills,
certificates, awards and education. Components read from it; no copy is hard-coded in components.

- **Certificates** — `public/certificates/*.png`, extracted at native resolution from the source PDF (only blank
  white page margins trimmed). Each entry carries its credential ID and the verification URL printed on the
  certificate. Next.js serves AVIF/WebP variants; the PNG originals are what “Download original” returns.
- **Portrait** — `public/images/portrait.jpg` (original 1638×2048 JPEG, unmodified).
- **CV** — `public/resume.pdf`.
- **Mattel case studies** are intentionally high-level and sanitised. Diagrams in
  `components/sections/diagrams.tsx` are illustrative, not system screenshots. Keep it that way.

## Environment variables (all optional)

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap and robots. Defaults to `https://portfolio-nizam-zgvx.vercel.app`. |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Enable storing contact-form messages in a Supabase `messages` table (`name`, `email`, `message`). Requires an RLS policy that allows anonymous `insert` only. Without them, the form opens the visitor's email app with the message pre-filled. |

## Structure

```
app/                  layout, metadata, OG image, icon, sitemap, robots, global styles (design tokens)
components/sections/  one component per page section
components/ui/        primitives: reveal, section header, theme toggle, dialog hook, lightbox, certificate frame
data/content.ts       all site content
lib/                  utilities and the lazily-created Supabase client
```
