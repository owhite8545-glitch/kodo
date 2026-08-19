"use client";

import { useRef, useEffect, type ReactNode } from "react";

/* ═══════════════════════════════════════════════════════════
   KODŌ — Section Reveal
   Progressive-enhancement viewport reveal using
   IntersectionObserver. Content remains visible without JS
   and under prefers-reduced-motion.
   ═══════════════════════════════════════════════════════════ */

export function SectionReveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion: skip reveal entirely, content stays visible
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    // Progressive enhancement: hide only after JS confirms availability
    el.classList.add("kodo-reveal--initialized");

    // Fallback: if IntersectionObserver is unavailable, show immediately
    if (!("IntersectionObserver" in window)) {
      el.classList.add("kodo-reveal--visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("kodo-reveal--visible");
            observer.unobserve(entry.target);
          }
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px",
      },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`kodo-reveal${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  );
}
