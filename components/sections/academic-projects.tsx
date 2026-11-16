import { ArrowUpRight } from "lucide-react";
import { academicProjects, sections } from "@/data/content";
import { Section } from "@/components/ui/section";
import { InView } from "@/components/ui/in-view";

/** University and competition work, kept apart from the professional case studies. */
export function AcademicProjects() {
  return (
    <Section
      id="projects"
      label={sections.projects.label}
      title={sections.projects.title}
      intro={sections.projects.intro}
    >
      <ul className="mt-12 border-b border-line sm:mt-16">
        {academicProjects.map((p) => (
          <InView as="li" key={p.slug} className="border-t border-line">
            <article
              aria-labelledby={`project-${p.slug}`}
              className="rv grid gap-x-10 gap-y-6 py-8 sm:py-10 lg:grid-cols-12"
            >
              <div className="lg:col-span-5">
                <h3 id={`project-${p.slug}`} className="display text-display-sm text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 text-muted">{p.kind}</p>
                <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 text-[0.9375rem]">
                  <dt className="text-muted">Role</dt>
                  <dd className="text-ink">{p.role}</dd>
                  <dt className="text-muted">Period</dt>
                  <dd className="tabular text-ink">{p.period}</dd>
                </dl>
              </div>
              <div className="max-w-measure lg:col-span-7">
                <p className="text-ink">{p.summary}</p>
                <ul className="mt-4 space-y-2">
                  {p.points.map((pt) => (
                    <li key={pt} className="relative pl-6 text-muted">
                      <span aria-hidden className="absolute left-0 top-[0.8em] h-[1.5px] w-3 bg-accent" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-[0.9375rem] text-faint">{p.tags.join(", ")}</p>
                {p.link ? (
                  <a
                    href={p.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link mt-4 inline-flex min-h-[2.75rem] items-center gap-1.5 font-[650] text-ink"
                  >
                    {p.link.label}
                    <ArrowUpRight size={16} aria-hidden />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                ) : null}
              </div>
            </article>
          </InView>
        ))}
      </ul>
    </Section>
  );
}
