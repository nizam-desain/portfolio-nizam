"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type DocWithVT = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> };
};

/**
 * Switches the theme. Where the View Transitions API exists the new theme
 * is plotted across the page from left to right, like a sheet coming off a
 * plotter; elsewhere (and under reduced motion) it swaps instantly.
 */
function useApplyTheme() {
  const { setTheme } = useTheme();
  const reduce = useReducedMotion();

  return (next: "light" | "dark" | "system") => {
    const doc = document as DocWithVT;
    const resolved =
      next === "system" ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : next;
    const current = document.documentElement.classList.contains("dark") ? "dark" : "light";
    if (!doc.startViewTransition || reduce || resolved === current) {
      setTheme(next);
      return;
    }
    const t = doc.startViewTransition(() => {
      document.documentElement.classList.toggle("dark", resolved === "dark");
      setTheme(next);
    });
    t.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: ["inset(0 100% 0 0)", "inset(0 0 0 0)"] },
          { duration: 700, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => undefined);
  };
}

/** Sun ⇄ moon button for the header. */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme();
  const apply = useApplyTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const label = mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Switch color theme";

  return (
    <button
      type="button"
      onClick={() => apply(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className={cn("icon-btn group", className)}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.svg
          key={mounted ? (isDark ? "moon" : "sun") : "placeholder"}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 0, rotate: -70, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 70, scale: 0.6 }}
          transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          aria-hidden
        >
          {isDark ? (
            <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />
          ) : (
            <>
              <circle cx="12" cy="12" r="4" />
              <g
                className="transition-transform duration-500 ease-draft group-hover:rotate-45"
                style={{ transformOrigin: "12px 12px" }}
              >
                {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                  <line key={a} x1="12" y1="2.5" x2="12" y2="4.7" transform={`rotate(${a} 12 12)`} />
                ))}
              </g>
            </>
          )}
        </motion.svg>
      </AnimatePresence>
    </button>
  );
}

const choices = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
] as const;

/** Full three-way control (light, dark, follow the system) for the footer. */
export function ThemeChoice() {
  const { theme } = useTheme();
  const apply = useApplyTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const current = mounted ? theme : undefined;

  return (
    <div role="radiogroup" aria-label="Color theme" className="inline-flex self-start rounded-control border border-rule p-0.5 sm:self-auto">
      {choices.map((c) => {
        const active = current === c.value;
        return (
          <button
            key={c.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => apply(c.value)}
            className={cn(
              "min-h-[2.25rem] rounded-[4px] px-3 text-sm transition-colors duration-200",
              active ? "bg-ink text-paper" : "text-muted hover:text-ink",
            )}
          >
            {c.label}
          </button>
        );
      })}
    </div>
  );
}
