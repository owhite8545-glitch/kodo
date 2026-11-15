"use client";

import React, { useEffect, useRef } from "react";

interface HeroStageProps {
  children: React.ReactNode;
}

/**
 * KODŌ — HeroStage
 * Architectural Chiaroscuro lighting controller for the full Hero section.
 * Tracks pointer movement at 60/120fps via damped Lerp + CSS custom properties
 * (--hero-mx, --hero-my, --hero-active) with zero React re-renders.
 * Respects reduced-motion and touch-only viewports.
 */
export function HeroStage({ children }: HeroStageProps) {
  const stageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch = window.matchMedia(
      "(hover: none) and (pointer: coarse)"
    ).matches;
    const stage = stageRef.current;

    if (!stage || prefersReducedMotion || isTouch) return;

    let rafId: number | null = null;
    let targetX = 62;
    let targetY = 48;
    let targetActive = 0;

    let currentX = 62;
    let currentY = 48;
    let currentActive = 0;

    const syncStyles = () => {
      stage.style.setProperty("--hero-mx", `${currentX.toFixed(2)}%`);
      stage.style.setProperty("--hero-my", `${currentY.toFixed(2)}%`);
      stage.style.setProperty("--hero-active", currentActive.toFixed(3));
    };

    const tick = () => {
      const posFactor = 0.085;
      const fadeFactor = targetActive > currentActive ? 0.12 : 0.055;

      currentX += (targetX - currentX) * posFactor;
      currentY += (targetY - currentY) * posFactor;
      currentActive += (targetActive - currentActive) * fadeFactor;

      syncStyles();

      const delta =
        Math.abs(targetX - currentX) +
        Math.abs(targetY - currentY) +
        Math.abs(targetActive - currentActive) * 100;

      if (delta > 0.08) {
        rafId = requestAnimationFrame(tick);
      } else {
        currentX = targetX;
        currentY = targetY;
        currentActive = targetActive;
        syncStyles();
        rafId = null;
      }
    };

    const scheduleTick = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== "mouse" && e.pointerType !== "pen") {
        return;
      }
      const rect = stage.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const pctX = ((e.clientX - rect.left) / rect.width) * 100;
      const pctY = ((e.clientY - rect.top) / rect.height) * 100;

      targetX = Math.max(0, Math.min(100, pctX));
      targetY = Math.max(0, Math.min(100, pctY));
      targetActive = 1;
      scheduleTick();
    };

    const handlePointerLeave = () => {
      targetActive = 0;
      scheduleTick();
    };

    syncStyles();
    stage.addEventListener("pointermove", handlePointerMove, { passive: true });
    stage.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      stage.removeEventListener("pointermove", handlePointerMove);
      stage.removeEventListener("pointerleave", handlePointerLeave);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={stageRef}
      aria-label="KODŌ Brand Introduction"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        paddingTop: "calc(var(--comp-nav-height) + var(--ref-space-2))",
        paddingBottom: "var(--ref-space-8)",
        overflow: "hidden",
      }}
    >
      {children}
    </section>
  );
}
