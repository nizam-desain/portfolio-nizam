"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { caseStudies, type CaseStudy } from "@/data/content";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { useDialog } from "@/components/ui/use-dialog";
import { CaseDiagram } from "@/components/sections/diagrams";
import { cn } from "@/lib/utils";

function StatusPill({ cs }: { cs: CaseStudy }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium",
        cs.statusTone === "ongoing" ? "bg-accent/10 text-accent" : "bg-sage/15 text-sage",
      )}
    >
      <span
        className={cn("h-1.5 w-1.5 rounded-full", cs.statusTone === "ongoing" ? "bg-accent" : "bg-sage")}
        aria-hidden
      />
      {cs.status}
    </span>
  );
}

export function CaseStudies() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="work" aria-labelledby="work-title" className="relative py-24 sm:py-32">
      <div className="container-page">
        <SectionHeader
          id="work-title"
          index="03"
          label="Professional case studies"
          title={
            <>
              Featured work from <span className="italic text-accent">Mattel Indonesia</span>.
            </>
          }
          intro="Three internal initiatives where I contributed on the functional side. Described at a high level, with illustrative diagrams — never real screens, data or internal details."
        />

        <div className="mt-16 space-y-6 sm:space-y-8">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.slug}>
              <article
                aria-labelledby={`cs-${cs.slug}`}
                className="group grid overflow-hidden rounded-2xl border border-line bg-raised transition-shadow duration-500 hover:shadow-lift lg:grid-cols-12"
              >
                <div
                  className={cn(
                    "relative flex items-center border-b border-line bg-surface p-5 sm:p-8 lg:col-span-6 lg:border-b-0",
                    i % 2 === 1 ? "lg:order-2 lg:border-l" : "lg:border-r",
                  )}
                >
                  <div className="aspect-[520/300] w-full transition-transform duration-700 ease-editorial group-hover:scale-[1.02]">
                    <CaseDiagram kind={cs.diagram} />
                  </div>
                </div>
                <div className="flex flex-col p-7 sm:p-10 lg:col-span-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-serif text-3xl italic leading-none text-accent">{cs.index}</span>
                    <StatusPill cs={cs} />
                  </div>
                  <h3 id={`cs-${cs.slug}`} className="mt-6 font-serif text-[1.9rem] leading-[1.1] text-ink sm:text-[2.3rem]">
                    {cs.title}
                  </h3>
                  <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    <div className="flex gap-2">
                      <dt className="text-muted">Organisation</dt>
                      <dd className="text-ink">{cs.organization}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-muted">Role</dt>
                      <dd className="text-ink">{cs.role}</dd>
                    </div>
                  </dl>
                  <p className="mt-6 text-[0.975rem] leading-relaxed text-muted">{cs.context}</p>
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Skills demonstrated">
                    {cs.skills.slice(0, 4).map((s) => (
                      <li key={s} className="chip">
                        {s}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(i)}
                      className="btn-ghost group/btn"
                      aria-haspopup="dialog"
                    >
                      Read the case study
                      <ArrowUpRight
                        size={16}
                        aria-hidden
                        className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                      />
                      <span className="sr-only">: {cs.shortTitle}</span>
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openIndex !== null ? (
          <CaseDialog
            key="case-dialog"
            index={openIndex}
            onIndex={setOpenIndex}
            onClose={() => setOpenIndex(null)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function CaseDialog({
  index,
  onIndex,
  onClose,
}: {
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const ref = useDialog<HTMLDivElement>(true, onClose);
  const cs = caseStudies[index];
  const prev = caseStudies[(index - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" onClick={onClose} aria-hidden />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-dialog-title"
        tabIndex={-1}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex h-full w-full max-w-3xl flex-col bg-paper shadow-lift outline-none"
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5 sm:px-8">
          <span className="eyebrow">
            Case study {cs.index} / {String(caseStudies.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={onClose}
            data-autofocus
            className="grid h-11 w-11 place-items-center rounded-full text-ink hover:bg-ink/[0.06]"
            aria-label="Close case study"
          >
            <X size={20} aria-hidden />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain">
          <AnimatePresence mode="wait">
            <motion.article
              key={cs.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="px-5 pb-12 pt-8 sm:px-10"
            >
              <StatusPill cs={cs} />
              <h2 id="case-dialog-title" className="mt-5 font-serif text-[2.1rem] leading-[1.08] text-ink sm:text-[2.75rem]">
                {cs.title}
              </h2>
              <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line text-sm sm:grid-cols-4">
                {[
                  ["Organisation", cs.organization],
                  ["Role", cs.role],
                  ["Period", cs.period],
                  ["Status", cs.status],
                ].map(([k, v]) => (
                  <div key={k} className="bg-raised p-4">
                    <dt className="eyebrow">{k}</dt>
                    <dd className="mt-2 leading-snug text-ink">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 rounded-xl border border-line bg-surface p-4 sm:p-6">
                <div className="aspect-[520/300] w-full">
                  <CaseDiagram kind={cs.diagram} />
                </div>
              </div>

              <div className="mt-10 space-y-10">
                <Block title="Business context">
                  <p>{cs.context}</p>
                </Block>
                <Block title="Objective">
                  <p>{cs.objective}</p>
                </Block>
                <Block title="My responsibilities">
                  <List items={cs.responsibilities} />
                </Block>
                <Block title="Analytical approach">
                  <List items={cs.approach} />
                </Block>
                <Block title="Key deliverables">
                  <ul className="flex flex-wrap gap-2">
                    {cs.deliverables.map((d) => (
                      <li key={d} className="rounded-lg border border-line bg-raised px-3 py-2 text-sm text-ink">
                        {d}
                      </li>
                    ))}
                  </ul>
                </Block>
                <Block title="Skills demonstrated">
                  <p>{cs.skills.join(" · ")}</p>
                </Block>
                <Block title="Current stage">
                  <p className="border-l-2 border-accent/60 pl-4 text-ink">{cs.stage}</p>
                </Block>
              </div>

              <p className="mt-12 text-xs leading-relaxed text-muted">
                Summarised at a high level for a public portfolio. Confidential details, internal system information
                and company data are intentionally omitted. This site is personal and is not affiliated with or endorsed
                by Mattel.
              </p>
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="grid shrink-0 grid-cols-2 border-t border-line">
          <button
            type="button"
            onClick={() => onIndex((index - 1 + caseStudies.length) % caseStudies.length)}
            className="group flex min-h-[4rem] items-center gap-3 px-5 text-left text-sm text-muted transition-colors hover:bg-raised hover:text-ink sm:px-8"
          >
            <ArrowLeft size={16} aria-hidden className="shrink-0 transition-transform group-hover:-translate-x-0.5" />
            <span className="line-clamp-1">
              <span className="sr-only">Previous case study: </span>
              {prev.shortTitle}
            </span>
          </button>
          <button
            type="button"
            onClick={() => onIndex((index + 1) % caseStudies.length)}
            className="group flex min-h-[4rem] items-center justify-end gap-3 border-l border-line px-5 text-right text-sm text-muted transition-colors hover:bg-raised hover:text-ink sm:px-8"
          >
            <span className="line-clamp-1">
              <span className="sr-only">Next case study: </span>
              {next.shortTitle}
            </span>
            <ArrowRight size={16} aria-hidden className="shrink-0 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-3 sm:grid-cols-[11rem_1fr] sm:gap-8">
      <h3 className="eyebrow pt-1">{title}</h3>
      <div className="text-[0.975rem] leading-relaxed text-muted">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((t) => (
        <li key={t} className="flex gap-3">
          <span className="mt-[0.7rem] h-px w-3 shrink-0 bg-accent" aria-hidden />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}
