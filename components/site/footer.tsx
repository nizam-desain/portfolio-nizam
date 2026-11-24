"use client";

import { usePathname } from "next/navigation";
import { profile, sections } from "@/data/content";
import { Clock } from "@/components/site/clock";
import { ArrowOut, ArrowUp } from "@/components/ui/glyphs";

export function Footer() {
  const pathname = usePathname();
  const href = (id: string) => (pathname === "/" ? `#${id}` : `/#${id}`);
  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <footer className="band-night relative overflow-hidden text-ivory">
      <div aria-hidden className="glow pointer-events-none absolute -right-32 -top-40 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgb(168_164_244/0.28),transparent)]" />

      <div className="frame relative pb-8 pt-14 md:pt-16">
        {/* Closing statement + back to top */}
        <div className="flex flex-col gap-8 border-b border-white/10 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="display text-[clamp(2.2rem,1.4rem+3vw,4rem)] leading-[1.05]">
              Nizam Zahrani<span className="text-teal">.</span>
            </p>
            <p className="mt-3 max-w-md text-ivory/70">
              Business, people, technology and design — studied, practised and still being learned in Cikarang, Indonesia.
            </p>
          </div>
          <button
            type="button"
            onClick={toTop}
            className="group inline-flex min-h-12 items-center gap-3 self-start rounded-full border border-white/20 bg-white/[0.05] pl-5 pr-2 text-small font-semibold transition-colors duration-base hover:border-teal md:self-auto"
          >
            Back to top
            <span className="grid h-9 w-9 place-items-center rounded-full bg-ivory text-[#111827] transition-transform duration-slow ease-out group-hover:-translate-y-1">
              <ArrowUp size={16} />
            </span>
          </button>
        </div>

        <div className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr]">
          <nav aria-label="Footer">
            <p className="text-small font-semibold text-ivory/50">Sections</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={href(s.id)} className="text-small text-ivory/85 transition-colors hover:text-teal">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="text-small font-semibold text-ivory/50">Elsewhere</p>
            <ul className="mt-4 space-y-2 text-small">
              <li><a className="text-ivory/85 hover:text-teal" href={`mailto:${profile.email}`}>{profile.email}</a></li>
              <li><a className="inline-flex items-center gap-1.5 text-ivory/85 hover:text-teal" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowOut size={12} /><span className="sr-only"> (opens in a new tab)</span></a></li>
              <li><a className="inline-flex items-center gap-1.5 text-ivory/85 hover:text-teal" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowOut size={12} /><span className="sr-only"> (opens in a new tab)</span></a></li>
              <li><a className="text-ivory/85 hover:text-teal" href={profile.resumeUrl}>Résumé (PDF)</a></li>
            </ul>
          </div>
          <div>
            <p className="text-small font-semibold text-ivory/50">Local time</p>
            <p className="display mt-3 text-h3">
              <Clock />
            </p>
            <p className="mt-1 text-small text-ivory/60">{profile.location} · UTC+7</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 pt-6 text-[0.8rem] text-ivory/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {profile.legalName}</p>
          <p>Artwork and mockups on this site are original and illustrative.</p>
        </div>
      </div>
    </footer>
  );
}
