"use server";

import { cookies } from "next/headers";
import crypto from "node:crypto";
import Stripe from "stripe";
import { checkoutFormSchema } from "@/lib/checkout-schema";
import { getAllProducts } from "@/data/products";
import { OrderRepository } from "@/lib/order-repository";
import {
  calculateOrderFinancials,
  COMMERCE_CONFIG,
  resolveCommerceMode,
} from "@/config/commerce";
import { resolveBaseUrl } from "@/config/site";
import { signDemoReceipt } from "@/lib/demo-receipt";
import type { OrderLineItem, OrderRecord } from "@/types/webgl";

export interface CheckoutActionResult {
  success: boolean;
  error?: string;
  redirectUrl?: string;
  fieldErrors?: Record<string, string>;
}

const DEMO_TOKEN_COOKIE = "kodo_demo_token";
const DEMO_RECEIPT_COOKIE = "kodo_demo_receipt";

function generateOrderId(prefix = "KDO-ORD"): string {
  const random = crypto.randomBytes(6).toString("hex").toUpperCase();
  return `${prefix}-${random}`;
}

export async function submitCheckout(
  formData: unknown
): Promise<CheckoutActionResult> {
  const parsed = checkoutFormSchema.safeParse(formData);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path.join(".");
      if (path && !fieldErrors[path]) {
        fieldErrors[path] = issue.message;
      }
    }
    return {
      success: false,
      error: "Please review the highlighted fields below.",
      fieldErrors,
    };
  }

  const { customer, shipping, cartItems, idempotencyKey } = parsed.data;
  const products = getAllProducts();
  const productMap = new Map(products.map((p) => [p.id, p]));

  const verifiedLineItems: OrderLineItem[] = [];

  for (const item of cartItems) {
    const product = productMap.get(item.productId);
    if (!product || !product.inStock) {
      return {
        success: false,
        error: `Product "${item.productId}" is currently unavailable.`,
      };
    }

    const variantMatch = product.sizes.find(
      (s) => s.variant === item.variant && s.inStock
    );
    if (!variantMatch) {
      return {
        success: false,
        error: `${product.name} (${item.variant}) is currently out of stock.`,
      };
    }

    const unitPriceCents = Math.round(variantMatch.price * 100);
    verifiedLineItems.push({
      productId: product.id,
      productName: product.name,
      variant: item.variant,
      quantity: item.quantity,
      unitPriceCents,
      lineTotalCents: unitPriceCents * item.quantity,
    });
  }

  const calculated = calculateOrderFinancials(verifiedLineItems);
  const financials = {
    currency: calculated.currency,
    subtotalCents: calculated.subtotalCents,
    shippingCents: calculated.shippingCents,
    taxCents: calculated.taxCents,
    totalCents: calculated.totalCents,
  };

  const mode = resolveCommerceMode();

  if (mode === "live") {
    return handleLiveCheckout({
      customer,
      shipping,
      lineItems: verifiedLineItems,
      financials,
      idempotencyKey,
    });
  }

  return handleDemoCheckout({
    customer,
    shipping,
    lineItems: verifiedLineItems,
    financials,
    idempotencyKey,
  });
}

async function handleDemoCheckout(params: {
  customer: { name: string; email: string; phone?: string };
  shipping: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    stateOrRegion?: string;
    postalCode: string;
    country: string;
  };
  lineItems: OrderLineItem[];
  financials: OrderRecord["financials"];
  idempotencyKey: string;
}): Promise<CheckoutActionResult> {
  const { customer, shipping, lineItems, financials, idempotencyKey } = params;
  const cookieStore = await cookies();

  const existing = await OrderRepository.findByIdempotencyKey(idempotencyKey);
  if (existing) {
    await issueDemoReceiptCookies(cookieStore, existing, idempotencyKey);
    return {
      success: true,
      redirectUrl: `/checkout/success?order_id=${encodeURIComponent(existing.id)}`,
    };
  }

  const orderId = generateOrderId("KDO-DEMO");
  const now = new Date().toISOString();

  const order: OrderRecord = {
    id: orderId,
    idempotencyKey,
    mode: "demo",
    stripeSessionId: null,
    stripePaymentIntentId: null,
    customer: {
      name: customer.name,
      email: customer.email,
      phone: customer.phone ?? "",
    },
    shipping: {
      addressLine1: shipping.addressLine1,
      addressLine2: shipping.addressLine2 ?? "",
      city: shipping.city,
      stateOrRegion: shipping.stateOrRegion ?? "",
      postalCode: shipping.postalCode,
      country: shipping.country,
    },
    lineItems,
    financials,
    status: "paid",
    createdAt: now,
    paidAt: now,
  };

  await OrderRepository.create(order);
  await issueDemoReceiptCookies(cookieStore, order, idempotencyKey);

  return {
    success: true,
    redirectUrl: `/checkout/success?order_id=${encodeURIComponent(orderId)}`,
  };
}

