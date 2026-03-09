"use client";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      padding: "28px 48px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      background: "var(--card)",
    }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--muted2)", letterSpacing: "0.08em" }}>
        © {year} Reshuk Sapkota
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {[
          { label: "GitHub", href: "https://github.com/reshuk-code" },
          { label: "X", href: "https://x.com/rscode2007" },
          { label: "LinkedIn", href: "https://www.linkedin.com/in/reshuk-sapkota-798537374/" },
        ].map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
            className="animated-link"
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--muted2)", textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase", transition: "color 0.2s" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--accent)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--muted2)"}
          >{l.label}</a>
        ))}
      </div>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--muted2)", letterSpacing: "0.06em" }}>
        Built with Next.js <span style={{ color: "var(--accent)" }}>◆</span>
      </span>
    </footer>
  );
}
