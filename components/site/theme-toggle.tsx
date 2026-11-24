"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type DocVT = Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };

/** Typographic two-state switch. Changes theme with a top-down wipe where View Transitions exist. */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";

  const apply = (next: "light" | "dark") => {
    const doc = document as DocVT;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!doc.startViewTransition || reduce) return setTheme(next);
    const t = doc.startViewTransition(() => {
      document.documentElement.classList.toggle("dark", next === "dark");
      setTheme(next);
    });
    t.ready.then(() => {
      document.documentElement.animate(
        { clipPath: ["inset(0 0 100% 0)", "inset(0 0 0 0)"] },
        { duration: 700, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  };

  return (
    <button
      type="button"
      onClick={() => apply(dark ? "light" : "dark")}
      role="switch"
      aria-checked={dark}
      className={cn("meta group relative flex h-11 items-center gap-2 px-1", className)}
    >
      <span className={cn("transition-colors duration-base", dark ? "text-stone" : "")}>
        Light
      </span>
      <span aria-hidden className="relative block h-[9px] w-[22px] border border-current">
        <span
          className={cn(
            "absolute top-[1px] block h-[5px] w-[8px] bg-current transition-[left] duration-slow ease-out",
            dark ? "left-[11px]" : "left-[1px]",
          )}
        />
      </span>
      <span className={cn("transition-colors duration-base", dark ? "" : "text-stone")}>
        Dark
      </span>
      <span className="sr-only"> theme</span>
    </button>
  );
}
