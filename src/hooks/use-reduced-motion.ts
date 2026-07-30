"use client";

import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════
   KODŌ — Reduced Motion Hook
   Tracks the OS-level prefers-reduced-motion media query.
   When enabled, all GSAP ScrollTriggers, camera splines,
   and WebGL particle systems are disabled.
   ═══════════════════════════════════════════════════════════ */

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}
