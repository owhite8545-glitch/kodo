"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";

interface HeroFlaconProps {
  imageSrc: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * KODŌ — HeroFlacon (Phase B.1.1 Refined Visual Anchor)
 * Integrates the physical borosilicate flacon with ambient halo,
 * ground depth shadow, and damped pointer perspective tilt.
 * Uses requestAnimationFrame direct DOM manipulation to avoid React re-renders.
 */
export function HeroFlacon({
  imageSrc,
  alt,
  className,
  style,
}: HeroFlaconProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect reduced motion & touch devices
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch = window.matchMedia(
      "(hover: none) and (pointer: coarse)"
    ).matches;
    if (prefersReducedMotion || isTouch) return;

    const container = containerRef.current;
    const card = cardRef.current;
    const sheen = sheenRef.current;
    if (!container || !card) return;

    let rafId: number | null = null;
    let targetRotateX = 0;
    let targetRotateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      // Subtle damped tilt: max ±2deg X, max ±3deg Y
      targetRotateX = -y * 4;
      targetRotateY = x * 6;

      if (sheen) {
        const sheenX = 50 + x * 20;
        const sheenY = 50 + y * 20;
        sheen.style.background = `radial-gradient(circle at ${sheenX}% ${sheenY}%, oklch(76% 0.08 85 / 0.16), transparent 70%)`;
      }

      if (!rafId) {
        rafId = requestAnimationFrame(updateTransform);
      }
    };

    const updateTransform = () => {
      // Smooth damped lerp factor
      currentRotateX += (targetRotateX - currentRotateX) * 0.08;
      currentRotateY += (targetRotateY - currentRotateY) * 0.08;

      if (card) {
        card.style.transform = `perspective(1000px) rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg) translate3d(0, 0, 0)`;
      }

      const diff =
        Math.abs(targetRotateX - currentRotateX) +
        Math.abs(targetRotateY - currentRotateY);
      if (diff > 0.01) {
        rafId = requestAnimationFrame(updateTransform);
      } else {
        rafId = null;
      }
    };

    const handleMouseLeave = () => {
      targetRotateX = 0;
      targetRotateY = 0;
      if (!rafId) {
        rafId = requestAnimationFrame(updateTransform);
      }
      if (sheen) {
        sheen.style.background = `radial-gradient(circle at 50% 50%, oklch(76% 0.08 85 / 0.12), transparent 70%)`;
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`hero-flacon-wrapper${className ? ` ${className}` : ""}`}
      style={{
        position: "relative",
        aspectRatio: "3/4",
        cursor: "default",
        ...style,
      }}
    >
      {/* Ambient pedestal halo — soft atmospheric backlight */}
      <div
        ref={sheenRef}
        aria-hidden="true"
        className="hero-flacon-halo"
        style={{
          position: "absolute",
          inset: "-15%",
          background:
            "radial-gradient(ellipse 66% 66% at 50% 50%, oklch(76% 0.08 85 / 0.14), transparent 72%)",
          filter: "blur(26px)",
          pointerEvents: "none",
          zIndex: 0,
          transition: "background 300ms ease-out",
        }}
      />

      {/* Physical Flacon Object with seamless vignette mask */}
      <div
        ref={cardRef}
        className="hero-flacon-card"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          zIndex: 1,
          willChange: "transform",
          transformStyle: "preserve-3d",
          WebkitMaskImage:
            "radial-gradient(ellipse 46% 62% at 50% 54%, black 42%, oklch(0% 0 0 / 0.55) 60%, transparent 82%)",
          maskImage:
            "radial-gradient(ellipse 46% 62% at 50% 54%, black 42%, oklch(0% 0 0 / 0.55) 60%, transparent 82%)",
        }}
      >
        <Image
          src={imageSrc}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 240px, (max-width: 1200px) 340px, 390px"
          style={{
            objectFit: "contain",
            filter: "drop-shadow(0 18px 36px oklch(0% 0 0 / 0.55))",
          }}
        />
      </div>

      {/* Ambient ground shadow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-6px",
          left: "16%",
          right: "16%",
          height: "16px",
          background:
            "radial-gradient(ellipse at 50% 50%, oklch(0% 0 0 / 0.6), transparent 70%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

