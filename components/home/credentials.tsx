"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { certificates, certCategories, type CertCategory, type Certificate } from "@/data/content";
import { SectionHead } from "@/components/ui/section-head";
import { Lightbox, type LightboxItem } from "@/components/ui/lightbox";
import { ArrowOut, Plus } from "@/components/ui/glyphs";
import { cn } from "@/lib/utils";

type Filter = "All" | CertCategory;
const INITIAL = 8;

// Newest first; ties keep their order in the data file.
const sorted = [...certificates].sort((a, b) => b.sort.localeCompare(a.sort));
const latestSort = sorted[0]?.sort.slice(0, 7);
const latest = sorted.filter((c) => c.sort.startsWith(latestSort));

const toItem = (c: Certificate): LightboxItem => ({
  key: c.id,
  src: c.image.src,
  width: c.image.width,
  height: c.image.height,
  alt: `${c.name} — ${c.type ?? "certificate"} issued by ${c.issuer}`,
  title: c.name,
  subtitle: [c.issuer, c.platform, c.type].filter(Boolean).join(" · "),
  meta: [
    { label: "Issued", value: c.issued },
    ...(c.score ? [{ label: "Score", value: c.score }] : []),
    ...(c.hours ? [{ label: "Study time", value: c.hours }] : []),
    ...(c.validUntil ? [{ label: "Valid until", value: c.validUntil }] : []),
    ...(c.credentialId ? [{ label: "Credential ID", value: c.credentialId }] : []),
  ],
  verifyUrl: c.linkLabel ? undefined : c.verifyUrl,
});

const issuerTone: Record<Certificate["issuer"], string> = {
  "Saylor University": "from-[#E8EEF7] to-[#EFEDF8]",
  "The Open University": "from-[#E3EDE5] to-[#E8EEF7]",
  Google: "from-[#EFEDF8] to-[#FAF9F6]",
  "Dicoding Indonesia": "from-[#E8EEF7] to-[#FAF9F6]",
  "EF SET": "from-[#FAECE2] to-[#FAF9F6]",
};

