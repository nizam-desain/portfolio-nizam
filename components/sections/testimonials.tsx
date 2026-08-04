"use client";

import { Quote } from "lucide-react";
import { testimonials } from "@/data/content";
import { Reveal } from "@/components/ui/reveal";

export function Testimonials() {
  // Ini jurus maut biar Vercel nggak error kalau data testimoninya masih kosong
  const dataTestimoni = testimonials as any[];

  // Kalau datanya kosong, section ini disembunyikan sekalian biar rapi
  if (!dataTestimoni || dataTestimoni.length === 0) {
    return null; 
  }

  return (
    <section id="testimonials" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="eyebrow">Testimonials</span>
          <h2 className="section-heading mt-4">What people say.</h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {dataTestimoni.map((t, i) => (
            <Reveal key={t.name || i} index={i} className="card-surface flex flex-col p-7">
              <Quote size={22} className="text-accent-purple/60" />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6">
                <h4 className="text-sm font-semibold">{t.name}</h4>
                <p className="text-xs text-ink-muted">{t.company || t.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}