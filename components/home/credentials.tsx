"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { certificates, certCategories, type CertCategory, type Certificate } from "@/data/content";
import { SectionMark } from "@/components/ui/section-mark";
import { Lightbox, type LightboxItem } from "@/components/ui/lightbox";
import { ArrowOut, Plus } from "@/components/ui/glyphs";
import { cn } from "@/lib/utils";

type Filter = "All" | CertCategory;
const INITIAL = 9;

const toItem = (c: Certificate): LightboxItem => ({
  key: c.id,
  src: c.image.src,
  width: c.image.width,
  height: c.image.height,
  alt: `${c.name} certificate issued by ${c.issuer}`,
  title: c.name,
  subtitle: [c.issuer, c.platform].filter(Boolean).join(" · ") + (c.note ? ` — ${c.note}` : ""),
  meta: [
    { label: "Issued", value: c.issued },
    ...(c.validUntil ? [{ label: "Valid until", value: c.validUntil }] : []),
    ...(c.credentialId ? [{ label: "Credential ID", value: c.credentialId }] : []),
  ],
  verifyUrl: c.verifyUrl,
});

const issuers = Array.from(new Set(certificates.map((c) => c.issuer))).map((name) => ({
  name,
  count: certificates.filter((c) => c.issuer === name).length,
}));

export function Credentials() {
  const [filter, setFilter] = useState<Filter>("All");
  const [all, setAll] = useState(false);
  const [view, setView] = useState<number | null>(null);

  const list = useMemo(() => (filter === "All" ? certificates : certificates.filter((c) => c.category === filter)), [filter]);
  const shown = all || filter !== "All" ? list : list.slice(0, INITIAL);
  const items = useMemo(() => list.map(toItem), [list]);
  const verifiable = certificates.filter((c) => c.verifyUrl).length;

  return (
    <section id="credentials" aria-labelledby="cred-title" className="bg-sheet py-section">
      <div className="frame">
        <SectionMark ref_="07" label="Credentials" note={`${certificates.length} on file · ${verifiable} verifiable online`} />

        <div className="grid-12 mt-14 gap-y-8 md:mt-20" data-reveal>
          <h2 id="cred-title" className="display col-span-4 text-h1 uppercase md:col-span-6">
            <span className="mask"><span>Credential</span></span>
            <span className="mask" style={{ ["--i" as string]: 1 }}><span>archive</span></span>
          </h2>
          <div className="fade col-span-4 self-end md:col-span-5 md:col-start-8" style={{ ["--i" as string]: 2 }}>
            <p className="text-graphite">
              Every certificate as issued — shown whole, never cropped — with the verification link printed on it.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3" aria-label="Credentials by issuer">
              {issuers.map((i) => (
                <li key={i.name} className="flex items-baseline gap-2">
                  <span className="display text-h3 tabular">{String(i.count).padStart(2, "0")}</span>
                  <span className="meta text-stone">{i.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Filters */}
        <div role="group" aria-label="Filter credentials by category" className="no-scrollbar mt-14 flex gap-6 overflow-x-auto border-b border-line/90 md:gap-9">
          {(["All", ...certCategories] as Filter[]).map((f) => {
            const n = f === "All" ? certificates.length : certificates.filter((c) => c.category === f).length;
            const on = filter === f;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setFilter(f);
                  setAll(false);
                }}
                className={cn(
                  "meta relative shrink-0 whitespace-nowrap pb-3 pt-2 transition-colors duration-base",
                  on ? "text-ink" : "text-stone hover:text-ink",
                )}
              >
                {f} <sup className="tabular">{n}</sup>
                <span aria-hidden className={cn("absolute -bottom-px left-0 h-[3px] bg-ink transition-[width] duration-slow ease-out", on ? "w-full" : "w-0")} />
              </button>
            );
          })}
        </div>
        <p className="sr-only" aria-live="polite">
          Showing {shown.length} of {list.length} credentials{filter !== "All" ? ` in ${filter}` : ""}.
        </p>

        <motion.ul layout className="mt-10 grid grid-cols-1 gap-x-gutter gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((c, i) => {
              const lead = filter === "All" && i === 0;
              return (
                <motion.li
                  layout
                  key={c.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className={cn("flex flex-col", lead && "sm:col-span-2 lg:row-span-2")}
                >
                  <button
                    type="button"
                    onClick={() => setView(list.indexOf(c))}
                    className="group relative block w-full"
                    aria-label={`Open ${c.name} certificate`}
                  >
                    {/* Mount: fixed ratio, certificate contained inside it with its own ratio intact */}
                    <span className={cn("relative block w-full overflow-hidden bg-paper", lead ? "aspect-[4/3] lg:aspect-[5/4]" : "aspect-[4/3]")}>
                      <span className="absolute inset-[7%] block transition-transform duration-cine ease-out group-hover:scale-[1.03] motion-reduce:group-hover:scale-100">
                        <span className="relative block h-full w-full">
                          <Image
                            src={c.image.src}
                            alt=""
                            fill
                            sizes={lead ? "(min-width: 1024px) 45vw, (min-width: 480px) 90vw, 100vw" : "(min-width: 1024px) 22vw, (min-width: 480px) 45vw, 100vw"}
                            className="object-contain drop-shadow-[0_1px_1px_rgba(16,17,16,0.12)]"
                          />
                        </span>
                      </span>
                      <span className="meta absolute right-3 top-3 flex items-center gap-1.5 bg-ink px-2 py-1 text-paper opacity-0 transition-opacity duration-base group-hover:opacity-100 group-focus-visible:opacity-100">
                        <Plus size={11} /> View
                      </span>
                    </span>
                  </button>
                  <div className="mt-4 flex flex-1 flex-col">
                    <p className="meta text-stone">
                      {c.issuer}
                      {c.platform ? ` · ${c.platform}` : ""} · {c.issued}
                    </p>
                    <h3 className={cn("mt-2 leading-snug", lead ? "display text-h3 uppercase" : "text-body font-medium")}>{c.name}</h3>
                    {c.note && lead ? <p className="mt-2 text-small text-stone">{c.note}</p> : null}
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
                      {c.credentialId ? <span className="meta text-stone">ID {c.credentialId}</span> : null}
                      {c.verifyUrl ? (
                        <a href={c.verifyUrl} target="_blank" rel="noopener noreferrer" className="meta inline-flex min-h-8 items-center gap-1 text-sage-ink hover:text-ink">
                          Verify <ArrowOut size={12} />
                          <span className="sr-only">{c.name} (opens in a new tab)</span>
                        </a>
                      ) : null}
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>

        {filter === "All" && list.length > INITIAL ? (
          <div className="mt-14 flex justify-center">
            <button type="button" onClick={() => setAll((a) => !a)} className="slab" aria-expanded={all}>
              {all ? "Show fewer" : `Show all ${list.length} credentials`}
            </button>
          </div>
        ) : null}
      </div>

      <AnimatePresence>
        {view !== null ? (
          <Lightbox items={items} index={view} onIndex={setView} onClose={() => setView(null)} label="Certificate" />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
