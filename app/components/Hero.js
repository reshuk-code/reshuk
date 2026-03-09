"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import CoderCharacter from "./CoderCharacter";

const ROLES = ["Full-Stack Developer", "UI Craftsman", "Builder", "Open Source Contributor"];
const SCRAMBLE_CHARS = "!@#$%^&*()_+=-[]{}|<>?/\\ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function useScramble(target, delay = 0) {
  const [text, setText] = useState(() => target.replace(/./g, "█"));
  const doneRef = useRef(false);

  useEffect(() => {
    doneRef.current = false;
    let frame = 0;
    const totalFrames = 38;
    let rafId;

    const id = setTimeout(() => {
      const tick = () => {
        if (doneRef.current) return;
        const progress = frame / totalFrames;
        const result = target.split("").map((char, i) => {
          if (char === " ") return " ";
          if (i / target.length < progress) return char;
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }).join("");
        setText(result);
        frame++;
        if (frame > totalFrames) { setText(target); doneRef.current = true; }
        else rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    }, delay);

    return () => { doneRef.current = true; clearTimeout(id); cancelAnimationFrame(rafId); };
  }, [target, delay]);

  return text;
}

function MagneticButton({ children, className, href, style, onClick }) {
  const ref = useRef(null);

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    el.style.transform = `translate(${dx * 0.28}px, ${dy * 0.28}px)`;
  }, []);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
    el.style.transition = "transform 0.5s cubic-bezier(0.23,1,0.32,1)";
  }, []);

  const onEnter = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.15s ease";
  }, []);

  return (
    <a ref={ref} href={href} className={className}
      style={{ ...style, transition: "transform 0.5s cubic-bezier(0.23,1,0.32,1), background 0.2s, box-shadow 0.2s, border-color 0.2s, color 0.2s" }}
      onMouseMove={onMove} onMouseLeave={onLeave} onMouseEnter={onEnter} onClick={onClick}>
      {children}
    </a>
  );
}

function GlitchSpan({ children, color }) {
  const [glitching, setGlitching] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const schedule = () => {
      const delay = 3000 + Math.random() * 5000;
      const t = setTimeout(() => {
        setGlitching(true);
        setTimeout(() => { setGlitching(false); schedule(); }, 380);
      }, delay);
      return t;
    };
    const t = schedule();
    return () => clearTimeout(t);
  }, []);

  return (
    <span ref={ref} style={{ position: "relative", display: "inline-block", color }}>
      {children}
      {glitching && (
        <>
          <span style={{
            position: "absolute", top: 0, left: 0, color: "#ff0040",
            clipPath: "polygon(0 20%, 100% 20%, 100% 40%, 0 40%)",
            transform: `translateX(${(Math.random() - 0.5) * 8}px)`,
            opacity: 0.8, pointerEvents: "none",
          }}>{children}</span>
          <span style={{
            position: "absolute", top: 0, left: 0, color: "#00ffff",
            clipPath: "polygon(0 60%, 100% 60%, 100% 80%, 0 80%)",
            transform: `translateX(${(Math.random() - 0.5) * -6}px)`,
            opacity: 0.8, pointerEvents: "none",
          }}>{children}</span>
        </>
      )}
    </span>
  );
}

