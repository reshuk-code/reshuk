"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Kathmandu",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 40px",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "background 0.4s ease, border-color 0.4s ease",
        background: scrolled ? "rgba(8,8,8,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      {/* Logo */}
      <a
        href="#"
        style={{
          fontFamily: "var(--font-dm-mono)",
          fontSize: "0.85rem",
          fontWeight: 500,
          color: "var(--accent)",
          textDecoration: "none",
          letterSpacing: "0.06em",
        }}
      >
        RESHUK
      </a>

      {/* Center nav */}
      <div
        style={{
          display: "flex",
          gap: "32px",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        className="desktop-nav"
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="animated-link"
            style={{
              fontSize: "0.8rem",
              color: "var(--muted)",
              textDecoration: "none",
              letterSpacing: "0.04em",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "var(--foreground)")}
            onMouseLeave={(e) => (e.target.style.color = "var(--muted)")}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Right: time + CTA */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <span
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: "0.7rem",
            color: "var(--muted)",
            letterSpacing: "0.06em",
          }}
        >
          KTM {time}
        </span>
        <a
          href="mailto:reshukshrestha@gmail.com"
          className="btn-primary"
          style={{ padding: "8px 18px", fontSize: "0.75rem" }}
        >
          Hire me
        </a>
      </div>
    </nav>
  );
}
