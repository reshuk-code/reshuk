"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [time, setTime] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const progressRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", {
        hour: "2-digit", minute: "2-digit", second: "2-digit",
        hour12: false, timeZone: "Asia/Kathmandu",
      }));
    };
    tick();
    const iv = setInterval(tick, 1000);

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      // Hide on scroll down, show on scroll up
      if (y > lastScrollY.current + 8 && y > 120) setHidden(true);
      else if (y < lastScrollY.current - 8) setHidden(false);
      lastScrollY.current = y;

      if (progressRef.current) {
        const prog = y / (document.body.scrollHeight - window.innerHeight);
        progressRef.current.style.width = `${prog * 100}%`;
      }
      const sections = ["about", "projects", "skills", "contact"];
      let found = "";
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop - 160) { found = id; break; }
      }
      setActiveSection(found);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearInterval(iv); window.removeEventListener("scroll", onScroll); };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Scroll progress bar (full width, fixed top) ── */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, height: "2px",
        background: "transparent", zIndex: 9999, pointerEvents: "none",
      }}>
        <div ref={progressRef} style={{
          height: "100%", width: "0%", background: "var(--accent)",
          transition: "width 0.08s linear",
          boxShadow: "0 0 12px var(--accent), 0 0 4px var(--accent)",
        }} />
      </div>

      {/* ── Main Nav ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: scrolled ? "0 24px" : "0 32px",
        height: scrolled ? "52px" : "64px",
        transition: "all 0.45s cubic-bezier(0.23,1,0.32,1)",
        transform: hidden ? "translateY(-110%)" : "translateY(0)",
        background: scrolled ? "rgba(6,6,8,0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(1.6)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px) saturate(1.6)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.45)" : "none",
      }}>
        {/* Logo */}
        <a href="#" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: 0, flexShrink: 0 }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1rem", color: "var(--fg)", letterSpacing: "-0.02em", lineHeight: 1 }}>RESHUK</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.52rem", color: "var(--accent)", letterSpacing: "0.16em" }}>.COM.NP</span>
        </a>

        {/* ── Desktop center pill ── */}
        <div className="nav-pill-desktop" style={{
          position: "absolute", left: "50%", transform: "translateX(-50%)",
          display: "flex", gap: "2px",
          background: scrolled ? "rgba(15,15,18,0.7)" : "rgba(15,15,18,0.5)",
          border: "1px solid var(--border)",
          borderRadius: "100px",
          padding: "4px 4px",
          backdropFilter: "blur(12px)",
          transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
          boxShadow: scrolled ? "0 0 0 1px rgba(255,255,255,0.04), 0 8px 24px rgba(0,0,0,0.3)" : "none",
        }}>
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a key={link.href} href={link.href} style={{
                fontSize: "0.72rem", fontFamily: "var(--font-display)", fontWeight: 600,
                color: isActive ? "#060608" : "var(--muted)",
                textDecoration: "none", letterSpacing: "0.03em",
                padding: "6px 16px", borderRadius: "100px",
                background: isActive ? "var(--accent)" : "transparent",
                transition: "color 0.2s, background 0.25s cubic-bezier(0.23,1,0.32,1)",
                whiteSpace: "nowrap",
              }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = "var(--fg)"; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = "var(--muted)"; }}
              >{link.label}</a>
            );
          })}
        </div>

        {/* ── Desktop right ── */}
        <div className="nav-right-desktop" style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "var(--muted)", letterSpacing: "0.1em" }}>BRT</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--fg)", letterSpacing: "0.06em" }}>{time}</span>
          </div>
          <Link href="/donate" style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "6px 13px",
            background: "transparent",
            border: "1px solid rgba(232,255,71,0.3)",
            borderRadius: "6px",
            fontFamily: "var(--font-mono)", fontSize: "0.62rem",
            color: "var(--accent)", textDecoration: "none",
            letterSpacing: "0.06em",
            transition: "all 0.2s ease",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(232,255,71,0.08)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(232,255,71,0.3)"; }}
          >🥟 Momo</Link>
          <a href="mailto:reshuksapkota2007@gmail.com" className="btn-primary" style={{ padding: "7px 15px", fontSize: "0.7rem" }}>
            Hire me
          </a>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          style={{
            display: "none", flexDirection: "column", justifyContent: "center",
            alignItems: "center", gap: "5px",
            background: menuOpen ? "rgba(232,255,71,0.08)" : "transparent",
            border: menuOpen ? "1px solid rgba(232,255,71,0.2)" : "1px solid transparent",
            cursor: "pointer",
            padding: "6px", borderRadius: "6px",
            width: "40px", height: "40px",
            transition: "background 0.2s, border-color 0.2s",
          }}
        >
          <span style={{
            display: "block", width: "22px", height: "2px",
            background: menuOpen ? "var(--accent)" : "var(--fg)",
            borderRadius: "2px",
            transition: "transform 0.35s cubic-bezier(0.23,1,0.32,1), background 0.2s",
            transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
          }} />
          <span style={{
            display: "block", width: "16px", height: "2px",
            background: "var(--fg)",
            borderRadius: "2px",
            transition: "opacity 0.2s, width 0.2s",
            opacity: menuOpen ? 0 : 1,
            alignSelf: "flex-start",
          }} />
          <span style={{
            display: "block", width: "22px", height: "2px",
            background: menuOpen ? "var(--accent)" : "var(--fg)",
            borderRadius: "2px",
            transition: "transform 0.35s cubic-bezier(0.23,1,0.32,1), background 0.2s",
            transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
          }} />
        </button>
      </nav>

      {/* ── Mobile fullscreen menu ── */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 490,
        background: "rgba(6,6,8,0.97)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        gap: "8px",
        transition: "opacity 0.4s cubic-bezier(0.23,1,0.32,1), transform 0.4s cubic-bezier(0.23,1,0.32,1)",
        opacity: menuOpen ? 1 : 0,
        transform: menuOpen ? "translateY(0)" : "translateY(-12px)",
        pointerEvents: menuOpen ? "all" : "none",
      }}>
        {/* Decorative accent lines */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, var(--accent), transparent)", opacity: 0.3 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, var(--border2), transparent)" }} />

        {navLinks.map((link, i) => {
          const isActive = activeSection === link.href.replace("#", "");
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-display)", fontWeight: 800,
                fontSize: "clamp(2rem, 10vw, 3.5rem)",
                color: isActive ? "var(--accent)" : "var(--fg)",
                textDecoration: "none", letterSpacing: "-0.02em",
                lineHeight: 1.15,
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.4s ease ${0.08 + i * 0.07}s, transform 0.45s cubic-bezier(0.23,1,0.32,1) ${0.08 + i * 0.07}s, color 0.2s`,
                display: "flex", alignItems: "center", gap: "12px",
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = "var(--accent)"; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = "var(--fg)"; }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--muted2)", letterSpacing: "0.14em", alignSelf: "flex-start", marginTop: "6px" }}>0{i + 1}</span>
              {link.label}
            </a>
          );
        })}

        <a
          href="mailto:reshuksapkota2007gmail.com"
          onClick={() => setMenuOpen(false)}
          className="btn-primary"
          style={{
            marginTop: "32px", padding: "13px 32px", fontSize: "0.8rem",
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 0.4s ease 0.38s, transform 0.45s cubic-bezier(0.23,1,0.32,1) 0.38s`,
          }}
        >
          Hire me →
        </a>

        {/* Bottom time */}
        <div style={{
          position: "absolute", bottom: "28px",
          fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--muted2)", letterSpacing: "0.14em",
          opacity: menuOpen ? 1 : 0,
          transition: "opacity 0.4s ease 0.45s",
        }}>BRT — {time}</div>
      </div>

      {/* ── Responsive styles ── */}
      <style>{`
        @media (max-width: 768px) {
          .nav-pill-desktop { display: none !important; }
          .nav-right-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
