"use client";

import { createContext, useContext, useEffect, useId, useRef, useState, type CSSProperties } from "react";
import type { CaseStudy } from "@/data/content";

/*
 * Original, explicitly illustrative information-design covers for the case
 * studies. Each shows the *kind* of analysis performed — none depicts any
 * real company system, screen, rule, or data. Colours come from tokens, and
 * each cover is tinted by `--tone` (set by the parent) so the three projects
 * differ within one visual language.
 */

const MarkerId = createContext("arrow");

const C = {
  ink: "rgb(var(--ink))",
  muted: "rgb(var(--muted))",
  line: "rgb(var(--line))",
  tone: "rgb(var(--tone, var(--accent)))",
  toneSoft: "rgb(var(--tone, var(--accent)) / 0.12)",
  raised: "rgb(var(--raised))",
  surface: "rgb(var(--surface))",
};
const mono = "var(--font-geist-mono)";
const sans = "var(--font-geist-sans)";

// CSS-driven reveal (see .dg rules in globals.css): far cheaper to hydrate
// than one Framer component per shape. `pathLength=1` normalises the stroke
// so the draw-in works for any path length.
const draw = (delay = 0) =>
  ({ "data-a": "draw", pathLength: 1, style: { "--d": `${delay}s` } as CSSProperties }) as const;
const pop = (delay = 0) => ({ "data-a": "pop", style: { "--d": `${delay}s` } as CSSProperties }) as const;

function Defs() {
  const id = useContext(MarkerId);
  return (
    <defs>
      <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" fill={C.muted} />
      </marker>
      <pattern id={`${id}-dots`} width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.9" fill={C.line} />
      </pattern>
    </defs>
  );
}

function Dots({ w, h }: { w: number; h: number }) {
  const id = useContext(MarkerId);
  return <rect width={w} height={h} fill={`url(#${id}-dots)`} opacity={0.9} />;
}

function Arrow({ d, delay = 0, tone = false, dashed = false }: { d: string; delay?: number; tone?: boolean; dashed?: boolean }) {
  const id = useContext(MarkerId);
  return (
    <path
      d={d}
      fill="none"
      stroke={tone ? C.tone : C.muted}
      strokeWidth={1.2}
      strokeDasharray={dashed ? "3 4" : undefined}
      markerEnd={`url(#${id})`}
      {...(dashed ? pop(delay) : draw(delay))}
    />
  );
}

function Pill({
  x,
  y,
  w,
  label,
  variant = "plain",
  delay = 0,
}: {
  x: number;
  y: number;
  w: number;
  label: string;
  variant?: "plain" | "tone" | "solid" | "ghost";
  delay?: number;
}) {
  const fill = variant === "solid" ? C.tone : variant === "tone" ? C.toneSoft : C.raised;
  const stroke = variant === "plain" ? C.line : C.tone;
  const text = variant === "solid" ? "rgb(var(--raised))" : variant === "ghost" ? C.muted : C.ink;
  return (
    <g {...pop(delay)}>
      <rect
        x={x}
        y={y}
        width={w}
        height={30}
        rx={15}
        fill={fill}
        stroke={stroke}
        strokeDasharray={variant === "ghost" ? "4 4" : undefined}
      />
      <text x={x + w / 2} y={y + 19.5} textAnchor="middle" fontSize="11" fontFamily={sans} fill={text}>
        {label}
      </text>
    </g>
  );
}

function Mark({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <g {...pop(delay)}>
      <circle cx={x} cy={y} r={8} fill={C.raised} stroke={C.tone} />
      <text x={x} y={y + 3.5} textAnchor="middle" fontSize="10" fontWeight="600" fill={C.tone}>
        !
      </text>
    </g>
  );
}

function Tag({ x, y, children, tone = false }: { x: number; y: number; children: string; tone?: boolean }) {
  return (
    <text x={x} y={y} fontSize="9" letterSpacing="1.6" fontFamily={mono} fill={tone ? C.tone : C.muted}>
      {children}
    </text>
  );
}

