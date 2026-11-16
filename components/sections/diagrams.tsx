"use client";

import { createContext, useContext, useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { CaseStudy } from "@/data/content";

/*
 * Original, explicitly illustrative process diagrams for the case studies.
 * Each shows the kind of analysis performed, in generic terms. None depicts
 * a real company system, screen, rule, role or figure.
 *
 * Every diagram has two drawings: a wide one, and a tall one for phones, so
 * labels stay readable without sideways scrolling. Colours come from the
 * design tokens, so a diagram adapts to whatever surface it sits on.
 */

const C = {
  ink: "rgb(var(--ink))",
  muted: "rgb(var(--muted))",
  line: "rgb(var(--rule))",
  accent: "rgb(var(--accent))",
  paper: "rgb(var(--paper))",
};
const sans = "var(--font-sans), system-ui, sans-serif";
const serif = "var(--font-serif), Georgia, serif";

const MarkerId = createContext("arrow");

// CSS-driven plotting (see `.dg` in globals.css). `pathLength=1` normalises
// the stroke so the draw-in works for a path of any length.
const draw = (d = 0) => ({ "data-a": "draw", pathLength: 1, style: { "--d": `${d}s` } as CSSProperties }) as const;
const pop = (d = 0) => ({ "data-a": "pop", style: { "--d": `${d}s` } as CSSProperties }) as const;

function Defs() {
  const id = useContext(MarkerId);
  return (
    <defs>
      <marker id={id} viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M1 1.5 L8.5 5 L1 8.5" fill="none" stroke={C.ink} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </marker>
    </defs>
  );
}

/** A connector. Dashed ones are exception or reference paths. */
function Flow({ d, delay = 0, dashed = false, head = true }: { d: string; delay?: number; dashed?: boolean; head?: boolean }) {
  const id = useContext(MarkerId);
  return (
    <path
      d={d}
      fill="none"
      stroke={C.ink}
      strokeWidth={1.3}
      strokeLinejoin="round"
      strokeDasharray={dashed ? "4 4" : undefined}
      markerEnd={head ? `url(#${id})` : undefined}
      {...(dashed ? pop(delay) : draw(delay))}
    />
  );
}

/** A task box, centred on (cx, cy). */
function Step({
  cx,
  cy,
  w,
  h = 36,
  label,
  delay = 0,
  strong = false,
}: {
  cx: number;
  cy: number;
  w: number;
  h?: number;
  label: string;
  delay?: number;
  strong?: boolean;
}) {
  return (
    <g {...pop(delay)}>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={3} fill={C.paper} stroke={C.ink} strokeWidth={strong ? 2 : 1.3} />
      <text x={cx} y={cy + 4.5} textAnchor="middle" fontSize="13" fontFamily={sans} fontWeight={strong ? 650 : 500} fill={C.ink}>
        {label}
      </text>
    </g>
  );
}

const StartEvent = ({ cx, cy, delay = 0 }: { cx: number; cy: number; delay?: number }) => (
  <circle cx={cx} cy={cy} r={7} fill={C.paper} stroke={C.ink} strokeWidth={1.3} {...pop(delay)} />
);

const EndEvent = ({ cx, cy, delay = 0 }: { cx: number; cy: number; delay?: number }) => (
  <circle cx={cx} cy={cy} r={7} fill={C.paper} stroke={C.ink} strokeWidth={4} {...pop(delay)} />
);

/** A hand-off between two parties: where the analysis looks for friction. */
const Handoff = ({ cx, cy, delay = 0 }: { cx: number; cy: number; delay?: number }) => (
  <g {...pop(delay)}>
    <circle cx={cx} cy={cy} r={9} fill={C.paper} />
    <circle cx={cx} cy={cy} r={5.5} fill={C.accent} />
  </g>
);

const Label = ({
  x,
  y,
  children,
  anchor = "start",
  strong = false,
  rotate,
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: "start" | "middle" | "end";
  strong?: boolean;
  rotate?: number;
}) => (
  <text
    x={x}
    y={y}
    textAnchor={anchor}
    fontSize="12.5"
    fontFamily={sans}
    fontWeight={strong ? 650 : 400}
    fill={strong ? C.ink : C.muted}
    transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}
  >
    {children}
  </text>
);

/** An annotation in the note voice. */
const Remark = ({ x, y, children, anchor = "start" }: { x: number; y: number; children: ReactNode; anchor?: "start" | "middle" | "end" }) => (
  <text x={x} y={y} textAnchor={anchor} fontSize="14.5" fontStyle="italic" fontFamily={serif} fill={C.muted}>
    {children}
  </text>
);

