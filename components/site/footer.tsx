"use client";

import { usePathname } from "next/navigation";
import { profile, sections } from "@/data/content";
import { Clock } from "@/components/site/clock";
import { ArrowUp } from "@/components/ui/glyphs";

export function Footer() {
  const pathname = usePathname();
  const href = (id: string) => (pathname === "/" ? `#${id}` : `/#${id}`);
  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <footer className="relative overflow-hidden bg-night text-ivory">
      <div className="frame grid-12 gap-y-10 pt-16 sm:pt-20">
        <div className="col-span-4 md:col-span-4">
          <p className="display text-h3 uppercase">Nizam Zahrani</p>
          <p className="mt-2 max-w-xs text-small text-ivory/70">Business &amp; functional analysis · Cikarang, Indonesia</p>
        </div>
        <nav aria-label="Footer" className="col-span-2 md:col-span-3 md:col-start-6">
          <p className="meta text-ivory/50">Sections</p>
          <ul className="mt-4 space-y-1.5">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={href(s.id)} className="text-small text-ivory/80 transition-colors hover:text-sage">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="col-span-2 md:col-span-2 md:col-start-9">
          <p className="meta text-ivory/50">Elsewhere</p>
          <ul className="mt-4 space-y-1.5 text-small">
            <li><a className="text-ivory/80 hover:text-sage" href={`mailto:${profile.email}`}>Email</a></li>
            <li><a className="text-ivory/80 hover:text-sage" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<span className="sr-only"> (opens in a new tab)</span></a></li>
            <li><a className="text-ivory/80 hover:text-sage" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub<span className="sr-only"> (opens in a new tab)</span></a></li>
            <li><a className="text-ivory/80 hover:text-sage" href={profile.resumeUrl}>Résumé (PDF)</a></li>
          </ul>
        </div>
        <div className="col-span-4 flex items-start md:col-span-2 md:col-start-11 md:justify-end">
          <button
            type="button"
            onClick={toTop}
            className="group flex h-16 w-16 flex-col items-center justify-center gap-2 border border-ivory/25 transition-colors duration-base hover:border-sage hover:text-sage"
          >
            <ArrowUp className="transition-transform duration-slow ease-out group-hover:-translate-y-1.5" />
            <span className="meta">Top</span>
          </button>
        </div>
      </div>

      <div className="frame mt-16 flex flex-col gap-2 border-t border-ivory/15 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="meta text-ivory/50">© {new Date().getFullYear()} {profile.legalName}</p>
        <p className="meta text-ivory/50">
          {profile.location} · <Clock />
        </p>
      </div>
    </footer>
  );
}
