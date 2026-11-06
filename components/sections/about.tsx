"use client";

import { motion } from "framer-motion";
import { about } from "@/data/content";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative border-t border-line py-24 sm:py-32">
      <div className="container-page">
        <SectionHeader
          id="about-title"
          index="01"
          label="About"
          title={
            <>
              I start with the business, <span className="italic text-accent">then</span> the system.
            </>
          }
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-serif text-[1.6rem] leading-snug text-ink sm:text-[1.9rem]">{about.lead}</p>
            </Reveal>
            <div className="mt-8 space-y-5 text-[1.0625rem] leading-relaxed text-muted">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.05 * i}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <dl className="divide-y divide-line border-y border-line">
              {about.facts.map((f) => (
                <div key={f.label} className="grid grid-cols-[7rem_1fr] gap-4 py-4">
                  <dt className="eyebrow pt-0.5">{f.label}</dt>
                  <dd className="text-sm leading-relaxed text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Working principle — a thematic statement set editorially, not a quotation */}
        <Reveal className="mt-24">
          <figure className="relative grid items-center gap-6 border-y border-line py-12 sm:py-16 lg:grid-cols-12">
            <div aria-hidden className="hidden lg:col-span-2 lg:flex lg:justify-center">
              <svg viewBox="0 0 80 100" className="h-24 w-20 text-accent" fill="none">
                <path d="M6 100 V40 A34 34 0 0 1 74 40 V100" stroke="currentColor" strokeWidth="1" />
                <path d="M18 100 V44 A22 22 0 0 1 62 44 V100" stroke="currentColor" strokeWidth="1" opacity="0.45" />
              </svg>
            </div>
            <div className="lg:col-span-9">
              <figcaption className="eyebrow flex items-center gap-3">
                <span className="h-px w-8 bg-accent" aria-hidden />
                {about.principle.label}
              </figcaption>
              <p className="mt-5 font-serif text-[2rem] leading-[1.08] text-ink sm:text-[2.75rem] lg:text-[3.4rem]">
                Understand the <span className="italic text-accent">problem</span> before designing the solution.
              </p>
            </div>
          </figure>
        </Reveal>

        {/* Approach */}
        <div className="mt-20">
          <Reveal>
            <h3 className="eyebrow">How I approach a problem</h3>
          </Reveal>
          <ol className="relative mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {about.approach.map((step, i) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.8, delay: i * 0.12 }}
                className="group relative bg-paper p-6 transition-colors duration-500 hover:bg-raised sm:p-8"
              >
                <div className="flex items-center gap-3">
                  <span className="font-serif text-4xl italic leading-none text-accent">{i + 1}</span>
                  <motion.span
                    aria-hidden
                    className="h-px flex-1 origin-left bg-line"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
                <p className="mt-6 text-base font-medium text-ink">{step.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.detail}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
