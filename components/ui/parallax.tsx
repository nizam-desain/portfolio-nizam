"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/** Scroll-linked drift, ±range px. Disabled under reduced motion. */
export function Parallax({ children, range = 40, className }: { children: ReactNode; range?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);
  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div style={reduce ? undefined : { y }} className="relative h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
