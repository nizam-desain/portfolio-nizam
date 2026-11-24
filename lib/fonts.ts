import localFont from "next/font/local";

// Self-hosted (SIL OFL 1.1). See app/fonts/LICENSES.md.
export const display = localFont({
  src: "../app/fonts/archivo-wdth.woff2",
  variable: "--font-display",
  weight: "100 900",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

export const sans = localFont({
  src: "../app/fonts/instrument-sans.woff2",
  variable: "--font-sans",
  weight: "400 700",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "75% 100%" }],
});

export const serif = localFont({
  src: "../app/fonts/newsreader-italic.woff2",
  variable: "--font-serif",
  weight: "200 800",
  style: "italic",
  display: "swap",
  preload: false,
});

export const mono = localFont({
  src: [
    { path: "../app/fonts/plex-mono-400.woff2", weight: "400" },
    { path: "../app/fonts/plex-mono-500.woff2", weight: "500" },
  ],
  variable: "--font-mono",
  display: "swap",
});
