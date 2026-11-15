import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import crypto from "node:crypto";
import Stripe from "stripe";
import { OrderRepository } from "@/lib/order-repository";
import { formatCents } from "@/config/commerce";
import { SITE_CONFIG } from "@/config/site";
import { verifyDemoReceipt } from "@/lib/demo-receipt";
import type { OrderRecord } from "@/types/webgl";
import { SuccessClient } from "./SuccessClient";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Your KODŌ order receipt and atelier fulfillment summary.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

function renderUnavailableReceipt(title: string, subtitle: string) {
  return (
    <main
      id="main-content"
      role="main"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--ref-space-12) var(--sys-space-page-margin)",
        textAlign: "center",
        gap: "var(--ref-space-4)",
      }}
    >
      <p className="text-label">KODŌ Patron Receipt</p>
      <h1
        style={{
          fontFamily: "var(--font-editorial-display), Georgia, serif",
          fontSize: "var(--ref-font-size-heading)",
          color: "var(--sys-color-text-primary)",
        }}
      >
        {title}
      </h1>
      <p
        className="text-body"
        style={{
          color: "var(--sys-color-text-secondary)",
          maxWidth: "42ch",
        }}
      >
        {subtitle}
      </p>
      <div style={{ display: "flex", gap: "var(--ref-space-3)", marginTop: "var(--ref-space-2)" }}>
        <Link href="/collections" className="kodo-btn-solid kodo-focus-ring">
          Return to Collection
        </Link>
        <Link href="/concierge" className="kodo-btn-outline kodo-focus-ring">
          Contact Concierge
        </Link>
      </div>
    </main>
  );
}

async function resolveDemoOrder(orderId: string): Promise<OrderRecord | null> {
  const cookieStore = await cookies();
  const receiptCookie = cookieStore.get("kodo_demo_receipt")?.value;
  const verifiedCookieOrder = verifyDemoReceipt(receiptCookie, orderId);

  const repoOrder = await OrderRepository.findById(orderId);
  const demoToken = cookieStore.get("kodo_demo_token")?.value;

  if (repoOrder) {
    const expectedToken = crypto
      .createHash("sha256")
      .update(`${repoOrder.id}:${repoOrder.idempotencyKey}`)
      .digest("hex");

    if (demoToken === expectedToken) {
      return repoOrder;
    }
  }

  return verifiedCookieOrder;
}

