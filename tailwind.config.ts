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
        card: token("card"),
        sage: token("sage"),
        "sage-ink": token("sage-ink"),
        oxide: token("oxide"),
        lav: token("lav"),
        teal: token("teal"),
        night: token("night"),
        ivory: token("ivory"),
      },
      fontFamily: {
        display: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-sans)", "ui-sans-serif", "sans-serif"],
      },
      fontSize: {
        "meta": ["0.75rem", { lineHeight: "1.45", letterSpacing: "0.07em" }],
        "small": ["0.875rem", { lineHeight: "1.55" }],
        "body": ["clamp(1rem, 0.97rem + 0.15vw, 1.0625rem)", { lineHeight: "1.7" }],
        "lead": ["clamp(1.125rem, 1.04rem + 0.4vw, 1.35rem)", { lineHeight: "1.55" }],
        "h3": ["clamp(1.5rem, 1.25rem + 0.9vw, 2.1rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "h2": ["clamp(2.1rem, 1.5rem + 2.6vw, 4rem)", { lineHeight: "1.06", letterSpacing: "-0.015em" }],
        "h1": ["clamp(2.75rem, 1.7rem + 4.4vw, 6.25rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "mega": ["clamp(3.4rem, 1.6rem + 7.4vw, 9.5rem)", { lineHeight: "0.98", letterSpacing: "-0.025em" }],
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
        hair: "2px",
        frame: "var(--radius)",
        "frame-lg": "var(--radius-lg)",
      },
    },
  },
  plugins: [],
};

export default config;
