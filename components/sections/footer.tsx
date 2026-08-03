"use client";

import { ArrowUp } from "lucide-react";
import { profile } from "@/data/content";

export function Footer() {
  return (
    <footer className="relative border-t border-line py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="font-mono text-xs text-ink-muted">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js & Framer Motion.
        </p>
        <button
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className="inline-flex items-center gap-1.5 text-xs text-ink-muted transition-colors hover:text-ink"
  suppressHydrationWarning
>
          Back to top <ArrowUp size={13} />
        </button>
      </div>
    </footer>
  );
}
