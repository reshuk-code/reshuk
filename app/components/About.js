"use client";
import { useEffect, useRef } from "react";

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.querySelectorAll("[data-r]").forEach((c, i) => {
          c.style.opacity = "1";
          c.style.transform = "translateY(0)";
        });
        obs.unobserve(el);
      }
    }, { threshold: 0.1 });
    el.querySelectorAll("[data-r]").forEach((c, i) => {
      c.style.opacity = "0";
      c.style.transform = "translateY(30px)";
      c.style.transition = `opacity 0.9s ease ${i * 0.09}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 0.09}s`;
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const facts = [
    { label: "Location", value: "Biratnagar, NP" },
    { label: "Focus", value: "Full-Stack Dev" },
    { label: "Education", value: "Comp. Science" },
    { label: "Status", value: "Open to work" },
  ];

  return (
    <section id="about" style={{ padding: "140px 48px", borderTop: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
      {/* BG accent */}
      <div style={{
        position: "absolute", top: "50%", left: "-10%",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(232,255,71,0.03) 0%, transparent 70%)",
        borderRadius: "50%", transform: "translateY(-50%)", pointerEvents: "none",
      }} />

      <div ref={ref} className="about-grid" style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "100px", alignItems: "start" }}>
        {/* Left */}
        <div>
          <div data-r className="section-num">01 — About</div>
          <h2 data-r className="display" style={{ fontSize: "clamp(3rem, 5vw, 5rem)", color: "var(--fg)", marginBottom: "40px" }}>
            Who I<br />
            <span style={{ WebkitTextStroke: "1px rgba(238,234,224,0.25)", color: "transparent" }}>Am</span>
          </h2>

          {/* Avatar / terminal widget */}
          <div data-r style={{
            background: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px",
            overflow: "hidden", maxWidth: "300px",
          }}>
            {/* Terminal bar */}
            <div style={{
              padding: "10px 14px", background: "var(--card2)", borderBottom: "1px solid var(--border)",
              display: "flex", alignItems: "center", gap: "7px",
            }}>
              {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                <span key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c, display: "inline-block" }} />
              ))}
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--muted)", marginLeft: "8px", letterSpacing: "0.08em" }}>reshuk@portfolio:~</span>
            </div>
            {/* Terminal content */}
            <div style={{ padding: "16px", fontFamily: "var(--font-mono)", fontSize: "0.72rem", lineHeight: 1.8 }}>
              {[
                { key: "name", val: "Reshuk Sapkota", c: "var(--accent)" },
                { key: "role", val: "Full-Stack Dev", c: "var(--fg)" },
                { key: "city", val: "Biratnagar, NP", c: "var(--fg)" },
                { key: "stack", val: "Next.js + Node", c: "var(--fg)" },
                { key: "status", val: "open_to_work ✓", c: "#4ade80" },
              ].map(({ key, val, c }) => (
                <div key={key} style={{ display: "flex", gap: "8px" }}>
                  <span style={{ color: "var(--muted2)" }}>$</span>
                  <span style={{ color: "var(--muted)" }}>{key}</span>
                  <span style={{ color: "var(--border2)" }}>→</span>
                  <span style={{ color: c }}>{val}</span>
                </div>
              ))}
              <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                <span style={{ color: "var(--muted2)" }}>$</span>
                <span className="animate-blink" style={{ width: "7px", height: "1.1em", background: "var(--accent)", display: "inline-block", verticalAlign: "middle" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <p data-r style={{ fontSize: "1.25rem", lineHeight: 1.7, color: "var(--fg)", fontWeight: 300 }}>
            Hey, I'm Reshuk — a full-stack developer from{" "}
            <span style={{ color: "var(--accent)", fontWeight: 500 }}>Biratnagar, Nepal</span>. I love building tools and products that solve real problems, look beautiful, and feel fast.
          </p>

          <p data-r style={{ fontSize: "0.95rem", lineHeight: 1.85, color: "var(--muted)" }}>
            My journey started with curiosity — tinkering with HTML and CSS, wondering how websites worked. That curiosity grew into a passion for crafting complete digital experiences, from database schema to pixel-perfect UI.
          </p>

          <p data-r style={{ fontSize: "0.95rem", lineHeight: 1.85, color: "var(--muted)" }}>
            When I'm not coding, I'm exploring new tools, contributing to open source, or thinking about the next project idea that keeps me up at night.
          </p>

          {/* Facts */}
          <div data-r style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px",
            border: "1px solid var(--border)", borderRadius: "8px", overflow: "hidden", marginTop: "8px",
          }}>
            {facts.map((f, i) => (
              <div key={f.label} style={{
                padding: "18px 20px",
                background: "var(--card)",
                borderRight: i % 2 === 0 ? "1px solid var(--border)" : "none",
                borderBottom: i < 2 ? "1px solid var(--border)" : "none",
                transition: "background 0.2s",
              }}
                onMouseEnter={(e) => e.currentTarget.style.background = "var(--card2)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "var(--card)"}
              >
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "var(--muted2)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "5px" }}>{f.label}</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9rem", color: "var(--fg)" }}>{f.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
