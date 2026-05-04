import { ImageResponse } from "next/og";
import { SHORT_ADDRESS } from "./data/property";

export const alt = `${SHORT_ADDRESS} property showcase`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#FAF6EC",
          background: "linear-gradient(135deg,#0E1A24 0%,#2D5566 58%,#B8693C 100%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 7, textTransform: "uppercase" }}>Corona del Mar · 92625</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 104, lineHeight: 0.9, letterSpacing: -7 }}>{SHORT_ADDRESS}.</div>
          <div style={{ display: "flex", marginTop: 26, fontSize: 34, color: "rgba(250,246,236,.78)" }}>
            Village energy. Ocean air. Two-residence flexibility.
          </div>
        </div>
        <div style={{ display: "flex", gap: 24, fontSize: 22 }}>
          <span>2,499 SF</span>
          <span>4 BR</span>
          <span>3 BA</span>
          <span>Duplex</span>
        </div>
      </div>
    ),
    size,
  );
}
