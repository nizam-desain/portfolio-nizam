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
    <Plate caption="Historical AS-IS findings · addressed in the completed TO-BE scope">
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
    { r: "Customer", items: ["Browse outlets & menus", "See open hours & daily benefit", "Order & acknowledge payment", "Track the order status"] },
    { r: "Vendor / kitchen", items: ["Incoming orders", "Verify payment manually", "Prepare & mark ready", "Stock & sold-out"] },
    { r: "Administrator", items: ["Add & activate vendors", "Hours & fulfilment options", "Eligibility rules", "Master data & reports"] },
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
      <div className="mt-8 grid gap-4 border-t border-line/15 pt-6 md:grid-cols-2">
        <div className="fade" style={i(4)}>
          <p className="meta text-stone">Operating windows · per outlet</p>
          <ul className="mt-3 space-y-2">
            {[
              ["One continuous schedule", [[0, 100]]],
              ["Several periods", [[0, 30], [45, 75]]],
              ["Break between sessions", [[0, 42], [58, 100]]],
            ].map(([l, bars]) => (
              <li key={l as string} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] items-center gap-3">
                <span className="text-small">{l as string}</span>
                <span aria-hidden className="relative block h-2.5 rounded-full bg-ink/[0.07]">
                  {(bars as number[][]).map(([a, b]) => (
                    <span key={a} className="absolute inset-y-0 rounded-full bg-sage-ink" style={{ left: `${a}%`, width: `${b - a}%` }} />
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="fade" style={i(5)}>
          <p className="meta text-stone">Fulfilment options · configured, not hard-coded</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Packaged", "Plated", "Dine-in", "Pickup", "Delivery, where supported"].map((o, n) => (
              <span key={o} className={cn("rounded-full px-3 py-1.5 text-small", n === 4 ? "border border-dashed border-ink/50 text-stone" : "bg-ink/[0.06]")}>
                {o}
              </span>
            ))}
          </div>
          <p className="mt-3 text-small text-stone">Offered by outlet setting, eligibility category and service type.</p>
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
      caption="AS-IS findings and stakeholder requests, mapped to the delivered TO-BE"
      rows={[
        ["Payment", "Marked Paid with no check", "Customer acknowledges, vendor verifies"],
        ["Cancellation", "Cancel did not stop the order", "Cancel before payment; expiry; records kept"],
        ["Daily subsidy", "Applied to several pending orders", "Once a day, across outlets"],
        ["Stock", "Restored inconsistently", "Deduct, restore, sold-out, reminders"],
        ["Outlets", "One canteen only", "Several outlets, each with its own menu"],
        ["Onboarding", "Code change per vendor", "Admin sets up and activates a vendor"],
        ["Operating hours", "One fixed window", "Single, split or break schedules per outlet"],
        ["Fulfilment", "One fixed workflow", "Options set per outlet and eligibility"],
        ["Order status", "Unclear to the customer", "Clear stages, with a ready-to-collect state"],
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
    ["18–20 Nov", "Walkthrough & stakeholder review"],
    ["Then", "Refinements from feedback"],
    ["Done", "Agreed scope completed"],
    ["Separate", "Production deployment (implementation team)"],
  ];
  const stock = [
    { t: "Last available portion", d: "Two customers order the final unit at almost the same time. One order secures it; the other sees 'sold out'.", r: "No overselling in the tested flow" },
    { t: "Mixed-stock cart", d: "A limited item runs out while another cart item is still in stock.", r: "The available item stays selectable" },
  ];
  return (
    <Plate caption="43 agreed functional scenarios · testing environment · analyst-reported · not load, security or UAT testing">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div className="fade">
          <p className="display text-[clamp(4rem,2rem+6vw,7rem)] leading-[0.85]">
            43<span className="text-stone">/43</span>
          </p>
          <p className="meta mt-2 text-sage-ink">Agreed scenarios passed</p>
          <div className="mt-5 grid max-w-[20rem] grid-cols-[repeat(11,minmax(0,1fr))] gap-[3px]" role="img" aria-label="43 of 43 agreed functional scenarios passed">
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
              <span className={cn("text-small", n === timeline.length - 1 && "text-stone", n === timeline.length - 2 && "font-semibold text-sage-ink")}>{l}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-10 border-t border-line/15 pt-6">
        <p className="meta text-stone">Stock-conflict checks · two targeted concurrent-order scenarios</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {stock.map((x, n) => (
            <div key={x.t} className="fade rounded-2xl border border-line/20 p-4" style={i(n)}>
              <p className="meta text-stone">Scenario {String.fromCharCode(65 + n)}</p>
              <p className="display mt-1 text-[1.35rem] leading-tight">{x.t}</p>
              <div aria-hidden className="mt-3 flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-sage-ink text-[0.7rem] font-semibold text-white">C1</span>
                <span className="h-px w-6 bg-ink/40" />
                <span className="rounded-lg border border-ink px-2 py-1 text-[0.72rem] font-semibold">{n === 0 ? "1 left" : "Limited + available"}</span>
                <span className="h-px w-6 bg-ink/40" />
                <span className="grid h-8 w-8 place-items-center rounded-full border border-dashed border-ink/60 text-[0.7rem] font-semibold text-stone">C2</span>
              </div>
              <p className="mt-3 text-small text-stone">{x.d}</p>
              <p className="mt-2 flex items-center gap-2 text-small font-medium">
                <span aria-hidden className="block h-2 w-2 shrink-0 bg-sage-ink" />
                {x.r}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-small text-stone">Scenario-specific evidence only — not load testing or a guarantee against every race condition.</p>
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
            {[0, 1, 2, 3].map((n) => (
              <div key={n} className="flex flex-1 flex-col items-center gap-2">
                <span aria-hidden className="block aspect-[3/4] w-full max-w-[3.25rem] border border-ink/60 bg-sheet" style={{ transform: `rotate(${[-4, 3, -2, 5][n]}deg)` }} />
                <span className="meta text-stone">{n === 3 ? "…" : "Sign"}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 text-small text-stone">Form carried desk to desk · status unknown until it returns</p>
        </div>
        <div className="fade" style={i(1)}>
          <Tag tone="sage">After · online</Tag>
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {["One form", "E-mail notice", "Live tracking", "Return & revise"].map((l, n) => (
              <div key={l} className={cn("flex aspect-[2/1] flex-col justify-end rounded-xl border p-2 sm:aspect-square", n === 0 ? "border-sage-ink bg-sage text-[#14202b]" : "border-ink")}>
                <span className="meta leading-tight">{l}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 text-small text-stone">Submitted once · reviewers notified · stage visible · corrections made on the same request</p>
        </div>
      </div>
    </Plate>
  );
}

function OjtJourney() {
  const s = ["Access the request platform", "Prepare a new request", "Complete the required information", "Submit for review", "Monitor progress", "Respond to revision requests"];
  return (
    <Plate caption="Requester journey · generalised from the user guide">
      <Chain>
        {s.map((l, n) => (
          <div key={l} className="contents">
            <Node n={n} role={`Step ${n + 1}`} label={l} tone={n === 2 ? "sage" : n === 4 ? "ink" : n === 5 ? "ghost" : "plain"} note={n === 2 ? "requester details pre-filled" : n === 5 ? "only when returned" : undefined} />
            {n < s.length - 1 ? <Conn /> : null}
          </div>
        ))}
      </Chain>
    </Plate>
  );
}

function OjtStages() {
  return (
    <Plate caption="Conceptual workflow illustration — not an actual internal system representation">
      <Chain>
        <Node n={0} role="Requester" label="Request submitted" />
        <Conn />
        <Node n={1} role="Review" label="Review in progress" />
        <Conn />
        <Node n={2} role="Review" label="Decision" shape="diamond" tone="ink" />
        <Conn tone="sage" />
        <Node n={3} role="Approved" label="Further review" tone="sage" />
        <Conn tone="sage" />
        <Node n={4} role="Outcome" label="Process continues" tone="sage" />
      </Chain>
      <div className="mt-8 grid gap-4 md:grid-cols-[1fr_1fr]">
        <div className="fade rounded-2xl border border-oxide/50 p-4" style={i(5)}>
          <p className="meta text-oxide">Exception · clarification required</p>
          <ol className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
            {["Returned to the requester", "Request refined", "Resubmitted for review"].map((l, n) => (
              <li key={l} className="flex items-center gap-2">
                <span className="rounded-xl border border-line/25 bg-card px-3 py-2 text-small font-medium">{l}</span>
                {n < 2 ? <span aria-hidden className="hidden text-oxide sm:inline">→</span> : <span aria-hidden className="text-oxide">↺</span>}
              </li>
            ))}
          </ol>
          <p className="mt-3 text-small text-stone">The same request is corrected and re-enters review — no duplicate request.</p>
        </div>
        <div className="fade rounded-2xl border border-dashed border-ink/40 p-4" style={i(6)}>
          <p className="meta text-stone">Standard decision</p>
          <p className="mt-3 text-small">Approve moves the request forward; decline ends it. A returned request is neither — it is waiting on the requester.</p>
        </div>
      </div>
    </Plate>
  );
}

function OjtManual() {
  const how = ["Platform access", "Request overview", "Request creation", "Information preparation", "Initial submission", "Request monitoring", "Workflow progress", "Review communications", "Revision & resubmission", "Information review", "Document access"];
  const help = ["General guidance", "Review communications", "Request information", "Document access", "Submission difficulties", "Progress follow-up", "Escalation guidance", "Support guidance"];
  return (
    <Plate caption="Structure of the revised user guide · topics generalised · new or expanded guidance highlighted">
      <div className="grid gap-8 md:grid-cols-[1.25fr_1fr]">
        {[
          ["User guidance · 11", how, "ink"],
          ["Troubleshooting · 8", help, "oxide"],
        ].map(([t, list, tone]) => (
          <div key={t as string} className="fade">
            <p className={cn("meta", tone === "oxide" ? "text-oxide" : "")}>{t as string}</p>
            <ol className="mt-3 grid grid-cols-2 gap-1.5">
              {(list as string[]).map((l, n) => (
                <li key={l} className={cn("flex items-baseline gap-2 border px-2.5 py-2 text-small", tone === "oxide" ? "border-oxide/40" : "border-line/25", (l === "Revision & resubmission" || l === "Workflow progress") && "border-sage-ink bg-sage text-[#14202b]")}>
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
  const layers = ["User action", "Application logic", "Data written", "Historical records"];
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
        <Node n={4} role="Output" label="Labelled observation" tone="sage" shape="doc" />
      </Chain>
      <p className="fade mt-8 border-t border-line/15 pt-3 text-small text-stone" style={i(5)}>
        Then reconciled with existing process descriptions — what the application does vs. what people expect it to do.
      </p>
    </Plate>
  );
}

function AsisMethod() {
  const st: [string, string][] = [
    ["Understand", "Purpose, process boundaries and functional scope"],
    ["Investigate", "Trace behaviour through application and data evidence"],
    ["Model", "Organise current-state workflows with systems-analysis techniques"],
    ["Reconcile", "Compare views; record gaps and open assumptions"],
    ["Document", "Structured process and functional assessment"],
    ["Review", "Submit for technical review; list what still needs validating"],
  ];
  return (
    <Plate caption="Assessment method · stage 06 requested, response pending">
      <ol className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line/15 md:grid-cols-3 lg:grid-cols-6">
        {st.map(([t, d], n) => (
          <li key={t} className={cn("fade flex min-h-[9rem] flex-col justify-between p-4", n === 5 ? "bg-paper" : "bg-card")} style={i(n)}>
            <span className={cn("display text-[1.6rem] leading-none", n === 5 ? "text-stone" : "text-sage-ink")}>{String(n + 1).padStart(2, "0")}</span>
            <span>
              <span className="block font-semibold">{t}</span>
              <span className="mt-1 block text-small leading-snug text-stone">{d}</span>
            </span>
          </li>
        ))}
      </ol>
    </Plate>
  );
}

function AsisModels() {
  const g = {
    map: <span className="flex items-center gap-1">{[0, 1, 2].map((n) => <span key={n} className="block h-3 w-4 rounded-[3px] border border-current" />)}</span>,
    lanes: <span className="grid gap-1">{[0, 1, 2].map((n) => <span key={n} className="flex h-2.5 w-14 items-center border-y border-current opacity-50 pl-1"><span className="block h-1.5 w-3 bg-current" style={{ marginLeft: `${n * 14}px` }} /></span>)}</span>,
    usecase: <span className="flex items-center gap-1.5"><span className="block h-4 w-1 rounded-full bg-current" /><span className="grid gap-1">{[0, 1].map((n) => <span key={n} className="block h-2.5 w-9 rounded-full border border-current" />)}</span></span>,
    dfd: <span className="flex items-center gap-1"><span className="block h-5 w-5 rounded-full border border-current" /><span className="block h-px w-3 bg-current" /><span className="block h-3 w-6 border-y border-current" /></span>,
    erd: <span className="flex items-center gap-1"><span className="block h-5 w-6 border border-current" /><span className="block h-px w-3 bg-current" /><span className="block h-5 w-6 border border-current" /></span>,
    matrix: <span className="grid grid-cols-4 gap-0.5">{Array.from({ length: 8 }, (_, n) => <span key={n} className={cn("block h-2 w-2.5", [0, 5, 2, 7].includes(n) ? "bg-current" : "border border-current opacity-50")} />)}</span>,
    rules: <span className="grid gap-1">{[10, 7, 9].map((w, n) => <span key={n} className="flex items-center gap-1"><span className="block h-1.5 w-1.5 rotate-45 border border-current" /><span className="block h-px bg-current" style={{ width: `${w * 4}px` }} /></span>)}</span>,
    tracker: <span className="grid gap-1">{["bg-current", "border border-current", "border border-dashed border-current"].map((c, n) => <span key={n} className="flex items-center gap-1"><span className={cn("block h-2 w-2 rounded-full", c)} /><span className="block h-px w-8 bg-current opacity-50" /></span>)}</span>,
    check: <span className="grid gap-1">{[1, 1, 0].map((c, n) => <span key={n} className="flex items-center gap-1"><span className="grid h-2.5 w-2.5 place-items-center border border-current text-[7px] leading-none">{c ? "✓" : ""}</span><span className="block h-px w-8 bg-current opacity-50" /></span>)}</span>,
  };
  const items: [keyof typeof g, string, string][] = [
    ["map", "AS-IS process map", "End-to-end view of the workflows"],
    ["lanes", "BPMN swimlanes", "Who does what, and in which order"],
    ["usecase", "UML use cases", "What each role can do"],
    ["dfd", "Data flow diagram", "How information moves"],
    ["erd", "Entity relationships", "How the records connect"],
    ["matrix", "Traceability matrix", "Functions linked to their evidence"],
    ["rules", "Business-rule summary", "Rules as they appear today"],
    ["tracker", "Evidence & questions tracker", "What is confirmed, what is open"],
    ["check", "Technical review checklist", "Questions for the reviewer to answer"],
  ];
  return (
    <Plate caption="Deliverable types · not every model has been validated · internal documents are not shown">
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(([k, t, d], n) => (
          <li key={t} className="fade flex items-start gap-4 rounded-2xl border border-line/20 p-4" style={i(n)}>
            <span aria-hidden className="grid h-12 w-16 shrink-0 place-items-center rounded-xl bg-ink/[0.05] text-sage-ink">{g[k]}</span>
            <span>
              <span className="block font-semibold leading-snug">{t}</span>
              <span className="mt-1 block text-small text-stone">{d}</span>
            </span>
          </li>
        ))}
      </ul>
    </Plate>
  );
}

function AsisReview() {
  return (
    <Plate caption="Status · technical review requested; validation and TO-BE design not yet started">
      <Chain>
        <Node n={0} role="Done" label="Current-state baseline documented" tone="ink" shape="doc" />
        <Conn tone="sage" />
        <Node n={1} role="Requested" label="Technical review" tone="sage" note="response pending" />
        <Conn broken />
        <Node n={2} role="Next" label="Business-owner validation" tone="ghost" />
        <Conn broken />
        <Node n={3} role="Out of scope" label="Improvement planning (TO-BE)" tone="ghost" />
      </Chain>
      <Legend items={[{ swatch: Sw.ink, label: "Delivered" }, { swatch: Sw.sage, label: "In review" }, { swatch: Sw.ghost, label: "Not started" }]} />
    </Plate>
  );
}

function LeaveEvidence() {
  const labels: [string, string, string][] = [
    ["Observed in evidence", "ink", "Seen directly in the available application or data evidence"],
    ["Analyst interpretation", "sage", "My reading of what the behaviour suggests"],
    ["Unresolved question", "oxide", "The evidence cannot answer it yet"],
    ["Pending validation", "ghost", "Needs a technical or business owner to confirm"],
    ["Not runtime-tested", "ghost", "No live walkthrough was run"],
  ];
  return (
    <Plate caption="Evidence labels used throughout · methodology only — specific findings remain internal">
      <ul className="grid gap-3 md:grid-cols-5">
        {labels.map(([l, t, d], n) => (
          <li key={l} className="fade flex flex-col" style={i(n)}>
            <span
              className={cn(
                "meta flex min-h-[4.25rem] items-end rounded-xl border p-3",
                t === "ink" ? "border-ink bg-ink text-paper" : t === "oxide" ? "border-oxide text-oxide" : t === "sage" ? "border-sage-ink bg-sage text-[#14202b]" : "border-dashed border-ink/50",
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
  "req-shift": OjtShift,
  "req-journey": OjtJourney,
  "req-exceptions": OjtStages,
  "req-manual": OjtManual,
  "leave-trace": LeaveTrace,
  "leave-evidence": LeaveEvidence,
  "asis-method": AsisMethod,
  "asis-models": AsisModels,
  "asis-review": AsisReview,
};

export function Visual({ k }: { k: VisualKey }) {
  const V = registry[k];
  return <V />;
}
