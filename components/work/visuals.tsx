import type React from "react";
import type { ReactNode } from "react";
import type { VisualKey } from "@/data/content";
import { Chain, Conn, Legend, Node, Plate, Sw, i } from "@/components/work/kit";
import { cn } from "@/lib/utils";
import { LifecycleStepper, ScenarioPlayer } from "@/components/work/interactive";

/* Case-study visuals, redrawn from the project documents. Everything is
   generic: roles instead of names, "outlets" instead of vendor names, item
   tiers instead of internal categories; no screenshots, data or security
   findings. */

const Tag = ({ children, tone = "stone" }: { children: ReactNode; tone?: "stone" | "oxide" | "sage" }) => (
  <span
    className={cn(
      "meta inline-flex items-center gap-1.5",
      tone === "oxide" ? "text-oxide" : tone === "sage" ? "text-sage-ink" : "text-stone",
    )}
  >
    {children}
  </span>
);

// ── Food ordering ───────────────────────────────────────────

function FoodGaps() {
  const gaps = [
    {
      t: "Paid without a check",
      s: [
        { l: "Customer pays in a banking app" },
        { l: "Staff press 'Confirm' → status Paid", bad: true },
        { l: "Order delivered" },
      ],
    },
    {
      t: "Cancelled, still prepared",
      s: [{ l: "Customer cancels" }, { l: "Order stays active", bad: true }, { l: "Kitchen prepares it" }],
    },
    {
      t: "A daily benefit counted twice",
      s: [{ l: "Several pending orders" }, { l: "Each takes the daily subsidy", bad: true }, { l: "Benefit exceeds the rule" }],
    },
  ];
  return (
    <Plate caption="AS-IS · each gap reproduced in historical tests">
      <div className="grid gap-8 md:grid-cols-3 md:gap-6">
        {gaps.map((g, gi) => (
          <div key={g.t} className="fade" style={i(gi)}>
            <p className="meta text-oxide">Gap {gi + 1}</p>
            <p className="display mt-1 text-[1.4rem] leading-tight">{g.t}</p>
            <ol className="mt-4">
              {g.s.map((st, si) => (
                <li key={st.l} className="relative flex gap-3 pb-4 last:pb-0">
                  {si < g.s.length - 1 ? <span aria-hidden className={cn("absolute left-[5px] top-3 h-full w-px", st.bad ? "bg-oxide" : "bg-ink/30")} /> : null}
                  <span aria-hidden className={cn("relative mt-1 block h-[11px] w-[11px] shrink-0 border", st.bad ? "border-oxide bg-oxide" : "border-ink bg-card")} />
                  <span className={cn("text-small", st.bad && "font-medium text-oxide")}>{st.l}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </Plate>
  );
}

function FoodHub() {
  const roles = [
    { r: "Customer", items: ["Browse outlets", "Cart per outlet", "Pay & say 'I have paid'", "Track the order"] },
    { r: "Vendor / kitchen", items: ["Active orders board", "Verify the payment", "Stock & sold-out", "Hand over"] },
    { r: "Administrator", items: ["Add & activate vendors", "Hours & themes", "Reports", "Eligibility rules"] },
  ];
  return (
    <Plate caption="TO-BE · one configurable platform">
      <div className="grid gap-4 md:grid-cols-3">
        {roles.map((r, n) => (
          <div key={r.r} className="fade overflow-hidden rounded-2xl border border-line/20" style={i(n)}>
            <p className="meta bg-ink px-3 py-2 text-paper">{r.r}</p>
            <ul className="divide-y divide-line/15 px-3">
              {r.items.map((it) => (
                <li key={it} className="py-2 text-small">{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div aria-hidden className="mx-auto hidden h-8 w-2/3 border-x border-b border-ink md:block" />
      <div className="fade mt-4 flex flex-col items-center md:mt-0" style={i(3)}>
        <div className="w-full rounded-2xl bg-sage px-4 py-4 text-center md:w-2/3">
          <p className="display text-h3 text-[#14202b]">One application</p>
          <p className="text-small text-[#14202b]/75">menus · orders · payment QR · hours · reports — per outlet</p>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {["Outlet A", "Outlet B", "+ future outlets"].map((o, n) => (
            <span key={o} className={cn("meta rounded-full border px-3 py-1.5", n === 2 ? "border-dashed border-ink/50 text-stone" : "border-ink")}>
              {o}
            </span>
          ))}
        </div>
      </div>
    </Plate>
  );
}

function Compare({ rows, caption }: { rows: [string, string, string][]; caption: string }) {
  return (
    <Plate caption={caption}>
      <div className="hidden grid-cols-[9rem_1fr_2rem_1fr] gap-4 border-b border-ink pb-2 md:grid">
        <span className="meta text-stone">Area</span>
        <span className="meta text-oxide">AS-IS</span>
        <span />
        <span className="meta text-sage-ink">TO-BE</span>
      </div>
      <ul>
        {rows.map(([a, b, c], n) => (
          <li key={a} className="fade grid gap-1.5 border-b border-line/15 py-4 md:grid-cols-[9rem_1fr_2rem_1fr] md:items-center md:gap-4" style={i(n)}>
            <span className="meta">{a}</span>
            <span className="flex items-start gap-2 text-small text-stone">
              <span aria-hidden className="mt-1.5 block h-2 w-2 shrink-0 bg-oxide" />
              {b}
            </span>
            <span aria-hidden className="hidden text-center text-stone md:block">→</span>
            <span className="flex items-start gap-2 text-small font-medium">
              <span aria-hidden className="mt-1.5 block h-2 w-2 shrink-0 bg-sage-ink" />
              {c}
            </span>
          </li>
        ))}
      </ul>
    </Plate>
  );
}

function FoodCompare() {
  return (
    <Compare
      caption="Summary of the status table in the project documentation"
      rows={[
        ["Payment", "Marked Paid with no check", "Customer acknowledges, vendor verifies"],
        ["Cancellation", "Cancel did not stop the order", "Cancel before payment; expiry; records kept"],
        ["Daily subsidy", "Applied to several pending orders", "Once a day, across outlets"],
        ["Stock", "Restored inconsistently", "Deduct, restore, sold-out, reminders"],
        ["Outlets", "One canteen only", "Several outlets, each with its own menu"],
        ["Onboarding", "Code change per vendor", "Admin sets up and activates a vendor"],
      ]}
    />
  );
}

function FoodTests() {
  const timeline = [
    ["26 Oct", "AS-IS analysis starts"],
    ["6 Nov", "TO-BE proposal"],
    ["10 Nov", "Build reported"],
    ["12–16 Nov", "Functional testing"],
    ["18–20 Nov", "Walkthrough recorded"],
    ["Next", "Deployment (dev team)"],
  ];
  return (
    <Plate caption="Functional testing · 43 agreed tests · testing environment">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div className="fade">
          <p className="display text-[clamp(4rem,2rem+6vw,7rem)] leading-[0.85]">
            43<span className="text-stone">/43</span>
          </p>
          <p className="meta mt-2 text-sage-ink">Passed</p>
          <div className="mt-5 grid max-w-[20rem] grid-cols-[repeat(11,minmax(0,1fr))] gap-[3px]" role="img" aria-label="43 of 43 functional tests passed">
            {Array.from({ length: 43 }, (_, n) => (
              <span key={n} className="aspect-square bg-sage-ink" />
            ))}
          </div>
        </div>
        <ol className="relative border-l border-ink/30 pl-6">
          {timeline.map(([d, l], n) => (
            <li key={d} className="fade relative pb-4 last:pb-0" style={i(n)}>
              <span aria-hidden className={cn("absolute -left-[29px] top-1 block h-[9px] w-[9px] border", n === timeline.length - 1 ? "border-dashed border-ink/50 bg-card" : "border-ink bg-ink")} />
              <span className="meta mr-3 inline-block w-20 text-stone">{d}</span>
              <span className={cn("text-small", n === timeline.length - 1 && "text-stone")}>{l}</span>
            </li>
          ))}
        </ol>
      </div>
    </Plate>
  );
}

// ── Item-level approval (request & approval workflow) ───────

function GtrAsis() {
  return (
    <Plate caption="AS-IS · simplified from the documented swimlane">
      <Chain>
        <Node n={0} role="Requester" label="Submits request" />
        <Conn />
        <Node n={1} role="System" label="Deducts stock" tone="oxide" note="before any approval" />
        <Conn />
        <Node n={2} role="Reviewer 1" label="Approve / reject all" shape="diamond" />
        <Conn />
        <Node n={3} role="Director" label="Approve / reject all" shape="diamond" />
        <Conn />
        <Node n={4} role="Fulfilment" label="Approve / reject all, then process" shape="diamond" tone="oxide" />
        <Conn />
        <Node n={5} role="Requester" label="Delivered" tone="ink" />
      </Chain>
      <p className="fade mt-8 flex items-center gap-3 border-t border-oxide pt-3 text-small text-oxide" style={i(6)}>
        <span aria-hidden className="font-mono">×</span> Any rejection ends the whole request · stock restored
      </p>
      <Legend items={[{ swatch: Sw.diamond, label: "Decision on the whole request" }, { swatch: Sw.oxide, label: "Pain point" }]} />
    </Plate>
  );
}

function GtrPains() {
  const p: [string, "flow" | "note"][] = [
    ["Decisions only on the whole request", "flow"],
    ["No item-level data", "note"],
    ["Justification sent as attachments", "note"],
    ["Inconsistent item images", "note"],
    ["Unsuitable stock can't be hidden", "note"],
    ["Fulfilment sees requests late", "flow"],
    ["Fulfilment also approves", "flow"],
    ["No consolidation step", "flow"],
    ["Fulfilment not told of rejections", "flow"],
    ["Stock deducted before approval", "flow"],
  ];
  return (
    <Plate caption="10 pain points · confirmed with the document owner">
      <ol className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line/15 sm:grid-cols-5">
        {p.map(([t, k], n) => (
          <li key={t} className="fade flex min-h-[7.5rem] flex-col justify-between bg-card p-3" style={i(n)}>
            <span className="flex items-center justify-between">
              <span className="display text-[1.5rem] leading-none text-oxide">{String(n + 1).padStart(2, "0")}</span>
              {k === "flow" ? (
                <span aria-hidden className="block h-2.5 w-2.5 bg-ink" />
              ) : (
                <span aria-hidden className="block h-2.5 w-2.5 border border-ink" />
              )}
            </span>
            <span className="mt-3 text-small leading-snug">{t}</span>
          </li>
        ))}
      </ol>
      <Legend items={[{ swatch: <span aria-hidden className="block h-2.5 w-2.5 bg-ink" />, label: "Observed in the AS-IS flow" }, { swatch: <span aria-hidden className="block h-2.5 w-2.5 border border-ink" />, label: "Recorded limitation" }]} />
    </Plate>
  );
}

function GtrTobe() {
  const branches = [
    { k: "Standard items only", who: "Manager decides", fyi: "Director informed" },
    { k: "High-value items only", who: "Director decides", fyi: "Manager informed" },
    { k: "Mixed request", who: "Manager, then Director", fyi: "each decides own tier" },
  ];
  return (
    <Plate caption="TO-BE approval journey · item tiers shown generically">
      <Chain>
        <Node n={0} role="Requester" label="Submits items" />
        <Conn tone="sage" />
        <Node n={1} role="System" label="Checks & reserves stock" tone="sage" />
        <Conn tone="sage" />
        <Node n={2} role="Reviewer 1" label="Reviews the whole request" shape="diamond" />
        <Conn tone="sage" />
        <Node n={3} role="System" label="Routes by item tier" shape="diamond" tone="ink" />
      </Chain>
      <div className="mt-6 grid gap-3 md:ml-[38%] md:grid-cols-3">
        {branches.map((b, n) => (
          <div key={b.k} className="fade border-t-2 border-ink pt-3" style={i(n + 4)}>
            <p className="meta text-stone">{b.k}</p>
            <p className="mt-1 font-medium">{b.who}</p>
            <p className="text-small text-stone">{b.fyi}</p>
          </div>
        ))}
      </div>
      <div className="fade mt-6 flex items-center gap-3 md:ml-[38%]" style={i(7)}>
        <span aria-hidden className="h-px flex-1 bg-sage-ink" />
        <span className="rounded-full bg-sage px-4 py-2 text-small font-medium text-[#14202b]">Fulfilment confirms & delivers — no approve / reject</span>
      </div>
    </Plate>
  );
}

function OjtShift() {
  return (
    <Plate caption="Before and after the online requisition">
      <div className="grid gap-8 md:grid-cols-2 md:gap-10">
        <div className="fade">
          <Tag tone="oxide">Before · paper</Tag>
          <div className="mt-5 flex items-end gap-2">
            {[0, 1, 2, 3, 4].map((n) => (
              <div key={n} className="flex flex-1 flex-col items-center gap-2">
                <span aria-hidden className="block aspect-[3/4] w-full max-w-[3.25rem] border border-ink/60 bg-sheet" style={{ transform: `rotate(${[-4, 3, -2, 5, -3][n]}deg)` }} />
                <span className="meta text-stone">Sign {n + 1}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 text-small text-stone">Form carried desk to desk · status unknown until it returns</p>
        </div>
        <div className="fade" style={i(1)}>
          <Tag tone="sage">After · online</Tag>
          <div className="mt-5 grid grid-cols-4 gap-2">
            {["One form", "E-mail to approver", "Live tracking", "PDF copy"].map((l, n) => (
              <div key={l} className={cn("flex aspect-square flex-col justify-end rounded-xl border p-2", n === 0 ? "border-sage-ink bg-sage text-[#14202b]" : "border-ink")}>
                <span className="meta leading-tight">{l}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 text-small text-stone">Submitted once · every approver notified · stage visible any time</p>
        </div>
      </div>
    </Plate>
  );
}

function OjtJourney() {
  const s = ["Sign in to the HR portal", "Open requisitions", "Create request & choose type", "Complete the form", "Submit", "Track · detail · PDF"];
  return (
    <Plate caption="Requester journey as written in the user manual">
      <Chain>
        {s.map((l, n) => (
          <div key={l} className="contents">
            <Node n={n} role={`Step ${n + 1}`} label={l} tone={n === 3 ? "sage" : n === 5 ? "ink" : "plain"} note={n === 3 ? "requester details pre-filled" : undefined} />
            {n < s.length - 1 ? <Conn /> : null}
          </div>
        ))}
      </Chain>
    </Plate>
  );
}

function OjtStages() {
  const st = ["Area manager", "Department head", "Talent development", "P&C manager", "P&C director"];
  return (
    <Plate caption="Approval tracking · example state, illustrative">
      <ol className="grid gap-3 md:grid-cols-5 md:gap-0">
        {st.map((l, n) => {
          const state = n < 2 ? "done" : n === 2 ? "now" : "wait";
          return (
            <li key={l} className="fade relative flex items-center gap-3 md:flex-col md:items-start md:gap-0" style={i(n)}>
              <div className="flex items-center md:w-full">
                <span
                  className={cn(
                    "grid h-10 w-10 shrink-0 place-items-center rounded-full border text-small font-semibold",
                    state === "done" ? "border-ink bg-ink text-paper" : state === "now" ? "border-sage-ink bg-sage text-[#14202b]" : "border-dashed border-ink/50 text-stone",
                  )}
                >
                  {state === "done" ? "✓" : n + 1}
                </span>
                {n < st.length - 1 ? <span aria-hidden className={cn("hidden h-px flex-1 md:block", n < 2 ? "bg-ink" : "bg-ink/25")} /> : null}
              </div>
              <div className="md:mt-3 md:pr-3">
                <p className="text-small font-medium">{l}</p>
                <p className="meta text-stone">{state === "done" ? "Approved" : state === "now" ? "Current stage" : "Waiting"}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </Plate>
  );
}

function OjtManual() {
  const how = ["Access", "Dashboard", "Create request", "Complete form", "Submit", "View request", "Track approval", "Notifications", "Request detail", "PDF"];
  const help = ["General", "Notifications", "Request information", "PDF access", "Submission", "Approval follow-up", "When to contact support", "Support contact"];
  return (
    <Plate caption="Structure of the user manual (v1.2)">
      <div className="grid gap-8 md:grid-cols-[1.25fr_1fr]">
        {[
          ["How to · 10", how, "ink"],
          ["Troubleshooting · 8", help, "oxide"],
        ].map(([t, list, tone]) => (
          <div key={t as string} className="fade">
            <p className={cn("meta", tone === "oxide" ? "text-oxide" : "")}>{t as string}</p>
            <ol className="mt-3 grid grid-cols-2 gap-1.5">
              {(list as string[]).map((l, n) => (
                <li key={l} className={cn("flex items-baseline gap-2 border px-2.5 py-2 text-small", tone === "oxide" ? "border-oxide/40" : "border-line/25")}>
                  <span className="meta text-stone">{String(n + 1).padStart(2, "0")}</span>
                  {l}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </Plate>
  );
}

// ── Leave assessment ────────────────────────────────────────

function LeaveTrace() {
  const layers = ["Screen", "Client script", "Server logic", "Stored data"];
  return (
    <Plate caption="Trace method · read-only, testing environment">
      <Chain>
        {layers.map((l, n) => (
          <div key={l} className="contents">
            <Node n={n} role={`Layer ${n + 1}`} label={l} tone={n === 3 ? "ink" : "plain"} shape={n === 3 ? "doc" : "box"} />
            {n < layers.length - 1 ? <Conn /> : null}
          </div>
        ))}
        <Conn tone="sage" />
        <Node n={4} role="Output" label="Evidence extract" tone="sage" shape="doc" note="20 in total" />
      </Chain>
      <p className="fade mt-8 border-t border-line/15 pt-3 text-small text-stone" style={i(5)}>
        Then compared with historical records — what the logic writes vs. what the data shows.
      </p>
    </Plate>
  );
}

function LeavePaths() {
  const ends = [
    ["Approved · one level", "ok"],
    ["Approved · two levels", "ok"],
    ["Approved by administrator", "ok"],
    ["Rejected", "stop"],
    ["Cancelled", "stop"],
    ["Deleted", "stop"],
  ];
  return (
    <Plate caption="Paths traced · balance effect checked on each">
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_3rem_minmax(0,2fr)] md:items-center">
        <div className="fade">
          <Node label="Employee submits" tone="ink" role="Path 1" />
          <div className="mt-3">
            <Node label="Pending approval" shape="diamond" />
          </div>
        </div>
        <span aria-hidden className="hidden h-full items-center md:flex">
          <span className="block h-[85%] w-full border-y border-l border-ink" />
        </span>
        <ul className="grid gap-2 sm:grid-cols-2">
          {ends.map(([l, k], n) => (
            <li key={l} className={cn("fade flex items-center justify-between gap-3 rounded-xl border px-3 py-3", k === "ok" ? "border-ink" : "border-dashed border-ink/50")} style={i(n + 1)}>
              <span className="text-small font-medium">
                <span className="meta mr-2 text-stone">{n + 2}</span>
                {l}
              </span>
              <span className="meta whitespace-nowrap text-stone">balance ✓</span>
            </li>
          ))}
        </ul>
      </div>
    </Plate>
  );
}

function LeaveEvidence() {
  const labels: [string, string, string][] = [
    ["Confirmed by source code", "ink", "Behaviour read directly from the logic"],
    ["Confirmed by database evidence", "ink", "Seen in structure or historical records"],
    ["Potential functional gap", "oxide", "Differs from what may be intended"],
    ["Pending business validation", "ghost", "Needs a rule decision from the HR owner"],
    ["Not tested", "ghost", "No runtime test was run"],
  ];
  return (
    <Plate caption="Evidence labels used throughout · specific findings remain internal">
      <ul className="grid gap-3 md:grid-cols-5">
        {labels.map(([l, t, d], n) => (
          <li key={l} className="fade flex flex-col" style={i(n)}>
            <span
              className={cn(
                "meta flex min-h-[4.25rem] items-end rounded-xl border p-3",
                t === "ink" ? "border-ink bg-ink text-paper" : t === "oxide" ? "border-oxide bg-oxide text-paper" : "border-dashed border-ink/50",
              )}
            >
              {l}
            </span>
            <span className="mt-2 text-small text-stone">{d}</span>
          </li>
        ))}
      </ul>
    </Plate>
  );
}

const registry: Record<VisualKey, () => React.ReactElement> = {
  "food-gaps": FoodGaps,
  "food-hub": FoodHub,
  "food-lifecycle": LifecycleStepper,
  "food-compare": FoodCompare,
  "food-tests": FoodTests,
  "gtr-asis": GtrAsis,
  "gtr-tobe": GtrTobe,
  "gtr-rejections": ScenarioPlayer,
  "gtr-pains": GtrPains,
  "ojt-shift": OjtShift,
  "ojt-journey": OjtJourney,
  "ojt-stages": OjtStages,
  "ojt-manual": OjtManual,
  "leave-trace": LeaveTrace,
  "leave-paths": LeavePaths,
  "leave-evidence": LeaveEvidence,
};

export function Visual({ k }: { k: VisualKey }) {
  const V = registry[k];
  return <V />;
}
