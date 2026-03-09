"use client";
import { useEffect, useRef } from "react";

const projects = [
  {
    id: "01",
    name: "JellyBin",
    tagline: "Pastebin reimagined",
    description:
      "A modern, lightning-fast code & text sharing tool. Create bins, share snippets, set expiry — all with syntax highlighting and a minimal interface built for developers.",
    stack: ["Next.js", "Node.js", "MongoDB", "Tailwind"],
    link: "https://jellybin.vercel.app",
    github: "https://github.com/reshukshrestha/jellybin",
    accent: "#e8ff47",
    status: "Live",
  },
  {
    id: "02",
    name: "AntQR",
    tagline: "Beautiful QR code generator",
    description:
      "Generate customizable, styled QR codes in seconds. Supports logos, colors, and multiple formats. Clean UI, instant download, zero friction.",
    stack: ["React", "Canvas API", "Tailwind"],
    link: "https://antqr.vercel.app",
    github: "https://github.com/reshukshrestha/antqr",
    accent: "#ff6b6b",
    status: "Live",
  },
  {
    id: "03",
    name: "OneDev",
    tagline: "Developer utility suite",
    description:
      "An all-in-one toolkit for developers — JSON formatter, Base64 encoder, regex tester, color picker, and more. Everything a dev needs, in one tab.",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    link: "https://onedev.tools",
    github: "https://github.com/reshukshrestha/onedev",
    accent: "#60a5fa",
    status: "Live",
  },
  {
    id: "04",
    name: "BucketURL",
    tagline: "Smart URL shortener",
    description:
      "A URL shortener with analytics, click tracking, custom slugs, and QR codes. Built for teams who want insights, not just short links.",
    stack: ["Next.js", "PostgreSQL", "Prisma", "Redis"],
    link: "#",
    github: "https://github.com/reshukshrestha/bucketurl",
    accent: "#a78bfa",
    status: "Beta",
  },
  {
    id: "05",
    name: "Paisa Studio",
    tagline: "Nepal fintech dashboard",
    description:
      "A financial management dashboard designed for Nepali users. Track expenses, income, eSewa/Khalti integration, and smart budgeting — all in one clean interface.",
    stack: ["React", "Node.js", "PostgreSQL", "Chart.js"],
    link: "#",
    github: "https://github.com/reshukshrestha/paisa-studio",
    accent: "#34d399",
    status: "WIP",
  },
];

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = `opacity 0.7s ease ${index * 0.1}s, transform 0.7s cubic-bezier(0.23,1,0.32,1) ${index * 0.1}s`;

    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  const statusColor = {
    Live: "#4ade80",
    Beta: "#fbbf24",
    WIP: "#94a3b8",
  }[project.status] || "#94a3b8";

  return (
    <div
      ref={cardRef}
      className="project-card"
      style={{
        padding: "32px",
        borderRadius: "8px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "20px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: "0.7rem",
            color: "var(--border)",
            letterSpacing: "0.1em",
          }}
        >
          {project.id}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: statusColor,
              boxShadow: `0 0 8px ${statusColor}`,
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: "0.65rem",
              color: "var(--muted)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {project.status}
          </span>
        </div>
      </div>

      {/* Name */}
      <h3
        style={{
          fontSize: "1.6rem",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          color: "var(--foreground)",
          marginBottom: "4px",
          lineHeight: 1.1,
        }}
      >
        {project.name}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-dm-mono)",
          fontSize: "0.7rem",
          color: project.accent,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: "16px",
        }}
      >
        {project.tagline}
      </p>

      {/* Description */}
      <p
        style={{
          fontSize: "0.875rem",
          color: "var(--muted)",
          lineHeight: 1.7,
          marginBottom: "24px",
        }}
      >
        {project.description}
      </p>

      {/* Stack pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px" }}>
        {project.stack.map((tech) => (
          <span key={tech} className="skill-pill">
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: "12px" }}>
        {project.link !== "#" && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.78rem",
              color: "var(--foreground)",
              textDecoration: "none",
              fontWeight: 500,
            }}
            className="animated-link"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Live
          </a>
        )}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.78rem",
            color: "var(--muted)",
            textDecoration: "none",
          }}
          className="animated-link"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          GitHub
        </a>
      </div>

      {/* Hover accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, ${project.accent}, transparent)`,
          opacity: 0,
          transition: "opacity 0.3s ease",
        }}
        className="card-accent-line"
      />
    </div>
  );
}

export default function Projects() {
  const titleRef = useRef(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.7s ease, transform 0.7s cubic-bezier(0.23,1,0.32,1)";
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      style={{
        padding: "120px 40px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* Section header */}
      <div ref={titleRef} style={{ marginBottom: "64px" }}>
        <span
          className="mono"
          style={{ color: "var(--accent)", marginBottom: "12px", display: "block" }}
        >
          02 — Projects
        </span>
        <h2
          className="display-text"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            color: "var(--foreground)",
          }}
        >
          Things I've
          <br />
          <span style={{ color: "var(--muted)", fontWeight: 300, fontStyle: "italic" }}>
            shipped
          </span>
        </h2>
      </div>

      {/* Project grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "20px",
        }}
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
