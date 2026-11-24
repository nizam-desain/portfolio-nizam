// Hairline glyphs drawn for this site (no icon library). Stroke follows
// currentColor; all are decorative unless given a title by the caller.
type P = { className?: string; size?: number };
const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "square" as const,
  "aria-hidden": true,
  focusable: false,
});

export const Arrow = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M3 12h17M14 6l6 6-6 6" />
  </svg>
);
export const ArrowOut = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M7 17 18 6M9 6h9v9" />
  </svg>
);
export const ArrowDown = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 3v17M6 14l6 6 6-6" />
  </svg>
);
export const ArrowUp = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 21V4M6 10l6-6 6 6" />
  </svg>
);
export const Plus = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 4v16M4 12h16" />
  </svg>
);
export const Close = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <path d="m5 5 14 14M19 5 5 19" />
  </svg>
);
export const Chevron = ({ className, size = 18, dir = "right" }: P & { dir?: "left" | "right" }) => (
  <svg {...base(size)} className={className}>
    <path d={dir === "right" ? "m9 5 7 7-7 7" : "m15 5-7 7 7 7"} />
  </svg>
);
export const Download = ({ className, size = 18 }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 3v12M7 10l5 5 5-5M4 20h16" />
  </svg>
);
export const Magnify = ({ className, size = 18, minus = false }: P & { minus?: boolean }) => (
  <svg {...base(size)} className={className}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m15.5 15.5 5 5M7.5 10.5h6" />
    {minus ? null : <path d="M10.5 7.5v6" />}
  </svg>
);
/** Decision diamond, used as a node marker throughout. */
export const Diamond = ({ className, size = 10 }: P) => (
  <svg width={size} height={size} viewBox="0 0 10 10" className={className} aria-hidden focusable={false}>
    <path d="M5 0.7 9.3 5 5 9.3 0.7 5Z" fill="currentColor" />
  </svg>
);
