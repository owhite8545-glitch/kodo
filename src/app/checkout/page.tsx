import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { CheckoutClient } from "./CheckoutClient";

/* ═══════════════════════════════════════════════════════════
   KODŌ — Checkout Page (Server Component)
   Minimal chrome checkout. No HeaderNav (hidden via
   pathname check in HeaderNav). Dedicated back link.
   ═══════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Complete your KODŌ order. Secure checkout.",
};

export default function CheckoutPage() {
  return (
    <main id="main-content" role="main">
      {/* ─── Checkout Header ─── */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
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

        <span className="text-label">Secure Checkout</span>
      </header>

      {/* ─── Checkout Content ─── */}
      <section
        style={{
          paddingTop: "var(--ref-space-8)",
        }}
      >
        <CheckoutClient />
      </section>

      {/* ─── Minimal Footer ─── */}
      <footer
        style={{
          borderTop: "1px solid var(--sys-color-border)",
          padding: "var(--ref-space-4) var(--sys-space-page-margin)",
          marginTop: "var(--ref-space-12)",
        }}
      >
        <p className="text-caption" style={{ textAlign: "center" }}>
          © {new Date().getFullYear()} KODŌ Fragrances. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
