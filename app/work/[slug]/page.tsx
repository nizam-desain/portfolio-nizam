import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { work, profile, type Work } from "@/data/content";
import { Visual } from "@/components/work/visuals";
import { Compare } from "@/components/work/compare";
import { Art } from "@/components/ui/art";
import { Evidence } from "@/components/ui/evidence";
import { Arrow } from "@/components/ui/glyphs";
import { cn } from "@/lib/utils";

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
    openGraph: { type: "article", url: `/work/${w.slug}`, title: `${w.title} — ${profile.name}`, description, images: [{ url: w.cover, width: 2400, height: 1500 }] },
    twitter: { card: "summary_large_image", title: w.title, description },
  };
}

const tone = { peach: "tone-peach", lav: "tone-lav", sage: "tone-sage", mist: "tone-mist" } as const;

type Media = { type: "image"; g: NonNullable<Work["gallery"]>[number] } | { type: "compare"; c: NonNullable<Work["compare"]> };

function MediaBlock({ m, n }: { m: Media; n: number }) {
  if (m.type === "compare") {
    return (
      <div className="frame">
        <Compare {...m.c} />
      </div>
    );
  }
  const g = m.g;
  if (g.h > g.w) {
    // Phone-shaped mockups sit beside their caption in a tinted panel.
    return (
      <div className="frame">
        <div className="tone-lav grid items-center gap-8 overflow-hidden rounded-frame-lg p-6 ring-1 ring-line/10 sm:p-10 md:grid-cols-[1fr_1.1fr]" data-reveal>
          <div className="fade md:order-2">
            <p className="eyebrow">{g.kind}</p>
            <p className="display mt-3 text-h2">{g.caption}</p>
            <p className="mt-3 text-small text-stone">Reconstructed for this portfolio — not a production screenshot.</p>
          </div>
          <div className="mx-auto w-full max-w-[17rem] md:order-1">
            <Art src={g.src} w={g.w} h={g.h} alt={g.alt} sizes="17rem" className="rounded-[34px] ring-8 ring-[#20242C]" />
          </div>
        </div>
      </div>
    );
  }
  const wide = n % 2 === 0;
  return (
    <figure className={cn("frame", wide ? "" : "grid-12 items-end gap-y-5")}>
      <div className={wide ? "" : "col-span-4 md:col-span-8"}>
        <Art src={g.src} w={g.w} h={g.h} alt={g.alt} label={g.kind} sizes={wide ? "(min-width: 1640px) 1500px, 92vw" : "(min-width: 768px) 62vw, 92vw"} />
      </div>
      <figcaption className={cn("text-small text-stone", wide ? "mt-4 flex justify-between gap-4" : "col-span-4 md:col-span-4 md:pb-4")}>
        <span className={wide ? "" : "display block text-h3 text-ink"}>{g.caption}</span>
        {wide ? <span className="hidden sm:inline">{g.kind} · illustrative</span> : <span className="mt-2 block">{g.kind} · illustrative</span>}
      </figcaption>
    </figure>
  );
}

function Chapter({ c, n, total, tint }: { c: NonNullable<Work["chapters"]>[number]; n: number; total: number; tint: Work["tint"] }) {
  const head = (
    <>
      <p className="eyebrow fade">
        Chapter {n + 1} of {total}
      </p>
      <h2 id={`ch-${n}`} className="display fade mt-3 text-h2" style={{ ["--i" as string]: 1 }}>
        {c.title}
      </h2>
      <p className="fade mt-4 text-lead text-graphite" style={{ ["--i" as string]: 2 }}>
        {c.text}
      </p>
    </>
  );
  const v = n % 3;
  if (v === 0) {
    return (
      <section aria-labelledby={`ch-${n}`} className="frame grid-12 gap-y-8" data-reveal>
        <div className="col-span-4 md:col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">{head}</div>
        </div>
        <div className="col-span-4 md:col-span-12 lg:col-span-8">
          <Visual k={c.visual} />
        </div>
      </section>
    );
  }
  if (v === 1) {
    return (
      <section aria-labelledby={`ch-${n}`} className="frame" data-reveal>
        <div className="mx-auto mb-10 max-w-3xl text-center [&_.eyebrow]:justify-center">{head}</div>
        <Visual k={c.visual} />
      </section>
    );
  }
  return (
    <section aria-labelledby={`ch-${n}`} className={cn("py-16 md:py-24", tone[tint])} data-reveal>
      <div className="frame">
        <div className="mb-10 max-w-2xl">{head}</div>
        <Visual k={c.visual} />
      </div>
    </section>
  );
}

