"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn, delay } from "@/lib/utils";

/** Where the travelling end of the thread sits, as a fraction of the viewport height. */
export const PEN_LINE = 0.92;

/**
 * A page section. Its top rule runs from the text edge out to the thread in
 * the right gutter and ends in a node, so the rule is both the section break
 * and the branch that ties the section to the thread. The node fills once the
 * travelling end of the thread has passed it.
 *
 * With `sheet`, everything below the rule sits on the blueprint sheet.
 */
export function Section({
  id,
  label,
  title,
  intro,
  aside,
  end = false,
  sheet = false,
  className,
  children,
}: {
  id: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Optional remark or table set beside the heading on wide screens. */
  aside?: ReactNode;
  /** Draw the node as an end event (the thread stops here). */
  end?: boolean;
  sheet?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const rule = ruleRef.current;
    if (!el || !rule) return;
    if (!("IntersectionObserver" in window)) {
      el.setAttribute("data-in", "");
      el.setAttribute("data-passed", "");
      return;
    }
    // Reveal once.
    const reveal = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-in", "");
          reveal.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
    );
    reveal.observe(el);
    // Fill the node while the rule is above the travelling end of the thread.
    const passed = new IntersectionObserver(
      ([entry]) => {
        const above = entry.isIntersecting || entry.boundingClientRect.top < 0;
        el.toggleAttribute("data-passed", above);
      },
      { rootMargin: `0px 0px -${Math.round((1 - PEN_LINE) * 100)}% 0px`, threshold: 0 },
    );
    passed.observe(rule);
    return () => {
      reveal.disconnect();
      passed.disconnect();
    };
  }, []);

  const header = (
    <header className={cn("grid gap-x-10 gap-y-8 lg:grid-cols-12", sheet ? "pt-8 sm:pt-10 lg:pt-12" : "pt-5 sm:pt-6")}>
      <div className={aside ? "lg:col-span-7" : "lg:col-span-10"}>
        <p className="label rv">{label}</p>
        <h2 id={`${id}-title`} className="display rv mt-7 max-w-[20ch] text-display-lg text-ink sm:mt-9" style={delay(0.08)}>
          {title}
        </h2>
        {intro ? (
          <p className="rv mt-6 max-w-measure text-lead text-muted sm:mt-7" style={delay(0.16)}>
            {intro}
          </p>
        ) : null}
      </div>
      {aside ? (
        <div className="rv lg:col-span-4 lg:col-start-9 lg:pt-[4.5rem]" style={delay(0.24)}>
          {aside}
        </div>
      ) : null}
    </header>
  );

  return (
    <section
      ref={ref}
      id={id}
      data-inview=""
      aria-labelledby={`${id}-title`}
      className={cn("relative pb-24 sm:pb-28 lg:pb-36", className)}
    >
      <div className="container-page">
        <div ref={ruleRef} className="rule" aria-hidden {...(end ? { "data-thread-end": "" } : {})}>
          <span className="rule-line rv-line" />
          <span className={cn("node rv-node", end && "node-end")} />
        </div>
        {sheet ? (
          <div className="sheet sheet-panel grid-paper mt-6 rounded-frame pb-10 shadow-sheet max-sm:rounded-l-none sm:mt-8 sm:pb-12 lg:pb-16">
            {header}
            {children}
          </div>
        ) : (
          <>
            {header}
            {children}
          </>
        )}
      </div>
    </section>
  );
}
