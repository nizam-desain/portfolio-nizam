import type { Metadata, Viewport } from "next";
import "./globals.css";
import { display, sans, serif, mono } from "@/lib/fonts";
import { Providers } from "@/components/providers";
import { MotionRoot } from "@/components/motion-root";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { profile, siteUrl, education } from "@/data/content";

const title = `${profile.name} — Business & Functional Analysis`;
const description =
  "Nizam Zahrani is an Information Systems undergraduate at President University and an HR Information Systems intern at Mattel Indonesia, working on business process analysis, functional requirements and process improvement.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s — ${profile.name}` },
  description,
  applicationName: profile.name,
  authors: [{ name: profile.legalName, url: siteUrl }],
  creator: profile.legalName,
  keywords: [
    "Nizam Zahrani",
    "Nizamuddin Zahrani",
    "Business Analysis",
    "Functional Analysis",
    "Business Process Improvement",
    "Requirements Analysis",
    "HR Information Systems",
    "President University",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title,
    description,
    locale: "en_US",
    firstName: "Nizam",
    lastName: "Zahrani",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F2F0E8" },
    { media: "(prefers-color-scheme: dark)", color: "#101110" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Runs before paint: enables motion classes, and marks the opening
// sequence as seen for the rest of the session.
const boot = `(function(){var d=document.documentElement;d.classList.add('js-motion');try{if(sessionStorage.getItem('nz-opened'))d.classList.add('seen');else sessionStorage.setItem('nz-opened','1')}catch(e){d.classList.add('seen')}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.legalName,
    alternateName: [profile.name, profile.fullName],
    url: siteUrl,
    image: `${siteUrl}${profile.portrait.src}`,
    email: `mailto:${profile.email}`,
    jobTitle: "HR Information Systems Intern",
    worksFor: { "@type": "Organization", name: "Mattel Indonesia" },
    address: { "@type": "PostalAddress", addressLocality: "Cikarang", addressCountry: "ID" },
    alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
    knowsAbout: [
      "Business process analysis",
      "Functional analysis",
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
      className={`${display.variable} ${sans.variable} ${serif.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Providers>
          <a
            href="#main"
            className="meta sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
          >
            Skip to content
          </a>
          <Header />
          {children}
          <Footer />
          <MotionRoot />
        </Providers>
      </body>
    </html>
  );
}
