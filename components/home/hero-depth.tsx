"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Gentle pointer parallax for layered hero pieces ([data-depth]). Desktop fine pointer only. */
export function HeroDepth({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ok = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches;
    if (!ok) return;
    let raf = 0;
    const layers = Array.from(el.querySelectorAll<HTMLElement>("[data-depth]"));
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        layers.forEach((l) => {
          const d = Number(l.dataset.depth) || 0;
          l.style.translate = `${(-x * d * 14).toFixed(1)}px ${(-y * d * 12).toFixed(1)}px`;
        });
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return (
    <div ref={ref} className="relative mx-auto max-w-[34rem] [&_[data-depth]]:transition-[translate] [&_[data-depth]]:duration-slow [&_[data-depth]]:ease-out">
      {children}
    </div>
  );
}
