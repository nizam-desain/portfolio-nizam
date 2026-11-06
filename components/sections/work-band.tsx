"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";

/**
 * The page's one deliberate change of register: an inverted band holding the
 * bridge marquee and the professional case studies. As it scrolls in, its
 * top edge opens from an inset, rounded sheet to full width (clip-path only —
 * no pinning, no scroll hijacking). Static under reduced motion.
 */
export function WorkBand({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 25%"] });
  const maxInset = wide ? 4 : 2.5; // % of width
  const maxRadius = wide ? 40 : 24; // px
  const clipPath = useTransform(scrollYProgress, (p) => {
    const t = reduce ? 1 : Math.min(1, Math.max(0, p));
    const inset = (maxInset * (1 - t)).toFixed(2);
    const radius = (maxRadius * (1 - t)).toFixed(1);
    return `inset(0 ${inset}% 0 ${inset}% round ${radius}px ${radius}px 0 0)`;
  });

  return (
    <motion.div ref={ref} style={{ clipPath }} className="band-invert textured relative bg-paper text-ink">
      {children}
    </motion.div>
  );
}
