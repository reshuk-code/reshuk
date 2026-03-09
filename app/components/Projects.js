"use client";
import { useEffect, useRef, useState } from "react";

const GITHUB = "https://github.com/reshuk-code";

const projects = [
  {
    id: "01",
    name: "AntQR",
    tagline: "Nepal's Community Social Platform",
    description: "A full-featured Nepal-first social network — create posts, join communities, follow people, explore hashtags, send messages, and watch reels. Supports English and नेपाली. Includes PWA support, real-time notifications, admin panel, and custom feed algorithm.",
    stack: ["Next.js", "MongoDB", "Clerk Auth", "Socket.io", "Redis", "Cloudinary", "GSAP", "Three.js", "Zustand"],
    link: "https://antqr.xyz",
    github: null,
    accent: "#ff6b6b",
    status: "Live",
    year: "2024",
  },
  {
    id: "02",
    name: "BucketURL",
    tagline: "URL Shortener with Deep Analytics",
    description: "A production-grade URL shortener with full dashboard. Custom branded slugs, real-time click analytics (UTM, device, country, referrer), QR code generation, team workspaces. Free + Pro tiers with Stripe billing.",
    stack: ["Next.js", "Firebase", "Stripe", "Radix UI", "Recharts", "Cloudinary", "Tailwind CSS"],
    link: "https://bucketurl.onrender.com",
    github: `${GITHUB}/bucketurl`,
    accent: "#a78bfa",
    status: "Live",
    year: "2024",
  },
  {
    id: "03",
    name: "Paisa Studio",
    tagline: "Nepal Payment QR Generator",
    description: "A Nepal-focused payment QR code tool for eSewa and FonePay merchants. EMV-compliant QR codes with full customization — dot shapes, corner styles, colors, and logo embedding. Scan to auto-fill fields, download, share. Android app on Expo.",
    stack: ["React", "Vite", "Canvas API", "EMV QR spec", "jsQR", "Expo (Android)"],
    link: "https://paisa-studio.onrender.com",
    github: `${GITHUB}/paisa-studio`,
    accent: "#34d399",
    status: "Live",
    year: "2024",
  },
  {
    id: "04",
    name: "InLink",
    tagline: "Bio Link Pages — AntQR Ecosystem",
    description: "A customizable bio link page builder living under the AntQR ecosystem. Turn a single URL into a branded hub — add your socials, projects, and content. Clean, fast, and shareable.",
    stack: ["Next.js", "Tailwind CSS", "MongoDB", "Clerk Auth"],
    link: "https://inlink.antqr.xyz",
    github: null,
    accent: "#f97316",
    status: "Live",
    year: "2024",
  },
];

function ProjectCard({ project, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        obs.unobserve(el);
      }
    }, { threshold: 0.1 });
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = `opacity 0.8s ease ${index * 0.12}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s`;
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  // Mouse glow effect
  const onMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    ref.current.style.setProperty("--mouse-x", `${x}%`);
    ref.current.style.setProperty("--mouse-y", `${y}%`);
  };

  const statusColor = { Live: "#4ade80", Beta: "#fbbf24", WIP: "#94a3b8" }[project.status] || "#94a3b8";

  return (
    <div ref={ref} className="project-card" style={{ borderRadius: "8px" }}
      onMouseMove={onMouseMove}>
      <div style={{ padding: "28px", position: "relative", zIndex: 1 }}>
        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
          <div style={{ display: "flex", flex: "column", gap: "8px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--muted2)", letterSpacing: "0.1em" }}>{project.id}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--muted2)", letterSpacing: "0.08em", marginLeft: "16px" }}>{project.year}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: statusColor, boxShadow: `0 0 8px ${statusColor}`, display: "inline-block" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: statusColor, letterSpacing: "0.1em" }}>{project.status}</span>
          </div>
        </div>

        {/* Accent line */}
        <div style={{ width: "28px", height: "2px", background: project.accent, borderRadius: "1px", marginBottom: "14px", boxShadow: `0 0 12px ${project.accent}40` }} />

        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.7rem", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--fg)", marginBottom: "4px", lineHeight: 1 }}>
          {project.name}
        </h3>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: project.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px", opacity: 0.85 }}>
          {project.tagline}
        </p>
        <p style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.72, marginBottom: "22px" }}>
          {project.description}
        </p>

        {/* Stack */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "26px" }}>
          {project.stack.map((t) => (
            <span key={t} className="skill-pill" style={{ fontSize: "0.64rem", padding: "3px 10px" }}>{t}</span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: "18px", alignItems: "center", paddingTop: "18px", borderTop: "1px solid var(--border)" }}>
          <a href={project.link} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--fg)", textDecoration: "none", letterSpacing: "0.01em" }}
            className="animated-link">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Live site
          </a>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--muted)", textDecoration: "none" }}
              className="animated-link">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
          )}
        </div>
      </div>

      {/* Bottom accent */}
      <div style={{
        height: "3px", width: "0", background: `linear-gradient(90deg, ${project.accent}, transparent)`,
        transition: "width 0.4s cubic-bezier(0.23,1,0.32,1)",
      }}
        ref={(el) => {
          if (!el) return;
          const card = el.parentElement;
          card?.addEventListener("mouseenter", () => { el.style.width = "100%"; });
          card?.addEventListener("mouseleave", () => { el.style.width = "0"; });
        }}
      />
    </div>
  );
}

export default function Projects() {
  const titleRef = useRef(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; obs.unobserve(el); }
    }, { threshold: 0.2 });
    el.style.opacity = "0"; el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)";
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="projects" style={{ padding: "140px 48px", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div ref={titleRef} className="projects-header" style={{ marginBottom: "72px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div className="section-num">02 — Projects</div>
            <h2 className="display" style={{ fontSize: "clamp(3rem, 5vw, 5rem)", color: "var(--fg)" }}>
              Things I've<br />
              <span style={{ WebkitTextStroke: "1px rgba(238,234,224,0.25)", color: "transparent" }}>Shipped</span>
            </h2>
          </div>
          <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ alignSelf: "flex-end" }}>
            All on GitHub
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </a>
        </div>
        <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
          {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
