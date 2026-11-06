import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Nizamuddin Zahrani — Business Analyst · Process Improvement · Strategy & Operations";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const portrait = await readFile(join(process.cwd(), "public/images/portrait.jpg"));
  const src = `data:image/jpeg;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#f6f3ed", color: "#1c1a17" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 0 64px 72px", width: 760 }}>
          <div style={{ fontSize: 18, letterSpacing: 4, textTransform: "uppercase", color: "#5c5750" }}>
            Business Analyst · Process Improvement · Strategy & Operations
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 92, lineHeight: 1, letterSpacing: -3, fontFamily: "serif" }}>Nizamuddin</div>
            <div style={{ fontSize: 92, lineHeight: 1, letterSpacing: -3, fontFamily: "serif", fontStyle: "italic", color: "#9a4824" }}>
              Zahrani
            </div>
            <div style={{ marginTop: 32, fontSize: 30, lineHeight: 1.3, maxWidth: 600 }}>
              Making sense of complex business problems.
            </div>
          </div>
          <div style={{ fontSize: 20, color: "#5c5750" }}>Information Systems · President University · Cikarang, Indonesia</div>
        </div>
        <div style={{ display: "flex", padding: "48px 56px 48px 0", flex: 1 }}>
          <img
            src={src}
            alt=""
            width={384}
            height={534}
            style={{ objectFit: "cover", objectPosition: "50% 28%", borderRadius: "192px 192px 16px 16px" }}
          />
        </div>
      </div>
    ),
    size,
  );
}
