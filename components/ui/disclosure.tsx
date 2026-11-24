"use client";

import { useId, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** An expandable ledger row. Uses a real button with aria-expanded and a labelled region. */
export function Disclosure({
  summary,
  children,
  className,
  invert = false,
  defaultOpen = false,
}: {
  summary: ReactNode;
  children: ReactNode;
  className?: string;
  invert?: boolean;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className={cn("border-b", invert ? "border-ivory/15" : "border-line/15", className)}>
      <button
        type="button"
        id={`${id}-b`}
        aria-expanded={open}
        aria-controls={`${id}-r`}
        onClick={() => setOpen((o) => !o)}
        className="group flex w-full items-start gap-4 py-5 text-left md:py-6"
      >
        <span className="min-w-0 flex-1">{summary}</span>
        <span aria-hidden className="relative mt-2 block h-3.5 w-3.5 shrink-0">
          <span className="absolute left-0 top-1/2 block h-px w-full bg-current" />
          <span
            className={cn(
              "absolute left-1/2 top-0 block h-full w-px bg-current transition-transform duration-slow ease-out",
              open ? "scale-y-0" : "scale-y-100",
            )}
          />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={`${id}-r`}
            role="region"
            aria-labelledby={`${id}-b`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-7">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
