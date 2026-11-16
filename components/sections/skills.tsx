"use client";

import { useState } from "react";
import { coreSkills, evidenceColumns, sections, skillGroups, skillsCopy, type EvidenceKey } from "@/data/content";
import { Section } from "@/components/ui/section";
import { InView } from "@/components/ui/in-view";
import { cn, delay } from "@/lib/utils";

// Each column header leads to the work it stands for.
const columnHref: Record<EvidenceKey, string> = {
  click2eat: "#cs-click2eat",
  "request-approval-workflow": "#cs-request-approval-workflow",
  "hr-portal-requisition": "#cs-hr-portal-requisition",
  academic: "#projects",
};

/**
 * Skills as evidence rather than as a list of badges: the ten core
 * business-analysis skills against the work each was applied in.
 */
export function Skills() {
  const [hot, setHot] = useState<EvidenceKey | null>(null);

  return (
    <Section id="skills" label={sections.skills.label} title={sections.skills.title} intro={sections.skills.intro}>
      <InView className="mt-12 grid gap-x-10 gap-y-8 sm:mt-16 lg:grid-cols-12">
        <p className="note rv self-start lg:col-span-3 lg:col-start-10 lg:row-start-1 lg:mt-[3.25rem]" style={delay(0.15)}>
          {skillsCopy.legend}
        </p>
        <table className="rv w-full border-collapse self-start text-left lg:col-span-9 lg:row-start-1" onMouseLeave={() => setHot(null)}>
          <caption className="sr-only">{skillsCopy.matrixCaption}</caption>
          <thead>
            <tr>
              <th scope="col" className="subhead pb-4 pr-4 align-bottom">
                {skillsCopy.matrixTitle}
              </th>
              {evidenceColumns.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  onMouseEnter={() => setHot(c.key)}
                  className={cn(
                    "w-10 pb-4 align-bottom text-[0.9375rem] font-normal leading-snug transition-colors duration-200 md:w-[17%] md:pr-4",
                    hot === c.key ? "text-ink" : "text-muted",
                  )}
                >
                  <a
                    href={columnHref[c.key]}
                    onFocus={() => setHot(c.key)}
                    onBlur={() => setHot(null)}
                    className="link inline-block decoration-transparent hover:decoration-accent max-md:rotate-180 max-md:whitespace-nowrap max-md:[writing-mode:vertical-rl]"
                  >
                    <span className="md:hidden">{c.short}</span>
                    <span className="hidden md:inline">{c.label}</span>
                  </a>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {coreSkills.map((row) => (
              <tr key={row.skill} className="border-t border-line last:border-b">
                <th scope="row" className="py-3.5 pr-4 font-normal leading-snug text-ink">
                  {row.skill}
                </th>
                {evidenceColumns.map((c) => {
                  const on = row.in.includes(c.key);
                  return (
                    <td
                      key={c.key}
                      onMouseEnter={() => setHot(c.key)}
                      className={cn("py-3.5 transition-colors duration-200", hot === c.key && "bg-ink/[0.045]")}
                    >
                      <span className="flex h-[1.6em] items-center justify-center md:justify-start md:pl-1">
                        {on ? (
                          <span aria-hidden className="pt pt-fill" />
                        ) : (
                          <span aria-hidden className="mx-[4px] h-[3px] w-[3px] rounded-full bg-rule/60" />
                        )}
                      </span>
                      <span className="sr-only">{on ? skillsCopy.applied : skillsCopy.notApplied}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </InView>

      <InView className="mt-16 grid gap-x-10 gap-y-12 sm:mt-20 md:grid-cols-3">
        {skillGroups.map((g, i) => (
          <div key={g.title} className="rv" style={delay(i * 0.08)}>
            <h3 className="subhead">{g.title}</h3>
            <p className="mt-1 text-[0.9375rem] text-muted">{g.description}</p>
            <ul className="mt-4 border-t border-line">
              {g.items.map((item) => (
                <li key={item} className="border-b border-line py-2.5 text-ink">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </InView>
    </Section>
  );
}
