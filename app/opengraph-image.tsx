import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Nizam Zahrani — Business & functional analysis";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const portrait = await readFile(join(process.cwd(), "public/images/portrait.jpg"));
  const src = `data:image/jpeg;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#101110", color: "#F2F0E8" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 64px", flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, letterSpacing: 3, textTransform: "uppercase", color: "#9A9D96" }}>
            <span>§00 — Portfolio</span>
            <span>Cikarang, Indonesia</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 104, lineHeight: 0.92, letterSpacing: -4, fontWeight: 700, textTransform: "uppercase" }}>Business.</div>
            <div style={{ fontSize: 104, lineHeight: 0.92, letterSpacing: -4, fontWeight: 700, textTransform: "uppercase" }}>Systems.</div>
            <div style={{ fontSize: 104, lineHeight: 0.92, letterSpacing: -4, fontWeight: 700, textTransform: "uppercase", color: "#B8CB9B" }}>Perspective.</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid rgba(242,240,232,0.25)", paddingTop: 20 }}>
            <div style={{ fontSize: 34, fontWeight: 700 }}>Nizam Zahrani</div>
            <div style={{ fontSize: 22, color: "#9A9D96", marginTop: 6 }}>HRIS Intern, People &amp; Culture, Mattel Indonesia · President University</div>
          </div>
        </div>
        <div style={{ display: "flex", width: 340, height: "100%" }}>
          <img src={src} alt="" width={340} height={630} style={{ objectFit: "cover", objectPosition: "50% 28%" }} />
        </div>
      </div>
    ),
    size,
  );
}
