import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon: the thread's first loop, straightening out. Same mark as app/icon.svg. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", background: "#2347b8" }}>
        <svg width="180" height="180" viewBox="0 0 64 64">
          <path
            d="M9 42 C 22 42 35 37 35 26 C 35 17 22 17 22 26 C 22 37 36 42 55 42"
            fill="none"
            stroke="#fff"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    size,
  );
}
