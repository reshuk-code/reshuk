"use client";
import { useEffect, useRef } from "react";

const TECH = ["Next.js", "React", "Node.js", "TypeScript", "MongoDB", "Socket.io", "Redis", "Tailwind", "Three.js", "GSAP", "Framer Motion", "Firebase", "Stripe", "Expo", "Supabase", "Vercel"];

export default function Marquee() {
  return (
    <div style={{
      borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)",
      padding: "20px 0", overflow: "hidden", position: "relative", background: "var(--card)",
    }}>
      {/* Fade edges */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "120px", background: "linear-gradient(to right, var(--card), transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "120px", background: "linear-gradient(to left, var(--card), transparent)", zIndex: 2, pointerEvents: "none" }} />

      <div className="marquee-track">
        {[...TECH, ...TECH].map((item, i) => (
          <span key={i} style={{
            display: "inline-flex", alignItems: "center", gap: "20px",
            padding: "0 28px",
            fontFamily: "var(--font-mono)", fontSize: "0.7rem",
            color: i % 3 === 0 ? "var(--accent)" : "var(--muted2)",
            letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap",
          }}>
            {item}
            <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--border2)", display: "inline-block" }} />
          </span>
        ))}
      </div>
    </div>
  );
}