const Check = ({ x, y, label, delay }: { x: number; y: number; label: string; delay: number }) => (
  <g {...pop(delay)}>
    <rect x={x} y={y - 10} width={13} height={13} rx={2} fill="none" stroke={C.ink} strokeWidth={1.3} />
    <path d={`M${x + 3} ${y - 3.2} l2.6 2.7 l4.6 -5.6`} fill="none" stroke={C.ink} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    <text x={x + 22} y={y + 1} fontSize="12.5" fontFamily={sans} fill={C.ink}>
      {label}
    </text>
  </g>
);

function Svg({ w, h, label, className, children }: { w: number; h: number; label: string; className?: string; children: ReactNode }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={label} className={className} style={{ aspectRatio: `${w} / ${h}` }}>
      <Defs />
      {children}
    </svg>
  );
}

/* ── 1. An order moving between three parties ─────────────── */

const processAlt =
  "Illustrative swimlane diagram: an order is placed by a requester, reviewed by administration, prepared by the kitchen, given a status update by administration and collected by the requester. The four hand-offs between parties are marked as the places examined for friction.";

function ProcessWide() {
  const lanes = [
    { y: 14, label: "Requester" },
    { y: 104, label: "Administration" },
    { y: 194, label: "Kitchen" },
  ];
  return (
    <Svg w={760} h={318} label={processAlt} className="hidden w-full sm:block">
      {lanes.map((l, i) => (
        <g key={l.label}>
          {i > 0 ? <line x1={0} x2={760} y1={l.y} y2={l.y} stroke={C.line} strokeDasharray="2 5" /> : null}
          <Label x={12} y={l.y + 24}>
            {l.label}
          </Label>
        </g>
      ))}
      <StartEvent cx={112} cy={59} />
      <Flow d="M119 59 H138" delay={0.1} />
      <Step cx={196} cy={59} w={112} label="Place order" delay={0.15} />
      <Flow d="M196 77 V149 H254" delay={0.3} />
      <Step cx={312} cy={149} w={112} label="Review order" delay={0.45} />
      <Flow d="M312 167 V239 H370" delay={0.6} />
      <Step cx={428} cy={239} w={112} label="Prepare order" delay={0.75} />
      <Flow d="M484 239 H544 V171" delay={0.9} />
      <Step cx={544} cy={149} w={112} label="Update status" delay={1.05} />
      <Flow d="M600 149 H660 V81" delay={1.2} />
      <Step cx={660} cy={59} w={112} label="Collect order" delay={1.35} />
      <Flow d="M716 59 H736" delay={1.45} />
      <EndEvent cx={746} cy={59} delay={1.5} />
      <Handoff cx={196} cy={104} delay={1.6} />
      <Handoff cx={312} cy={194} delay={1.7} />
      <Handoff cx={544} cy={194} delay={1.8} />
      <Handoff cx={660} cy={104} delay={1.9} />
      <g {...pop(2)}>
        <circle cx={18} cy={298} r={5.5} fill={C.accent} />
        <Remark x={32} y={303}>A hand-off: where I look for friction first</Remark>
      </g>
    </Svg>
  );
}

function ProcessTall() {
  const steps = [
    { label: "Place order", by: "Requester" },
    { label: "Review order", by: "Administration" },
    { label: "Prepare order", by: "Kitchen" },
    { label: "Update status", by: "Administration" },
    { label: "Collect order", by: "Requester" },
  ];
  const y = (i: number) => 62 + i * 78;
  return (
    <Svg w={320} h={470} label={processAlt} className="w-full sm:hidden">
      <StartEvent cx={88} cy={14} />
      <Flow d={`M88 21 V${y(0) - 20}`} delay={0.1} />
      {steps.map((s, i) => (
        <g key={s.label}>
          <Step cx={88} cy={y(i)} w={148} label={s.label} delay={0.15 + i * 0.2} />
          <Label x={176} y={y(i) + 4.5}>
            {s.by}
          </Label>
          {i < steps.length - 1 ? (
            <>
              <Flow d={`M88 ${y(i) + 18} V${y(i + 1) - 20}`} delay={0.25 + i * 0.2} />
              <Handoff cx={88} cy={y(i) + 37} delay={1.2 + i * 0.1} />
            </>
          ) : null}
        </g>
      ))}
      <Flow d={`M88 ${y(4) + 18} V${y(4) + 38}`} delay={1.1} />
      <EndEvent cx={88} cy={y(4) + 48} delay={1.2} />
      <g {...pop(1.7)}>
        <circle cx={20} cy={454} r={5.5} fill={C.accent} />
        <Remark x={34} y={459}>A hand-off: where I look for friction</Remark>
      </g>
    </Svg>
  );
}

