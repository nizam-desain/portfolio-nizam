"use client";

import Link from "next/link";
import { useState } from "react";
import { capabilities, toolkit, work, type Basis } from "@/data/content";
import { SectionHead } from "@/components/ui/section-head";
import { Arrow } from "@/components/ui/glyphs";
import { cn } from "@/lib/utils";

const bySlug = Object.fromEntries(work.map((w) => [w.slug, w]));

const bases: { b: Basis; note: string }[] = [
  { b: "Professional", note: "done in my internship or a job" },
  { b: "Certified", note: "backed by a credential" },
  { b: "Academic", note: "coursework and competitions" },
  { b: "Leadership", note: "organisations I helped run" },
  { b: "Practice", note: "self-directed, used regularly" },
];

const dot: Record<Basis, string> = {
  Professional: "rgb(var(--sage-ink))",
  Certified: "rgb(var(--oxide))",
  Academic: "rgb(var(--teal))",
  Leadership: "rgb(var(--lav))",
  Practice: "rgb(var(--stone))",
};

const toneClass = { mist: "tone-mist", peach: "tone-peach", lav: "tone-lav", sage: "tone-sage" } as const;

export function Capabilities() {
  const [focus, setFocus] = useState<Basis | null>(null);

  return (
    <section id="capabilities" aria-labelledby="cap-title" className="py-section">
      <div className="frame">
        <SectionHead
          id="cap-title"
          eyebrow="Capabilities"
          title={
            <>
              Business, people, technology <span className="accent-serif text-sage-ink">and design.</span>
            </>
          }
          intro="Four areas I work across. Each item says where it comes from, so work experience is never confused with study or interest."
        />

        {/* Basis filter */}
        <div className="mt-12 flex flex-wrap items-center gap-2" role="group" aria-label="Highlight by where a capability comes from">
          <span className="mr-2 text-small font-semibold text-stone">Show where it comes from:</span>
          {bases.map(({ b, note }) => {
            const on = focus === b;
            return (
              <button
                key={b}
                type="button"
                aria-pressed={on}
                onClick={() => setFocus(on ? null : b)}
                title={note}
                className={cn(
                  "inline-flex min-h-10 items-center gap-2 rounded-full border px-3.5 text-small font-semibold transition-colors duration-base",
                  on ? "border-ink bg-ink text-paper" : "border-line/20 bg-card text-ink hover:border-line/50",
                )}
              >
                <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: dot[b] }} />
                {b}
              </button>
            );
          })}
        </div>
        <p className="mt-3 min-h-[1.5rem] text-small text-stone" aria-live="polite">
          {focus ? `${focus}: ${bases.find((x) => x.b === focus)?.note}.` : "Tap a source to highlight it across all four areas."}
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {capabilities.map((c, ci) => (
            <article
              key={c.title}
              className={cn(
                "group relative overflow-hidden rounded-frame-lg p-6 ring-1 ring-line/10 transition-transform duration-slow ease-out hover:-translate-y-1 sm:p-8",
                toneClass[c.tone],
              )}
              data-reveal
            >
              <div className="fade flex items-start justify-between gap-4">
                <h3 className="display text-h2">{c.title}</h3>
                <span aria-hidden className="display text-[3rem] leading-none text-ink/15">
                  0{ci + 1}
                </span>
              </div>
              <p className="fade mt-3 max-w-[34rem] text-graphite" style={{ ["--i" as string]: 1 }}>
                {c.body}
              </p>
              <ul className="mt-6 space-y-2">
                {c.items.map((it, n) => {
                  const dim = focus && it.b !== focus;
                  return (
                    <li
                      key={it.t}
                      className={cn(
                        "fade flex items-center justify-between gap-4 rounded-2xl bg-card/70 px-4 py-3 backdrop-blur-sm transition-opacity duration-base",
                        dim && "opacity-30",
                      )}
                      style={{ ["--i" as string]: n + 2 }}
                    >
                      <span className="text-small font-medium">{it.t}</span>
                      <span className="flex shrink-0 items-center gap-1.5 text-[0.75rem] font-semibold text-stone">
                        <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: dot[it.b] }} />
                        {it.b}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                <span className="text-small font-semibold text-stone">Seen in</span>
                {c.evidence.map((s) => (
                  <Link key={s} href={`/work/${s}`} className="group/l inline-flex items-center gap-1.5 text-small font-semibold text-sage-ink">
                    <span className="ink-link">{bySlug[s].title}</span>
                    <Arrow size={13} className="transition-transform duration-base group-hover/l:translate-x-1" />
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-small text-stone" data-reveal>
          <span className="font-semibold text-ink">Also familiar with:</span> {toolkit.join(" · ")} — listed, not ranked.
        </p>
      </div>
    </section>
  );
}
