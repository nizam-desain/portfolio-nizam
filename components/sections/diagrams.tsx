"use client";

import { createContext, useContext, useId } from "react";
import { motion } from "framer-motion";
import type { CaseStudy } from "@/data/content";

/*
 * Abstract, explicitly illustrative diagrams for the case studies.
 * They show the *kind* of analysis performed — they are not, and do not
 * depict, any real company system, data, or screen.
 */

const ease = [0.16, 1, 0.3, 1] as const;
const MarkerId = createContext("arrow");
const draw = (delay = 0) => ({
  initial: { pathLength: 0, opacity: 0 },
  whileInView: { pathLength: 1, opacity: 1 },
  viewport: { once: true, margin: "0px 0px -15% 0px" },
  transition: { duration: 1.2, delay, ease },
});
const pop = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "0px 0px -15% 0px" },
  transition: { duration: 0.6, delay, ease },
});

const C = {
  ink: "rgb(var(--ink))",
  muted: "rgb(var(--muted))",
  line: "rgb(var(--line))",
  accent: "rgb(var(--accent))",
  sage: "rgb(var(--sage))",
  raised: "rgb(var(--raised))",
};

function Node({
  x,
  y,
  w = 96,
  label,
  tone = "default",
  delay = 0,
}: {
  x: number;
  y: number;
  w?: number;
  label: string;
  tone?: "default" | "accent" | "sage" | "ghost";
  delay?: number;
}) {
  const stroke = tone === "accent" ? C.accent : tone === "sage" ? C.sage : C.line;
  return (
    <motion.g {...pop(delay)} style={{ transformOrigin: `${x + w / 2}px ${y + 17}px` }}>
      <rect
        x={x}
        y={y}
        width={w}
        height={34}
        rx={17}
        fill={C.raised}
        stroke={stroke}
        strokeWidth={tone === "default" || tone === "ghost" ? 1 : 1.5}
        strokeDasharray={tone === "ghost" ? "4 4" : undefined}
      />
      <text
        x={x + w / 2}
        y={y + 21.5}
        textAnchor="middle"
        fontSize="11"
        fontFamily="var(--font-geist-sans)"
        fill={tone === "ghost" ? C.muted : C.ink}
      >
        {label}
      </text>
    </motion.g>
  );
}

function Arrow({ d, delay = 0, color = C.muted, dashed = false }: { d: string; delay?: number; color?: string; dashed?: boolean }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={1.2}
      strokeDasharray={dashed ? "3 4" : undefined}
      markerEnd={`url(#${useContext(MarkerId)})`}
      {...draw(delay)}
    />
  );
}

function Label({ x, y, children, color = C.muted }: { x: number; y: number; children: string; color?: string }) {
  return (
    <motion.text
      {...pop(0.1)}
      x={x}
      y={y}
      fontSize="9.5"
      letterSpacing="1.6"
      fontFamily="var(--font-geist-mono)"
      fill={color}
    >
      {children}
    </motion.text>
  );
}

function Friction({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.g {...pop(delay)} style={{ transformOrigin: `${x}px ${y}px` }}>
      <circle cx={x} cy={y} r={9} fill={C.raised} stroke={C.accent} strokeWidth={1.2} />
      <text x={x} y={y + 3.5} textAnchor="middle" fontSize="10" fontWeight="600" fill={C.accent}>
        !
      </text>
    </motion.g>
  );
}

function Defs() {
  const id = useContext(MarkerId);
  return (
    <defs>
      <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" fill={C.muted} />
      </marker>
    </defs>
  );
}

function ProcessDiagram() {
  return (
    <svg viewBox="0 0 520 300" className="h-full w-full" role="img" aria-label="Illustrative AS-IS versus TO-BE workflow comparison">
      <Defs />
      <Label x={24} y={36}>AS-IS · OBSERVED</Label>
      <Node x={24} y={52} w={82} label="Order" />
      <Node x={140} y={52} w={92} label="Admin check" delay={0.1} />
      <Node x={266} y={52} w={84} label="Kitchen" delay={0.2} />
      <Node x={384} y={52} w={108} label="Status update" delay={0.3} />
      <Arrow d="M106 69 H138" delay={0.2} />
      <Arrow d="M232 69 H264" delay={0.3} />
      <Arrow d="M350 69 H382" delay={0.4} />
      <Arrow d="M438 86 C 438 128, 186 128, 186 88" delay={0.5} dashed />
      <Friction x={122} y={48} delay={0.6} />
      <Friction x={366} y={48} delay={0.7} />
      <Friction x={312} y={118} delay={0.8} />
      <motion.line x1={24} x2={496} y1={160} y2={160} stroke={C.line} {...draw(0.4)} />
      <Label x={24} y={196} color={C.accent}>TO-BE · PROPOSED</Label>
      <Node x={24} y={212} w={82} label="Order" tone="accent" delay={0.6} />
      <Node x={140} y={212} w={118} label="Shared status" tone="accent" delay={0.7} />
      <Node x={292} y={212} w={84} label="Kitchen" tone="accent" delay={0.8} />
      <Node x={410} y={212} w={82} label="Fulfil" tone="sage" delay={0.9} />
      <Arrow d="M106 229 H138" delay={0.8} color={C.accent} />
      <Arrow d="M258 229 H290" delay={0.9} color={C.accent} />
      <Arrow d="M376 229 H408" delay={1} color={C.accent} />
      <Label x={24} y={284}>ILLUSTRATIVE · NOT A SYSTEM SCREENSHOT</Label>
    </svg>
  );
}

