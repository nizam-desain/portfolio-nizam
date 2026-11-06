"use client";

import { AnimatePresence, motion, useScroll } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

/** Appears after the hero; the ring shows how far down the page you are. */
export function BackToTop() {
  const [show, setShow] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 1.2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.a
          href="#top"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="group fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full border border-line bg-raised/90 text-ink shadow-soft backdrop-blur transition-colors hover:border-ink/30 sm:bottom-8 sm:right-8"
          aria-label="Back to top"
        >
          <svg viewBox="0 0 48 48" className="absolute inset-0 -rotate-90" aria-hidden>
            <motion.circle
              cx="24"
              cy="24"
              r="22.5"
              fill="none"
              stroke="rgb(var(--accent))"
              strokeWidth="1.5"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          <ArrowUp size={16} aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}
