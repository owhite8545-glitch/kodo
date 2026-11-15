import React from "react";
import { getAllProducts } from "@/data/products";
import { HomeClient } from "../../HomeClient";
import { FooterDirectory } from "@/components/global/FooterDirectory";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { CollectionsGallery } from "./CollectionsGallery";

export const metadata = {
  title: "Collections",
  description:
    "Browse the four states of resin — the complete KODŌ scent taxonomy.",
};

export default function CollectionsPage() {
  const products = getAllProducts();

  return (
    <>
      <HomeClient />
      <main id="main-content" role="main">
        {/* Hero Statement */}
        <section
          style={{
            paddingTop: "calc(var(--comp-nav-height) + var(--ref-space-15))",
            paddingBottom: "var(--ref-space-12)",
            paddingInline: "var(--sys-space-page-margin)",
            textAlign: "center",
            maxWidth: "800px",
            marginInline: "auto",
          }}
        >
          <p className="text-label" style={{ marginBottom: "var(--ref-space-3)" }}>
            The Complete Taxonomy
          </p>
          <h1
            className="text-display"
            style={{
              fontFamily: "var(--font-editorial-display), Georgia, serif",
              marginBottom: "var(--ref-space-4)",
            }}
          >
            Four States of Resin
          </h1>
          <p
            className="text-body-lg"
            style={{
              color: "var(--sys-color-text-secondary)",
              maxWidth: "50ch",
              marginInline: "auto",
            }}
          >
            Each composition maps a distinct emotional frequency — from volatile
            mineral vapor to the settled weight of aged oud.
          </p>
        </section>

        {/* Product Gallery & Filtering */}
        <SectionReveal>
          <section
            aria-label="Product collection"
            style={{
              paddingInline: "var(--sys-space-page-margin)",
              maxWidth: "1440px",
              marginInline: "auto",
              paddingBottom: "var(--sys-space-section)",
            }}
          >
            <CollectionsGallery products={products} />
          </section>
        </SectionReveal>
      </main>

      <FooterDirectory />

      <style>{`
        .collections-card-overlay {
          transition: opacity var(--motion-duration-base) var(--ease-decelerate);
        }
        .collections-card-link:hover .collections-card-image {
          transform: scale(1.02);
        }
        .collections-card-link:hover .collections-card-overlay {
          opacity: 0.6;
        }
        @media (max-width: 1024px) {
          .collections-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 768px) {
          .collections-grid { grid-template-columns: minmax(0, 1fr) !important; max-width: 400px; margin-inline: auto; }
        }
      `}</style>
    </>
  );
}
