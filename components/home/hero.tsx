import Image from "next/image";
import { hero, profile } from "@/data/content";
import { HeroDepth } from "@/components/home/hero-depth";
import { ArrowDown } from "@/components/ui/glyphs";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="now after-opening relative overflow-hidden pt-[calc(var(--header-h)+1.5rem)]" data-reveal>
      {/* ambient light */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="glow absolute -right-[10%] top-[-10%] h-[70vh] w-[55vw] rounded-full bg-[radial-gradient(closest-side,rgb(var(--lav)/0.45),transparent)] blur-2xl" />
        <div className="glow absolute -left-[10%] bottom-[-20%] h-[60vh] w-[45vw] rounded-full bg-[radial-gradient(closest-side,rgb(var(--teal)/0.28),transparent)] blur-2xl [animation-delay:-6s]" />
      </div>

      <div className="frame grid-12 items-center gap-y-12 pb-16 md:pb-24 lg:min-h-[calc(100svh-var(--header-h))]">
        <div className="col-span-4 md:col-span-12 lg:col-span-7">
          <p className="eyebrow fade">{profile.name} · Portfolio 2026</p>
          <h1 id="hero-title" className="display mt-6 text-mega">
            <span className="sr-only">{profile.name} — </span>
            {hero.lines.map((l, i) => (
              <span key={l} className="mask" style={{ ["--i" as string]: i }}>
                <span>
                  {l}
                  {i === hero.lines.length - 1 ? (
                    <>
                      {" "}
                      <span className="accent-serif text-gradient pr-[0.08em]">{hero.accent}</span>
                    </>
                  ) : null}
                </span>
              </span>
            ))}
          </h1>
          <p className="fade mt-8 max-w-[38rem] text-lead text-graphite" style={{ ["--i" as string]: 4 }}>
            {hero.statement}
          </p>
          <ul className="fade mt-6 flex flex-wrap gap-x-5 gap-y-2 text-small font-semibold text-stone" style={{ ["--i" as string]: 5 }} aria-label="Disciplines">
            {hero.disciplines.map((d, i) => (
              <li key={d} className="flex items-center gap-2">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: ["rgb(var(--sage-ink))", "rgb(var(--oxide))", "rgb(var(--teal))", "rgb(var(--lav))"][i % 4] }} />
                {d}
              </li>
            ))}
          </ul>
          <div className="fade mt-10 flex flex-wrap items-center gap-4" style={{ ["--i" as string]: 6 }}>
            <a href="#work" className="slab">
              See selected work <ArrowDown size={16} />
            </a>
            <a href={profile.resumeUrl} className="ghost ink-link !min-h-0 py-1">
              Résumé (PDF)
            </a>
          </div>
        </div>

        {/* Layered composition: original 3D still life + real portrait + role card */}
        <div className="col-span-4 md:col-span-8 md:col-start-3 lg:col-span-5 lg:col-start-8">
          <HeroDepth>
            <div className="hero-img img-frame relative aspect-[4/5] w-full" data-depth="0.4">
              <Image src="/art/hero.jpg" alt="Original 3D still life: a stack of paper forms, a teal arch, a glass cube with an indigo core and a peach sphere" fill priority sizes="(min-width: 1024px) 38vw, 90vw" className="object-cover" />
              <span className="absolute right-3 top-3 rounded-full bg-white/70 px-3 py-1 text-[0.7rem] font-semibold text-[#20242C] backdrop-blur-md">Original artwork</span>
            </div>
            <div className="fade absolute -bottom-8 -left-4 w-[42%] sm:-left-10" style={{ ["--i" as string]: 7 }} data-depth="1">
              <div className="img-frame aspect-[4/5] rotate-[-3deg] ring-4 ring-paper">
                <Image src={profile.portrait.src} alt={`Portrait of ${profile.name}`} fill sizes="(min-width: 1024px) 16vw, 40vw" className="object-cover object-[50%_25%]" />
              </div>
            </div>
            <div className="fade card absolute -right-3 top-[58%] w-[62%] p-4 backdrop-blur-xl sm:-right-8 sm:p-5" style={{ ["--i" as string]: 8 }} data-depth="1.6">
              <p className="meta text-sage-ink">Currently</p>
              <p className="mt-1.5 text-small font-semibold leading-snug">{profile.role}</p>
              <p className="text-small text-stone">Mattel Indonesia · {profile.location}</p>
            </div>
          </HeroDepth>
        </div>
      </div>
    </section>
  );
}
