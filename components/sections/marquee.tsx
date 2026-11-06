import { Fragment } from "react";

const phrases = [
  "Business Analysis",
  "Process Improvement",
  "Strategy & Operations",
  "Stakeholder Collaboration",
  "Problem Solving",
];

function Row() {
  return (
    <div className="flex shrink-0 items-center">
      {phrases.map((p, i) => (
        <Fragment key={p}>
          <span
            className={
              i % 2 === 0
                ? "whitespace-nowrap px-6 font-serif text-[clamp(2.25rem,5.6vw,4.75rem)] leading-none text-ink sm:px-10"
                : "whitespace-nowrap px-6 font-serif text-[clamp(2.25rem,5.6vw,4.75rem)] italic leading-none text-accent sm:px-10"
            }
          >
            {p}
          </span>
          <svg viewBox="0 0 20 26" className="h-6 w-5 shrink-0 text-muted sm:h-8 sm:w-6" fill="none" aria-hidden>
            <path d="M1 26 V10 A9 9 0 0 1 19 10 V26" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </Fragment>
      ))}
    </div>
  );
}

/**
 * The page's single kinetic-typography moment: a bridge from Experience to the
 * case studies. CSS-only transform loop (no JS), two identical halves for a
 * seamless join, pauses on hover/focus, static under reduced motion. The moving
 * text is hidden from assistive tech; a plain list carries the same content.
 */
export function Marquee() {
  return (
    <section aria-labelledby="bridge-title" className="relative border-b border-line pb-14 pt-24 sm:pb-16 sm:pt-28">
      <div className="container-page flex items-center gap-4">
        <span className="reg-mark text-accent" aria-hidden />
        <h2 id="bridge-title" className="eyebrow">
          From the role to the work
        </h2>
        <span className="h-px flex-1 bg-line" aria-hidden />
      </div>
      <ul className="sr-only">
        {phrases.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <div
        className="marquee mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        aria-hidden
      >
        <div className="marquee-track flex w-max [--marquee-duration:70s] md:[--marquee-duration:52s]">
          <Row />
          <Row />
        </div>
      </div>
    </section>
  );
}
