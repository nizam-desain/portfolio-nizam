"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * One IntersectionObserver for the whole site. Any element with
 * [data-reveal] gets data-in="true" the first time it enters the
 * viewport; CSS in globals.css does the rest. Content is visible by
 * default — motion only applies once the inline boot script has added
 * .js-motion to <html>, and never under prefers-reduced-motion.
 */
export function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in='true'])"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => (el.dataset.in = "true"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.in = "true";
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    root.classList.add("motion-ready");
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
