"use client";
import { useEffect, useRef, useState } from "react";

const CODE_LINES = [
  "const me = new Developer();",
  "await ship(product);",
  "git commit -m '✨ magic'",
  "npm run go-viral",
  "export default Reshuk;",
  "while(alive) { create(); }",
  "console.log('hire me 🔥');",
];

const BUBBLES_INIT = [
  { id: 0, text: "const me = new Dev()", x: -8, y: 12, delay: 0,   dur: 4.8 },
  { id: 1, text: "await ship(dream)",    x: 85,  y: 5,  delay: 0.9, dur: 5.2 },
  { id: 2, text: "git push origin main", x: -12, y: 48, delay: 1.6, dur: 4.4 },
  { id: 3, text: "npm run go-viral",     x: 82,  y: 55, delay: 2.3, dur: 5.8 },
  { id: 4, text: "export { magic }",     x: 20,  y: 88, delay: 0.5, dur: 4.6 },
  { id: 5, text: ":wq",                  x: 70,  y: 85, delay: 1.8, dur: 5.0 },
];

const BUBBLE_COLORS = [
  { text: "var(--accent)",   border: "rgba(232,255,71,0.22)" },
  { text: "#60a5fa",         border: "rgba(96,165,250,0.22)" },
  { text: "#a78bfa",         border: "rgba(167,139,250,0.22)" },
  { text: "#4ade80",         border: "rgba(74,222,128,0.22)" },
  { text: "#fb7185",         border: "rgba(251,113,133,0.22)" },
  { text: "var(--accent)",   border: "rgba(232,255,71,0.22)" },
];

