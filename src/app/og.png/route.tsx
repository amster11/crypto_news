import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

/** Open Graph image shared by every page (statically generated at build). */
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0B1628",
          color: "#FFFFFF",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 72,
              height: 72,
              border: "2px solid #B89A62",
              color: "#B89A62",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
            }}
          >
            {siteConfig.logo.monogram}
          </div>
          <div style={{ fontSize: 36 }}>{siteConfig.logo.wordmark}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: 80, height: 2, background: "#B89A62", marginBottom: 36 }} />
          <div style={{ fontSize: 88, lineHeight: 1.05, letterSpacing: 4 }}>BUSINESS</div>
          <div style={{ fontSize: 88, lineHeight: 1.05, letterSpacing: 4 }}>MADE SIMPLE</div>
        </div>
        <div style={{ fontSize: 22, color: "#A9B1BF", letterSpacing: 6 }}>
          LEGAL ADDRESS · COMPANY FORMATION · BUSINESS SUPPORT
        </div>
      </div>
    ),
    size,
  );
}
