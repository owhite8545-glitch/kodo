/**
 * Central Commerce Configuration
 *
 * Customize currency formatting, shipping regions, complimentary courier
 * thresholds, and Demo vs Live Stripe checkout behavior from this single file.
 */

export type CommerceMode = "demo" | "live";

export interface ShippingRegion {
  readonly code: string;
  readonly name: string;
}

export interface LineFinancialInput {
  readonly unitPriceCents: number;
  readonly quantity: number;
}

export interface CalculatedFinancials {
  readonly currency: string;
  readonly subtotalCents: number;
  readonly shippingCents: number;
  readonly taxCents: number;
  readonly totalCents: number;
  readonly qualifiesFreeShipping: boolean;
  readonly amountToFreeShippingCents: number;
}

export const SHIPPING_REGIONS: readonly ShippingRegion[] = [
  { code: "US", name: "United States" },
  { code: "JP", name: "Japan" },
  { code: "GB", name: "United Kingdom" },
  { code: "FR", name: "France" },
  { code: "DE", name: "Germany" },
  { code: "CH", name: "Switzerland" },
  { code: "CA", name: "Canada" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "SG", name: "Singapore" },
  { code: "AU", name: "Australia" },
] as const;

export const COMMERCE_CONFIG = {
  currency: {
    code: "USD",
    symbol: "$",
    locale: "en-US",
  },
  shipping: {
    methodLabel: "Atelier Express Courier",
    complimentaryLabel: "Complimentary Atelier Courier",
    freeThresholdCents: 22000, // Complimentary above $220
    standardRateCents: 1800, // $18 below threshold
    estimatedTransit: "2–4 business days (temperature-controlled transit)",
  },
  supportedRegions: SHIPPING_REGIONS,
  demoNotice:
    "Atelier Preview Mode — Orders generate an instant verified digital receipt with no payment card charged.",
  liveNotice:
    "Encrypted checkout powered by Stripe. Orders are fulfilled in small numbered batches.",
} as const;

/**
 * Determines whether checkout operates in Demo Simulation mode or Live Stripe mode.
 * Safely defaults to "demo" unless COMMERCE_MODE="live" and a Stripe secret key exist.
 */
export function resolveCommerceMode(): CommerceMode {
  return process.env.COMMERCE_MODE === "live" &&
    Boolean(process.env.STRIPE_SECRET_KEY?.trim())
    ? "live"
    : "demo";
}

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY?.trim());
}

/**
 * Formats integer cents using the configured store currency (e.g. "$240.00").
 */
export function formatCents(
  cents: number,
  options?: { readonly minimumFractionDigits?: number }
): string {
  const value = cents / 100;
  return new Intl.NumberFormat(COMMERCE_CONFIG.currency.locale, {
    style: "currency",
    currency: COMMERCE_CONFIG.currency.code,
    minimumFractionDigits: options?.minimumFractionDigits ?? 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Formats whole-dollar catalog prices consistently with currency symbol (e.g. "$240").
 */
export function formatCatalogPrice(dollars: number): string {
  return formatCents(Math.round(dollars * 100), {
    minimumFractionDigits: Number.isInteger(dollars) ? 0 : 2,
  });
}

/**
 * Computes deterministic cart/order totals shared across CartDrawer,
 * CheckoutClient, and Server Action verification.
 */
export function calculateOrderFinancials(
  items: readonly LineFinancialInput[]
): CalculatedFinancials {
  const subtotalCents = items.reduce(
    (sum, item) => sum + item.unitPriceCents * item.quantity,
    0
  );
  const threshold = COMMERCE_CONFIG.shipping.freeThresholdCents;
  const qualifiesFreeShipping = subtotalCents <= 0 || subtotalCents >= threshold;
  const shippingCents = qualifiesFreeShipping
    ? 0
    : COMMERCE_CONFIG.shipping.standardRateCents;
  const taxCents = 0; // VAT/duties calculated by region or Stripe Tax when enabled
  const totalCents = subtotalCents + shippingCents + taxCents;

  return {
    currency: COMMERCE_CONFIG.currency.code,
    subtotalCents,
    shippingCents,
    taxCents,
    totalCents,
    qualifiesFreeShipping,
    amountToFreeShippingCents: Math.max(0, threshold - subtotalCents),
  };
}
