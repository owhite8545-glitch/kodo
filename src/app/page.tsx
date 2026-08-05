import React from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { HomeClient } from "./HomeClient";

/* ═══════════════════════════════════════════════════════════
   KODŌ — Homepage (Server Component)
   Act I: Cinematic hero section with poetic tagline
   Act II: Asymmetric product showcase
   Act III: Bento Grid gallery — The Four States of Resin
   ═══════════════════════════════════════════════════════════ */

export default function HomePage() {
  return (
    <>
      <HomeClient />

      <main id="main-content" role="main">
        {/* ─── ACT I: Hero Section ─── */}
        <section
          aria-label="KODŌ Brand Introduction"
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            paddingTop: "var(--comp-nav-height)",
            paddingBottom: "var(--ref-space-15)",
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          {/* Atmospheric gradient background */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 80% 60% at 50% 40%, oklch(20% 0.02 85 / 0.3), transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              paddingInline: "var(--sys-space-page-margin)",
              maxWidth: "900px",
            }}
          >
            <p
              className="text-label"
              style={{
                marginBottom: "var(--ref-space-6)",
                opacity: 0,
                animation: "fadeSlideUp 600ms var(--ease-cinematic) 300ms forwards",
              }}
            >
              The Geometry of Memory
            </p>

            <h1
              className="text-hero"
              style={{
                fontFamily: "var(--font-editorial-display), Georgia, serif",
                marginBottom: "var(--ref-space-8)",
                opacity: 0,
                animation: "fadeSlideUp 800ms var(--ease-cinematic) 500ms forwards",
              }}
            >
              Where Scent Becomes
              <br />
              <span style={{ color: "var(--sys-color-text-accent)" }}>Architecture</span>
            </h1>

            <p
              className="text-body-lg"
              style={{
                maxWidth: "38ch",
                marginInline: "auto",
                color: "var(--sys-color-text-secondary)",
                opacity: 0,
                animation: "fadeSlideUp 600ms var(--ease-cinematic) 700ms forwards",
              }}
            >
              Four distillations. Each a meditation on raw material and empty
              space. Composed in the tradition of Japanese craft.
            </p>

            <div
              style={{
                marginTop: "var(--ref-space-12)",
                display: "flex",
                gap: "var(--ref-space-4)",
                justifyContent: "center",
                flexWrap: "wrap",
                opacity: 0,
                animation: "fadeSlideUp 600ms var(--ease-cinematic) 900ms forwards",
              }}
            >
              <Link
                href="/collections"
                className="kodo-focus-ring"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "var(--comp-button-height-secondary)",
                  padding: "0 var(--ref-space-6)",
                  backgroundColor: "var(--ref-color-alabaster-98)",
                  color: "var(--ref-color-obsidian-10)",
                  fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                  fontSize: "var(--ref-font-size-caption)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "var(--ref-letter-spacing-sans)",
                  textDecoration: "none",
                  transition: "transform 150ms var(--ease-fluid-spring)",
                }}
              >
                Explore The States
              </Link>
              <Link
                href="/story"
                className="kodo-focus-ring"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "var(--comp-button-height-secondary)",
                  padding: "0 var(--ref-space-4)",
                  backgroundColor: "transparent",
                  color: "var(--sys-color-text-primary)",
                  fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                  fontSize: "var(--ref-font-size-caption)",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "var(--ref-letter-spacing-sans)",
                  textDecoration: "none",
                  border: "1px solid var(--sys-color-border)",
                  transition: "background-color 150ms var(--ease-decelerate)",
                }}
              >
                The Story
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "var(--ref-space-8)",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "var(--ref-space-1)",
              opacity: 0,
              animation: "fadeSlideUp 600ms var(--ease-cinematic) 1200ms forwards",
            }}
          >
            <span className="text-caption">Scroll</span>
            <div
              style={{
                width: 1,
                height: 32,
                backgroundColor: "var(--sys-color-text-accent)",
                opacity: 0.4,
                animation: "scrollPulse 2s ease-in-out infinite",
              }}
            />
          </div>
        </section>

        {/* ─── Ma Space — Negative Breathing ─── */}
        <div className="ma-space" />

        {/* ─── ACT II: Asymmetric Product Showcase ─── */}
        <section
          aria-label="Featured Scent"
          style={{
            paddingInline: "var(--sys-space-page-margin)",
            maxWidth: "1440px",
            marginInline: "auto",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "var(--ref-space-8)",
              alignItems: "center",
            }}
            className="homepage-asymmetric"
          >
            {/* Left: Product Visual */}
            <div
              style={{
                aspectRatio: "3/4",
                backgroundColor: "var(--sys-color-surface)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Atmospheric gradient overlay */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, transparent 50%, oklch(12% 0.01 260 / 0.6) 100%)",
                }}
              />
              {/* Centered product number */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-editorial-display), Georgia, serif",
                    fontSize: "clamp(6rem, 15vw, 12rem)",
                    color: "oklch(98% 0.005 85 / 0.04)",
                    fontWeight: 300,
                    lineHeight: 1,
                  }}
                >
                  01
                </span>
              </div>
            </div>

            {/* Right: Editorial Copy */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--ref-space-4)",
              }}
            >
              <p className="text-label">Featured State</p>
              <h2
                className="text-display"
                style={{
                  fontFamily: "var(--font-editorial-display), Georgia, serif",
                }}
              >
                {PRODUCTS[0].name}
              </h2>
              <p
                className="text-body-lg"
                style={{
                  color: "var(--sys-color-text-secondary)",
                  maxWidth: "40ch",
                }}
              >
                {PRODUCTS[0].description}
              </p>
              <div style={{ display: "flex", gap: "var(--ref-space-3)", alignItems: "center" }}>
                <span
                  style={{
                    fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                    fontSize: "var(--ref-font-size-title)",
                    fontVariantNumeric: "tabular-nums",
                    color: "var(--sys-color-text-accent)",
                  }}
                >
                  ${PRODUCTS[0].price}
                </span>
                <span className="text-caption">{PRODUCTS[0].size}</span>
              </div>
              <div style={{ marginTop: "var(--ref-space-2)" }}>
                <Link
                  href={`/products/${PRODUCTS[0].slug}`}
                  className="kodo-focus-ring"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "var(--comp-button-height-primary)",
                    padding: "0 var(--ref-space-6)",
                    backgroundColor: "var(--ref-color-alabaster-98)",
                    color: "var(--ref-color-obsidian-10)",
                    fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                    fontSize: "var(--ref-font-size-caption)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "var(--ref-letter-spacing-sans)",
                    textDecoration: "none",
                    transition: "transform 150ms var(--ease-fluid-spring)",
                  }}
                >
                  Discover {PRODUCTS[0].name}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Ma Space ─── */}
        <div className="ma-space" />

        {/* ─── ACT III: Bento Grid — The Four States ─── */}
        <section
          aria-label="The Four States of Resin"
          style={{
            paddingInline: "var(--sys-space-page-margin)",
            maxWidth: "1440px",
            marginInline: "auto",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "var(--ref-space-12)" }}>
            <p className="text-label" style={{ marginBottom: "var(--ref-space-3)" }}>
              The Collection
            </p>
            <h2
              className="text-heading"
              style={{
                fontFamily: "var(--font-editorial-display), Georgia, serif",
              }}
            >
              Four States of Resin
            </h2>
          </div>

          <div
            className="bento-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "var(--ref-space-3)",
            }}
          >
            {PRODUCTS.map((product, index) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="kodo-focus-ring"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "transform 300ms var(--ease-cinematic)",
                }}
              >
                {/* Card Image */}
                <div
                  style={{
                    aspectRatio: "3/4",
                    backgroundColor: "var(--sys-color-surface)",
                    position: "relative",
                    overflow: "hidden",
                    marginBottom: "var(--ref-space-3)",
                  }}
                >
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, transparent 60%, oklch(12% 0.01 260 / 0.5) 100%)",
                    }}
                  />
                  {/* Display number */}
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
                        fontSize: "clamp(4rem, 8vw, 6rem)",
                        color: "oklch(98% 0.005 85 / 0.04)",
                        fontWeight: 300,
                        lineHeight: 1,
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Card Text */}
                <div style={{ padding: "0 var(--ref-space-1)" }}>
                  <p className="text-label" style={{ marginBottom: "4px" }}>
                    State {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-editorial-display), Georgia, serif",
                      fontSize: "var(--ref-font-size-title)",
                      fontWeight: 400,
                      marginBottom: "4px",
                    }}
                  >
                    {product.name}
                  </h3>
                  <p
                    className="text-caption"
                    style={{
                      marginBottom: "var(--ref-space-1)",
                    }}
                  >
                    {product.subtitle}
                  </p>
                  <span
                    style={{
                      fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                      fontSize: "var(--ref-font-size-caption)",
                      color: "var(--sys-color-text-accent)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    From ${product.sizes[0].price}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ─── Ma Space ─── */}
        <div className="ma-space" />

        {/* ─── Editorial Statement ─── */}
        <section
          aria-label="Brand philosophy"
          style={{
            paddingInline: "var(--sys-space-page-margin)",
            maxWidth: "800px",
            marginInline: "auto",
            textAlign: "center",
            paddingBottom: "var(--sys-space-section)",
          }}
        >
          <blockquote
            style={{
              fontFamily: "var(--font-editorial-display), Georgia, serif",
              fontSize: "var(--ref-font-size-heading)",
              lineHeight: "var(--ref-line-height-tight)",
              color: "var(--sys-color-text-secondary)",
              fontStyle: "italic",
            }}
          >
            &ldquo;In the spaces between notes, the architecture of memory is
            revealed.&rdquo;
          </blockquote>
          <p className="text-label" style={{ marginTop: "var(--ref-space-4)" }}>
            — KODŌ Studio, 2026
          </p>
        </section>
      </main>

      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translate3d(0, 16px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.2; transform: scaleY(0.6); }
          50% { opacity: 0.6; transform: scaleY(1); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 1024px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .bento-grid {
            grid-template-columns: 1fr !important;
            max-width: 400px;
            margin-inline: auto;
          }
          .homepage-asymmetric {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
