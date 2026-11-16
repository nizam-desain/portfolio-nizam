import { about, sections } from "@/data/content";
import { Section } from "@/components/ui/section";
import { InView } from "@/components/ui/in-view";
import { cn, delay } from "@/lib/utils";

export function About() {
  const steps = about.approach;
  return (
    <Section
      id="about"
      label={sections.about.label}
      title={sections.about.title}
      aside={<p className="note max-w-[19rem]">{about.principle}</p>}
    >
      <div className="mt-10 grid gap-x-10 gap-y-12 sm:mt-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="rv text-lead text-ink" style={delay(0.2)}>
            {about.lead}
          </p>
          <div className="mt-7 max-w-measure space-y-5 text-muted">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="rv" style={delay(0.26 + i * 0.06)}>
                {p}
              </p>
            ))}
          </div>
        </div>

        <dl className="title-block rv self-start lg:col-span-4 lg:col-start-9" style={delay(0.32)}>
          {about.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* The approach is a real sequence, so it is drawn as one: four steps on a line. */}
      <InView className="mt-20 sm:mt-24 lg:mt-28">
        <h3 className="subhead rv">{about.approachTitle}</h3>
        <ol className="mt-9 grid max-w-measure lg:max-w-none lg:grid-cols-4 lg:gap-x-8">
          {steps.map((step, i) => {
            const last = i === steps.length - 1;
            return (
              <li key={step.title} className={cn("relative pl-9 lg:pl-0 lg:pt-10", !last && "pb-9 lg:pb-0")}>
                {/* Connector to the next step: vertical on small screens, horizontal on wide ones. */}
                {!last ? (
                  <>
                    <span
                      aria-hidden
                      className="rv-line-y absolute bottom-0 left-[4.75px] top-[0.4rem] w-[1.5px] bg-accent lg:hidden"
                      style={delay(0.15 + i * 0.22)}
                    />
                    <span
                      aria-hidden
                      className="rv-line absolute left-0 top-[4.75px] hidden h-[1.5px] w-[calc(100%+2rem)] bg-accent lg:block"
                      style={delay(0.15 + i * 0.22)}
                    />
                  </>
                ) : null}
                <span
                  aria-hidden
                  className={cn(
                    "pt rv-pop absolute left-0 top-[0.4rem] lg:top-0",
                    last && "pt-end -left-[3px] top-[0.2rem] lg:-top-[3px]",
                  )}
                  style={delay(i * 0.22)}
                />
                <div className="rv" style={delay(0.1 + i * 0.22)}>
                  <p className="font-[650] text-ink">{step.title}</p>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted lg:max-w-[17rem]">{step.detail}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </InView>
    </Section>
  );
}
