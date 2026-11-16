import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

// Colours are CSS variables (RGB channels) defined per theme in
// app/globals.css, so every utility works in light and dark mode
// with alpha modifiers (e.g. bg-accent/10).
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: token("paper"),
        surface: token("surface"),
        raised: token("raised"),
        ink: token("ink"),
        muted: token("muted"),
        faint: token("faint"),
        line: token("line"),
        rule: token("rule"),
        accent: token("accent"),
        "accent-ink": token("accent-ink"),
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      },
      fontSize: {
        // Display sizes are set in the semi-condensed cut at a light weight.
        statement: ["clamp(2.9rem, 6.6vw, 6.4rem)", { lineHeight: "0.94", letterSpacing: "-0.022em" }],
        "display-lg": ["clamp(2.1rem, 4.4vw, 4.1rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.7rem, 2.9vw, 2.6rem)", { lineHeight: "1.06", letterSpacing: "-0.015em" }],
        "display-sm": ["clamp(1.4rem, 2vw, 1.75rem)", { lineHeight: "1.12", letterSpacing: "-0.01em" }],
        lead: ["clamp(1.2rem, 1.55vw, 1.45rem)", { lineHeight: "1.45" }],
        body: ["1.0625rem", { lineHeight: "1.6" }],
        note: ["1.125rem", { lineHeight: "1.4" }],
      },
      maxWidth: {
        page: "90rem",
        measure: "38rem",
      },
      borderRadius: {
        frame: "2px",
        control: "6px",
      },
      boxShadow: {
        lift: "0 1px 2px rgb(var(--shadow) / 0.06), 0 18px 40px -18px rgb(var(--shadow) / 0.28)",
        sheet: "0 0 0 1px rgb(var(--shadow) / 0.04), 0 30px 80px -30px rgb(var(--shadow) / 0.45)",
      },
      transitionTimingFunction: {
        draft: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
      keyframes: {
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        rise: { from: { opacity: "0", transform: "translateY(14px)" }, to: { opacity: "1", transform: "none" } },
        "mask-up": { from: { transform: "translateY(108%)" }, to: { transform: "none" } },
        "draw-x": { from: { transform: "scaleX(0)" }, to: { transform: "scaleX(1)" } },
        "draw-y": { from: { transform: "scaleY(0)" }, to: { transform: "scaleY(1)" } },
        stroke: { from: { strokeDashoffset: "1" }, to: { strokeDashoffset: "0" } },
        pop: { from: { opacity: "0", transform: "scale(0.4)" }, to: { opacity: "1", transform: "none" } },
        ping: { "0%": { transform: "scale(1)", opacity: "0.6" }, "100%": { transform: "scale(2.6)", opacity: "0" } },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out both",
        rise: "rise 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both",
        "mask-up": "mask-up 1s cubic-bezier(0.2, 0.8, 0.2, 1) both",
        "draw-x": "draw-x 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both",
        "draw-y": "draw-y 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both",
        stroke: "stroke 1.9s cubic-bezier(0.45, 0.05, 0.25, 1) both",
        pop: "pop 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both",
        ping: "ping 2.2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [
    // `short:` targets wide but shallow viewports (most laptops). It keeps the hero's actions
    // above the fold. Registered as a variant, not a screen, so `max-*` and `min-*` keep working.
    // Plugin variants sort before the breakpoints, so its utilities are written with `!` to win.
    plugin(({ addVariant }) => addVariant("short", "@media (min-width: 1024px) and (max-height: 840px)")),
  ],
};

export default config;
