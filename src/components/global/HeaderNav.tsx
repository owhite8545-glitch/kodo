"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/store/ui-store";
import { useCartStore } from "@/store/cart-store";

/* ═══════════════════════════════════════════════════════════
   KODŌ — HeaderNav
   Fixed glassmorphic navigation bar. 80px height.
   Brand name on Column 1, Menu trigger on Column 12.
   ═══════════════════════════════════════════════════════════ */

const NAV_LINKS = [
  { href: "/collections", label: "Collections" },
  { href: "/story", label: "The Story" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/concierge", label: "Concierge" },
];

export function HeaderNav() {
  const pathname = usePathname();
  const toggleMenu = useUIStore((s) => s.toggleMenu);
  const isMenuOpen = useUIStore((s) => s.isMenuOpen);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const totalItems = useCartStore((s) => s.totalItems);

  // Hide nav on checkout
  if (pathname === "/checkout") return null;

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
      <nav aria-label="KODŌ Global Navigation" style={{ display: "flex", alignItems: "center", width: "100%" }}>
        {/* Brand Mark */}
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
          }}
        >
          K O D Ō
        </Link>

        {/* Desktop Navigation Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--ref-space-4)",
            marginLeft: "auto",
            marginRight: "var(--ref-space-4)",
          }}
          className="nav-desktop-links"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="kodo-focus-ring nav-link"
              aria-current={pathname === link.href ? "page" : undefined}
              style={{
                fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                fontSize: "var(--ref-font-size-small)",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "var(--ref-letter-spacing-ultra)",
                color:
                  pathname === link.href
                    ? "var(--sys-color-text-primary)"
                    : "var(--sys-color-text-secondary)",
                textDecoration: "none",
                padding: "var(--ref-space-1) 0",
                position: "relative",
                transition: "color 150ms var(--ease-decelerate)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Cart Button */}
        <button
          onClick={toggleCart}
          className="kodo-focus-ring"
          aria-label={`Shopping cart, ${totalItems()} items`}
          style={{
            position: "relative",
            background: "none",
            border: "none",
            color: "var(--sys-color-text-secondary)",
            fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
            fontSize: "var(--ref-font-size-small)",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "var(--ref-letter-spacing-ultra)",
            cursor: "pointer",
            padding: "var(--ref-space-1) var(--ref-space-2)",
            marginRight: "var(--ref-space-2)",
            transition: "color 150ms var(--ease-decelerate)",
            minWidth: "var(--ref-touch-target)",
            minHeight: "var(--ref-touch-target)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Cart
          {totalItems() > 0 && (
            <span
              style={{
                marginLeft: "4px",
                color: "var(--sys-color-text-accent)",
              }}
            >
              ({totalItems()})
            </span>
          )}
        </button>

        {/* Menu Trigger */}
        <button
          onClick={toggleMenu}
          className="kodo-focus-ring"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          style={{
            background: "none",
            border: "none",
            color: "var(--sys-color-text-secondary)",
            fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
            fontSize: "var(--ref-font-size-small)",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "var(--ref-letter-spacing-ultra)",
            cursor: "pointer",
            padding: "var(--ref-space-1)",
            transition: "color 150ms var(--ease-decelerate)",
            minWidth: "var(--ref-touch-target)",
            minHeight: "var(--ref-touch-target)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>
      </nav>

      <style jsx>{`
        @media (max-width: 768px) {
          .nav-desktop-links {
            display: none !important;
          }
        }
        .nav-link:hover {
          color: var(--sys-color-text-primary) !important;
        }
      `}</style>
    </header>
  );
}
