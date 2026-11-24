/**
 * Opening sequence: the wordmark assembles, a rule fills, the plate lifts.
 * CSS-only (see .opening in globals.css), once per session, about 2 s total,
 * never shown under reduced motion. aria-hidden: the page beneath is already
 * rendered and readable.
 */
export function Opening() {
  const word = "Zahrani";
  return (
    <div className="opening" aria-hidden>
      <div className="frame w-full">
        <p className="meta flex justify-between text-ivory/50">
          <span>Nizam Zahrani</span>
          <span>Portfolio — 2026</span>
        </p>
        <p className="display o-word mt-4 overflow-hidden whitespace-nowrap text-center uppercase leading-[0.8]" style={{ fontSize: "clamp(5rem, 24vw, 30rem)" }}>
          {word.split("").map((ch, i) => (
            <span key={i} style={{ ["--i" as string]: i }}>
              {ch}
            </span>
          ))}
        </p>
        <span className="o-bar mt-6 block h-px w-full bg-[#B8CB9B]" />
        <p className="meta mt-3 flex justify-between text-ivory/50">
          <span>Business · Systems · Perspective</span>
          <span>Cikarang, ID</span>
        </p>
      </div>
    </div>
  );
}