/* ── 2. A request, a rule check and the exception path ─────── */

const approvalAlt =
  "Illustrative approval workflow: a submitted request is reviewed and checked against a rule. If the rule is met it is approved; if not it is returned for correction. Scenario tests cover both the expected path and the exception path.";

function Gateway({ cx, cy, delay }: { cx: number; cy: number; delay: number }) {
  return (
    <path d={`M${cx} ${cy - 22} L${cx + 22} ${cy} L${cx} ${cy + 22} L${cx - 22} ${cy} Z`} fill={C.paper} stroke={C.ink} strokeWidth={1.3} {...pop(delay)} />
  );
}

function ApprovalWide() {
  return (
    <Svg w={540} h={318} label={approvalAlt} className="hidden w-full sm:block">
      <StartEvent cx={20} cy={70} />
      <Flow d="M27 70 H44" delay={0.1} />
      <Step cx={108} cy={70} w={124} label="Submit request" delay={0.15} />
      <Flow d="M170 70 H196" delay={0.3} />
      <Step cx={242} cy={70} w={88} label="Review" delay={0.4} />
      <Flow d="M286 70 H312" delay={0.55} />
      <Gateway cx={336} cy={70} delay={0.65} />
      <Label x={336} y={36} anchor="middle">
        Rule met?
      </Label>
      <Flow d="M358 70 H400" delay={0.8} />
      <Label x={378} y={62} anchor="middle">
        Yes
      </Label>
      <Step cx={446} cy={70} w={88} label="Approve" delay={0.9} strong />
      <Flow d="M490 70 H510" delay={1.05} />
      <EndEvent cx={520} cy={70} delay={1.1} />
      {/* Exception path */}
      <Flow d="M336 92 V150 H108 V90" delay={1.25} dashed />
      <Label x={346} y={116}>
        No
      </Label>
      <Remark x={222} y={172} anchor="middle">
        Returned for correction
      </Remark>
      {/* Scenario tests */}
      <g {...pop(1.5)}>
        <line x1={46} x2={520} y1={214} y2={214} stroke={C.line} />
        <Label x={46} y={244} strong>
          Scenario tests
        </Label>
      </g>
      <Check x={46} y={278} label="Expected path" delay={1.65} />
      <Check x={210} y={278} label="Exception path" delay={1.8} />
    </Svg>
  );
}

function ApprovalTall() {
  return (
    <Svg w={320} h={470} label={approvalAlt} className="w-full sm:hidden">
      <StartEvent cx={98} cy={14} />
      <Flow d="M98 21 V40" delay={0.1} />
      <Step cx={98} cy={60} w={148} label="Submit request" delay={0.15} />
      <Flow d="M98 78 V110" delay={0.3} />
      <Step cx={98} cy={130} w={148} label="Review" delay={0.4} />
      <Flow d="M98 148 V176" delay={0.55} />
      <Gateway cx={98} cy={200} delay={0.65} />
      <Label x={64} y={204} anchor="end">
        Rule met?
      </Label>
      <Flow d="M98 222 V258" delay={0.8} />
      <Label x={108} y={244}>
        Yes
      </Label>
      <Step cx={98} cy={278} w={148} label="Approve" delay={0.9} strong />
      <Flow d="M98 296 V316" delay={1.05} />
      <EndEvent cx={98} cy={326} delay={1.1} />
      {/* Exception path */}
      <Flow d="M120 200 H236 V60 H174" delay={1.25} dashed />
      <Label x={130} y={192}>
        No
      </Label>
      <text x={256} y={130} textAnchor="middle" fontSize="14.5" fontStyle="italic" fontFamily={serif} fill={C.muted} transform="rotate(90 256 130)">
        Returned for correction
      </text>
      {/* Scenario tests */}
      <g {...pop(1.5)}>
        <line x1={20} x2={300} y1={366} y2={366} stroke={C.line} />
        <Label x={20} y={394} strong>
          Scenario tests
        </Label>
      </g>
      <Check x={20} y={424} label="Expected path" delay={1.65} />
      <Check x={20} y={452} label="Exception path" delay={1.8} />
    </Svg>
  );
}

/* ── 3. Two requisition types, one approval path, one guide ── */

const requisitionAlt =
  "Illustrative requisition workflow: an on-the-job training requisition and an internship requisition follow the same approval path to confirmation, and the process is written up as a user guide.";

