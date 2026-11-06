"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { caseStudies, type CaseStudy } from "@/data/content";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { useDialog } from "@/components/ui/use-dialog";
import { CaseDiagram, diagramRatio } from "@/components/sections/diagrams";
import { cn } from "@/lib/utils";

/* One tone per project — different, but from the same family. */
const tone: Record<CaseStudy["diagram"], string> = {
  process: "var(--accent)",
  approval: "var(--sage)",
  requisition: "var(--slate)",
};
const toneStyle = (cs: CaseStudy) => ({ "--tone": tone[cs.diagram] }) as CSSProperties;

function StatusPill({ cs }: { cs: CaseStudy }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium",
        cs.statusTone === "ongoing" ? "bg-accent/10 text-accent" : "bg-sage/[0.08] text-sage",
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          cs.statusTone === "ongoing" ? "animate-pulse bg-accent motion-reduce:animate-none" : "bg-sage",
        )}
        aria-hidden
      />
      {cs.status}
    </span>
  );
}

/** Framed, toned cover for a case study's illustrative diagram. */
function Cover({ cs, className, interactive = true }: { cs: CaseStudy; className?: string; interactive?: boolean }) {
  const wide = cs.diagram === "process";
  return (
    <div
      style={toneStyle(cs)}
      className={cn("relative overflow-hidden rounded-xl border border-line bg-surface", className)}
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-[rgb(var(--tone))]" />
      <div className="flex items-center justify-between gap-4 px-4 pb-2 pt-4 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted sm:px-5">
        <span>
          Fig. {cs.index} — <span className="text-[rgb(var(--tone))]">{cs.shortTitle}</span>
        </span>
        <span className="hidden sm:inline">Illustrative · not a system screenshot</span>
      </div>
      {/* The wide blueprint keeps a legible minimum width on phones and scrolls sideways there. */}
      <div
        className={cn("px-3 pb-4 sm:px-5 sm:pb-5", wide && "overflow-x-auto overscroll-x-contain md:overflow-visible")}
        {...(wide ? { tabIndex: 0, role: "region", "aria-label": `${cs.shortTitle} diagram (scrolls sideways on small screens)` } : {})}
      >
        <div
          className={cn(
            "w-full",
            wide && "min-w-[36rem] md:min-w-0",
            interactive && "transition-transform duration-700 ease-editorial group-hover:scale-[1.025]",
          )}
          style={{ aspectRatio: diagramRatio[cs.diagram] }}
        >
          <CaseDiagram kind={cs.diagram} />
        </div>
      </div>
      {wide ? (
        <p aria-hidden className="-mt-2 px-4 pb-3 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted md:hidden">
          Swipe to explore →
        </p>
      ) : null}
      <p className="px-4 pb-3 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted sm:hidden">
        Illustrative · not a system screenshot
      </p>
    </div>
  );
}

function OpenButton({ cs, onOpen }: { cs: CaseStudy; onOpen: () => void }) {
  return (
    <button type="button" onClick={onOpen} className="btn-ghost group/btn" aria-haspopup="dialog">
      Read the case study
      <ArrowUpRight
        size={16}
        aria-hidden
        className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
      />
      <span className="sr-only">: {cs.shortTitle}</span>
    </button>
  );
}

function Meta({ cs }: { cs: CaseStudy }) {
  return (
    <dl className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
      <div className="flex gap-2">
        <dt className="text-muted">Organisation</dt>
        <dd className="text-ink">{cs.organization}</dd>
      </div>
      <div className="flex gap-2">
        <dt className="text-muted">Role</dt>
        <dd className="text-ink">{cs.role}</dd>
      </div>
    </dl>
  );
}

