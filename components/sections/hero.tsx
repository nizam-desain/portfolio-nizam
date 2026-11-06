"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { profile } from "@/data/content";

const ease = [0.16, 1, 0.3, 1] as const;

function MaskedLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <span className="block animate-mask-up" style={{ animationDelay: `${delay}s` }}>
        {children}
      </span>
    </span>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
    const update = () => setFinePointer(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const interactive = finePointer && !reduce;

  // Pointer-driven tilt & parallax (desktop, fine pointer only).
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 120, damping: 20, mass: 0.6 };
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-5, 5]), spring);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [4, -4]), spring);
  const shiftX = useSpring(useTransform(px, [-0.5, 0.5], [-10, 10]), spring);
  const shiftY = useSpring(useTransform(py, [-0.5, 0.5], [-8, 8]), spring);
  const imgX = useSpring(useTransform(px, [-0.5, 0.5], [8, -8]), spring);
  const imgY = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), spring);
  const glareX = useTransform(px, [-0.5, 0.5], ["20%", "80%"]);
  const glareY = useTransform(py, [-0.5, 0.5], ["15%", "85%"]);
  const glare = useTransform(
    [glareX, glareY],
    ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.35), transparent 55%)`,
  );

  // Scroll: portrait drifts and settles; background arch moves slower.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.96]);
  const archY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 160]);

  const onMove = (e: React.PointerEvent) => {
    if (!interactive || !sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      aria-labelledby="hero-name"
      className="grain relative isolate overflow-hidden pb-20 pt-[calc(var(--header-h)+2.5rem)] sm:pb-24 lg:min-h-[100svh] lg:pb-16 lg:pt-[calc(var(--header-h)+3.5rem)]"
    >
      {/* Background: a slow, oversized arch echoing the portrait frame */}
      <motion.svg
        aria-hidden
        style={{ y: archY }}
        className="pointer-events-none absolute -right-[18vw] top-[8vh] -z-10 h-[120vh] w-[80vw] text-line lg:-right-[6vw]"
        viewBox="0 0 600 900"
        fill="none"
        preserveAspectRatio="xMidYMin meet"
      >
        {[0, 1, 2, 3].map((i) => (
          <motion.path
            key={i}
            d={`M ${60 + i * 50} 900 V ${330 + i * 10} A ${240 - i * 50} ${240 - i * 50} 0 0 1 ${540 - i * 50} ${330 + i * 10} V 900`}
            stroke="currentColor"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.4, delay: 0.3 + i * 0.15, ease }}
          />
        ))}
      </motion.svg>

      <div className="container-page grid gap-10 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-10 lg:gap-y-0">
        {/* Copy — part A: positioning + name */}
        <div className="relative z-10 order-1 lg:order-none lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:self-end">
          <p
            style={{ animationDelay: "0.1s" }}
            className="animate-rise eyebrow flex flex-wrap items-center gap-x-3 gap-y-1"
          >
            {profile.positioning.map((p, i) => (
              <span key={p} className="flex items-center gap-3">
                {i > 0 ? <span className="h-1 w-1 rounded-full bg-accent" aria-hidden /> : null}
                {p}
              </span>
            ))}
          </p>

          <h1 id="hero-name" className="mt-6 font-serif text-display-xl text-ink">
            <MaskedLine delay={0.2}>Nizamuddin</MaskedLine>
            <MaskedLine delay={0.32}>
              <span className="italic text-accent">Zahrani</span>
            </MaskedLine>
          </h1>
        </div>

        {/* Copy — part B: headline, status, actions (below the portrait on small screens) */}
        <div className="relative z-10 order-3 lg:order-none lg:col-span-7 lg:col-start-1 lg:row-start-2">
          <div
            style={{ animationDelay: "0.65s" }}
            className="animate-rise max-w-xl lg:mt-8"
          >
            <p className="font-serif text-[1.65rem] leading-tight text-ink sm:text-[2rem]">{profile.headline}</p>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">{profile.intro}</p>
          </div>

          <div
            style={{ animationDelay: "0.8s" }}
            className="animate-rise mt-8 flex max-w-xl items-start gap-3 border-l-2 border-accent/60 pl-4 text-sm leading-relaxed text-muted"
          >
            <span className="relative mt-1.5 flex h-2 w-2 shrink-0" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-50 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sage" />
            </span>
            <span>
              <span className="font-medium text-ink">Currently</span> — {profile.status}
            </span>
          </div>

          <div
            style={{ animationDelay: "0.95s" }}
            className="animate-rise mt-10 flex flex-wrap gap-3"
          >
            <a href="#work" className="btn-primary group">
              Explore my work
              <ArrowDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden />
            </a>
            <a href={profile.resumeUrl} download className="btn-ghost group">
              <Download size={16} aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5" />
              Download CV
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost group">
              Connect on LinkedIn
              <ArrowUpRight
                size={16}
                aria-hidden
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>

        {/* Portrait — between name and copy on small screens; right column on desktop */}
        <div className="relative order-2 lg:order-none lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:self-center">
          {/* CSS entrance (runs from first paint, before hydration) on a wrapper,
              so it never fights the Framer-driven transforms inside. */}
          <div
            className="animate-rise-slow w-[86%] max-w-[22rem] sm:w-[58%] sm:max-w-[26rem] lg:mx-auto lg:w-full"
            style={{ animationDelay: "0.25s" }}
          >
          <motion.div style={{ y: scrollY, scale: scrollScale }}>
            <motion.div
              animate={reduce ? undefined : { y: [0, -7, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.figure
                style={
                  interactive
                    ? { rotateX, rotateY, x: shiftX, y: shiftY, transformPerspective: 1100 }
                    : undefined
                }
                className="relative"
              >
                <div className="relative aspect-[5/6] overflow-hidden sm:aspect-[4/5] rounded-t-[999px] rounded-b-[1.25rem] bg-surface shadow-lift ring-1 ring-ink/10">
                  <motion.div
                    className="absolute -inset-3"
                    style={interactive ? { x: imgX, y: imgY } : undefined}
                  >
                    <Image
                      src={profile.portrait.src}
                      alt="Portrait of Nizamuddin Zahrani"
                      fill
                      priority
                      quality={90}
                      sizes="(min-width: 1280px) 30rem, (min-width: 1024px) 38vw, (min-width: 640px) 60vw, 80vw"
                      className="object-cover object-[50%_28%]"
                    />
                  </motion.div>
                  {/* soft glare following the pointer */}
                  {interactive ? (
                    <motion.div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                      style={{ background: glare }}
                    />
                  ) : null}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent"
                  />
                </div>
                <figcaption className="mt-4 flex items-center justify-between text-xs text-muted">
                  <span className="font-mono uppercase tracking-[0.16em]">{profile.location}</span>
                  <span className="hidden font-mono uppercase tracking-[0.16em] sm:inline">Portfolio · 2026</span>
                </figcaption>
              </motion.figure>
            </motion.div>
          </motion.div>
          </div>
        </div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs text-muted transition-colors hover:text-ink lg:flex"
      >
        <span className="font-mono uppercase tracking-[0.18em]">Scroll</span>
        <span className="relative block h-8 w-px overflow-hidden bg-line">
          <motion.span
            className="absolute inset-x-0 top-0 h-3 bg-ink"
            animate={reduce ? undefined : { y: [-12, 32] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
