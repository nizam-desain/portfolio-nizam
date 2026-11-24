import { cn } from "@/lib/utils";

/** The document reference that opens every section: "§01 — Selected work", with a ruled line. */
export function SectionMark({
  ref_,
  label,
  note,
  className,
  invert = false,
}: {
  ref_: string;
  label: string;
  note?: string;
  className?: string;
  invert?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-4", className)} data-reveal>
      <p className={cn("meta shrink-0", invert ? "text-ivory" : "text-ink")}>
        <span className={invert ? "text-sage" : "text-oxide"}>§{ref_}</span> — {label}
      </p>
      <span aria-hidden className={cn("draw-x block h-px flex-1", invert ? "bg-ivory/25" : "bg-line/20")} />
      {note ? <p className={cn("meta hidden shrink-0 sm:block", invert ? "text-ivory/50" : "text-stone")}>{note}</p> : null}
    </div>
  );
}
