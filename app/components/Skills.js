"use client";
import { useEffect, useRef } from "react";

const skills = {
  Frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML/CSS"],
  Backend: ["Node.js", "Express", "REST APIs", "GraphQL", "Prisma", "Drizzle ORM"],
  Database: ["PostgreSQL", "MongoDB", "Redis", "SQLite", "Supabase"],
  Tools: ["Git", "Docker", "Vercel", "Linux", "Figma", "VS Code"],
};

function SkillGroup({ category, items, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
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
    el.style.transform = "translateY(24px)";
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s cubic-bezier(0.23,1,0.32,1) ${index * 0.1}s`;
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div ref={ref}>
      <div
        style={{
          fontFamily: "var(--font-dm-mono)",
          fontSize: "0.68rem",
          color: "var(--accent)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: "16px",
        }}
      >
        {category}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {items.map((skill) => (
          <span key={skill} className="skill-pill" data-hover>
            {skill}
          </span>
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
      id="skills"
      style={{
        padding: "120px 40px",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div ref={titleRef} style={{ marginBottom: "64px" }}>
          <span
            className="mono"
            style={{ color: "var(--accent)", marginBottom: "12px", display: "block" }}
          >
            03 — Skills
          </span>
          <h2
            className="display-text"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              color: "var(--foreground)",
            }}
          >
            My
            <br />
            <span style={{ color: "var(--muted)", fontWeight: 300, fontStyle: "italic" }}>
              toolkit
            </span>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "48px",
          }}
        >
          {Object.entries(skills).map(([category, items], i) => (
            <SkillGroup key={category} category={category} items={items} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
