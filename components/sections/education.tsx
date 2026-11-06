import { education } from "@/data/content";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="relative py-24 sm:py-32">
      <div className="container-page">
        <SectionHeader id="education-title" index="08" label="Education" title={<>Education</>} />
        <Reveal className="mt-12">
          <article className="grid gap-8 border-y border-line py-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-sm text-muted">
                {education.period} · {education.location}
              </p>
              <h3 className="mt-3 font-serif text-[2.4rem] leading-none text-ink sm:text-[3rem]">{education.school}</h3>
              <p className="mt-4 max-w-md text-[1.0625rem] leading-relaxed text-ink">{education.program}</p>
            </div>
            <dl className="divide-y divide-line lg:col-span-6 lg:col-start-7">
              {education.details.map((d) => (
                <div key={d.label} className="grid gap-1 py-4 first:pt-0 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="eyebrow pt-1">{d.label}</dt>
                  <dd className="text-[0.975rem] leading-relaxed text-ink">{d.value}</dd>
                </div>
              ))}
            </dl>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
