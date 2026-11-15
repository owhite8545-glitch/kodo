import React from "react";
import Link from "next/link";
import { HomeClient } from "@/app/HomeClient";
import { FooterDirectory } from "@/components/global/FooterDirectory";

export interface PolicySection {
  readonly heading: string;
  readonly paragraphs: readonly string[];
}

interface PolicyDocumentProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly summary: string;
  readonly updatedAt: string;
  readonly sections: readonly PolicySection[];
}

export function PolicyDocument({
  eyebrow,
  title,
  summary,
  updatedAt,
  sections,
}: PolicyDocumentProps) {
  return (
    <>
      <HomeClient />
      <main
        id="main-content"
        role="main"
        style={{
          paddingTop: "calc(var(--comp-nav-height) + var(--ref-space-12))",
          paddingBottom: "var(--sys-space-section)",
          paddingInline: "var(--sys-space-page-margin)",
          maxWidth: "820px",
          marginInline: "auto",
        }}
      >
        <header
          style={{
            paddingBottom: "var(--ref-space-8)",
            marginBottom: "var(--ref-space-8)",
            borderBottom: "1px solid var(--sys-color-border)",
          }}
        >
          <p className="text-label" style={{ marginBottom: "var(--ref-space-2)" }}>
            {eyebrow}
          </p>
          <h1
            className="text-display"
            style={{
              fontFamily: "var(--font-editorial-display), Georgia, serif",
              marginBottom: "var(--ref-space-3)",
              fontWeight: 400,
            }}
          >
            {title}
          </h1>
          <p
            className="text-body-lg"
            style={{ color: "var(--sys-color-text-secondary)" }}
          >
            {summary}
          </p>
          <p
            className="text-caption"
            style={{
              marginTop: "var(--ref-space-3)",
              color: "var(--sys-color-text-accent)",
            }}
          >
            Last updated: {updatedAt}
          </p>
        </header>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--ref-space-8)",
          }}
        >
          {sections.map((section) => (
            <section key={section.heading}>
              <h2
                style={{
                  fontFamily: "var(--font-editorial-display), Georgia, serif",
                  fontSize: "var(--ref-font-size-title)",
                  fontWeight: 400,
                  marginBottom: "var(--ref-space-3)",
                  color: "var(--sys-color-text-primary)",
                }}
              >
                {section.heading}
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--ref-space-3)",
                }}
              >
                {section.paragraphs.map((text, idx) => (
                  <p
                    key={idx}
                    className="text-body"
                    style={{
                      color: "var(--sys-color-text-secondary)",
                      lineHeight: "var(--ref-line-height-relaxed)",
                    }}
                  >
                    {text}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div
          style={{
            marginTop: "var(--ref-space-12)",
            paddingTop: "var(--ref-space-6)",
            borderTop: "1px solid var(--sys-color-border)",
            display: "flex",
            gap: "var(--ref-space-4)",
            flexWrap: "wrap",
          }}
        >
          <Link href="/collections" className="kodo-btn-outline kodo-focus-ring">
            Explore Collection
          </Link>
          <Link href="/concierge" className="kodo-btn-solid kodo-focus-ring">
            Contact Concierge
          </Link>
        </div>
      </main>
      <FooterDirectory />
    </>
  );
}
