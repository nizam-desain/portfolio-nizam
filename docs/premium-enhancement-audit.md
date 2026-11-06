# Premium Interactive Enhancement — Baseline Audit

Baseline: `main` @ `1738ba6` (merge of PR #1). Audited by reading the source and by running a local
production build (`next build && next start`) in headless Chromium. The public production URL could not be
loaded from the build sandbox (its network policy blocks `vercel.app`), so "production" below means the
identical commit built locally, not the live deployment.

## Measured baseline (local production build)

| Check | Result |
| --- | --- |
| `tsc --noEmit`, `next lint`, `next build` | Pass. Home route 84.1 kB, first load JS 187 kB |
| Responsive sweep: 320, 375, 390, 768, 1024, 1440, 1920 px × light and dark | No horizontal overflow, broken images or console errors/warnings |
| Interaction suite (37 checks) | 37 pass |
| Lighthouse desktop | Performance 100, Accessibility 100, Best Practices 100, SEO 100. LCP 0.7 s, CLS 0, TBT 0 ms |
| Lighthouse mobile (4 runs) | Performance 77 / 93 / 92 / 90 (median ≈ 91). The 77 run was a TBT spike (510 ms), sandbox noise. A11y / BP / SEO 100. LCP 3.2–3.6 s, CLS 0 |

## Architecture

- **Stack:** Next.js 15 App Router, React 19, Tailwind 3, Framer Motion 11, next-themes. `app/page.tsx`
  composes one component per section from `components/sections/*`. All copy is in `data/content.ts`.
- **Tokens:** RGB-channel CSS variables in `app/globals.css` (`--paper`, `--surface`, `--raised`, `--ink`,
  `--muted`, `--faint`, `--line`, `--accent`, `--sage`, `--shadow`) with a `.dark` override. They are mapped to
  Tailwind colours in `tailwind.config.ts`. Fonts: Instrument Serif (`--font-serif`), Geist Sans and Mono.
- **Theme:** next-themes with `attribute="class"`, `defaultTheme="system"`, `storageKey="nz-theme"` and a
  blocking script, so there is no flash. The toggle (`components/ui/theme-toggle.tsx`) does a View Transitions
  circular reveal, has a sun/moon morph, and an "Auto" reset.
- **Section rhythm today:** paper → surface → paper → paper → surface → paper → surface → paper → surface.
  Every section opens with the same `SectionHeader` (index, hairline, label, serif title, intro) and most bodies
  are bordered rounded panels. This uniformity is the main reason the page reads as quiet.

## Motion inventory

| Where | What exists | Verdict |
| --- | --- | --- |
| Hero name | CSS line-mask reveal (`animate-mask-up`), runs at first paint | **Preserve** — fast LCP, reads well |
| Hero copy and CTAs | CSS `animate-rise` with short stagger | **Preserve** |
| Hero portrait | CSS entrance; Framer float (7 s), pointer tilt ±5°, shift, inner image counter-shift, pointer glare; scroll drift and scale. Tilt only on fine pointer ≥1024 px and not under reduced motion | **Preserve and extend**: add depth layers (offset frame, tilt-reactive shadow); no new motion on the photo itself |
| Hero background | Four concentric arch outlines drawn with `pathLength`, slower scroll parallax | **Refine**: make it one cohesive architectural composition rather than lines alone |
| Grain | `.grain::before` noise only on hero and contact | **Replace**: one site-wide static texture, tuned per theme |
| Navbar | Spring pill for the active link, scroll progress hairline, mobile sheet | **Preserve**; refine the active state with an accent mark |
| Section reveals | `Reveal` fade-and-rise once in view | **Preserve** |
| Section header | Static hairline | **Extend**: hairline draws in |
| About approach | Four steps with a drawing rule | **Preserve** |
| Experience | Mattel feature panel with staggered list; accordion timeline with static markers | **Extend**: scroll-linked progress line; analytical-flow visual |
| Case studies | Three identical alternating rows; SVG diagrams drawn in view; slide-in side panel with prev/next | **Replace layout** (identical rows) with a varied composition; **refine** diagrams; **extend** the panel with in-panel section navigation |
| Academic | Accordion list | **Refine** into a curated editorial grid; keep details accessible without hover |
| Skills | One big panel plus three chip panels | **Refine** composition; add focus-area typography and group highlighting |
| Certificates | Filter (layout animation), card hover lift and zoom, lightbox (keys, swipe, zoom, download, verify) | **Preserve** behaviour; refine metadata hierarchy and lightbox entrance |
| Honors | Lead CONCORD panel plus a two-column grid | **Refine** into a showcase with rank typography and a restrained metallic hairline |
| Contact | Copy email with feedback, mailto fallback form | **Preserve** |

## Accessibility and reduced motion

- `MotionConfig reducedMotion="user"` plus a global CSS rule that collapses durations and delays. The float,
  ping, scroll indicator and tilt are disabled under reduced motion. Any new motion must hook into the same
  switches.
- Dialogs use `useDialog` (scroll lock, focus trap, Esc, focus restore). New decorative SVGs must be
  `aria-hidden`.

## Risks to manage

- Mobile Performance sits around 90. New work must avoid hydration-blocking entrance animations above the
  fold, continuous JS loops and new dependencies.
- Duplicate SVG ids (solved with `useId` in the diagrams) must stay solved in any new SVG.
- Confidentiality: the new Mattel visuals must stay generic and labelled illustrative.

## Enhancement plan (one system, not scattered effects)

The signature motif is the **arch and architectural line**, already present in the portrait frame and the hero
background, extended into hairline frames, registration marks and figure plates. The accent stays a small,
deliberate signal (marks, active states, numerals), plus a muted brass hairline reserved for honours.

1. Site-wide static paper grain. One fixed layer, no animation, lower opacity in dark mode.
2. Hero: an offset arch frame behind the portrait on its own parallax depth; a shadow that answers the tilt; an
   architectural grid with a registration mark that tracks the pointer slightly. Name, copy and CTA timing stay
   unchanged.
3. Section headers: the hairline draws in. Oversized outline index numerals only where a section needs weight
   (Experience, Work, Honors).
4. About: a thematic statement ("Understand the problem before designing the solution.") set as an editorial
   pull statement, explicitly not a quote.
5. Experience: an analytical flow (Business need → Analysis → Functional requirements → Validation) as an
   illustrative strip; the timeline gets a scroll-linked progress line and filled markers.
6. **Bridge** from Experience to Work: one competency marquee, the only one on the page. CSS transform loop,
   pauses on hover and focus, static under reduced motion, hidden from screen readers with a real list for
   assistive tech.
7. Work: an inverted, darker band for contrast. The three case studies become a lead feature plus an
   asymmetric pair, each with its own illustrative cover and accent tint. The panel gets in-panel navigation.
8. Academic: an editorial grid with small original glyph covers, chip-labelled as academic or competition work.
9. Skills: focus-area typography row, group highlighting on hover and focus (desktop only).
10. Certificates: issuer summary, refined metadata, lightbox scale entrance. Honors: rank numerals, an
    international/national structure and a brass hairline.
11. Microinteractions: back-to-top control, nav underline accent.

## Outcome (after implementation, same local production setup)

| Check | Baseline | After |
| --- | --- | --- |
| `tsc`, `next lint`, `next build` | Pass | Pass. Home 89 kB, first load JS 192 kB (+5 kB) |
| Responsive sweep (7 widths × 2 themes) | Clean | Clean: no overflow, broken images or console errors/warnings |
| Original interaction suite | 37 / 37 | 37 / 37 |
| New Phase-2 checks | — | 20 / 20: marquee a11y and reduced motion, band opening, panel portal and section nav, back-to-top, certificate summary, honours grouping, no duplicate ids, decorative SVGs hidden, mobile diagram scroll |
| Lighthouse desktop | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100, no failing binary audits |
| Lighthouse mobile Performance | 77, 93, 92, 90 (median ≈ 91) | 91, 92, 91, 90 (median ≈ 91). A11y / BP / SEO 100. CLS 0 |

Notes:
- **Performance fix:** the first build of the new case-study covers ran their reveal through Framer (about 150 motion
  components) and raised mobile TBT, giving a Performance median of 87. Moving that reveal to CSS, toggled by one
  IntersectionObserver per diagram, brought it back to baseline.
- **Accessibility fix:** an existing label-content mismatch on the nav wordmark ("NizamuddinZahrani") is fixed.

## Revision — light-mode contrast and visual harmony

**Feedback addressed:**
- The light-mode Work band was near-black and felt disconnected from the sections around it.
- There was excess space between the Experience timeline and the marquee.
- Some secondary elements looked too faint.
- The band ended abruptly against the Academic section.

**Changes:**
- **Theme-aware band:** `.band-invert` (forced dark) is now `.band-feature`. Light mode uses warm sand
  (paper 235 228 215) with graphite type and a deepened clay accent; dark mode keeps the original charcoal.
- **One spotlight panel:** the only dark panel left in light mode is the lead Click2Eat cover (`.panel-ink`),
  marking the ongoing lead study.
- **Continuity:** a hairline defines the band's top edge, and a gradient seam dissolves its bottom into the page
  colour (`--page`) of the Academic section.
- **Spacing:** Experience bottom padding goes from 8rem to 5rem; marquee top padding from 7rem to 4rem.
  The Work outline numeral was removed, since the marquee is already the expressive moment there.
- **Tokens:** hairlines strengthened slightly (light line 210 201 186). Light brass deepened to 126 96 46 so
  honours labels reach ≥ 4.8:1. Outline numerals are stroked from `--muted` at 38% so they are visible but
  quiet.

**Contrast measured in-browser** (every visible text node, real blended backgrounds, WCAG AA thresholds):
0 failures in light and dark at 375, 768, 1440 and 1920 px (about 450 text nodes per page). The only
failure found, sage status pills on sand at 4.39:1, was fixed by lightening the pill tint. axe-core's
`color-contrast` also reports 0 violations, but it can't resolve backgrounds behind the grain texture
and marks those nodes for manual review, which is why the custom check was used.

**Re-test:**
- tsc, lint and build: pass.
- Original suite 37/37 and Phase-2 suite 20/20.
- Responsive sweep: clean.
- Lighthouse desktop 100/100/100/100. Mobile Performance 75 / 90 / 88 / 90 / 89 (median 89; the 75 run was
  a 590 ms TBT spike, the same sandbox noise seen at baseline). A11y / BP / SEO 100. CLS 0.
