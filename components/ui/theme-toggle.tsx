"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

type DocWithVT = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> };
};

/**
 * Sun ⇄ moon toggle. Click switches light/dark (with a circular reveal
 * from the button where the View Transitions API exists). Right-click or
 * the small "auto" button resets to following the system preference.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const followsSystem = mounted && theme === "system";

  const apply = (next: string, origin?: { x: number; y: number }) => {
    const doc = document as DocWithVT;
    if (!doc.startViewTransition || reduce || !origin) {
      setTheme(next);
      return;
    }
    const r = Math.hypot(
      Math.max(origin.x, innerWidth - origin.x),
      Math.max(origin.y, innerHeight - origin.y),
    );
    const t = doc.startViewTransition(() => {
      document.documentElement.classList.toggle("dark", next === "dark");
      setTheme(next);
    });
    t.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${origin.x}px ${origin.y}px)`, `circle(${r}px at ${origin.x}px ${origin.y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.16, 1, 0.3, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <button
        type="button"
        onClick={(e) => {
          const b = e.currentTarget.getBoundingClientRect();
          apply(isDark ? "light" : "dark", { x: b.left + b.width / 2, y: b.top + b.height / 2 });
        }}
        aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle colour theme"}
        title={mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : undefined}
        className="group relative grid h-11 w-11 place-items-center rounded-full text-ink transition-colors hover:bg-ink/[0.06]"
      >
        <span className="sr-only">Theme</span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.svg
            key={mounted ? (isDark ? "moon" : "sun") : "placeholder"}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden
          >
            {isDark ? (
              <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />
            ) : (
              <>
                <circle cx="12" cy="12" r="4.2" />
                <g className="transition-transform duration-500 ease-editorial group-hover:rotate-45" style={{ transformOrigin: "12px 12px" }}>
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                    <line key={a} x1="12" y1="2.6" x2="12" y2="4.6" transform={`rotate(${a} 12 12)`} />
                  ))}
                </g>
              </>
            )}
          </motion.svg>
        </AnimatePresence>
      </button>
      {mounted && !followsSystem ? (
        <button
          type="button"
          onClick={() => setTheme("system")}
          className="hidden h-11 items-center gap-1 rounded-full px-2 text-[0.6875rem] font-mono uppercase tracking-[0.14em] text-muted transition-colors hover:text-ink sm:flex"
          aria-label="Follow system colour preference"
          title="Follow system preference"
        >
          <Monitor size={13} aria-hidden /> Auto
        </button>
      ) : null}
    </div>
  );
}
