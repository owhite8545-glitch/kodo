import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getJournalArticleBySlug,
  getJournalPosts,
  getProductBySlug,
} from "@/data/products";
import { formatCatalogPrice } from "@/config/commerce";
import { resolveBaseUrl, SITE_CONFIG } from "@/config/site";
import { HomeClient } from "../../HomeClient";
import { FooterDirectory } from "@/components/global/FooterDirectory";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getJournalPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getJournalArticleBySlug(slug);

  if (!article) {
    return { title: "Essay Not Found" };
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | ${SITE_CONFIG.brand.fullName}`,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      images: [
        {
          url: article.image,
          alt: article.title,
        },
      ],
    },
  };
}

function formatJournalDate(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00Z`);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function JournalArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getJournalArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const baseUrl = resolveBaseUrl();
  const paragraphs = article.content.split("\n\n").filter(Boolean);
  const relatedProduct = article.relatedProductSlug
    ? getProductBySlug(article.relatedProductSlug)
    : undefined;
  const otherArticles = getJournalPosts().filter((p) => p.slug !== article.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    image: `${baseUrl}${article.image}`,
    author: {
      "@type": "Organization",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.brand.fullName,
    },
  };

  return (
    <>
      <HomeClient />
      <main
        id="main-content"
        role="main"
        style={{
          paddingTop: "calc(var(--comp-nav-height) + var(--ref-space-10))",
          paddingBottom: "var(--sys-space-section)",
          paddingInline: "var(--sys-space-page-margin)",
          maxWidth: "880px",
          marginInline: "auto",
        }}
      >
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          style={{ marginBottom: "var(--ref-space-6)" }}
        >
          <ol
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--ref-space-2)",
              listStyle: "none",
              fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
              fontSize: "var(--ref-font-size-caption)",
              color: "var(--sys-color-text-secondary)",
            }}
          >
            <li>
              <Link
                href="/"
                className="kodo-focus-ring"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/journal"
                className="kodo-focus-ring"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Journal
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li style={{ color: "var(--sys-color-text-primary)" }}>
              {article.title}
            </li>
          </ol>
        </nav>

        {/* Header */}
        <header style={{ marginBottom: "var(--ref-space-8)" }}>
          <div
            style={{
              display: "flex",
              gap: "var(--ref-space-4)",
              flexWrap: "wrap",
              alignItems: "center",
              marginBottom: "var(--ref-space-3)",
            }}
          >
            <span className="text-label">{article.category}</span>
            <span className="text-caption">{article.readTime} read</span>
            <span className="text-caption">{formatJournalDate(article.date)}</span>
          </div>

          <h1
            className="text-display"
            style={{
              fontFamily: "var(--font-editorial-display), Georgia, serif",
              marginBottom: "var(--ref-space-4)",
              fontWeight: 400,
            }}
          >
            {article.title}
          </h1>

          <p
            className="text-body-lg"
            style={{
              color: "var(--sys-color-text-secondary)",
              lineHeight: "var(--ref-line-height-relaxed)",
            }}
          >
            {article.excerpt}
          </p>
        </header>

        {/* Feature Editorial Plate */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "4 / 3",
            maxHeight: "560px",
            marginBottom: "var(--ref-space-10)",
            border: "1px solid var(--sys-color-border)",
            backgroundColor: "var(--ref-color-obsidian-50)",
            overflow: "hidden",
          }}
        >
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 880px"
            style={{ objectFit: "cover", objectPosition: "center 60%" }}
          />
        </div>

        {/* Essay Prose */}
        <article
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--ref-space-6)",
            maxWidth: "66ch",
            marginInline: "auto",
            marginBottom: "var(--ref-space-12)",
          }}
        >
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-body-lg"
              style={{
                color: "var(--sys-color-text-primary)",
                lineHeight: 1.8,
              }}
            >
              {paragraph}
            </p>
          ))}

          {article.footnotes && article.footnotes.length > 0 && (
            <aside
              aria-label="Essay notes"
              style={{
                marginTop: "var(--ref-space-4)",
                paddingTop: "var(--ref-space-6)",
                borderTop: "1px solid var(--sys-color-border)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--ref-space-2)",
              }}
            >
              <p className="text-label">Studio Notes</p>
              {article.footnotes.map((note, idx) => (
                <p
                  key={idx}
                  className="text-caption"
                  style={{ lineHeight: 1.6 }}
                >
                  [{idx + 1}] {note}
                </p>
              ))}
            </aside>
          )}
        </article>

        {/* Related Fragrance Callout */}
        {relatedProduct && (
          <section
            aria-label="Referenced fragrance"
            style={{
              padding: "var(--ref-space-6)",
              border: "1px solid var(--sys-color-border)",
              backgroundColor: "var(--sys-color-surface)",
              display: "grid",
              gridTemplateColumns: "96px 1fr auto",
              gap: "var(--ref-space-6)",
              alignItems: "center",
              marginBottom: "var(--ref-space-10)",
            }}
            className="journal-related-card"
          >
            <div
              style={{
                position: "relative",
                width: "96px",
                height: "120px",
                backgroundColor: "var(--ref-color-obsidian-20)",
              }}
            >
              <Image
                src={relatedProduct.images.pureProduct}
                alt={`KODŌ ${relatedProduct.name}`}
                fill
                sizes="96px"
                style={{ objectFit: "contain" }}
              />
            </div>

            <div>
              <p className="text-label" style={{ marginBottom: "4px" }}>
                Featured in This Study
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-editorial-display), Georgia, serif",
                  fontSize: "var(--ref-font-size-title)",
                  fontWeight: 400,
                }}
              >
                {relatedProduct.name} — {relatedProduct.subtitle}
              </h2>
              <p
                className="text-caption"
                style={{
                  color: "var(--sys-color-text-accent)",
                  marginTop: "4px",
                }}
              >
                From{" "}
                {formatCatalogPrice(
                  relatedProduct.sizes[0]?.price ?? relatedProduct.price
                )}
              </p>
            </div>

            <Link
              href={`/products/${relatedProduct.slug}`}
              className="kodo-btn-outline kodo-focus-ring"
            >
              Discover {relatedProduct.name}
            </Link>
          </section>
        )}

        {/* Continue Reading */}
        {otherArticles.length > 0 && (
          <section
            aria-label="More journal essays"
            style={{
              paddingTop: "var(--ref-space-8)",
              borderTop: "1px solid var(--sys-color-border)",
            }}
          >
            <p className="text-label" style={{ marginBottom: "var(--ref-space-4)" }}>
              Further Reading
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
                gap: "var(--ref-space-4)",
              }}
            >
              {otherArticles.map((post) => (
                <Link
                  key={post.slug}
                  href={`/journal/${post.slug}`}
                  className="kodo-focus-ring"
                  style={{
                    padding: "var(--ref-space-4)",
                    border: "1px solid var(--sys-color-border)",
                    backgroundColor: "var(--sys-color-surface)",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <p className="text-label" style={{ marginBottom: "6px" }}>
                    {post.category}
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-editorial-display), Georgia, serif",
                      fontSize: "var(--ref-font-size-title)",
                      fontWeight: 400,
                      marginBottom: "6px",
                    }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-caption">{post.readTime} read</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <FooterDirectory />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <style>{`
        @media (max-width: 640px) {
          .journal-related-card {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .journal-related-card > :first-child {
            margin-inline: auto;
          }
        }
      `}</style>
    </>
  );
}
