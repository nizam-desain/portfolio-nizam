import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { profile } from "@/data/content";
import { threadMd } from "@/components/sections/thread-paths";

export const alt = `${profile.name}: ${profile.positioning.join(", ")}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const paper = "#f7f6f2";
const ink = "#181b21";
const muted = "#525863";
const accent = "#2347b8";

/** Social preview: the hero in miniature, with the same type, thread and portrait. */
export default async function OpengraphImage() {
  const fonts = join(process.cwd(), "app/fonts");
  const [portrait, sans, sansBold, display] = await Promise.all([
    readFile(join(process.cwd(), "public/images/portrait.jpg")),
    readFile(join(fonts, "sofia-sans-latin-400-normal.woff")),
    readFile(join(fonts, "sofia-sans-latin-600-normal.woff")),
    readFile(join(fonts, "sofia-sans-semi-condensed-latin-300-normal.woff")),
  ]);
  const src = `data:image/jpeg;base64,${portrait.toString("base64")}`;
  const threadY = 478;

  return new ImageResponse(
    (
      <div style={{ display: "flex", position: "relative", width: "100%", height: "100%", background: paper, color: ink, fontFamily: "Sofia Sans" }}>
        <div style={{ display: "flex", flexDirection: "column", position: "absolute", left: 72, top: 64 }}>
          <div style={{ fontSize: 30, fontWeight: 600 }}>{profile.name}</div>
          <div style={{ display: "flex", marginTop: 10, fontSize: 21, color: muted }}>{profile.positioning.join("   |   ")}</div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 34,
              fontFamily: "Sofia Sans Semi Condensed",
              fontWeight: 300,
              fontSize: 86,
              lineHeight: 0.96,
              letterSpacing: -2,
            }}
          >
            <span>Making sense</span>
            <span>of complex</span>
            <span>business problems.</span>
          </div>
        </div>

        {/* The thread: tangle, then a straight run behind the portrait and off the edge */}
        <svg
          width={threadMd.w}
          height={threadMd.h}
          viewBox={`0 0 ${threadMd.w} ${threadMd.h}`}
          style={{ position: "absolute", left: 68, top: threadY - threadMd.h / 2 }}
        >
          <path d={threadMd.d} fill="none" stroke={accent} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div style={{ position: "absolute", left: 68 + threadMd.w - 1, right: 0, top: threadY - 1, height: 2, background: accent }} />

        <div style={{ display: "flex", flexDirection: "column", position: "absolute", left: 72, top: 548, fontSize: 21, color: muted }}>
          <span>Information Systems undergraduate, President University</span>
        </div>

        <img
          src={src}
          alt=""
          width={376}
          height={470}
          style={{ position: "absolute", right: 72, top: 64, objectFit: "cover", objectPosition: "50% 30%", borderRadius: 2 }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Sofia Sans", data: sans, weight: 400, style: "normal" },
        { name: "Sofia Sans", data: sansBold, weight: 600, style: "normal" },
        { name: "Sofia Sans Semi Condensed", data: display, weight: 300, style: "normal" },
      ],
    },
  );
}
