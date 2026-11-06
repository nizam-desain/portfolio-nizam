"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Plus } from "lucide-react";
import { featuredExperience as mattel, otherExperience } from "@/data/content";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";
import { AnalysisFlow } from "@/components/sections/analysis-flow";

export function Experience() {
  const [open, setOpen] = useState<string | null>(otherExperience[0]?.id ?? null);
  // Timeline progress: the accent rule fills as the list scrolls through view.
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="experience" aria-labelledby="experience-title" className="textured relative bg-surface pb-14 pt-24 sm:pb-20 sm:pt-32">
      <div className="container-page">
        <SectionHeader
          id="experience-title"
          index="02"
          label="Experience"
          numeral
          title={
            <>
              Corporate exposure, <span className="italic text-accent">grounded</span> in real operations.
            </>
          }
          intro="An internship inside a multinational's People & Culture function, alongside earlier roles in partnerships, finance, communications and administration."
        />

        {/* Featured: Mattel */}
        <Reveal className="mt-16">
          <article
            aria-labelledby="exp-mattel"
            className="relative overflow-hidden rounded-2xl border border-line bg-raised shadow-soft"
          >
            <div className="grid lg:grid-cols-12">
              <div className="border-b border-line p-7 sm:p-10 lg:col-span-5 lg:border-b-0 lg:border-r">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-sage/15 px-3 py-1 text-xs font-medium text-sage">
                    <span className="h-1.5 w-1.5 rounded-full bg-sage" aria-hidden />
                    Current internship
                  </span>
                  <span className="chip">{mattel.period}</span>
                </div>
                <h3 id="exp-mattel" className="mt-8 font-serif text-[2.6rem] leading-none text-ink sm:text-[3.2rem]">
                  {mattel.organization}
                </h3>
                <p className="mt-3 text-sm text-muted">{mattel.unit}</p>
                <p className="mt-8 text-lg font-medium leading-snug text-ink">{mattel.role}</p>
                <p className="mt-4 text-[0.975rem] leading-relaxed text-muted">{mattel.summary}</p>
                <p className="mt-8 text-xs leading-relaxed text-muted">
                  Internship role. Project details elsewhere on this site are summarised at a high level and do not
                  include confidential company information.
                </p>
              </div>
              <div className="p-7 sm:p-10 lg:col-span-7">
                <p className="eyebrow">What the role involves</p>
                <ul className="mt-6 space-y-0">
                  {mattel.highlights.map((h, i) => (
                    <motion.li
                      key={h}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.06 * i, ease: [0.16, 1, 0.3, 1] }}
                      className="group/row grid grid-cols-[2rem_1fr] gap-2 border-t border-line py-4 first:border-t-0 first:pt-0"
                    >
                      <span className="font-mono text-xs tabular-nums text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-[0.975rem] leading-relaxed text-ink transition-transform duration-500 ease-editorial group-hover/row:translate-x-1">
                        {h}
                      </span>
                    </motion.li>
                  ))}
                </ul>
                <a href="#work" className="link-underline mt-8 inline-block text-sm font-medium text-ink">
                  See the case studies from this role →
                </a>
              </div>
            </div>
            <AnalysisFlow />
          </article>
        </Reveal>

        {/* Timeline */}
        <div className="mt-20 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h3 className="font-serif text-3xl text-ink">Earlier experience</h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Roles that built the fundamentals — negotiating with partners, managing budgets, coordinating
              stakeholders and keeping records accurate.
            </p>
          </Reveal>

          <ol ref={listRef} className="relative lg:col-span-8">
            <span aria-hidden className="absolute bottom-2 left-[0.4375rem] top-2 w-px bg-line" />
            <motion.span
              aria-hidden
              style={{ scaleY: progress }}
              className="absolute bottom-2 left-[0.4375rem] top-2 w-px origin-top bg-accent"
            />
            {otherExperience.map((item, i) => {
              const isOpen = open === item.id;
              const panelId = `exp-panel-${item.id}`;
              return (
                <Reveal as="li" key={item.id} delay={0.05 * i} className="relative pl-10">
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-0 top-[1.6rem] h-[0.9375rem] w-[0.9375rem] rounded-full border-2 transition-colors duration-300",
                      isOpen ? "border-accent bg-accent" : "border-line bg-surface",
                    )}
                  />
                  <div className="border-b border-line">
                    <h4>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpen(isOpen ? null : item.id)}
                        className="group flex w-full items-start justify-between gap-6 py-5 text-left"
                      >
                        <span>
                          <span className="block text-xs text-muted">
                            {item.period} · {item.location}
                          </span>
                          <span className="mt-1.5 block text-lg font-medium leading-snug text-ink">{item.role}</span>
                          <span className="mt-0.5 block text-[0.975rem] text-muted">{item.organization}</span>
                        </span>
                        <span className="flex shrink-0 items-center gap-4">
                          {item.keyResult ? (
                            <span className="hidden text-right sm:block">
                              <span className="block font-serif text-2xl leading-none text-accent">
                                {item.keyResult.value}
                              </span>
                              <span className="mt-1 block max-w-[11rem] text-[0.7rem] leading-tight text-muted">
                                {item.keyResult.label}
                              </span>
                            </span>
                          ) : null}
                          <span
                            className={cn(
                              "grid h-9 w-9 place-items-center rounded-full border border-line text-ink transition-transform duration-500 ease-editorial group-hover:border-ink/40",
                              isOpen && "rotate-45",
                            )}
                            aria-hidden
                          >
                            <Plus size={16} />
                          </span>
                        </span>
                      </button>
                    </h4>
                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          id={panelId}
                          key="panel"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-6">
                            {item.keyResult ? (
                              <p className="mb-4 sm:hidden">
                                <span className="font-serif text-2xl text-accent">{item.keyResult.value}</span>{" "}
                                <span className="text-sm text-muted">{item.keyResult.label}</span>
                              </p>
                            ) : null}
                            <p className="text-[0.975rem] leading-relaxed text-ink">{item.summary}</p>
                            <ul className="mt-4 space-y-2">
                              {item.highlights.map((h) => (
                                <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted">
                                  <span className="mt-[0.6rem] h-px w-3 shrink-0 bg-accent" aria-hidden />
                                  {h}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
