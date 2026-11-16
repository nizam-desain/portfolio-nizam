import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/providers";
import { profile, siteUrl, education } from "@/data/content";

// All type is self-hosted (SIL OFL 1.1, licences in app/fonts) so the build
// never depends on fetching a font service.
const sans = localFont({
  src: "./fonts/sofia-sans-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-sans",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const display = localFont({
  src: "./fonts/sofia-sans-semi-condensed-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-display",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const serif = localFont({
  src: [{ path: "./fonts/newsreader-latin-400-italic.woff2", weight: "400", style: "italic" }],
  variable: "--font-serif",
  display: "swap",
  preload: false,
  fallback: ["ui-serif", "Georgia", "serif"],
});

const title = `${profile.name} | Business Analyst, Process Improvement, Strategy & Operations`;
const description =
  "Portfolio of Nizamuddin Zahrani, an Information Systems undergraduate and HR Information Systems intern at Mattel Indonesia, focused on business analysis, process improvement, and strategy & operations.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s | ${profile.name}` },
  description,
  applicationName: profile.name,
  authors: [{ name: profile.legalName, url: siteUrl }],
  creator: profile.legalName,
  keywords: [
    "Nizamuddin Zahrani",
    "Business Analyst",
    "Functional Analyst",
    "Business Process Improvement",
    "Strategy and Operations",
    "Requirements Analysis",
    "President University",
    "Information Systems",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title,
    description,
    locale: "en_US",
    firstName: "Nizamuddin",
    lastName: "Zahrani",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f6f2" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1017" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.legalName,
    alternateName: profile.name,
    url: siteUrl,
    image: `${siteUrl}${profile.portrait.src}`,
    email: `mailto:${profile.email}`,
    jobTitle: "HR Information Systems Intern",
    description,
    address: { "@type": "PostalAddress", addressLocality: "Cikarang", addressCountry: "ID" },
    affiliation: { "@type": "CollegeOrUniversity", name: education.school },
    knowsAbout: [
      "Business process analysis",
      "Requirements elicitation",
      "Functional testing",
      "Stakeholder management",
      "Enterprise Resource Planning",
    ],
    sameAs: [profile.linkedin, profile.github],
  };

  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Marks scripting as available before first paint, so scroll reveals
            only hide content when they are able to show it again. */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-control focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
          >
            Skip to content
          </a>
          {children}
        </Providers>
      </body>
    </html>
  );
}
