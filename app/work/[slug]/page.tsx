import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { work, profile } from "@/data/content";
import { Cover } from "@/components/work/cover";
import { FlowDiagram } from "@/components/work/flow-diagram";
import { Evidence } from "@/components/ui/evidence";
import { Arrow, Diamond } from "@/components/ui/glyphs";

type Params = { slug: string };

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const w = work.find((x) => x.slug === slug);
  if (!w) return {};
  const description = `${w.line} ${w.kind} work by ${profile.name} — ${w.role}, ${w.period}.`;
  return {
    title: w.title,
    description,
    alternates: { canonical: `/work/${w.slug}` },
    openGraph: { type: "article", url: `/work/${w.slug}`, title: `${w.title} — ${profile.name}`, description },
    twitter: { card: "summary_large_image", title: w.title, description },
  };
}

const tones = ["ink", "sage", "sheet"] as const;

export default async function CaseStudy({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const i = work.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const w = work[i];
  const next = work[(i + 1) % work.length];
  const prev = work[(i - 1 + work.length) % work.length];
  const related = work.filter((x) => x.slug !== w.slug && (x.kind === "Professional") === (w.kind === "Professional")).slice(0, 2);

  const toc = [
    ["overview", "Overview"],
    ["context", "Business context"],
    ["problem", "Problem"],
    ["role", "My role"],
    ["approach", "Approach"],
    ...(w.flow ? [["process", "Process view"]] : []),
    ["outcomes", "Outcomes"],
    ["limits", "Limitations"],
  ] as const;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: w.title,
    about: w.line,
    author: { "@type": "Person", name: profile.legalName },
    dateCreated: w.period,
    keywords: w.skills.join(", "),
  };

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article aria-labelledby="case-title">
        <header className="now frame pt-[calc(var(--header-h)+2.5rem)]" data-reveal>
          <nav aria-label="Breadcrumb" className="meta flex items-center gap-3 text-stone">
            <Link href="/#work" className="ink-link hover:text-ink">Selected work</Link>
            <span aria-hidden>/</span>
            <span aria-current="page" className="text-ink">{w.index}</span>
          </nav>

          <div className="mt-10 grid-12 gap-y-6 border-b border-line/90 pb-5">
            <p className="meta col-span-2 text-oxide md:col-span-2">Case {w.index} / {String(work.length).padStart(2, "0")}</p>
            <p className="meta col-span-2 text-stone md:col-span-3">{w.kind} · {w.organization}</p>
            <p className="meta col-span-2 text-stone md:col-span-2">{w.period}</p>
            <div className="col-span-2 md:col-span-5 md:text-right"><Evidence value={w.evidence} status={w.status} /></div>
          </div>

          <h1 id="case-title" className="display mt-10 text-h1 uppercase md:max-w-[16ch]">
            <span className="mask"><span>{w.title}</span></span>
          </h1>
          <p className="accent-serif fade mt-6 max-w-[38ch] text-[clamp(1.4rem,1rem+1.4vw,2.2rem)] leading-[1.15] text-sage-ink" style={{ ["--i" as string]: 2 }}>
            {w.line}
          </p>
        </header>

        <div className="frame mt-14 md:mt-20" data-reveal>
          <div className="wipe">
            <Cover motif={w.motif} index={w.index} tone={tones[i % 3]} className="aspect-[16/9] w-full md:aspect-[21/8]" />
          </div>
        </div>

        <div className="frame mt-16 grid-12 gap-y-14 md:mt-24">
          {/* Contents */}
          <aside className="col-span-4 md:col-span-3">
            <nav aria-label="On this page" className="md:sticky md:top-[calc(var(--header-h)+2rem)]">
              <p className="meta text-stone">Contents</p>
              <ol className="mt-4 border-t border-line/15">
                {toc.map(([id, label], n) => (
                  <li key={id} className="border-b border-line/15">
                    <a href={`#${id}`} className="group flex items-baseline gap-3 py-2.5 text-small">
                      <span className="meta text-oxide">{String(n + 1).padStart(2, "0")}</span>
                      <span className="transition-transform duration-base group-hover:translate-x-1">{label}</span>
                    </a>
                  </li>
                ))}
              </ol>
              {w.confidential ? (
                <p className="mt-6 flex gap-2 text-small text-stone">
                  <Diamond size={8} className="mt-1.5 shrink-0 text-oxide" />
                  Sanitised for confidentiality. Diagrams are conceptual.
                </p>
              ) : null}
            </nav>
          </aside>

          <div className="col-span-4 space-y-20 md:col-span-8 md:col-start-5 md:space-y-28">
            <section id="overview" aria-labelledby="h-overview" data-reveal>
              <h2 id="h-overview" className="meta text-stone">01 — Overview</h2>
              <dl className="mt-5 grid grid-cols-1 border-t border-line/90 sm:grid-cols-2">
                {[
                  ["Organisation", w.organization],
                  ["Role", w.role],
                  ["Period", w.period],
                  ["Status", w.status],
                ].map(([k, v]) => (
                  <div key={k} className="fade border-b border-line/15 py-4 sm:odd:pr-6">
                    <dt className="meta text-stone">{k}</dt>
                    <dd className="mt-1.5">{v}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section id="context" aria-labelledby="h-context" data-reveal>
              <h2 id="h-context" className="meta text-stone">02 — Business context</h2>
              <p className="fade mt-5 text-lead">{w.context}</p>
            </section>

            <section id="problem" aria-labelledby="h-problem" data-reveal>
              <h2 id="h-problem" className="meta text-stone">03 — Problem statement</h2>
              <p className="display fade mt-5 border-l-2 border-oxide pl-6 text-h2 uppercase">{w.problem}</p>
            </section>

            <section id="role" aria-labelledby="h-role" data-reveal>
              <h2 id="h-role" className="meta text-stone">04 — My role &amp; responsibilities</h2>
              <ol className="mt-5 border-t border-line/90">
                {w.responsibilities.map((r, n) => (
                  <li key={r} className="fade grid grid-cols-[2.5rem_1fr] gap-3 border-b border-line/15 py-4" style={{ ["--i" as string]: n }}>
                    <span className="meta pt-1 text-oxide">{String(n + 1).padStart(2, "0")}</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section id="approach" aria-labelledby="h-approach" data-reveal>
              <h2 id="h-approach" className="meta text-stone">05 — Approach &amp; discovery</h2>
              <div className="mt-5 grid gap-px bg-line/15 sm:grid-cols-2 sm:[&>*:last-child:nth-child(odd)]:col-span-2">
                {w.approach.map((a, n) => (
                  <p key={a} className="fade bg-paper py-5 sm:p-6 sm:first:pl-0" style={{ ["--i" as string]: n }}>
                    <span className="accent-serif mb-2 block text-h3 text-sage-ink">{["i.", "ii.", "iii.", "iv."][n]}</span>
                    {a}
                  </p>
                ))}
              </div>
            </section>

            {w.flow ? (
              <section id="process" aria-labelledby="h-process" data-reveal>
                <h2 id="h-process" className="meta text-stone">06 — Process view (conceptual)</h2>
                <figure className="mt-5 border border-line/15 p-4 sm:p-6">
                  <FlowDiagram flow={w.flow} id={`flow-${w.slug}`} />
                  <figcaption className="mt-4 border-t border-line/15 pt-4 text-small text-stone">
                    <span className="meta mr-2 text-oxide">Fig. {w.index}</span>
                    {w.flow.caption}
                  </figcaption>
                </figure>
              </section>
            ) : null}

            <section id="outcomes" aria-labelledby="h-outcomes" data-reveal>
              <h2 id="h-outcomes" className="meta text-stone">{w.flow ? "07" : "06"} — Outcomes</h2>
              <div className="mt-5 grid gap-10 sm:grid-cols-2">
                <div className="fade">
                  <p className="flex items-center gap-2 border-b border-line/90 pb-3">
                    <span aria-hidden className="block h-2 w-2 bg-sage-ink" />
                    <span className="meta">Confirmed</span>
                  </p>
                  <ul className="mt-2">
                    {w.outcomes.map((o) => (
                      <li key={o} className="border-b border-line/15 py-3">{o}</li>
                    ))}
                  </ul>
                </div>
                <div className="fade" style={{ ["--i" as string]: 1 }}>
                  <p className="flex items-center gap-2 border-b border-line/90 pb-3">
                    <span aria-hidden className="block h-2 w-2 rotate-45 border border-current" />
                    <span className="meta">Proposed or still open</span>
                  </p>
                  {w.proposed?.length ? (
                    <ul className="mt-2">
                      {w.proposed.map((o) => (
                        <li key={o} className="border-b border-line/15 py-3 text-graphite">{o}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="py-3 text-small text-stone">Nothing further is claimed beyond the confirmed items.</p>
                  )}
                </div>
              </div>
              <p className="meta mt-8 text-stone">Skills applied</p>
              <p className="mt-2 text-small">{w.skills.join(" · ")}</p>
              {w.link ? (
                <a href={w.link.href} className="slab mt-8">
                  {w.link.label} <Arrow size={14} />
                </a>
              ) : null}
            </section>

            <section id="limits" aria-labelledby="h-limits" data-reveal>
              <h2 id="h-limits" className="meta text-stone">{w.flow ? "08" : "07"} — Limitations</h2>
              <ul className="mt-5 space-y-3">
                {w.limitations.map((l) => (
                  <li key={l} className="fade flex gap-3 text-graphite">
                    <span aria-hidden className="mt-[0.7em] block h-px w-4 shrink-0 bg-oxide" />
                    {l}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        {/* Related + next */}
        <aside aria-label="More work" className="mt-section bg-night text-ivory">
          <div className="frame py-16 md:py-24">
            <p className="meta text-ivory/50">Related</p>
            <ul className="mt-6 grid gap-px bg-ivory/15 md:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug} className="bg-night">
                  <Link href={`/work/${r.slug}`} className="group flex items-start justify-between gap-6 py-6 md:p-8 md:first:pl-0">
                    <span>
                      <span className="meta text-sage">{r.index} · {r.kind}</span>
                      <span className="display mt-2 block text-h3 uppercase">{r.title}</span>
                    </span>
                    <Arrow className="mt-6 shrink-0 transition-transform duration-slow ease-out group-hover:translate-x-1.5" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-16 grid gap-10 border-t border-ivory/15 pt-10 md:grid-cols-2">
              <Link href={`/work/${prev.slug}`} className="group block">
                <span className="meta text-ivory/50">Previous · {prev.index}</span>
                <span className="display mt-3 block text-h2 uppercase transition-colors duration-base group-hover:text-sage">{prev.title}</span>
              </Link>
              <Link href={`/work/${next.slug}`} className="group block md:text-right">
                <span className="meta text-ivory/50">Next · {next.index}</span>
                <span className="display mt-3 block text-h2 uppercase transition-colors duration-base group-hover:text-sage">{next.title}</span>
              </Link>
            </div>
          </div>
        </aside>
      </article>
    </main>
  );
}
