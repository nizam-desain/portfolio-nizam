"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const steps = [
  { label: "Business need", detail: "What people are trying to get done" },
  { label: "Analysis", detail: "Current workflow, rules and constraints" },
  { label: "Functional requirements", detail: "Needs written so they can be built and tested" },
  { label: "Validation", detail: "Scenarios checked against agreed rules" },
];

/**
 * A conceptual, explicitly illustrative strip of how the analytical work in
 * the role flows. It shows the general method — not any company system.
 */
export function AnalysisFlow() {
  return (
    <div className="border-t border-line bg-surface/60 px-7 py-8 sm:px-10">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="eyebrow">How the work flows</p>
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">Conceptual · illustrative</p>
      </div>
      <ol className="relative mt-7 grid gap-6 sm:grid-cols-4 sm:gap-4">
        {/* connecting rule (desktop / tablet) */}
        <motion.span
          aria-hidden
          className="absolute left-[0.4375rem] right-[0.4375rem] top-[0.4375rem] hidden h-px origin-left bg-accent/50 sm:block"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 1.4, ease }}
        />
        {/* connecting rule (mobile, vertical) */}
        <span aria-hidden className="absolute bottom-2 left-[0.4375rem] top-2 w-px bg-accent/40 sm:hidden" />
        {steps.map((s, i) => (
          <motion.li
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.7, delay: 0.25 + i * 0.18, ease }}
            className="relative pl-8 sm:pl-0 sm:pt-8"
          >
            <span
              aria-hidden
              className="absolute left-0 top-0 grid h-[0.9375rem] w-[0.9375rem] place-items-center rounded-full border border-accent bg-raised"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[0.625rem] tabular-nums text-accent">0{i + 1}</span>
            <p className="mt-1 text-[0.95rem] font-medium leading-snug text-ink">{s.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">{s.detail}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
