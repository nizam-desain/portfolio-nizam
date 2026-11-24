import Link from "next/link";
import { work } from "@/data/content";
import { Cover } from "@/components/work/cover";
import { SectionMark } from "@/components/ui/section-mark";
import { Evidence } from "@/components/ui/evidence";
import { Arrow } from "@/components/ui/glyphs";
import { WorkIndex } from "@/components/home/work-index";
import { cn } from "@/lib/utils";

const featured = work.filter((w) => w.kind === "Professional");
const further = work.filter((w) => w.kind !== "Professional");

// Three different compositions for the three professional case studies.
const layouts = [
  { cover: "md:col-span-7", text: "md:col-span-4 md:col-start-9 md:self-end", tone: "ink" as const, ratio: "aspect-[4/3]" },
  { cover: "md:col-span-6 md:col-start-6 md:order-2", text: "md:col-span-4 md:col-start-1 md:order-1 md:self-start md:pt-24", tone: "sage" as const, ratio: "aspect-[5/6]" },
  { cover: "md:col-span-10 md:col-start-2", text: "md:col-span-5 md:col-start-2", tone: "sheet" as const, ratio: "aspect-[16/7]" },
];

export function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="py-section">
      <div className="frame">
        <SectionMark ref_="01" label="Selected work" note={`${work.length} projects · ${featured.length} professional`} />

        <div className="grid-12 mt-12 gap-y-6 md:mt-16" data-reveal>
          <h2 id="work-title" className="display col-span-4 text-h1 uppercase md:col-span-8">
            <span className="mask"><span>Evidence,</span></span>
            <span className="mask" style={{ ["--i" as string]: 1 }}>
              <span>
                not <span className="accent-serif normal-case tracking-[-0.02em] text-sage-ink">adjectives.</span>
              </span>
            </span>
          </h2>
          <p className="fade col-span-4 max-w-measure self-end text-stone md:col-span-3 md:col-start-10" style={{ ["--i" as string]: 2 }}>
            Three case studies from my internship, sanitised for confidentiality, followed by competition, proposal and
            coursework projects. Each one says what was actually delivered and what was only proposed.
          </p>
        </div>

        <ol className="mt-20 space-y-28 md:mt-28 md:space-y-40">
          {featured.map((w, i) => {
            const l = layouts[i % layouts.length];
            return (
              <li key={w.slug} className="grid-12 gap-y-8" data-reveal>
                <Link
                  href={`/work/${w.slug}`}
                  className={cn("group relative col-span-4 block", l.cover)}
                  aria-hidden
                  tabIndex={-1}
                >
                  <div className="wipe relative overflow-hidden">
                    <Cover
                      motif={w.motif}
                      index={w.index}
                      tone={l.tone}
                      className={cn(
                        "w-full transition-transform duration-cine ease-out group-hover:scale-[1.035] motion-reduce:group-hover:scale-100",
                        l.ratio,
                      )}
                    />
                    <span className="meta absolute bottom-4 left-4 flex translate-y-3 items-center gap-2 bg-paper px-3 py-2 text-ink opacity-0 transition-[opacity,transform] duration-slow ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                      Read case <Arrow size={14} />
                    </span>
                  </div>
                </Link>

                <div className={cn("col-span-4", l.text)}>
                  <div className="fade flex flex-wrap items-center gap-x-4 gap-y-2 text-stone">
                    <span className="meta text-oxide">{w.index}</span>
                    <span className="meta">{w.organization}</span>
                    <span className="meta">{w.period}</span>
                  </div>
                  <h3 className="display mt-5 text-h2 uppercase">
                    <Link href={`/work/${w.slug}`} className="transition-colors duration-base hover:text-sage-ink">
                      {w.title}
                    </Link>
                  </h3>
                  <p className="accent-serif fade mt-5 text-lead text-graphite" style={{ ["--i" as string]: 1 }}>
                    {w.line}
                  </p>
                  <dl className="fade mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line/15 pt-5" style={{ ["--i" as string]: 2 }}>
                    <div>
                      <dt className="meta text-stone">Role</dt>
                      <dd className="mt-1 text-small">{w.role}</dd>
                    </div>
                    <div>
                      <dt className="meta text-stone">Status</dt>
                      <dd className="mt-1">
                        <Evidence value={w.evidence} status={w.status} className="normal-case tracking-normal [font-family:var(--font-sans)] text-small" />
                      </dd>
                    </div>
                  </dl>
                  <Link href={`/work/${w.slug}`} className="ghost ink-link fade mt-6 !min-h-0 py-1" style={{ ["--i" as string]: 3 }}>
                    Case study <Arrow size={14} />
                  </Link>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-32 md:mt-44">
          <div className="grid-12 items-end gap-y-4 border-b border-line/90 pb-5" data-reveal>
            <h3 className="display col-span-4 text-h2 uppercase md:col-span-6">Further work</h3>
            <p className="fade col-span-4 text-small text-stone md:col-span-4 md:col-start-9 md:text-right">
              Competition, proposal and coursework projects. Academic work, labelled as such.
            </p>
          </div>
          <WorkIndex items={further} />
        </div>
      </div>
    </section>
  );
}
