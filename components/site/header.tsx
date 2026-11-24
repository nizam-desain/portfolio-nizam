"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile, sections } from "@/data/content";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { Clock } from "@/components/site/clock";
import { useDialog } from "@/components/ui/use-dialog";
import { ArrowOut } from "@/components/ui/glyphs";
import { cn } from "@/lib/utils";

const inline = sections.filter((s) => ["work", "experience", "about", "method", "contact"].includes(s.id));

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // Hide on scroll down, reveal on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 240);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section marker on the home page.
  useEffect(() => {
    if (pathname !== "/") return setActive(null);
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => setOpen(false), [pathname]);

  const href = (id: string) => (pathname === "/" ? `#${id}` : `/#${id}`);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-slow ease-out",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
          scrolled ? "bg-paper/75 shadow-[0_1px_0_rgb(var(--line)/0.08),0_12px_30px_-20px_rgb(var(--shadow)/0.35)] backdrop-blur-xl" : "",
        )}
      >
        <div className="frame flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" className="group flex items-center gap-3">
            <span aria-hidden className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[rgb(var(--sage-ink))] via-[rgb(var(--lav))] to-[rgb(var(--teal))] text-[0.8rem] font-bold text-white shadow-[0_8px_20px_-10px_rgb(76_84_165/0.7)]">NZ</span>
            <span className="display text-[1.5rem] leading-none">{profile.name}</span>
            <span className="hidden text-small text-stone lg:inline">Business · People · Tech · Design</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 rounded-full bg-card/70 p-1 shadow-[inset_0_0_0_1px_rgb(var(--line)/0.08)] backdrop-blur-md xl:flex">
            {inline.map((s) => (
              <a
                key={s.id}
                href={href(s.id)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-small font-semibold transition-colors duration-base",
                  active === s.id ? "bg-ink text-paper" : "text-stone hover:text-ink",
                )}
                aria-current={active === s.id ? "true" : undefined}
              >
                {s.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4 sm:gap-6">
            <Clock className="hidden text-small font-semibold text-stone 2xl:inline" />
            <ThemeToggle className="hidden sm:flex" />
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex h-11 items-center gap-2.5 rounded-full border border-line/15 bg-card/70 px-4 text-small font-semibold backdrop-blur-md transition-colors hover:border-line/40"
              aria-haspopup="dialog"
              aria-expanded={open}
            >
              <span aria-hidden className="flex flex-col gap-[5px]">
                <span className="block h-px w-5 bg-current" />
                <span className="block h-px w-3.5 bg-current" />
              </span>
              Index
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>{open ? <Menu onClose={() => setOpen(false)} href={href} /> : null}</AnimatePresence>
    </>
  );
}

function Menu({ onClose, href }: { onClose: () => void; href: (id: string) => string }) {
  const ref = useDialog<HTMLDivElement>(true, onClose);
  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Site index"
      className="fixed inset-0 z-[60] band-night flex flex-col overflow-y-auto text-ivory"
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(100% 0 0 0)" }}
      transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
    >
      <div className="frame flex h-[var(--header-h)] shrink-0 items-center justify-between">
        <span className="text-small font-semibold text-ivory/60">Index · {sections.length} sections</span>
        <button type="button" onClick={onClose} className="flex h-11 items-center gap-3 rounded-full border border-white/20 px-4 text-small font-semibold" data-autofocus>
          Close
          <span aria-hidden className="relative block h-3 w-3">
            <span className="absolute left-0 top-1/2 block h-px w-full rotate-45 bg-current" />
            <span className="absolute left-0 top-1/2 block h-px w-full -rotate-45 bg-current" />
          </span>
        </button>
      </div>

      <nav aria-label="Sections" className="frame flex-1 py-6">
        <ol className="border-t border-ivory/15">
          {sections.map((s, i) => (
            <motion.li
              key={s.id}
              className="border-b border-ivory/15"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.045, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href={href(s.id)}
                onClick={onClose}
                className="group grid grid-cols-[3rem_1fr] items-baseline gap-4 py-3 sm:grid-cols-[5rem_1fr_auto] sm:py-4"
              >
                <span className="text-small font-semibold text-teal">{s.ref}</span>
                <span className="display text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.05] transition-[transform,color] duration-slow ease-out group-hover:translate-x-2 group-hover:text-teal">
                  {s.label}
                </span>
                <span aria-hidden className="hidden text-small text-ivory/40 transition-transform duration-slow ease-out group-hover:-translate-x-2 sm:block">
                  §{s.ref}
                </span>
              </a>
            </motion.li>
          ))}
        </ol>
      </nav>

      <div className="frame grid shrink-0 gap-6 border-t border-ivory/15 py-6 sm:grid-cols-3">
        <a href={`mailto:${profile.email}`} className="break-all text-small text-ivory/80 hover:text-ivory">
          {profile.email}
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-small text-ivory/80 hover:text-ivory">
          LinkedIn <ArrowOut size={14} />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
        <div className="flex items-center justify-between gap-4 sm:justify-end">
          <a href={profile.resumeUrl} className="text-small text-ivory/80 hover:text-ivory">
            Résumé (PDF)
          </a>
          <ThemeToggle className="sm:hidden" />
        </div>
      </div>
    </motion.div>
  );
}
