"use client";

import { useEffect, useState } from "react";
import { GraduationCap, Languages as LanguagesIcon, Award, Medal, ArrowUpRight } from "lucide-react";
import { aboutTimeline, coreValues, education, stats } from "@/data/content";
import { Reveal } from "@/components/ui/reveal";
import { Counter } from "@/components/ui/counter";
import { supabase } from "@/lib/supabase";

// Tipe data (Interface) biar Next.js seneng dan lolos Vercel
interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  category: string;
  credential_url: string | null;
}

interface Achievement {
  id: string;
  title: string;
  event_name: string;
  year: string;
  credential_url: string | null;
}

export function About() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    async function fetchData() {
      // Narik data Sertifikat
      const { data: certs } = await supabase
        .from("certifications")
        .select("*")
        .order("year", { ascending: false });
      if (certs) setCertifications(certs as Certification[]);

      // Narik data Penghargaan/Lomba
      const { data: achs } = await supabase
        .from("achievements")
        .select("*")
        .order("year", { ascending: false });
      if (achs) setAchievements(achs as Achievement[]);
    }

    fetchData();
  }, []);

  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="eyebrow">About</span>
          <h2 className="section-heading mt-4">
            Trained to see the whole process, not just the ticket.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((s, i) => (
            <Reveal key={s.label} index={i} className="card-surface p-6">
              <div className="font-mono text-3xl font-medium text-accent-blue sm:text-4xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm text-ink-muted">{s.label}</div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Timeline */}
          <div>
            <Reveal>
              <h3 className="text-sm font-medium uppercase tracking-widest text-ink-muted">
                Journey
              </h3>
            </Reveal>
            <ol className="mt-8 space-y-10 border-l border-line pl-8">
              {aboutTimeline.map((item, i) => (
                <Reveal as="li" className="relative" index={i} key={i}>
                  <span className="absolute -left-[calc(2rem+5px)] top-1 h-2.5 w-2.5 rounded-full bg-accent-blue ring-4 ring-accent-blue/15" />
                  <span className="font-mono text-xs text-accent-blue">{item.year}</span>
                  <h4 className="mt-1 text-lg font-medium">{item.title}</h4>
                  <p className="mt-1 text-sm text-ink-muted">{item.detail}</p>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* Education + values */}
          <div className="space-y-8">
            <Reveal className="card-surface p-7">
              <div className="flex items-center gap-2 text-accent-purple">
                <GraduationCap size={18} />
                <span className="text-sm font-medium">Education</span>
              </div>
              <h4 className="mt-3 text-lg font-medium">{education.degree}</h4>
              <p className="text-sm text-ink-muted">{education.specialization}</p>
              <p className="mt-1 text-sm text-ink-muted">{education.school}</p>
              <div className="mt-5 grid grid-cols-2 gap-4 border-t border-line pt-5 text-sm">
                <div>
                  <div className="text-ink-muted">GPA</div>
                  <div className="font-mono text-accent-blue">{education.gpa}</div>
                </div>
                <div>
                  <div className="text-ink-muted">Graduation</div>
                  <div className="font-mono">{education.graduation}</div>
                </div>
              </div>
              <div className="mt-5 flex items-start gap-2 border-t border-line pt-5 text-sm">
                <LanguagesIcon size={16} className="mt-0.5 text-ink-muted" />
                <span className="text-ink-muted">{education.languages.join(" · ")}</span>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 gap-4">
              {coreValues.map((v, i) => (
                <Reveal key={v.title} index={i} className="card-surface p-5">
                  <h5 className="text-sm font-medium">{v.title}</h5>
                  <p className="mt-1.5 text-xs text-ink-muted">{v.detail}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* =======================================================
            BAGIAN SERTIFIKAT & PENGHARGAAN DARI SUPABASE 
        ======================================================= */}
        <div className="mt-28 space-y-16">
          {/* BAGIAN SERTIFIKAT */}
          <Reveal>
            <div className="mb-12">
              <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold uppercase tracking-wider text-ink-muted">
                <Award size={20} /> Certifications
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {certifications.length === 0 ? (
                  <p className="text-sm text-ink-muted">No certifications loaded yet.</p>
                ) : (
                  certifications.map((cert) => (
                    <div key={cert.id} className="card-surface flex flex-col gap-4 p-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-blue/10 text-accent-blue">
                        <Award size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-ink">{cert.title}</h4>
                        <p className="text-sm text-ink-muted">{cert.issuer} • {cert.year}</p>
                        <span className="mt-2 inline-block rounded-full border border-line px-3 py-1 text-[10px] uppercase tracking-wider text-ink-muted">
                          {cert.category}
                        </span>
                      </div>
                      {cert.credential_url && (
                        <a
                          href={cert.credential_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-auto flex w-fit items-center gap-1 text-sm font-medium text-accent-blue transition-colors hover:text-accent-purple"
                        >
                          Show credential <ArrowUpRight size={14} />
                        </a>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </Reveal>

          {/* BAGIAN PENGHARGAAN & LOMBA */}
          <Reveal>
            <div>
              <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold uppercase tracking-wider text-ink-muted">
                <Medal size={20} /> Achievements & Awards
              </h3>
              <div className="flex flex-col gap-4">
                {achievements.length === 0 ? (
                  <p className="text-sm text-ink-muted">No achievements loaded yet.</p>
                ) : (
                  achievements.map((award) => (
                    <div key={award.id} className="flex flex-col gap-2 border-b border-line pb-4 last:border-0 md:flex-row md:items-center md:justify-between md:gap-0">
                      <div>
                        <h4 className="font-semibold text-ink">{award.title}</h4>
                        <p className="text-sm text-ink-muted">{award.event_name}</p>
                      </div>
                      <div className="flex items-center justify-between md:gap-4">
                        {award.credential_url && (
                          <a
                            href={award.credential_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-accent-blue transition-colors hover:text-accent-purple"
                          >
                            Show Certificate <ArrowUpRight size={14} className="inline" />
                          </a>
                        )}
                        <span className="text-sm font-mono text-ink-muted">{award.year}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}