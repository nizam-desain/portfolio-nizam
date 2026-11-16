"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, Plus } from "lucide-react";
import {
  education,
  featuredExperience as mattel,
  otherExperience,
  sections,
  timeline,
  type YearMonth,
} from "@/data/content";
import { Section } from "@/components/ui/section";
import { cn, delay } from "@/lib/utils";

// ── Time axis ────────────────────────────────────────────────
const years = Array.from({ length: timeline.endYear - timeline.startYear + 1 }, (_, i) => timeline.startYear + i);
const totalMonths = years.length * 12;
const monthIndex = ([y, m]: YearMonth) => (y - timeline.startYear) * 12 + (m - 1);

/** Position of a period on the axis, in percent. An open end runs to the "as of" month. */
function span(start: YearMonth, end: YearMonth | null) {
  const from = monthIndex(start);
  const to = monthIndex(end ?? timeline.asOf) + 1; // the end month is included
  return { left: (from / totalMonths) * 100, width: ((to - from) / totalMonths) * 100 };
}

// One set of columns for the axis and every row: text, chart, toggle.
const cols =
  "grid grid-cols-[minmax(0,1fr)_2.75rem] gap-x-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_2.75rem] lg:gap-x-10";

function Track({
  start,
  end,
  tone,
  order,
}: {
  start: YearMonth;
  end: YearMonth | null;
  tone: "current" | "role" | "context";
  order: number;
}) {
  const { left, width } = span(start, end);
  return (
    <span aria-hidden className="relative block h-full min-h-[1.5rem]">
      {years.map((y, i) => (
        <span key={y} className="absolute inset-y-0 w-px bg-line" style={{ left: `${(i / years.length) * 100}%` }} />
      ))}
      <span className="absolute inset-y-0 right-0 w-px bg-line" />
      <span
        className={cn(
          "rv-bar absolute top-[calc(50%-5px)] h-2.5 rounded-[1px]",
          tone === "current" && "bg-accent",
          tone === "role" && "bg-ink/75",
          tone === "context" && "hatch border border-rule",
        )}
        style={{ left: `${left}%`, width: `${width}%`, ...delay(0.2 + order * 0.09) }}
      />
      {/* An open end: the period is still running. */}
      {end === null ? (
        <span
          className={cn(
            "rv absolute top-1/2 border-t-[1.5px] border-dashed",
            tone === "current" ? "border-accent" : "border-rule",
          )}
          style={{ left: `${left + width}%`, right: 0, ...delay(0.8 + order * 0.09) }}
        />
      ) : null}
    </span>
  );
}

function Highlights({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((h) => (
        <li key={h} className="relative pl-6 text-muted">
          <span aria-hidden className="absolute left-0 top-[0.8em] h-[1.5px] w-3 bg-accent" />
          {h}
        </li>
      ))}
    </ul>
  );
}

