import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { work, profile } from "@/data/content";
import { Cover } from "@/components/work/cover";
import { Visual } from "@/components/work/visuals";
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
  const idx = work.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const w = work[idx];
  const next = work[(idx + 1) % work.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: w.title,
    about: w.line,
    author: { "@type": "Person", name: profile.legalName },
    keywords: w.skills.join(", "),
  };

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Persistent back control */}
      <Link
        href="/#work"
        className="slab fixed bottom-4 right-4 z-40 !min-h-11 !px-4 shadow-[0_0_0_1px_rgb(var(--paper))] sm:bottom-6 sm:right-6"
      >
        <Arrow size={15} className="rotate-180" /> Back to work
      </Link>

      <article aria-labelledby="case-title">
        <header className="now frame pt-[calc(var(--header-h)+1.5rem)]" data-reveal>
          <Link href="/#work" className="ghost group !min-h-11 text-stone hover:text-ink">
            <Arrow size={15} className="rotate-180 transition-transform duration-base group-hover:-translate-x-1" />
            All work
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-line/90 pb-4">
            <span className="meta text-oxide">Case {w.index}</span>
            <span className="meta text-stone">{w.kind} · {w.organization}</span>
            <span className="meta text-stone">{w.period}</span>
            <Evidence value={w.evidence} status={w.status} className="md:ml-auto" />
          </div>

          <h1 id="case-title" className="display mt-10 text-h1 uppercase md:max-w-[18ch]">
            <span className="mask"><span>{w.title}</span></span>
          </h1>
          <p className="accent-serif fade mt-5 max-w-[40ch] text-[clamp(1.3rem,1rem+1.2vw,2rem)] leading-[1.2] text-sage-ink" style={{ ["--i" as string]: 2 }}>
            {w.line}
          </p>

          {/* Real figures from the project documents */}
          <dl className="mt-12 grid grid-cols-2 gap-px bg-line/15 md:grid-cols-4">
            {w.facts.map((f, n) => (
              <div key={f.label} className="fade bg-paper py-5 pr-4 md:py-6" style={{ ["--i" as string]: n + 3 }}>
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="display block text-[clamp(2.75rem,1.5rem+3.5vw,4.75rem)] leading-[0.85]">{f.value}</span>
                  <span className="mt-2 block max-w-[16rem] text-small text-stone">{f.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </header>

        {w.chapters?.length ? (
          <div className="frame mt-20 space-y-24 md:mt-28 md:space-y-32">
            {w.chapters.map((c, n) => (
              <section key={c.title} aria-labelledby={`ch-${n}`} data-reveal>
                <div className="grid-12 mb-8 gap-y-3 md:mb-10">
                  <p className="meta fade col-span-4 text-oxide md:col-span-1">{String(n + 1).padStart(2, "0")}</p>
                  <h2 id={`ch-${n}`} className="display fade col-span-4 text-h2 uppercase md:col-span-6" style={{ ["--i" as string]: 1 }}>
                    {c.title}
                  </h2>
                  <p className="fade col-span-4 max-w-measure self-end text-graphite md:col-span-4 md:col-start-9" style={{ ["--i" as string]: 2 }}>
                    {c.text}
                  </p>
                </div>
                <Visual k={c.visual} />
              </section>
            ))}
          </div>
        ) : (
          <div className="frame mt-16 md:mt-24" data-reveal>
            <div className="wipe">
              <Cover motif={w.motif} index={w.index} tone={tones[idx % 3]} className="aspect-[16/9] w-full md:aspect-[21/8]" />
            </div>
            {w.did?.length ? (
              <div className="grid-12 mt-14 gap-y-6">
                <h2 className="meta col-span-4 text-stone md:col-span-3">What I did</h2>
                <ul className="col-span-4 md:col-span-8 md:col-start-5">
                  {w.did.map((d, n) => (
                    <li key={d} className="fade flex gap-4 border-b border-line/15 py-4 text-lead" style={{ ["--i" as string]: n }}>
                      <span className="meta pt-2 text-oxide">{String(n + 1).padStart(2, "0")}</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        )}

        {/* Outcomes: confirmed vs open, short */}
        <section aria-labelledby="h-out" className="frame mt-24 md:mt-32" data-reveal>
          <h2 id="h-out" className="display fade text-h2 uppercase">Outcome</h2>
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            <div className="fade">
              <p className="flex items-center gap-2 border-b border-ink pb-3">
                <span aria-hidden className="block h-2.5 w-2.5 bg-sage-ink" />
                <span className="meta">Delivered</span>
              </p>
              <ul>
                {w.outcomes.map((o) => (
                  <li key={o} className="border-b border-line/15 py-3">{o}</li>
                ))}
              </ul>
            </div>
            <div className="fade" style={{ ["--i" as string]: 1 }}>
              <p className="flex items-center gap-2 border-b border-ink pb-3">
                <span aria-hidden className="block h-2.5 w-2.5 rotate-45 border border-current" />
                <span className="meta">Still open</span>
              </p>
              {w.proposed?.length ? (
                <ul>
                  {w.proposed.map((o) => (
                    <li key={o} className="border-b border-line/15 py-3 text-stone">{o}</li>
                  ))}
                </ul>
              ) : (
                <p className="py-3 text-stone">Nothing further claimed.</p>
              )}
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-3 border-t border-line/15 pt-5 md:flex-row md:items-start md:justify-between md:gap-10">
            <p className="flex max-w-2xl gap-2 text-small text-stone">
              <Diamond size={8} className="mt-1.5 shrink-0 text-oxide" />
              <span>
                {w.limits}
                {w.confidential ? " Internal project — names, people, data and screens are withheld; visuals are redrawn and generic." : ""}
              </span>
            </p>
            <p className="meta text-stone md:max-w-[40%] md:text-right">{w.skills.join(" · ")}</p>
          </div>
          {w.link ? (
            <a href={w.link.href} className="slab mt-8">
              {w.link.label} <Arrow size={14} />
            </a>
          ) : null}
        </section>

        {/* Next */}
        <nav aria-label="Next project" className="mt-section bg-night text-ivory">
          <div className="frame grid gap-8 py-14 md:grid-cols-2 md:items-end md:py-20">
            <Link href="/#work" className="group meta flex items-center gap-3 text-ivory/70 hover:text-ivory">
              <Arrow size={15} className="rotate-180 transition-transform duration-base group-hover:-translate-x-1" /> Back to all work
            </Link>
            <Link href={`/work/${next.slug}`} className="group block md:text-right">
              <span className="meta text-ivory/50">Next · {next.index}</span>
              <span className="display mt-2 block text-h2 uppercase transition-colors duration-base group-hover:text-sage">{next.title}</span>
            </Link>
          </div>
        </nav>
      </article>
    </main>
  );
}
