"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import {
  calculateOrderFinancials,
  COMMERCE_CONFIG,
  formatCents,
} from "@/config/commerce";
import { useHydrated } from "@/hooks/use-hydrated";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const isHydrated = useHydrated();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, closeCart]);

  const activeItems = isHydrated ? items : [];
  const financials = calculateOrderFinancials(
    activeItems.map((item) => ({
      unitPriceCents: Math.round(item.product.price * 100),
      quantity: item.quantity,
    }))
  );

  return (
    <>
      <div
        className="kodo-drawer-backdrop"
        data-open={isOpen}
        onClick={closeCart}
        aria-hidden="true"
      />

      <aside
        className="kodo-cart-panel"
        data-open={isOpen}
        role={isOpen ? "dialog" : undefined}
        aria-modal={isOpen ? "true" : undefined}
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "var(--ref-space-4)",
            borderBottom: "1px solid var(--sys-color-border)",
          }}
        >
          <p className="text-label" style={{ color: "var(--sys-color-text-primary)" }}>
            Your Ritual
          </p>
          <button
            type="button"
            onClick={closeCart}
            className="kodo-btn-utility kodo-focus-ring"
            aria-label="Close cart"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "44px",
              minHeight: "44px",
            }}
          >
            Close
          </button>
        </div>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            paddingBlock: "var(--ref-space-6)",
          }}
        >
          {activeItems.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                minHeight: "260px",
                textAlign: "center",
                gap: "var(--ref-space-3)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-editorial-display), Georgia, serif",
                  fontSize: "var(--ref-font-size-title)",
                  color: "var(--sys-color-text-primary)",
                }}
              >
                The ritual awaits
              </p>
              <p
                className="text-body"
                style={{ color: "var(--sys-color-text-secondary)", maxWidth: "28ch" }}
              >
                Your collection is empty. Explore our scent taxonomy to begin.
              </p>
              <Link
                href="/collections"
                onClick={closeCart}
                className="kodo-btn-outline kodo-focus-ring"
                style={{ marginTop: "var(--ref-space-2)" }}
              >
                Explore Collections
              </Link>
            </div>
          ) : (
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "var(--ref-space-4)",
              }}
            >
              {activeItems.map((item) => (
                <li
                  key={item.lineKey}
                  style={{
                    display: "flex",
                    gap: "var(--ref-space-3)",
                    paddingBottom: "var(--ref-space-4)",
                    borderBottom: "1px solid var(--sys-color-border)",
                  }}
                >
                  <div
                    style={{
                      width: "72px",
                      height: "92px",
                      flexShrink: 0,
                      overflow: "hidden",
                      position: "relative",
                      background: "var(--ref-color-obsidian-50)",
                      border: "1px solid var(--sys-color-border)",
                    }}
                  >
                    <Image
                      src={item.product.image}
                      alt={`KODŌ ${item.product.name} Eau de Parfum`}
                      fill
                      sizes="72px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontFamily:
                            "var(--font-editorial-display), Georgia, serif",
                          fontSize: "var(--ref-font-size-title)",
                          color: "var(--sys-color-text-primary)",
                          lineHeight: 1.2,
                        }}
                      >
                        {item.product.name}
                      </p>
                      <p
                        className="text-caption"
                        style={{
                          color: "var(--sys-color-text-secondary)",
                          marginTop: "2px",
                        }}
                      >
                        {item.product.size}
                      </p>
                      <p
                        className="text-body"
                        style={{
                          color: "var(--sys-color-text-accent)",
                          fontWeight: 500,
                          marginTop: "var(--ref-space-1)",
                        }}
                      >
                        {formatCents(Math.round(item.product.price * 100))}
                      </p>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--ref-space-2)",
                        marginTop: "var(--ref-space-2)",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.lineKey, item.quantity - 1)
                        }
                        className="kodo-btn-utility kodo-focus-ring"
                        aria-label={`Decrease quantity of ${item.product.name}`}
                        style={{
                          minWidth: "44px",
                          minHeight: "44px",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "1px solid var(--sys-color-border)",
                        }}
                      >
                        −
                      </button>
                      <span
                        className="text-caption"
                        style={{
                          minWidth: "24px",
                          textAlign: "center",
                          color: "var(--sys-color-text-primary)",
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.lineKey, item.quantity + 1)
                        }
                        className="kodo-btn-utility kodo-focus-ring"
                        aria-label={`Increase quantity of ${item.product.name}`}
                        style={{
                          minWidth: "44px",
                          minHeight: "44px",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "1px solid var(--sys-color-border)",
                        }}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(item.lineKey)}
                        className="kodo-btn-utility kodo-focus-ring"
                        aria-label={`Remove ${item.product.name} from cart`}
                        style={{
                          marginLeft: "auto",
                          minHeight: "44px",
                          paddingInline: "8px",
                          color: "var(--sys-color-text-secondary)",
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

        {activeItems.length > 0 && (
          <div
            style={{
              paddingTop: "var(--ref-space-4)",
              borderTop: "1px solid var(--sys-color-border)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--ref-space-3)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <span className="text-label">Subtotal</span>
              <span
                style={{
                  fontFamily: "var(--font-editorial-display), Georgia, serif",
                  fontSize: "var(--ref-font-size-title)",
                  color: "var(--sys-color-text-primary)",
                }}
              >
                {formatCents(financials.subtotalCents)}
              </span>
            </div>

            <p className="text-caption" style={{ fontSize: "0.75rem" }}>
              {financials.qualifiesFreeShipping
                ? `${COMMERCE_CONFIG.shipping.complimentaryLabel} included.`
                : `Add ${formatCents(
                    financials.amountToFreeShippingCents
                  )} for ${COMMERCE_CONFIG.shipping.complimentaryLabel.toLowerCase()}.`}
            </p>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="kodo-btn-solid kodo-focus-ring"
              style={{ width: "100%", textAlign: "center" }}
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
