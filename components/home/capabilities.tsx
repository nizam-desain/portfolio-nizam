"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { capabilities, toolkit, work } from "@/data/content";
import { SectionMark } from "@/components/ui/section-mark";
import { Disclosure } from "@/components/ui/disclosure";
import { Arrow } from "@/components/ui/glyphs";
import { cn } from "@/lib/utils";

const bySlug = Object.fromEntries(work.map((w) => [w.slug, w]));

function Panel({ i }: { i: number }) {
  const c = capabilities[i];
  return (
    <div>
      <p className="text-lead">{c.body}</p>
      <ul className="mt-8 grid gap-x-6 sm:grid-cols-2">
        {c.items.map((it) => (
          <li key={it} className="border-b border-line/15 py-2.5 text-small">
            {it}
          </li>
        ))}
      </ul>
      <p className="meta mt-8 text-stone">Seen in</p>
      <ul className="mt-3 space-y-2">
        {c.evidence.map((s) => (
          <li key={s}>
            <Link href={`/work/${s}`} className="group inline-flex items-center gap-3 text-small">
              <span className="meta text-oxide">{bySlug[s].index}</span>
              <span className="ink-link">{bySlug[s].title}</span>
              <Arrow size={14} className="transition-transform duration-base group-hover:translate-x-1" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Capabilities() {
  const [active, setActive] = useState(0);
  const uid = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = capabilities.length;
    let next = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % n;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (next >= 0) {
      e.preventDefault();
      setActive(next);
      tabs.current[next]?.focus();
    }
  };

  return (
    <section id="capabilities" aria-labelledby="cap-title" className="py-section">
      <div className="frame">
        <SectionMark ref_="05" label="Capabilities" note="Disciplines, not a tool list" />

        <div className="grid-12 mt-14 gap-y-6 md:mt-20" data-reveal>
          <h2 id="cap-title" className="col-span-4 max-w-[18ch] text-[clamp(1.75rem,1.1rem+2.6vw,3.5rem)] leading-[1.05] tracking-[-0.02em] md:col-span-8">
            <span className="fade block">
              Seven things I can do for a team — each linked to the work that <span className="accent-serif text-sage-ink">shows it.</span>
            </span>
          </h2>
        </div>

        {/* Desktop: tab list + panel */}
        <div className="grid-12 mt-16 hidden md:grid">
          <div role="tablist" aria-orientation="vertical" aria-label="Capabilities" className="col-span-7 border-t border-line/90">
            {capabilities.map((c, i) => (
              <button
                key={c.title}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`${uid}-t${i}`}
                aria-selected={active === i}
                aria-controls={`${uid}-p`}
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
                onPointerEnter={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
                className="group grid w-full grid-cols-[3.5rem_1fr] items-baseline border-b border-line/15 py-4 text-left"
              >
                <span className={cn("meta transition-colors duration-base", active === i ? "text-oxide" : "text-stone")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "display text-[clamp(1.75rem,1rem+2vw,3rem)] uppercase leading-[0.95] transition-[color,transform] duration-slow ease-out",
                    active === i ? "translate-x-3 text-ink" : "text-stone group-hover:text-graphite",
                  )}
                >
                  {c.title}
                </span>
              </button>
            ))}
          </div>

          <div className="col-span-4 col-start-9">
            <div className="sticky top-[calc(var(--header-h)+2rem)]">
              <div id={`${uid}-p`} role="tabpanel" aria-labelledby={`${uid}-t${active}`} tabIndex={0} className="min-h-[26rem] border-t border-line/90 pt-6">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Panel i={active} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: disclosures */}
        <div className="mt-12 border-t border-line/90 md:hidden">
          {capabilities.map((c, i) => (
            <Disclosure
              key={c.title}
              summary={
                <span className="flex items-baseline gap-4">
                  <span className="meta text-oxide">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display text-h3 uppercase">{c.title}</span>
                </span>
              }
            >
              <Panel i={i} />
            </Disclosure>
          ))}
        </div>

        <div className="mt-16 grid-12 gap-y-3 border-t border-line/15 pt-6" data-reveal>
          <p className="meta col-span-4 text-stone md:col-span-3">Supporting technical knowledge</p>
          <p className="fade col-span-4 text-small text-graphite md:col-span-9">
            {toolkit.join(" · ")}. Listed for context — enough to work credibly with technical teams, not a claim to be one.
          </p>
        </div>
      </div>
    </section>
  );
}
