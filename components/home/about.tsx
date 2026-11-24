import Image from "next/image";
import { about, profile, education } from "@/data/content";
import { Parallax } from "@/components/ui/parallax";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="tone-peach overflow-x-clip py-section">
      <div className="frame grid-12 items-center gap-y-14">
        <figure className="col-span-4 md:col-span-5" data-reveal>
          <div className="relative mx-auto max-w-md">
            <div aria-hidden className="absolute -inset-4 -z-0 rotate-[3deg] rounded-[36px] bg-gradient-to-br from-[rgb(var(--lav)/0.55)] via-[rgb(var(--oxide)/0.25)] to-[rgb(var(--teal)/0.45)]" />
            <div className="img-frame reveal-img relative aspect-[4/5]">
              <Parallax range={22} className="absolute inset-0">
                <Image src={profile.portrait.src} alt={`Portrait of ${profile.name}`} fill sizes="(min-width: 768px) 36vw, 90vw" className="scale-[1.08] object-cover object-[50%_28%]" quality={85} />
              </Parallax>
            </div>
          </div>
          <figcaption className="mt-6 text-center text-small text-stone">{profile.name} · {profile.location}</figcaption>
        </figure>

        <div className="col-span-4 md:col-span-6 md:col-start-7" data-reveal>
          <p className="eyebrow fade">About</p>
          <h2 id="about-title" className="display fade mt-4 text-h1" style={{ ["--i" as string]: 1 }}>
            I like understanding how things <span className="accent-serif text-sage-ink">really</span> work — then making them clearer.
          </h2>
          <div className="mt-8 space-y-4 text-lead text-graphite">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="fade" style={{ ["--i" as string]: i + 2 }}>{p}</p>
            ))}
            <p className="fade" style={{ ["--i" as string]: 4 }}>
              Outside the brief I&apos;m drawn to interface design, visual storytelling and how technology changes the way teams work — this site is part of that exploration.
            </p>
          </div>

          <blockquote className="fade card mt-10 p-6 md:p-8" style={{ ["--i" as string]: 5 }}>
            <p className="text-small font-semibold text-oxide">A working principle</p>
            <p className="display mt-2 text-h3">“{about.principle}”</p>
          </blockquote>

          <dl className="mt-8 grid gap-3 sm:grid-cols-2">
            {[...about.facts.slice(0, 4), { label: "Coursework", value: education.details[2].value }].map((f, i) => (
              <div key={f.label} className="fade rounded-2xl bg-card/70 p-4 backdrop-blur" style={{ ["--i" as string]: i }}>
                <dt className="text-small font-semibold text-sage-ink">{f.label}</dt>
                <dd className="mt-1 text-small">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