function ApprovalDiagram() {
  return (
    <svg viewBox="0 0 520 300" className="h-full w-full" role="img" aria-label="Illustrative request and approval workflow with test scenarios">
      <Defs />
      <Label x={24} y={36}>REQUEST → APPROVAL · RULES & EXCEPTIONS</Label>
      <Node x={24} y={118} w={86} label="Request" />
      <Node x={150} y={118} w={88} label="Review" delay={0.1} />
      <motion.g {...pop(0.2)} style={{ transformOrigin: "296px 135px" }}>
        <rect x={278} y={117} width={36} height={36} rx={4} transform="rotate(45 296 135)" fill={C.raised} stroke={C.accent} strokeWidth={1.5} />
        <text x={296} y={139} textAnchor="middle" fontSize="11" fill={C.ink}>
          rule
        </text>
      </motion.g>
      <Node x={360} y={64} w={100} label="Approved" tone="sage" delay={0.4} />
      <Node x={360} y={172} w={100} label="Returned" tone="ghost" delay={0.5} />
      <Arrow d="M110 135 H148" delay={0.2} />
      <Arrow d="M238 135 H270" delay={0.3} />
      <Arrow d="M314 128 C 334 100, 340 82, 358 81" delay={0.4} />
      <Arrow d="M314 142 C 334 170, 340 188, 358 189" delay={0.5} />
      <Arrow d="M410 206 C 410 250, 194 250, 194 156" delay={0.6} dashed />
      <Label x={226} y={244}>EXCEPTION PATH</Label>
      {/* test-scenario checklist */}
      <motion.g {...pop(0.8)}>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(24 ${210 + i * 18})`}>
            <rect width={11} height={11} rx={2.5} fill="none" stroke={C.sage} />
            <motion.path d="M2.5 5.8 L4.8 8 L8.8 3.2" fill="none" stroke={C.sage} strokeWidth={1.5} {...draw(1 + i * 0.15)} />
            <rect x={18} y={3.5} width={[92, 70, 104][i]} height={4} rx={2} fill={C.line} />
          </g>
        ))}
        <text x={24} y={200} fontSize="9.5" letterSpacing="1.6" fontFamily="var(--font-geist-mono)" fill={C.muted}>
          TEST SCENARIOS
        </text>
      </motion.g>
      <Label x={24} y={284}>ILLUSTRATIVE · NOT A SYSTEM SCREENSHOT</Label>
    </svg>
  );
}

function RequisitionDiagram() {
  const Doc = ({ x, title, delay }: { x: number; title: string; delay: number }) => (
    <motion.g {...pop(delay)} style={{ transformOrigin: `${x + 85}px 150px` }}>
      <rect x={x} y={58} width={170} height={190} rx={10} fill={C.raised} stroke={C.line} />
      <text x={x + 18} y={86} fontSize="12" fontWeight="600" fill={C.ink} fontFamily="var(--font-geist-sans)">
        {title}
      </text>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${x + 18} ${106 + i * 30})`}>
          <circle cx={8} cy={8} r={8} fill="none" stroke={i < 3 ? C.accent : C.line} />
          <text x={8} y={11.5} textAnchor="middle" fontSize="9" fill={i < 3 ? C.accent : C.muted}>
            {i + 1}
          </text>
          <rect x={24} y={2} width={[104, 84, 112, 72][i]} height={4} rx={2} fill={C.line} />
          <rect x={24} y={10} width={[64, 92, 54, 80][i]} height={3} rx={1.5} fill={C.line} opacity={0.6} />
        </g>
      ))}
    </motion.g>
  );
  return (
    <svg viewBox="0 0 520 300" className="h-full w-full" role="img" aria-label="Illustrative requisition workflow documentation for two request types">
      <Defs />
      <Label x={24} y={36}>REQUISITION WORKFLOWS · USER DOCUMENTATION</Label>
      <Doc x={40} title="OJT requisition" delay={0.1} />
      <Doc x={310} title="Internship requisition" delay={0.25} />
      <Arrow d="M216 150 C 250 120, 274 120, 306 150" delay={0.5} dashed />
      <Label x={226} y={112}>CLARIFY</Label>
      <Label x={24} y={284}>ILLUSTRATIVE · NOT A SYSTEM SCREENSHOT</Label>
    </svg>
  );
}

export function CaseDiagram({ kind }: { kind: CaseStudy["diagram"] }) {
  const id = `arrow-${useId().replace(/:/g, "")}`;
  return (
    <MarkerId.Provider value={id}>
      {kind === "approval" ? <ApprovalDiagram /> : kind === "requisition" ? <RequisitionDiagram /> : <ProcessDiagram />}
    </MarkerId.Provider>
  );
}
