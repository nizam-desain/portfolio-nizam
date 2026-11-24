import Image from "next/image";
import Link from "next/link";
import { work, type Work } from "@/data/content";
import { SectionHead } from "@/components/ui/section-head";
import { Evidence } from "@/components/ui/evidence";
import { Arrow } from "@/components/ui/glyphs";
import { cn } from "@/lib/utils";

const featured = work.filter((w) => w.kind === "Professional");
const further = work.filter((w) => w.kind !== "Professional");

function Meta({ w }: { w: Work }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-small text-stone">
      <span className="font-semibold text-sage-ink">{w.index}</span>
      <span>{w.organization}</span>
      <span aria-hidden>·</span>
      <span>{w.period}</span>
    </div>
  );
}

function Cover({ w, className, sizes, ratio = "aspect-[16/10]" }: { w: Work; className?: string; sizes: string; ratio?: string }) {
  return (
    <Link href={`/work/${w.slug}`} tabIndex={-1} aria-hidden className={cn("group/cover block", className)}>
      <div className={cn("img-frame reveal-img relative", ratio)}>
        <Image src={w.cover} alt="" fill sizes={sizes} className="object-cover transition-transform duration-cine ease-out group-hover/cover:scale-[1.05] motion-reduce:group-hover/cover:scale-100" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-slow group-hover/cover:opacity-100" />
        <span className="absolute bottom-4 left-4 flex translate-y-2 items-center gap-2 rounded-full bg-white px-4 py-2 text-small font-semibold text-[#20242C] opacity-0 shadow-lg transition-all duration-slow ease-out group-hover/cover:translate-y-0 group-hover/cover:opacity-100">
          Read the case <Arrow size={14} />
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-white/70 px-3 py-1 text-[0.7rem] font-semibold text-[#20242C] backdrop-blur-md">Original artwork</span>
      </div>
    </Link>
  );
}

function Text({ w, big = true }: { w: Work; big?: boolean }) {
  return (
    <div>
      <div className="fade"><Meta w={w} /></div>
      <h3 className={cn("display fade mt-4", big ? "text-h2" : "text-h3")} style={{ ["--i" as string]: 1 }}>
        <Link href={`/work/${w.slug}`} className="transition-colors duration-base hover:text-sage-ink">
          {w.title}
        </Link>
      </h3>
      <p className="fade mt-4 max-w-md text-graphite" style={{ ["--i" as string]: 2 }}>{w.line}</p>
      <div className="fade mt-6 flex flex-wrap items-center gap-x-6 gap-y-3" style={{ ["--i" as string]: 3 }}>
        <Evidence value={w.evidence} status={w.status} className="text-stone" />
        <Link href={`/work/${w.slug}`} className="group inline-flex items-center gap-2 text-small font-semibold">
          <span className="ink-link">Read the case</span>
          <Arrow size={14} className="transition-transform duration-base group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

export function SelectedWork() {
  const [a, b, c, d] = featured;
  return (
    <section id="work" aria-labelledby="work-title" className="tone-mist py-section">
      <div className="frame">
        <SectionHead
          id="work-title"
          eyebrow="Selected work"
          title={<>Work that starts with how things <span className="accent-serif text-sage-ink">really</span> run</>}
          intro="Four internship case studies — sanitised, told with original artwork, diagrams and conceptual mockups — then competition and coursework projects."
        />

        <div className="mt-16 space-y-20 md:mt-20 md:space-y-28">
          {/* 01 — wide image left, text right */}
          <article className="grid-12 items-center gap-y-8" data-reveal>
            <Cover w={a} className="col-span-4 md:col-span-7" sizes="(min-width: 768px) 56vw, 100vw" />
            <div className="col-span-4 md:col-span-4 md:col-start-9"><Text w={a} /></div>
          </article>

          {/* 02 — text left, tall image right */}
          <article className="grid-12 items-center gap-y-8" data-reveal>
            <div className="order-2 col-span-4 md:order-1 md:col-span-4"><Text w={b} /></div>
            <Cover w={b} className="order-1 col-span-4 md:order-2 md:col-span-7 md:col-start-6" sizes="(min-width: 768px) 56vw, 100vw" ratio="aspect-[16/11]" />
          </article>

          {/* 03 — full-width image with an overlapping card */}
          <article className="relative" data-reveal>
            <Cover w={c} sizes="100vw" ratio="aspect-[16/10] md:aspect-[21/9]" />
            <div className="card relative z-10 mx-4 -mt-16 p-6 sm:mx-8 md:absolute md:bottom-8 md:left-8 md:mx-0 md:mt-0 md:w-[30rem] md:p-8">
              <Text w={c} big={false} />
            </div>
          </article>

          {/* 04 — image left square, text right offset */}
          <article className="grid-12 items-end gap-y-8" data-reveal>
            <Cover w={d} className="col-span-4 md:col-span-6" sizes="(min-width: 768px) 48vw, 100vw" ratio="aspect-[4/3]" />
            <div className="col-span-4 md:col-span-5 md:col-start-8 md:pb-10"><Text w={d} /></div>
          </article>
        </div>

        {/* Further work — a gallery row */}
        <div className="mt-24 md:mt-32">
          <div className="flex flex-wrap items-end justify-between gap-4" data-reveal>
            <h3 className="display fade text-h2">Further work</h3>
            <p className="fade max-w-sm text-small text-stone">Competition, proposal and coursework projects — academic work, labelled as such.</p>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {further.map((w, n) => (
              <li key={w.slug} className="fade" style={{ ["--i" as string]: n }} data-reveal>
                <Link href={`/work/${w.slug}`} className="card group block h-full overflow-hidden transition-transform duration-slow ease-out hover:-translate-y-1.5">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={w.cover} alt="" fill sizes="(min-width: 1280px) 22vw, (min-width: 480px) 45vw, 100vw" className="object-cover transition-transform duration-cine ease-out group-hover:scale-[1.06]" />
                  </div>
                  <div className="p-5">
                    <p className="text-small font-semibold text-sage-ink">{w.index} · {w.kind}</p>
                    <p className="display mt-2 text-[1.6rem] leading-tight">{w.title}</p>
                    <p className="mt-2 text-small text-stone">{w.line}</p>
                    <p className="mt-4 inline-flex items-center gap-2 text-small font-semibold">
                      Open <Arrow size={14} className="transition-transform duration-base group-hover:translate-x-1" />
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