function Mount({ c, sizes, big = false }: { c: Certificate; sizes: string; big?: boolean }) {
  return (
    <span className={cn("relative block w-full overflow-hidden rounded-[18px] bg-gradient-to-br dark:from-[#1C2638] dark:to-[#111827]", issuerTone[c.issuer], big ? "aspect-[4/3]" : "aspect-[4/3]")}>
      <span className="absolute inset-[8%] block transition-transform duration-cine ease-out group-hover:scale-[1.04] motion-reduce:group-hover:scale-100">
        <span className="relative block h-full w-full">
          <Image src={c.image.src} alt="" fill sizes={sizes} className="object-contain drop-shadow-[0_12px_20px_rgba(32,36,60,0.18)]" />
        </span>
      </span>
      <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/85 px-2.5 py-1 text-[0.72rem] font-semibold text-[#20242C] opacity-0 backdrop-blur transition-opacity duration-base group-hover:opacity-100 group-focus-visible:opacity-100">
        <Plus size={11} /> View
      </span>
    </span>
  );
}

export function Credentials() {
  const [filter, setFilter] = useState<Filter>("All");
  const [all, setAll] = useState(false);
  const [view, setView] = useState<{ list: Certificate[]; index: number } | null>(null);

  const list = useMemo(() => (filter === "All" ? sorted : sorted.filter((c) => c.category === filter)), [filter]);
  const shown = all || filter !== "All" ? list : list.slice(0, INITIAL);
  const issuers = Array.from(new Set(certificates.map((c) => c.issuer)));
  const verifiable = certificates.filter((c) => c.verifyUrl && !c.linkLabel).length;

  return (
    <section id="credentials" aria-labelledby="cred-title" className="tone-mist py-section">
      <div className="frame">
        <SectionHead
          id="cred-title"
          eyebrow="Credentials"
          title={
            <>
              Learning, <span className="accent-serif text-sage-ink">on the record.</span>
            </>
          }
          intro={`${certificates.length} credentials from ${issuers.length} issuers, newest first. ${verifiable} can be verified online; every certificate is shown whole, never cropped.`}
        />

        {/* Latest */}
        <div className="mt-14" data-reveal>
          <p className="eyebrow fade">Latest · {latest[0]?.issued}</p>
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {latest.map((c, i) => (
              <article key={c.id} className="card fade group grid overflow-hidden sm:grid-cols-[1.05fr_1fr]" style={{ ["--i" as string]: i + 1 }}>
                <button type="button" onClick={() => setView({ list: latest, index: i })} className="block p-3" aria-label={`Open ${c.name} certificate`}>
                  <Mount c={c} sizes="(min-width: 1024px) 26vw, (min-width: 480px) 50vw, 100vw" big />
                </button>
                <div className="flex flex-col p-6 pt-3 sm:pl-3 sm:pt-6">
                  <p className="text-small font-semibold text-sage-ink">{c.issuer}{c.platform ? ` · ${c.platform}` : ""}</p>
                  <h3 className="display mt-2 text-h3">{c.name}</h3>
                  <p className="mt-1 text-small text-stone">{c.type} · {c.issued}</p>
                  <dl className="mt-4 grid grid-cols-2 gap-3">
                    {[
                      c.score ? ["Score", c.score] : null,
                      c.hours ? ["Study time", c.hours] : null,
                      c.courseCode ? ["Course code", c.courseCode] : null,
                      c.credentialId ? ["Credential ID", c.credentialId] : null,
                    ]
                      .filter(Boolean)
                      .map((kv) => (
                        <div key={(kv as string[])[0]} className="rounded-xl bg-ink/[0.04] px-3 py-2">
                          <dt className="text-[0.72rem] font-semibold text-stone">{(kv as string[])[0]}</dt>
                          <dd className="text-small font-semibold">{(kv as string[])[1]}</dd>
                        </div>
                      ))}
                  </dl>
                  {c.topics?.length ? <p className="mt-4 text-small text-stone">{c.topics.join(" · ")}</p> : null}
                  {c.verifyUrl ? (
                    <a href={c.verifyUrl} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-4 text-small font-semibold text-sage-ink">
                      <span className="ink-link">{c.linkLabel ?? "Verify credential"}</span> <ArrowOut size={13} />
                      <span className="sr-only"> for {c.name} (opens in a new tab)</span>
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Archive */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4">
          <h3 className="display text-h2">Full archive</h3>
          <div role="group" aria-label="Filter credentials by category" className="no-scrollbar -mx-1 flex max-w-full gap-2 overflow-x-auto px-1 py-1">
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
                    "inline-flex min-h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 text-small font-semibold transition-colors duration-base",
                    on ? "border-ink bg-ink text-paper" : "border-line/20 bg-card hover:border-line/50",
                  )}
                >
                  {f} <span className={cn("tabular text-[0.75rem]", on ? "text-paper/70" : "text-stone")}>{n}</span>
                </button>
              );
            })}
          </div>
        </div>
        <p className="sr-only" aria-live="polite">
          Showing {shown.length} of {list.length} credentials{filter !== "All" ? ` in ${filter}` : ""}, newest first.
        </p>

        <motion.ul layout className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((c, i) => (
              <motion.li
                layout
                key={c.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="card group flex flex-col p-3"
              >
                <button type="button" onClick={() => setView({ list, index: list.indexOf(c) })} className="block w-full" aria-label={`Open ${c.name} certificate`}>
                  <Mount c={c} sizes="(min-width: 1024px) 22vw, (min-width: 480px) 45vw, 100vw" />
                </button>
                <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
                  <p className="text-[0.75rem] font-semibold text-stone">
                    {c.issuer} · {c.issued}
                  </p>
                  <h4 className="mt-1 font-semibold leading-snug">{c.name}</h4>
                  <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-3">
                    <span className="rounded-full bg-ink/[0.05] px-2.5 py-1 text-[0.72rem] font-semibold text-stone">{c.category}</span>
                    {c.verifyUrl ? (
                      <a href={c.verifyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center gap-1 text-[0.8rem] font-semibold text-sage-ink hover:text-ink">
                        {c.linkLabel ?? "Verify"} <ArrowOut size={12} />
                        <span className="sr-only"> {c.name} (opens in a new tab)</span>
                      </a>
                    ) : null}
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {filter === "All" && list.length > INITIAL ? (
          <div className="mt-10 flex justify-center">
            <button type="button" onClick={() => setAll((a) => !a)} className="slab" aria-expanded={all}>
              {all ? "Show fewer" : `Show all ${list.length} credentials`}
            </button>
          </div>
        ) : null}
      </div>

      <AnimatePresence>
        {view ? (
          <Lightbox items={view.list.map(toItem)} index={view.index} onIndex={(i) => setView((v) => (v ? { ...v, index: i } : v))} onClose={() => setView(null)} label="Certificate" />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
