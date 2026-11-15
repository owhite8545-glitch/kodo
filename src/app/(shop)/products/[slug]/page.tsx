import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/data/products";
import { formatCatalogPrice } from "@/config/commerce";
import { resolveBaseUrl, SITE_CONFIG } from "@/config/site";
import { PDPClient } from "./PDPClient";
import { HeaderNav } from "@/components/global/HeaderNav";
import { MenuDrawer } from "@/components/global/MenuDrawer";
import { CartDrawer } from "@/components/global/CartDrawer";
import { FooterDirectory } from "@/components/global/FooterDirectory";
import { SectionReveal } from "@/components/shared/SectionReveal";

/* ═══════════════════════════════════════════════════════════
   KODŌ — Product Detail Page (Server Component)
   Fetches product data by slug, generates dynamic metadata
   and JSON-LD Product schema, then delegates interaction
   to the PDPClient leaf component.
   ═══════════════════════════════════════════════════════════ */

interface PageProps {
  params: Promise<{ slug: string }>;
}

/* ── Static Path Pre-generation ────────────────────────── */
export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

/* ── Dynamic Metadata Generation ───────────────────────── */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} — ${product.subtitle}`,
    description: product.description,
    openGraph: {
      title: `${product.name} — ${product.subtitle} | KODŌ Fragrances`,
      description: product.description,
      images: [
        {
          url: product.images.socialOg,
          width: product.ogDimensions.width,
          height: product.ogDimensions.height,
          alt: `KODŌ ${product.name} Eau de Parfum`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — ${product.subtitle} | KODŌ`,
      description: product.description,
      images: [product.images.socialOg],
    },
  };
}

