import Image from "next/image";
import { mattel, earlierRoles } from "@/data/content";
import { Disclosure } from "@/components/ui/disclosure";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="band-night relative overflow-hidden py-section">
      {/* atmospheric image */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] lg:block">
        <Image src="/art/arches-night.jpg" alt="" fill sizes="55vw" className="object-cover opacity-70 [mask-image:linear-gradient(90deg,transparent,black_45%)]" />
      </div>

      <div className="frame relative">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow fade text-teal">Experience · {mattel.period}</p>
          <h2 id="experience-title" className="display mt-4 text-mega">
            <span className="mask"><span>Mattel Indonesia</span></span>
          </h2>
          <p className="fade mt-5 text-lead text-ivory/80" style={{ ["--i" as string]: 1 }}>
            {mattel.role} · {mattel.unit}
          </p>
          <p className="fade mt-4 max-w-xl text-ivory/70" style={{ ["--i" as string]: 2 }}>
            {mattel.summary}
          </p>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:w-[62%]" aria-label="Areas of practice">
          {mattel.practice.map((p, i) => (
            <li
              key={p.label}
              className="fade rounded-[20px] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-md transition-colors duration-slow hover:bg-white/[0.1]"
              style={{ ["--i" as string]: i }}
              data-reveal
            >
              <p className="text-small font-semibold text-teal">{String(i + 1).padStart(2, "0")} · {p.label}</p>
              <p className="mt-2 text-ivory/80">{p.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div data-reveal>
            <h3 className="display fade text-h3">What the work involves</h3>
            <ol className="mt-5 space-y-3">
              {mattel.highlights.map((h, i) => (
                <li key={h} className="fade flex gap-4 text-ivory/85" style={{ ["--i" as string]: i }}>
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/10 text-[0.75rem] font-semibold text-lav">
                    {i + 1}
                  </span>
                  {h}
                </li>
              ))}
            </ol>
            <p className="mt-6 text-small text-ivory/55">Internal projects are described without system names, people or data.</p>
          </div>
          <div data-reveal>
            <h3 className="display fade text-h3">Earlier roles</h3>
            <div className="mt-3 border-t border-white/15">
              {earlierRoles.map((r) => (
                <Disclosure
                  key={r.id}
                  invert
                  summary={
                    <span className="grid gap-1">
                      <span className="text-lead font-semibold">{r.organization}</span>
                      <span className="text-small text-ivory/65">{r.role} · {r.period} · {r.location}</span>
                    </span>
                  }
                >
                  <p className="max-w-measure text-ivory/80">{r.summary}</p>
                  <ul className="mt-3 space-y-1.5 text-small text-ivory/70">
                    {r.highlights.map((h) => (
                      <li key={h} className="flex gap-3">
                        <span aria-hidden className="mt-[0.6em] block h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </Disclosure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
