"use client";

const nodes = [
  { id: "erp", label: "ERP", x: 300, y: 90 },
  { id: "scm", label: "Supply Chain", x: 90, y: 230 },
  { id: "crm", label: "CRM", x: 510, y: 230 },
  { id: "bi", label: "Analytics", x: 300, y: 380 },
];

const edges: [string, string][] = [
  ["erp", "scm"],
  ["erp", "crm"],
  ["erp", "bi"],
  ["scm", "bi"],
  ["crm", "bi"],
];

const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

export function SystemsGraphic() {
  return (
    <svg
      viewBox="0 0 600 460"
      className="w-full h-full"
      role="img"
      aria-label="Diagram of connected business systems: ERP, Supply Chain, CRM, and Analytics"
    >
      <defs>
        <linearGradient id="edgeGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4F7CFF" />
          <stop offset="100%" stopColor="#7A5FFF" />
        </linearGradient>
        <radialGradient id="nodeGlow">
          <stop offset="0%" stopColor="#4F7CFF" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#4F7CFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {edges.map(([a, b], i) => {
        const from = byId[a];
        const to = byId[b];
        return (
          <line
            key={i}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="url(#edgeGradient)"
            strokeWidth="1.5"
            strokeOpacity="0.35"
            strokeDasharray="6 10"
            className="animate-flow-dash"
          />
        );
      })}

      {nodes.map((n, i) => (
        <g key={n.id}>
          <circle
            cx={n.x}
            cy={n.y}
            r="44"
            fill="url(#nodeGlow)"
            className="animate-pulse-node"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
          <circle
            cx={n.x}
            cy={n.y}
            r="26"
            className="fill-white dark:fill-[#111113]"
            stroke="url(#edgeGradient)"
            strokeWidth="1.5"
          />
          <text
            x={n.x}
            y={n.y + 46}
            textAnchor="middle"
            className="fill-ink-light dark:fill-ink font-mono"
            fontSize="12"
            letterSpacing="0.04em"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
