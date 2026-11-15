"use client";

import { useSyncExternalStore } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getSnapshot(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * React 19 hydration-safe hook honoring the user's `prefers-reduced-motion`
 * OS/browser setting without calling setState synchronously inside useEffect.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
