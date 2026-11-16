"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { profile } from "@/data/content";

/**
 * The portrait, unretouched, in a plain frame with crop marks.
 * Movement is deliberately small: a slow float, a few degrees of tilt and
 * an opposing shift of the image and its crop marks under a fine pointer,
 * and a slight drift as the hero scrolls away. All of it is disabled for
 * touch devices, small screens and reduced-motion users.
 */
export function Portrait() {
  const reduce = useReducedMotion();
  const [fine, setFine] = useState(false);
  const interactive = fine && !reduce;

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 110, damping: 20, mass: 0.7 };
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-4, 4]), spring);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [3, -3]), spring);
  const shiftX = useSpring(useTransform(px, [-0.5, 0.5], [-8, 8]), spring);
  const shiftY = useSpring(useTransform(py, [-0.5, 0.5], [-6, 6]), spring);
  const imgX = useSpring(useTransform(px, [-0.5, 0.5], [9, -9]), spring);
  const imgY = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), spring);
  const markX = useSpring(useTransform(px, [-0.5, 0.5], [7, -7]), spring);
  const markY = useSpring(useTransform(py, [-0.5, 0.5], [5, -5]), spring);
  const glare = useTransform([px, py], ([x, y]: number[]) => {
    const gx = 50 + x * 60;
    const gy = 40 + y * 60;
    return `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.22), transparent 55%)`;
  });

  const { scrollY } = useScroll();
  const drift = useTransform(scrollY, [0, 900], [0, reduce ? 0 : 56]);
  const settle = useTransform(scrollY, [0, 900], [1, reduce ? 1 : 0.975]);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!interactive) {
      px.set(0);
      py.set(0);
      return;
    }
    const onMove = (e: PointerEvent) => {
      if (window.scrollY > window.innerHeight) return;
      px.set(e.clientX / window.innerWidth - 0.5);
      py.set(e.clientY / window.innerHeight - 0.5);
    };
    const onLeave = () => {
      px.set(0);
      py.set(0);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [interactive, px, py]);

  return (
    <figure className="animate-rise" style={{ animationDelay: "0.15s" }}>
      <motion.div style={{ y: drift, scale: settle }} className="relative">
        {/* Crop marks on their own depth plane */}
        <motion.div aria-hidden className="pointer-events-none absolute -inset-3 sm:-inset-4" style={interactive ? { x: markX, y: markY } : undefined}>
          <span className="crop left-0 top-0 border-l border-t" />
          <span className="crop right-0 top-0 border-r border-t" />
          <span className="crop bottom-0 left-0 border-b border-l" />
          <span className="crop bottom-0 right-0 border-b border-r" />
        </motion.div>

        <motion.div
          animate={reduce ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            style={interactive ? { rotateX, rotateY, x: shiftX, y: shiftY, transformPerspective: 1200 } : undefined}
            className="relative aspect-[4/5] overflow-hidden rounded-frame bg-surface shadow-lift"
          >
            <motion.div className="absolute -inset-3" style={interactive ? { x: imgX, y: imgY } : undefined}>
              <Image
                src={profile.portrait.src}
                alt="Portrait of Nizamuddin Zahrani"
                fill
                priority
                quality={90}
                sizes="(min-width: 1440px) 34rem, (min-width: 1024px) 38vw, (min-width: 640px) 26rem, 88vw"
                className="object-cover object-[50%_24%]"
              />
            </motion.div>
            {interactive ? (
              <motion.div aria-hidden className="pointer-events-none absolute inset-0 mix-blend-soft-light" style={{ background: glare }} />
            ) : null}
          </motion.div>
        </motion.div>
      </motion.div>
      <figcaption className="mt-5 flex items-baseline justify-between gap-4 font-serif text-[1.0625rem] italic text-muted sm:mt-6">
        <span>{profile.location}</span>
        <span className="tabular">2026</span>
      </figcaption>
    </figure>
  );
}
