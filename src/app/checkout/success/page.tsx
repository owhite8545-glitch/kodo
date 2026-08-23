import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { OrderRepository } from "@/lib/order-repository";
import { COMMERCE_CONFIG } from "@/config/commerce";
import { SuccessClient } from "./SuccessClient";

/* ═══════════════════════════════════════════════════════════
   KODŌ — Order Confirmation Page (Server Component)
   Retrieves the demo order from OrderRepository using
   the opaque token from the cookie, validates against
   the orderId from searchParams, and renders the receipt.
   ═══════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Your KODŌ order has been confirmed.",
};

interface SuccessPageProps {
  searchParams: Promise<{ order_id?: string }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { order_id: orderId } = await searchParams;
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("kodo_demo_token");

  // Validate inputs
  if (!orderId || !tokenCookie?.value) {
    return (
      <main id="main-content" role="main">
        <ReceiptLayout>
          <ErrorState message="No order found. Please complete your checkout first." />
        </ReceiptLayout>
      </main>
    );
  }

  // Retrieve order from server-side storage
  const order = await OrderRepository.getDemoOrder(
    orderId,
    tokenCookie.value
  );

  if (!order) {
    return (
      <main id="main-content" role="main">
        <ReceiptLayout>
          <ErrorState message="Order not found or has expired. Demo orders are available for 24 hours." />
        </ReceiptLayout>
      </main>
    );
  }

  const { symbol, decimals } = COMMERCE_CONFIG.currency;
  const fmt = (cents: number) => `${symbol}${(cents / 100).toFixed(decimals)}`;

  return (
    <main id="main-content" role="main">
      {/* Client component: clears cart and idempotency key on mount */}
      <SuccessClient />

      <ReceiptLayout>
        {/* Confirmation Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "var(--ref-space-8)",
          }}
        >
          {/* Checkmark */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              border: "2px solid var(--sys-color-text-accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginInline: "auto",
              marginBottom: "var(--ref-space-4)",
            }}
          >
            <svg
              width={28}
              height={28}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: "var(--sys-color-text-accent)" }}
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-editorial-display), Georgia, serif",
              fontSize: "var(--ref-font-size-display)",
              lineHeight: "var(--ref-line-height-tight)",
              fontWeight: 400,
              marginBottom: "var(--ref-space-2)",
            }}
          >
            Ritual Confirmed
          </h1>
          <p
            className="text-body-lg"
            style={{ color: "var(--sys-color-text-secondary)" }}
          >
            Thank you, {order.customer.name}.
          </p>

          {order.mode === "demo" && (
            <p
              className="text-caption"
              style={{
                color: "var(--sys-color-text-secondary)",
                marginTop: "var(--ref-space-2)",
                opacity: 0.7,
              }}
            >
              Atelier Concept Demonstration — Non-commercial simulation
            </p>
          )}
        </div>

        {/* Order Reference */}
        <div
          style={{
            padding: "var(--ref-space-4)",
            border: "1px solid var(--sys-color-border)",
            marginBottom: "var(--ref-space-6)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span className="text-label">Order Reference</span>
            <span
              style={{
                fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                fontSize: "var(--ref-font-size-caption)",
                fontVariantNumeric: "tabular-nums",
                letterSpacing: "var(--ref-letter-spacing-wide)",
              }}
            >
              {order.id}
            </span>
          </div>
        </div>

        {/* Line Items */}
        <div style={{ marginBottom: "var(--ref-space-6)" }}>
          <p
            className="text-label"
            style={{
              marginBottom: "var(--ref-space-3)",
              paddingBottom: "var(--ref-space-2)",
              borderBottom: "1px solid var(--sys-color-border)",
            }}
          >
            Items
          </p>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "var(--ref-space-3)",
            }}
          >
            {order.lineItems.map((item, i) => (
              <li
                key={`${item.productId}-${item.variant}-${i}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: "var(--ref-space-2)",
                  borderBottom: "1px solid var(--sys-color-border)",
                }}
              >
                <div>
                  <p
                    style={{
                      fontFamily:
                        "var(--font-editorial-display), Georgia, serif",
                      fontSize: "var(--ref-font-size-base)",
                      fontWeight: 400,
                    }}
                  >
                    {item.productName}
                  </p>
                  <p
                    className="text-caption"
                    style={{ opacity: 0.7 }}
                  >
                    {item.variant} × {item.quantity}
                  </p>
                </div>
                <span
                  style={{
                    fontFamily:
                      "var(--font-utility-sans), system-ui, sans-serif",
                    fontSize: "var(--ref-font-size-caption)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {fmt(item.lineTotalCents)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Financials */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--ref-space-2)",
            marginBottom: "var(--ref-space-6)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className="text-caption">Subtotal</span>
            <span
              style={{
                fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                fontSize: "var(--ref-font-size-caption)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {fmt(order.financials.subtotalCents)}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className="text-caption">
              {COMMERCE_CONFIG.shipping.policyLabel}
            </span>
            <span
              style={{
                fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                fontSize: "var(--ref-font-size-caption)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {fmt(order.financials.shippingCents)}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "var(--ref-space-3)",
              borderTop: "1px solid var(--sys-color-border)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                fontSize: "var(--ref-font-size-base)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "var(--ref-letter-spacing-sans)",
              }}
            >
              Total
            </span>
            <span
              style={{
                fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                fontSize: "var(--ref-font-size-title)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {fmt(order.financials.totalCents)}
            </span>
          </div>
        </div>

        {/* Shipping Address */}
        <div style={{ marginBottom: "var(--ref-space-8)" }}>
          <p
            className="text-label"
            style={{
              marginBottom: "var(--ref-space-3)",
              paddingBottom: "var(--ref-space-2)",
              borderBottom: "1px solid var(--sys-color-border)",
            }}
          >
            Delivery Address
          </p>
          <div
            className="text-caption"
            style={{
              lineHeight: 1.8,
              color: "var(--sys-color-text-secondary)",
            }}
          >
            <p>{order.customer.name}</p>
            <p>{order.shipping.addressLine1}</p>
            {order.shipping.addressLine2 && (
              <p>{order.shipping.addressLine2}</p>
            )}
            <p>
              {order.shipping.city}
              {order.shipping.stateOrRegion
                ? `, ${order.shipping.stateOrRegion}`
                : ""}
            </p>
            <p>{order.shipping.postalCode}</p>
            <p>{order.shipping.country}</p>
          </div>
        </div>

        {/* Continue Shopping */}
        <div style={{ textAlign: "center" }}>
          <Link
            href="/collections"
            className="kodo-btn-solid kodo-focus-ring"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              justifyContent: "center",
            }}
          >
            Continue Exploring
          </Link>
        </div>
      </ReceiptLayout>
    </main>
  );
}

// ─── Layout Wrapper ───────────────────────────────────────

function ReceiptLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Header */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "var(--comp-nav-height)",
          paddingInline: "var(--sys-space-page-margin)",
          borderBottom: "1px solid var(--sys-color-border)",
        }}
      >
        <Link
          href="/"
          className="kodo-focus-ring"
          aria-label="Return to KODŌ home"
          style={{
            fontFamily: "var(--font-editorial-display), Georgia, serif",
            fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
            fontWeight: 400,
            letterSpacing: "var(--ref-letter-spacing-label)",
            color: "var(--sys-color-text-primary)",
            textDecoration: "none",
            textTransform: "uppercase",
          }}
        >
          K O D Ō
        </Link>
      </header>

      {/* Content */}
      <section
        style={{
          maxWidth: "640px",
          marginInline: "auto",
          paddingInline: "var(--sys-space-page-margin)",
          paddingTop: "var(--ref-space-10)",
          paddingBottom: "var(--sys-space-section)",
        }}
      >
        {children}
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--sys-color-border)",
          padding: "var(--ref-space-4) var(--sys-space-page-margin)",
        }}
      >
        <p className="text-caption" style={{ textAlign: "center" }}>
          © {new Date().getFullYear()} KODŌ Fragrances. All rights reserved.
        </p>
      </footer>
    </>
  );
}

// ─── Error State ──────────────────────────────────────────

function ErrorState({ message }: { message: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "40vh",
        textAlign: "center",
        gap: "var(--ref-space-4)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-editorial-display), Georgia, serif",
          fontSize: "var(--ref-font-size-title)",
          lineHeight: "var(--ref-line-height-tight)",
          color: "var(--sys-color-text-primary)",
        }}
      >
        Order Not Found
      </p>
      <p
        className="text-body-lg"
        style={{
          color: "var(--sys-color-text-secondary)",
          maxWidth: "40ch",
        }}
      >
        {message}
      </p>
      <Link
        href="/collections"
        className="kodo-btn-solid kodo-focus-ring"
        style={{ marginTop: "var(--ref-space-4)" }}
      >
        Explore Collections
      </Link>
    </div>
  );
}
