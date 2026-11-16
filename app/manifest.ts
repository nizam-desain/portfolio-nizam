import type { MetadataRoute } from "next";
import { profile } from "@/data/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name}, portfolio`,
    short_name: profile.name,
    description: profile.headline,
    start_url: "/",
    display: "browser",
    background_color: "#f7f6f2",
    theme_color: "#f7f6f2",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
