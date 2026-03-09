"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Cursor from "../components/Cursor";

const MOMO_FACTS = [
  "Every momo you buy funds 0.003 seconds of bug-fixing ☕",
  "Momos are the superior food. No debates.",
  "This QR code was built with Paisa Studio btw 👀",
  "Reshuk runs on momos, chai, and Stack Overflow.",
  "One momo = one commit. Math checks out.",
  "Your momo donation is 100% tax-deductible (not really).",
];

export default function DonatePage() {
  const [copied, setCopied] = useState(false);
  const [factIdx, setFactIdx] = useState(0);
  const [particles, setParticles] = useState([]);
  const [momoRain, setMomoRain] = useState([]);

  useEffect(() => {
    setParticles(Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 3,
      delay: Math.random() * 4,
      dur: 3 + Math.random() * 3,
    })));
    setMomoRain(Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      dur: 4 + Math.random() * 4,
      emoji: ["🥟", "☕", "💛", "🔥", "✨"][i % 5],
      size: 16 + Math.random() * 14,
    })));

    const t = setInterval(() => setFactIdx(i => (i + 1) % MOMO_FACTS.length), 3200);
    return () => clearInterval(t);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("9823XXXXXX");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
    minHeight: "100vh", background: "var(--bg)", color: "var(--fg)",
    fontFamily: "var(--font-body)", overflow: "hidden", position: "relative",
    }}>
      <Cursor />

      {/* Momo rain */}
      {momoRain.map(m => (
        <div key={m.id} style={{
          position: "fixed", left: `${m.x}%`, top: "-40px",
          fontSize: `${m.size}px`, pointerEvents: "none", zIndex: 0,
          animation: `momoFall ${m.dur}s linear ${m.delay}s infinite`,
          opacity: 0.22,
        }}>{m.emoji}</div>
      ))}

      {/* BG glows */}
      <div style={{
        position: "fixed", top: "15%", left: "8%", width: "600px", height: "600px",
        background: "radial-gradient(circle, rgba(232,255,71,0.05) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
        animation: "donateBlob1 9s ease-in-out infinite",
      }} />
      <div style={{
        position: "fixed", bottom: "8%", right: "4%", width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(74,222,128,0.04) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
        animation: "donateBlob2 11s ease-in-out infinite",
      }} />

      {/* Particles */}
      {particles.map(p => (
        <div key={p.id} style={{
          position: "fixed", left: `${p.x}%`, top: `${p.y}%`,
          width: p.size, height: p.size, borderRadius: "50%",
          background: p.id % 3 === 0 ? "var(--accent)" : p.id % 3 === 1 ? "#4ade80" : "#60a5fa",
          pointerEvents: "none", opacity: 0.15,
          animation: `donateTwinkle ${p.dur}s ease-in-out ${p.delay}s infinite`,
        }} />
      ))}

      {/* Nav */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(6,6,8,0.75)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
      }}>
        <Link href="/" style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          fontFamily: "var(--font-mono)", fontSize: "0.66rem", color: "var(--muted)",
          textDecoration: "none", letterSpacing: "0.1em", transition: "color 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--fg)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M12 7H2M2 7L7 2M2 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          BACK TO PORTFOLIO
        </Link>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "var(--muted2)", letterSpacing: "0.1em" }}>
          reshuk.dev/donate
        </span>
      </div>

      {/* Main */}
      <div style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "100px 24px 60px", position: "relative", zIndex: 1,
      }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px", animation: "donateSlideUp 0.8s cubic-bezier(0.16,1,0.3,1) both" }}>
          <div style={{ fontSize: "3.2rem", marginBottom: "14px", animation: "donateBounce 2.2s ease-in-out infinite" }}>
            🥟
          </div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "5px 14px", borderRadius: "100px",
            background: "rgba(232,255,71,0.06)", border: "1px solid rgba(232,255,71,0.18)",
            fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--accent)",
            letterSpacing: "0.14em", marginBottom: "18px",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80", display: "inline-block" }} />
            ESEWA · NEPAL
          </div>
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 800,
            fontSize: "clamp(2.2rem, 6vw, 4.2rem)",
            letterSpacing: "-0.03em", lineHeight: 0.95,
            color: "var(--fg)", marginBottom: "12px",
          }}>
            Buy me a<br />
            <span style={{ color: "var(--accent)" }}>Momo</span> 🥟
          </h1>
          <p style={{
            fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.75,
            maxWidth: "360px", margin: "0 auto 14px",
          }}>
            If my work helped you, saved you time, or just made you smile — fuel the next late-night coding session.
          </p>
          {/* Rotating fact */}
          <div key={factIdx} style={{
            display: "inline-block", marginTop: "8px", padding: "9px 18px",
            background: "rgba(15,15,18,0.9)", border: "1px solid var(--border)",
            borderRadius: "8px", maxWidth: "400px",
            fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--muted2)",
            letterSpacing: "0.04em", lineHeight: 1.6,
            animation: "donateFact 0.5s ease both",
          }}>
            💬 {MOMO_FACTS[factIdx]}
          </div>
        </div>

        {/* QR Card */}
        <div style={{ animation: "donateSlideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s both", width: "100%", maxWidth: "380px" }}>
          <div style={{
            background: "var(--card)", border: "1px solid var(--border)",
            borderRadius: "16px", overflow: "hidden",
            boxShadow: "0 0 0 1px rgba(232,255,71,0.05), 0 40px 80px rgba(0,0,0,0.55)",
          }}>
            {/* Card top bar */}
            <div style={{
              padding: "12px 18px", background: "var(--card2)",
              borderBottom: "1px solid var(--border)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div style={{ display: "flex", gap: "6px" }}>
                {["#ff5f57","#febc2e","#28c840"].map(c => (
                  <span key={c} style={{ width: "9px", height: "9px", borderRadius: "50%", background: c, display: "inline-block" }} />
                ))}
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "var(--muted2)", letterSpacing: "0.08em" }}>
                eSewa Payment QR
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "#4ade80", letterSpacing: "0.06em" }}>◆ LIVE</span>
            </div>

            <div style={{ padding: "24px", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
              {/* QR with scan line */}
              <div style={{ position: "relative", borderRadius: "10px", overflow: "hidden" }}>
                {/* Corner brackets */}
                {[
                  { top: 0, left: 0, borderTop: "2px solid var(--accent)", borderLeft: "2px solid var(--accent)", borderRadius: "8px 0 0 0" },
                  { top: 0, right: 0, borderTop: "2px solid var(--accent)", borderRight: "2px solid var(--accent)", borderRadius: "0 8px 0 0" },
                  { bottom: 0, left: 0, borderBottom: "2px solid var(--accent)", borderLeft: "2px solid var(--accent)", borderRadius: "0 0 0 8px" },
                  { bottom: 0, right: 0, borderBottom: "2px solid var(--accent)", borderRight: "2px solid var(--accent)", borderRadius: "0 0 8px 0" },
                ].map((s, i) => (
                  <div key={i} style={{ position: "absolute", width: "24px", height: "24px", zIndex: 2, ...s }} />
                ))}
                {/* Scan line */}
                <div style={{
                  position: "absolute", left: 0, right: 0, height: "2px", zIndex: 3,
                  background: "linear-gradient(90deg, transparent, rgba(232,255,71,0.7), transparent)",
                  boxShadow: "0 0 10px rgba(232,255,71,0.5)",
                  animation: "donateScan 2.4s ease-in-out infinite",
                }} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/esewa-qr.png" alt="eSewa QR" width={260} height={260} style={{ display: "block", width: "260px", height: "260px", objectFit: "cover" }} />
              </div>

              {/* Amount pills */}
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "center" }}>
                {["Rs 50 🥟", "Rs 100 🥟🥟", "Rs 200 ✨", "Any 💛"].map(a => (
                  <span key={a} style={{
                    padding: "4px 11px", borderRadius: "100px",
                    background: "var(--card2)", border: "1px solid var(--border)",
                    fontFamily: "var(--font-mono)", fontSize: "0.57rem", color: "var(--muted)",
                    letterSpacing: "0.03em", cursor: "default",
                    transition: "border-color 0.2s, color 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = ""; e.currentTarget.style.color = ""; }}
                  >{a}</span>
                ))}
              </div>

              {/* Steps */}
              <div style={{
                width: "100%", background: "var(--card2)", border: "1px solid var(--border)",
                borderRadius: "8px", padding: "13px 15px",
              }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.56rem", color: "var(--muted2)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "10px" }}>
                  How to send
                </div>
                {[
                  "Open eSewa app on your phone",
                  "Tap 'Scan QR' or 'Send Money'",
                  "Scan the code above",
                  "Enter any amount & send 🥟",
                ].map((step, i) => (
                  <div key={i} style={{ display: "flex", gap: "10px", marginBottom: i < 3 ? "7px" : 0, alignItems: "flex-start" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.56rem", color: "var(--accent)", minWidth: "16px", marginTop: "2px" }}>0{i+1}</span>
                    <span style={{ fontSize: "0.76rem", color: "var(--muted)", lineHeight: 1.5 }}>{step}</span>
                  </div>
                ))}
              </div>

              {/* Copy btn */}
              <button onClick={handleCopy} style={{
                width: "100%", padding: "11px",
                borderRadius: "6px",
                background: copied ? "rgba(74,222,128,0.1)" : "transparent",
                border: `1px solid ${copied ? "rgba(74,222,128,0.4)" : "var(--border2)"}`,
                color: copied ? "#4ade80" : "var(--muted)",
                fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.08em",
                cursor: "pointer", transition: "all 0.25s ease",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              }}>
                {copied
                  ? <><svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-6" stroke="#4ade80" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>COPIED!</>
                  : <><svg width="12" height="12" viewBox="0 0 14 14" fill="none"><rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M2 10V2h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>COPY ESEWA NUMBER</>
                }
              </button>
            </div>

            {/* Footer */}
            <div style={{
              padding: "11px 18px", background: "var(--card2)", borderTop: "1px solid var(--border)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.56rem", color: "var(--muted2)", letterSpacing: "0.06em" }}>QR built with</span>
              <a href="https://paisa-studio.onrender.com" target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: "var(--font-mono)", fontSize: "0.56rem", color: "var(--accent)", letterSpacing: "0.08em", textDecoration: "none" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.6"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >✦ Paisa Studio</a>
            </div>
          </div>
        </div>

        {/* Thank you */}
        <div style={{ marginTop: "32px", textAlign: "center", animation: "donateSlideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s both" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--muted2)", letterSpacing: "0.08em" }}>
            No pressure — but you'll have good karma forever 🙏
          </p>
          <Link href="/" style={{
            display: "inline-flex", alignItems: "center", gap: "6px", marginTop: "14px",
            fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--muted)",
            textDecoration: "none", letterSpacing: "0.1em", transition: "color 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
          >← back to the cool stuff</Link>
        </div>
      </div>

      <style>{`
        @keyframes momoFall {
          0%   { transform: translateY(-40px) rotate(0deg); opacity: 0; }
          8%   { opacity: 0.22; }
          92%  { opacity: 0.22; }
          100% { transform: translateY(110vh) rotate(380deg); opacity: 0; }
        }
        @keyframes donateScan {
          0%   { top: 0%; opacity: 1; }
          85%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes donateSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes donateBounce {
          0%,100% { transform: translateY(0) rotate(-6deg); }
          50%      { transform: translateY(-12px) rotate(6deg); }
        }
        @keyframes donateBlob1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(40px,-30px) scale(1.1); }
        }
        @keyframes donateBlob2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(-50px,20px) scale(1.08); }
        }
        @keyframes donateTwinkle {
          0%,100% { opacity: 0.08; transform: scale(1); }
          50%      { opacity: 0.28; transform: scale(1.7); }
        }
        @keyframes donateFact {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
