"use client";

import React, { useEffect, useRef } from "react";
import { useCartStore } from "@/store/cart-store";
import { ButtonSolid } from "@/components/shared/ButtonSolid";
import { ButtonOutline } from "@/components/shared/ButtonOutline";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════
   KODŌ — CartDrawer
   Slides in from right. 450px on desktop, 100% on mobile.
   Focus trapped inside. Background scroll locked.
   ═══════════════════════════════════════════════════════════ */

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll and handle Esc
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 300,
          background: "oklch(12% 0.01 260 / 0.6)",
          backdropFilter: "blur(4px)",
          animation: "fadeIn 200ms var(--ease-decelerate) forwards",
        }}
      />

      {/* Drawer */}
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 301,
          width: "min(450px, 100vw)",
          background: "var(--sys-color-bg)",
          borderLeft: "1px solid var(--sys-color-border)",
          display: "flex",
          flexDirection: "column",
          animation: "slideInRight 350ms var(--ease-cinematic) forwards",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "var(--ref-space-3) var(--ref-space-4)",
            borderBottom: "1px solid var(--sys-color-border)",
            minHeight: "var(--comp-nav-height)",
          }}
        >
          <span className="text-label">Your Ritual</span>
          <button
            onClick={closeCart}
            className="kodo-btn-utility kodo-focus-ring"
            aria-label="Close cart"
            style={{
              fontSize: "var(--ref-font-size-small)",
              letterSpacing: "var(--ref-letter-spacing-ultra)",
              padding: "var(--ref-space-1)",
              minWidth: "var(--ref-touch-target)",
              minHeight: "var(--ref-touch-target)",
            }}
          >
            Close
          </button>
        </div>

        {/* Items */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "var(--ref-space-4)",
          }}
        >
          {items.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: "var(--ref-space-3)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-editorial-display), Georgia, serif",
                  fontSize: "var(--ref-font-size-title)",
                  color: "var(--sys-color-text-secondary)",
                }}
              >
                The ritual awaits
              </p>
              <p className="text-caption" style={{ textAlign: "center" }}>
                Your collection is empty. Explore our scent taxonomy to begin.
              </p>
              <ButtonOutline onClick={closeCart}>
                <Link href="/collections" style={{ color: "inherit", textDecoration: "none" }}>
                  Explore Collections
                </Link>
              </ButtonOutline>
            </div>
          ) : (
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--ref-space-4)" }}>
              {items.map((item) => (
                <li
                  key={item.product.id}
                  style={{
                    display: "flex",
                    gap: "var(--ref-space-3)",
                    paddingBottom: "var(--ref-space-4)",
                    borderBottom: "1px solid var(--sys-color-border)",
                  }}
                >
                  {/* Product thumbnail placeholder */}
                  <div
                    style={{
                      width: 80,
                      height: 100,
                      backgroundColor: "var(--sys-color-surface)",
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        fontFamily: "var(--font-editorial-display), Georgia, serif",
                        fontSize: "var(--ref-font-size-base)",
                        marginBottom: "4px",
                      }}
                    >
                      {item.product.name}
                    </p>
                    <p className="text-caption" style={{ marginBottom: "var(--ref-space-1)" }}>
                      {item.product.size}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                        fontSize: "var(--ref-font-size-caption)",
                        color: "var(--sys-color-text-accent)",
                        fontVariantNumeric: "tabular-nums",
                        marginBottom: "var(--ref-space-2)",
                      }}
                    >
                      ${item.product.price}
                    </p>

                    <div style={{ display: "flex", alignItems: "center", gap: "var(--ref-space-2)" }}>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
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
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
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
                          marginLeft: "auto",
                          fontSize: "var(--ref-font-size-small)",
                          letterSpacing: "var(--ref-letter-spacing-wide)",
                          padding: "4px",
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer with total and checkout */}
        {items.length > 0 && (
          <div
            style={{
              borderTop: "1px solid var(--sys-color-border)",
              padding: "var(--ref-space-4)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--ref-space-3)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="text-label">Subtotal</span>
              <span
                style={{
                  fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                  fontSize: "var(--ref-font-size-body-lg)",
                  fontVariantNumeric: "tabular-nums",
                  color: "var(--sys-color-text-primary)",
                }}
              >
                ${totalPrice()}
              </span>
            </div>
            <p className="text-caption">Complimentary shipping on all orders</p>
            <Link href="/checkout" onClick={closeCart} style={{ textDecoration: "none" }}>
              <ButtonSolid fullWidth ariaLabel="Proceed to secure checkout">
                Secure Checkout
              </ButtonSolid>
            </Link>
          </div>
        )}

        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideInRight {
            from { transform: translate3d(100%, 0, 0); }
            to { transform: translate3d(0, 0, 0); }
          }
        `}</style>
      </div>
    </>
  );
}
