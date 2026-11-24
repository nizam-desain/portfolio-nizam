"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { method } from "@/data/content";
import { SectionHead } from "@/components/ui/section-head";
import { cn } from "@/lib/utils";

// One accent per stage, so the active stage colours the whole composition.
const hues = ["var(--sage-ink)", "var(--teal)", "var(--oxide)", "var(--lav)", "var(--sage-ink)", "var(--teal)"];

export function Method() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.step))),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const step = method[active];

  return (
    <section id="method" aria-labelledby="method-title" className="tone-lav py-section">
      <div className="frame">
        <SectionHead
          id="method-title"
          eyebrow="How I work"
          title={
            <>
              Understand first, <span className="accent-serif text-sage-ink">then change.</span>
            </>
          }
          intro="The same six moves sit under every project here. Validation sends work back to the requirements more often than not — that loop is the point."
        />

        <div className="grid-12 mt-14 gap-y-10 md:mt-20">
          {/* Pinned visual: artwork + live stage caption + progress rail */}
          <div className="relative col-span-4 hidden md:col-span-6 md:block">
            <div className="sticky top-[calc(var(--header-h)+2rem)]">
              <div className="img-frame relative aspect-[5/4]">
                <Image src="/art/method.jpg" alt="Original 3D composition of stepping platforms in indigo, teal and lavender" fill sizes="45vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1020]/75 via-[#0b1020]/10 to-transparent" />
                <span className="absolute right-4 top-4 rounded-full bg-white/70 px-3 py-1 text-[0.7rem] font-semibold text-[#20242C] backdrop-blur-md">Original artwork</span>
                <div className="absolute inset-x-6 bottom-6 text-white">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="text-small font-semibold text-white/80">Stage {step.n} · output</p>
                      <p className="display mt-1 text-h3">{step.artefact}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <ol className="mt-6 grid grid-cols-6 gap-2" aria-hidden>
                {method.map((m, i) => (
                  <li key={m.n} className="flex flex-col gap-2">
                    <span className="h-1.5 overflow-hidden rounded-full bg-ink/10">
                      <span
                        className="block h-full rounded-full transition-[width] duration-slow ease-out"
                        style={{ width: i <= active ? "100%" : "0%", background: `rgb(${hues[i]})` }}
                      />
                    </span>
                    <span className={cn("text-[0.75rem] font-semibold transition-colors", i === active ? "text-ink" : "text-stone")}>{m.n}</span>
                  </li>
                ))}
              </ol>
              <p className="sr-only" aria-live="polite">
                Stage {step.n}: {step.title}. Output: {step.artefact}.
              </p>
            </div>
          </div>

          <ol className="col-span-4 space-y-4 md:col-span-6 md:col-start-7 md:space-y-0">
            {method.map((m, i) => (
              <li
                key={m.n}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-step={i}
                className="md:flex md:min-h-[32vh] md:items-center"
                data-reveal
              >
                <div
                  className={cn(
                    "card fade relative w-full overflow-hidden p-6 transition-[transform,opacity] duration-slow ease-out sm:p-8",
                    i === active ? "md:scale-100 md:opacity-100" : "md:scale-[0.97] md:opacity-60",
                  )}
                >
                  <span aria-hidden className="absolute inset-y-0 left-0 w-1.5" style={{ background: `rgb(${hues[i]})` }} />
                  <div className="flex items-baseline gap-4">
                    <span aria-hidden className="display text-[2.6rem] leading-none" style={{ color: `rgb(${hues[i]})` }}>
                      {m.n}
                    </span>
                    <h3 className="text-h3 font-semibold leading-tight tracking-[-0.01em]">{m.title}</h3>
                  </div>
                  <p className="mt-4 text-graphite">{m.body}</p>
                  <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink/[0.05] px-3 py-1.5 text-small font-semibold text-stone">
                    Output: <span className="text-ink">{m.artefact}</span>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
