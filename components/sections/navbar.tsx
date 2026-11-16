"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download } from "lucide-react";
import { navLinks, profile } from "@/data/content";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useDialog } from "@/components/ui/use-dialog";
import { cn } from "@/lib/utils";

// Which navigation entry each page section belongs to.
const sectionToNav: Record<string, string> = {
  top: "",
  about: "about",
  experience: "experience",
  work: "work",
  projects: "work",
  skills: "skills",
  credentials: "credentials",
  honors: "credentials",
  education: "credentials",
  contact: "contact",
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const sheetRef = useDialog<HTMLDivElement>(open, () => setOpen(false));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the entry whose section occupies the middle of the viewport.
  useEffect(() => {
    const sections = Object.keys(sectionToNav)
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(sectionToNav[e.target.id] ?? "");
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-[var(--header-h)] border-b transition-[background-color,border-color] duration-300",
          scrolled || open ? "border-line bg-paper/85 backdrop-blur-md" : "border-transparent",
        )}
      >
        <nav aria-label="Primary" className="container-page flex h-full items-center justify-between gap-4">
          <a href="#top" className="-ml-1 whitespace-nowrap rounded-control px-1 py-2 text-[1.0625rem] font-[650] leading-none text-ink">
            {profile.name}
            <span className="sr-only">, back to top</span>
          </a>

          <ul className="hidden items-center lg:flex">
            {navLinks.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative block px-3.5 py-2.5 text-[0.9375rem] transition-colors duration-200",
                      isActive ? "text-ink" : "text-muted hover:text-ink",
                    )}
                  >
                    {l.label}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-node"
                        aria-hidden
                        className="absolute bottom-0 left-1/2 -ml-[3px] h-1.5 w-1.5 rounded-full bg-accent"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <a
              href={profile.resumeUrl}
              download={profile.resumeFileName}
              className="btn-solid ml-1.5 hidden h-10 min-h-0 px-4 md:inline-flex lg:hidden xl:inline-flex"
            >
              <Download size={15} aria-hidden />
              Download CV
            </a>
            <button
              type="button"
              className="icon-btn -mr-2 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3 w-5" aria-hidden>
                <span
                  className={cn(
                    "absolute left-0 top-0 h-[1.5px] w-5 bg-current transition-transform duration-300 ease-draft",
                    open && "translate-y-[5.25px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-[1.5px] w-5 bg-current transition-transform duration-300 ease-draft",
                    open && "-translate-y-[5.25px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[var(--header-h)] z-40 overflow-y-auto bg-paper lg:hidden"
          >
            <div className="flex min-h-full flex-col justify-between px-[var(--pad-l)] pb-10 pt-9">
              {/* The menu is the page's route: a line with a stop for each section. */}
              <ol className="relative ml-1.5">
                <motion.span
                  aria-hidden
                  className="absolute bottom-7 left-0 top-7 w-[1.5px] origin-top bg-accent"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                />
                {navLinks.map((l, i) => {
                  const last = i === navLinks.length - 1;
                  return (
                    <motion.li
                      key={l.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i + 0.08, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                      className="relative"
                    >
                      <span
                        aria-hidden
                        className={cn("pt absolute top-1/2", last ? "pt-end -left-[7.75px] -mt-[8.5px]" : "-left-[4.75px] -mt-[5.5px]")}
                      />
                      <a
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="display block py-3 pl-8 text-[2.25rem] leading-none text-ink"
                      >
                        {l.label}
                      </a>
                    </motion.li>
                  );
                })}
              </ol>
              <div className="mt-12 flex flex-col gap-3">
                <a href={profile.resumeUrl} download={profile.resumeFileName} className="btn-solid w-full" onClick={() => setOpen(false)}>
                  <Download size={16} aria-hidden />
                  Download CV
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-line w-full">
                  LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                </a>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="sr-only focus:not-sr-only focus:mt-1 focus:rounded-control focus:px-4 focus:py-3 focus:text-ink"
                >
                  Close menu
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
