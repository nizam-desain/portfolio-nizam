import type { Work } from "@/data/content";
import { cn } from "@/lib/utils";

const copy: Record<Work["evidence"], string> = {
  confirmed: "Completed",
  ongoing: "In progress",
  concept: "Proposal / concept",
};

/** Status marker: a small shape + label. Shape differs per state so it never relies on colour alone. */
export function Evidence({ value, status, className }: { value: Work["evidence"]; status?: string; className?: string }) {
  return (
    <span className={cn("meta inline-flex items-center gap-2", className)}>
      <span aria-hidden className="inline-block h-2 w-2">
        {value === "confirmed" ? (
          <span className="block h-2 w-2 bg-sage-ink" />
        ) : value === "ongoing" ? (
          <span className="block h-2 w-2 border border-current" style={{ background: "linear-gradient(90deg, currentColor 50%, transparent 50%)" }} />
        ) : (
          <span className="block h-2 w-2 rotate-45 border border-current" />
        )}
      </span>
      {status ?? copy[value]}
    </span>
  );
}
