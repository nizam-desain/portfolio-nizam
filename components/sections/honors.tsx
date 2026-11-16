"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { awards, sections } from "@/data/content";
import { Section } from "@/components/ui/section";
import { InView } from "@/components/ui/in-view";
import { CertFrame } from "@/components/ui/cert-frame";
import { Lightbox, type LightboxItem } from "@/components/ui/lightbox";
import { cn } from "@/lib/utils";

const scopes = ["International", "National"] as const;

/** Competition results, kept apart from course certificates and worded exactly as awarded. */
export function Honors() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  // One viewer sequence across every award image (the CONCORD CUP award has two).
  const items = useMemo<LightboxItem[]>(
    () =>
      awards.flatMap((a) =>
        a.images.map((img, k) => ({
          key: `${a.id}-${k}`,
          src: img.src,
          width: img.width,
          height: img.height,
          alt: `${img.caption}: ${a.title}, ${a.event}`,
          title: `${a.title}, ${a.event}`,
          subtitle: [img.caption, a.organizer, a.date].filter(Boolean).join(", "),
          note: a.attribution,
          meta: [{ label: "Source image", value: `${img.width} × ${img.height} px` }],
        })),
      ),
    [],
  );
  const indexOf = (id: string, k: number) => items.findIndex((it) => it.key === `${id}-${k}`);

  return (
    <Section id="honors" label={sections.honors.label} title={sections.honors.title} intro={sections.honors.intro}>
      {scopes.map((scope) => (
        <div key={scope} className="mt-12 sm:mt-16">
          <h3 className="subhead">{scope}</h3>
          <ul className="mt-4 border-b border-line">
            {awards
              .filter((a) => a.scope === scope)
              .map((a) => (
                <InView as="li" key={a.id} className="border-t border-line">
                  <article className="rv grid gap-x-10 gap-y-6 py-8 sm:py-10 lg:grid-cols-12">
                    <div className="lg:col-span-3">
                      <h4 className="display text-display-md text-ink">
                        {a.title}
                        <span className="sr-only">, {a.event}</span>
                      </h4>
                      <p className="tabular mt-2.5 text-[0.9375rem] text-faint">{a.date}</p>
                    </div>
                    <div className="lg:col-span-4">
                      <p className="font-[650] leading-snug text-ink">{a.event}</p>
                      {a.organizer ? <p className="mt-1.5 text-muted">{a.organizer}</p> : null}
                      <p className="mt-4 text-muted">{a.description}</p>
                      <p className="note mt-5">{a.attribution}</p>
                    </div>
                    {a.images.length ? (
                      <div className="grid grid-cols-2 gap-4 self-start sm:max-w-[31rem] lg:col-span-5 lg:max-w-none lg:gap-5">
                        {a.images.map((img, k) => (
                          <button
                            key={img.src}
                            type="button"
                            onClick={() => setLightbox(indexOf(a.id, k))}
                            className={cn("group block w-full text-left", a.images.length === 1 && "lg:col-start-2")}
                          >
                            <span className="sr-only">View: </span>
                            <span className="block border border-line transition-colors duration-300 group-hover:border-rule">
                              <CertFrame
                                src={img.src}
                                width={img.width}
                                height={img.height}
                                alt=""
                                sizes="(min-width: 1024px) 16rem, (min-width: 640px) 15rem, 44vw"
                              />
                            </span>
                            <span className="mt-2.5 block text-[0.9375rem] leading-snug text-muted">{img.caption}</span>
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </article>
                </InView>
              ))}
          </ul>
        </div>
      ))}

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
    </Section>
  );
}
