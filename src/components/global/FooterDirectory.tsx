import React from "react";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════
   KODŌ — FooterDirectory
   Global footer with brand identity, navigation links,
   studio addresses, and copyright.
   ═══════════════════════════════════════════════════════════ */

import { NAV_LINKS as FOOTER_LINKS } from "@/data/navigation";

export function FooterDirectory() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--sys-color-border)",
        paddingBlock: "var(--ref-space-12)",
        paddingInline: "var(--sys-space-page-margin)",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "var(--ref-space-8)",
          maxWidth: "1440px",
          marginInline: "auto",
        }}
      >
        {/* Brand Column */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-editorial-display), Georgia, serif",
              fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
              letterSpacing: "var(--ref-letter-spacing-label)",
              color: "var(--sys-color-text-primary)",
              marginBottom: "var(--ref-space-3)",
            }}
          >
            K O D Ō
          </p>
          <p
            className="text-caption"
            style={{ maxWidth: "28ch", lineHeight: "var(--ref-line-height-relaxed)" }}
          >
            The geometry of memory. A luxury fragrance house where traditional
            craft meets structural geometry.
          </p>
        </div>

        {/* Navigation Column */}
        <div>
          <p className="text-label" style={{ marginBottom: "var(--ref-space-3)" }}>
            Navigate
          </p>
          <nav aria-label="Footer navigation">
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--ref-space-2)" }}>
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="kodo-focus-ring footer-link"
                    style={{
                      fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                      fontSize: "var(--ref-font-size-caption)",
                      color: "var(--sys-color-text-secondary)",
                      textDecoration: "none",
                      transition: "color 240ms var(--ease-decelerate)",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Studios Column */}
        <div>
          <p className="text-label" style={{ marginBottom: "var(--ref-space-3)" }}>
            Studios
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--ref-space-4)" }}>
            <div>
              <p
                style={{
                  fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                  fontSize: "var(--ref-font-size-caption)",
                  fontWeight: 700,
                  color: "var(--sys-color-text-accent)",
                  marginBottom: "4px",
                }}
              >
                Tokyo / Aoyama
              </p>
              <p className="text-caption">5-11-23 Minami-Aoyama, Minato-ku</p>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                  fontSize: "var(--ref-font-size-caption)",
                  fontWeight: 700,
                  color: "var(--sys-color-text-accent)",
                  marginBottom: "4px",
                }}
              >
                Paris / Marais
              </p>
              <p className="text-caption">18 Rue de la Verrerie, 75004</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div
        style={{
          borderTop: "1px solid var(--sys-color-border)",
          marginTop: "var(--ref-space-8)",
          paddingTop: "var(--ref-space-4)",
          maxWidth: "1440px",
          marginInline: "auto",
        }}
      >
        <p className="text-caption" style={{ textAlign: "center" }}>
          © {new Date().getFullYear()} KODŌ Fragrances. All rights reserved.
        </p>
      </div>

      <style>{`
        .footer-link:hover {
          color: var(--sys-color-text-primary) !important;
        }
      `}</style>
    </footer>
  );
}

