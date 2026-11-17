"use client";

import React, { useEffect, useRef } from "react";

interface HeroStageProps {
  children: React.ReactNode;
}

interface AmbientMote {
  x: number;
  y: number;
  baseXRatio: number;
  baseYRatio: number;
  driftPhaseX: number;
  driftPhaseY: number;
  driftSpeedX: number;
  driftSpeedY: number;
  driftAmpX: number;
  driftAmpY: number;
  vx: number;
  vy: number;
  radius: number;
  depth: number;
  phase: number;
  twinkleSpeed: number;
  orbitAngle: number;
  orbitRadius: number;
  orbitSpeed: number;
  baseAlpha: number;
  sparkle: boolean;
  rgb: readonly [number, number, number];
}

interface MistParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  life: number;
  decay: number;
  flutterPhase: number;
  flutterFreq: number;
  glint: boolean;
  rgb: readonly [number, number, number];
}

const KINPAKU_PALETTE: readonly (readonly [number, number, number])[] = [
  [235, 214, 168], // Pale champagne gold highlight
  [206, 174, 112], // KODŌ signature brass-amber gold
  [176, 132, 68], // Deep burnished resin amber
];

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

function createAmbientMotes(
  width: number,
  height: number,
  count: number
): AmbientMote[] {
  const motes: AmbientMote[] = [];
  for (let i = 0; i < count; i++) {
    // Bias ~65% into the concrete Ma portal zone (35%..92% width)
    const inPortalBand = i % 3 !== 0;
    const baseXRatio = inPortalBand
      ? 0.35 + Math.random() * 0.57
      : 0.06 + Math.random() * 0.88;
    const baseYRatio = inPortalBand
      ? 0.1 + Math.random() * 0.8
      : 0.08 + Math.random() * 0.84;

    const depth = 0.35 + Math.random() * 0.65;
    const rgb = KINPAKU_PALETTE[i % KINPAKU_PALETTE.length];

    motes.push({
      x: baseXRatio * width,
      y: baseYRatio * height,
      baseXRatio,
      baseYRatio,
      driftPhaseX: Math.random() * Math.PI * 2,
      driftPhaseY: Math.random() * Math.PI * 2,
      driftSpeedX: 0.00022 + Math.random() * 0.00026,
      driftSpeedY: 0.00018 + Math.random() * 0.00024,
      driftAmpX: 12 + Math.random() * 24,
      driftAmpY: 10 + Math.random() * 22,
      vx: 0,
      vy: 0,
      radius: 0.7 + depth * 1.55,
      depth,
      phase: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.0012 + Math.random() * 0.0018,
      orbitAngle: (i / count) * Math.PI * 2 + Math.random() * 0.5,
      orbitRadius: 28 + (i % 7) * 7.8,
      orbitSpeed: (i % 2 === 0 ? 1 : -1) * (0.00045 + (i % 5) * 0.00012),
      baseAlpha: 0.16 + depth * 0.32,
      sparkle: i % 5 === 0,
      rgb,
    });
  }
  return motes;
}

