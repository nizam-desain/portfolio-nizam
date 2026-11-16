"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { caseStudies, sections, workNotes, type CaseStudy } from "@/data/content";
import { Section } from "@/components/ui/section";
import { InView } from "@/components/ui/in-view";
import { useDialog } from "@/components/ui/use-dialog";
import { CaseDiagram } from "@/components/sections/diagrams";
import { cn, delay } from "@/lib/utils";

/** Open point while the work is running, filled once it is done: the same code the thread uses. */
function Status({ cs }: { cs: CaseStudy }) {
  const ongoing = cs.statusTone === "ongoing";
  return (
    <p className="flex items-center gap-2.5 text-[0.9375rem] text-ink">
      <span className="relative flex h-[11px] w-[11px] shrink-0" aria-hidden>
        {ongoing ? (
          <span className="absolute inset-0 animate-ping rounded-full border border-accent motion-reduce:hidden" />
        ) : null}
        <span className={cn("pt", !ongoing && "pt-fill")} />
      </span>
      {cs.status}
    </p>
  );
}

function Plate({ cs, instant = false }: { cs: CaseStudy; instant?: boolean }) {
  return (
    <figure>
      <div className="sheet grid-paper rounded-frame border border-line px-4 py-5 sm:px-6 sm:py-6">
        <CaseDiagram kind={cs.diagram} instant={instant} />
      </div>
      <figcaption className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
        {cs.diagramCaption} {workNotes.diagramNote}
      </figcaption>
    </figure>
  );
}

function Entry({ cs, lead = false, onOpen }: { cs: CaseStudy; lead?: boolean; onOpen: () => void }) {
  return (
    <div>
      <Status cs={cs} />
      <h3 id={`cs-${cs.slug}`} className={cn("display mt-4 text-ink", lead ? "text-display-md" : "text-display-sm")}>
        {cs.title}
      </h3>
      <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 text-[0.9375rem]">
        <dt className="text-muted">Role</dt>
        <dd className="text-ink">{cs.role}</dd>
        <dt className="text-muted">Period</dt>
        <dd className="tabular text-ink">{cs.period}</dd>
      </dl>
      <p className="mt-5 max-w-measure text-muted">{cs.context}</p>
      <button type="button" onClick={onOpen} className="btn-line mt-7" aria-haspopup="dialog">
        Read the case study
        <span className="sr-only">: {cs.shortTitle}</span>
      </button>
    </div>
  );
}

