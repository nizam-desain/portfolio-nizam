"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plate } from "@/components/work/kit";
import { cn } from "@/lib/utils";

// ── Item-level approval: play a scenario ────────────────────

type Status = "pending" | "approved" | "rejected" | "skipped";
const scenarios = [
  {
    id: "a",
    label: "High-value only",
    who: "Director rejects",
    route: ["Reviewer 1", "Director"],
    items: [{ name: "High-value item", status: "rejected" as Status }],
    result: "Whole request rejected · stock restored",
    kind: "Whole request",
  },
  {
    id: "b",
    label: "Mixed request",
    who: "Manager rejects the standard item",
    route: ["Reviewer 1", "Manager"],
    items: [
      { name: "Standard item", status: "rejected" as Status },
      { name: "High-value item", status: "skipped" as Status },
    ],
    result: "Whole request rejected · never reaches the Director",
    kind: "Whole request",
  },
  {
    id: "c",
    label: "Mixed request",
    who: "Director rejects the high-value item",
    route: ["Reviewer 1", "Manager", "Director", "Fulfilment"],
    items: [
      { name: "Standard item", status: "approved" as Status },
      { name: "High-value item", status: "rejected" as Status },
    ],
    result: "Standard item continues to fulfilment",
    kind: "Item level",
  },
];

const chip: Record<Status, string> = {
  pending: "bg-ink/[0.06] text-stone",
  approved: "bg-sage text-[#14202b]",
  rejected: "bg-oxide text-white",
  skipped: "border border-dashed border-line/40 text-stone",
};
const word: Record<Status, string> = { pending: "Pending", approved: "Approved", rejected: "Rejected", skipped: "Not reached" };

export function ScenarioPlayer() {
  const [k, setK] = useState(2);
  const s = scenarios[k];
  return (
    <Plate caption="Interactive · scenarios verified in developer testing (not UAT) · items shown generically">
      <div role="tablist" aria-label="Approval scenarios" className="flex flex-wrap gap-2">
        {scenarios.map((sc, i) => (
          <button
            key={sc.id}
            role="tab"
            aria-selected={i === k}
            aria-controls="scenario-panel"
            onClick={() => setK(i)}
            className={cn(
              "rounded-2xl border px-4 py-2.5 text-left transition-colors duration-base",
              i === k ? "border-ink bg-ink text-paper" : "border-line/20 bg-card hover:border-line/50",
            )}
          >
            <span className="block text-[0.72rem] font-semibold opacity-70">Scenario {i + 1} · {sc.label}</span>
            <span className="block text-small font-semibold">{sc.who}</span>
          </button>
        ))}
      </div>

      <div id="scenario-panel" role="tabpanel" className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        {/* route */}
        <div>
          <p className="text-small font-semibold text-stone">Who the request reaches</p>
          <ol className="mt-4 flex flex-wrap items-center gap-2">
            {["Requester", "Reviewer 1", "Manager", "Director", "Fulfilment"].map((r, i) => {
              const reached = r === "Requester" || s.route.includes(r);
              return (
                <li key={r} className="flex items-center gap-2">
                  <motion.span
                    layout
                    className={cn(
                      "rounded-full px-3.5 py-2 text-small font-semibold transition-colors duration-slow",
                      reached ? "bg-sage-ink text-white" : "border border-dashed border-line/40 text-stone",
                    )}
                  >
                    {r}
                  </motion.span>
                  {i < 4 ? <span aria-hidden className={cn("h-px w-5 transition-colors", reached ? "bg-sage-ink" : "bg-line/30")} /> : null}
                </li>
              );
            })}
          </ol>
          <AnimatePresence mode="wait">
            <motion.p
              key={s.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className={cn("mt-6 rounded-2xl px-4 py-3 font-semibold", s.kind === "Item level" ? "bg-sage/60 text-ink dark:bg-sage/20" : "bg-oxide/10 text-oxide")}
              aria-live="polite"
            >
              {s.kind}: {s.result}
            </motion.p>
        </AnimatePresence>
        </div>

        {/* items */}
        <ul className="space-y-2.5">
          <AnimatePresence initial={false}>
            {s.items.map((it, i) => (
              <motion.li
                key={`${s.id}-${it.name}`}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.15 + i * 0.12, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-between rounded-2xl border border-line/15 bg-card px-4 py-3.5"
              >
                <span className="font-medium">{it.name}</span>
                <span className={cn("rounded-full px-3 py-1 text-[0.75rem] font-semibold", chip[it.status])}>{word[it.status]}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </Plate>
  );
}

// ── Food ordering: step through an order ────────────────────

const states = [
  { k: "Cart", d: "The customer picks dishes from one outlet." },
  { k: "Awaiting payment", d: "A payment QR is shown. The order expires if it isn't paid in time." },
  { k: "'I have paid'", d: "The customer says they have paid. It is a statement, not proof." },
  { k: "Vendor verifies", d: "The outlet checks the payment before anything is cooked." },
  { k: "Preparing", d: "Only verified orders reach the kitchen board." },
  { k: "Ready", d: "The customer is told the order can be collected." },
  { k: "Completed", d: "Handed over. The record is kept for reports." },
];

export function LifecycleStepper() {
  const [i, setI] = useState(0);
  const [exit, setExit] = useState<null | "Cancelled" | "Expired">(null);
  const canCancel = i <= 1 && !exit;
  const done = i === states.length - 1 || exit;

  return (
    <Plate caption="Interactive · TO-BE order lifecycle with generic states">
      <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
        {states.map((s, n) => {
          const st = exit ? (n <= i ? "past" : "off") : n < i ? "past" : n === i ? "now" : "next";
          return (
            <li
              key={s.k}
              className={cn(
                "rounded-2xl px-3 py-3 text-small font-semibold transition-colors duration-slow",
                st === "now" && "bg-sage-ink text-white shadow-[0_12px_24px_-14px_rgb(76_84_165/0.8)]",
                st === "past" && "bg-sage text-[#14202b]",
                st === "next" && "bg-ink/[0.05] text-stone",
                st === "off" && "border border-dashed border-line/30 text-stone",
              )}
            >
              <span aria-hidden className="block text-[0.7rem]">{String(n + 1).padStart(2, "0")}</span>
              {s.k}
            </li>
          );
        })}
      </ol>

      <div className="mt-6 grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={exit ?? i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className={cn("rounded-2xl px-4 py-3 text-lead", exit ? "bg-oxide/10 text-oxide" : "bg-ink/[0.04]")}
            aria-live="polite"
          >
            {exit === "Cancelled"
              ? "Cancelled before payment — the order stops here and the record is kept."
              : exit === "Expired"
                ? "Expired — not paid in time. The order stops and the record is kept."
                : states[i].d}
          </motion.p>
        </AnimatePresence>
        <div className="flex flex-wrap gap-2">
          {!done ? (
            <button type="button" onClick={() => setI((x) => x + 1)} className="slab !min-h-11">
              Next step
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setI(0);
                setExit(null);
              }}
              className="slab !min-h-11"
            >
              Start again
            </button>
          )}
          {canCancel ? (
            <>
              <button type="button" onClick={() => setExit("Cancelled")} className="min-h-11 rounded-[14px] border border-line/25 px-4 text-small font-semibold hover:border-oxide hover:text-oxide">
                Cancel
              </button>
              {i === 1 ? (
                <button type="button" onClick={() => setExit("Expired")} className="min-h-11 rounded-[14px] border border-line/25 px-4 text-small font-semibold hover:border-oxide hover:text-oxide">
                  Let it expire
                </button>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </Plate>
  );
}
