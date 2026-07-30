"use client";

import { useState, useEffect, useCallback } from "react";
import type { PerformanceTier } from "@/types/webgl";

/* ═══════════════════════════════════════════════════════════
   KODŌ — Performance Tiering Hook
   Evaluates the client's hardware capability at load time.
   Determines WebGL quality, particle counts, and
   post-processing resolution.
   ═══════════════════════════════════════════════════════════ */

interface PerformanceProfile {
  tier: PerformanceTier;
  maxDrawCalls: number;
  textureResolution: 1024 | 512;
  postProcessingEnabled: boolean;
  webglAvailable: boolean;
}

const TIER_PROFILES: Record<PerformanceTier, Omit<PerformanceProfile, "webglAvailable">> = {
  high: {
    tier: "high",
    maxDrawCalls: 850,
    textureResolution: 1024,
    postProcessingEnabled: true,
  },
  medium: {
    tier: "medium",
    maxDrawCalls: 320,
    textureResolution: 512,
    postProcessingEnabled: true,
  },
  low: {
    tier: "low",
    maxDrawCalls: 0,
    textureResolution: 512,
    postProcessingEnabled: false,
  },
};

export function usePerformance(): PerformanceProfile {
  const [profile, setProfile] = useState<PerformanceProfile>({
    ...TIER_PROFILES.medium,
    webglAvailable: false,
  });

  const evaluate = useCallback(() => {
    if (typeof window === "undefined") return;

    // 1. Check for reduced motion settings
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      setProfile({ ...TIER_PROFILES.low, webglAvailable: false });
      return;
    }

    // 2. Perform WebGL Context Check
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) {
      setProfile({ ...TIER_PROFILES.low, webglAvailable: false });
      return;
    }

    // 3. Query Device Memory API (If available)
    const deviceMemory =
      (navigator as unknown as Record<string, unknown>).deviceMemory as number || 4;
    const cpuCores = navigator.hardwareConcurrency || 4;

    // 4. Check for low-end graphics chipsets
    let isMobileGPU = false;
    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    if (debugInfo) {
      const renderer = gl.getParameter(
        debugInfo.UNMASKED_RENDERER_WEBGL
      ) as string;
      isMobileGPU = /adreno|mali|powervr|apple gpu/i.test(renderer);
    }

    // Determine tier
    let tier: PerformanceTier = "high";
    if (isMobileGPU || deviceMemory < 4 || cpuCores < 4) {
      tier = "medium";
    }

    setProfile({ ...TIER_PROFILES[tier], webglAvailable: true });

    // Clean up test canvas
    canvas.remove();
  }, []);

  useEffect(() => {
    evaluate();
  }, [evaluate]);

  return profile;
}
