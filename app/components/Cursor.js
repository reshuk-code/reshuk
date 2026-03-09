"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      ringPosRef.current.x = lerp(ringPosRef.current.x, posRef.current.x, 0.1);
      ringPosRef.current.y = lerp(ringPosRef.current.y, posRef.current.y, 0.1);
      ring.style.left = ringPosRef.current.x + "px";
      ring.style.top = ringPosRef.current.y + "px";
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    const onEnter = (e) => {
      const t = e.target;
      if (t.matches("a, button, [data-cursor], .project-card, .skill-pill")) {
        cursor.classList.add("expand");
        ring.classList.add("expand");
      }
      if (t.matches("input, textarea")) {
        cursor.classList.add("text-mode");
        ring.classList.add("text-mode");
      }
    };
    const onLeave = (e) => {
      const t = e.target;
      if (t.matches("a, button, [data-cursor], .project-card, .skill-pill")) {
        cursor.classList.remove("expand");
        ring.classList.remove("expand");
      }
      if (t.matches("input, textarea")) {
        cursor.classList.remove("text-mode");
        ring.classList.remove("text-mode");
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" style={{ position: "fixed", pointerEvents: "none" }} />
      <div ref={ringRef} className="cursor-ring" style={{ position: "fixed", pointerEvents: "none" }} />
    </>
  );
}
