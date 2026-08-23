import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/data/products";
import { HomeClient } from "./HomeClient";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { HeroFlacon } from "@/components/shared/HeroFlacon";

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
        {/* ─── ACT I: Hero Section (Phase B.1.2 Refined Composition) ─── */}
        <section
          aria-label="KODŌ Brand Introduction"
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            paddingTop: "calc(var(--comp-nav-height) + var(--ref-space-2))",
            paddingBottom: "var(--ref-space-8)",
            overflow: "hidden",
          }}
        >
          {/* Atmospheric breathing gradient background */}
          <div
            aria-hidden="true"
            className="hero-ambient-halo"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 70% 55% at 55% 45%, oklch(24% 0.03 85 / 0.35), transparent 75%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              paddingInline: "var(--sys-space-page-margin)",
              maxWidth: "1280px",
              width: "100%",
              marginInline: "auto",
            }}
          >
            {/* Editorial Off-Axis Asymmetric Grid */}
            <div className="hero-editorial-grid">
              {/* Primary Typography Anchor Plane */}
              <div className="hero-typography-plane">
                {/* 1. Brand Eyebrow (150ms–400ms) */}
                <p
                  className="text-label hero-eyebrow"
                  style={{
                    marginBottom: "var(--ref-space-3)",
                    opacity: 0,
                    animation:
                      "heroEyebrowReveal 600ms var(--ease-cinematic) 150ms forwards",
                  }}
                >
                  KODŌ — Olfactory Architecture
                </p>

                {/* 2. Masked Staged Headline (300ms–900ms) */}
                <h1
                  className="text-hero hero-main-heading"
                  style={{
                    fontFamily: "var(--font-editorial-display), Georgia, serif",
                    fontWeight: 400,
                    letterSpacing: "var(--ref-letter-spacing-display)",
                    lineHeight: "var(--ref-line-height-tight)",
                    marginBottom: "var(--ref-space-4)",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      overflow: "hidden",
                      paddingBottom: "3px",
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        opacity: 0,
                        animation:
                          "heroLineReveal 850ms var(--ease-cinematic) 300ms forwards",
                      }}
                    >
                      Where Scent Becomes
                    </span>
                  </span>
                  <span
                    style={{
                      display: "block",
                      overflow: "hidden",
                      paddingBottom: "3px",
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        color: "var(--sys-color-text-accent)",
                        opacity: 0,
                        animation:
                          "heroLineReveal 850ms var(--ease-cinematic) 450ms forwards",
                      }}
                    >
                      Architecture
                    </span>
                  </span>
                </h1>

                {/* 3. Concrete Supporting Line (700ms–1100ms) */}
                <p
                  className="text-body-lg hero-supporting-copy"
                  style={{
                    color: "var(--sys-color-text-secondary)",
                    opacity: 0,
                    animation:
                      "heroFadeSlideUp 700ms var(--ease-cinematic) 700ms forwards",
                  }}
                >
                  Four architectural distillations in hand-blown borosilicate
                  flacons. Composed in the tradition of Japanese craft.
                </p>

                {/* 4. Primary & Secondary CTAs (850ms–1250ms) */}
                <div
                  className="hero-cta-group"
                  style={{
                    display: "flex",
                    gap: "var(--ref-space-4)",
                    alignItems: "center",
                    flexWrap: "wrap",
                    opacity: 0,
                    animation:
                      "heroFadeSlideUp 700ms var(--ease-cinematic) 850ms forwards",
                  }}
                >
                  <Link
                    href="/collections"
                    className="kodo-btn-solid kodo-focus-ring"
                    style={{
                      textDecoration: "none",
                      minHeight: "var(--ref-touch-target)",
                      boxShadow: "0 2px 16px -2px oklch(76% 0.08 85 / 0.15)",
                    }}
                  >
                    Explore The States
                  </Link>
                  <Link
                    href="/story"
                    className="kodo-btn-outline kodo-focus-ring"
                    style={{
                      textDecoration: "none",
                      minHeight: "var(--ref-touch-target)",
                    }}
                  >
                    The Story
                  </Link>
                </div>
              </div>

              {/* Secondary Physical Anchor: Flacon Showcase Plane (450ms–1200ms) */}
              <div className="hero-flacon-plane">
                <HeroFlacon
                  imageSrc={PRODUCTS[0].images.pureProduct}
                  alt="KODŌ Borosilicate Flacon — SŌ"
                />
              </div>
            </div>
          </div>

          {/* 5. Scroll Beacon (1000ms–1400ms) */}
          <div
            aria-hidden="true"
            className="hero-scroll-beacon"
            style={{
              position: "absolute",
              bottom: "var(--ref-space-4)",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "var(--ref-space-1)",
              opacity: 0,
              animation:
                "heroFadeSlideUp 600ms var(--ease-cinematic) 1000ms forwards",
            }}
          >
            <span
              className="text-caption"
              style={{
                letterSpacing: "var(--ref-letter-spacing-label)",
                textTransform: "uppercase",
                fontSize: "var(--ref-font-size-small)",
                opacity: 0.7,
              }}
            >
              Scroll
            </span>
            <div
              style={{
                width: 1,
                height: 24,
                backgroundColor: "var(--sys-color-text-accent)",
                opacity: 0.4,
              }}
            />
          </div>
        </section>

        {/* ─── Ma Space — Negative Breathing ─── */}
        <div className="ma-space" />

        {/* ─── ACT II: Asymmetric Product Showcase ─── */}
        <SectionReveal>
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
              <Image
                src={PRODUCTS[0].images.hero}
                alt={`KODŌ ${PRODUCTS[0].name} Eau de Parfum`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "contain" }}
              />
              {/* Atmospheric gradient overlay */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, transparent 50%, oklch(12% 0.01 260 / 0.6) 100%)",
                  pointerEvents: "none",
                }}
              />
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
                  className="kodo-btn-solid kodo-focus-ring"
                >
                  Discover {PRODUCTS[0].name}
                </Link>
              </div>
            </div>
          </div>
        </section>
        </SectionReveal>

        {/* ─── Ma Space ─── */}
        <div className="ma-space" />

        {/* ─── ACT III: Bento Grid — The Four States ─── */}
        <SectionReveal>
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
                  <Image
                    src={product.images.pureProduct}
                    alt={`KODŌ ${product.name} Eau de Parfum`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    style={{ objectFit: "contain" }}
                  />
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, transparent 60%, oklch(12% 0.01 260 / 0.5) 100%)",
                      pointerEvents: "none",
                    }}
                  />
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
        </SectionReveal>

        {/* ─── Ma Space ─── */}
        <div className="ma-space" />

        {/* ─── Editorial Statement ─── */}
        <SectionReveal>
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
        </SectionReveal>
      </main>

      <style>{`
        /* ─── Hero Asymmetric Editorial Layout ─── */
        .hero-editorial-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          align-items: center;
          gap: var(--ref-space-8);
          min-height: calc(100vh - var(--comp-nav-height) - var(--ref-space-12));
          padding-block: var(--ref-space-4);
        }

        .hero-typography-plane {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          max-width: 640px;
          z-index: 2;
        }

        .hero-main-heading {
          font-size: clamp(3rem, 4.8vw + 0.5rem, 5.5rem) !important;
        }

        .hero-supporting-copy {
          max-width: 40ch;
          margin-bottom: var(--ref-space-6);
          line-height: var(--ref-line-height-relaxed);
        }

        .hero-flacon-plane {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .hero-flacon-wrapper {
          width: clamp(280px, 26vw, 380px) !important;
          opacity: 0;
          animation: heroBottleUnveil 1100ms var(--ease-cinematic) 450ms forwards;
          will-change: transform, opacity;
        }

        @keyframes heroLineReveal {
          0% {
            opacity: 0;
            transform: translate3d(0, 110%, 0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes heroEyebrowReveal {
          0% {
            opacity: 0;
            transform: translate3d(0, 12px, 0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes heroBottleUnveil {
          0% {
            opacity: 0;
            transform: translate3d(0, 30px, 0) scale3d(0.93, 0.93, 1);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
          }
        }

        @keyframes heroFadeSlideUp {
          0% {
            opacity: 0;
            transform: translate3d(0, 16px, 0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes heroHaloBreath {
          0% {
            opacity: 0.45;
            transform: scale3d(0.96, 0.96, 1);
          }
          100% {
            opacity: 0.8;
            transform: scale3d(1.04, 1.04, 1);
          }
        }

        .hero-ambient-halo {
          animation: heroHaloBreath 10s ease-in-out infinite alternate;
          will-change: opacity, transform;
        }

        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translate3d(0, var(--motion-reveal-distance), 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* ─── Breakpoints ─── */
        @media (max-width: 1024px) {
          .hero-editorial-grid {
            grid-template-columns: 1fr 1fr;
            gap: var(--ref-space-6);
            min-height: calc(100vh - var(--comp-nav-height) - var(--ref-space-16));
          }
          .hero-main-heading {
            font-size: clamp(2.5rem, 4.5vw, 3.75rem) !important;
          }
          .hero-flacon-wrapper {
            width: clamp(230px, 32vw, 300px) !important;
          }
          .bento-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 768px) {
          .hero-editorial-grid {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 0 !important;
            min-height: auto !important;
            padding-top: var(--ref-space-2) !important;
            padding-bottom: var(--ref-space-6) !important;
          }

          .hero-typography-plane {
            display: contents !important;
          }

          .hero-eyebrow {
            order: 1 !important;
            margin-bottom: 6px !important;
            font-size: var(--ref-font-size-small) !important;
          }

          .hero-main-heading {
            order: 2 !important;
            font-size: clamp(2rem, 6.2vw, 2.5rem) !important;
            line-height: 1.15 !important;
            margin-bottom: 8px !important;
          }

          .hero-flacon-plane {
            order: 3 !important;
            margin-block: 6px 10px !important;
          }

          .hero-flacon-wrapper {
            width: clamp(140px, 36vw, 190px) !important;
            margin-inline: auto !important;
          }

          .hero-supporting-copy {
            order: 4 !important;
            font-size: 0.8125rem !important;
            line-height: 1.45 !important;
            max-width: 32ch !important;
            margin-inline: auto !important;
            margin-bottom: 12px !important;
          }

          .hero-cta-group {
            order: 5 !important;
            width: 100% !important;
            display: flex !important;
            flex-direction: row !important;
            justify-content: center !important;
            gap: 8px !important;
            margin-top: 0 !important;
          }

          .hero-cta-group > a {
            flex: 1 1 auto !important;
            max-width: 165px !important;
            height: 44px !important;
            padding-inline: 12px !important;
            font-size: 0.6875rem !important;
          }

          .hero-scroll-beacon {
            display: none !important;
          }

          .bento-grid {
            grid-template-columns: 1fr !important;
            max-width: 400px;
            margin-inline: auto;
          }
          .homepage-asymmetric {
            grid-template-columns: 1fr !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-ambient-halo {
            animation: none !important;
            opacity: 0.7 !important;
          }
          .hero-flacon-wrapper {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
          [style*="heroLineReveal"],
          [style*="heroEyebrowReveal"],
          [style*="heroFadeSlideUp"],
          [style*="heroBottleUnveil"],
          [style*="fadeSlideUp"] {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </>
  );
}