export function CaseStudies() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const [lead, ...pair] = caseStudies;

  return (
    <Section
      id="work"
      sheet
      label={sections.work.label}
      title={sections.work.title}
      intro={sections.work.intro}
      aside={
        <dl className="title-block">
          {workNotes.titleBlock.map((row) => (
            <div key={row.label}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      }
    >
      {/* The ongoing study leads. */}
      <InView
        as="article"
        aria-labelledby={`cs-${lead.slug}`}
        className="mt-12 grid items-start gap-x-10 gap-y-8 border-t border-line pt-10 lg:mt-16 lg:grid-cols-12 lg:pt-12"
      >
        <div className="rv lg:col-span-7">
          <Plate cs={lead} />
        </div>
        <div className="rv lg:col-span-5" style={delay(0.12)}>
          <Entry cs={lead} lead onOpen={() => setOpenIndex(0)} />
        </div>
      </InView>

      {/* The two completed studies sit side by side. */}
      <div className="mt-12 grid gap-x-10 gap-y-14 border-t border-line pt-10 md:grid-cols-2 lg:mt-16 lg:pt-12">
        {pair.map((cs, k) => (
          <InView as="article" key={cs.slug} aria-labelledby={`cs-${cs.slug}`}>
            <div className="rv" style={delay(k * 0.1)}>
              <Plate cs={cs} />
            </div>
            <div className="rv mt-8" style={delay(0.12 + k * 0.1)}>
              <Entry cs={cs} onOpen={() => setOpenIndex(k + 1)} />
            </div>
          </InView>
        ))}
      </div>

      {/* Portalled to <body> so the panel takes the page's colours, not the sheet's. */}
      {mounted
        ? createPortal(
            <AnimatePresence>
              {openIndex !== null ? (
                <CaseDialog key="case-dialog" index={openIndex} onIndex={setOpenIndex} onClose={() => setOpenIndex(null)} />
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </Section>
  );
}

function CaseDialog({ index, onIndex, onClose }: { index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const ref = useDialog<HTMLDivElement>(true, onClose);
  const scrollRef = useRef<HTMLDivElement>(null);
  const count = caseStudies.length;
  const cs = caseStudies[index];
  const prev = caseStudies[(index - 1 + count) % count];
  const next = caseStudies[(index + 1) % count];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [index]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="absolute inset-0 bg-[rgb(var(--shadow)/0.55)]" onClick={onClose} aria-hidden />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-dialog-title"
        tabIndex={-1}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative flex h-full w-full max-w-[46rem] flex-col bg-paper shadow-sheet outline-none"
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5 sm:px-9">
          <p className="tabular text-[0.9375rem] text-muted" aria-live="polite">
            Case study {index + 1} of {count}
          </p>
          <button type="button" onClick={onClose} data-autofocus className="icon-btn -mr-2.5" aria-label="Close case study">
            <X size={20} aria-hidden />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain">
          <article key={cs.slug} className="animate-fade-in px-5 pb-12 pt-8 sm:px-9 sm:pt-10">
            <Status cs={cs} />
            <h2 id="case-dialog-title" className="display mt-4 text-display-md text-ink">
              {cs.title}
            </h2>
            <dl className="title-block mt-8">
              {[
                ["Organization", cs.organization],
                ["Role", cs.role],
                ["Period", cs.period],
                ["Status", cs.status],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              <Plate cs={cs} instant />
            </div>

            <div className="mt-10 space-y-8">
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
                <List items={cs.deliverables} columns />
              </Block>
              <Block title="Skills demonstrated">
                <List items={cs.skills} columns />
              </Block>
              <Block title={cs.statusTone === "ongoing" ? "Current stage" : "Outcome"}>
                <p className="text-ink">{cs.stage}</p>
              </Block>
            </div>

            <p className="note mt-12">{workNotes.disclaimer}</p>
          </article>
        </div>

        <div className="grid shrink-0 grid-cols-2 border-t border-line">
          <button
            type="button"
            onClick={() => onIndex((index - 1 + count) % count)}
            className="group flex min-h-[4rem] items-center gap-3 px-5 text-left text-[0.9375rem] text-muted transition-colors duration-200 hover:bg-ink/[0.04] hover:text-ink sm:px-9"
          >
            <ArrowLeft size={16} aria-hidden className="shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span className="line-clamp-1">
              <span className="sr-only">Previous case study: </span>
              {prev.shortTitle}
            </span>
          </button>
          <button
            type="button"
            onClick={() => onIndex((index + 1) % count)}
            className="group flex min-h-[4rem] items-center justify-end gap-3 border-l border-line px-5 text-right text-[0.9375rem] text-muted transition-colors duration-200 hover:bg-ink/[0.04] hover:text-ink sm:px-9"
          >
            <span className="line-clamp-1">
              <span className="sr-only">Next case study: </span>
              {next.shortTitle}
            </span>
            <ArrowRight size={16} aria-hidden className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-2 border-t border-line pt-5 sm:grid-cols-[11rem_1fr] sm:gap-8">
      <h3 className="text-[0.9375rem] font-[650] leading-relaxed text-ink">{title}</h3>
      <div className="text-muted">{children}</div>
    </section>
  );
}

function List({ items, columns = false }: { items: string[]; columns?: boolean }) {
  return (
    <ul className={cn("space-y-2", columns && "sm:columns-2 sm:gap-x-8")}>
      {items.map((t) => (
        <li key={t} className="relative break-inside-avoid pl-6">
          <span aria-hidden className="absolute left-0 top-[0.8em] h-[1.5px] w-3 bg-accent" />
          {t}
        </li>
      ))}
    </ul>
  );
}
