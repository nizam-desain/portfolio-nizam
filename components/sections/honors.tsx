"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { awards } from "@/data/content";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { CertFrame } from "@/components/ui/cert-frame";
import { Lightbox, type LightboxItem } from "@/components/ui/lightbox";
import { cn } from "@/lib/utils";

export function Honors() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  // One lightbox sequence across every award image (CONCORD CUP has two).
  const items = useMemo<LightboxItem[]>(
    () =>
      awards.flatMap((a) =>
        a.images.map((img, k) => ({
          key: `${a.id}-${k}`,
          src: img.src,
          width: img.width,
          height: img.height,
          alt: `${img.caption} — ${a.title}, ${a.event}`,
          title: `${a.title} — ${a.event}`,
          subtitle: [img.caption, a.organizer, a.date].filter(Boolean).join(" · "),
          meta: [{ label: "Attribution", value: a.attribution }],
        })),
      ),
    [],
  );
  const firstIndex = (id: string) => items.findIndex((it) => it.key === `${id}-0`);

  const [lead, ...others] = awards;

  return (
    <section id="honors" aria-labelledby="honors-title" className="textured relative border-t border-line bg-surface py-24 sm:py-32">
      <div className="container-page">
        <SectionHeader
          id="honors-title"
          index="07"
          label="Honors & achievements"
          title={
            <>
              Recognition in <span className="italic text-accent">competition</span>.
            </>
          }
          intro="International and national case, pitch and negotiation competitions. Team awards are credited to the team named on the certificate."
        />

        {/* Lead award */}
        <Reveal className="mt-16">
          <article
            aria-labelledby={`award-${lead.id}`}
            className="relative grid overflow-hidden rounded-2xl border border-line bg-raised shadow-soft lg:grid-cols-12"
          >
            <span aria-hidden className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-brass/0 via-brass to-brass/0" />
            <div className="relative flex flex-col justify-between gap-10 p-7 sm:p-10 lg:col-span-5">
              {/* Rank medallion — restrained, single metallic accent */}
              <span
                aria-hidden
                className="absolute right-7 top-7 grid h-16 w-16 place-items-center rounded-full border border-brass/70 sm:right-10 sm:top-10"
              >
                <span className="absolute inset-1 rounded-full border border-brass/30" />
                <span className="font-serif text-2xl italic leading-none text-brass">II</span>
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="chip border-accent/40 text-accent">{lead.scope}</span>
                  <span className="chip">{lead.date}</span>
                </div>
                <p className="mt-8 font-serif text-[3.25rem] italic leading-none text-accent sm:text-[4rem]">
                  {lead.title}
                </p>
                <h3 id={`award-${lead.id}`} className="mt-5 text-xl font-medium leading-snug text-ink">
                  {lead.event}
                </h3>
                <p className="mt-2 text-sm text-muted">{lead.organizer}</p>
                <p className="mt-6 text-[0.975rem] leading-relaxed text-muted">{lead.description}</p>
              </div>
              <p className="border-t border-line pt-4 text-xs leading-relaxed text-muted">{lead.attribution}</p>
            </div>
            <div className="grid grid-cols-[1.4fr_1fr] gap-px border-t border-line bg-line lg:col-span-7 lg:border-l lg:border-t-0">
              {lead.images.map((img, k) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => setLightbox(firstIndex(lead.id) + k)}
                  className="group relative flex flex-col bg-surface text-left"
                  aria-label={`View ${img.caption}`}
                >
                  <CertFrame
                    src={img.src}
                    width={img.width}
                    height={img.height}
                    alt=""
                    // column widths are 1.4 : 1, so 1.05 and 0.75 give equal heights
                    ratio={k === 0 ? 1.05 : 0.75}
                    sizes="(min-width: 1024px) 26vw, 55vw"
                  />
                  <span className="flex items-center justify-between gap-2 px-4 pb-4 text-xs text-muted">
                    {img.caption}
                    <Maximize2 size={12} aria-hidden className="opacity-0 transition-opacity group-hover:opacity-100" />
                  </span>
                </button>
              ))}
            </div>
          </article>
        </Reveal>

        {/* Other awards, grouped by scope */}
        {(["International", "National"] as const).map((scope) => {
          const group = { scope, items: others.filter((a) => a.scope === scope) };
          if (!group.items.length) return null;
          return (
            <div key={scope} className="mt-14">
              <div className="flex items-center gap-4">
                <h3 className="eyebrow text-brass">{scope}</h3>
                <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-brass/50 to-transparent" />
              </div>
              <ul className="mt-6 grid gap-6 md:grid-cols-2">
          {group.items.map((a, i) => {
            const img = a.images[0];
            return (
              <Reveal as="li" key={a.id} delay={0.06 * i}>
                <article
                  aria-labelledby={`award-${a.id}`}
                  className={cn(
                    "group relative grid h-full overflow-hidden rounded-2xl border border-line bg-raised transition-[box-shadow,border-color] duration-500 hover:border-brass/50 hover:shadow-soft",
                    img ? "grid-rows-[auto_1fr]" : "",
                  )}
                >
                  {img ? (
                    <button
                      type="button"
                      onClick={() => setLightbox(firstIndex(a.id))}
                      className="relative block"
                      aria-label={`View ${img.caption}: ${a.event}`}
                    >
                      <CertFrame
                        src={img.src}
                        width={img.width}
                        height={img.height}
                        alt=""
                        ratio={16 / 9}
                        sizes="(min-width: 768px) 40vw, 92vw"
                      />
                      <span
                        className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-paper/90 text-ink opacity-0 shadow-soft transition-opacity duration-300 group-hover:opacity-100"
                        aria-hidden
                      >
                        <Maximize2 size={14} />
                      </span>
                    </button>
                  ) : null}
                  <div className="flex flex-col p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={cn("chip", a.scope === "International" && "border-accent/40 text-accent")}>
                        {a.scope}
                      </span>
                      <span className="chip">{a.date}</span>
                    </div>
                    <p className="mt-5 font-serif text-[2rem] italic leading-none text-ink">{a.title}</p>
                    <h4 id={`award-${a.id}`} className="mt-3 text-base font-medium leading-snug text-ink">
                      {a.event}
                    </h4>
                    {a.organizer ? <p className="mt-1 text-sm text-muted">{a.organizer}</p> : null}
                    <p className="mt-4 text-sm leading-relaxed text-muted">{a.description}</p>
                    <p className="mt-auto pt-5 text-xs leading-relaxed text-muted">
                      {a.attribution}
                      {!img ? " · Certificate image not included in this portfolio." : ""}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
              </ul>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {lightbox !== null ? (
          <Lightbox
            key="award-lightbox"
            label="Award certificate viewer"
            items={items}
            index={lightbox}
            onIndex={setLightbox}
            onClose={() => setLightbox(null)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
