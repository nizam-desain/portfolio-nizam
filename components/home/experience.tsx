import { mattel, earlierRoles } from "@/data/content";
import { SectionMark } from "@/components/ui/section-mark";
import { Disclosure } from "@/components/ui/disclosure";
import { Diamond } from "@/components/ui/glyphs";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative bg-night py-section text-ivory">
      <div className="frame">
        <SectionMark ref_="02" label="Experience" note="Current role first" invert />

        {/* Organisation as a masthead */}
        <div className="mt-14 md:mt-20" data-reveal>
          <p className="meta fade text-sage">{mattel.unit}</p>
          <h2 id="experience-title" className="display mt-4 text-[clamp(3.5rem,1rem+11vw,13rem)] uppercase leading-[0.82] tracking-[-0.03em]">
            <span className="mask"><span>Mattel</span></span>
            <span className="mask flex items-end gap-[0.18em]" style={{ ["--i" as string]: 1 }}>
              <span>Indonesia</span>
            </span>
          </h2>
        </div>

        <div className="grid-12 mt-14 gap-y-12 md:mt-20">
          {/* Sticky dossier */}
          <aside className="col-span-4 md:col-span-4" aria-label="Role summary">
            <div className="md:sticky md:top-[calc(var(--header-h)+2rem)]" data-reveal>
              <dl className="fade divide-y divide-ivory/15 border-y border-ivory/15">
                {[
                  ["Role", mattel.role],
                  ["Period", mattel.period],
                  ["Location", mattel.location],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-4 py-3.5">
                    <dt className="meta text-ivory/50">{k}</dt>
                    <dd className="text-small">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="fade mt-8 text-ivory/80" style={{ ["--i" as string]: 1 }}>
                {mattel.summary}
              </p>
              <ul className="mt-10 grid grid-cols-2 gap-px bg-ivory/15" aria-label="Areas of practice">
                {mattel.practice.map((p, i) => (
                  <li key={p.label} className="fade bg-night p-4" style={{ ["--i" as string]: i + 2 }}>
                    <p className="meta text-sage">{p.label}</p>
                    <p className="mt-2 text-small text-ivory/70">{p.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Responsibilities, set large */}
          <div className="col-span-4 md:col-span-7 md:col-start-6">
            <p className="meta text-ivory/50" data-reveal>
              <span className="fade inline-block">What the work involves</span>
            </p>
            <ol className="mt-6 border-t border-ivory/15">
              {mattel.highlights.map((h, i) => (
                <li key={h} className="grid grid-cols-[2.75rem_1fr] gap-4 border-b border-ivory/15 py-6 md:grid-cols-[4rem_1fr] md:py-8" data-reveal>
                  <span className="meta fade pt-1.5 text-sage">{String(i + 1).padStart(2, "0")}</span>
                  <p className="fade text-[clamp(1.2rem,0.95rem+0.9vw,1.75rem)] leading-[1.25] tracking-[-0.01em]" style={{ ["--i" as string]: 1 }}>
                    {h}
                  </p>
                </li>
              ))}
            </ol>
            <p className="meta mt-6 flex items-center gap-2 text-ivory/50">
              <Diamond size={8} className="text-sage" /> Internal projects are described without system names, people or data.
            </p>

            <div className="mt-24">
              <p className="meta text-ivory/50">Earlier roles</p>
              <div className="mt-4 border-t border-ivory/15">
                {earlierRoles.map((r) => (
                  <Disclosure
                    key={r.id}
                    invert
                    summary={
                      <span className="grid gap-1 md:grid-cols-[1fr_auto] md:items-baseline md:gap-6">
                        <span>
                          <span className="display block text-h3 uppercase">{r.organization}</span>
                          <span className="mt-1 block text-small text-ivory/70">{r.role}</span>
                        </span>
                        <span className="meta text-ivory/50">{r.period} · {r.location}</span>
                      </span>
                    }
                  >
                    <p className="max-w-measure text-ivory/80">{r.summary}</p>
                    <ul className="mt-4 space-y-2 text-small text-ivory/70">
                      {r.highlights.map((h) => (
                        <li key={h} className="flex gap-3">
                          <span aria-hidden className="mt-[0.6em] block h-px w-3 shrink-0 bg-sage" />
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
      </div>
    </section>
  );
}
