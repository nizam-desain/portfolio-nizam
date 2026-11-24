"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { awards, leadership, type Award } from "@/data/content";
import { SectionHead } from "@/components/ui/section-head";
import { Lightbox, type LightboxItem } from "@/components/ui/lightbox";
import { Arrow, Plus } from "@/components/ui/glyphs";
import { cn } from "@/lib/utils";

const toItems = (a: Award): LightboxItem[] =>
  a.images.map((img, i) => ({
    key: `${a.id}-${i}`,
    src: img.src,
    width: img.width,
    height: img.height,
    alt: `${img.caption} — ${a.title}, ${a.event}`,
    title: `${a.title} — ${a.event}`,
    subtitle: img.caption,
    meta: [
      { label: "Date", value: a.date },
      { label: "Scope", value: a.scope },
    ],
  }));

// The two results with the strongest documents get feature treatment.
const FEATURED = ["concord-cup", "gold-medal"];
const tones = ["tone-lav", "tone-peach"];

export function Recognition() {
  const [view, setView] = useState<{ items: LightboxItem[]; index: number } | null>(null);
  const featured = awards.filter((a) => FEATURED.includes(a.id));
  const rest = awards.filter((a) => !FEATURED.includes(a.id));

  return (
    <section id="recognition" aria-labelledby="rec-title" className="py-section">
      <div className="frame">
        <SectionHead
          id="rec-title"
          eyebrow="Leadership & recognition"
          title={
            <>
              Outside the brief — <span className="accent-serif text-sage-ink">and on the record.</span>
            </>
          }
          intro={`${leadership.length} organisational roles and ${awards.length} competition results, each with its original document.`}
        />

        {/* Leadership */}
        <div className="mt-14 grid gap-5 lg:grid-cols-[1.25fr_1fr]">
          {leadership.map((r, i) => (
            <article
              key={r.id}
              className={cn("relative overflow-hidden rounded-frame-lg p-6 sm:p-9", i === 0 ? "band-night text-ivory" : "card")}
              data-reveal
            >
              {i === 0 ? <div aria-hidden className="glow pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgb(117_212_197/0.35),transparent)]" /> : null}
              <p className={cn("fade text-small font-semibold", i === 0 ? "text-teal" : "text-sage-ink")}>
                {r.role} · {r.period}
              </p>
              <h3 className="display fade mt-3 text-h2" style={{ ["--i" as string]: 1 }}>
                {r.organization}
              </h3>
              <p className={cn("fade mt-1 text-small", i === 0 ? "text-ivory/70" : "text-stone")} style={{ ["--i" as string]: 1 }}>
                {r.location}
              </p>
              {r.keyResult ? (
                <p className="fade mt-8 flex flex-wrap items-end gap-x-4 gap-y-1" style={{ ["--i" as string]: 2 }}>
                  <span className="display text-[clamp(3.25rem,2rem+4vw,5.5rem)] leading-[0.9] text-gradient">{r.keyResult.value}</span>
                  <span className={cn("pb-2 text-small", i === 0 ? "text-ivory/80" : "text-stone")}>{r.keyResult.label}</span>
                </p>
              ) : null}
              <ul className={cn("fade mt-6 space-y-2.5 text-small", i === 0 ? "text-ivory/85" : "text-graphite")} style={{ ["--i" as string]: 3 }}>
                {r.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <span aria-hidden className={cn("mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full", i === 0 ? "bg-teal" : "bg-oxide")} />
                    {h}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Featured results */}
        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {featured.map((a, i) => (
            <article key={a.id} className={cn("group relative overflow-hidden rounded-frame-lg p-6 ring-1 ring-line/10 sm:p-8", tones[i])} data-reveal aria-labelledby={`aw-${a.id}`}>
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-card px-3 py-1 text-[0.75rem] font-semibold text-sage-ink">{a.scope}</span>
                <span className="text-small font-semibold text-stone">{a.date}</span>
              </div>
              <h3 id={`aw-${a.id}`} className="display fade mt-5 text-h2">
                {a.title}
              </h3>
              <p className="fade mt-2 font-medium" style={{ ["--i" as string]: 1 }}>
                {a.event}
              </p>
              <p className="fade mt-1 text-small text-stone" style={{ ["--i" as string]: 2 }}>
                {[a.organizer, a.attribution].filter(Boolean).join(" · ")}
              </p>
              <div className="mt-7 flex gap-3">
                {a.images.map((img, k) => (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setView({ items: toItems(a), index: k })}
                    className="relative block w-full max-w-[17rem] overflow-hidden rounded-2xl bg-white p-2 shadow-[0_20px_40px_-24px_rgb(var(--shadow)/0.5)] transition-transform duration-slow ease-out hover:-translate-y-1 hover:rotate-[-1deg]"
                    aria-label={`View ${img.caption}`}
                  >
                    <span className="relative block overflow-hidden rounded-xl" style={{ aspectRatio: `${img.width} / ${img.height}` }}>
                      <Image src={img.src} alt="" fill sizes="(min-width: 768px) 17rem, 45vw" className="object-contain" />
                    </span>
                    <span className="mt-2 flex items-center justify-between px-1 text-[0.75rem] font-semibold text-[#626B78]">
                      {img.caption} <Plus size={12} />
                    </span>
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Archive */}
        <ul className="mt-5 grid gap-3 md:grid-cols-3">
          {rest.map((a, i) => (
            <li key={a.id} className="card fade flex flex-col p-5" data-reveal style={{ ["--i" as string]: i }}>
              <div className="flex items-center justify-between gap-3 text-[0.75rem] font-semibold text-stone">
                <span>{a.scope}</span>
                <span>{a.date}</span>
              </div>
              <p className="mt-3 text-lead font-semibold leading-snug">{a.title}</p>
              <p className="mt-1 text-small">{a.event}</p>
              <p className="mt-1 text-small text-stone">{[a.organizer, a.attribution].filter(Boolean).join(" · ")}</p>
              {a.images.length ? (
                <button type="button" onClick={() => setView({ items: toItems(a), index: 0 })} className="group mt-auto inline-flex min-h-11 items-center gap-2 pt-4 text-small font-semibold text-sage-ink">
                  <span className="ink-link">View certificate</span>
                  <Arrow size={13} className="transition-transform duration-base group-hover:translate-x-1" />
                  <span className="sr-only">: {a.event}</span>
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {view ? (
          <Lightbox items={view.items} index={view.index} onIndex={(i) => setView((v) => (v ? { ...v, index: i } : v))} onClose={() => setView(null)} label="Award document" />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