function drawMicroGlint(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  arm: number,
  alpha: number,
  rgb: readonly [number, number, number]
) {
  ctx.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha.toFixed(3)})`;
  ctx.lineWidth = 0.75;
  ctx.beginPath();
  ctx.moveTo(x - arm, y);
  ctx.lineTo(x + arm, y);
  ctx.moveTo(x, y - arm);
  ctx.lineTo(x, y + arm);
  ctx.stroke();
}

/**
 * KODŌ — HeroStage
 * Dual-physics chiaroscuro & Kinpaku gold particle canvas controller for the Hero:
 * 1. Ambient suspended incense & gold motes breathing within the Ma concrete portal.
 * 2. Fast cursor motion parts ambient motes with a subtle fluid wake & sheds falling gold mist droplets.
 * 3. Cursor stillness/dwell magnetizes nearby motes into a soft luminous Kintsugi orbit.
 */
export function HeroStage({ children }: HeroStageProps) {
  const stageRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch = window.matchMedia(
      "(hover: none) and (pointer: coarse)"
    ).matches;
    const stage = stageRef.current;
    const canvas = canvasRef.current;

    if (!stage) return;

    // Initial chiaroscuro lighting CSS tokens
    stage.style.setProperty("--hero-mx", "62.00%");
    stage.style.setProperty("--hero-my", "48.00%");
    stage.style.setProperty("--hero-active", "0.000");

    if (prefersReducedMotion || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const MAX_TRAIL_PARTICLES = 90;
    const REPULSION_RADIUS = 155;
    const MAGNET_RADIUS = 210;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let motes: AmbientMote[] = [];
    const trail: MistParticle[] = [];

    let rafId: number | null = null;
    let isVisible = true;
    let lastTime = performance.now();

    // Pointer & Chiaroscuro Lighting State
    let targetPctX = 62;
    let targetPctY = 48;
    let targetActive = 0;
    let currentPctX = 62;
    let currentPctY = 48;
    let currentActive = 0;

    let pointerInside = false;
    let pointerX = 0;
    let pointerY = 0;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let pointerVelX = 0;
    let pointerVelY = 0;
    let pointerSpeed = 0;
    let dwellFactor = 0;

    const syncLightingStyles = () => {
      stage.style.setProperty("--hero-mx", `${currentPctX.toFixed(2)}%`);
      stage.style.setProperty("--hero-my", `${currentPctY.toFixed(2)}%`);
      stage.style.setProperty("--hero-active", currentActive.toFixed(3));
    };

    const resizeCanvas = () => {
      const rect = stage.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const prevWidth = width;
      const prevHeight = height;
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (motes.length === 0) {
        const count = isTouch || width < 640 ? 30 : 68;
        motes = createAmbientMotes(width, height, count);
      } else if (prevWidth > 0 && prevHeight > 0) {
        const sx = width / prevWidth;
        const sy = height / prevHeight;
        for (let i = 0; i < motes.length; i++) {
          motes[i].x *= sx;
          motes[i].y *= sy;
        }
      }
    };

    const spawnMistDroplets = (
      x: number,
      y: number,
      vxMove: number,
      vyMove: number,
      speed: number
    ) => {
      const count = speed > 18 ? 3 : speed > 7 ? 2 : 1;
      for (let i = 0; i < count; i++) {
        if (trail.length >= MAX_TRAIL_PARTICLES) {
          trail.shift();
        }
        const rgb = KINPAKU_PALETTE[Math.floor(Math.random() * 2)]; // favor light champagne & brass gold
        trail.push({
          x: x + (Math.random() - 0.5) * 14,
          y: y + (Math.random() - 0.5) * 10,
          vx: clamp(vxMove * 0.14, -1.6, 1.6) + (Math.random() - 0.5) * 0.85,
          vy: clamp(vyMove * 0.1, -1.0, 0.8) + 0.08 + Math.random() * 0.38,
          radius: 0.85 + Math.random() * 1.45,
          life: 1,
          decay: 0.011 + Math.random() * 0.006, // ~1.0s - 1.5s at 60fps
          flutterPhase: Math.random() * Math.PI * 2,
          flutterFreq: 0.045 + Math.random() * 0.04,
          glint: Math.random() < 0.32,
          rgb,
        });
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (isTouch) return;
      if (e.pointerType && e.pointerType !== "mouse" && e.pointerType !== "pen") {
        return;
      }

      const rect = stage.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (!pointerInside) {
        prevPointerX = x;
        prevPointerY = y;
      }

      const dx = x - prevPointerX;
      const dy = y - prevPointerY;
      const stepSpeed = Math.hypot(dx, dy);

      pointerX = x;
      pointerY = y;
      prevPointerX = x;
      prevPointerY = y;
      pointerVelX = dx;
      pointerVelY = dy;
      pointerSpeed = clamp(pointerSpeed * 0.45 + stepSpeed * 0.55, 0, 48);
      pointerInside = true;

      if (stepSpeed > 3.5) {
        dwellFactor *= 0.85;
      }

      if (pointerSpeed > 1.4) {
        spawnMistDroplets(x, y, dx, dy, pointerSpeed);
      }

      targetPctX = clamp((x / rect.width) * 100, 0, 100);
      targetPctY = clamp((y / rect.height) * 100, 0, 100);
      targetActive = 1;
    };

    const handlePointerLeave = () => {
      pointerInside = false;
      targetActive = 0;
    };

    const handleVisibilityChange = () => {
      if (!document.hidden && isVisible && rafId === null) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(tick);
      }
    };

    const tick = (now: number) => {
      rafId = null;
      if (!isVisible || document.hidden) return;

      const elapsedMs = Math.max(1, now - lastTime);
      lastTime = now;
      const dtScale = Math.min(elapsedMs / 16.667, 2.5);

      // 1. Chiaroscuro pointer lighting Lerp
      const posFactor = 1 - Math.pow(1 - 0.085, dtScale);
      const fadeBase = targetActive > currentActive ? 0.12 : 0.055;
      const fadeFactor = 1 - Math.pow(1 - fadeBase, dtScale);
      currentPctX += (targetPctX - currentPctX) * posFactor;
      currentPctY += (targetPctY - currentPctY) * posFactor;
      currentActive += (targetActive - currentActive) * fadeFactor;
      syncLightingStyles();

      if (width > 0 && height > 0) {
        ctx.clearRect(0, 0, width, height);

        // 2. Update cursor motion decay & dwell stillness state
        pointerSpeed *= Math.pow(0.84, dtScale);
        if (pointerInside && pointerSpeed < 1.8) {
          dwellFactor += (1 - dwellFactor) * (1 - Math.pow(1 - 0.04, dtScale));
        } else {
          dwellFactor *= Math.pow(0.86, dtScale);
        }

        // 3. Ambient Motes — Drift + Fluid Repulsion/Wake OR Magnetic Orbit
        const damping = Math.pow(0.945, dtScale);

        for (let i = 0; i < motes.length; i++) {
          const m = motes[i];
          const homeX =
            m.baseXRatio * width +
            Math.sin(now * m.driftSpeedX + m.driftPhaseX) * m.driftAmpX;
          const homeY =
            m.baseYRatio * height +
            Math.cos(now * m.driftSpeedY + m.driftPhaseY) * m.driftAmpY;

          let magnetProximity = 0;

          if (!isTouch && pointerInside) {
            const dx = m.x - pointerX;
            const dy = m.y - pointerY;
            const dist = Math.hypot(dx, dy) || 0.001;

            // Mode A: Fast cursor motion parts motes cleanly with gentle wake curl
            if (pointerSpeed >= 1.5 && dist < REPULSION_RADIUS) {
              const falloff = 1 - dist / REPULSION_RADIUS;
              const nx = dx / dist;
              const ny = dy / dist;
              const repulseForce =
                falloff *
                falloff *
                clamp(pointerSpeed * 0.085, 0.25, 2.2) *
                m.depth *
                dtScale;

              // Subtle perpendicular smoke curl aligned gently with cursor velocity
              const crossSign =
                pointerVelX * ny - pointerVelY * nx >= 0 ? 1 : -1;
              const curlForce = repulseForce * 0.38 * crossSign;

              m.vx += nx * repulseForce - ny * curlForce;
              m.vy += ny * repulseForce + nx * curlForce;
            }

            // Mode B: Stillness / dwell magnetizes nearby motes into Kintsugi orbit
            if (dwellFactor > 0.15 && dist < MAGNET_RADIUS) {
              const falloff = 1 - dist / MAGNET_RADIUS;
              magnetProximity = falloff * dwellFactor;

              const dynamicAngle = m.orbitAngle + now * m.orbitSpeed;
              const targetOrbitX = pointerX + Math.cos(dynamicAngle) * m.orbitRadius;
              const targetOrbitY = pointerY + Math.sin(dynamicAngle) * m.orbitRadius;

              const springStrength =
                (0.018 + 0.024 * m.depth) * dwellFactor * (0.45 + 0.55 * falloff) * dtScale;
              m.vx += (targetOrbitX - m.x) * springStrength;
              m.vy += (targetOrbitY - m.y) * springStrength;
            }
          }

          // Home equilibrium spring (yields gracefully while trapped in magnetic orbit)
          const homeSpring = 0.0065 * (1 - 0.85 * magnetProximity) * dtScale;
          m.vx += (homeX - m.x) * homeSpring;
          m.vy += (homeY - m.y) * homeSpring;

          m.vx *= damping;
          m.vy *= damping;
          m.x += m.vx * dtScale;
          m.y += m.vy * dtScale;

          // Subtle luminescence pulse boosted cleanly when magnetized near cursor
          const twinkle =
            0.74 + 0.26 * Math.sin(now * m.twinkleSpeed + m.phase);
          const alpha = clamp(
            m.baseAlpha * twinkle + magnetProximity * 0.42,
            0.05,
            0.88
          );

          // Soft ambient halo glow
          const glowRadius = m.radius * (2.6 + magnetProximity * 1.4);
          ctx.fillStyle = `rgba(${m.rgb[0]}, ${m.rgb[1]}, ${m.rgb[2]}, ${(
            alpha * (0.14 + magnetProximity * 0.16)
          ).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(m.x, m.y, glowRadius, 0, Math.PI * 2);
          ctx.fill();

          // Crisp gold core
          ctx.fillStyle = `rgba(${m.rgb[0]}, ${m.rgb[1]}, ${m.rgb[2]}, ${alpha.toFixed(
            3
          )})`;
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
          ctx.fill();

          // Delicate 4-point calligraphic micro-glint on highlighted motes
          if ((m.sparkle || magnetProximity > 0.45) && twinkle > 0.85) {
            drawMicroGlint(
              ctx,
              m.x,
              m.y,
              m.radius * (2.5 + magnetProximity * 1.6),
              alpha * 0.55,
              m.rgb
            );
          }
        }

        // 4. Falling Atomized Gold Mist Trail (spawned by pointer velocity)
        const dragX = Math.pow(0.975, dtScale);
        const dragY = Math.pow(0.982, dtScale);

        for (let i = trail.length - 1; i >= 0; i--) {
          const p = trail[i];
          p.vy += 0.032 * dtScale;
          p.vx *= dragX;
          p.vy *= dragY;

          const flutter =
            Math.sin(now * 0.005 * (1 + p.flutterFreq * 10) + p.flutterPhase) *
            0.22 *
            dtScale;
          p.x += p.vx * dtScale + flutter;
          p.y += p.vy * dtScale;
          p.life -= p.decay * dtScale;

          if (p.life <= 0 || p.y > height + 24) {
            trail.splice(i, 1);
            continue;
          }

          // Smooth bell fade-out curve
          const easeLife = p.life * p.life * (3 - 2 * p.life);
          const alpha = clamp(easeLife * 0.72, 0, 0.72);
          const drawRadius = p.radius * (0.6 + 0.4 * p.life);

          ctx.fillStyle = `rgba(${p.rgb[0]}, ${p.rgb[1]}, ${p.rgb[2]}, ${(
            alpha * 0.24
          ).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, drawRadius * 2.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(${p.rgb[0]}, ${p.rgb[1]}, ${p.rgb[2]}, ${alpha.toFixed(
            3
          )})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, drawRadius, 0, Math.PI * 2);
          ctx.fill();

          if (p.glint && p.life > 0.35) {
            drawMicroGlint(
              ctx,
              p.x,
              p.y,
              drawRadius * 3.1,
              alpha * 0.65,
              p.rgb
            );
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    resizeCanvas();

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(stage);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        isVisible = entry.isIntersecting;
        if (isVisible && !document.hidden && rafId === null) {
          lastTime = performance.now();
          rafId = requestAnimationFrame(tick);
        } else if (!isVisible && rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
      { threshold: 0.02 }
    );
    intersectionObserver.observe(stage);

    if (!isTouch) {
      stage.addEventListener("pointermove", handlePointerMove, { passive: true });
      stage.addEventListener("pointerleave", handlePointerLeave);
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);

    rafId = requestAnimationFrame(tick);

    return () => {
      if (!isTouch) {
        stage.removeEventListener("pointermove", handlePointerMove);
        stage.removeEventListener("pointerleave", handlePointerLeave);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
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
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="hero-kinpaku-canvas"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
    </section>
  );
}
