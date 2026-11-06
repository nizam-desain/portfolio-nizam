"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Editorial section opener: numbered label, a hairline that draws in,
 * serif heading and optional intro. `numeral` adds an oversized outline
 * index behind the heading — reserved for sections that carry weight.
 */
export function SectionHeader({
  index,
  label,
  title,
  intro,
  id,
  numeral,
  className,
}: {
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  id: string;
  numeral?: boolean;
  className?: string;
}) {
  return (
    <header className={cn("relative grid gap-8 md:grid-cols-12", className)}>
      {numeral ? (
        <span
          aria-hidden
          className="outline-numeral pointer-events-none absolute -top-[7.5rem] right-[14%] hidden select-none font-serif text-[8rem] leading-none md:block lg:-top-[9.5rem] lg:text-[10.5rem]"
        >
          {index}
        </span>
      ) : null}
      <div className="relative md:col-span-12">
        <div className="flex items-center gap-4">
          <motion.span
            className="eyebrow tabular-nums text-accent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {index}
          </motion.span>
          <motion.span
            aria-hidden
            className="h-px flex-1 origin-left bg-line"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 1.2, ease }}
          />
          <span aria-hidden className="h-1.5 w-1.5 rotate-45 border border-accent/70" />
          <span className="eyebrow">{label}</span>
        </div>
      </div>
      <Reveal delay={0.05} className="relative md:col-span-7">
        <h2 id={id} className="font-serif text-display-md text-ink">
          {title}
        </h2>
      </Reveal>
      {intro ? (
        <Reveal delay={0.12} className="relative self-end md:col-span-5">
          <p className="max-w-md text-[0.975rem] leading-relaxed text-muted">{intro}</p>
        </Reveal>
      ) : null}
    </header>
  );
}
