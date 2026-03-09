"use client";
import { useEffect, useRef } from "react";

const skills = {
  Frontend: { items: ["Next.js", "React", "Vite", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "Three.js"], accent: "#e8ff47" },
  Backend: { items: ["Node.js", "Express", "Socket.io", "REST APIs", "Web Push", "Zod"], accent: "#60a5fa" },
  Database: { items: ["MongoDB", "Firebase", "Redis", "Supabase"], accent: "#34d399" },
  Auth: { items: ["Clerk", "NextAuth"], accent: "#f97316" },
  Mobile: { items: ["Expo", "React Native"], accent: "#c084fc" },
  Tools: { items: ["Cloudinary", "Stripe", "Vercel", "Render", "Git", "Figma", "Radix UI"], accent: "#fb7185" },
};

function SkillGroup({ category, data, index }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; obs.unobserve(el); }
    }, { threshold: 0.1 });
    el.style.opacity = "0"; el.style.transform = "translateY(24px)";
    el.style.transition = `opacity 0.7s ease ${index * 0.07}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.07}s`;
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div ref={ref}>
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: data.accent,
        letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "14px",
        display: "flex", alignItems: "center", gap: "8px",
      }}>
        <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: data.accent, display: "inline-block", boxShadow: `0 0 8px ${data.accent}` }} />
        {category}
        <span style={{ flex: 1, height: "1px", background: "var(--border)" }} />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {data.items.map((skill) => (
          <span key={skill} className="skill-pill"
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = data.accent; e.currentTarget.style.color = data.accent; e.currentTarget.style.background = `${data.accent}0a`; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = ""; e.currentTarget.style.color = ""; e.currentTarget.style.background = ""; }}
          >{skill}</span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const titleRef = useRef(null);
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; obs.unobserve(el); }
    }, { threshold: 0.15 });
    el.style.opacity = "0"; el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)";
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" style={{ padding: "140px 48px", borderTop: "1px solid var(--border)", position: "relative" }}>
      {/* Subtle grid accent */}
      <div style={{
        position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)",
        width: "40%", height: "80%",
        background: "radial-gradient(circle at 100% 50%, rgba(232,255,71,0.03) 0%, transparent 60%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div ref={titleRef} style={{ marginBottom: "72px" }}>
          <div className="section-num">03 — Skills</div>
          <h2 className="display" style={{ fontSize: "clamp(3rem, 5vw, 5rem)", color: "var(--fg)", marginBottom: "16px" }}>
            My<br />
            <span style={{ WebkitTextStroke: "1px rgba(238,234,224,0.25)", color: "transparent" }}>Toolkit</span>
          </h2>
          <p style={{ fontSize: "0.9rem", color: "var(--muted)", maxWidth: "420px", lineHeight: 1.75 }}>
            Technologies I reach for when building — from social platforms to payment tools.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "52px 60px" }}>
          {Object.entries(skills).map(([cat, data], i) => (
            <SkillGroup key={cat} category={cat} data={data} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