async function resolveLiveStripeOrder(
  sessionId: string
): Promise<OrderRecord | null> {
  const stripeKey = process.env.STRIPE_SECRET_KEY?.trim();
  if (!stripeKey) return null;

  try {
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2026-07-29.dahlia",
    });

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    if (session.payment_status !== "paid") {
      return null;
    }

    const orderId =
      session.metadata?.orderId ||
      session.client_reference_id ||
      `KDO-STR-${session.id.slice(-8).toUpperCase()}`;

    const repoOrder = await OrderRepository.findById(orderId);
    if (repoOrder) {
      return {
        ...repoOrder,
        status: "paid",
        stripeSessionId: session.id,
        paidAt: repoOrder.paidAt ?? new Date().toISOString(),
      };
    }

    const lineItems = (session.line_items?.data ?? []).map((item, idx) => ({
      productId: `stripe-${idx + 1}`,
      productName: item.description || "KODŌ Architectural Fragrance",
      variant: "50ml" as const,
      quantity: item.quantity ?? 1,
      unitPriceCents:
        item.price?.unit_amount ??
        Math.round((item.amount_total ?? 0) / Math.max(1, item.quantity ?? 1)),
      lineTotalCents: item.amount_total ?? 0,
    }));

    const paymentIntentId =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id ?? null;

    return {
      id: orderId,
      idempotencyKey: session.metadata?.idempotencyKey || session.id,
      mode: "live",
      stripeSessionId: session.id,
      stripePaymentIntentId: paymentIntentId,
      customer: {
        name:
          session.customer_details?.name ||
          session.metadata?.customerName ||
          "KODŌ Patron",
        email: session.customer_details?.email || session.customer_email || "",
        phone: session.customer_details?.phone || "",
      },
      shipping: {
        addressLine1:
          session.metadata?.shippingAddress ||
          session.customer_details?.address?.line1 ||
          "",
        addressLine2: session.customer_details?.address?.line2 || "",
        city:
          session.metadata?.shippingCity ||
          session.customer_details?.address?.city ||
          "",
        stateOrRegion: session.customer_details?.address?.state || "",
        postalCode:
          session.metadata?.shippingPostalCode ||
          session.customer_details?.address?.postal_code ||
          "",
        country:
          session.metadata?.shippingCountry ||
          session.customer_details?.address?.country ||
          "",
      },
      lineItems,
      financials: {
        currency: (session.currency || "USD").toUpperCase(),
        subtotalCents: session.amount_subtotal ?? 0,
        shippingCents: 0,
        taxCents: session.total_details?.amount_tax ?? 0,
        totalCents: session.amount_total ?? 0,
      },
      status: "paid",
      createdAt: new Date(session.created * 1000).toISOString(),
      paidAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error("[Success] Stripe session lookup error:", err);
    return null;
  }
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order_id?: string; session_id?: string }>;
}) {
  const params = await searchParams;

  let order: OrderRecord | null = null;

  if (params.order_id) {
    order = await resolveDemoOrder(params.order_id);
  } else if (params.session_id) {
    order = await resolveLiveStripeOrder(params.session_id);
  } else {
    return renderUnavailableReceipt(
      "Receipt Not Found",
      "No valid order reference was provided. Please check your confirmation link or contact our concierge."
    );
  }

  if (!order) {
    return renderUnavailableReceipt(
      "Receipt Unavailable",
      "This order confirmation has expired or belongs to another browser session."
    );
  }

  return (
    <>
      <SuccessClient />

      <main
        id="main-content"
        role="main"
        style={{
          minHeight: "100vh",
          paddingBlock: "var(--ref-space-12)",
          paddingInline: "var(--sys-space-page-margin)",
          maxWidth: "740px",
          marginInline: "auto",
        }}
      >
        <div
          style={{
            marginBottom: "var(--ref-space-10)",
            textAlign: "center",
          }}
        >
          <Link
            href="/"
            className="kodo-focus-ring"
            style={{
              fontFamily: "var(--font-editorial-display), Georgia, serif",
              fontSize: "var(--ref-font-size-title)",
              letterSpacing: "var(--ref-letter-spacing-label)",
              color: "var(--sys-color-text-primary)",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            {SITE_CONFIG.brand.wordmark}
          </Link>
        </div>

        <section
          aria-labelledby="receipt-heading"
          style={{
            textAlign: "center",
            marginBottom: "var(--ref-space-8)",
          }}
        >
          <span
            style={{
              display: "inline-block",
              padding: "4px 12px",
              border: "1px solid var(--sys-color-border)",
              fontSize: "var(--ref-font-size-small)",
              letterSpacing: "var(--ref-letter-spacing-wide)",
              textTransform: "uppercase",
              color: "var(--sys-color-text-accent)",
              marginBottom: "var(--ref-space-3)",
            }}
          >
            {order.mode === "demo"
              ? "Atelier Demo Confirmed"
              : "Payment Confirmed"}
          </span>

          <h1
            id="receipt-heading"
            style={{
              fontFamily: "var(--font-editorial-display), Georgia, serif",
              fontSize: "var(--ref-font-size-heading)",
              fontWeight: 400,
              letterSpacing: "var(--ref-letter-spacing-display)",
              color: "var(--sys-color-text-primary)",
              marginBottom: "var(--ref-space-2)",
            }}
          >
            Ritual Confirmed
          </h1>

          <p
            className="text-body"
            style={{ color: "var(--sys-color-text-secondary)" }}
          >
            Order Reference:{" "}
            <strong style={{ color: "var(--sys-color-text-primary)" }}>
              {order.id}
            </strong>
          </p>
        </section>

        <section
          aria-label="Order summary"
          style={{
            padding: "var(--ref-space-6)",
            border: "1px solid var(--sys-color-border)",
            backgroundColor: "var(--ref-color-obsidian-50)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--ref-space-4)",
            marginBottom: "var(--ref-space-8)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-editorial-display), Georgia, serif",
              fontSize: "var(--ref-font-size-title)",
              color: "var(--sys-color-text-primary)",
              paddingBottom: "var(--ref-space-3)",
              borderBottom: "1px solid var(--sys-color-border)",
            }}
          >
            Selected Vessels
          </h2>

          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "var(--ref-space-3)",
            }}
          >
            {order.lineItems.map((item, idx) => (
              <li
                key={`${item.productId}-${item.variant}-${idx}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <p
                    style={{
                      fontFamily:
                        "var(--font-editorial-display), Georgia, serif",
                      fontSize: "var(--ref-font-size-base)",
                      color: "var(--sys-color-text-primary)",
                    }}
                  >
                    {item.productName}
                  </p>
                  <p className="text-caption" style={{ fontSize: "0.75rem" }}>
                    {item.variant} × {item.quantity}
                  </p>
                </div>
                <p
                  className="text-body"
                  style={{ color: "var(--sys-color-text-primary)" }}
                >
                  {formatCents(item.lineTotalCents)}
                </p>
              </li>
            ))}
          </ul>

          <div
            style={{
              paddingTop: "var(--ref-space-3)",
              borderTop: "1px solid var(--sys-color-border)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--ref-space-2)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span className="text-caption">Subtotal</span>
              <span
                className="text-body"
                style={{ color: "var(--sys-color-text-primary)" }}
              >
                {formatCents(order.financials.subtotalCents)}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span className="text-caption">Shipping</span>
              <span
                className="text-body"
                style={{ color: "var(--sys-color-text-primary)" }}
              >
                {order.financials.shippingCents === 0
                  ? "Complimentary"
                  : formatCents(order.financials.shippingCents)}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "var(--ref-space-2)",
                borderTop: "1px solid var(--sys-color-border)",
              }}
            >
              <span className="text-label">Total</span>
              <span
                style={{
                  fontFamily: "var(--font-editorial-display), Georgia, serif",
                  fontSize: "var(--ref-font-size-title)",
                  color: "var(--sys-color-text-accent)",
                }}
              >
                {formatCents(order.financials.totalCents)}
              </span>
            </div>
          </div>
        </section>

        <section
          aria-label="Shipping destination"
          style={{
            padding: "var(--ref-space-6)",
            border: "1px solid var(--sys-color-border)",
            backgroundColor: "var(--ref-color-obsidian-50)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--ref-space-2)",
            marginBottom: "var(--ref-space-8)",
          }}
        >
          <p className="text-label">Shipping Destination</p>
          <p
            className="text-body"
            style={{ color: "var(--sys-color-text-primary)" }}
          >
            {order.customer.name}
          </p>
          {order.shipping.addressLine1 && (
            <p className="text-caption">
              {order.shipping.addressLine1}
              {order.shipping.addressLine2
                ? `, ${order.shipping.addressLine2}`
                : ""}
            </p>
          )}
          <p className="text-caption">
            {[
              order.shipping.city,
              order.shipping.stateOrRegion,
              order.shipping.postalCode,
            ]
              .filter(Boolean)
              .join(", ")}
          </p>
          {order.shipping.country && (
            <p className="text-caption">{order.shipping.country}</p>
          )}
          {order.customer.email && (
            <p className="text-caption">
              Confirmation dispatched to {order.customer.email}
            </p>
          )}
        </section>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "var(--ref-space-4)",
          }}
        >
          <Link href="/collections" className="kodo-btn-solid kodo-focus-ring">
            Explore Collection
          </Link>
          <Link href="/concierge" className="kodo-btn-outline kodo-focus-ring">
            Contact Concierge
          </Link>
        </div>
      </main>
    </>
  );
}
