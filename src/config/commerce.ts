/* ═══════════════════════════════════════════════════════════
   KODŌ — Commerce Configuration Matrix

   Central configuration for the Dual-Mode Commerce Engine.

   NOTE: Demo Mode uses explicit non-commercial placeholder
   values. Real currency, trade zones, delivery rules, and
   contact information must be configured by the merchant
   prior to live commercial operation.
   ═══════════════════════════════════════════════════════════ */

// ─── Placeholder Regions (Non-Commercial) ─────────────────

export const DEMO_PLACEHOLDER_REGIONS = [
  { code: "DEMO-REGION-1", name: "Demo Region Alpha [Placeholder]" },
  { code: "DEMO-REGION-2", name: "Demo Region Beta [Placeholder]" },
  { code: "DEMO-REGION-3", name: "Demo Region Gamma [Placeholder]" },
  { code: "DEMO-REGION-4", name: "Demo Region Delta [Placeholder]" },
] as const;

export type DemoRegionCode = (typeof DEMO_PLACEHOLDER_REGIONS)[number]["code"];

// ─── Mode Resolution ──────────────────────────────────────

/**
 * Strictly deterministic mode resolution.
 * Only "live" if COMMERCE_MODE === "live".
 * Credentials NEVER implicitly change the mode.
 */
export type CommerceMode = "demo" | "live";

function resolveMode(): CommerceMode {
  return process.env.COMMERCE_MODE === "live" ? "live" : "demo";
}

// ─── Configuration Object ─────────────────────────────────

export const COMMERCE_CONFIG = {
  mode: resolveMode(),

  /** Demo display currency placeholder (Zero assumed commercial currency) */
  currency: {
    code: "DEMO_UNIT",
    symbol: "¤", // Standard generic international currency symbol
    decimals: 2,
    isConfigured: false,
    label: "Demo Currency Unit [Config Required]",
  },

  /** Demo shipping placeholder (Zero assumed commercial policy) */
  shipping: {
    defaultRateCents: 0,
    policyLabel: "Demonstration Delivery [Config Required]",
    estimatedDays: null as number | null,
    isConfigured: false,
  },

  /** Demo placeholder regions */
  supportedRegions: DEMO_PLACEHOLDER_REGIONS,

  /** Demo contact placeholder (Zero assumed email/identity) */
  supportContact: {
    isConfigured: false,
    label: "Atelier Concierge [Demo Placeholder]",
    email: null as string | null,
  },

  /** Quantity limits per line item */
  quantityLimits: {
    min: 1,
    max: 10,
  },
} as const;

// ─── Helper Utilities ─────────────────────────────────────

export function isLiveMode(): boolean {
  return COMMERCE_CONFIG.mode === "live";
}

export function isDemoMode(): boolean {
  return COMMERCE_CONFIG.mode !== "live";
}

/**
 * Format a cent value for display using the configured currency symbol.
 * Uses integer cent arithmetic to avoid floating-point precision issues.
 */
export function formatPrice(cents: number): string {
  const { symbol, decimals } = COMMERCE_CONFIG.currency;
  const value = (cents / 100).toFixed(decimals);
  return `${symbol}${value}`;
}
