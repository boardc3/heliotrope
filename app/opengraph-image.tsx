import { ImageResponse } from "next/og";
import { PROPERTY, SHORT_ADDRESS } from "./data/property";

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
          padding: 80,
          color: "#F4EEDF",
          background: "linear-gradient(135deg,#13110E 0%,#1C1916 45%,#2C4A55 78%,#A85A2F 100%)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 18, letterSpacing: 8, textTransform: "uppercase", color: "rgba(244,238,223,.78)" }}>
          <span style={{ display: "flex" }}>Corona del Mar · 92625</span>
          <span style={{ display: "flex" }}>MLS {PROPERTY.mls}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 124, lineHeight: 0.9, letterSpacing: -7 }}>437 Heliotrope.</div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 32, color: "rgba(244,238,223,.82)", fontStyle: "italic" }}>
            Two connected condos · sold separately.
          </div>
        </div>
        <div style={{ display: "flex", gap: 36, fontSize: 22, color: "rgba(244,238,223,.78)" }}>
          <span style={{ display: "flex" }}>{PROPERTY.habitableArea.toLocaleString()} SF</span>
          <span style={{ display: "flex" }}>{PROPERTY.bedrooms} BR</span>
          <span style={{ display: "flex" }}>{PROPERTY.bathroomSummary}</span>
          <span style={{ display: "flex" }}>2 condos</span>
        </div>
      </div>
    ),
    size,
  );
}
