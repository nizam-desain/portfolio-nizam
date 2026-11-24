"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { awards, leadership, type Award } from "@/data/content";
import { SectionMark } from "@/components/ui/section-mark";
import { Lightbox, type LightboxItem } from "@/components/ui/lightbox";
import { Arrow } from "@/components/ui/glyphs";

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

export function Recognition() {
  const [view, setView] = useState<{ items: LightboxItem[]; index: number } | null>(null);
  const [lead, ...rest] = awards;

  return (
    <section id="recognition" aria-labelledby="rec-title" className="border-t border-line/15 py-section">
      <div className="frame">
        <SectionMark ref_="06" label="Leadership & recognition" note={`${leadership.length} roles · ${awards.length} results`} />

        {/* Leadership */}
        <div className="grid-12 mt-14 gap-y-12 md:mt-20">
          <h2 id="rec-title" className="display col-span-4 text-h1 uppercase md:col-span-4" data-reveal>
            <span className="mask"><span>Outside</span></span>
            <span className="mask" style={{ ["--i" as string]: 1 }}><span>the brief</span></span>
          </h2>
          <div className="col-span-4 grid gap-px bg-line/15 md:col-span-8 md:grid-cols-2">
            {leadership.map((r, i) => (
              <article key={r.id} className="flex flex-col bg-paper p-0 md:p-8 md:first:pl-0" data-reveal>
                <p className="meta fade text-stone" style={{ ["--i" as string]: i }}>
                  {r.period} · {r.location}
                </p>
                <h3 className="display fade mt-3 text-h3 uppercase" style={{ ["--i" as string]: i + 1 }}>
                  {r.organization}
                </h3>
                <p className="fade mt-1 text-small text-sage-ink" style={{ ["--i" as string]: i + 1 }}>{r.role}</p>
                {r.keyResult ? (
                  <p className="fade mt-8" style={{ ["--i" as string]: i + 2 }}>
                    <span className="display block text-[clamp(3rem,2rem+4vw,5.5rem)] leading-[0.85]">{r.keyResult.value}</span>
                    <span className="mt-2 block text-small text-stone">{r.keyResult.label}</span>
                  </p>
                ) : null}
                <ul className="fade mt-6 space-y-2 text-small text-graphite" style={{ ["--i" as string]: i + 3 }}>
                  {r.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span aria-hidden className="mt-[0.62em] block h-px w-3 shrink-0 bg-oxide" />
                      {h}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        {/* Lead award */}
        <article className="mt-28 grid-12 gap-y-10 border-t border-line/90 pt-10 md:mt-36" data-reveal aria-labelledby="award-lead">
          <div className="col-span-4 md:col-span-5">
            <p className="meta fade text-oxide">{lead.scope} · {lead.date}</p>
            <p aria-hidden className="display wipe mt-4 text-[clamp(8rem,4rem+16vw,20rem)] leading-[0.78] tracking-[-0.04em]">
              2<span className="accent-serif align-top text-[0.35em] tracking-normal text-sage-ink">nd</span>
            </p>
          </div>
          <div className="col-span-4 md:col-span-6 md:col-start-7 md:self-end">
            <h3 id="award-lead" className="display fade text-h2 uppercase">
              {lead.title}
            </h3>
            <p className="fade mt-4 text-lead" style={{ ["--i" as string]: 1 }}>{lead.event}</p>
            <p className="fade mt-3 text-small text-stone" style={{ ["--i" as string]: 2 }}>
              {lead.organizer}. {lead.attribution}.
            </p>
            <p className="fade mt-3 text-small text-graphite" style={{ ["--i" as string]: 3 }}>{lead.description}</p>
            <div className="fade mt-8 flex flex-wrap gap-4" style={{ ["--i" as string]: 4 }}>
              {lead.images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => setView({ items: toItems(lead), index: i })}
                  className="group relative block w-36 border border-line/20 bg-white p-2 transition-colors duration-base hover:border-ink sm:w-44"
                  aria-label={`View ${img.caption}`}
                >
                  <span className="relative block" style={{ aspectRatio: `${img.width} / ${img.height}` }}>
                    <Image src={img.src} alt="" fill sizes="176px" className="object-contain" />
                  </span>
                  <span className="meta mt-2 block text-left text-[#5F625C]">{img.caption}</span>
                </button>
              ))}
            </div>
          </div>
        </article>

        {/* Archive */}
        <div className="relative mt-20" data-reveal>
          <table className="w-full border-collapse text-left">
            <caption className="meta pb-4 text-left text-stone">Archive of results</caption>
            <thead>
              <tr className="border-b border-line/90">
                <th scope="col" className="meta w-20 py-3 pr-4 md:w-28 font-normal text-stone">Date</th>
                <th scope="col" className="meta hidden w-36 py-3 pr-4 font-normal text-stone md:table-cell">Scope</th>
                <th scope="col" className="meta py-3 pr-4 font-normal text-stone">Result</th>
                <th scope="col" className="meta w-12 py-3 font-normal text-stone md:w-40"><span className="sr-only">Evidence</span></th>
              </tr>
            </thead>
            <tbody>
              {rest.map((a, i) => (
                <tr key={a.id} className="fade border-b border-line/15 align-top" style={{ ["--i" as string]: i }}>
                  <td className="meta py-5 pr-4 tabular">{a.date}</td>
                  <td className="meta hidden py-5 pr-4 text-stone md:table-cell">{a.scope}</td>
                  <td className="py-5 pr-4">
                    <p className="display text-[1.35rem] uppercase leading-tight">{a.title}</p>
                    <p className="mt-1 text-small">{a.event}</p>
                    <p className="mt-1 text-small text-stone">
                      <span className="md:hidden">{a.scope} · </span>{[a.organizer, a.attribution].filter(Boolean).join(" · ")}
                    </p>
                  </td>
                  <td className="py-5 text-right">
                    {a.images.length ? (
                      <button
                        type="button"
                        onClick={() => setView({ items: toItems(a), index: 0 })}
                        className="meta group inline-flex min-h-11 items-center gap-2"
                      >
                        <span className="ink-link hidden md:inline">View certificate</span><span className="sr-only md:hidden">View certificate: {a.event}</span>
                        <Arrow size={14} className="transition-transform duration-base group-hover:translate-x-1" />
                      </button>
                    ) : (
                      <span className="meta text-stone"><span className="hidden md:inline">No document on file</span><span className="md:hidden" aria-label="No document on file">—</span></span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {view ? (
          <Lightbox
            items={view.items}
            index={view.index}
            onIndex={(i) => setView((v) => (v ? { ...v, index: i } : v))}
            onClose={() => setView(null)}
            label="Award document"
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