function Guide({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <g {...pop(delay)}>
      <path d={`M${x} ${y} h74 l18 18 v100 h-92 z`} fill={C.paper} stroke={C.ink} strokeWidth={1.3} strokeLinejoin="round" />
      <path d={`M${x + 74} ${y} v18 h18`} fill="none" stroke={C.ink} strokeWidth={1.3} strokeLinejoin="round" />
      <text x={x + 12} y={y + 30} fontSize="12.5" fontWeight={650} fontFamily={sans} fill={C.ink}>
        User guide
      </text>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle cx={x + 15} cy={y + 52 + i * 16} r={2} fill={C.ink} />
          <line x1={x + 24} x2={x + [78, 66, 74, 58][i]} y1={y + 52 + i * 16} y2={y + 52 + i * 16} stroke={C.line} strokeWidth={1.5} />
        </g>
      ))}
    </g>
  );
}

function RequisitionWide() {
  return (
    <Svg w={540} h={318} label={requisitionAlt} className="hidden w-full sm:block">
      <StartEvent cx={20} cy={52} />
      <Flow d="M27 52 H44" delay={0.1} />
      <Step cx={128} cy={52} w={164} label="OJT requisition" delay={0.15} />
      <StartEvent cx={20} cy={128} delay={0.2} />
      <Flow d="M27 128 H44" delay={0.25} />
      <Step cx={128} cy={128} w={164} label="Internship requisition" delay={0.3} />
      {/* Both join one approval path */}
      <Flow d="M210 52 H246 V90" delay={0.5} head={false} />
      <Flow d="M210 128 H246 V90 H276" delay={0.5} />
      <Step cx={332} cy={90} w={108} label="Approval" delay={0.7} />
      <Flow d="M386 90 H420" delay={0.85} />
      <Step cx={470} cy={90} w={96} label="Confirmed" delay={0.95} strong />
      <Flow d="M518 90 H522" delay={1.05} head={false} />
      <EndEvent cx={530} cy={90} delay={1.1} />
      {/* Documented as */}
      <Flow d="M332 108 V236 H390" delay={1.3} dashed />
      <Remark x={320} y={258} anchor="end">
        Written up, step by step, as
      </Remark>
      <Guide x={396} y={178} delay={1.5} />
    </Svg>
  );
}

function RequisitionTall() {
  return (
    <Svg w={320} h={470} label={requisitionAlt} className="w-full sm:hidden">
      <StartEvent cx={14} cy={36} />
      <Flow d="M21 36 H34" delay={0.1} />
      <Step cx={122} cy={36} w={172} label="OJT requisition" delay={0.15} />
      <StartEvent cx={14} cy={96} delay={0.2} />
      <Flow d="M21 96 H34" delay={0.25} />
      <Step cx={122} cy={96} w={172} label="Internship requisition" delay={0.3} />
      {/* Both join one approval path */}
      <Flow d="M208 36 H246 V168" delay={0.5} head={false} />
      <Flow d="M208 96 H246 V168 H200" delay={0.5} />
      <Step cx={122} cy={168} w={152} label="Approval" delay={0.7} />
      <Flow d="M122 186 V218" delay={0.85} />
      <Step cx={122} cy={238} w={152} label="Confirmed" delay={0.95} strong />
      <Flow d="M122 256 V270" delay={1.05} head={false} />
      <EndEvent cx={122} cy={278} delay={1.1} />
      {/* Documented as */}
      <Flow d="M46 168 H22 V380 H56" delay={1.3} dashed />
      <Remark x={170} y={372}>
        Written up,
      </Remark>
      <Remark x={170} y={392}>
        step by step
      </Remark>
      <Guide x={62} y={320} delay={1.5} />
    </Svg>
  );
}

/** One diagram, plotted the first time it scrolls into view. */
export function CaseDiagram({ kind, instant = false }: { kind: CaseStudy["diagram"]; instant?: boolean }) {
  const id = `dg-${useId().replace(/:/g, "")}`;
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(instant);

  useEffect(() => {
    if (instant) return;
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
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
  }, [instant]);

  return (
    <div ref={ref} className={shown ? "dg in" : "dg"}>
      <MarkerId.Provider value={`${id}-w`}>
        {kind === "approval" ? <ApprovalWide /> : kind === "requisition" ? <RequisitionWide /> : <ProcessWide />}
      </MarkerId.Provider>
      <MarkerId.Provider value={`${id}-t`}>
        {kind === "approval" ? <ApprovalTall /> : kind === "requisition" ? <RequisitionTall /> : <ProcessTall />}
      </MarkerId.Provider>
    </div>
  );
}
