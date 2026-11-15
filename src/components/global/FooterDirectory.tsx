import React from "react";
import Link from "next/link";
import { LEGAL_LINKS, NAV_LINKS } from "@/data/navigation";
import { SITE_CONFIG } from "@/config/site";

export function FooterDirectory() {
  return (
    <footer
      role="contentinfo"
      style={{
        borderTop: "1px solid var(--sys-color-border)",
        paddingBlock: "var(--ref-space-12)",
        paddingInline: "var(--sys-space-page-margin)",
        backgroundColor: "var(--sys-color-bg)",
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          marginInline: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: "var(--ref-space-8)",
        }}
      >
        {/* Brand Column */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-editorial-display), Georgia, serif",
              fontSize: "var(--ref-font-size-title)",
              letterSpacing: "var(--ref-letter-spacing-label)",
              color: "var(--sys-color-text-primary)",
              marginBottom: "var(--ref-space-2)",
            }}
          >
            {SITE_CONFIG.brand.wordmark}
          </p>
          <p
            className="text-body"
            style={{
              color: "var(--sys-color-text-secondary)",
              maxWidth: "28ch",
            }}
          >
            {SITE_CONFIG.brand.tagline}. A luxury fragrance house where
            traditional Japanese craft meets structural geometry.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <p className="text-label" style={{ marginBottom: "var(--ref-space-3)" }}>
            Navigate
          </p>
          <nav aria-label="Footer navigation">
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "var(--ref-space-2)",
              }}
            >
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body kodo-focus-ring"
                    style={{
                      color: "var(--sys-color-text-secondary)",
                      textDecoration: "none",
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--ref-space-3)",
            }}
          >
            {SITE_CONFIG.studios.map((studio) => (
              <div key={studio.id}>
                <p
                  className="text-body"
                  style={{ color: "var(--sys-color-text-primary)" }}
                >
                  {studio.title}
                </p>
                <p
                  className="text-caption"
                  style={{ color: "var(--sys-color-text-secondary)" }}
                >
                  {studio.street}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Patron Care & Legal Column */}
        <div>
          <p className="text-label" style={{ marginBottom: "var(--ref-space-3)" }}>
            Patron Care
          </p>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "var(--ref-space-2)",
            }}
          >
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-body kodo-focus-ring"
                  style={{
                    color: "var(--sys-color-text-secondary)",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div
        style={{
          maxWidth: "1440px",
          marginInline: "auto",
          marginTop: "var(--ref-space-10)",
          paddingTop: "var(--ref-space-4)",
          borderTop: "1px solid var(--sys-color-border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "var(--ref-space-2)",
        }}
      >
        <p className="text-caption">{SITE_CONFIG.brand.copyright}</p>
        <p className="text-caption">
          <a
            href={`mailto:${SITE_CONFIG.contact.conciergeEmail}`}
            className="kodo-focus-ring"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            {SITE_CONFIG.contact.conciergeEmail}
          </a>
        </p>
      </div>
    </footer>
  );
}
