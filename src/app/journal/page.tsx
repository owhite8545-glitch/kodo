import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getJournalPosts } from "@/data/products";
import { SITE_CONFIG } from "@/config/site";
import { HomeClient } from "../HomeClient";
import { FooterDirectory } from "@/components/global/FooterDirectory";
import { SectionReveal } from "@/components/shared/SectionReveal";

export const metadata = {
  title: "Journal",
  description:
    "Editorial reflections on scent minimalism, Japanese incense craft, and olfactory architecture.",
};

function formatJournalDate(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00Z`);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function JournalPage() {
  const posts = getJournalPosts();

  return (
    <>
      <HomeClient />
      <main id="main-content" role="main">
        {/* Hero */}
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
            Essays &amp; Reflections
          </p>
          <h1
            className="text-display"
            style={{
              fontFamily: "var(--font-editorial-display), Georgia, serif",
              marginBottom: "var(--ref-space-4)",
            }}
          >
            The Journal
          </h1>
          <p
            className="text-body-lg"
            style={{
              color: "var(--sys-color-text-secondary)",
              maxWidth: "48ch",
              marginInline: "auto",
            }}
          >
            Long-form meditations on scent, material, and the invisible
            architecture that connects them.
          </p>
        </section>

        {/* Journal Articles */}
        <SectionReveal>
          <section
            aria-label="Editorial essays"
            style={{
              paddingInline: "var(--sys-space-page-margin)",
              maxWidth: "1100px",
              marginInline: "auto",
              paddingBottom: "var(--sys-space-section)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--ref-space-8)",
              }}
            >
              {posts.map((post, idx) => (
                <article
                  key={post.slug}
                  className="journal-card"
                  style={{
                    border: "1px solid var(--sys-color-border)",
                    background: "var(--sys-color-surface)",
                    overflow: "hidden",
                  }}
                >
                  <Link
                    href={`/journal/${post.slug}`}
                    className="journal-card-link kodo-focus-ring"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "320px 1fr",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        minHeight: "240px",
                        backgroundColor: "var(--ref-color-obsidian-50)",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 320px"
                        style={{ objectFit: "cover" }}
                      />
                      <span
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          top: "14px",
                          left: "16px",
                          padding: "4px 10px",
                          backgroundColor: "oklch(12% 0.01 260 / 0.78)",
                          border: "1px solid var(--sys-color-border)",
                          fontFamily:
                            "var(--font-editorial-display), Georgia, serif",
                          fontSize: "0.875rem",
                          color: "var(--sys-color-text-accent)",
                        }}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div
                      style={{
                        padding: "var(--ref-space-8)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        gap: "var(--ref-space-4)",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: "var(--ref-space-2)",
                            marginBottom: "var(--ref-space-2)",
                          }}
                        >
                          <span className="text-label">{post.category}</span>
                          <span className="text-caption">{post.readTime} read</span>
                        </div>
                        <h2
                          style={{
                            fontFamily:
                              "var(--font-editorial-display), Georgia, serif",
                            fontSize: "var(--ref-font-size-heading)",
                            marginBottom: "var(--ref-space-2)",
                            fontWeight: 400,
                          }}
                        >
                          {post.title}
                        </h2>
                        <p
                          className="text-body"
                          style={{
                            color: "var(--sys-color-text-secondary)",
                            lineHeight: "var(--ref-line-height-relaxed)",
                          }}
                        >
                          {post.excerpt}
                        </p>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: "var(--ref-space-3)",
                          paddingTop: "var(--ref-space-3)",
                          borderTop: "1px solid var(--sys-color-border)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "var(--ref-space-4)",
                            alignItems: "center",
                          }}
                        >
                          <span className="text-caption">{post.author}</span>
                          <span className="text-caption">
                            {formatJournalDate(post.date)}
                          </span>
                        </div>
                        <span
                          className="text-caption"
                          style={{ color: "var(--sys-color-text-accent)" }}
                        >
                          Read Essay &rarr;
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </SectionReveal>

        {/* Quote Block */}
        <SectionReveal>
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
              &ldquo;Every material carries its own memory. Our work is simply
              to listen.&rdquo;
            </blockquote>
            <p className="text-label" style={{ marginTop: "var(--ref-space-4)" }}>
              — {SITE_CONFIG.brand.name} Journal, 2026
            </p>
          </section>
        </SectionReveal>
      </main>
      <FooterDirectory />

      <style>{`
        .journal-card-link {
          transition: border-color var(--motion-duration-fast);
        }
        .journal-card:hover {
          border-color: var(--sys-color-border-active);
        }
        @media (max-width: 768px) {
          .journal-card-link {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
