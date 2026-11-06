"use client";

import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    // next-themes injects a blocking script so the correct theme is applied
    // before first paint (no flash), persists the choice in localStorage,
    // and follows the OS preference when set to "system".
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="nz-theme">
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}
