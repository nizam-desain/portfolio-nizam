import type { Config } from "tailwindcss";

// Every colour is a CSS variable holding RGB channels (see app/globals.css),
// so utilities work in both themes and accept alpha modifiers (bg-ink/5).
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1600px",
      "3xl": "2200px",
    },
    extend: {
      colors: {
        paper: token("paper"),
        sheet: token("sheet"),
        ink: token("ink"),
        graphite: token("graphite"),
        stone: token("stone"),
        line: token("line"),
        sage: token("sage"),
        "sage-ink": token("sage-ink"),
        oxide: token("oxide"),
        night: token("night"),
        ivory: token("ivory"),
      },
      fontFamily: {
        display: ["var(--font-display)", "Arial Narrow", "sans-serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Fluid scale. Display sizes are set in condensed Archivo.
        "meta": ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.08em" }],
        "small": ["0.8125rem", { lineHeight: "1.5" }],
        "body": ["clamp(1rem, 0.96rem + 0.18vw, 1.0625rem)", { lineHeight: "1.62" }],
        "lead": ["clamp(1.125rem, 1.02rem + 0.5vw, 1.4rem)", { lineHeight: "1.45", letterSpacing: "-0.005em" }],
        "h3": ["clamp(1.375rem, 1.2rem + 0.8vw, 1.875rem)", { lineHeight: "1.12", letterSpacing: "-0.01em" }],
        "h2": ["clamp(2.25rem, 1.6rem + 3vw, 4.5rem)", { lineHeight: "0.96", letterSpacing: "-0.02em" }],
        "h1": ["clamp(3rem, 1.8rem + 6vw, 8rem)", { lineHeight: "0.9", letterSpacing: "-0.025em" }],
        "mega": ["clamp(4.25rem, 0.5rem + 17vw, 22rem)", { lineHeight: "0.8", letterSpacing: "-0.035em" }],
      },
      spacing: {
        gutter: "var(--gutter)",
        margin: "var(--margin)",
        section: "var(--section)",
      },
      maxWidth: {
        frame: "var(--frame)",
        measure: "36rem",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
        inout: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      transitionDuration: {
        quick: "180ms",
        base: "320ms",
        slow: "640ms",
        cine: "1100ms",
      },
      borderRadius: {
        none: "0",
        hair: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
