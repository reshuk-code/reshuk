export default function Marquee() {
  const items = [
    "Next.js", "React", "Node.js", "TypeScript", "Tailwind CSS",
    "PostgreSQL", "MongoDB", "Docker", "Git", "REST APIs",
    "Full-Stack", "UI/UX", "Open Source",
  ];

  const doubled = [...items, ...items];

  return (
    <div
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--card)",
        padding: "14px 0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "20px",
              paddingRight: "48px",
              fontFamily: "var(--font-dm-mono)",
              fontSize: "0.72rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: i % 3 === 0 ? "var(--accent)" : "var(--muted)",
              whiteSpace: "nowrap",
            }}
          >
            {item}
            <span style={{ opacity: 0.3, fontSize: "0.5rem" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
