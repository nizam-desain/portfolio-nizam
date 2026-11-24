"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Before / after comparison. A native range input drives the split, so it
 * works with keyboard (arrow keys), touch and screen readers.
 */
export function Compare({ before, after, beforeLabel, afterLabel }: { before: string; after: string; beforeLabel: string; afterLabel: string }) {
  const [pos, setPos] = useState(50);
  return (
    <figure className="img-frame relative aspect-[10/7] w-full select-none bg-sheet" data-reveal>
      <Image src={after} alt={afterLabel} fill sizes="(min-width: 1024px) 80vw, 100vw" className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before} alt={beforeLabel} fill sizes="(min-width: 1024px) 80vw, 100vw" className="object-cover" />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
        <span className="absolute inset-y-0 -left-px w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08)]" />
        <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[#20242C] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]">
          ⟷
        </span>
      </div>
      <span className="absolute left-4 top-4 rounded-full bg-[#20242C]/80 px-3 py-1.5 text-[0.75rem] font-semibold text-white backdrop-blur">Before · {beforeLabel}</span>
      <span className="absolute right-4 top-4 rounded-full bg-white/85 px-3 py-1.5 text-[0.75rem] font-semibold text-[#20242C] backdrop-blur">After · {afterLabel}</span>
      <label className="sr-only" htmlFor="ba-range">Drag to compare before and after</label>
      <input
        id="ba-range"
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="ba-range absolute inset-0 h-full w-full cursor-ew-resize opacity-0 focus-visible:opacity-100"
        aria-valuetext={`${pos}% before`}
      />
      <figcaption className="absolute bottom-4 left-4 rounded-full bg-white/80 px-3 py-1.5 text-[0.72rem] font-semibold text-[#20242C] backdrop-blur">
        Conceptual reconstruction · drag to compare
      </figcaption>
    </figure>
  );
}
