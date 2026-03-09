"use client";
import { useEffect, useRef } from "react";

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll("[data-reveal]").forEach((child, i) => {
            child.style.opacity = "1";
            child.style.transform = "translateY(0)";
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    el.querySelectorAll("[data-reveal]").forEach((child, i) => {
      child.style.opacity = "0";
      child.style.transform = "translateY(28px)";
      child.style.transition = `opacity 0.7s ease ${i * 0.1}s, transform 0.7s cubic-bezier(0.23,1,0.32,1) ${i * 0.1}s`;
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      style={{
        padding: "120px 40px",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div ref={ref} style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.6fr",
            gap: "80px",
            alignItems: "start",
          }}
        >
          {/* Left col */}
          <div>
            <span
              className="mono"
              data-reveal
              style={{ color: "var(--accent)", marginBottom: "12px", display: "block" }}
            >
              01 — About
            </span>
            <h2
              className="display-text"
              data-reveal
              style={{
                fontSize: "clamp(2.5rem, 4vw, 4rem)",
                color: "var(--foreground)",
                marginBottom: "32px",
              }}
            >
              Who I
              <br />
              <span style={{ color: "var(--muted)", fontWeight: 300, fontStyle: "italic" }}>
                am
              </span>
            </h2>

            {/* Avatar placeholder */}
            <div
              data-reveal
              style={{
                width: "160px",
                height: "160px",
                borderRadius: "12px",
                background: "var(--card)",
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "4rem",
              }}
            >
              🧑‍💻
            </div>
          </div>

          {/* Right col */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <p
              data-reveal
              style={{
                fontSize: "1.2rem",
                lineHeight: 1.7,
                color: "var(--foreground)",
                fontWeight: 400,
              }}
            >
              Hey! I'm Reshuk — a full-stack developer from{" "}
              <span style={{ color: "var(--accent)" }}>Kathmandu, Nepal</span>. I
              love building tools and products that solve real problems, look
              beautiful, and feel fast.
            </p>

            <p
              data-reveal
              style={{
                fontSize: "1rem",
                lineHeight: 1.8,
                color: "var(--muted)",
              }}
            >
              My journey started with curiosity — tinkering with HTML and CSS,
              wondering how websites worked. That curiosity grew into a passion
              for crafting complete digital experiences, from database schema to
              pixel-perfect UI.
            </p>

            <p
              data-reveal
              style={{
                fontSize: "1rem",
                lineHeight: 1.8,
                color: "var(--muted)",
              }}
            >
              When I'm not coding, I'm probably exploring new tools, contributing
              to open source, or thinking about the next project idea that keeps
              me up at night.
            </p>

            {/* Quick facts */}
            <div
              data-reveal
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginTop: "8px",
                padding: "24px",
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
              }}
            >
              {[
                { label: "Location", value: "Kathmandu, NP" },
                { label: "Focus", value: "Full-Stack Dev" },
                { label: "Education", value: "Computer Science" },
                { label: "Status", value: "Open to work" },
              ].map((fact) => (
                <div key={fact.label}>
                  <div
                    style={{
                      fontFamily: "var(--font-dm-mono)",
                      fontSize: "0.65rem",
                      color: "var(--muted)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    {fact.label}
                  </div>
                  <div style={{ fontSize: "0.875rem", color: "var(--foreground)", fontWeight: 500 }}>
                    {fact.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
