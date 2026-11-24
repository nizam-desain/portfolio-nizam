import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/* Small diagram kit shared by the case-study visuals. HTML + CSS, so every
   figure reflows from a horizontal layout (md+) to a vertical one on phones. */

export const i = (n: number) => ({ ["--i" as string]: n }) as CSSProperties;

type Tone = "plain" | "ink" | "sage" | "oxide" | "ghost";

export function Node({
  role,
  label,
  tone = "plain",
  shape = "box",
  note,
  n,
  className,
}: {
  role?: string;
  label: ReactNode;
  tone?: Tone;
  shape?: "box" | "diamond" | "doc";
  note?: ReactNode;
  n?: number;
  className?: string;
}) {
  const t = {
    plain: "border-line/25 bg-card text-ink shadow-[0_6px_16px_-12px_rgb(var(--shadow)/0.35)]",
    ink: "border-transparent bg-ink text-paper",
    sage: "border-transparent bg-sage text-[#14202b]",
    oxide: "border-oxide bg-oxide text-paper",
    ghost: "border-dashed border-line/40 bg-transparent text-stone",
  }[tone];
  return (
    <div className={cn("fade relative flex min-w-0 flex-1 flex-col", className)} style={n !== undefined ? i(n) : undefined}>
      {role ? <span className="meta mb-1.5 truncate text-stone">{role}</span> : null}
      <div
        className={cn(
          "relative flex min-h-[3.75rem] items-center rounded-xl border px-3 py-2.5 text-small font-medium leading-snug",
          t,
          shape === "doc" && "rounded-tr-none [clip-path:polygon(0_0,calc(100%-12px)_0,100%_12px,100%_100%,0_100%)]",
        )}
      >
        {shape === "diamond" ? (
          <span aria-hidden className="mr-2.5 inline-block h-2.5 w-2.5 shrink-0 rotate-45 border border-current" />
        ) : null}
        <span>{label}</span>
      </div>
      {note ? <span className="mt-1.5 text-[0.75rem] leading-snug text-stone">{note}</span> : null}
    </div>
  );
}

/** Connector between nodes: vertical on phones, horizontal from md. */
export function Conn({ tone = "ink", broken = false }: { tone?: "ink" | "oxide" | "sage"; broken?: boolean }) {
  const c = tone === "oxide" ? "bg-oxide text-oxide" : tone === "sage" ? "bg-sage-ink text-sage-ink" : "bg-ink text-ink";
  return (
    <span aria-hidden className="relative flex shrink-0 items-center justify-center self-center py-1 md:mt-5 md:w-8 md:py-0 lg:w-10">
      <span className={cn("block h-6 w-px md:h-px md:w-full", c, broken && "opacity-40 [background:repeating-linear-gradient(currentColor_0_3px,transparent_3px_6px)] md:[background:repeating-linear-gradient(90deg,currentColor_0_3px,transparent_3px_6px)]")} />
      <span className={cn("absolute bottom-0 block h-0 w-0 border-x-[4px] border-t-[6px] border-x-transparent md:bottom-auto md:right-0 md:border-y-[4px] md:border-l-[6px] md:border-r-0 md:border-y-transparent md:border-t-transparent", tone === "oxide" ? "border-t-oxide md:border-l-oxide" : tone === "sage" ? "border-t-sage-ink md:border-l-sage-ink" : "border-t-ink md:border-l-ink")} />
      {broken ? <span className="absolute grid h-4 w-4 place-items-center bg-paper font-mono text-[0.8rem] leading-none text-oxide">×</span> : null}
    </span>
  );
}

/** A row of nodes with connectors. */
export function Chain({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex flex-col md:flex-row md:items-start", className)}>{children}</div>;
}

export function Legend({ items }: { items: { swatch: ReactNode; label: string }[] }) {
  return (
    <ul className="meta mt-6 flex flex-wrap gap-x-6 gap-y-2 text-stone" aria-label="Legend">
      {items.map((it) => (
        <li key={it.label} className="flex items-center gap-2">
          {it.swatch}
          {it.label}
        </li>
      ))}
    </ul>
  );
}

export const Sw = {
  ink: <span aria-hidden className="block h-2.5 w-4 bg-ink" />,
  sage: <span aria-hidden className="block h-2.5 w-4 border border-sage-ink bg-sage" />,
  oxide: <span aria-hidden className="block h-2.5 w-4 bg-oxide" />,
  plain: <span aria-hidden className="block h-2.5 w-4 border border-ink" />,
  ghost: <span aria-hidden className="block h-2.5 w-4 border border-dashed border-ink/50" />,
  diamond: <span aria-hidden className="block h-2.5 w-2.5 rotate-45 border border-ink" />,
};

/** Figure frame with a caption line. */
export function Plate({ children, caption, className }: { children: ReactNode; caption?: string; className?: string }) {
  return (
    <figure className={cn("card p-4 sm:p-6 md:p-8", className)}>
      {children}
      {caption ? <figcaption className="mt-6 border-t border-line/10 pt-3 text-small text-stone">{caption}</figcaption> : null}
    </figure>
  );
}
