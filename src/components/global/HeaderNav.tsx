"use client";

import React from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import { NAV_LINKS } from "@/data/navigation";
import { SITE_CONFIG } from "@/config/site";
import { useHydrated } from "@/hooks/use-hydrated";

export function HeaderNav() {
  const isHydrated = useHydrated();
  const items = useCartStore((s) => s.items);
  const openCart = useCartStore((s) => s.openCart);
  const { isMenuOpen, toggleMenu } = useUIStore();

  const itemCount = isHydrated
    ? items.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: "var(--comp-nav-height)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingInline: "var(--sys-space-page-margin)",
        background: "var(--comp-nav-bg)",
        backdropFilter: "blur(var(--comp-nav-blur))",
        WebkitBackdropFilter: "blur(var(--comp-nav-blur))",
        borderBottom: "1px solid var(--sys-color-border)",
      }}
    >
      <nav
        aria-label="KODŌ Global Navigation"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Link
          href="/"
          className="kodo-focus-ring"
          aria-label="KODŌ Home"
          style={{
            fontFamily: "var(--font-editorial-display), Georgia, serif",
            fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
            fontWeight: 400,
            letterSpacing: "var(--ref-letter-spacing-label)",
            color: "var(--sys-color-text-primary)",
            textDecoration: "none",
            textTransform: "uppercase",
            flexShrink: 0,
          }}
        >
          {SITE_CONFIG.brand.wordmark}
        </Link>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "auto",
          }}
        >
          <div
            style={{
              alignItems: "center",
              gap: "var(--ref-space-4)",
              marginRight: "var(--ref-space-4)",
            }}
            className="nav-desktop-links"
          >
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="kodo-focus-ring"
                style={{
                  fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                  fontSize: "var(--ref-font-size-small)",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "var(--ref-letter-spacing-wide)",
                  color: "var(--sys-color-text-secondary)",
                  textDecoration: "none",
                  transition: "color var(--motion-duration-fast)",
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={openCart}
            className="kodo-btn-utility kodo-focus-ring"
            aria-label={
              itemCount > 0
                ? `Shopping cart, ${itemCount} items`
                : "Shopping cart"
            }
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "44px",
              minHeight: "44px",
              paddingInline: "8px",
            }}
          >
            <span>Cart</span>
            {itemCount > 0 && (
              <span
                style={{
                  marginLeft: "4px",
                  color: "var(--sys-color-text-accent)",
                }}
              >
                ({itemCount})
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={toggleMenu}
            className="kodo-btn-utility kodo-focus-ring"
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "44px",
              minHeight: "44px",
              paddingInline: "8px",
            }}
          >
            <span>{isMenuOpen ? "Close" : "Menu"}</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
