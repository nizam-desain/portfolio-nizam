/**
 * Opening sequence: the wordmark assembles, a rule fills, the plate lifts.
 * CSS-only (see .opening in globals.css), once per session, about 2 s total,
 * never shown under reduced motion. aria-hidden: the page beneath is already
 * rendered and readable.
 */
export function Opening() {
  const word = "Nizam Zahrani";
  return (
    <div className="opening" aria-hidden>
      <div className="frame w-full">
        <p className="flex justify-between text-small font-semibold text-ivory/55">
          <span>Nizam Zahrani</span>
          <span>Portfolio — 2026</span>
        </p>
        <p className="display o-word mt-4 overflow-hidden whitespace-nowrap text-center leading-[1.05]" style={{ fontSize: "clamp(3.5rem, 9vw, 9rem)" }}>
          {word.split("").map((ch, i) => (
            <span key={i} style={{ ["--i" as string]: i }}>
              {ch === " " ? "\u00a0" : ch}
            </span>
          ))}
        </p>
        <span className="o-bar mt-6 block h-px w-full bg-gradient-to-r from-[#A8A4F4] to-[#75D4C5]" />
        <p className="mt-3 flex justify-between text-small font-semibold text-ivory/55">
          <span>Business · People · Technology · Design</span>
          <span>Cikarang, ID</span>
        </p>
      </div>
    </div>
  );
}
