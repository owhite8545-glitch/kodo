"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";

/* ═══════════════════════════════════════════════════════════
   KODŌ — Checkout Client Component
   Connects to the cart store. Shows order summary with
   item list, quantities, and totals.
   Empty cart state with elegant redirect to collections.
   ═══════════════════════════════════════════════════════════ */

export function CheckoutClient() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const totalItems = useCartStore((s) => s.totalItems);

  /* ── Empty Cart State ────────────────────────────────── */
  if (items.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          textAlign: "center",
          gap: "var(--ref-space-4)",
          paddingInline: "var(--sys-space-page-margin)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-editorial-display), Georgia, serif",
            fontSize: "var(--ref-font-size-display)",
            lineHeight: "var(--ref-line-height-tight)",
            color: "var(--sys-color-text-primary)",
          }}
        >
          The ritual awaits
        </p>
        <p
          className="text-body-lg"
          style={{
            color: "var(--sys-color-text-secondary)",
            maxWidth: "40ch",
          }}
        >
          Your collection is empty. Explore our scent taxonomy to begin
          composing your personal ritual.
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

  /* ── Checkout with Items ─────────────────────────────── */
  return (
    <div
      className="checkout-layout"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 400px",
        gap: "var(--ref-space-12)",
        alignItems: "start",
        paddingInline: "var(--sys-space-page-margin)",
        maxWidth: "1440px",
        marginInline: "auto",
        paddingBottom: "var(--sys-space-section)",
      }}
    >
      {/* ── Order Items ─── */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "var(--ref-space-6)",
            paddingBottom: "var(--ref-space-3)",
            borderBottom: "1px solid var(--sys-color-border)",
          }}
        >
          <p className="text-label">
            Your Ritual ({totalItems()} {totalItems() === 1 ? "item" : "items"})
          </p>
          <Link
            href="/collections"
            className="text-caption"
            style={{
              color: "var(--sys-color-text-secondary)",
              textDecoration: "none",
              transition: "color 240ms var(--ease-decelerate)",
            }}
          >
            Continue Shopping
          </Link>
        </div>

        <ul
          style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "var(--ref-space-1)",
          }}
        >
          {items.map((item) => (
            <li
              key={item.product.id}
              style={{
                display: "grid",
                gridTemplateColumns: "100px 1fr auto",
                gap: "var(--ref-space-4)",
                padding: "var(--ref-space-4) 0",
                borderBottom: "1px solid var(--sys-color-border)",
                alignItems: "start",
              }}
            >
              {/* Thumbnail */}
              <div
                style={{
                  aspectRatio: "3/4",
                  backgroundColor: "var(--sys-color-surface)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={item.product.images.pureProduct}
                  alt={`KODŌ ${item.product.name} Eau de Parfum`}
                  fill
                  sizes="100px"
                  style={{ objectFit: "contain" }}
                />
              </div>

              {/* Details */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--ref-space-1)",
                }}
              >
                <p
                  style={{
                    fontFamily:
                      "var(--font-editorial-display), Georgia, serif",
                    fontSize: "var(--ref-font-size-title)",
                    fontWeight: 400,
                  }}
                >
                  {item.product.name}
                </p>
                <p className="text-caption">{item.product.subtitle}</p>
                <p className="text-caption">{item.product.size}</p>

                {/* Quantity controls */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--ref-space-2)",
                    marginTop: "var(--ref-space-2)",
                  }}
                >
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                    className="kodo-btn-utility kodo-focus-ring"
                    aria-label={`Decrease quantity of ${item.product.name}`}
                    style={{
                      width: 36,
                      height: 36,
                      minWidth: "var(--ref-touch-target)",
                      minHeight: "var(--ref-touch-target)",
                      border: "1px solid var(--sys-color-border)",
                      color: "var(--sys-color-text-primary)",
                      fontSize: "var(--ref-font-size-caption)",
                    }}
                  >
                    −
                  </button>
                  <span
                    style={{
                      fontVariantNumeric: "tabular-nums",
                      minWidth: "20px",
                      textAlign: "center",
                      fontSize: "var(--ref-font-size-caption)",
                    }}
                  >
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                    className="kodo-btn-utility kodo-focus-ring"
                    aria-label={`Increase quantity of ${item.product.name}`}
                    style={{
                      width: 36,
                      height: 36,
                      minWidth: "var(--ref-touch-target)",
                      minHeight: "var(--ref-touch-target)",
                      border: "1px solid var(--sys-color-border)",
                      color: "var(--sys-color-text-primary)",
                      fontSize: "var(--ref-font-size-caption)",
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="kodo-btn-utility kodo-focus-ring"
                    aria-label={`Remove ${item.product.name} from cart`}
                    style={{
                      marginLeft: "var(--ref-space-3)",
                      fontSize: "var(--ref-font-size-small)",
                      letterSpacing: "var(--ref-letter-spacing-wide)",
                      padding: "4px",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Price */}
              <p
                style={{
                  fontFamily:
                    "var(--font-utility-sans), system-ui, sans-serif",
                  fontSize: "var(--ref-font-size-base)",
                  fontVariantNumeric: "tabular-nums",
                  color: "var(--sys-color-text-accent)",
                  textAlign: "right",
                }}
              >
                ${item.product.price * item.quantity}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Order Summary ─── */}
      <div
        style={{
          position: "sticky",
          top: "calc(var(--ref-space-6))",
          border: "1px solid var(--sys-color-border)",
          padding: "var(--ref-space-6)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--ref-space-4)",
        }}
      >
        <p className="text-label">Order Summary</p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--ref-space-2)",
            paddingBottom: "var(--ref-space-4)",
            borderBottom: "1px solid var(--sys-color-border)",
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
              ${totalPrice()}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className="text-caption">Shipping</span>
            <span className="text-caption" style={{ color: "var(--sys-color-text-accent)" }}>
              Complimentary
            </span>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
              color: "var(--sys-color-text-primary)",
            }}
          >
            ${totalPrice()}
          </span>
        </div>

        <button
          className="kodo-btn-solid kodo-focus-ring"
          style={{ width: "100%" }}
        >
          Complete Purchase
        </button>

        <p className="text-caption" style={{ textAlign: "center" }}>
          [Customize shipping and payment details.]
        </p>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .checkout-layout {
            grid-template-columns: 1fr !important;
            gap: var(--ref-space-6) !important;
          }
        }
      `}</style>
    </div>
  );
}
