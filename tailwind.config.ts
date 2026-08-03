import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#0A0A0B",
        surface: {
          DEFAULT: "#111113",
          light: "#FFFFFF",
        },
        canvas: {
          DEFAULT: "#0A0A0B",
          light: "#FAFAFA",
        },
        ink: {
          DEFAULT: "#EDEDEF",
          muted: "#8A8A93",
          light: "#101012",
          "light-muted": "#5C5C66",
        },
        line: {
          DEFAULT: "rgba(255,255,255,0.08)",
          light: "rgba(10,10,11,0.08)",
        },
        accent: {
          blue: "#4F7CFF",
          purple: "#7A5FFF",
          cyan: "#49D8E0",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      backgroundImage: {
        "mesh-gradient":
          "radial-gradient(circle at 20% 20%, rgba(79,124,255,0.18), transparent 40%), radial-gradient(circle at 80% 0%, rgba(122,95,255,0.16), transparent 45%), radial-gradient(circle at 50% 100%, rgba(73,216,224,0.12), transparent 40%)",
        "grid-pattern":
          "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
      },
      keyframes: {
        "flow-dash": {
          to: { strokeDashoffset: "-200" },
        },
        "pulse-node": {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.15)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "flow-dash": "flow-dash 6s linear infinite",
        "pulse-node": "pulse-node 3s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