/* 01 — Service blueprint: lanes for customer, front-of-house and kitchen. */
function ServiceBlueprint() {
  const W = 720;
  const H = 300;
  const lanes = [
    { y: 34, label: "CUSTOMER" },
    { y: 122, label: "FRONT OF HOUSE" },
    { y: 210, label: "KITCHEN" },
  ];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" role="img" aria-label="Illustrative service blueprint of an ordering and fulfilment journey, with friction points marked at hand-offs">
      <Defs />
      <Dots w={W} h={H} />
      {lanes.map((l, i) => (
        <g key={l.label}>
          <rect x={0} y={l.y - 10} width={W} height={78} fill={i === 1 ? C.toneSoft : "transparent"} />
          <Tag x={18} y={l.y + 4}>{l.label}</Tag>
          {i > 0 ? <line x1={0} x2={W} y1={l.y - 10} y2={l.y - 10} stroke={C.line} strokeDasharray={i === 1 ? "2 5" : undefined} /> : null}
        </g>
      ))}
      <Tag x={W - 168} y={108} tone>LINE OF VISIBILITY</Tag>
      {/* customer */}
      <Pill x={150} y={46} w={88} label="Browse" delay={0.05} />
      <Pill x={290} y={46} w={88} label="Order" variant="tone" delay={0.15} />
      <Pill x={570} y={46} w={98} label="Receive" variant="tone" delay={0.7} />
      {/* front */}
      <Pill x={290} y={134} w={88} label="Confirm" delay={0.25} />
      <Pill x={430} y={134} w={110} label="Status updates" variant="solid" delay={0.5} />
      <Pill x={580} y={134} w={88} label="Hand-off" delay={0.65} />
      {/* kitchen */}
      <Pill x={430} y={222} w={110} label="Prepare" delay={0.4} />
      <Arrow d="M238 61 H286" delay={0.2} />
      <Arrow d="M334 76 V130" delay={0.3} />
      <Arrow d="M378 149 C 410 149, 420 200, 482 218" delay={0.4} />
      <Arrow d="M485 222 V168" delay={0.55} tone />
      <Arrow d="M540 149 H576" delay={0.6} />
      <Arrow d="M624 134 V80" delay={0.7} tone />
      <Mark x={356} y={104} delay={0.8} />
      <Mark x={560} y={128} delay={0.9} />
    </svg>
  );
}

