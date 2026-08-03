import { tools } from "@/data/content";
import { Reveal } from "@/components/ui/reveal";

export function Tools() {
  const loop = [...tools, ...tools];

  return (
    <section className="relative overflow-hidden border-y border-line py-16">
      <Reveal className="mx-auto mb-8 max-w-6xl px-6">
        <span className="eyebrow">Tooling</span>
        <p className="mt-3 text-sm text-ink-muted">
          The everyday stack — from spreadsheets and ERP consoles to code editors.
        </p>
      </Reveal>
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex animate-marquee gap-3 whitespace-nowrap">
          {loop.map((tool, i) => (
            <span
              key={tool + i}
              className="flex-shrink-0 rounded-full border border-line px-5 py-2.5 font-mono text-sm text-ink-muted"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
