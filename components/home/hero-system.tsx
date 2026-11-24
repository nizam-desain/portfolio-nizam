"use client";

import { useCallback, useId, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Fig. 0 — "A process is a set of relationships."
 * An abstract process map: steps, documents, a rule (decision), an
 * exception loop and the people around it. Pointing at a node highlights
 * the relationships it depends on. Purely illustrative, not a real system.
 */
type Kind = "step" | "doc" | "decision" | "friction" | "actor";
type Node = { id: string; x: number; y: number; label: string; kind: Kind; note: string };

const NODES: Node[] = [
  { id: "req", x: 78, y: 128, label: "Request", kind: "step", note: "Where the work starts: who asks, for what." },
  { id: "intake", x: 222, y: 70, label: "Intake", kind: "doc", note: "What gets written down — and what doesn't." },
  { id: "rule", x: 336, y: 196, label: "Rule", kind: "decision", note: "The business rule that decides the path." },
  { id: "approve", x: 496, y: 112, label: "Approve", kind: "step", note: "A hand-off between people with different goals." },
  { id: "exc", x: 238, y: 336, label: "Exception", kind: "friction", note: "The case the procedure didn't plan for." },
  { id: "record", x: 470, y: 316, label: "Record", kind: "doc", note: "What the system believes happened." },
  { id: "people", x: 96, y: 438, label: "People", kind: "actor", note: "Everyone who touches the process, not only users." },
  { id: "decide", x: 338, y: 494, label: "Decision", kind: "decision", note: "What the information is finally used for." },
  { id: "report", x: 528, y: 486, label: "Report", kind: "step", note: "How the outcome is seen by the business." },
];

const EDGES: [string, string][] = [
  ["req", "intake"],
  ["intake", "rule"],
  ["rule", "approve"],
  ["rule", "exc"],
  ["exc", "req"],
  ["approve", "record"],
  ["record", "report"],
  ["people", "req"],
  ["people", "exc"],
  ["record", "decide"],
  ["decide", "report"],
  ["people", "decide"],
];

const MAIN = ["req", "intake", "rule", "approve", "record", "report"];
const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));
const tokenPath = MAIN.map((id, i) => `${i ? "L" : "M"}${byId[id].x} ${byId[id].y}`).join(" ");