/* 02 — Request & approval: staircase with a rule gate and an exception loop. */
function ApprovalStair() {
  const W = 520;
  const H = 340;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" role="img" aria-label="Illustrative request and approval workflow: initiation, review, rule validation and completion, with an exception path and test scenarios">
      <Defs />
      <Dots w={W} h={H} />
      <path d="M30 270 H130 V210 H230 V150 H330 V90 H490" fill="none" stroke={C.line} {...draw(0)} />
      <Pill x={40} y={236} w={84} label="Request" delay={0.1} />
      <Pill x={140} y={176} w={84} label="Review" delay={0.2} />
      <g {...pop(0.3)}>
        <rect x={262} y={104} width={34} height={34} rx={4} transform="rotate(45 279 121)" fill={C.toneSoft} stroke={C.tone} />
        <text x={279} y={125} textAnchor="middle" fontSize="10" fontFamily={sans} fill={C.ink}>
          rule
        </text>
      </g>
      <Pill x={370} y={56} w={104} label="Complete" variant="solid" delay={0.45} />
      <Arrow d="M124 251 C 140 251, 150 230, 168 208" delay={0.25} />
      <Arrow d="M224 191 C 245 186, 256 160, 266 138" delay={0.35} />
      <Arrow d="M300 108 C 326 88, 346 74, 366 71" delay={0.5} tone />
      <Arrow d="M282 146 C 282 230, 120 300, 82 268" delay={0.6} dashed />
      <Tag x={150} y={318}>EXCEPTION · RETURN FOR CORRECTION</Tag>
      <g {...pop(0.7)}>
        <Tag x={340} y={190} tone>SCENARIOS</Tag>
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(340 ${204 + i * 18})`}>
            <rect width={11} height={11} rx={2.5} fill="none" stroke={C.tone} />
            <path d="M2.5 5.8 L4.8 8 L8.8 3.2" fill="none" stroke={C.tone} strokeWidth={1.5} {...draw(0.9 + i * 0.12)} />
            <rect x={18} y={3.5} width={[96, 72, 110, 84][i]} height={4} rx={2} fill={C.line} />
          </g>
        ))}
      </g>
    </svg>
  );
}

/* 03 — Requisition: a stepper above an abstract form and its user guide. */
function RequisitionDoc() {
  const W = 440;
  const H = 400;
  const steps = ["Request", "Process", "Document"];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" role="img" aria-label="Illustrative requisition workflow: an abstract request form with a three-step stepper and an accompanying user guide">
      <Defs />
      <Dots w={W} h={H} />
      {/* stepper */}
      <line x1={70} x2={370} y1={52} y2={52} stroke={C.line} {...draw(0)} />
      {steps.map((s, i) => (
        <g key={s} {...pop(0.1 + i * 0.12)}>
          <circle cx={70 + i * 150} cy={52} r={10} fill={i < 2 ? C.tone : C.raised} stroke={C.tone} />
          <text x={70 + i * 150} y={55.5} textAnchor="middle" fontSize="9" fill={i < 2 ? "rgb(var(--raised))" : C.tone}>
            {i + 1}
          </text>
          <text x={70 + i * 150} y={82} textAnchor="middle" fontSize="10" fontFamily={sans} fill={C.ink}>
            {s}
          </text>
        </g>
      ))}
      {/* abstract form */}
      <g {...pop(0.3)}>
        <rect x={40} y={110} width={220} height={250} rx={12} fill={C.raised} stroke={C.line} />
        <Tag x={58} y={136}>REQUISITION</Tag>
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(58 ${154 + i * 44})`}>
            <rect width={[70, 54, 82, 60][i]} height={4} rx={2} fill={C.muted} opacity={0.5} />
            <rect y={12} width={184} height={20} rx={6} fill="none" stroke={C.line} />
          </g>
        ))}
        <rect x={58} y={330} width={70} height={18} rx={9} fill={C.tone} />
      </g>
      {/* user guide pages */}
      <g {...pop(0.5)}>
        <rect x={290} y={142} width={120} height={150} rx={8} fill={C.surface} stroke={C.line} transform="rotate(4 350 217)" />
        <rect x={282} y={132} width={120} height={150} rx={8} fill={C.raised} stroke={C.tone} />
        <Tag x={296} y={154} tone>USER GUIDE</Tag>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={296} y={168 + i * 20} width={[86, 70, 92, 60, 78][i]} height={4} rx={2} fill={C.line} />
        ))}
      </g>
      <Arrow d="M262 200 C 270 196, 274 194, 280 192" delay={0.6} tone />
    </svg>
  );
}

export function CaseDiagram({ kind }: { kind: CaseStudy["diagram"] }) {
  const id = `dg-${useId().replace(/:/g, "")}`;
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={shown ? "dg in h-full w-full" : "dg h-full w-full"}>
      <MarkerId.Provider value={id}>
        {kind === "approval" ? <ApprovalStair /> : kind === "requisition" ? <RequisitionDoc /> : <ServiceBlueprint />}
      </MarkerId.Provider>
    </div>
  );
}

/** Aspect ratio of each cover's artwork (viewBox), used by layout. */
export const diagramRatio: Record<CaseStudy["diagram"], string> = {
  process: "720 / 300",
  approval: "520 / 340",
  requisition: "440 / 400",
};
