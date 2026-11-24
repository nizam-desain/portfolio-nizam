import localFont from "next/font/local";

// Two families, self-hosted (SIL OFL 1.1). See app/fonts/LICENSES.md.
export const sans = localFont({
  src: "../app/fonts/plus-jakarta-sans.woff2",
  variable: "--font-sans",
  weight: "200 800",
  display: "swap",
});

export const serif = localFont({
  src: [
    { path: "../app/fonts/instrument-serif.woff2", weight: "400", style: "normal" },
    { path: "../app/fonts/instrument-serif-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
});
