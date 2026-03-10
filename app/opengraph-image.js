import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Reshuk Sapkota — Developer & Builder";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 128,
          background: "#060608",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Background Decorative Elements */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-10%",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(232,255,71,0.08) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: "#4ade80",
              boxShadow: "0 0 20px #4ade80",
            }}
          />
          <div
            style={{
              fontSize: 24,
              color: "#e8ff47",
              letterSpacing: "0.2em",
              fontWeight: "bold",
            }}
          >
            AVAILABLE FOR FREELANCE
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            lineHeight: 0.9,
            fontWeight: 800,
            letterSpacing: "-0.05em",
          }}
        >
          <span style={{ color: "#eeeae0" }}>Reshuk</span>
          <span
            style={{
              color: "transparent",
              WebkitTextStroke: "2px rgba(238,234,224,0.3)",
            }}
          >
            Sapkota
          </span>
        </div>

        <div
          style={{
            marginTop: "40px",
            fontSize: 32,
            color: "#94a3b8",
            fontWeight: 400,
            maxWidth: "800px",
            lineHeight: 1.4,
          }}
        >
          Full-stack developer building tools, apps, and digital experiences.
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "80px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div style={{ color: "#e8ff47", fontSize: 24 }}>✦</div>
          <div style={{ color: "#eeeae0", fontSize: 24, letterSpacing: "0.05em" }}>
            reshuksapkota.com.np
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
