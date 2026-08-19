import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getProductBySlug, getAllProducts } from "@/data/products";
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

  /* JSON-LD Product Schema — spec lines 6793–6816 */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.name} — ${product.subtitle}`,
    image: `https://kodo-fragrances.com${product.images.pureProduct}`,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "KODŌ",
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
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding:
              "var(--ref-space-12) var(--ref-space-4) var(--ref-space-2)",
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
            {/* Primary Hero Editorial View */}
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "3 / 4",
                backgroundColor: "var(--ref-color-obsidian-20)",
                overflow: "hidden",
              }}
            >
              <Image
                src={product.images.hero}
                alt={`KODŌ ${product.name} Eau de Parfum`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 60vw"
                style={{ objectFit: "contain" }}
              />
            </div>

            {/* Close-up / Macro Detail View */}
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "3 / 4",
                backgroundColor: "var(--ref-color-obsidian-20)",
                overflow: "hidden",
              }}
            >
              <Image
                src={product.images.detail}
                alt={`KODŌ ${product.name} Eau de Parfum — Detail`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 60vw"
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
          </SectionReveal>

          {/* Right Column: Interactive Client Component */}
          <SectionReveal className="kodo-reveal--delay-1">
          <div className="pdp-info-column">
            <PDPClient product={product} />
          </div>
          </SectionReveal>
        </section>
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
                item: "https://kodo-fragrances.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Collection",
                item: "https://kodo-fragrances.com/collections",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: `${product.name} — ${product.subtitle}`,
                item: `https://kodo-fragrances.com/products/${product.slug}`,
              },
            ],
          }),
        }}
      />

      {/* Scoped PDP Grid Styles */}
      <style>{`
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
