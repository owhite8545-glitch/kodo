import React from "react";
import type { Metadata } from "next";
import { JOURNAL_POSTS } from "@/data/products";
import { HomeClient } from "../HomeClient";
import { FooterDirectory } from "@/components/global/FooterDirectory";

/* ═══════════════════════════════════════════════════════════
   KODŌ — Journal Page (Server Component)
   Editorial essays on scent, material, and spatial design.
   ═══════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Essays on olfactory minimalism, raw materials, and the spatial philosophy behind KODŌ fragrances.",
};

export default function JournalPage() {
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
            Essays &amp; Reflections
          </p>
          <h1
            className="text-display"
            style={{
              fontFamily: "var(--font-editorial-display), Georgia, serif",
              marginBottom: "var(--ref-space-6)",
            }}
          >
            The{" "}
            <span style={{ color: "var(--sys-color-text-accent)" }}>
              Journal
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
            Long-form meditations on scent, material, and the invisible
            architecture that connects them.
          </p>
        </section>

        {/* ─── Journal Entries ─── */}
        <section
          aria-label="Journal entries"
          style={{
            paddingInline: "var(--sys-space-page-margin)",
            maxWidth: "1440px",
            marginInline: "auto",
            paddingBottom: "var(--sys-space-section)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--ref-space-1)",
            }}
          >
            {JOURNAL_POSTS.map((post, index) => (
              <article
                key={post.slug}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr",
                  gap: "var(--ref-space-6)",
                  padding: "var(--ref-space-8) 0",
                  borderBottom: "1px solid var(--sys-color-border)",
                  alignItems: "start",
                }}
                className="journal-entry"
              >
                {/* Image */}
                <div
                  style={{
                    aspectRatio: "16/10",
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
                        fontFamily:
                          "var(--font-editorial-display), Georgia, serif",
                        fontSize: "clamp(3rem, 6vw, 5rem)",
                        color: "oklch(98% 0.005 85 / 0.04)",
                        fontWeight: 300,
                        lineHeight: 1,
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--ref-space-3)",
                    paddingTop: "var(--ref-space-1)",
                  }}
                >
                  <div style={{ display: "flex", gap: "var(--ref-space-3)", alignItems: "center" }}>
                    <p className="text-label">{post.category}</p>
                    <span className="text-caption">·</span>
                    <span className="text-caption">{post.readTime} read</span>
                  </div>

                  <h2
                    style={{
                      fontFamily:
                        "var(--font-editorial-display), Georgia, serif",
                      fontSize: "var(--ref-font-size-heading)",
                      fontWeight: 400,
                      lineHeight: "var(--ref-line-height-tight)",
                    }}
                  >
                    {post.title}
                  </h2>

                  <p
                    className="text-body-lg"
                    style={{
                      color: "var(--sys-color-text-secondary)",
                      maxWidth: "50ch",
                      lineHeight: "var(--ref-line-height-relaxed)",
                    }}
                  >
                    {post.excerpt}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      gap: "var(--ref-space-3)",
                      alignItems: "center",
                      marginTop: "var(--ref-space-2)",
                    }}
                  >
                    <span className="text-caption">{post.author}</span>
                    <span className="text-caption">·</span>
                    <span className="text-caption">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ─── Editorial Statement ─── */}
        <section
          aria-label="Editorial statement"
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
            &ldquo;Every material carries its own memory. Our work is simply to
            listen.&rdquo;
          </blockquote>
          <p className="text-label" style={{ marginTop: "var(--ref-space-4)" }}>
            — KODŌ Journal, 2026
          </p>
        </section>
      </main>

      <FooterDirectory />

      <style>{`
        @media (max-width: 768px) {
          .journal-entry {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
