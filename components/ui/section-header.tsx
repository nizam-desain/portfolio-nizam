import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** Editorial section opener: numbered label, hairline, serif heading. */
export function SectionHeader({
  index,
  label,
  title,
  intro,
  id,
  className,
}: {
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  id: string;
  className?: string;
}) {
  return (
    <header className={cn("grid gap-8 md:grid-cols-12", className)}>
      <Reveal className="md:col-span-12">
        <div className="flex items-center gap-4">
          <span className="eyebrow tabular-nums text-accent">{index}</span>
          <span className="h-px flex-1 bg-line" aria-hidden />
          <span className="eyebrow">{label}</span>
        </div>
      </Reveal>
      <Reveal delay={0.05} className="md:col-span-7">
        <h2 id={id} className="font-serif text-display-md text-ink">
          {title}
        </h2>
      </Reveal>
      {intro ? (
        <Reveal delay={0.12} className="self-end md:col-span-5">
          <p className="max-w-md text-[0.975rem] leading-relaxed text-muted">{intro}</p>
        </Reveal>
      ) : null}
    </header>
  );
}
