import React from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { HomeClient } from "../../HomeClient";

/* ═══════════════════════════════════════════════════════════
   KODŌ — Collections Page (Server Component)
   Symmetrical product gallery with Ma spacing.
   ═══════════════════════════════════════════════════════════ */

export const metadata = {
  title: "Collections",
  description: "Browse the four states of resin — the complete KODŌ scent taxonomy.",
};

export default function CollectionsPage() {
  return (
    <>
      <HomeClient />
      <main id="main-content" role="main">
        {/* Hero Statement */}
        <section
          style={{
            paddingTop: "calc(var(--comp-nav-height) + var(--ref-space-15))",
            paddingBottom: "var(--ref-space-15)",
            paddingInline: "var(--sys-space-page-margin)",
            textAlign: "center",
            maxWidth: "800px",
            marginInline: "auto",
          }}
        >
          <p className="text-label" style={{ marginBottom: "var(--ref-space-3)" }}>
            The Complete Taxonomy
          </p>
          <h1
            className="text-display"
            style={{
              fontFamily: "var(--font-editorial-display), Georgia, serif",
              marginBottom: "var(--ref-space-4)",
            }}
          >
            Four States of Resin
          </h1>
          <p
            className="text-body-lg"
            style={{ color: "var(--sys-color-text-secondary)", maxWidth: "50ch", marginInline: "auto" }}
          >
            Each composition maps a distinct emotional frequency — from volatile
            mineral vapor to the settled weight of aged oud.
          </p>
        </section>

        {/* Product Grid */}
        <section
          aria-label="Product collection"
          style={{
            paddingInline: "var(--sys-space-page-margin)",
            maxWidth: "1440px",
            marginInline: "auto",
            paddingBottom: "var(--sys-space-section)",
          }}
        >
          <div
            className="collections-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "var(--ref-space-4)",
            }}
          >
            {PRODUCTS.map((product, index) => (
              <article key={product.id}>
                <Link
                  href={`/products/${product.slug}`}
                  className="kodo-focus-ring collections-card-link"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  {/* Image container */}
                  <div
                    className="collections-card-image"
                    style={{
                      aspectRatio: "3/4",
                      backgroundColor: "var(--sys-color-surface)",
                      position: "relative",
                      overflow: "hidden",
                      marginBottom: "var(--ref-space-3)",
                      transition: "transform var(--motion-duration-base) var(--ease-decelerate)",
                    }}
                  >
                    <div
                      className="collections-card-overlay"
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(180deg, transparent 50%, oklch(12% 0.01 260 / 0.5) 100%)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-editorial-display), Georgia, serif",
                          fontSize: "clamp(5rem, 10vw, 8rem)",
                          color: "oklch(98% 0.005 85 / 0.04)",
                          fontWeight: 300,
                          lineHeight: 1,
                        }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* Card meta */}
                  <p className="text-label" style={{ marginBottom: "4px" }}>
                    {product.family.toUpperCase()} / STATE {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2
                    style={{
                      fontFamily: "var(--font-editorial-display), Georgia, serif",
                      fontSize: "var(--ref-font-size-heading)",
                      fontWeight: 400,
                      marginBottom: "4px",
                    }}
                  >
                    {product.name}
                  </h2>
                  <p className="text-caption" style={{ marginBottom: "var(--ref-space-2)" }}>
                    {product.subtitle}
                  </p>
                  <p
                    className="text-body"
                    style={{
                      color: "var(--sys-color-text-secondary)",
                      marginBottom: "var(--ref-space-3)",
                      maxWidth: "32ch",
                    }}
                  >
                    {product.description.slice(0, 120)}…
                  </p>
                  <div style={{ display: "flex", gap: "var(--ref-space-2)", alignItems: "baseline" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                        fontSize: "var(--ref-font-size-title)",
                        fontVariantNumeric: "tabular-nums",
                        color: "var(--sys-color-text-accent)",
                      }}
                    >
                      From ${product.sizes[0].price}
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>

      <style>{`
        .collections-card-overlay {
          transition: opacity var(--motion-duration-base) var(--ease-decelerate);
        }
        .collections-card-link:hover .collections-card-image {
          transform: scale(1.02);
        }
        .collections-card-link:hover .collections-card-overlay {
          opacity: 0.6;
        }
        @media (max-width: 1024px) {
          .collections-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .collections-grid { grid-template-columns: 1fr !important; max-width: 400px; margin-inline: auto; }
        }
      `}</style>
    </>
  );
}
