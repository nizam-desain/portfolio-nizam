"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { certificates, certCategories, sections, type CertCategory, type Certificate } from "@/data/content";
import { Section } from "@/components/ui/section";
import { InView } from "@/components/ui/in-view";
import { CertFrame } from "@/components/ui/cert-frame";
import { Lightbox, type LightboxItem } from "@/components/ui/lightbox";
import { cn, delay } from "@/lib/utils";

type Filter = "All" | CertCategory;

/** How many are shown before "Show all" on small screens. Wide screens always show everything. */
const INITIAL = 6;

const byId = new Map(certificates.map((c) => [c.id, c]));
const courseCount = (id: string) => certificates.filter((c) => c.partOf === id).length;

/** How a credential relates to another one, in words. */
function relation(c: Certificate) {
  if (c.partOf) return `Course in the ${byId.get(c.partOf)?.name}`;
  const n = courseCount(c.id);
  return n ? `Professional certificate covering ${n} courses` : null;
}

function toLightbox(c: Certificate): LightboxItem {
  return {
    key: c.id,
    src: c.image.src,
    width: c.image.width,
    height: c.image.height,
    alt: `${c.name} certificate issued by ${c.issuer} to Nizamuddin Giffa Abdul Aziz Zahrani`,
    title: c.result ? `${c.name}, ${c.result}` : c.name,
    subtitle: [c.issuer, c.platform ? `through ${c.platform}` : null].filter(Boolean).join(", "),
    note: c.note ?? relation(c) ?? undefined,
    meta: [
      { label: "Issued", value: c.issued },
      ...(c.validUntil ? [{ label: "Valid until", value: c.validUntil }] : []),
      ...(c.credentialId ? [{ label: "Credential ID", value: c.credentialId }] : []),
      { label: "Source image", value: `${c.image.width} × ${c.image.height} px` },
    ],
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
  const items = useMemo(() => filtered.map(toLightbox), [filtered]);
  const count = (f: Filter) => (f === "All" ? certificates.length : certificates.filter((c) => c.category === f).length);
  const collapsible = filtered.length > INITIAL;

  return (
    <Section
      id="credentials"
      label={sections.credentials.label}
      title={`${certificates.length} credentials, shown as issued.`}
      intro={sections.credentials.intro}
    >
      <InView className="mt-12 sm:mt-14">
        <div role="group" aria-label="Filter certificates by category" className="rv flex flex-wrap gap-x-7 gap-y-1">
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
                  "group inline-flex min-h-[2.75rem] items-center gap-2.5 transition-colors duration-200",
                  active ? "text-ink" : "text-muted hover:text-ink",
                )}
              >
                <span
                  aria-hidden
                  className={cn("pt transition-colors duration-200", active ? "pt-fill" : "border-rule group-hover:border-ink")}
                />
                <span className={cn(active && "font-[650]")}>{f}</span>
                <span className="tabular text-[0.9375rem] text-faint">{count(f)}</span>
              </button>
            );
          })}
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-x-5 gap-y-10 min-[380px]:grid-cols-2 sm:gap-x-7 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((c, i) => {
            const rel = relation(c);
            return (
              <li
                key={c.id}
                className={cn("rv", collapsible && !expanded && i >= INITIAL && "max-lg:hidden")}
                style={delay(Math.min(i, 7) * 0.05)}
              >
                <button type="button" onClick={() => setLightbox(i)} className="group block w-full text-left">
                  <span className="sr-only">View certificate: </span>
                  <span className="block border border-line transition-colors duration-300 group-hover:border-rule">
                    <CertFrame
                      src={c.image.src}
                      width={c.image.width}
                      height={c.image.height}
                      alt=""
                      sizes="(min-width: 1280px) 19rem, (min-width: 1024px) 28vw, (min-width: 380px) 44vw, 88vw"
                    />
                  </span>
                  <span className="mt-3.5 block font-[650] leading-snug text-ink">{c.name}</span>
                  {c.result ? <span className="mt-0.5 block leading-snug text-ink">{c.result}</span> : null}
                  <span className="mt-1.5 block text-[0.9375rem] leading-snug text-muted">
                    {c.issuer}, {c.issued}
                  </span>
                  {rel ? <span className="mt-1 block text-[0.9375rem] leading-snug text-muted">{rel}</span> : null}
                  {c.credentialId ? (
                    <span className="tabular mt-1 block text-[0.9375rem] leading-snug text-faint">
                      <span className="sr-only">Credential </span>ID {c.credentialId}
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>

        {collapsible ? (
          <div className="mt-10 lg:hidden">
            <button type="button" onClick={() => setExpanded((v) => !v)} className="btn-line" aria-expanded={expanded}>
              {expanded ? "Show fewer" : `Show all ${filtered.length} certificates`}
            </button>
          </div>
        ) : null}
      </InView>

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
    </Section>
  );
}