export function HeroSystem({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const wrap = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const [active, setActive] = useState<string | null>(null);
  const [ptr, setPtr] = useState<{ x: number; y: number } | null>(null);

  const linked = useMemo(() => {
    if (!active) return new Set<string>();
    const s = new Set<string>([active]);
    EDGES.forEach(([a, b]) => {
      if (a === active) s.add(b);
      if (b === active) s.add(a);
    });
    return s;
  }, [active]);

  const onMove = useCallback((e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = wrap.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    const { clientX, clientY } = e;
    raf.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      const x = ((clientX - r.left) / r.width) * 600;
      const y = ((clientY - r.top) / r.height) * 600;
      setPtr({ x, y });
      let best: string | null = null;
      let d = 64;
      for (const n of NODES) {
        const dn = Math.hypot(n.x - x, n.y - y);
        if (dn < d) {
          d = dn;
          best = n.id;
        }
      }
      setActive(best);
    });
  }, []);

  // Subtle magnetic pull toward the pointer (max ~7 units).
  const pos = (n: Node) => {
    if (!ptr) return n;
    const dx = ptr.x - n.x;
    const dy = ptr.y - n.y;
    const d = Math.hypot(dx, dy);
    if (d > 160 || d === 0) return n;
    const k = (1 - d / 160) * 7;
    return { ...n, x: n.x + (dx / d) * k, y: n.y + (dy / d) * k };
  };
  const P = Object.fromEntries(NODES.map((n) => [n.id, pos(n)]));
  const activeNode = active ? byId[active] : null;

  return (
    <div
      ref={wrap}
      className={cn("relative select-none", className)}
      onPointerMove={onMove}
      onPointerLeave={() => {
        setActive(null);
        setPtr(null);
      }}
    >
      <svg viewBox="0 0 600 600" className="h-full w-full overflow-visible" role="img" aria-labelledby={`${uid}-t`}>
        <title id={`${uid}-t`}>
          Illustrative process map: request, intake, a business rule, approval, an exception loop, a record, a decision and a report, connected to the people involved.
        </title>

        {/* Measurement grid */}
        <g className="text-ink" opacity="0.09">
          {Array.from({ length: 7 }, (_, i) => (
            <line key={`v${i}`} x1={i * 100} y1="0" x2={i * 100} y2="600" stroke="currentColor" strokeWidth="0.6" />
          ))}
          {Array.from({ length: 7 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 100} x2="600" y2={i * 100} stroke="currentColor" strokeWidth="0.6" />
          ))}
        </g>

        {/* Edges */}
        <g fill="none" strokeWidth="1.1">
          {EDGES.map(([a, b], i) => {
            const on = active && linked.has(a) && linked.has(b) && (a === active || b === active);
            const dim = active && !on;
            const loop = a === "exc" && b === "req";
            const A = P[a];
            const B = P[b];
            const mx = (A.x + B.x) / 2 + (loop ? -40 : 0);
            const my = (A.y + B.y) / 2 + (loop ? 30 : 0);
            return (
              <path
                key={`${a}-${b}`}
                d={`M${A.x} ${A.y} Q${mx} ${my} ${B.x} ${B.y}`}
                className={cn(
                  "hs-edge transition-[stroke,opacity] duration-base",
                  on ? "stroke-sage-ink" : "stroke-ink",
                )}
                style={{ ["--i" as string]: i }}
                opacity={dim ? 0.12 : on ? 1 : 0.42}
                strokeDasharray={loop ? "3 4" : undefined}
                pathLength={loop ? undefined : 1}
              />
            );
          })}
        </g>

        {/* A request moving through the main path */}
        <path id={`${uid}-p`} d={tokenPath} fill="none" stroke="none" />
        <circle r="4.5" className="hs-token fill-oxide" style={{ offsetPath: `path("${tokenPath}")` }} />

        {/* Nodes */}
        {NODES.map((n, i) => {
          const p = P[n.id];
          const on = active ? linked.has(n.id) : true;
          const isActive = active === n.id;
          return (
            <g
              key={n.id}
              transform={`translate(${p.x} ${p.y})`}
              className="hs-node transition-opacity duration-base"
              style={{ ["--i" as string]: i }}
              opacity={on ? 1 : 0.25}
            >
              <g className="hs-node-in">
                {n.kind === "decision" ? (
                  <path d="M0 -11 11 0 0 11 -11 0Z" className={isActive ? "fill-sage" : "fill-paper"} stroke="currentColor" strokeWidth="1.1" />
                ) : n.kind === "actor" ? (
                  <circle r="10" className={isActive ? "fill-sage" : "fill-paper"} stroke="currentColor" strokeWidth="1.1" />
                ) : n.kind === "doc" ? (
                  <path d="M-9 -11h13l5 5v17h-18Z" className={isActive ? "fill-sage" : "fill-paper"} stroke="currentColor" strokeWidth="1.1" />
                ) : n.kind === "friction" ? (
                  <rect x="-9" y="-9" width="18" height="18" className="fill-oxide" />
                ) : (
                  <rect x="-9" y="-9" width="18" height="18" className={isActive ? "fill-sage" : "fill-ink"} />
                )}
                <text
                  x={n.x > 420 ? -18 : 18}
                  y="4"
                  textAnchor={n.x > 420 ? "end" : "start"}
                  className="fill-current font-mono uppercase"
                  fontSize="11"
                  letterSpacing="1.2"
                >
                  {n.label}
                </text>
              </g>
            </g>
          );
        })}
      </svg>

      {/* Annotation for the node under the pointer */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute bottom-0 left-0 max-w-[16rem] border-l border-oxide pl-3 transition-opacity duration-base",
          activeNode ? "opacity-100" : "opacity-0",
        )}
      >
        <p className="meta text-oxide">{activeNode?.label ?? "—"}</p>
        <p className="accent-serif mt-1 text-[1.05rem] leading-snug text-ink">{activeNode?.note ?? ""}</p>
      </div>
    </div>
  );
}
