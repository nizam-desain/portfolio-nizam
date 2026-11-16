import { education, sections } from "@/data/content";
import { Section } from "@/components/ui/section";
import { delay } from "@/lib/utils";

export function Education() {
  return (
    <Section id="education" label={sections.education.label} title={education.school}>
      <div className="mt-8 grid gap-x-10 gap-y-9 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="rv max-w-measure text-lead text-ink" style={delay(0.16)}>
            {education.program}
          </p>
          <p className="rv tabular mt-3 text-muted" style={delay(0.2)}>
            {education.period}, {education.location}
          </p>
        </div>
        <dl className="title-block rv self-start lg:col-span-5" style={delay(0.26)}>
          {education.details.map((d) => (
            <div key={d.label}>
              <dt>{d.label}</dt>
              <dd>{d.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
