"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, ArrowUpRight, LayoutGrid, Loader2 } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { ProjectModal } from "./project-modal";
import { supabase } from "@/lib/supabase";

export function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<any | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching projects:", error.message);
      } else if (data) {
        setProjects(data);
      }
      setIsLoading(false);
    }

    fetchProjects();
  }, []);

  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery =
        query.trim() === "" ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.summary.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, category, projects]);

  return (
    <section id="projects" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">Selected Work</span>
            <h2 className="section-heading mt-4">
              Real problems, systems that fixed them.
            </h2>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-line px-4 py-2.5 md:w-72">
            <Search size={14} className="text-ink-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-ink-muted"
              suppressHydrationWarning
              autoComplete="off"
            />
          </div>
        </Reveal>

        <Reveal index={1} className="mt-8 flex flex-wrap items-center gap-2">
          <LayoutGrid size={14} className="mr-1 text-ink-muted" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                category === cat
                  ? "border-accent-blue bg-accent-blue/10 text-accent-blue"
                  : "border-line text-ink-muted hover:text-ink"
              }`}
              suppressHydrationWarning
            >
              {cat}
            </button>
          ))}
        </Reveal>

        <div className="mt-14 space-y-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-ink-muted">
              <Loader2 className="h-8 w-8 animate-spin text-accent-blue mb-4" />
              <p className="text-sm">Fetching projects from Supabase...</p>
            </div>
          ) : filtered.length === 0 ? (
            <p className="py-16 text-center text-sm text-ink-muted">
              No projects match “{query}.”
            </p>
          ) : (
            filtered.map((project, i) => (
              <Reveal key={project.slug} index={i}>
                <motion.button
                  onClick={() => setSelected(project)}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className={`group grid w-full grid-cols-1 items-center gap-8 rounded-xl2 border border-line bg-white/[0.02] p-8 text-left md:grid-cols-[0.9fr_1.1fr] ${
                    i % 2 === 1 ? "md:[direction:rtl]" : ""
                  }`}
                >
                  <div
                    className={`relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-accent-blue/15 via-accent-purple/10 to-transparent [direction:ltr] ${
                      i % 2 === 1 ? "md:order-2" : ""
                    }`}
                  >
                    <div className="absolute inset-0 bg-grid-pattern bg-[size:24px_24px] opacity-40" />
                    <div className="absolute bottom-4 left-4 rounded-full border border-line bg-canvas/60 px-3 py-1 font-mono text-[10px] backdrop-blur">
                      {project.category}
                    </div>
                  </div>
                  <div className="[direction:ltr]">
                    <h3 className="text-2xl font-medium transition-colors group-hover:text-accent-blue">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-sm text-ink-muted">{project.summary}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {Array.isArray(project.tools) && project.tools.slice(0, 4).map((tool: string) => (
                        <span
                          key={tool}
                          className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-ink-muted"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent-blue">
                      View case study
                      <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </motion.button>
              </Reveal>
            ))
          )}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}