export default async function CaseStudy({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const idx = work.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const w = work[idx];
  const next = work[(idx + 1) % work.length];

  const media: Media[] = (w.gallery ?? []).map((g) => ({ type: "image" as const, g }));
  if (w.compare) media.splice(1, 0, { type: "compare", c: w.compare });
  const chapters = w.chapters ?? [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: w.title,
    about: w.line,
    image: w.cover,
    author: { "@type": "Person", name: profile.legalName },
    keywords: w.skills.join(", "),
  };

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link href="/#work" className="slab fixed bottom-4 right-4 z-40 !min-h-11 !rounded-full !px-5 sm:bottom-6 sm:right-6">
        <Arrow size={15} className="rotate-180" /> Back to work
      </Link>

      <article aria-labelledby="case-title">
        <header className="now relative overflow-hidden pt-[calc(var(--header-h)+1.5rem)]" data-reveal>
          <div aria-hidden className={cn("absolute inset-x-0 top-0 -z-10 h-[70%]", tone[w.tint])} />
          <div className="frame">
            <Link href="/#work" className="ghost group !min-h-11 text-stone hover:text-ink">
              <Arrow size={15} className="rotate-180 transition-transform duration-base group-hover:-translate-x-1" />
              All work
            </Link>
            <div className="grid-12 mt-6 items-end gap-y-6">
              <div className="col-span-4 md:col-span-8">
                <div className="fade flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-card px-3 py-1 text-[0.75rem] font-semibold text-sage-ink shadow-[0_2px_8px_-4px_rgb(var(--shadow)/0.3)]">Case {w.index}</span>
                  <span className="rounded-full bg-card px-3 py-1 text-[0.75rem] font-semibold text-stone">{w.kind} · {w.organization}</span>
                  <span className="rounded-full bg-card px-3 py-1 text-[0.75rem] font-semibold text-stone">{w.period}</span>
                </div>
                <h1 id="case-title" className="display mt-6 text-h1">
                  <span className="mask"><span>{w.title}</span></span>
                </h1>
              </div>
              <div className="fade col-span-4 md:col-span-4" style={{ ["--i" as string]: 2 }}>
                <p className="text-lead text-graphite">{w.line}</p>
                <Evidence value={w.evidence} status={w.status} className="mt-4 text-stone" />
              </div>
            </div>
          </div>

          <div className="frame mt-10">
            <div className="hero-img img-frame relative aspect-[4/3] w-full md:aspect-[21/9]">
              <Image src={w.cover} alt={`Original artwork for ${w.title}`} fill priority sizes="(min-width: 1640px) 1500px, 94vw" className="object-cover" />
              <span className="absolute right-4 top-4 rounded-full bg-white/75 px-3 py-1 text-[0.72rem] font-semibold text-[#20242C] backdrop-blur-md">Original artwork</span>
            </div>
            <dl className="relative z-10 mx-3 -mt-10 grid grid-cols-2 gap-3 sm:mx-8 md:-mt-14 md:grid-cols-4">
              {w.facts.map((f, n) => (
                <div key={f.label} className="card fade p-4 sm:p-5" style={{ ["--i" as string]: n + 3 }}>
                  <dt className="sr-only">{f.label}</dt>
                  <dd>
                    <span className="display block text-[clamp(2.2rem,1.4rem+2.6vw,3.6rem)] leading-none text-sage-ink">{f.value}</span>
                    <span className="mt-2 block text-small text-stone">{f.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        {w.insight ? (
          <div className="frame mt-16 md:mt-24" data-reveal>
            <blockquote className="fade mx-auto max-w-4xl text-center">
              <p className="eyebrow justify-center">The insight</p>
              <p className="display mt-4 text-[clamp(1.8rem,1.2rem+2.2vw,3.2rem)] leading-[1.15]">&ldquo;{w.insight}&rdquo;</p>
            </blockquote>
          </div>
        ) : null}

        {chapters.length ? (
          <div className="mt-16 space-y-16 md:mt-24 md:space-y-24">
            {chapters.map((c, n) => (
              <div key={c.title} className="space-y-16 md:space-y-24">
                <Chapter c={c} n={n} total={chapters.length} tint={w.tint} />
                {media[n] ? <MediaBlock m={media[n]} n={n} /> : null}
              </div>
            ))}
            {media.slice(chapters.length).map((m, n) => (
              <MediaBlock key={n} m={m} n={chapters.length + n} />
            ))}
          </div>
        ) : (
          <div className="frame mt-16 grid-12 gap-y-8 md:mt-24" data-reveal>
            <div className="col-span-4 md:col-span-5">
              <p className="eyebrow fade">What I did</p>
              <h2 className="display fade mt-3 text-h2" style={{ ["--i" as string]: 1 }}>
                {w.role}
              </h2>
            </div>
            <ol className="col-span-4 space-y-3 md:col-span-7">
              {(w.did ?? []).map((d, n) => (
                <li key={d} className="card fade flex gap-4 p-5" style={{ ["--i" as string]: n + 1 }}>
                  <span aria-hidden className="display text-[2rem] leading-none text-sage-ink">{String(n + 1).padStart(2, "0")}</span>
                  <span className="text-lead">{d}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        <section aria-labelledby="h-out" className="frame mt-20 md:mt-28" data-reveal>
          <div className={cn("overflow-hidden rounded-frame-lg p-6 ring-1 ring-line/10 sm:p-10", tone[w.tint])}>
            <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
              <div>
                <p className="eyebrow fade">Outcome</p>
                <h2 id="h-out" className="display fade mt-3 text-h2" style={{ ["--i" as string]: 1 }}>
                  What it delivered
                </h2>
                <p className="fade mt-4 text-small text-stone" style={{ ["--i" as string]: 2 }}>
                  {w.limits}
                  {w.confidential ? " Internal project — names, people, data and screens are withheld; visuals are original and illustrative." : ""}
                </p>
                <p className="fade mt-5 text-small font-semibold text-stone" style={{ ["--i" as string]: 3 }}>
                  {w.skills.join(" · ")}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="card fade p-5" style={{ ["--i" as string]: 2 }}>
                  <p className="flex items-center gap-2 text-small font-semibold text-sage-ink">
                    <span aria-hidden className="h-2 w-2 rounded-full bg-sage-ink" /> Delivered
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {w.outcomes.map((o) => (
                      <li key={o} className="text-small leading-snug">{o}</li>
                    ))}
                  </ul>
                </div>
                <div className="card fade p-5" style={{ ["--i" as string]: 3 }}>
                  <p className="flex items-center gap-2 text-small font-semibold text-stone">
                    <span aria-hidden className="h-2 w-2 rounded-full border border-current" /> Still open
                  </p>
                  {w.proposed?.length ? (
                    <ul className="mt-3 space-y-2.5">
                      {w.proposed.map((o) => (
                        <li key={o} className="text-small leading-snug text-stone">{o}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-small text-stone">Nothing further claimed.</p>
                  )}
                </div>
              </div>
            </div>
            {w.link ? (
              <a href={w.link.href} className="slab mt-8">
                {w.link.label} <Arrow size={14} />
              </a>
            ) : null}
          </div>
        </section>

        <nav aria-label="Next project" className="frame mb-section mt-16 md:mt-20">
          <Link href={`/work/${next.slug}`} className="band-night group relative grid overflow-hidden rounded-frame-lg md:grid-cols-[1fr_1.1fr]">
            <div className="relative z-10 flex flex-col justify-between gap-8 p-7 sm:p-10">
              <span className="text-small font-semibold text-teal">Next project · {next.index}</span>
              <span>
                <span className="display block text-h2 text-ivory">{next.title}</span>
                <span className="mt-2 block text-ivory/70">{next.line}</span>
              </span>
              <span className="inline-flex items-center gap-2 text-small font-semibold text-ivory">
                Read the case <Arrow size={14} className="transition-transform duration-base group-hover:translate-x-1" />
              </span>
            </div>
            <div className="relative min-h-[14rem] overflow-hidden">
              <Image src={next.cover} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-cine ease-out group-hover:scale-[1.04]" />
            </div>
          </Link>
          <Link href="/#work" className="ghost mt-4 text-stone hover:text-ink">
            <Arrow size={15} className="rotate-180" /> Back to all work
          </Link>
        </nav>
      </article>
    </main>
  );
}
