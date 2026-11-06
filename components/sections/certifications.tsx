"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, Maximize2 } from "lucide-react";
import { certificates, certCategories, type CertCategory, type Certificate } from "@/data/content";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { CertFrame } from "@/components/ui/cert-frame";
import { Lightbox, type LightboxItem } from "@/components/ui/lightbox";
import { cn } from "@/lib/utils";

type Filter = "All" | CertCategory;
const INITIAL = 8;

const issuers = Array.from(
  certificates.reduce((m, c) => m.set(c.issuer, (m.get(c.issuer) ?? 0) + 1), new Map<string, number>()),
  ([name, count]) => ({ name, count }),
).sort((a, b) => b.count - a.count);

const issuerMark: Record<Certificate["issuer"], { mark: string; className: string }> = {
  Google: { mark: "G", className: "font-sans font-semibold" },
  "Dicoding Indonesia": { mark: "d", className: "font-sans font-semibold" },
  "EF SET": { mark: "EF", className: "font-sans text-[0.6rem] font-bold tracking-tight" },
};

function toLightbox(c: Certificate): LightboxItem {
  const meta = [
    { label: "Issued", value: c.issued },
    ...(c.validUntil ? [{ label: "Valid until", value: c.validUntil }] : []),
    ...(c.credentialId ? [{ label: "Credential ID", value: c.credentialId }] : []),
  ];
  return {
    key: c.id,
    src: c.image.src,
    width: c.image.width,
    height: c.image.height,
    alt: `${c.name} certificate issued by ${c.issuer} to Nizamuddin Giffa Abdul Aziz Zahrani`,
    title: c.name,
    subtitle: [c.issuer, c.platform ? `via ${c.platform}` : null, c.note].filter(Boolean).join(" · "),
    meta,
    verifyUrl: c.verifyUrl,
  };
}

export function Certifications() {
  const [filter, setFilter] = useState<Filter>("All");
  const [expanded, setExpanded] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = useMemo(
    () => (filter === "All" ? certificates : certificates.filter((c) => c.category === filter)),
    [filter],
  );
  const visible = filter === "All" && !expanded ? filtered.slice(0, INITIAL) : filtered;
  const items = useMemo(() => filtered.map(toLightbox), [filtered]);
  const counts = useMemo(() => {
    const m = new Map<Filter, number>([["All", certificates.length]]);
    certCategories.forEach((c) => m.set(c, certificates.filter((x) => x.category === c).length));
    return m;
  }, []);

  return (
    <section id="credentials" aria-labelledby="cert-title" className="relative py-24 sm:py-32">
      <div className="container-page">
        <SectionHeader
          id="cert-title"
          index="06"
          label="Certifications & licenses"
          title={
            <>
              Continuous learning, <span className="italic text-accent">on record</span>.
            </>
          }
          intro={`${certificates.length} unique credentials, shown as issued. Open any certificate to view it full-screen, zoom in, download the original, or verify it with the issuer.`}
        />

        {/* Static issuer summary */}
        <Reveal className="mt-12">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
            {[
              { k: "Credentials", v: String(certificates.length) },
              ...issuers.slice(0, 2).map((i) => ({ k: i.name, v: String(i.count) })),
              { k: "Verifiable online", v: String(certificates.filter((c) => c.verifyUrl).length) },
            ].map((d) => (
                <div key={d.k} className="bg-raised px-5 py-4">
                  <dt className="eyebrow">{d.k}</dt>
                  <dd className="mt-1 font-serif text-3xl leading-none text-ink">{d.v}</dd>
                </div>
              ))}
          </dl>
          <p className="mt-3 text-xs text-muted">
            Issued by {issuers.map((i) => `${i.name} (${i.count})`).join(", ")}.
          </p>
        </Reveal>

        <Reveal className="mt-10">
          <div
            role="toolbar"
            aria-label="Filter certificates by category"
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {(["All", ...certCategories] as Filter[]).map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setFilter(f);
                    setExpanded(false);
                  }}
                  className={cn(
                    "relative inline-flex min-h-[2.5rem] shrink-0 items-center gap-2 rounded-full border px-4 text-sm transition-colors duration-300",
                    active ? "border-ink bg-ink text-paper" : "border-line text-muted hover:border-ink/40 hover:text-ink",
                  )}
                >
                  {f}
                  <span className={cn("font-mono text-[0.7rem] tabular-nums", active ? "text-paper/70" : "text-muted")}>
                    {counts.get(f)}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.ul layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((c, i) => (
              <motion.li
                layout
                key={c.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45, delay: Math.min(i, 8) * 0.03, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  type="button"
                  onClick={() => setLightbox(filtered.indexOf(c))}
                  className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-line bg-raised text-left transition-[box-shadow,border-color,transform] duration-500 ease-editorial hover:-translate-y-1 hover:border-ink/20 hover:shadow-lift"
                >
                  <span className="sr-only">View certificate: </span>
                  <div className="relative w-full">
                    <CertFrame
                      src={c.image.src}
                      width={c.image.width}
                      height={c.image.height}
                      alt=""
                      sizes="(min-width: 1280px) 18rem, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                    />
                    <span
                      className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-paper/90 text-ink opacity-0 shadow-soft transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                      aria-hidden
                    >
                      <Maximize2 size={14} />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col border-t border-line p-4">
                    <div className="flex items-center gap-2">
                      <span
                        aria-hidden
                        className={cn(
                          "grid h-6 w-6 place-items-center rounded-full border border-line text-[0.7rem] text-ink",
                          issuerMark[c.issuer].className,
                        )}
                      >
                        {issuerMark[c.issuer].mark}
                      </span>
                      <span className="text-xs text-muted">{c.issuer}</span>
                      <span className="ml-auto text-xs tabular-nums text-muted">{c.issued}</span>
                    </div>
                    <p className="mt-3 text-[0.95rem] font-medium leading-snug text-ink">{c.name}</p>
                    {c.note ? <p className="mt-1.5 text-xs leading-relaxed text-muted">{c.note}</p> : null}
                    <div className="mt-auto flex items-center gap-1.5 pt-4 text-[0.7rem] text-muted">
                      {c.credentialId ? (
                        <>
                          {c.verifyUrl ? <BadgeCheck size={13} className="text-sage" aria-hidden /> : null}
                          <span className="font-mono tracking-wide">ID {c.credentialId}</span>
                        </>
                      ) : (
                        <span>No public verification link</span>
                      )}
                    </div>
                  </div>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {filter === "All" && filtered.length > INITIAL ? (
          <div className="mt-10 flex justify-center">
            <button type="button" onClick={() => setExpanded((v) => !v)} className="btn-ghost" aria-expanded={expanded}>
              {expanded ? "Show fewer" : `Show all ${filtered.length} credentials`}
            </button>
          </div>
        ) : null}
      </div>

      <AnimatePresence>
        {lightbox !== null ? (
          <Lightbox
            key="cert-lightbox"
            label="Certificate viewer"
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
