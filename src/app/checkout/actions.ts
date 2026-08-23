"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { COMMERCE_CONFIG } from "@/config/commerce";
import { checkoutFormSchema } from "@/lib/checkout-schema";
import { OrderRepository } from "@/lib/order-repository";
import type { OrderRecord, OrderLineItem } from "@/types/webgl";

/* ═══════════════════════════════════════════════════════════
   KODŌ — Checkout Server Action
   Handles form validation, server-side price resolution,
   strict server-side idempotency enforcement, and
   mode-branched order creation.
   ═══════════════════════════════════════════════════════════ */

// ─── Types ────────────────────────────────────────────────

interface CheckoutResult {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
  redirectUrl?: string;
}

// ─── Helpers ──────────────────────────────────────────────

function generateOrderId(): string {
  const now = new Date();
  const dateStr = now
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, "");
  const suffix = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `KODO-DEMO-${dateStr}-${suffix}`;
}

function generateToken(): string {
  return crypto.randomUUID();
}

// ─── Server Action ────────────────────────────────────────

export async function submitCheckout(
  rawData: unknown
): Promise<CheckoutResult> {
  // 1. Validate input
  const parsed = checkoutFormSchema.safeParse(rawData);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path.join(".");
      if (!fieldErrors[path]) fieldErrors[path] = [];
      fieldErrors[path].push(issue.message);
    }
    return {
      success: false,
      error: "Please correct the highlighted fields.",
      fieldErrors,
    };
  }

  const data = parsed.data;

  // 2. Server-side price resolution — zero client price authority
  const lineItems: OrderLineItem[] = [];
  let subtotalCents = 0;

  for (const cartItem of data.cartItems) {
    const product = PRODUCTS.find((p) => p.id === cartItem.productId);
    if (!product) {
      return {
        success: false,
        error: `Product "${cartItem.productId}" not found.`,
      };
    }

    const sizeEntry = product.sizes.find(
      (s) => s.variant === cartItem.variant
    );
    if (!sizeEntry) {
      return {
        success: false,
        error: `Variant "${cartItem.variant}" not available for ${product.name}.`,
      };
    }

    if (!sizeEntry.inStock) {
      return {
        success: false,
        error: `${product.name} (${cartItem.variant}) is currently out of stock.`,
      };
    }

    const unitPriceCents = Math.round(sizeEntry.price * 100);
    const lineTotalCents = unitPriceCents * cartItem.quantity;
    subtotalCents += lineTotalCents;

    lineItems.push({
      productId: product.id,
      productName: product.name,
      variant: cartItem.variant,
      quantity: cartItem.quantity,
      unitPriceCents,
      lineTotalCents,
    });
  }

  // 3. Financial calculation
  const shippingCents = COMMERCE_CONFIG.shipping.defaultRateCents;
  const taxCents = 0; // Tax calculation deferred to Live Mode configuration
  const totalCents = subtotalCents + shippingCents + taxCents;

  // 4. Mode-branched order creation
  if (COMMERCE_CONFIG.mode === "demo") {
    return await handleDemoCheckout(data, lineItems, {
      subtotalCents,
      shippingCents,
      taxCents,
      totalCents,
    });
  }

  // Live mode
  return handleLiveCheckout();
}

// ─── Demo Mode Handler ────────────────────────────────────

async function handleDemoCheckout(
  data: {
    customer: { name: string; email: string; phone?: string };
    shipping: {
      addressLine1: string;
      addressLine2?: string;
      city: string;
      stateOrRegion?: string;
      postalCode: string;
      country: string;
    };
    idempotencyKey: string;
  },
  lineItems: OrderLineItem[],
  financials: {
    subtotalCents: number;
    shippingCents: number;
    taxCents: number;
    totalCents: number;
  }
): Promise<CheckoutResult> {
  // 1. Server-Side Idempotency Check:
  // If an order already exists for this idempotency key, reuse the existing order
  // and redirect without creating duplicates.
  const existing = await OrderRepository.getDemoOrderByIdempotencyKey(
    data.idempotencyKey
  );

  if (existing) {
    const cookieStore = await cookies();
    cookieStore.set("kodo_demo_token", existing.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 86400, // 24 hours
    });
    redirect(
      `/checkout/success?order_id=${encodeURIComponent(existing.order.id)}`
    );
  }

  // 2. Fresh Order Creation
  const orderId = generateOrderId();
  const token = generateToken();
  const now = new Date().toISOString();

  const order: OrderRecord = {
    id: orderId,
    idempotencyKey: data.idempotencyKey,
    mode: "demo",
    stripeSessionId: null,
    stripePaymentIntentId: null,
    customer: {
      name: data.customer.name,
      email: data.customer.email,
      phone: data.customer.phone || null,
    },
    shipping: {
      addressLine1: data.shipping.addressLine1,
      addressLine2: data.shipping.addressLine2 || null,
      city: data.shipping.city,
      stateOrRegion: data.shipping.stateOrRegion || null,
      postalCode: data.shipping.postalCode,
      country: data.shipping.country,
    },
    lineItems,
    financials: {
      currency: COMMERCE_CONFIG.currency.code,
      ...financials,
    },
    status: "paid", // Demo orders are immediately marked "paid"
    createdAt: now,
    paidAt: now,
  };

  // Persist the complete OrderRecord server-side (stored in Upstash Redis or In-Memory)
  await OrderRepository.saveDemoOrder(token, order);

  // Set minimal opaque cookie (ZERO PII, token only)
  const cookieStore = await cookies();
  cookieStore.set("kodo_demo_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 86400, // 24 hours — matches Redis TTL
  });

  // Redirect to success page
  redirect(`/checkout/success?order_id=${encodeURIComponent(orderId)}`);
}

// ─── Live Mode Handler (Stubbed) ──────────────────────────

function handleLiveCheckout(): CheckoutResult {
  // Live Mode requires STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, POSTGRES_URL.
  // This handler will be activated when COMMERCE_MODE=live.
  return {
    success: false,
    error:
      "Live commerce is not yet configured. Please contact the atelier administrator.",
  };
}