async function issueDemoReceiptCookies(
  cookieStore: Awaited<ReturnType<typeof cookies>>,
  order: OrderRecord,
  idempotencyKey: string
): Promise<void> {
  const isProd = process.env.NODE_ENV === "production";
  const tokenPayload = crypto
    .createHash("sha256")
    .update(`${order.id}:${idempotencyKey}`)
    .digest("hex");

  cookieStore.set(DEMO_TOKEN_COOKIE, tokenPayload, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 3600,
    secure: isProd,
  });

  cookieStore.set(DEMO_RECEIPT_COOKIE, signDemoReceipt(order), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 3600,
    secure: isProd,
  });
}

async function handleLiveCheckout(params: {
  customer: { name: string; email: string; phone?: string };
  shipping: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    stateOrRegion?: string;
    postalCode: string;
    country: string;
  };
  lineItems: OrderLineItem[];
  financials: OrderRecord["financials"];
  idempotencyKey: string;
}): Promise<CheckoutActionResult> {
  const secretKey = process.env.STRIPE_SECRET_KEY?.trim();
  if (!secretKey) {
    return {
      success: false,
      error:
        "Stripe secret key is missing. Configure STRIPE_SECRET_KEY or switch COMMERCE_MODE to demo.",
    };
  }

  const baseUrl = resolveBaseUrl();
  const orderId = generateOrderId("KDO-LIVE");
  const now = new Date().toISOString();

  const order: OrderRecord = {
    id: orderId,
    idempotencyKey: params.idempotencyKey,
    mode: "live",
    stripeSessionId: null,
    stripePaymentIntentId: null,
    customer: {
      name: params.customer.name,
      email: params.customer.email,
      phone: params.customer.phone ?? "",
    },
    shipping: {
      addressLine1: params.shipping.addressLine1,
      addressLine2: params.shipping.addressLine2 ?? "",
      city: params.shipping.city,
      stateOrRegion: params.shipping.stateOrRegion ?? "",
      postalCode: params.shipping.postalCode,
      country: params.shipping.country,
    },
    lineItems: params.lineItems,
    financials: params.financials,
    status: "pending",
    createdAt: now,
    paidAt: null,
  };

  await OrderRepository.create(order);

  try {
    const stripe = new Stripe(secretKey, {
      apiVersion: "2026-07-29.dahlia",
    });

    const stripeLineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      params.lineItems.map((item) => ({
        price_data: {
          currency: COMMERCE_CONFIG.currency.code.toLowerCase(),
          product_data: {
            name: `KODŌ ${item.productName} (${item.variant})`,
            description: "Extrait de Parfum — Architectural Borosilicate Flacon",
          },
          unit_amount: item.unitPriceCents,
        },
        quantity: item.quantity,
      }));

    if (params.financials.shippingCents > 0) {
      stripeLineItems.push({
        price_data: {
          currency: COMMERCE_CONFIG.currency.code.toLowerCase(),
          product_data: {
            name: COMMERCE_CONFIG.shipping.methodLabel,
            description: COMMERCE_CONFIG.shipping.estimatedTransit,
          },
          unit_amount: params.financials.shippingCents,
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create(
      {
        mode: "payment",
        customer_email: params.customer.email,
        client_reference_id: orderId,
        line_items: stripeLineItems,
        metadata: {
          orderId,
          idempotencyKey: params.idempotencyKey,
          customerName: params.customer.name,
          shippingCountry: params.shipping.country,
          shippingCity: params.shipping.city,
          shippingPostalCode: params.shipping.postalCode,
          shippingAddress: params.shipping.addressLine1,
        },
        success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/checkout?canceled=1`,
      },
      {
        idempotencyKey: params.idempotencyKey,
      }
    );

    await OrderRepository.updateStatus(orderId, "pending", {
      stripeSessionId: session.id,
    });

    if (!session.url) {
      return {
        success: false,
        error: "Unable to initialize Stripe Checkout URL.",
      };
    }

    return {
      success: true,
      redirectUrl: session.url,
    };
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Unable to initialize Stripe Checkout session.";
    console.error("[Checkout] Live Stripe initialization failed:", message);
    await OrderRepository.updateStatus(orderId, "cancelled");
    return {
      success: false,
      error:
        "Payment initialization could not complete. Please verify your details and try again.",
    };
  }
}
