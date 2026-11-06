import type { Config } from "tailwindcss";

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
        accent: token("accent"),
        "accent-ink": token("accent-ink"),
        sage: token("sage"),
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 8.4vw, 7.25rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.5rem, 5.6vw, 4.75rem)", { lineHeight: "1", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(2rem, 3.8vw, 3.25rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
      },
      maxWidth: {
        page: "78rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgb(var(--shadow) / 0.06), 0 8px 24px -12px rgb(var(--shadow) / 0.18)",
        lift: "0 2px 4px rgb(var(--shadow) / 0.06), 0 24px 48px -20px rgb(var(--shadow) / 0.32)",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        rise: { from: { opacity: "0", transform: "translateY(16px)" }, to: { opacity: "1", transform: "none" } },
        "mask-up": { from: { transform: "translateY(105%)" }, to: { transform: "none" } },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out both",
        rise: "rise 1s cubic-bezier(0.16, 1, 0.3, 1) both",
        "rise-slow": "rise 1.4s cubic-bezier(0.16, 1, 0.3, 1) both",
        "mask-up": "mask-up 1.1s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
