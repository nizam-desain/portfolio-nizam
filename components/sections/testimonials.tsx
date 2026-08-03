import { Quote } from "lucide-react";
import { testimonials } from "@/data/content";
import { Reveal } from "@/components/ui/reveal";

export function Testimonials() {
  return (
    <section className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="eyebrow">Word on the Team</span>
          <h2 className="section-heading mt-4">What it&apos;s like to work together.</h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} index={i} className="card-surface flex flex-col p-7">
              <Quote size={22} className="text-accent-purple/60" />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 border-t border-line pt-4">
                <p className="text-sm font-medium">{t.name}</p>
                <p className="text-xs text-ink-muted">{t.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
