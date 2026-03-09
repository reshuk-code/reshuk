"use client";
import { useEffect, useRef, useState } from "react";

const inputStyle = {
  width: "100%",
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: "4px",
  padding: "13px 15px",
  color: "var(--fg)",
  fontSize: "0.875rem",
  fontFamily: "var(--font-body)",
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  resize: "none",
};

const GITHUB = "https://github.com/reshuk-code";

export default function Contact() {
  const ref = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [focused, setFocused] = useState(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.querySelectorAll("[data-r]").forEach((c) => { c.style.opacity = "1"; c.style.transform = "translateY(0)"; });
        obs.unobserve(el);
      }
    }, { threshold: 0.1 });
    el.querySelectorAll("[data-r]").forEach((c, i) => {
      c.style.opacity = "0"; c.style.transform = "translateY(24px)";
      c.style.transition = `opacity 0.8s ease ${i * 0.08}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`;
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) { setErrorMsg("Please fill in all fields."); setStatus("error"); return; }
    setStatus("loading"); setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setErrorMsg(data.error || "Something went wrong."); setStatus("error"); }
      else { setStatus("success"); setForm({ name: "", email: "", message: "" }); }
    } catch { setErrorMsg("Network error. Please try again."); setStatus("error"); }
  };

  const socials = [
    { label: "GitHub", href: GITHUB },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/reshuk-sapkota-798537374/" },
    { label: "Twitter / X", href: "https://x.com/rscode2007" },
  ];

  return (
    <section id="contact" style={{ padding: "140px 48px 180px", borderTop: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
      {/* Glow bottom */}
      <div style={{
        position: "absolute", bottom: -100, left: "50%", transform: "translateX(-50%)",
        width: "800px", height: "400px",
        background: "radial-gradient(ellipse, rgba(232,255,71,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div ref={ref} className="contact-grid" style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "100px", alignItems: "start" }}>
        {/* Left */}
        <div>
          <div data-r className="section-num">04 — Contact</div>
          <h2 data-r className="display" style={{ fontSize: "clamp(3rem, 5vw, 5rem)", color: "var(--fg)", marginBottom: "24px" }}>
            Let's<br />
            <span style={{ WebkitTextStroke: "1px rgba(238,234,224,0.25)", color: "transparent" }}>Build</span>
          </h2>

          <p data-r style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "48px", maxWidth: "380px" }}>
            Open for freelance projects, collaborations, or just a chat about cool ideas. I typically respond within 24–48 hours.
          </p>

          {/* Info rows */}
          <div data-r style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px" }}>
            {[
              { icon: "✉", label: "reshuksapkota@gmail.com", href: "mailto:reshuksapkota@gmail.com" },
              { icon: "◉", label: "Biratnagar, Nepal", href: null },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent)", width: "16px" }}>{item.icon}</span>
                {item.href ? (
                  <a href={item.href} className="animated-link" style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--muted)", textDecoration: "none", letterSpacing: "0.04em" }}>{item.label}</a>
                ) : (
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--muted)", letterSpacing: "0.04em" }}>{item.label}</span>
                )}
              </div>
            ))}
          </div>

          {/* Socials */}
          <div data-r className="contact-socials" style={{ display: "flex", gap: "0", border: "1px solid var(--border)", borderRadius: "6px", overflow: "hidden" }}>
            {socials.map((link, i) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                style={{
                  flex: 1, padding: "12px 0", textAlign: "center",
                  fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--muted)",
                  textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase",
                  borderRight: i < socials.length - 1 ? "1px solid var(--border)" : "none",
                  transition: "background 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--card2)"; e.currentTarget.style.color = "var(--accent)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = ""; e.currentTarget.style.color = "var(--muted)"; }}
              >{link.label}</a>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <div data-r>
          {status === "success" ? (
            <div style={{
              padding: "52px 36px", background: "var(--card)", border: "1px solid var(--border)",
              borderRadius: "8px", textAlign: "center", borderTop: "3px solid var(--accent)",
            }}>
              <div style={{ fontSize: "2.8rem", marginBottom: "20px" }}>✉️</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 800, color: "var(--fg)", marginBottom: "12px", letterSpacing: "-0.02em" }}>
                Message sent!
              </h3>
              <p style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "28px" }}>
                Thanks for reaching out. I'll get back to you within 24–48 hours.
              </p>
              <button onClick={() => setStatus("idle")} className="btn-outline" style={{ cursor: "none" }}>Send another</button>
            </div>
          ) : (
            <div style={{
              padding: "36px", background: "var(--card)", border: "1px solid var(--border)",
              borderRadius: "8px", display: "flex", flexDirection: "column", gap: "18px",
            }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--accent)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "4px" }}>
                Send a message
              </div>

              {[
                { name: "name", label: "Name", placeholder: "Your name", type: "text" },
                { name: "email", label: "Email", placeholder: "your@email.com", type: "email" },
              ].map(({ name, label, placeholder, type }) => (
                <div key={name}>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--muted2)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "8px" }}>{label}</label>
                  <input type={type} name={name} value={form[name]} onChange={handleChange} placeholder={placeholder}
                    onFocus={() => setFocused(name)} onBlur={() => setFocused(null)}
                    style={{ ...inputStyle, borderColor: focused === name ? "var(--accent)" : "var(--border)", boxShadow: focused === name ? "0 0 0 3px rgba(232,255,71,0.06)" : "none" }} />
                </div>
              ))}

              <div>
                <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--muted2)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "8px" }}>Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project..." rows={5}
                  onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                  style={{ ...inputStyle, borderColor: focused === "message" ? "var(--accent)" : "var(--border)", boxShadow: focused === "message" ? "0 0 0 3px rgba(232,255,71,0.06)" : "none" }} />
              </div>

              {status === "error" && errorMsg && (
                <div style={{ padding: "10px 14px", background: "rgba(255,80,80,0.06)", border: "1px solid rgba(255,80,80,0.18)", borderRadius: "4px", color: "#ff8080", fontSize: "0.78rem", fontFamily: "var(--font-mono)" }}>
                  {errorMsg}
                </div>
              )}

              <button onClick={handleSubmit} disabled={status === "loading"} className="btn-primary"
                style={{ width: "100%", justifyContent: "center", opacity: status === "loading" ? 0.7 : 1, cursor: "none", marginTop: "4px" }}>
                {status === "loading" ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ animation: "spin 0.8s linear infinite" }}>
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4" strokeDashoffset="10" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send message
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}