export function CaseStudies() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const [lead, ...pair] = caseStudies;

  return (
    <section id="work" aria-labelledby="work-title" className="relative pb-32 pt-16 sm:pb-40 sm:pt-20">
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

        {/* Lead case study — full-width feature */}
        <Reveal className="mt-16">
          <article aria-labelledby={`cs-${lead.slug}`} className="group">
            {/* Spotlight: the one dark feature panel in light mode, for the ongoing lead study */}
            <Cover cs={lead} className="panel-ink shadow-lift" />
            <div className="mt-8 grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-serif text-4xl italic leading-none text-accent">{lead.index}</span>
                  <StatusPill cs={lead} />
                </div>
                <h3 id={`cs-${lead.slug}`} className="mt-5 font-serif text-[2.1rem] leading-[1.05] text-ink sm:text-[2.8rem]">
                  {lead.title}
                </h3>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <Meta cs={lead} />
                <p className="mt-5 text-[1rem] leading-relaxed text-muted">{lead.context}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Skills demonstrated">
                  {lead.skills.slice(0, 4).map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-7">
                  <OpenButton cs={lead} onOpen={() => setOpenIndex(0)} />
                </div>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Asymmetric pair */}
        <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-8">
          {pair.map((cs, k) => (
            <Reveal key={cs.slug} delay={0.08 * k} className={k === 0 ? "lg:col-span-7" : "lg:col-span-5 lg:mt-24"}>
              <article aria-labelledby={`cs-${cs.slug}`} className="group flex h-full flex-col">
                <Cover cs={cs} className="transition-shadow duration-500 group-hover:shadow-lift" />
                <div className="mt-7 flex flex-1 flex-col">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-serif text-3xl italic leading-none" style={{ color: `rgb(${tone[cs.diagram]})` }}>
                      {cs.index}
                    </span>
                    <StatusPill cs={cs} />
                  </div>
                  <h3 id={`cs-${cs.slug}`} className="mt-5 font-serif text-[1.85rem] leading-[1.08] text-ink sm:text-[2.2rem]">
                    {cs.title}
                  </h3>
                  <div className="mt-4">
                    <Meta cs={cs} />
                  </div>
                  <p className="mt-4 text-[0.975rem] leading-relaxed text-muted">{cs.context}</p>
                  <div className="mt-auto pt-7">
                    <OpenButton cs={cs} onOpen={() => setOpenIndex(k + 1)} />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Portalled to <body> so the panel is never clipped by, nor inherits
          the inverted colours of, the Work band. */}
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
    </section>
  );
}

const panelSections = [
  { id: "context", label: "Context" },
  { id: "objective", label: "Objective" },
  { id: "responsibilities", label: "Responsibilities" },
  { id: "approach", label: "Approach" },
  { id: "deliverables", label: "Deliverables" },
  { id: "stage", label: "Stage" },
] as const;

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string>("context");
  const cs = caseStudies[index];
  const prev = caseStudies[(index - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(index + 1) % caseStudies.length];
  const sid = (id: string) => `cs-panel-${cs.slug}-${id}`;

  // Track which block is in view inside the panel's own scroll container.
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    root.scrollTo({ top: 0 });
    setActive("context");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive((e.target as HTMLElement).dataset.section ?? "context");
        });
      },
      { root, rootMargin: "-20% 0px -65% 0px" },
    );
    root.querySelectorAll("[data-section]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [cs.slug]);

  const jump = (id: string) => {
    const el = document.getElementById(sid(id));
    const root = scrollRef.current;
    if (!el || !root) return;
    root.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" });
  };

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
        style={toneStyle(cs)}
        className="textured relative flex h-full w-full max-w-3xl flex-col bg-paper shadow-lift outline-none"
      >
        <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] bg-[rgb(var(--tone))]" />
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

        <div ref={scrollRef} className="relative flex-1 overflow-y-auto overscroll-contain">
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

              <div className="mt-8">
                <Cover cs={cs} interactive={false} />
              </div>

              {/* In-panel section navigation */}
              <nav
                aria-label="Case study sections"
                className="sticky top-0 z-10 -mx-5 mt-10 border-y border-line bg-paper/90 px-5 py-2 backdrop-blur sm:-mx-10 sm:px-10"
              >
                <ul className="flex gap-1 overflow-x-auto">
                  {panelSections.map((p) => (
                    <li key={p.id}>
                      <button
                        type="button"
                        onClick={() => jump(p.id)}
                        aria-current={active === p.id ? "true" : undefined}
                        className={cn(
                          "relative whitespace-nowrap rounded-full px-3 py-1.5 text-xs transition-colors",
                          active === p.id ? "bg-ink text-paper" : "text-muted hover:text-ink",
                        )}
                      >
                        {p.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-10 space-y-10">
                <Block id={sid("context")} section="context" title="Business context">
                  <p>{cs.context}</p>
                </Block>
                <Block id={sid("objective")} section="objective" title="Objective">
                  <p>{cs.objective}</p>
                </Block>
                <Block id={sid("responsibilities")} section="responsibilities" title="My responsibilities">
                  <List items={cs.responsibilities} />
                </Block>
                <Block id={sid("approach")} section="approach" title="Analytical approach">
                  <List items={cs.approach} />
                </Block>
                <Block id={sid("deliverables")} section="deliverables" title="Key deliverables">
                  <ul className="flex flex-wrap gap-2">
                    {cs.deliverables.map((d) => (
                      <li key={d} className="rounded-lg border border-line bg-raised px-3 py-2 text-sm text-ink">
                        {d}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-sm">
                    <span className="eyebrow mr-2">Skills demonstrated</span>
                    {cs.skills.join(" · ")}
                  </p>
                </Block>
                <Block id={sid("stage")} section="stage" title="Current stage">
                  <p className="border-l-2 border-[rgb(var(--tone))] pl-4 text-ink">{cs.stage}</p>
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

function Block({
  id,
  section,
  title,
  children,
}: {
  id: string;
  section: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} data-section={section} className="grid gap-3 sm:grid-cols-[11rem_1fr] sm:gap-8">
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
          <span className="mt-[0.7rem] h-px w-3 shrink-0 bg-[rgb(var(--tone))]" aria-hidden />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}
