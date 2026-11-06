"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { academicProjects } from "@/data/content";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

export function AcademicProjects() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative border-t border-line py-24 sm:py-32">
      <div className="container-page">
        <SectionHeader
          id="projects-title"
          index="04"
          label="Academic & strategic projects"
          title={
            <>
              Selected projects from <span className="italic text-accent">university</span> &amp; competitions.
            </>
          }
          intro="Coursework, competition proposals and team projects. These are academic work and prototypes — not commercial deployments."
        />

        <ul className="mt-14 border-t border-line">
          {academicProjects.map((p, i) => {
            const isOpen = open === p.slug;
            const panelId = `proj-${p.slug}`;
            const technical = p.slug === "mobile-inventory";
            return (
              <Reveal as="li" key={p.slug} delay={0.04 * i} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : p.slug)}
                    className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-6 text-left sm:grid-cols-[4rem_1fr_14rem_auto] sm:py-8"
                  >
                    <span className="font-mono text-xs tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="block font-serif text-[1.65rem] leading-tight text-ink transition-transform duration-500 ease-editorial group-hover:translate-x-1 sm:text-[2.1rem]">
                        {p.title}
                      </span>
                      <span className="mt-1 block text-sm text-muted">
                        {technical ? "Additional technical project · " : ""}
                        {p.kind}
                      </span>
                    </span>
                    <span className="hidden text-sm text-muted sm:block">{p.period}</span>
                    <span
                      className={cn(
                        "grid h-10 w-10 place-items-center rounded-full border border-line text-ink transition-all duration-500 ease-editorial group-hover:border-ink/40",
                        isOpen && "rotate-45 bg-ink text-paper",
                      )}
                      aria-hidden
                    >
                      <Plus size={16} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={panelId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 pb-10 sm:grid-cols-[4rem_1fr] sm:pl-0">
                        <span aria-hidden className="hidden sm:block" />
                        <div className="grid gap-8 lg:grid-cols-12">
                          <div className="lg:col-span-7">
                            <p className="text-[1.0625rem] leading-relaxed text-ink">{p.summary}</p>
                            <ul className="mt-5 space-y-2.5">
                              {p.points.map((pt) => (
                                <li key={pt} className="flex gap-3 text-[0.95rem] leading-relaxed text-muted">
                                  <span className="mt-[0.7rem] h-px w-3 shrink-0 bg-accent" aria-hidden />
                                  {pt}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="lg:col-span-4 lg:col-start-9">
                            <dl className="space-y-4 text-sm">
                              <div>
                                <dt className="eyebrow">Role</dt>
                                <dd className="mt-1 text-ink">{p.role}</dd>
                              </div>
                              <div className="sm:hidden">
                                <dt className="eyebrow">Period</dt>
                                <dd className="mt-1 text-ink">{p.period}</dd>
                              </div>
                              <div>
                                <dt className="eyebrow">Focus</dt>
                                <dd className="mt-2 flex flex-wrap gap-2">
                                  {p.tags.map((t) => (
                                    <span key={t} className="chip">
                                      {t}
                                    </span>
                                  ))}
                                </dd>
                              </div>
                            </dl>
                            {p.link ? (
                              <a
                                href={p.link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link-underline mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink"
                              >
                                {p.link.label}
                                <ArrowUpRight size={14} aria-hidden />
                                <span className="sr-only">(opens in a new tab)</span>
                              </a>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
