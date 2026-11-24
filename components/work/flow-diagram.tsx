import type { Flow } from "@/data/content";

/**
 * Conceptual swim-lane flow, generated from data. Generic roles and steps
 * only — it illustrates the shape of the analysis, not a real system.
 */
export function FlowDiagram({ flow, id }: { flow: Flow; id: string }) {
  const laneH = 120;
  const colW = 170;
  const left = 150;
  const top = 30;
  const W = left + flow.steps.length * colW + 30;
  const H = top + flow.lanes.length * laneH + 20;
  const pos = flow.steps.map((s, i) => ({ x: left + i * colW + colW / 2, y: top + s.lane * laneH + laneH / 2 }));

  return (
    <div className="no-scrollbar overflow-x-auto">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="flow-fig min-w-[44rem] text-ink"
        role="img"
        aria-labelledby={`${id}-t`}
        style={{ width: "100%" }}
      >
        <title id={`${id}-t`}>
          {`Conceptual flow across ${flow.lanes.join(", ")}: ${flow.steps.map((s) => s.label).join(", then ")}.`}
        </title>
        {flow.lanes.map((l, i) => (
          <g key={l}>
            <rect x="0" y={top + i * laneH} width={W} height={laneH} className={i % 2 ? "fill-ink/[0.03]" : "fill-transparent"} />
            <line x1="0" y1={top + i * laneH} x2={W} y2={top + i * laneH} stroke="currentColor" strokeOpacity="0.18" />
            <text x="16" y={top + i * laneH + 24} className="fill-current font-mono uppercase" fontSize="11" letterSpacing="1.4" opacity="0.6">
              {l}
            </text>
          </g>
        ))}
        <line x1="0" y1={top + flow.lanes.length * laneH} x2={W} y2={top + flow.lanes.length * laneH} stroke="currentColor" strokeOpacity="0.18" />

        {/* connectors */}
        {pos.slice(1).map((p, i) => {
          const a = pos[i];
          const mx = (a.x + p.x) / 2;
          return (
            <path
              key={i}
              d={`M${a.x + 48} ${a.y} H${mx} V${p.y} H${p.x - 48}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              pathLength={1}
              className="flow-edge"
              style={{ ["--i" as string]: i }}
              markerEnd={`url(#${id}-arrow)`}
            />
          );
        })}
        <defs>
          <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 10 5 0 10Z" fill="currentColor" />
          </marker>
        </defs>

        {/* steps */}
        {flow.steps.map((s, i) => {
          const p = pos[i];
          const k = s.kind ?? "step";
          return (
            <g key={i} transform={`translate(${p.x} ${p.y})`} className="flow-node" style={{ ["--i" as string]: i }}>
              {k === "decision" ? (
                <path d="M0 -32 48 0 0 32 -48 0Z" className="fill-paper" stroke="currentColor" strokeWidth="1.4" />
              ) : k === "doc" ? (
                <path d="M-48 -26 H38 L48 -16 V26 H-48Z" className="fill-paper" stroke="currentColor" strokeWidth="1.4" />
              ) : k === "friction" ? (
                <rect x="-48" y="-24" width="96" height="48" className="fill-oxide" />
              ) : (
                <rect x="-48" y="-24" width="96" height="48" className="fill-paper" stroke="currentColor" strokeWidth="1.4" />
              )}
              <text
                textAnchor="middle"
                y="4"
                fontSize="12"
                className={k === "friction" ? "fill-paper font-sans" : "fill-current font-sans"}
              >
                {s.label}
              </text>
              <text textAnchor="middle" y={k === "decision" ? -40 : -34} fontSize="10" className="fill-current font-mono" opacity="0.5">
                {String(i + 1).padStart(2, "0")}
              </text>
            </g>
          );
        })}
      </svg>
      <ul className="meta mt-4 flex flex-wrap gap-x-6 gap-y-2 text-stone" aria-label="Legend">
        <li className="flex items-center gap-2"><span aria-hidden className="block h-2.5 w-4 border border-current" /> Step</li>
        <li className="flex items-center gap-2"><span aria-hidden className="block h-2.5 w-2.5 rotate-45 border border-current" /> Decision / rule</li>
        <li className="flex items-center gap-2"><span aria-hidden className="block h-2.5 w-3 border border-current" style={{ clipPath: "polygon(0 0, 75% 0, 100% 30%, 100% 100%, 0 100%)" }} /> Document</li>
        <li className="flex items-center gap-2"><span aria-hidden className="block h-2.5 w-4 bg-oxide" /> Examined friction</li>
      </ul>
    </div>
  );
}