/* ── Page Component (RSC) ──────────────────────────────── */
export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const baseUrl = resolveBaseUrl();
  const relatedProducts = getRelatedProducts(product.slug, 3);

  /* JSON-LD Product Schema */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.name} — ${product.subtitle}`,
    image: `${baseUrl}${product.images.pureProduct}`,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: SITE_CONFIG.brand.name,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: Math.min(...product.sizes.map((s) => s.price)),
      highPrice: Math.max(...product.sizes.map((s) => s.price)),
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      offerCount: product.sizes.length,
    },
  };

  return (
    <>
      <HeaderNav />
      <MenuDrawer />
      <CartDrawer />

      <main id="main-content">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="pdp-breadcrumb"
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            paddingTop: "calc(var(--comp-nav-height) + var(--ref-space-4))",
            paddingBottom: "var(--ref-space-3)",
            paddingInline: "var(--sys-space-page-margin)",
          }}
        >
          <ol
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--ref-space-1)",
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            <li>
              <Link
                href="/"
                className="kodo-focus-ring breadcrumb-link"
                style={{
                  color: "var(--sys-color-text-secondary)",
                  textDecoration: "none",
                  fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                  fontSize: "var(--ref-font-size-caption)",
                  letterSpacing: "var(--ref-letter-spacing-ultra)",
                  textTransform: "uppercase",
                  transition: "color 240ms var(--ease-decelerate)",
                }}
              >
                Home
              </Link>
            </li>
            <li
              aria-hidden="true"
              style={{
                color: "var(--sys-color-text-secondary)",
                fontSize: "var(--ref-font-size-caption)",
              }}
            >
              /
            </li>
            <li>
              <Link
                href="/collections"
                className="kodo-focus-ring breadcrumb-link"
                style={{
                  color: "var(--sys-color-text-secondary)",
                  textDecoration: "none",
                  fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                  fontSize: "var(--ref-font-size-caption)",
                  letterSpacing: "var(--ref-letter-spacing-ultra)",
                  textTransform: "uppercase",
                  transition: "color 240ms var(--ease-decelerate)",
                }}
              >
                Collection
              </Link>
            </li>
            <li
              aria-hidden="true"
              style={{
                color: "var(--sys-color-text-secondary)",
                fontSize: "var(--ref-font-size-caption)",
              }}
            >
              /
            </li>
            <li aria-current="page">
              <span
                style={{
                  color: "var(--sys-color-text-primary)",
                  fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                  fontSize: "var(--ref-font-size-caption)",
                  letterSpacing: "var(--ref-letter-spacing-ultra)",
                  textTransform: "uppercase",
                }}
              >
                {product.name}
              </span>
            </li>
          </ol>
        </nav>

        {/* Product Detail Layout: Split Panel */}
        <section
          aria-labelledby="product-title"
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "0 var(--ref-space-4) var(--ref-space-15)",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "var(--ref-space-6)",
          }}
          className="pdp-grid"
        >
          {/* Left Column: Product Image Gallery */}
          <SectionReveal>
            <div
              className="pdp-media-column"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--ref-space-6)",
              }}
            >
              {[
                {
                  src: product.images.hero,
                  alt: `KODŌ ${product.name} Eau de Parfum`,
                  label: `01 · Editorial Presence`,
                  priority: true,
                },
                {
                  src: product.images.detail,
                  alt: `KODŌ ${product.name} Eau de Parfum — Detail`,
                  label: `02 · Vessel & Joinery Detail`,
                  priority: false,
                },
                {
                  src: product.images.scale,
                  alt: `KODŌ ${product.name} scale study beside ${product.scaleReference}`,
                  label: `03 · Scale Context — ${product.scaleReference}`,
                  priority: false,
                },
              ].map((plate) => (
                <figure
                  key={plate.label}
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "3 / 4",
                    backgroundColor: "var(--ref-color-obsidian-20)",
                    border: "1px solid var(--sys-color-border)",
                    overflow: "hidden",
                    margin: 0,
                  }}
                >
                  <Image
                    src={plate.src}
                    alt={plate.alt}
                    fill
                    priority={plate.priority}
                    loading="eager"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 60vw"
                    style={{ objectFit: "cover" }}
                  />
                  <figcaption
                    style={{
                      position: "absolute",
                      left: "16px",
                      bottom: "16px",
                      padding: "6px 12px",
                      backgroundColor: "oklch(12% 0.01 260 / 0.82)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      border: "1px solid oklch(82% 0.06 85 / 0.25)",
                      fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                      fontSize: "10px",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--sys-color-text-primary)",
                    }}
                  >
                    {plate.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </SectionReveal>

          {/* Right Column: Sticky Interactive Client Component (Direct Grid Child for Sticky Positioning) */}
          <div className="pdp-info-column">
            <SectionReveal className="kodo-reveal--delay-1">
              <PDPClient product={product} />
            </SectionReveal>
          </div>
        </section>

        {/* Companion States Exploration */}
        {relatedProducts.length > 0 && (
          <SectionReveal>
            <section
              aria-label="Companion fragrances"
              style={{
                maxWidth: "1440px",
                margin: "0 auto",
                padding:
                  "var(--ref-space-12) var(--sys-space-page-margin) var(--sys-space-section)",
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
                    Companion Explorations
                  </p>
                  <h2
                    style={{
                      fontFamily:
                        "var(--font-editorial-display), Georgia, serif",
                      fontSize: "var(--ref-font-size-heading)",
                      fontWeight: 400,
                    }}
                  >
                    Other States of Resin
                  </h2>
                </div>
                <Link
                  href="/collections"
                  className="text-caption kodo-focus-ring"
                  style={{
                    color: "var(--sys-color-text-accent)",
                    textDecoration: "none",
                  }}
                >
                  View Full Collection &rarr;
                </Link>
              </div>

              <div className="pdp-related-grid">
                {relatedProducts.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/products/${rel.slug}`}
                    className="kodo-focus-ring pdp-related-card"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      textDecoration: "none",
                      color: "inherit",
                      border: "1px solid var(--sys-color-border)",
                      backgroundColor: "var(--sys-color-surface)",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        aspectRatio: "3 / 4",
                        backgroundColor: "#09090b",
                        borderBottom: "1px solid var(--sys-color-border)",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={rel.images.pureProduct}
                        alt={`KODŌ ${rel.name} Eau de Parfum`}
                        fill
                        sizes="(max-width: 767px) 100vw, 33vw"
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    <div
                      style={{
                        padding: "var(--ref-space-4)",
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        gap: "var(--ref-space-1)",
                      }}
                    >
                      <p className="text-label">{rel.family}</p>
                      <h3
                        style={{
                          fontFamily:
                            "var(--font-editorial-display), Georgia, serif",
                          fontSize: "var(--ref-font-size-title)",
                          fontWeight: 400,
                          marginBottom: "var(--ref-space-2)",
                        }}
                      >
                        {rel.name} — {rel.subtitle}
                      </h3>
                      <p
                        className="text-caption"
                        style={{
                          color: "var(--sys-color-text-accent)",
                          marginTop: "auto",
                        }}
                      >
                        From {formatCatalogPrice(rel.sizes[0]?.price ?? rel.price)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </SectionReveal>
        )}
      </main>

      <FooterDirectory />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: baseUrl,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Collection",
                item: `${baseUrl}/collections`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: `${product.name} — ${product.subtitle}`,
                item: `${baseUrl}/products/${product.slug}`,
              },
            ],
          }),
        }}
      />

      {/* Scoped PDP Grid Styles */}
      <style>{`
        .pdp-related-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: var(--ref-space-6);
        }
        @media (max-width: 767px) {
          .pdp-related-grid {
            grid-template-columns: minmax(0, 1fr);
          }
        }
        @media (min-width: 768px) {
          .pdp-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: var(--ref-space-12) !important;
            align-items: start !important;
          }
          .pdp-info-column {
            position: sticky;
            top: calc(var(--comp-nav-height) + var(--ref-space-6));
          }
        }
        @media (min-width: 1024px) {
          .pdp-breadcrumb {
            padding-left: var(--ref-space-12) !important;
            padding-right: var(--ref-space-12) !important;
          }
          .pdp-grid {
            grid-template-columns: 7fr 5fr !important;
            padding-left: var(--ref-space-12) !important;
            padding-right: var(--ref-space-12) !important;
          }
        }
        .breadcrumb-link:hover {
          color: var(--sys-color-text-primary) !important;
        }
      `}</style>
    </>
  );
}
