"use client";

import { useEffect, useRef, useState } from "react";
import { method } from "@/data/content";
import { SectionMark } from "@/components/ui/section-mark";
import { cn } from "@/lib/utils";

// Node positions for the method diagram (viewBox 520 × 560).
const PTS = [
  [70, 60],
  [300, 120],
  [140, 230],
  [400, 300],
  [190, 410],
  [430, 500],
];
const PATH = PTS.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
// Cumulative share of path length at each node, so the line can be drawn up to the active step.
const SEG = PTS.slice(1).map(([x, y], i) => Math.hypot(x - PTS[i][0], y - PTS[i][1]));
const TOTAL = SEG.reduce((a, b) => a + b, 0);
const AT = [0, ...SEG.map((_, i) => SEG.slice(0, i + 1).reduce((a, b) => a + b, 0) / TOTAL)];

export function Method() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        });
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const step = method[active];

  return (
    <section id="method" aria-labelledby="method-title" className="bg-sheet py-section">
      <div className="frame">
        <SectionMark ref_="04" label="How I work" note="Six steps, one loop" />

        <div className="grid-12 mt-14 gap-y-8 md:mt-20" data-reveal>
          <h2 id="method-title" className="display col-span-4 text-h1 uppercase md:col-span-7">
            <span className="mask"><span>Understand first.</span></span>
            <span className="mask" style={{ ["--i" as string]: 1 }}>
              <span className="text-stone">Then change.</span>
            </span>
          </h2>
          <p className="fade col-span-4 max-w-measure self-end text-graphite md:col-span-4 md:col-start-9" style={{ ["--i" as string]: 2 }}>
            The same sequence sits under every project on this site. It isn&apos;t strictly linear — validation sends
            work back to the requirements more often than not, and that loop is the point.
          </p>
        </div>

        <div className="grid-12 mt-16 md:mt-24">
          {/* Sticky figure (desktop) */}
          <div className="relative hidden md:col-span-5 md:block lg:col-span-6">
            <div className="sticky top-[calc(var(--header-h)+3rem)]">
              <figure aria-hidden className="relative">
                <svg viewBox="0 0 520 560" className="w-full max-w-[34rem] text-ink">
                  {/* validation loop: 05 → 03 */}
                  <path
                    d={`M${PTS[4][0]} ${PTS[4][1]} C ${PTS[4][0] - 150} ${PTS[4][1] - 30}, ${PTS[2][0] - 150} ${PTS[2][1] + 40}, ${PTS[2][0]} ${PTS[2][1]}`}
                    fill="none"
                    className={cn("stroke-oxide transition-opacity duration-slow", active >= 4 ? "opacity-100" : "opacity-0")}
                    strokeWidth="1.25"
                    strokeDasharray="4 5"
                  />
                  <path d={PATH} fill="none" className="stroke-ink" strokeOpacity="0.15" strokeWidth="1.25" />
                  <path
                    d={PATH}
                    fill="none"
                    className="stroke-ink"
                    strokeWidth="2"
                    pathLength={1}
                    strokeDasharray="1"
                    style={{ strokeDashoffset: 1 - AT[active], transition: "stroke-dashoffset 900ms cubic-bezier(0.65,0,0.35,1)" }}
                  />
                  {PTS.map(([x, y], i) => (
                    <g key={i} transform={`translate(${x} ${y})`}>
                      <rect
                        x={-14}
                        y={-14}
                        width={28}
                        height={28}
                        className={cn(
                          "transition-[fill] duration-slow",
                          i === active ? "fill-sage" : i < active ? "fill-ink" : "fill-sheet",
                        )}
                        stroke="currentColor"
                        strokeWidth="1.25"
                        transform={i === 2 || i === 4 ? "rotate(45)" : undefined}
                      />
                      <text
                        x={x > 260 ? -26 : 26}
                        y={5}
                        textAnchor={x > 260 ? "end" : "start"}
                        className={cn("font-mono transition-[fill] duration-base", i === active ? "fill-ink" : "fill-stone")}
                        fontSize="13"
                        letterSpacing="1"
                      >
                        {method[i].n} {method[i].artefact.toUpperCase()}
                      </text>
                    </g>
                  ))}
                </svg>
              </figure>
              <div className="mt-6 flex items-end gap-6">
                <span className="display text-[clamp(5rem,10vw,10rem)] leading-[0.8] text-ink tabular" aria-hidden>
                  {step.n}
                </span>
                <p className="meta max-w-[14rem] pb-2 text-stone" aria-live="polite">
                  Output: <span className="text-ink">{step.artefact}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Steps */}
          <ol className="col-span-4 md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8">
            {method.map((m, i) => (
              <li
                key={m.n}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-step={i}
                data-reveal
                className="flex min-h-0 flex-col justify-center border-t border-line/20 py-10 md:min-h-[62vh] md:py-0"
              >
                <div className={cn("transition-opacity duration-slow md:opacity-35", i === active && "md:opacity-100")}>
                  <p className="meta fade flex items-center gap-3 text-oxide">
                    {m.n}
                    <span className="h-px w-8 bg-current" aria-hidden />
                    <span className="text-stone">{m.artefact}</span>
                  </p>
                  <h3 className="display fade mt-4 text-h2 uppercase [overflow-wrap:anywhere] md:text-[clamp(2rem,1rem+2.6vw,4.5rem)]" style={{ ["--i" as string]: 1 }}>
                    {m.title}
                  </h3>
                  <p className="fade mt-5 max-w-measure text-graphite" style={{ ["--i" as string]: 2 }}>
                    {m.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
