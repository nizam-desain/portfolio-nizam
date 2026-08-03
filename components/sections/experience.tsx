import { Briefcase } from "lucide-react";
import { experience } from "@/data/content";
import { Reveal } from "@/components/ui/reveal";

export function Experience() {
  return (
    <section id="experience" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="eyebrow">Experience</span>
          <h2 className="section-heading mt-4">Where the work happened.</h2>
        </Reveal>

        <div className="mt-16 space-y-6">
          {experience.map((role, i) => (
            <Reveal key={role.company + role.role} index={i} className="card-surface grid gap-6 p-8 md:grid-cols-[220px_1fr]">
              <div>
                <div className="flex items-center gap-2 text-accent-blue">
                  <Briefcase size={16} />
                  <span className="font-mono text-xs">{role.duration}</span>
                </div>
                <h3 className="mt-2 text-lg font-medium">{role.company}</h3>
                <p className="text-sm text-ink-muted">{role.role}</p>
              </div>
              <div>
                <p className="text-sm text-ink-muted">{role.description}</p>
                <ul className="mt-4 space-y-2">
                  {role.achievements.map((a) => (
                    <li key={a} className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent-purple" />
                      {a}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {role.technologies.map((t) => (
                    <span key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-ink-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
