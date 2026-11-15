import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HomeClient } from "../HomeClient";
import { FooterDirectory } from "@/components/global/FooterDirectory";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { SITE_CONFIG } from "@/config/site";

export const metadata = {
  title: "The Story",
  description:
    "The philosophy and heritage of KODŌ — from ancient Japanese Kōdō incense rituals to architectural perfumery.",
};

export default function StoryPage() {
  const leadMaker = SITE_CONFIG.team[0];

  return (
    <>
      <HomeClient />
      <main id="main-content" role="main">
        {/* Hero Headline */}
        <section
          style={{
            paddingTop: "calc(var(--comp-nav-height) + var(--ref-space-15))",
            paddingBottom: "var(--ref-space-15)",
            paddingInline: "var(--sys-space-page-margin)",
            textAlign: "center",
            maxWidth: "850px",
            marginInline: "auto",
          }}
        >
          <p className="text-label" style={{ marginBottom: "var(--ref-space-3)" }}>
            The Heritage
          </p>
          <h1
            className="text-display"
            style={{
              fontFamily: "var(--font-editorial-display), Georgia, serif",
              marginBottom: "var(--ref-space-4)",
            }}
          >
            {SITE_CONFIG.brand.tagline}
          </h1>
          <p
            className="text-body-lg"
            style={{
              color: "var(--sys-color-text-secondary)",
              maxWidth: "52ch",
              marginInline: "auto",
            }}
          >
            Kōdō (香道) — The Way of Fragrance — is one of Japan&apos;s three
            classical arts of refinement, alongside the tea ceremony and flower
            arrangement.
          </p>
        </section>

        {/* Chapter 1 */}
        <SectionReveal>
          <section
            style={{
              paddingInline: "var(--sys-space-page-margin)",
              maxWidth: "1100px",
              marginInline: "auto",
              marginBottom: "var(--sys-space-section)",
            }}
          >
            <div className="story-split">
              <div>
                <p className="text-label" style={{ marginBottom: "var(--ref-space-2)" }}>
                  Chapter 01
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-editorial-display), Georgia, serif",
                    fontSize: "var(--ref-font-size-heading)",
                    marginBottom: "var(--ref-space-4)",
                  }}
                >
                  The Ancient Way of Incense
                </h2>
                <p
                  className="text-body"
                  style={{
                    color: "var(--sys-color-text-secondary)",
                    lineHeight: "var(--ref-line-height-relaxed)",
                    marginBottom: "var(--ref-space-3)",
                  }}
                >
                  In the Muromachi period of the 15th century, nobles gathered in
                  low-lit listening rooms not to &ldquo;smell&rdquo; incense, but
                  to &ldquo;listen&rdquo; to it — mon-kō (聞香). A tiny shaving
                  of agarwood was heated gently over a mica plate resting on white
                  ash.
                </p>
                <p
                  className="text-body"
                  style={{
                    color: "var(--sys-color-text-secondary)",
                    lineHeight: "var(--ref-line-height-relaxed)",
                  }}
                >
                  This ritual transformed scent from a fleeting ornament into an
                  exercise of profound concentration — a sensory dialogue
                  between material, fire, and silence.
                </p>
              </div>
              <div
                style={{
                  aspectRatio: "4/5",
                  position: "relative",
                  overflow: "hidden",
                  background: "var(--sys-color-surface)",
                  border: "1px solid var(--sys-color-border)",
                }}
              >
                <Image
                  src="/images/editorial/kodo-ritual.jpg"
                  alt="Traditional Japanese Kōdō raku incense burner with aged agarwood resting on a mica plate over white ash"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    right: "20px",
                    fontFamily: "var(--font-editorial-display), Georgia, serif",
                    fontSize: "2.25rem",
                    color: "var(--ref-color-alabaster-98)",
                    opacity: 0.72,
                    textShadow: "0 2px 12px oklch(0% 0 0 / 0.8)",
                  }}
                >
                  香道
                </span>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* Chapter 2 */}
        <SectionReveal>
          <section
            style={{
              paddingInline: "var(--sys-space-page-margin)",
              maxWidth: "1100px",
              marginInline: "auto",
              marginBottom: "var(--sys-space-section)",
            }}
          >
            <div className="story-split story-split--reverse">
              <div
                style={{
                  aspectRatio: "4/5",
                  position: "relative",
                  overflow: "hidden",
                  background: "var(--sys-color-surface)",
                  border: "1px solid var(--sys-color-border)",
                }}
              >
                <Image
                  src="/images/editorial/philosophy-ma.jpg"
                  alt="Circular monolithic stone threshold framing shadow and negative space (Ma)"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    right: "20px",
                    fontFamily: "var(--font-editorial-display), Georgia, serif",
                    fontSize: "2.25rem",
                    color: "var(--ref-color-alabaster-98)",
                    opacity: 0.72,
                    textShadow: "0 2px 12px oklch(0% 0 0 / 0.8)",
                  }}
                >
                  間
                </span>
              </div>
              <div>
                <p className="text-label" style={{ marginBottom: "var(--ref-space-2)" }}>
                  Chapter 02
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-editorial-display), Georgia, serif",
                    fontSize: "var(--ref-font-size-heading)",
                    marginBottom: "var(--ref-space-4)",
                  }}
                >
                  Olfactory Architecture
                </h2>
                <p
                  className="text-body"
                  style={{
                    color: "var(--sys-color-text-secondary)",
                    lineHeight: "var(--ref-line-height-relaxed)",
                    marginBottom: "var(--ref-space-3)",
                  }}
                >
                  Modern perfumery often pursues volume over restraint. KODŌ
                  applies the spatial discipline of contemporary Japanese
                  architecture: negative space (Ma) is treated as an active
                  ingredient alongside wood, resin, and mineral distillates.
                </p>
                <p
                  className="text-body"
                  style={{
                    color: "var(--sys-color-text-secondary)",
                    lineHeight: "var(--ref-line-height-relaxed)",
                  }}
                >
                  Every flacon is hand-blown in heavy-walled borosilicate glass,
                  eliminating external label noise so light, shadow, and time
                  remain visible through the liquid itself.
                </p>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* Chapter 3: Material Maceration Visual + Philosophy Quote */}
        <SectionReveal>
          <section
            style={{
              paddingInline: "var(--sys-space-page-margin)",
              maxWidth: "1100px",
              marginInline: "auto",
              marginBottom: "var(--ref-space-15)",
            }}
          >
            <div className="story-split">
              <div>
                <p className="text-label" style={{ marginBottom: "var(--ref-space-2)" }}>
                  Chapter 03
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-editorial-display), Georgia, serif",
                    fontSize: "var(--ref-font-size-heading)",
                    marginBottom: "var(--ref-space-4)",
                  }}
                >
                  Slow Resin &amp; Patina
                </h2>
                <p
                  className="text-body"
                  style={{
                    color: "var(--sys-color-text-secondary)",
                    lineHeight: "var(--ref-line-height-relaxed)",
                    marginBottom: "var(--ref-space-3)",
                  }}
                >
                  True resinous depth cannot be rushed. Fossilized Baltic amber,
                  kiln-aged hinoki bark, and wild mountain labdanum rest ninety
                  days in dark borosilicate demijohns before a single flacon is
                  filled.
                </p>
                <p
                  className="text-body"
                  style={{
                    color: "var(--sys-color-text-secondary)",
                    lineHeight: "var(--ref-line-height-relaxed)",
                  }}
                >
                  The resulting 22% to 26% Extrait concentrations unfold across
                  ten hours without sharp alcohol projection—a private architecture
                  resting close to warmth.
                </p>
              </div>
              <div
                style={{
                  aspectRatio: "4/5",
                  position: "relative",
                  overflow: "hidden",
                  background: "var(--sys-color-surface)",
                  border: "1px solid var(--sys-color-border)",
                }}
              >
                <Image
                  src="/images/editorial/raw-material.jpg"
                  alt="Raw translucent golden amber resin resting atop dark charred agarwood bark"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    right: "20px",
                    fontFamily: "var(--font-editorial-display), Georgia, serif",
                    fontSize: "2.25rem",
                    color: "var(--ref-color-alabaster-98)",
                    opacity: 0.72,
                    textShadow: "0 2px 12px oklch(0% 0 0 / 0.8)",
                  }}
                >
                  琥珀
                </span>
              </div>
            </div>
          </section>
        </SectionReveal>

        <SectionReveal>
          <section
            style={{
              paddingInline: "var(--sys-space-page-margin)",
              maxWidth: "800px",
              marginInline: "auto",
              textAlign: "center",
              paddingBottom: "var(--sys-space-section)",
            }}
          >
            <p className="text-label" style={{ marginBottom: "var(--ref-space-3)" }}>
              Studio Ethos
            </p>
            <blockquote
              style={{
                fontFamily: "var(--font-editorial-display), Georgia, serif",
                fontSize: "var(--ref-font-size-heading)",
                lineHeight: "var(--ref-line-height-tight)",
                color: "var(--sys-color-text-primary)",
                fontStyle: "italic",
                marginBottom: "var(--ref-space-4)",
              }}
            >
              &ldquo;Perfume is not decoration for the skin; it is an invisible
              room we invite the world into.&rdquo;
            </blockquote>
            <p className="text-caption" style={{ marginBottom: "var(--ref-space-8)" }}>
              — {leadMaker.name}, {leadMaker.role}
            </p>
            <Link
              href="/collections"
              className="kodo-btn-solid kodo-focus-ring"
              style={{ textDecoration: "none" }}
            >
              Discover the Collection
            </Link>
          </section>
        </SectionReveal>
      </main>
      <FooterDirectory />

      <style>{`
        .story-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--ref-space-12);
          align-items: center;
        }
        @media (max-width: 767px) {
          .story-split { grid-template-columns: 1fr; gap: var(--ref-space-6); }
          .story-split--reverse > :first-child { order: 2; }
        }
      `}</style>
    </>
  );
}
