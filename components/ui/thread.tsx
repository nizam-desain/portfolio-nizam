"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The thread: the line that leaves the hero as a tangle, straightens, and
 * then runs down the right gutter to the contact section.
 *
 * This component draws the vertical run. It measures where the hero hands
 * the line over (`[data-thread-start]`) and where the page ends it
 * (`[data-thread-end]`), lays a faint track between the two, and inks the
 * track down to a small control that stays near the bottom of the viewport.
 * That control doubles as the scroll cue at the top of the page and as
 * "back to top" everywhere else.
 */
export function Thread() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const penRef = useRef<HTMLAnchorElement>(null);
  const geo = useRef({ top: 0, len: 1, pen: 0 });
  const [box, setBox] = useState<{ top: number; height: number } | null>(null);
  const [atTop, setAtTop] = useState(true);
  const { scrollY } = useScroll();
  const tick = useMotionValue(0);

  // Inked length: from the top of the track to the pen, clamped to the track.
  const scaleY = useTransform([scrollY, tick], ([y]: number[]) => {
    const g = geo.current;
    return Math.max(0, Math.min(1, (y + g.pen - g.top) / g.len));
  });

  useEffect(() => {
    const measure = () => {
      const wrap = wrapRef.current;
      const start = document.querySelector<HTMLElement>("[data-thread-start]");
      const end = document.querySelector<HTMLElement>("[data-thread-end]");
      const pen = penRef.current;
      if (!wrap || !start || !end || !pen) return;
      const parent = wrap.offsetParent as HTMLElement | null;
      if (!parent) return;
      const origin = parent.getBoundingClientRect().top;
      const s = start.getBoundingClientRect();
      const e = end.getBoundingClientRect();
      const p = pen.getBoundingClientRect();
      const top = s.bottom - origin;
      const height = Math.max(1, e.top - s.bottom);
      geo.current = { top: s.bottom + window.scrollY, len: height, pen: p.top + p.height / 2 };
      setBox((prev) => (prev && Math.abs(prev.top - top) < 0.5 && Math.abs(prev.height - height) < 0.5 ? prev : { top, height }));
      tick.set(tick.get() + 1);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    // Fonts and images can move things after first layout.
    document.fonts?.ready.then(measure).catch(() => undefined);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [tick]);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Track and ink, in page coordinates */}
      <div ref={wrapRef} aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 mx-auto h-full max-w-page">
        {box ? (
          <div className="on-thread animate-fade-in bg-line" style={{ top: box.top, height: box.height }}>
            {/* One-time draw after the hero tangle has resolved… */}
            <div className="absolute inset-0 origin-top animate-draw-y" style={{ animationDelay: "2.3s", animationDuration: "1.1s" }}>
              {/* …then scroll keeps the ink level with the pen. */}
              <motion.div className="absolute inset-0 origin-top bg-accent" style={{ scaleY }} />
            </div>
          </div>
        ) : null}
      </div>

      {/* The pen: fixed near the bottom of the viewport, on the thread */}
      <nav
        aria-label="Page scroll"
        className="pointer-events-none fixed inset-x-0 bottom-5 z-40 mx-auto h-7 max-w-page sm:bottom-7 sm:h-10"
      >
        <a
          ref={penRef}
          href={atTop ? "#about" : "#top"}
          aria-label={atTop ? "Scroll to the About section" : "Back to top"}
          title={atTop ? "Scroll down" : "Back to top"}
          className={cn(
            // 28px on phones so it sits inside the narrow gutter; the ::before keeps a 44px touch target.
            "pointer-events-auto absolute top-0 grid h-7 w-7 animate-pop place-items-center rounded-full border-[1.5px] border-accent bg-paper text-accent",
            "right-[calc(var(--spine-r)-0.875rem)] sm:h-10 sm:w-10 sm:right-[calc(var(--spine-r)-1.25rem)]",
            "transition-[background-color,color] duration-200 before:absolute before:-inset-2 before:content-[''] hover:bg-accent hover:text-accent-ink",
          )}
          style={{ animationDelay: "3.1s" }}
        >
          {atTop ? <ArrowDown size={15} aria-hidden /> : <ArrowUp size={15} aria-hidden />}
        </a>
      </nav>
    </>
  );
}
