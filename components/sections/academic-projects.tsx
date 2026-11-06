"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { academicProjects, type AcademicProject } from "@/data/content";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

/* Small original glyphs — abstract hints at each project's subject. */
function Glyph({ slug }: { slug: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.2 } as const;
  if (slug === "blibli-ai-logistics")
    return (
      <svg viewBox="0 0 240 96" className="h-full w-full" aria-hidden>
        <path d="M24 70 C 70 70, 70 26, 120 26 S 170 70, 216 70" {...common} strokeDasharray="4 5" />
        {[24, 120, 216].map((x, i) => (
          <g key={x}>
            <circle cx={x} cy={i === 1 ? 26 : 70} r={9} {...common} className={i === 1 ? "text-accent" : undefined} />
            <circle cx={x} cy={i === 1 ? 26 : 70} r={2.5} fill="currentColor" />
          </g>
        ))}
        <circle cx={168} cy={47} r={13} {...common} />
        <path d="M168 40 V47 L173 50" {...common} />
      </svg>
    );
  if (slug === "amartha-proxyscore")
    return (
      <svg viewBox="0 0 240 96" className="h-full w-full" aria-hidden>
        <path d="M70 80 A50 50 0 0 1 170 80" {...common} />
        <path d="M70 80 A50 50 0 0 1 95 37" {...common} strokeWidth={3} className="text-accent" />
        <path d="M120 80 L146 50" {...common} />
        <circle cx={120} cy={80} r={3} fill="currentColor" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={190 + i * 10} y={80 - [14, 22, 30, 40][i]} width={6} height={[14, 22, 30, 40][i]} fill="currentColor" opacity={0.25 + i * 0.18} />
        ))}
      </svg>
    );
  if (slug === "erp-business-process-analysis")
    return (
      <svg viewBox="0 0 240 96" className="h-full w-full" aria-hidden>
        {[
          [40, 18],
          [140, 18],
          [140, 58],
          [40, 58],
        ].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width={60} height={22} rx={4} {...common} className={i === 0 ? "text-accent" : undefined} />
        ))}
        <path d="M100 29 H138 M170 40 V56 M138 69 H102 M70 56 V42" {...common} />
        <path d="M206 48 h18 M215 39 v18" {...common} opacity={0.5} />
      </svg>
    );
  return (
    <svg viewBox="0 0 240 96" className="h-full w-full" aria-hidden>
      <rect x={96} y={6} width={48} height={84} rx={8} {...common} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={104} y={20 + i * 15} width={8} height={8} rx={2} {...common} className={i === 0 ? "text-accent" : undefined} />
          <path d={`M117 ${24 + i * 15} H136`} {...common} />
        </g>
      ))}
      <path d="M40 48 H84 M156 48 H200" {...common} strokeDasharray="3 4" opacity={0.6} />
    </svg>
  );
}

const layout = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

function ProjectCard({ p, i }: { p: AcademicProject; i: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `proj-${p.slug}`;
  const type = p.slug === "mobile-inventory" ? "Additional technical project" : p.kind.split("·")[0].trim();
  return (
    <article
      aria-labelledby={`${panelId}-title`}
      className="group relative flex h-full flex-col rounded-2xl border border-line bg-raised p-6 transition-[border-color,box-shadow] duration-500 hover:border-ink/20 hover:shadow-soft sm:p-8"
    >
      <div className="relative h-24 overflow-hidden rounded-lg border border-line bg-surface px-4 py-3 text-muted sm:h-28">
        <div className="h-full transition-transform duration-700 ease-editorial group-hover:translate-x-1.5">
          <Glyph slug={p.slug} />
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
        <span className="font-mono tabular-nums text-accent">P—{String(i + 1).padStart(2, "0")}</span>
        <span className="chip">{type}</span>
        <span className="text-muted">{p.period}</span>
      </div>
      <h3 id={`${panelId}-title`} className="mt-4 font-serif text-[1.8rem] leading-[1.08] text-ink sm:text-[2.1rem]">
        {p.title}
      </h3>
      <p className="mt-1 text-sm text-muted">{p.kind.split("·").slice(1).join("·").trim() || p.kind}</p>
      <p className="mt-4 text-[0.975rem] leading-relaxed text-muted">{p.summary}</p>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-6">
              <dl className="text-sm">
                <dt className="eyebrow">Role</dt>
                <dd className="mt-1 text-ink">{p.role}</dd>
              </dl>
              <ul className="mt-4 space-y-2.5">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-[0.95rem] leading-relaxed text-muted">
                    <span className="mt-[0.7rem] h-px w-3 shrink-0 bg-accent" aria-hidden />
                    {pt}
                  </li>
                ))}
              </ul>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Focus">
                {p.tags.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
              {p.link ? (
                <a
                  href={p.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink"
                >
                  {p.link.label}
                  <ArrowUpRight size={14} aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="mt-auto pt-6">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="group/btn inline-flex min-h-[2.75rem] items-center gap-3 text-sm font-medium text-ink"
        >
          <span
            className={cn(
              "grid h-9 w-9 place-items-center rounded-full border border-line transition-all duration-500 ease-editorial group-hover/btn:border-ink/40",
              open && "rotate-45 bg-ink text-paper",
            )}
            aria-hidden
          >
            <Plus size={15} />
          </span>
          {open ? "Hide details" : "Project details"}
          <span className="sr-only">: {p.title}</span>
        </button>
      </div>
    </article>
  );
}

export function AcademicProjects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="relative py-24 sm:py-32">
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

        <ul className="mt-14 grid gap-6 lg:grid-cols-12">
          {academicProjects.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={0.06 * (i % 2)} className={layout[i] ?? "lg:col-span-6"}>
              <ProjectCard p={p} i={i} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
