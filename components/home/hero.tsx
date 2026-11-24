import { hero, profile } from "@/data/content";
import { HeroSystem } from "@/components/home/hero-system";
import { ArrowDown } from "@/components/ui/glyphs";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="now after-opening relative flex min-h-[100svh] flex-col pt-[var(--header-h)]"
      data-reveal
    >
      {/* Document header strip */}
      <div className="frame">
        <div className="grid-12 border-b border-line/15 py-4">
          <p className="meta fade col-span-2 text-stone md:col-span-3" style={{ ["--i" as string]: 1 }}>
            §00 — Portfolio, 2026
          </p>
          <p className="meta fade col-span-2 text-right text-stone md:col-span-4 md:col-start-6 md:text-left" style={{ ["--i" as string]: 2 }}>
            {profile.role}
          </p>
          <p className="meta fade hidden text-right text-stone md:col-span-3 md:col-start-10 md:block" style={{ ["--i" as string]: 3 }}>
            {profile.location} · 6.3°S 107.1°E
          </p>
        </div>
      </div>

      <div className="frame relative flex flex-1 flex-col">
        <div className="relative grid-12 flex-1 content-center gap-y-8 py-10 md:py-12">
          <h1 id="hero-title" className="relative z-10 col-span-4 md:col-span-12">
            <span className="sr-only">{profile.name} — </span>
            <span className="display block text-[clamp(4.25rem,0.5rem+15.5vw,20rem)] uppercase leading-[0.8] tracking-[-0.035em]">
              <span className="mask" style={{ ["--i" as string]: 0 }}>
                <span>{hero.words[0]}</span>
              </span>
              <span className="mask pl-[8vw] md:pl-[9%]" style={{ ["--i" as string]: 1 }}>
                <span>{hero.words[1]}</span>
              </span>
            </span>
            <span className="mask accent-serif -mt-[0.05em] block text-right text-[clamp(3.25rem,0.5rem+11.5vw,15rem)] leading-[0.95] tracking-[-0.03em] text-sage-ink md:pr-[3%]" style={{ ["--i" as string]: 2 }}>
              <span>{hero.words[2].toLowerCase()}</span>
            </span>
          </h1>

          {/* Fig. 0 — interactive process map, sits behind the type on large screens */}
          <figure
            className="hero-fig col-span-4 mx-auto w-full max-w-[26rem] md:col-span-6 md:col-start-7 lg:absolute lg:right-0 lg:top-2 lg:z-20 lg:flex lg:flex-col-reverse lg:w-[clamp(19rem,27vw,36rem)] lg:max-w-none"
            data-reveal
          >
            <HeroSystem className="aspect-square w-full text-ink" />
            <figcaption className="meta mt-3 flex justify-between gap-4 text-stone lg:mb-3 lg:mt-0">
              <span>Fig. 0 — A process is a set of relationships</span>
              <span className="hidden lg:inline">Point to explore</span>
            </figcaption>
          </figure>
        </div>

        {/* Name, statement, actions */}
        <div className="grid-12 items-end gap-y-8 border-t border-line/15 pb-8 pt-6 md:pb-10">
          <div className="fade col-span-4 md:col-span-4" style={{ ["--i" as string]: 4 }}>
            <p className="display text-h3 uppercase">{profile.name}</p>
            <p className="mt-2 text-small text-stone">
              Information Systems undergraduate, President University.
              <br />
              HRIS Intern, People &amp; Culture, Mattel Indonesia.
            </p>
          </div>
          <p className="fade col-span-4 max-w-measure text-lead md:col-span-5 md:col-start-6" style={{ ["--i" as string]: 5 }}>
            {hero.statement}
          </p>
          <div className="fade col-span-4 flex flex-wrap items-center gap-x-6 gap-y-3 md:col-span-3 md:col-start-11 md:flex-col md:items-end lg:col-span-2 lg:col-start-11" style={{ ["--i" as string]: 6 }}>
            <a href="#work" className="slab">
              Selected work <ArrowDown size={15} />
            </a>
            <a href={profile.resumeUrl} className="ghost ink-link !min-h-0 py-2">
              Résumé · PDF
            </a>
          </div>
        </div>

        <div aria-hidden className="pointer-events-none absolute bottom-10 left-1/2 hidden h-14 w-px -translate-x-1/2 overflow-hidden bg-line/15 2xl:block">
          <span className="cue-line block h-full w-full bg-ink" />
        </div>
      </div>
    </section>
  );
}
