import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/data/products";
import { SITE_CONFIG } from "@/config/site";
import { HomeClient } from "./HomeClient";
import { FooterDirectory } from "@/components/global/FooterDirectory";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { HeroFlacon } from "@/components/shared/HeroFlacon";
import { HeroStage } from "@/components/shared/HeroStage";

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
        {/* ─── ACT I: Hero Section (Phase B.1.2 Refined Composition + Chiaroscuro) ─── */}
        <HeroStage>
          {/* Customized Brutalist Concrete Portal (Ma · 間) Backdrop */}
          <div aria-hidden="true" className="hero-ma-stage">
            <Image
              src="/images/editorial/philosophy-ma.jpg"
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 100vw, 66vw"
              className="hero-ma-image"
            />
            <div className="hero-ma-scrim" />
            <div className="hero-ma-frame-line" />
            <span className="hero-ma-seal">間</span>
          </div>

          {/* Atmospheric breathing gradient background (masked cleanly before hero fold) */}
          <div
            aria-hidden="true"
            className="hero-ambient-halo"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 70% 55% at 55% 45%, oklch(24% 0.03 85 / 0.35), transparent 75%)",
              WebkitMaskImage:
                "linear-gradient(180deg, black 0%, black 70%, transparent 100%)",
              maskImage:
                "linear-gradient(180deg, black 0%, black 70%, transparent 100%)",
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
                {/* 1. Brand Eyebrow (150ms–750ms) */}
                <p
                  className="text-label hero-eyebrow"
                  style={{
                    marginBottom: "var(--ref-space-3)",
                    opacity: 0,
                    animation:
                      "heroEyebrowReveal 600ms var(--ease-cinematic) 150ms forwards",
                  }}
                >
                  {SITE_CONFIG.brand.heroEyebrow}
                </p>

                {/* 2. Architectural Masked Staged Headline (300ms–1300ms) */}
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
                      {SITE_CONFIG.brand.heroTitleLine1}
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
                      {SITE_CONFIG.brand.heroTitleLine2}
                    </span>
                  </span>
                </h1>

                {/* 3. Concrete Supporting Line (700ms–1400ms) */}
                <p
                  className="text-body-lg hero-supporting-copy"
                  style={{
                    color: "var(--sys-color-text-secondary)",
                    opacity: 0,
                    animation:
                      "heroFadeSlideUp 700ms var(--ease-cinematic) 700ms forwards",
                  }}
                >
                  {SITE_CONFIG.brand.heroSubtitle}
                </p>

                {/* 4. Primary & Secondary CTAs (850ms–1550ms) */}
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

          {/* 5. Scroll Beacon (1000ms–1600ms) */}
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
        </HeroStage>

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
                className="bento-card kodo-focus-ring"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  textDecoration: "none",
                  color: "inherit",
                  border: "1px solid var(--sys-color-border)",
                  backgroundColor: "var(--sys-color-surface)",
                  transition:
                    "transform 300ms var(--ease-cinematic), border-color 300ms var(--ease-cinematic)",
                }}
              >
                {/* Card Image */}
                <div
                  className="bento-card-media"
                  style={{
                    aspectRatio: "3/4",
                    backgroundColor: "#09090b",
                    borderBottom: "1px solid var(--sys-color-border)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={product.images.pureProduct}
                    alt={`KODŌ ${product.name} Eau de Parfum`}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    style={{
                      objectFit: "contain",
                      transition: "transform 480ms var(--ease-cinematic)",
                    }}
                  />
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, transparent 60%, oklch(14% 0.01 260 / 0.8) 100%)",
                      pointerEvents: "none",
                    }}
                  />
                </div>

                {/* Card Text */}
                <div
                  style={{
                    padding: "var(--ref-space-4) var(--ref-space-3)",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                  }}
                >
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
                      marginBottom: "var(--ref-space-3)",
                    }}
                  >
                    {product.subtitle}
                  </p>
                  <div
                    style={{
                      marginTop: "auto",
                      paddingTop: "var(--ref-space-2)",
                      borderTop: "1px solid var(--sys-color-border)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "var(--font-utility-sans), system-ui, sans-serif",
                        fontSize: "var(--ref-font-size-caption)",
                        color: "var(--sys-color-text-accent)",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      From ${product.sizes[0].price}
                    </span>
                    <span
                      className="text-label"
                      style={{ fontSize: "0.6875rem", opacity: 0.72 }}
                    >
                      Discover &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        </SectionReveal>

        {/* ─── Ma Space ─── */}
        <div className="ma-space" />

        {/* ─── ACT IV: Craft Ritual & International Sanctuaries ─── */}
        <SectionReveal>
        <section
          aria-label="Kōdō craft philosophy and sanctuaries"
          style={{
            paddingInline: "var(--sys-space-page-margin)",
            maxWidth: "1440px",
            marginInline: "auto",
          }}
        >
          <div className="homepage-atelier-split">
            <div
              style={{
                position: "relative",
                aspectRatio: "3/4",
                backgroundColor: "var(--sys-color-surface)",
                border: "1px solid var(--sys-color-border)",
                overflow: "hidden",
              }}
            >
              <Image
                src="/images/editorial/kodo-ritual.jpg"
                alt="Traditional Japanese Kōdō ceramic censer warming aged agarwood resin on a mica plate over white ash"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                style={{ objectFit: "cover" }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--ref-space-4)",
              }}
            >
              <p className="text-label">Artisanal Discipline</p>
              <h2
                className="text-display"
                style={{
                  fontFamily: "var(--font-editorial-display), Georgia, serif",
                  fontWeight: 400,
                }}
              >
                Listening to Incense
              </h2>
              <p
                className="text-body-lg"
                style={{
                  color: "var(--sys-color-text-secondary)",
                  maxWidth: "44ch",
                  lineHeight: "var(--ref-line-height-relaxed)",
                }}
              >
                In the centuries-old ritual of Kōdō, scent is not smelled—it is
                heard in silence. Each KODŌ extrait matures in heavy dark
                borosilicate before release, balancing smoky hinoki bark, raw
                fossilized amber, and architectural negative space.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "var(--ref-space-3)",
                  flexWrap: "wrap",
                  marginTop: "var(--ref-space-2)",
                }}
              >
                <Link
                  href="/story"
                  className="kodo-btn-solid kodo-focus-ring"
                  style={{ textDecoration: "none" }}
                >
                  Read Our Story
                </Link>
                <Link
                  href="/journal"
                  className="kodo-btn-outline kodo-focus-ring"
                  style={{ textDecoration: "none" }}
                >
                  House Journal
                </Link>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "var(--ref-space-15)",
              paddingTop: "var(--ref-space-12)",
              borderTop: "1px solid var(--sys-color-border)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                flexWrap: "wrap",
                gap: "var(--ref-space-3)",
                marginBottom: "var(--ref-space-8)",
              }}
            >
              <div>
                <p className="text-label" style={{ marginBottom: "6px" }}>
                  Two Sanctuaries
                </p>
                <h2
                  className="text-heading"
                  style={{
                    fontFamily: "var(--font-editorial-display), Georgia, serif",
                    fontWeight: 400,
                  }}
                >
                  Tokyo &amp; Paris Ateliers
                </h2>
              </div>
              <Link
                href="/about"
                className="text-caption kodo-focus-ring"
                style={{
                  color: "var(--sys-color-text-accent)",
                  textDecoration: "none",
                }}
              >
                Visit the Studios &rarr;
              </Link>
            </div>

            <div className="homepage-studios-grid">
              {SITE_CONFIG.studios.map((studio) => (
                <Link
                  key={studio.id}
                  href="/about"
                  className="bento-card kodo-focus-ring"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    textDecoration: "none",
                    color: "inherit",
                    border: "1px solid var(--sys-color-border)",
                    backgroundColor: "var(--sys-color-surface)",
                    transition:
                      "transform 300ms var(--ease-cinematic), border-color 300ms var(--ease-cinematic)",
                  }}
                >
                  <div
                    className="bento-card-media"
                    style={{
                      position: "relative",
                      aspectRatio: "16/9",
                      backgroundColor: "#0a0a0c",
                      borderBottom: "1px solid var(--sys-color-border)",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={studio.image}
                      alt={studio.imageAlt}
                      fill
                      sizes="(max-width: 767px) 100vw, 50vw"
                      style={{
                        objectFit: "cover",
                        transition: "transform 480ms var(--ease-cinematic)",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      padding: "var(--ref-space-6)",
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                    }}
                  >
                    <p className="text-label" style={{ marginBottom: "4px" }}>
                      {studio.district} · {studio.region}
                    </p>
                    <h3
                      style={{
                        fontFamily:
                          "var(--font-editorial-display), Georgia, serif",
                        fontSize: "var(--ref-font-size-title)",
                        fontWeight: 400,
                        marginBottom: "6px",
                      }}
                    >
                      {studio.title}
                    </h3>
                    <p
                      className="text-caption"
                      style={{
                        color: "var(--sys-color-text-secondary)",
                        marginBottom: "var(--ref-space-4)",
                      }}
                    >
                      {studio.street}, {studio.cityPostal}
                    </p>
                    <p
                      className="text-caption"
                      style={{
                        color: "var(--sys-color-text-accent)",
                        marginTop: "auto",
                        paddingTop: "var(--ref-space-2)",
                        borderTop: "1px solid var(--sys-color-border)",
                      }}
                    >
                      {studio.hours}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        </SectionReveal>

        {/* ─── Ma Space ─── */}
        <div className="ma-space" />

        {/* ─── ACT V: Spatial Philosophy (Ma) & Editorial Statement ─── */}
        <SectionReveal>
        <section
          aria-label="Brand philosophy — The Architecture of Ma"
          style={{
            paddingInline: "var(--sys-space-page-margin)",
            maxWidth: "1200px",
            marginInline: "auto",
            paddingBottom: "var(--sys-space-section)",
          }}
        >
          <div className="homepage-ma-split">
            {/* Philosophy Copy & Statement */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--ref-space-4)",
              }}
            >
              <p className="text-label">Spatial Philosophy · Ma</p>
              <blockquote
                style={{
                  fontFamily: "var(--font-editorial-display), Georgia, serif",
                  fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                  lineHeight: "var(--ref-line-height-tight)",
                  color: "var(--sys-color-text-primary)",
                  fontStyle: "italic",
                  fontWeight: 400,
                }}
              >
                &ldquo;{SITE_CONFIG.brand.philosophyQuote}&rdquo;
              </blockquote>
              <p
                className="text-body"
                style={{
                  color: "var(--sys-color-text-secondary)",
                  maxWidth: "42ch",
                  lineHeight: "var(--ref-line-height-relaxed)",
                }}
              >
                In Japanese spatial tradition, <em>Ma</em> (間) honors the pause
                between notes—allowing light, shadow, and raw resin to hold form
                without noise.
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "var(--ref-space-4)",
                  marginTop: "var(--ref-space-2)",
                  paddingTop: "var(--ref-space-4)",
                  borderTop: "1px solid var(--sys-color-border)",
                }}
              >
                <p className="text-label">
                  {SITE_CONFIG.brand.philosophyAttribution}
                </p>
                <Link
                  href="/story"
                  className="text-caption kodo-focus-ring"
                  style={{
                    color: "var(--sys-color-text-accent)",
                    textDecoration: "none",
                  }}
                >
                  Explore the Philosophy &rarr;
                </Link>
              </div>
            </div>

            {/* Framed Raw Resin & Concrete Light Plate */}
            <div
              className="homepage-ma-frame"
              style={{
                position: "relative",
                aspectRatio: "4/5",
                width: "100%",
                backgroundColor: "var(--sys-color-surface)",
                border: "1px solid var(--sys-color-border)",
                overflow: "hidden",
              }}
            >
              <Image
                src="/images/editorial/hero-amber.jpg"
                alt="Monolithic concrete chamber illuminated by an amber ray resting upon raw fossilized resin"
                fill
                sizes="(max-width: 768px) 100vw, 460px"
                style={{ objectFit: "cover", objectPosition: "52% 62%" }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, transparent 70%, oklch(8% 0.01 260 / 0.45) 100%)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>
        </section>
        </SectionReveal>
      </main>

      <FooterDirectory />

      <style>{`
        /* ─── Hero Asymmetric Editorial Layout ─── */
        .hero-ma-stage {
          position: absolute;
          top: calc(var(--comp-nav-height) + var(--ref-space-2));
          right: clamp(16px, 3vw, 48px);
          bottom: var(--ref-space-4);
          width: clamp(540px, 58vw, 820px);
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
          opacity: 0;
          animation: heroPortalUnveil 1300ms var(--ease-cinematic) 0ms forwards;
          will-change: opacity, transform;
        }

        .hero-ma-image {
          object-fit: cover;
          object-position: 56% 52%;
          opacity: 0.68;
          filter: contrast(1.08) brightness(0.86);
        }

        .hero-ma-scrim {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, var(--sys-color-bg) 0%, oklch(12% 0.01 260 / 0.72) 22%, transparent 52%, transparent 90%, var(--sys-color-bg) 100%),
            linear-gradient(180deg, var(--sys-color-bg) 0%, transparent 16%, transparent 82%, var(--sys-color-bg) 100%);
          pointer-events: none;
        }

        .hero-ma-frame-line {
          position: absolute;
          top: 12%;
          right: 12px;
          bottom: 12px;
          width: 42%;
          border-right: 1px solid oklch(82% 0.075 85 / calc(0.12 + 0.22 * var(--hero-active, 0)));
          border-bottom: 1px solid oklch(82% 0.075 85 / calc(0.12 + 0.22 * var(--hero-active, 0)));
          -webkit-mask-image: linear-gradient(135deg, transparent 35%, black 85%);
          mask-image: linear-gradient(135deg, transparent 35%, black 85%);
          pointer-events: none;
        }

        .hero-ma-seal {
          position: absolute;
          bottom: 24px;
          right: 28px;
          font-family: var(--font-editorial-display), Georgia, serif;
          font-size: clamp(1.35rem, 2vw, 1.85rem);
          line-height: 1;
          color: oklch(88% 0.045 85 / calc(0.76 + 0.20 * var(--hero-active, 0)));
          letter-spacing: 0.04em;
          pointer-events: none;
          user-select: none;
          opacity: 0;
          animation: heroEyebrowReveal 700ms var(--ease-cinematic) 950ms forwards;
        }

        .hero-cta-group .kodo-btn-solid:hover {
          box-shadow: 0 4px 24px -2px oklch(76% 0.08 85 / 0.28) !important;
        }

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

        @keyframes heroPortalUnveil {
          0% {
            opacity: 0;
            transform: scale3d(1.04, 1.04, 1);
          }
          100% {
            opacity: 1;
            transform: scale3d(1, 1, 1);
          }
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

        /* ─── Homepage Craft Split, Sanctuaries & Hover ─── */
        .homepage-atelier-split {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: var(--ref-space-12);
          align-items: center;
        }
        .homepage-ma-split {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: var(--ref-space-12);
          align-items: center;
        }
        .homepage-ma-frame {
          max-width: 480px;
          margin-inline: auto;
        }
        .homepage-studios-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: var(--ref-space-6);
        }
        .bento-card:hover {
          border-color: var(--sys-color-border-active) !important;
          transform: translateY(-4px);
        }
        .bento-card:hover .bento-card-media img {
          transform: scale(1.03);
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
          .homepage-atelier-split,
          .homepage-ma-split {
            grid-template-columns: 1fr 1fr;
            gap: var(--ref-space-8);
          }
        }

        @media (max-width: 767px) {
          .hero-ma-stage {
            top: var(--comp-nav-height);
            right: 0;
            left: 0;
            bottom: 0;
            width: 100%;
          }

          .hero-ma-image {
            object-position: 62% 52%;
            opacity: 0.44;
          }

          .hero-ma-scrim {
            background:
              linear-gradient(180deg, var(--sys-color-bg) 0%, oklch(12% 0.01 260 / 0.62) 34%, oklch(12% 0.01 260 / 0.36) 66%, var(--sys-color-bg) 100%),
              linear-gradient(90deg, oklch(12% 0.01 260 / 0.55) 0%, transparent 25%, transparent 75%, oklch(12% 0.01 260 / 0.55) 100%);
          }

          .hero-ma-frame-line {
            display: none;
          }

          .hero-ma-seal {
            bottom: 28px;
            right: 20px;
            font-size: 1.2rem;
            z-index: 2;
          }

          .hero-editorial-grid {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: var(--ref-space-5) !important;
            min-height: auto !important;
            padding-top: var(--ref-space-2) !important;
            padding-bottom: var(--ref-space-4) !important;
          }

          .hero-typography-plane {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }

          .hero-main-heading {
            font-size: clamp(2.125rem, 7.5vw, 2.75rem) !important;
            line-height: 1.12 !important;
            margin-bottom: 12px !important;
          }

          .hero-flacon-wrapper {
            width: clamp(180px, 46vw, 240px) !important;
            margin-inline: auto !important;
          }

          .hero-supporting-copy {
            font-size: 0.9375rem !important;
            line-height: 1.55 !important;
            max-width: 34ch !important;
            margin-inline: auto !important;
            margin-bottom: var(--ref-space-4) !important;
          }

          .hero-cta-group {
            width: 100% !important;
            justify-content: center !important;
            gap: 10px !important;
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
          .homepage-atelier-split,
          .homepage-ma-split,
          .homepage-studios-grid {
            grid-template-columns: 1fr !important;
            gap: var(--ref-space-6) !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-ambient-halo {
            animation: none !important;
            opacity: 0.7 !important;
          }
          .hero-ma-stage,
          .hero-ma-seal,
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
