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

    // If the section (or its top edge) is already near/inside/above the viewport,
    // keep it immediately visible instead of fading tall sections on mobile.
    const initialRect = el.getBoundingClientRect();
    if (initialRect.top < window.innerHeight * 0.95) {
      el.classList.add("kodo-reveal--visible");
      return;
    }

    // Progressive enhancement: hide only below-the-fold sections after JS confirms availability
    el.classList.add("kodo-reveal--initialized");

    // Fallback: if IntersectionObserver is unavailable, show immediately
    if (!("IntersectionObserver" in window)) {
      el.classList.add("kodo-reveal--visible");
      return;
    }

    const reveal = () => {
      el.classList.add("kodo-reveal--visible");
      observer.disconnect();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight) {
            reveal();
            break;
          }
        }
      },
      {
        threshold: 0.01,
        rootMargin: "0px 0px 100px 0px",
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
