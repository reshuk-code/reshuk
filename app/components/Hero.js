"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const badgeRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const els = [badgeRef.current, headingRef.current, subRef.current, ctaRef.current, scrollRef.current];
    els.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = `opacity 0.8s ease ${i * 0.12}s, transform 0.8s cubic-bezier(0.23,1,0.32,1) ${i * 0.12}s`;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 100 + i * 120);
    });
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "120px 40px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(36,36,32,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(36,36,32,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Glow orb */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "60%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(232,255,71,0.06) 0%, transparent 70%)",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
        {/* Badge */}
        <div ref={badgeRef} style={{ marginBottom: "28px" }}>
          <span className="badge">
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#4ade80",
                display: "inline-block",
                marginRight: "8px",
                boxShadow: "0 0 8px #4ade80",
              }}
            />
            Available for freelance
          </span>
        </div>

        {/* Main heading */}
        <h1
          ref={headingRef}
          className="display-text"
          style={{
            fontSize: "clamp(3.5rem, 8vw, 8rem)",
            color: "var(--foreground)",
            marginBottom: "8px",
            maxWidth: "900px",
          }}
        >
          Reshuk
          <br />
          <span style={{ color: "var(--muted)", fontWeight: 300, fontStyle: "italic" }}>
            Shrestha
          </span>
        </h1>

        {/* Role line */}
        <div
          ref={subRef}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
            marginTop: "20px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: "0.8rem",
              color: "var(--accent)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Full-Stack Developer
          </span>
          <span style={{ width: "40px", height: "1px", background: "var(--border)" }} />
          <span
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: "0.8rem",
              color: "var(--muted)",
              letterSpacing: "0.08em",
            }}
          >
            Kathmandu, Nepal
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: "1.1rem",
            color: "var(--muted)",
            maxWidth: "520px",
            lineHeight: 1.7,
            marginBottom: "48px",
            fontWeight: 300,
          }}
        >
          I build fast, clean, and thoughtful digital products — from SaaS tools
          to developer utilities. Obsessed with great UX and elegant code.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <a href="#projects" className="btn-primary">
            View Projects
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#contact" className="btn-outline">
            Let's Talk
          </a>
        </div>

        {/* Stat row */}
        <div
          ref={scrollRef}
          style={{
            display: "flex",
            gap: "48px",
            marginTop: "80px",
            paddingTop: "40px",
            borderTop: "1px solid var(--border)",
          }}
        >
          {[
            { value: "5+", label: "Projects Shipped" },
            { value: "2+", label: "Years Building" },
            { value: "∞", label: "Coffee Consumed" },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "var(--foreground)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  marginBottom: "6px",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "0.68rem",
                  color: "var(--muted)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          right: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          opacity: 0.4,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--muted)",
            writingMode: "vertical-rl",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "60px",
            background: "linear-gradient(to bottom, var(--muted), transparent)",
          }}
        />
      </div>
    </section>
  );
}
