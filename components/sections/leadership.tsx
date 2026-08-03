import { Users, Award, Trophy, ExternalLink } from "lucide-react";
import { leadership, certifications, achievements } from "@/data/content";
import { Reveal } from "@/components/ui/reveal";

export function Leadership() {
  return (
    <section id="leadership" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="eyebrow">Beyond the Classroom</span>
          <h2 className="section-heading mt-4">Leadership, credentials, and wins.</h2>
        </Reveal>

        {/* Leadership */}
        <div className="mt-16">
          <Reveal className="mb-6 flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-ink-muted">
            <Users size={16} /> Leadership & Organizations
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {leadership.map((l, i) => (
              <Reveal key={l.org + l.role} index={i} className="card-surface p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-medium">{l.role}</h3>
                  <span className="font-mono text-xs text-ink-muted whitespace-nowrap">{l.period}</span>
                </div>
                <p className="text-sm text-accent-purple">{l.org}</p>
                <p className="mt-2 text-sm text-ink-muted">{l.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-20">
          <Reveal className="mb-6 flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-ink-muted">
            <Award size={16} /> Certifications
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((c, i) => (
              <Reveal key={c.name} index={i} className="card-surface flex flex-col p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-accent-blue/20 to-accent-purple/20">
                  <Award size={18} className="text-accent-blue" />
                </div>
                <h3 className="mt-4 text-sm font-medium leading-snug">{c.name}</h3>
                <p className="mt-1 text-xs text-ink-muted">{c.provider} · {c.date}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {c.skills.map((s) => (
                    <span key={s} className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] text-ink-muted">
                      {s}
                    </span>
                  ))}
                </div>
                <a 
                  href={c.credentialUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-accent-blue hover:opacity-80 transition-opacity"
                >
                  Show credential <ExternalLink size={11} />
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-20">
          <Reveal className="mb-6 flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-ink-muted">
            <Trophy size={16} /> Achievements & Awards
          </Reveal>
          <div className="space-y-3">
            {achievements.map((a, i) => (
              <Reveal
                key={a.title}
                index={i}
                className="flex flex-col justify-between gap-4 rounded-xl border border-line px-6 py-4 sm:flex-row sm:items-center"
              >
                <div>
                  <h3 className="text-sm font-medium">{a.title}</h3>
                  <p className="text-xs text-ink-muted">{a.org}</p>
                </div>
                
                <div className="flex items-center gap-5">
                  {a.link && (
                    <a 
                      href={a.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-accent-blue hover:opacity-80 transition-opacity"
                    >
                      Show Certificate <ExternalLink size={11} />
                    </a>
                  )}
                  <span className="font-mono text-xs text-ink-muted">{a.year}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}