export default function CoderCharacter() {
  const svgRef = useRef(null);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [isTyping, setIsTyping] = useState(true);
  const [codeIdx, setCodeIdx] = useState(0);
  const [screenText, setScreenText] = useState("");

  // Cursor-tracking eyes
  useEffect(() => {
    const onMove = (e) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const cx = rect.left + rect.width * 0.5;
      const cy = rect.top + rect.height * 0.40;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const max = 4.5;
      setEyeOffset({
        x: (dx / Math.max(dist, 1)) * Math.min(dist * 0.08, max),
        y: (dy / Math.max(dist, 1)) * Math.min(dist * 0.08, max),
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Typewriter on screen
  useEffect(() => {
    const line = CODE_LINES[codeIdx];
    let i = 0;
    setScreenText("");
    const t = setInterval(() => {
      i++;
      setScreenText(line.slice(0, i));
      if (i >= line.length) {
        clearInterval(t);
        setTimeout(() => setCodeIdx((c) => (c + 1) % CODE_LINES.length), 1400);
      }
    }, 52);
    return () => clearInterval(t);
  }, [codeIdx]);

  // Typing hand wiggle
  useEffect(() => {
    const id = setInterval(() => setIsTyping((v) => !v), 160);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "480px", margin: "0 auto" }}>
      {/* Floating code bubbles */}
      {BUBBLES_INIT.map((b, i) => (
        <div key={b.id} style={{
          position: "absolute",
          left: `${b.x}%`, top: `${b.y}%`,
          fontFamily: "var(--font-mono)", fontSize: "0.56rem",
          color: BUBBLE_COLORS[i].text,
          background: "rgba(6,6,8,0.88)",
          border: `1px solid ${BUBBLE_COLORS[i].border}`,
          padding: "4px 10px", borderRadius: "4px",
          whiteSpace: "nowrap", letterSpacing: "0.04em",
          animation: `codeBubbleFloat ${b.dur}s ease-in-out ${b.delay}s infinite`,
          pointerEvents: "none", zIndex: 2,
          backdropFilter: "blur(6px)",
        }}>
          {b.text}
        </div>
      ))}

      {/* Main SVG */}
      <svg ref={svgRef} viewBox="0 0 320 410" fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", filter: "drop-shadow(0 0 80px rgba(232,255,71,0.07))" }}>
        <defs>
          <radialGradient id="cg-body" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#2c2c3d" />
            <stop offset="100%" stopColor="#18181f" />
          </radialGradient>
          <radialGradient id="cg-head" cx="45%" cy="38%" r="60%">
            <stop offset="0%" stopColor="#2a2a38" />
            <stop offset="100%" stopColor="#1c1c28" />
          </radialGradient>
          <radialGradient id="cg-screen" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0a2818" />
            <stop offset="100%" stopColor="#060608" />
          </radialGradient>
          <filter id="cg-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="cg-bigglow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <clipPath id="cg-screen-clip">
            <rect x="84" y="250" width="116" height="62" rx="2" />
          </clipPath>
        </defs>

        {/* ── Floor shadow ── */}
        <ellipse cx="160" cy="400" rx="115" ry="12" fill="rgba(232,255,71,0.03)" />
        <ellipse cx="160" cy="400" rx="75" ry="7"  fill="rgba(232,255,71,0.04)" />

        {/* ── Bean bag ── */}
        <ellipse cx="160" cy="368" rx="98"  ry="40" fill="#111119" />
        <ellipse cx="160" cy="362" rx="90"  ry="33" fill="#181824" />
        <ellipse cx="160" cy="357" rx="82"  ry="26" fill="#1c1c2a" />
        {/* Cushion seam lines */}
        <path d="M 85 352 Q 160 345 235 352" stroke="#222230" strokeWidth="1" fill="none" />
        <path d="M 95 363 Q 160 358 225 363" stroke="#222230" strokeWidth="0.8" fill="none" />
        {/* Cushion shine */}
        <ellipse cx="138" cy="344" rx="26" ry="9" fill="rgba(255,255,255,0.025)" transform="rotate(-10 138 344)" />

        {/* ── Legs (cross-legged) ── */}
        <path d="M 95 315 Q 72 345 115 360 Q 148 370 158 352" fill="#232332" />
        <path d="M 225 315 Q 248 345 205 360 Q 172 370 162 352" fill="#232332" />
        {/* Leg highlight */}
        <path d="M 100 318 Q 80 343 115 357" stroke="#2c2c3c" strokeWidth="1" fill="none" />
        <path d="M 220 318 Q 240 343 205 357" stroke="#2c2c3c" strokeWidth="1" fill="none" />
        {/* Sneakers */}
        <ellipse cx="120" cy="361" rx="20" ry="9" fill="#1a1a28" />
        <ellipse cx="200" cy="361" rx="20" ry="9" fill="#1a1a28" />
        {/* Sneaker sole accent */}
        <path d="M 102 364 Q 120 368 138 364" stroke="#e8ff47" strokeWidth="1" opacity="0.3" fill="none" />
        <path d="M 182 364 Q 200 368 218 364" stroke="#e8ff47" strokeWidth="1" opacity="0.3" fill="none" />

        {/* ── Hoodie body ── */}
        <path d="M 106 222 Q 97 268 93 315 Q 118 328 160 330 Q 202 328 227 315 Q 223 268 214 222 Q 197 210 160 208 Q 123 210 106 222Z"
          fill="url(#cg-body)" />
        {/* Hoodie ribbing at waist */}
        {[0,1,2,3,4].map(i => (
          <line key={i} x1="115" y1={305 + i*5} x2="205" y2={305 + i*5}
            stroke="#222230" strokeWidth="0.8" opacity="0.6" />
        ))}
        {/* Center zipper seam */}
        <line x1="160" y1="210" x2="160" y2="302" stroke="#252535" strokeWidth="1.5" />
        {/* Pocket */}
        <path d="M 130 272 Q 128 294 160 295 Q 192 294 190 272 Q 175 267 130 272Z"
          fill="#20202e" stroke="#28283a" strokeWidth="1" />
        <line x1="160" y1="271" x2="160" y2="295" stroke="#28283a" strokeWidth="0.8" />
        {/* Hoodie texture lines */}
        <line x1="106" y1="235" x2="94"  y2="270" stroke="#252535" strokeWidth="0.8" opacity="0.5" />
        <line x1="214" y1="235" x2="226" y2="270" stroke="#252535" strokeWidth="0.8" opacity="0.5" />
        {/* Drawstring */}
        <path d="M 148 215 Q 150 222 152 228" stroke="#333345" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M 172 215 Q 170 222 168 228" stroke="#333345" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <circle cx="148" cy="213" r="2.5" fill="#2a2a3a" stroke="#333345" strokeWidth="1" />
        <circle cx="172" cy="213" r="2.5" fill="#2a2a3a" stroke="#333345" strokeWidth="1" />

        {/* ── Arms ── */}
        <path d="M 108 228 Q 76 262 72 292 Q 70 308 88 314"
          stroke="#242432" strokeWidth="22" strokeLinecap="round" fill="none" />
        <path d="M 108 228 Q 76 262 72 292 Q 70 308 88 314"
          stroke="#1e1e2c" strokeWidth="19" strokeLinecap="round" fill="none" />
        <path d="M 212 228 Q 244 262 248 292 Q 250 308 232 314"
          stroke="#242432" strokeWidth="22" strokeLinecap="round" fill="none" />
        <path d="M 212 228 Q 244 262 248 292 Q 250 308 232 314"
          stroke="#1e1e2c" strokeWidth="19" strokeLinecap="round" fill="none" />

        {/* ── Hands (typing bounce) ── */}
        <ellipse cx={isTyping ? 98 : 100} cy={isTyping ? 245 : 247} rx="14" ry="10" fill="#252535" style={{ transition: "all 0.1s" }} />
        <ellipse cx={isTyping ? 98 : 100} cy={isTyping ? 243 : 245} rx="12" ry="8"  fill="#2e2e40" style={{ transition: "all 0.1s" }} />
        <ellipse cx={isTyping ? 222 : 220} cy={isTyping ? 245 : 247} rx="14" ry="10" fill="#252535" style={{ transition: "all 0.1s" }} />
        <ellipse cx={isTyping ? 222 : 220} cy={isTyping ? 243 : 245} rx="12" ry="8"  fill="#2e2e40" style={{ transition: "all 0.1s" }} />
        {/* Finger knuckle hints */}
        {[-4,-1,2,5].map(o => (
          <ellipse key={o} cx={92 + o} cy={isTyping ? 239 : 241} rx="1.5" ry="1" fill="#363648" style={{ transition: "all 0.1s" }} />
        ))}
        {[-4,-1,2,5].map(o => (
          <ellipse key={o} cx={216 + o} cy={isTyping ? 239 : 241} rx="1.5" ry="1" fill="#363648" style={{ transition: "all 0.1s" }} />
        ))}

        {/* ── Laptop base ── */}
        <rect x="68" y="250" width="184" height="18" rx="5" fill="#141420" />
        <rect x="70" y="250" width="180" height="16" rx="4" fill="#191926" />
        {/* Keys */}
        {Array.from({ length: 9 }).map((_, i) => (
          <rect key={i} x={80 + i * 18} y="254" width="13" height="7" rx="1.5"
            fill={isTyping && i === Math.floor(Date.now() / 200) % 9 ? "#2a3a28" : "#20202e"} />
        ))}
        {/* Trackpad */}
        <rect x="136" y="260" width="48" height="7" rx="2.5" fill="#1e1e2c" />
        <rect x="137" y="261" width="46" height="5" rx="2" fill="#222230" />

        {/* ── Laptop screen ── */}
        <rect x="78" y="168" width="164" height="84" rx="7" fill="#111120" />
        <rect x="80" y="170" width="160" height="80" rx="6" fill="#0c0c14" />
        <rect x="82" y="172" width="156" height="76" rx="5" fill="url(#cg-screen)" />
        {/* Screen bezel glow */}
        <rect x="82" y="172" width="156" height="76" rx="5"
          stroke="rgba(74,222,128,0.12)" strokeWidth="1" fill="none" />
        {/* Screen ambient glow reflected */}
        <rect x="80" y="170" width="160" height="80" rx="6"
          fill="rgba(74,222,128,0.02)" />

        {/* Code on screen */}
        <g clipPath="url(#cg-screen-clip)">
          <text x="90" y="265" fontSize="7.5" fill="#4ade80" letterSpacing="0.3">
            $ {screenText}<tspan fill="#e8ff47" opacity={isTyping ? 1 : 0}>▋</tspan>
          </text>
          <text x="90" y="277" fontSize="6" fill="#3a3a55" opacity="0.8">// reshuk@portfolio ~</text>
          <text x="90" y="287" fontSize="6" fill="#4488aa" opacity="0.6">import {"{"} soul {"}"} from &apos;./me&apos;</text>
          <text x="90" y="297" fontSize="6" fill="#7755bb" opacity="0.45">const fire = true;</text>
          <text x="90" y="307" fontSize="6" fill="#cc4455" opacity="0.3">// TODO: sleep</text>
        </g>

        {/* Screen top bar */}
        <rect x="82" y="172" width="156" height="11" rx="5" fill="#0e0e1a" />
        <circle cx="90"  cy="177.5" r="3" fill="#ff5f57" />
        <circle cx="100" cy="177.5" r="3" fill="#febc2e" />
        <circle cx="110" cy="177.5" r="3" fill="#28c840" />
        <text x="160" y="181" fontSize="5.5" fill="#333345" textAnchor="middle">reshuk.dev — bash</text>

        {/* ── Hinge ── */}
        <rect x="138" y="248" width="44" height="4" rx="2" fill="#0e0e18" />
        <ellipse cx="160" cy="250" rx="8" ry="2" fill="#151520" />

        {/* ── Coffee ── */}
        {/* Mug body */}
        <rect x="244" y="260" width="30" height="28" rx="5" fill="#1c1c2a" />
        <rect x="246" y="262" width="26" height="24" rx="4" fill="#111118" />
        {/* Handle */}
        <path d="M 274 266 Q 284 266 284 274 Q 284 282 274 282"
          stroke="#1c1c2a" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M 274 266 Q 282 266 282 274 Q 282 282 274 282"
          stroke="#141420" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Coffee liquid */}
        <ellipse cx="259" cy="266" rx="12" ry="3.5" fill="#3d2008" />
        <ellipse cx="259" cy="265" rx="10" ry="2" fill="#4a2810" />
        {/* Mug accent line */}
        <rect x="246" y="278" width="26" height="2" rx="1" fill="#1e1e2c" />
        {/* Steam paths */}
        <path d="M 252 260 Q 250 251 253 243 Q 255 235 252 227"
          stroke="#3a3a4a" strokeWidth="1.8" fill="none" strokeLinecap="round"
          style={{ animation: "cgSteam 2.2s ease-in-out infinite" }} />
        <path d="M 260 258 Q 262 249 259 241 Q 256 233 259 225"
          stroke="#333343" strokeWidth="1.5" fill="none" strokeLinecap="round"
          style={{ animation: "cgSteam 2.6s ease-in-out 0.5s infinite" }} />
        <path d="M 268 260 Q 270 251 267 243 Q 265 235 268 227"
          stroke="#2e2e3e" strokeWidth="1.5" fill="none" strokeLinecap="round"
          style={{ animation: "cgSteam 2.2s ease-in-out 1s infinite" }} />

        {/* ── Head ── */}
        <ellipse cx="160" cy="152" rx="54" ry="52" fill="#1e1e2c" />
        <ellipse cx="160" cy="150" rx="52" ry="50" fill="url(#cg-head)" />
        {/* Head highlight */}
        <ellipse cx="146" cy="128" rx="20" ry="13" fill="rgba(255,255,255,0.035)" transform="rotate(-18 146 128)" />
        {/* Ear left */}
        <ellipse cx="108" cy="155" rx="7" ry="10" fill="url(#cg-head)" />
        <ellipse cx="108" cy="155" rx="4.5" ry="7" fill="#191926" />
        {/* Ear right */}
        <ellipse cx="212" cy="155" rx="7" ry="10" fill="url(#cg-head)" />
        <ellipse cx="212" cy="155" rx="4.5" ry="7" fill="#191926" />

        {/* Neck */}
        <rect x="148" y="196" width="24" height="18" rx="4" fill="url(#cg-head)" />
        <rect x="149" y="197" width="22" height="16" rx="3" fill="#232330" />

        {/* ── Headphones ── */}
        <path d="M 110 148 Q 107 112 160 106 Q 213 112 210 148"
          stroke="#c8dd30" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M 110 148 Q 107 112 160 106 Q 213 112 210 148"
          stroke="#e8ff47" strokeWidth="4" fill="none" strokeLinecap="round"
          style={{ animation: "cgHeadphoneGlow 3s ease-in-out infinite" }} />
        {/* Left ear cup */}
        <rect x="101" y="145" width="15" height="20" rx="5" fill="#b8cc20" />
        <rect x="103" y="147" width="11" height="16" rx="4" fill="#e8ff47" />
        <ellipse cx="108.5" cy="155" rx="4" ry="5" fill="#c8dd30" />
        {/* Right ear cup */}
        <rect x="204" y="145" width="15" height="20" rx="5" fill="#b8cc20" />
        <rect x="206" y="147" width="11" height="16" rx="4" fill="#e8ff47" />
        <ellipse cx="211.5" cy="155" rx="4" ry="5" fill="#c8dd30" />
        {/* Sound wave from headphones */}
        {[8, 14, 20].map((r, i) => (
          <path key={i} d={`M 101 ${148 + r * 0.4} Q ${101 - r} 155 101 ${162 - r * 0.4}`}
            stroke="#e8ff47" strokeWidth="1" fill="none" opacity={0.15 - i * 0.04}
            style={{ animation: `cgSoundWave 1.8s ease-in-out ${i * 0.2}s infinite` }} />
        ))}
        {[8, 14, 20].map((r, i) => (
          <path key={i} d={`M 219 ${148 + r * 0.4} Q ${219 + r} 155 219 ${162 - r * 0.4}`}
            stroke="#e8ff47" strokeWidth="1" fill="none" opacity={0.15 - i * 0.04}
            style={{ animation: `cgSoundWave 1.8s ease-in-out ${i * 0.2}s infinite` }} />
        ))}

        {/* ── Face ── */}
        {/* Eye sockets */}
        <ellipse cx="140" cy="153" rx="14" ry="14" fill="#14141e" />
        <ellipse cx="180" cy="153" rx="14" ry="14" fill="#14141e" />
        <ellipse cx="140" cy="153" rx="14" ry="14" stroke="#22222e" strokeWidth="1" fill="none" />
        <ellipse cx="180" cy="153" rx="14" ry="14" stroke="#22222e" strokeWidth="1" fill="none" />
        {/* Eyebrow */}
        <path d="M 128 139 Q 140 135 152 139" stroke="#e8ff47" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
        <path d="M 168 139 Q 180 135 192 139" stroke="#e8ff47" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />

        {/* Iris */}
        <circle cx={140 + eyeOffset.x} cy={153 + eyeOffset.y} r="8" fill="#e8ff47" filter="url(#cg-glow)" />
        <circle cx={180 + eyeOffset.x} cy={153 + eyeOffset.y} r="8" fill="#e8ff47" filter="url(#cg-glow)" />
        {/* Pupil */}
        <circle cx={140 + eyeOffset.x} cy={153 + eyeOffset.y} r="4" fill="#060608" />
        <circle cx={180 + eyeOffset.x} cy={153 + eyeOffset.y} r="4" fill="#060608" />
        {/* Glint */}
        <circle cx={136 + eyeOffset.x} cy={149 + eyeOffset.y} r="2.5" fill="white" opacity="0.9" />
        <circle cx={176 + eyeOffset.x} cy={149 + eyeOffset.y} r="2.5" fill="white" opacity="0.9" />
        {/* Tiny secondary glint */}
        <circle cx={143 + eyeOffset.x} cy={157 + eyeOffset.y} r="1" fill="white" opacity="0.35" />
        <circle cx={183 + eyeOffset.x} cy={157 + eyeOffset.y} r="1" fill="white" opacity="0.35" />

        {/* Nose */}
        <path d="M 156 164 Q 160 170 164 164" stroke="#333345" strokeWidth="1.8" fill="none" strokeLinecap="round" />

        {/* Smile */}
        <path d="M 146 174 Q 160 186 174 174" stroke="#e8ff47" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.85" />
        {/* Teeth hint */}
        <path d="M 150 176 Q 160 183 170 176" stroke="rgba(238,234,224,0.1)" strokeWidth="5" fill="none" strokeLinecap="round" />

        {/* Blush */}
        <ellipse cx="124" cy="170" rx="10" ry="6" fill="rgba(255,130,130,0.07)" />
        <ellipse cx="196" cy="170" rx="10" ry="6" fill="rgba(255,130,130,0.07)" />

        {/* ── Cap ── */}
        <path d="M 108 130 Q 106 96 160 88 Q 214 96 212 130 Q 196 112 160 110 Q 124 112 108 130Z"
          fill="#d4e830" />
        <path d="M 108 130 Q 106 96 160 88 Q 214 96 212 130 Q 196 112 160 110 Q 124 112 108 130Z"
          fill="#e8ff47" opacity="0.7" />
        {/* Cap brim */}
        <path d="M 106 133 Q 103 127 124 124 Q 140 122 160 122 Q 180 122 196 124 Q 217 127 214 133"
          fill="#c8dd20" />
        <path d="M 106 133 Q 103 127 124 124 Q 140 122 160 122 Q 180 122 196 124 Q 217 127 214 133"
          fill="#d8ee30" opacity="0.5" />
        {/* Cap button */}
        <circle cx="160" cy="91" r="6" fill="#c0d018" />
        <circle cx="160" cy="91" r="4" fill="#d8e828" />
        {/* Cap logo — dev icon */}
        <text x="149" y="115" fontSize="9" fill="#060608" fontWeight="bold" letterSpacing="-0.5">&lt;/&gt;</text>

        {/* ── Particles / stars ── */}
        {[
          { cx: 40,  cy: 75,  r: 1.8, color: "#e8ff47", d: 2.2 },
          { cx: 280, cy: 88,  r: 1.2, color: "#60a5fa", d: 3.1 },
          { cx: 28,  cy: 195, r: 1,   color: "#a78bfa", d: 2.7 },
          { cx: 292, cy: 210, r: 1.8, color: "#e8ff47", d: 1.9 },
          { cx: 52,  cy: 318, r: 1.2, color: "#4ade80", d: 3.4 },
          { cx: 270, cy: 335, r: 1,   color: "#fb7185", d: 2.5 },
          { cx: 18,  cy: 135, r: 1,   color: "#fbbf24", d: 2.0 },
          { cx: 302, cy: 155, r: 1.2, color: "#4ade80", d: 2.8 },
        ].map((p, i) => (
          <g key={i} style={{ animation: `cgTwinkle ${p.d}s ease-in-out ${i * 0.28}s infinite` }}>
            <circle cx={p.cx} cy={p.cy} r={p.r * 2} fill={p.color} opacity="0.08" />
            <circle cx={p.cx} cy={p.cy} r={p.r} fill={p.color} filter="url(#cg-glow)" />
          </g>
        ))}

        {/* ── Orbit ring around character ── */}
        <ellipse cx="160" cy="250" rx="145" ry="40" stroke="rgba(232,255,71,0.04)" strokeWidth="1" strokeDasharray="4 8" fill="none"
          style={{ animation: "cgOrbit 20s linear infinite" }} />
        {/* Orbit dot */}
        <circle r="4" fill="#e8ff47" opacity="0.6" filter="url(#cg-glow)">
          <animateMotion dur="20s" repeatCount="indefinite">
            <mpath href="#cg-orbit-path" />
          </animateMotion>
        </circle>
        <path id="cg-orbit-path" d="M 15 250 A 145 40 0 1 1 14.99 250Z" fill="none" />
      </svg>

      <style>{`
        @keyframes codeBubbleFloat {
          0%,100% { transform: translateY(0px) rotate(-1deg); }
          33%      { transform: translateY(-12px) rotate(1.5deg); }
          66%      { transform: translateY(-6px) rotate(-0.5deg); }
        }
        @keyframes cgSteam {
          0%   { transform: translateY(0) scaleX(1); opacity: 0.55; }
          50%  { transform: translateY(-10px) scaleX(1.4); opacity: 0.25; }
          100% { transform: translateY(-20px) scaleX(0.7); opacity: 0; }
        }
        @keyframes cgTwinkle {
          0%,100% { opacity: 0.25; transform: scale(1); }
          50%      { opacity: 1;    transform: scale(1.8); }
        }
        @keyframes cgHeadphoneGlow {
          0%,100% { opacity: 0.7; }
          50%      { opacity: 1; filter: drop-shadow(0 0 6px #e8ff47); }
        }
        @keyframes cgSoundWave {
          0%,100% { opacity: 0.12; transform: scaleY(1); }
          50%      { opacity: 0.22; transform: scaleY(1.2); }
        }
        @keyframes cgOrbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
