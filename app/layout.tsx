import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { profile, siteUrl, education } from "@/data/content";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const title = `${profile.name} — Business Analyst · Process Improvement · Strategy & Operations`;
const description =
  "Portfolio of Nizamuddin Zahrani, an Information Systems undergraduate and HR Information Systems intern at Mattel Indonesia, focused on business analysis, process improvement, and strategy & operations.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s — ${profile.name}` },
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
    { media: "(prefers-color-scheme: light)", color: "#f6f3ed" },
    { media: "(prefers-color-scheme: dark)", color: "#131211" },
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
    jobTitle: "Business Analyst (aspiring) — HR Information Systems Intern",
    address: { "@type": "PostalAddress", addressLocality: "Cikarang", addressCountry: "ID" },
    alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
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
      className={`${GeistSans.variable} ${GeistMono.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
          >
            Skip to content
          </a>
          {children}
        </Providers>
      </body>
    </html>
  );
}
