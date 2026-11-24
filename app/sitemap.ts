import type { MetadataRoute } from "next";
import { siteUrl, work } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    ...work.map((w) => ({
      url: `${siteUrl}/work/${w.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: w.kind === "Professional" ? 0.8 : 0.6,
    })),
  ];
}
