import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { HomeClient } from "../HomeClient";
import { FooterDirectory } from "@/components/global/FooterDirectory";
import { SectionReveal } from "@/components/shared/SectionReveal";

/* ═══════════════════════════════════════════════════════════
   KODŌ — The Story Page (Server Component)
   Brand narrative with editorial spacing and poetic copy.
   ═══════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: "The Story",
  description:
    "The origin of KODŌ — where Japanese incense ceremony meets structural geometry. Discover how memory becomes architecture.",
};

export default function StoryPage() {
  return (
    <>
      <HomeClient />
      <main id="main-content" role="main">
        {/* ─── Hero Statement ─── */}
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
            Origin
          </p>
          <h1
            className="text-display"
            style={{
              fontFamily: "var(--font-editorial-display), Georgia, serif",
              marginBottom: "var(--ref-space-6)",
            }}
          >
            The Geometry{" "}
            <span style={{ color: "var(--sys-color-text-accent)" }}>
              of Memory
            </span>
          </h1>
          <p
            className="text-body-lg"
            style={{
              color: "var(--sys-color-text-secondary)",
              maxWidth: "50ch",
              marginInline: "auto",
            }}
          >
            KODŌ was born from a single question: what if scent could be
            architecture? What if the negative space between notes held as much
            meaning as the notes themselves?
          </p>
        </section>

        {/* ─── Ma Space ─── */}
        <div className="ma-space" />

        {/* ─── Chapter I: The Ancient Way ─── */}
        <SectionReveal>
        <section
          aria-label="The Ancient Way of Incense"
          style={{
            paddingInline: "var(--sys-space-page-margin)",
            maxWidth: "1440px",
            marginInline: "auto",
          }}
        >
          <div
            className="story-two-col"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "var(--ref-space-8)",
              alignItems: "center",
            }}
          >
            {/* Visual */}
            <div
              style={{
                aspectRatio: "4/5",
                backgroundColor: "var(--sys-color-surface)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(ellipse 70% 50% at 50% 50%, oklch(20% 0.02 85 / 0.15), transparent 70%)",
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
                    fontFamily:
                      "var(--font-editorial-display), Georgia, serif",
                    fontSize: "clamp(4rem, 10vw, 8rem)",
                    color: "oklch(98% 0.005 85 / 0.04)",
                    fontWeight: 300,
                    lineHeight: 1,
                  }}
                >
                  香
                </span>
              </div>
            </div>

            {/* Copy */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--ref-space-4)",
              }}
            >
              <p className="text-label">Chapter 01</p>
              <h2
                className="text-heading"
                style={{
                  fontFamily: "var(--font-editorial-display), Georgia, serif",
                }}
              >
                The Ancient Way of Incense
              </h2>
              <p
                className="text-body-lg"
                style={{
                  color: "var(--sys-color-text-secondary)",
                  maxWidth: "40ch",
                  lineHeight: "var(--ref-line-height-relaxed)",
                }}
              >
                In Muromachi-era Japan, the practice of Kōdō — &ldquo;the way
                of incense&rdquo; — elevated scent to the level of poetry and
                calligraphy. Masters would &ldquo;listen&rdquo; to fragrance
                rather than smell it, treating each composition as a spatial
                meditation.
              </p>
              <p
                className="text-body"
                style={{
                  color: "var(--sys-color-text-secondary)",
                  maxWidth: "40ch",
                }}
              >
                This listening — this deliberate attention to what unfolds in
                the negative space between notes — became the founding
                principle of our house.
              </p>
            </div>
          </div>
        </section>
        </SectionReveal>

        {/* ─── Ma Space ─── */}
        <div className="ma-space" />

        {/* ─── Chapter II: Structural Geometry ─── */}
        <SectionReveal>
        <section
          aria-label="Structural Geometry"
          style={{
            paddingInline: "var(--sys-space-page-margin)",
            maxWidth: "1440px",
            marginInline: "auto",
          }}
        >
          <div
            className="story-two-col story-two-col-reverse"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "var(--ref-space-8)",
              alignItems: "center",
            }}
          >
            {/* Copy */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--ref-space-4)",
              }}
            >
              <p className="text-label">Chapter 02</p>
              <h2
                className="text-heading"
                style={{
                  fontFamily: "var(--font-editorial-display), Georgia, serif",
                }}
              >
                Structural Geometry
              </h2>
              <p
                className="text-body-lg"
                style={{
                  color: "var(--sys-color-text-secondary)",
                  maxWidth: "40ch",
                  lineHeight: "var(--ref-line-height-relaxed)",
                }}
              >
                Each KODŌ composition begins not with a brief, but with a
                spatial diagram. Our perfumers map olfactory molecules across
                three-dimensional grids — plotting volatility against weight,
                luminosity against depth.
              </p>
              <p
                className="text-body"
                style={{
                  color: "var(--sys-color-text-secondary)",
                  maxWidth: "40ch",
                }}
              >
                The result is scent that unfolds like architecture: each layer
                reveals the next, each transition calibrated to the millimetre.
              </p>
            </div>

            {/* Visual */}
            <div
              style={{
                aspectRatio: "4/5",
                backgroundColor: "var(--sys-color-surface)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, transparent 50%, oklch(12% 0.01 260 / 0.6) 100%)",
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
                    fontFamily:
                      "var(--font-editorial-display), Georgia, serif",
                    fontSize: "clamp(4rem, 10vw, 8rem)",
                    color: "oklch(98% 0.005 85 / 0.04)",
                    fontWeight: 300,
                    lineHeight: 1,
                  }}
                >
                  構
                </span>
              </div>
            </div>
          </div>
        </section>
        </SectionReveal>

        {/* ─── Ma Space ─── */}
        <div className="ma-space" />

        {/* ─── Chapter III: Four States ─── */}
        <SectionReveal>
        <section
          aria-label="The Four States"
          style={{
            paddingInline: "var(--sys-space-page-margin)",
            maxWidth: "800px",
            marginInline: "auto",
            textAlign: "center",
          }}
        >
          <p className="text-label" style={{ marginBottom: "var(--ref-space-3)" }}>
            Chapter 03
          </p>
          <h2
            className="text-heading"
            style={{
              fontFamily: "var(--font-editorial-display), Georgia, serif",
              marginBottom: "var(--ref-space-6)",
            }}
          >
            Four States of Resin
          </h2>
          <p
            className="text-body-lg"
            style={{
              color: "var(--sys-color-text-secondary)",
              maxWidth: "50ch",
              marginInline: "auto",
              marginBottom: "var(--ref-space-6)",
              lineHeight: "var(--ref-line-height-relaxed)",
            }}
          >
            Our debut collection maps four fundamental states of matter through
            the lens of raw resin: the mineral volatility of sea salt, the
            botanical warmth of cedar, the resinous gravity of smoke, and the
            precious weight of saffron gold.
          </p>
          <p
            className="text-body"
            style={{
              color: "var(--sys-color-text-secondary)",
              maxWidth: "50ch",
              marginInline: "auto",
              marginBottom: "var(--ref-space-8)",
            }}
          >
            Each state is a meditation on transformation — the moment a
            material crosses the threshold from one form to the next.
          </p>
          <Link
            href="/collections"
            className="kodo-btn-solid kodo-focus-ring"
          >
            Explore The Collection
          </Link>
        </section>
        </SectionReveal>

        {/* ─── Ma Space ─── */}
        <div className="ma-space" />

        {/* ─── Editorial Quote ─── */}
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
            &ldquo;We do not compose perfume. We compose the silence between
            notes.&rdquo;
          </blockquote>
          <p className="text-label" style={{ marginTop: "var(--ref-space-4)" }}>
            — [Founder Name], [Role Title]
          </p>
        </section>
        </SectionReveal>
      </main>

      <FooterDirectory />

      <style>{`
        @media (max-width: 768px) {
          .story-two-col {
            grid-template-columns: 1fr !important;
          }
          .story-two-col-reverse {
            direction: ltr;
          }
        }
      `}</style>
    </>
  );
}
