"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Returns false during SSR and initial client hydration render, then true
 * once hydrated on the client. Prevents React hydration mismatches when
 * reading persisted browser state (e.g. Zustand localStorage stores).
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
