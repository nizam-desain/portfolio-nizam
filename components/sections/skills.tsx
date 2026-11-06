"use client";

import { focusAreas, skillGroups } from "@/data/content";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

export function Skills() {
  const [primary, ...rest] = skillGroups;
  return (
    <section id="skills" aria-labelledby="skills-title" className="textured relative bg-surface py-24 sm:py-32">
      <div className="container-page">
        <SectionHeader
          id="skills-title"
          index="05"
          label="Skills & expertise"
          title={
            <>
              Analysis first, <span className="italic text-accent">tools</span> in service of it.
            </>
          }
          intro="Grouped by how central they are to my work. No percentage bars — the case studies above show how these are applied."
        />

        {/* Focus areas — typographic statement */}
        <Reveal className="mt-16">
          <div className="border-y border-line py-10">
            <p className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-accent" aria-hidden />
              Focus areas
            </p>
            <ul className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2 font-serif text-[1.65rem] leading-tight text-ink sm:text-[2.2rem] lg:text-[2.6rem]">
              {focusAreas.map((f, i) => (
                <li key={f} className="flex items-baseline gap-4">
                  <span className={i % 2 === 1 ? "italic text-accent" : undefined}>{f}</span>
                  {i < focusAreas.length - 1 ? (
                    <span aria-hidden className="text-line">
                      /
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Groups dim around the one being explored (hover / focus, desktop) */}
        <div className="group/skills mt-12 grid gap-6 lg:grid-cols-12">
          <Reveal className="transition-opacity duration-500 lg:col-span-6 lg:group-hover/skills:opacity-60 lg:hover:!opacity-100 lg:group-focus-within/skills:opacity-60 lg:focus-within:!opacity-100">
            <div className="h-full rounded-2xl border border-line bg-raised p-7 sm:p-10">
              <GroupHead tier={primary.tier} title={primary.title} description={primary.description} large />
              <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
                {primary.items.map((s, i) => (
                  <li
                    key={s}
                    className="group flex items-baseline gap-3 border-t border-line py-3.5 text-[1.0625rem] text-ink"
                  >
                    <span className="font-mono text-[0.65rem] tabular-nums text-muted transition-colors group-hover:text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="transition-transform duration-500 ease-editorial group-hover:translate-x-1">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="grid gap-6 lg:col-span-6">
            {rest.map((g, gi) => (
              <Reveal
                key={g.title}
                delay={0.08 * (gi + 1)}
                className="transition-opacity duration-500 lg:group-hover/skills:opacity-60 lg:hover:!opacity-100 lg:group-focus-within/skills:opacity-60 lg:focus-within:!opacity-100"
              >
                <div className="rounded-2xl border border-line bg-paper p-7 sm:p-8">
                  <GroupHead tier={g.tier} title={g.title} description={g.description} />
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <li
                        key={s}
                        className={cn(
                          "rounded-full border border-line px-3.5 py-1.5 text-sm transition-colors duration-300 hover:border-accent/50 hover:text-ink",
                          gi === 0 ? "text-ink" : "text-muted",
                        )}
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GroupHead({
  tier,
  title,
  description,
  large,
}: {
  tier: string;
  title: string;
  description: string;
  large?: boolean;
}) {
  return (
    <div>
      <p className="eyebrow text-accent">{tier}</p>
      <h3 className={cn("mt-3 font-serif text-ink", large ? "text-[2.4rem] leading-none" : "text-[1.75rem] leading-none")}>
        {title}
      </h3>
      <p className="mt-3 text-sm text-muted">{description}</p>
    </div>
  );
}
