import type { Motif } from "@/data/content";
import { cn } from "@/lib/utils";

/**
 * Original, generated project covers. Each motif abstracts the shape of the
 * work (swim lanes, approval gates, a stepper, a network…). They are
 * conceptual artwork, never screenshots, and are labelled as such.
 */
type Tone = "ink" | "sheet" | "sage";

export function Cover({
  motif,
  index,
  tone = "ink",
  className,
  label = true,
}: {
  motif: Motif;
  index: string;
  tone?: Tone;
  className?: string;
  label?: boolean;
}) {
  const ground = tone === "ink" ? "#101110" : tone === "sage" ? "#B8CB9B" : "#E4E1D6";
  const fg = tone === "ink" ? "#F2F0E8" : "#101110";
  const accent = tone === "ink" ? "#B8CB9B" : tone === "sage" ? "#101110" : "#A3441C";
  const soft = tone === "ink" ? "rgba(242,240,232,0.16)" : "rgba(16,17,16,0.16)";

  return (
    <div className={cn("relative overflow-hidden", className)} style={{ background: ground }}>
      <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden focusable={false}>
        {/* grid */}
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`g${i}`} x1={i * 100} y1="0" x2={i * 100} y2="600" stroke={soft} strokeWidth="1" />
        ))}
        {Array.from({ length: 7 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 100} x2="800" y2={i * 100} stroke={soft} strokeWidth="1" />
        ))}
        <g className="cover-art">{art(motif, fg, accent, soft)}</g>
      </svg>
      <span
        className="display pointer-events-none absolute -bottom-[0.14em] right-[3%] select-none leading-none"
        style={{ color: fg, fontSize: "clamp(5rem, 16vw, 15rem)", opacity: 0.92 }}
        aria-hidden
      >
        {index}
      </span>
      {label ? (
        <span className="meta absolute left-4 top-4" style={{ color: fg, opacity: 0.6 }}>
          Conceptual cover
        </span>
      ) : null}
    </div>
  );
}

function art(m: Motif, fg: string, ac: string, soft: string) {
  const sw = 2;
  switch (m) {
    case "lanes":
      return (
        <>
          {[150, 300, 450].map((y) => (
            <line key={y} x1="0" y1={y} x2="800" y2={y} stroke={fg} strokeOpacity="0.35" strokeWidth="1" />
          ))}
          {[
            [90, 75],
            [250, 225],
            [380, 225],
            [430, 375],
            [560, 225],
            [680, 75],
          ].map(([x, y], i) => (
            <rect key={i} x={x - 34} y={y - 22} width="68" height="44" fill={i === 4 ? ac : "none"} stroke={fg} strokeWidth={sw} />
          ))}
          <path d="M124 75 H200 V225 H216 M284 225 H346 M414 225 V375 M464 375 H500 V225 H526 M594 225 H630 V75 H646" fill="none" stroke={ac} strokeWidth="3" />
        </>
      );
    case "gate":
      return (
        <>
          {[140, 300, 460, 620].map((x, i) => (
            <g key={x}>
              <line x1={x} y1="110" x2={x} y2="400" stroke={fg} strokeWidth={i === 2 ? 6 : sw} />
            </g>
          ))}
          <path d="M60 255 H380" stroke={fg} strokeWidth={sw} />
          <path d="M380 255 l40 -40 40 40 -40 40Z" fill={ac} />
          <path d="M460 255 H740" stroke={fg} strokeWidth={sw} />
          <path d="M420 295 V460 H200 V280" fill="none" stroke={ac} strokeWidth="2.5" strokeDasharray="8 8" />
          <circle cx="740" cy="255" r="10" fill={fg} />
        </>
      );
    case "stepper":
      return (
        <>
          <rect x="420" y="80" width="260" height="340" fill="none" stroke={fg} strokeWidth={sw} />
          {[130, 170, 210, 250, 290, 330].map((y, i) => (
            <line key={y} x1="452" y1={y} x2={i % 2 ? 600 : 648} y2={y} stroke={fg} strokeOpacity="0.55" strokeWidth="2" />
          ))}
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <circle cx={110 + i * 110} cy="250" r="26" fill={i < 2 ? ac : "none"} stroke={i < 2 ? ac : fg} strokeWidth={sw} />
              {i < 2 ? <line x1={136 + i * 110} y1="250" x2={194 + i * 110} y2="250" stroke={fg} strokeWidth={sw} /> : null}
            </g>
          ))}
        </>
      );
    case "network": {
      const hubs = [
        [120, 140],
        [330, 90],
        [520, 200],
        [700, 120],
        [240, 330],
        [460, 400],
        [660, 360],
      ];
      const links = [
        [0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [5, 6], [2, 5], [3, 6], [1, 4],
      ];
      return (
        <>
          {links.map(([a, b], i) => (
            <line key={i} x1={hubs[a][0]} y1={hubs[a][1]} x2={hubs[b][0]} y2={hubs[b][1]} stroke={fg} strokeOpacity="0.4" strokeWidth="1.5" />
          ))}
          <polyline points={[0, 4, 5, 2, 3].map((i) => hubs[i].join(",")).join(" ")} fill="none" stroke={ac} strokeWidth="3.5" />
          {hubs.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === 5 ? 16 : 9} fill={i === 5 ? ac : fg} />
          ))}
        </>
      );
    }
    case "funnel":
      return (
        <>
          {[640, 500, 360, 220, 110].map((w, i) => (
            <rect key={w} x={400 - w / 2} y={90 + i * 62} width={w} height="38" fill={i === 4 ? ac : "none"} stroke={fg} strokeWidth={sw} />
          ))}
          <line x1="80" y1="70" x2="80" y2="420" stroke={soft} strokeWidth="1" />
        </>
      );
    case "modules":
      return (
        <>
          {[
            [90, 110],
            [330, 110],
            [90, 310],
            [330, 310],
          ].map(([x, y], i) => (
            <rect key={i} x={x} y={y} width="190" height="150" fill="none" stroke={fg} strokeWidth={sw} />
          ))}
          <path d="M60 185 H185 V385 H425 V185 H560 V300 H740" fill="none" stroke={ac} strokeWidth="3.5" />
          {[185, 425, 560].map((x, i) => (
            <circle key={i} cx={x} cy={i === 1 ? 385 : 185} r="8" fill={ac} />
          ))}
        </>
      );
    case "grid":
    default:
      return (
        <>
          {Array.from({ length: 6 }, (_, r) =>
            Array.from({ length: 8 }, (_, c) => (
              <rect
                key={`${r}-${c}`}
                x={70 + c * 70}
                y={70 + r * 60}
                width="56"
                height="44"
                fill={(r * 3 + c * 5) % 7 === 0 ? ac : "none"}
                stroke={fg}
                strokeOpacity={(r + c) % 3 === 0 ? 0.9 : 0.35}
                strokeWidth="1.5"
              />
            )),
          )}
        </>
      );
  }
}
