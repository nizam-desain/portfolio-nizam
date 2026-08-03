"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/content";

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-panel max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="eyebrow">{project.category}</span>
                <h3 id="project-modal-title" className="mt-2 text-2xl font-medium">
                  {project.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border border-line hover:bg-white/5"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-4 text-xs text-ink-muted">
              <span>{project.role}</span>
              <span>·</span>
              <span>{project.timeline}</span>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="text-xs font-medium uppercase tracking-widest text-accent-blue">
                  Problem
                </h4>
                <p className="mt-2 text-sm text-ink-muted">{project.problem}</p>
              </div>
              <div>
                <h4 className="text-xs font-medium uppercase tracking-widest text-accent-purple">
                  Solution
                </h4>
                <p className="mt-2 text-sm text-ink-muted">{project.solution}</p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-xs font-medium uppercase tracking-widest text-ink-muted">
                Impact
              </h4>
              <ul className="mt-3 grid gap-2 sm:grid-cols-3">
                {project.impact.map((point) => (
                  <li
                    key={point}
                    className="rounded-lg border border-line px-3 py-2 text-xs text-ink"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="text-xs font-medium uppercase tracking-widest text-ink-muted">
                  Challenges
                </h4>
                <p className="mt-2 text-sm text-ink-muted">{project.challenges}</p>
              </div>
              <div>
                <h4 className="text-xs font-medium uppercase tracking-widest text-ink-muted">
                  Lessons learned
                </h4>
                <p className="mt-2 text-sm text-ink-muted">{project.lessons}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-ink-muted"
                >
                  {tool}
                </span>
              ))}
            </div>

            {project.links.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3 border-t border-line pt-6">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-medium hover:bg-white/5"
                  >
                    {link.label} <ArrowUpRight size={13} />
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
