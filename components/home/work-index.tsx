"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import type { Work } from "@/data/content";
import { Cover } from "@/components/work/cover";
import { Evidence } from "@/components/ui/evidence";
import { Arrow } from "@/components/ui/glyphs";

/**
 * Editorial index of further projects. On a fine pointer, a cover plate
 * follows the cursor and swaps per row (the context-sensitive "cursor");
 * the system cursor is never hidden. Touch and keyboard get the plain list.
 */
export function WorkIndex({ items }: { items: Work[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const [fine, setFine] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 30, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 30, mass: 0.6 });
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
    const set = () => setFine(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        if (!fine) return;
        x.set(e.clientX);
        y.set(e.clientY);
      }}
    >
      <ol ref={listRef} onPointerLeave={() => setHover(null)}>
        {items.map((w, i) => (
          <li key={w.slug} className="border-b border-line/15" data-reveal>
            <Link
              href={`/work/${w.slug}`}
              onPointerEnter={() => setHover(i)}
              onFocus={() => setHover(null)}
              className="group grid-12 relative items-baseline gap-y-2 py-6 transition-colors duration-base md:py-8"
            >
              <span className="meta col-span-1 text-oxide md:col-span-1">{w.index}</span>
              <span className="display col-span-3 text-h3 uppercase transition-transform duration-slow ease-out group-hover:translate-x-3 md:col-span-5 md:text-[clamp(1.75rem,1rem+2.2vw,3.25rem)] md:leading-[0.95]">
                {w.title}
              </span>
              <span className="col-span-4 col-start-2 text-small text-stone md:col-span-3 md:col-start-7">
                {w.line}
              </span>
              <span className="col-span-4 col-start-2 flex items-center justify-between gap-4 md:col-span-3 md:col-start-10">
                <span className="flex flex-col gap-1">
                  <span className="meta">{w.kind} · {w.period}</span>
                  <Evidence value={w.evidence} className="text-stone" />
                </span>
                <Arrow className="shrink-0 transition-transform duration-slow ease-out group-hover:translate-x-1.5" />
              </span>
              <span aria-hidden className="absolute bottom-[-1px] left-0 h-px w-0 bg-ink transition-[width] duration-cine ease-out group-hover:w-full" />
            </Link>
          </li>
        ))}
      </ol>

      {fine ? (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-40 w-[22rem]"
          style={{ x: sx, y: sy, translateX: "-50%", translateY: "-115%" }}
        >
          <AnimatePresence mode="popLayout">
            {hover !== null ? (
              <motion.div
                key={items[hover].slug}
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                animate={{ clipPath: "inset(0% 0 0 0)" }}
                exit={{ clipPath: "inset(0 0 100% 0)" }}
                transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
              >
                <Cover motif={items[hover].motif} index={items[hover].index} tone={hover % 2 ? "sheet" : "ink"} className="aspect-[4/3] w-full" label={false} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </div>
  );
}