export function Experience() {
  const [open, setOpen] = useState<Set<string>>(new Set());
  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <Section
      id="experience"
      label={sections.experience.label}
      title={sections.experience.title}
      intro={sections.experience.intro}
    >
      <div className="mt-12 sm:mt-16">
        {/* Axis */}
        <div className={cn(cols, "rv items-end pb-2")} style={delay(0.2)} aria-hidden>
          <div className="relative col-start-1 h-6 lg:col-start-2">
            {years.map((y, i) => (
              <span
                key={y}
                className="tabular absolute bottom-0 pl-2 text-[0.9375rem] leading-none text-muted"
                style={{ left: `${(i / years.length) * 100}%` }}
              >
                {y}
              </span>
            ))}
          </div>
        </div>

        <ol>
          {/* Current role: always open */}
          <li className="rv border-t border-ink" style={delay(0.24)}>
            <div className={cn(cols, "py-6 sm:py-7")}>
              <div>
                <h3 className="display text-display-md text-ink">{mattel.organization}</h3>
                <p className="mt-3 font-[650] text-ink">{mattel.role}</p>
                <p className="mt-0.5 text-muted">{mattel.unit}</p>
                <p className="tabular mt-1.5 text-[0.9375rem] text-faint">
                  {mattel.period}, {mattel.location}
                </p>
              </div>
              <div className="col-start-1 row-start-2 mt-5 h-6 lg:col-start-2 lg:row-start-1 lg:-my-7 lg:mt-[-1.75rem] lg:h-auto lg:self-stretch">
                <Track start={mattel.start} end={mattel.end} tone="current" order={0} />
              </div>
            </div>

            {/* Same columns as the chart, so the list lines up under the time axis. */}
            <div className="grid gap-x-10 gap-y-9 pb-10 sm:pb-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_2.75rem]">
              <div>
                <p className="max-w-measure text-ink">{mattel.summary}</p>
                <p className="note mt-6 max-w-[26rem]">{mattel.note}</p>
              </div>
              <div className="lg:col-span-2">
                <h4 className="subhead">{mattel.highlightsTitle}</h4>
                <ul className="mt-4 border-t border-line">
                  {mattel.highlights.map((h) => (
                    <li key={h} className="relative border-b border-line py-3 pl-6 text-muted">
                      <span aria-hidden className="absolute left-0 top-[1.55em] h-[1.5px] w-3 bg-accent" />
                      {h}
                    </li>
                  ))}
                </ul>
                <a href="#work" className="link mt-6 inline-flex min-h-[2.75rem] items-center gap-2 font-[650] text-ink">
                  {mattel.workLink}
                  <ArrowDown size={16} aria-hidden />
                </a>
              </div>
            </div>
          </li>

          {/* Other roles: expandable */}
          {otherExperience.map((item, i) => {
            const isOpen = open.has(item.id);
            const panelId = `exp-panel-${item.id}`;
            return (
              <li key={item.id} className="rv border-t border-line" style={delay(0.3 + i * 0.06)}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(item.id)}
                    className={cn(cols, "group w-full items-center py-5 text-left")}
                  >
                    <span className="block">
                      <span className="block font-[650] text-ink">{item.role}</span>
                      <span className="mt-0.5 block text-muted">{item.organization}</span>
                      <span className="tabular mt-1.5 block text-[0.9375rem] text-faint">
                        {item.period}, {item.location}
                      </span>
                      {item.keyResult ? (
                        <span className="mt-2.5 block text-[0.9375rem] text-muted">
                          <span className="font-[650] text-accent">{item.keyResult.value}</span> {item.keyResult.label}
                        </span>
                      ) : null}
                    </span>
                    <span className="col-start-1 row-start-2 mt-4 block h-6 lg:col-start-2 lg:row-start-1 lg:-my-5 lg:mt-[-1.25rem] lg:h-auto lg:self-stretch">
                      <Track start={item.start} end={item.end} tone="role" order={i + 1} />
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "col-start-2 row-span-2 row-start-1 grid h-9 w-9 place-items-center justify-self-end rounded-full border border-rule text-ink transition-[transform,background-color,color,border-color] duration-300 ease-draft group-hover:border-ink lg:col-start-3 lg:row-span-1",
                        isOpen && "rotate-45 border-ink bg-ink text-paper",
                      )}
                    >
                      <Plus size={16} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={panelId}
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="max-w-measure pb-8 pt-1">
                        <p className="text-ink">{item.summary}</p>
                        <div className="mt-4">
                          <Highlights items={item.highlights} />
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}

          {/* Context: studies run alongside all of it */}
          <li className="rv border-y border-line" style={delay(0.56)}>
            <div className={cn(cols, "items-center py-5")}>
              <p>
                <span className="block text-muted">Studying alongside</span>
                <a href="#education" className="link mt-0.5 inline-block text-ink">
                  {education.school}
                </a>
                <span className="tabular mt-1.5 block text-[0.9375rem] text-faint">{education.period}</span>
              </p>
              <div className="col-start-1 row-start-2 mt-4 h-6 lg:col-start-2 lg:row-start-1 lg:-my-5 lg:mt-[-1.25rem] lg:h-auto lg:self-stretch">
                <Track start={education.start} end={education.end} tone="context" order={otherExperience.length + 1} />
              </div>
            </div>
          </li>
        </ol>
      </div>
    </Section>
  );
}