export default function Hero() {
  const containerRef = useRef(null);
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const name1 = useScramble("Reshuk", 300);
  const name2 = useScramble("Sapkota", 700);

  // Typewriter
  useEffect(() => {
    const role = ROLES[roleIdx];
    if (typing) {
      if (displayed.length < role.length) {
        const t = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 52);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2000);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 28);
        return () => clearTimeout(t);
      } else {
        setRoleIdx((i) => (i + 1) % ROLES.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, roleIdx]);

  // Entrance
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Parallax orb
  useEffect(() => {
    const orb = document.getElementById("hero-orb");
    const onMove = (e) => {
      if (!orb) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 55;
      const y = (e.clientY / window.innerHeight - 0.5) * 35;
      orb.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const fadeUp = (i) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(32px)",
    transition: `opacity 1s ease ${0.1 + i * 0.12}s, transform 1s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.12}s`,
  });

  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      padding: "100px 48px 80px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Glow orb */}
      <div id="hero-orb" style={{
        position: "absolute", top: "40%", left: "62%",
        width: "750px", height: "750px",
        background: "radial-gradient(circle, rgba(232,255,71,0.065) 0%, rgba(232,255,71,0.018) 38%, transparent 68%)",
        borderRadius: "50%", transform: "translate(-50%,-50%)",
        pointerEvents: "none", transition: "transform 1s cubic-bezier(0.23,1,0.32,1)",
      }} />
      {/* Secondary glow */}
      <div style={{
        position: "absolute", top: "60%", left: "30%",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(96,165,250,0.04) 0%, transparent 65%)",
        borderRadius: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none",
      }} />

      {/* Grid bg */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)",
        opacity: 0.25, pointerEvents: "none",
      }} />

      {/* Scanline sweep */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent 0%, rgba(232,255,71,0.15) 50%, transparent 100%)",
          animation: "heroScanline 8s linear infinite",
        }} />
      </div>

      {/* ── Two-column layout ── */}
      <div style={{
        maxWidth: "1280px", margin: "0 auto", width: "100%",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "60px", alignItems: "center", position: "relative", zIndex: 1,
      }} className="hero-2col">

        {/* ── LEFT: Content ── */}
        <div ref={containerRef}>
          {/* Badge */}
          <div style={{ marginBottom: "28px", ...fadeUp(0) }} className="badge">
            <span style={{
              width: "7px", height: "7px", borderRadius: "50%", background: "#4ade80",
              boxShadow: "0 0 12px #4ade80, 0 0 24px rgba(74,222,128,0.4)",
              display: "inline-block", animation: "glowPulse 1.8s infinite",
            }} />
            <span style={{ marginLeft: "8px" }}>Available for freelance</span>
          </div>

          {/* Name — scramble effect */}
          <div style={{ marginBottom: "6px", ...fadeUp(1) }}>
            <h1 className="display hero-name" style={{
              color: "var(--fg)", position: "relative",
              fontVariantNumeric: "tabular-nums",
            }}>
              <GlitchSpan color="var(--fg)">{name1}</GlitchSpan>
            </h1>
          </div>
          <div style={{ marginBottom: "24px", ...fadeUp(2) }}>
            <h1 className="display hero-name" style={{
              WebkitTextStroke: "1px rgba(238,234,224,0.22)",
              color: "transparent",
              fontVariantNumeric: "tabular-nums",
            }}>
              <GlitchSpan color="transparent">{name2}</GlitchSpan>
            </h1>
          </div>

          {/* Role typewriter */}
          <div className="hero-typewriter" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px", ...fadeUp(3) }}>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--accent)",
              letterSpacing: "0.08em", textTransform: "uppercase",
            }}>
              {displayed}<span className="animate-blink" style={{ color: "var(--accent)", marginLeft: "1px" }}>_</span>
            </span>
            <span className="hero-typewriter-sep" style={{ width: "36px", height: "1px", background: "var(--border2)", flexShrink: 0 }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.66rem", color: "var(--muted)", letterSpacing: "0.06em" }}>
              Biratnagar, Nepal
            </span>
          </div>

          {/* Bio */}
          <p style={{
            fontSize: "1rem", color: "var(--muted)", maxWidth: "480px",
            lineHeight: 1.8, marginBottom: "40px", fontWeight: 300,
            ...fadeUp(4),
          }}>
            I build fast, clean, and thoughtful digital products — from SaaS tools to developer utilities. Obsessed with{" "}
            <span style={{ color: "var(--fg)", fontWeight: 400 }}>great UX</span> and{" "}
            <span style={{ color: "var(--accent)" }}>elegant code</span>.
          </p>

          {/* CTA — magnetic buttons */}
          <div className="hero-cta" style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "56px", ...fadeUp(5) }}>
            <MagneticButton href="#projects" className="btn-primary">
              View Projects
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </MagneticButton>
            <MagneticButton href="mailto:reshuksapkota@gmail.com" className="btn-outline">
              Hire Me ✦
            </MagneticButton>
            <MagneticButton href="#contact" className="btn-outline">
              Let's Talk
            </MagneticButton>
          </div>

          {/* Stats */}
          <div className="hero-stats" style={{
            display: "flex", gap: "0", paddingTop: "36px",
            borderTop: "1px solid var(--border)", ...fadeUp(6),
          }}>
            {[
              { value: "5+", label: "Projects Shipped", desc: "Live in production" },
              { value: "2+", label: "Years Building",   desc: "Full-stack focus" },
              { value: "4",  label: "SaaS Products",    desc: "Nepal & beyond" },
            ].map((s, i) => (
              <div key={s.label} style={{
                paddingRight: i < 2 ? "40px" : 0,
                borderRight: i < 2 ? "1px solid var(--border)" : "none",
                marginRight: i < 2 ? "40px" : 0,
              }}>
                <div style={{
                  fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 800,
                  color: "var(--fg)", letterSpacing: "-0.04em", lineHeight: 1,
                }}>
                  {s.value}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--accent)", letterSpacing: "0.1em", marginTop: "4px" }}>
                  {s.label.toUpperCase()}
                </div>
                <div style={{ fontSize: "0.7rem", color: "var(--muted)", marginTop: "2px" }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: SVG Character ── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0) scale(1)" : "translateY(40px) scale(0.96)",
          transition: "opacity 1.2s ease 0.5s, transform 1.2s cubic-bezier(0.16,1,0.3,1) 0.5s",
        }} className="hero-char-col">
          <CoderCharacter />
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll-hint" style={{
        position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
        opacity: 0.3, animation: "heroScrollBob 2.5s ease-in-out infinite",
      }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.56rem", letterSpacing: "0.18em", color: "var(--muted)" }}>SCROLL</span>
        <div style={{ width: "1px", height: "48px", background: "linear-gradient(to bottom, var(--muted), transparent)" }} />
        <div style={{
          width: "18px", height: "28px", border: "1px solid var(--muted2)", borderRadius: "10px",
          display: "flex", justifyContent: "center", paddingTop: "5px",
        }}>
          <div style={{
            width: "3px", height: "7px", borderRadius: "2px", background: "var(--muted2)",
            animation: "heroScrollDot 1.8s ease-in-out infinite",
          }} />
        </div>
      </div>

      <style>{`
        @keyframes heroScanline {
          0%   { top: -2px; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes heroScrollBob {
          0%,100% { transform: translateX(-50%) translateY(0); }
          50%      { transform: translateX(-50%) translateY(6px); }
        }
        @keyframes heroScrollDot {
          0%   { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(8px); opacity: 0; }
        }
        @media (max-width: 900px) {
          .hero-2col { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hero-char-col { order: -1; max-width: 320px; margin: 0 auto; }
        }
      `}</style>
    </section>
  );
}
