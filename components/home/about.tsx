import Image from "next/image";
import { about, profile, education } from "@/data/content";
import { SectionMark } from "@/components/ui/section-mark";
import { Parallax } from "@/components/ui/parallax";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-section">
      <div className="frame">
        <SectionMark ref_="03" label="About" note="In my own words" />

        <div className="grid-12 mt-14 gap-y-14 md:mt-20">
          {/* Plate */}
          <figure className="col-span-4 md:col-span-4 lg:col-span-4" data-reveal>
            <div className="reg wipe relative">
              <Parallax range={28} className="relative aspect-[4/5] overflow-hidden bg-sheet">
                <Image
                  src={profile.portrait.src}
                  alt={`Portrait of ${profile.name}`}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 33vw, 100vw"
                  className="scale-[1.08] object-cover object-[50%_28%]"
                  quality={85}
                />
              </Parallax>
            </div>
            <figcaption className="meta mt-4 flex justify-between text-stone">
              <span>Plate 1 — {profile.name}</span>
              <span>Cikarang</span>
            </figcaption>
          </figure>

          {/* Text */}
          <div className="col-span-4 md:col-span-7 md:col-start-6" data-reveal>
            <h2 id="about-title" className="text-[clamp(1.75rem,1.1rem+2.6vw,3.5rem)] leading-[1.08] tracking-[-0.02em]">
              <span className="fade block">
                I&apos;m interested in the distance between how a process is{" "}
                <span className="accent-serif text-sage-ink">supposed</span> to work and how it{" "}
                <span className="accent-serif text-sage-ink">actually</span> works.
              </span>
            </h2>

            <div className="mt-12 gap-gutter space-y-5 text-graphite lg:columns-2 lg:space-y-0 [&>p]:mb-5 [&>p]:break-inside-avoid">
              {about.paragraphs.map((p, i) => (
                <p key={i} className="fade" style={{ ["--i" as string]: i + 1 }}>
                  {p}
                </p>
              ))}
            </div>

            <blockquote className="fade relative mt-14 border-l-2 border-oxide py-1 pl-6" style={{ ["--i" as string]: 4 }}>
              <p className="meta text-oxide">A working principle</p>
              <p className="display mt-3 text-h2 uppercase">{about.principle}</p>
            </blockquote>

            <dl className="mt-14 border-t border-line/90">
              {about.facts.map((f, i) => (
                <div key={f.label} className="fade grid grid-cols-[8rem_1fr] gap-4 border-b border-line/15 py-3.5 md:grid-cols-[10rem_1fr]" style={{ ["--i" as string]: i }}>
                  <dt className="meta pt-0.5 text-stone">{f.label}</dt>
                  <dd className="text-small">{f.value}</dd>
                </div>
              ))}
              <div className="grid grid-cols-[8rem_1fr] gap-4 border-b border-line/15 py-3.5 md:grid-cols-[10rem_1fr]">
                <dt className="meta pt-0.5 text-stone">Coursework</dt>
                <dd className="text-small">{education.details[2].value}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
