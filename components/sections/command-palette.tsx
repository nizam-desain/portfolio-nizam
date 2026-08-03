"use client";

import { useEffect, useState, useCallback } from "react";
import { Command } from "cmdk";
import { useTheme } from "next-themes";
import { Search, Sun, Moon, Mail, Download, ArrowRight } from "lucide-react";
import { navLinks, profile } from "@/data/content";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const go = useCallback((href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  if (!open) {
    return (
      <button
          onClick={() => setOpen((open) => !open)}
          aria-label="Open command palette"
          className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 rounded-full border border-line bg-canvas/60 px-4 py-2 text-sm font-medium text-ink backdrop-blur transition-transform hover:scale-105"
          suppressHydrationWarning
        >
        <Search size={13} />
        Search
        <kbd className="ml-1 rounded border border-line px-1.5 py-0.5 font-mono text-[10px]">
          ⌘K
        </kbd>
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 backdrop-blur-sm pt-[15vh] px-4"
      onClick={() => setOpen(false)}
    >
      <Command
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-canvas glass-panel shadow-2xl"
        label="Command palette"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search size={16} className="text-ink-muted" />
          <Command.Input
            autoFocus
            placeholder="Jump to a section, or run a command…"
            className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-ink-muted"
          />
        </div>
        <Command.List className="max-h-80 overflow-y-auto p-2">
          <Command.Empty className="py-6 text-center text-sm text-ink-muted">
            No results found.
          </Command.Empty>
          <Command.Group heading="Navigate" className="px-2 py-1 text-xs text-ink-muted [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2">
            {navLinks.map((link) => (
              <Command.Item
                key={link.href}
                onSelect={() => go(link.href)}
                className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm cursor-pointer aria-selected:bg-white/10"
              >
                <span>{link.label}</span>
                <ArrowRight size={14} className="text-ink-muted" />
              </Command.Item>
            ))}
          </Command.Group>
          <Command.Group heading="Actions" className="px-2 py-1 text-xs text-ink-muted [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2">
            <Command.Item
              onSelect={() => {
                navigator.clipboard.writeText(profile.email);
                setOpen(false);
              }}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm cursor-pointer aria-selected:bg-white/10"
            >
              <Mail size={14} /> Copy email address
            </Command.Item>
            <Command.Item
              onSelect={() => {
                window.open(profile.resumeUrl, "_blank");
                setOpen(false);
              }}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm cursor-pointer aria-selected:bg-white/10"
            >
              <Download size={14} /> Download résumé
            </Command.Item>
            <Command.Item
              onSelect={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm cursor-pointer aria-selected:bg-white/10"
            >
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />} Toggle
              theme
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
