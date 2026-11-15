"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatCatalogPrice } from "@/config/commerce";
import type { ScentProduct } from "@/types/webgl";

type SortKey = "curated" | "price-asc" | "price-desc";

interface CollectionsGalleryProps {
  products: readonly ScentProduct[];
}

function summarizeDescription(text: string, maxLength = 104): string {
  const sentences = text.split(/(?<=[.!?])\s+/);
  const excerpt = sentences[0] ?? text;

  if (excerpt.length < 56 && sentences[1]) {
    const combined = `${excerpt} ${sentences[1]}`;
    if (combined.length <= maxLength) {
      return combined;
    }
  }

  if (excerpt.length <= maxLength) {
    return excerpt;
  }

  const trimmed = excerpt.slice(0, maxLength - 1);
  const lastSpace = trimmed.lastIndexOf(" ");
  return `${(lastSpace > 40 ? trimmed.slice(0, lastSpace) : trimmed).replace(/[.,;:—-]+$/, "")}…`;
}

export function CollectionsGallery({ products }: CollectionsGalleryProps) {
  const [selectedFamily, setSelectedFamily] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortKey>("curated");

  const families = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.family)));
    return ["all", ...unique];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const filtered =
      selectedFamily === "all"
        ? [...products]
        : products.filter((p) => p.family === selectedFamily);

    if (sortBy === "price-asc") {
      return [...filtered].sort(
        (a, b) => (a.sizes[0]?.price ?? a.price) - (b.sizes[0]?.price ?? b.price)
      );
    }
    if (sortBy === "price-desc") {
      return [...filtered].sort(
        (a, b) => (b.sizes[0]?.price ?? b.price) - (a.sizes[0]?.price ?? a.price)
      );
    }
    return filtered;
  }, [products, selectedFamily, sortBy]);

  return (
    <div>
      {/* Minimal Filter & Sort Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "var(--ref-space-4)",
          paddingBottom: "var(--ref-space-6)",
          marginBottom: "var(--ref-space-8)",
          borderBottom: "1px solid var(--sys-color-border)",
        }}
      >
        <div
          role="group"
          aria-label="Filter collection by olfactory family"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--ref-space-2)",
          }}
        >
          {families.map((family) => {
            const active = selectedFamily === family;
            return (
              <button
                key={family}
                type="button"
                onClick={() => setSelectedFamily(family)}
                aria-pressed={active}
                className="kodo-btn-utility kodo-focus-ring"
                style={{
                  minHeight: "44px",
                  paddingInline: "14px",
                  border: active
                    ? "1px solid var(--sys-color-text-accent)"
                    : "1px solid var(--sys-color-border)",
                  color: active
                    ? "var(--sys-color-text-accent)"
                    : "var(--sys-color-text-secondary)",
                }}
              >
                {family === "all" ? "All States" : family}
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--ref-space-2)" }}>
          <label
            htmlFor="collections-sort"
            className="text-caption"
            style={{ textTransform: "uppercase", letterSpacing: "var(--ref-letter-spacing-wide)" }}
          >
            Sort
          </label>
          <select
            id="collections-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="kodo-select kodo-focus-ring"
            style={{
              height: "44px",
              minWidth: "188px",
              padding: "0 16px",
              lineHeight: "42px",
              backgroundColor: "var(--sys-color-surface)",
              border: "1px solid var(--sys-color-border)",
              fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
              fontSize: "var(--ref-font-size-small)",
              letterSpacing: "var(--ref-letter-spacing-wide)",
              textTransform: "uppercase",
            }}
          >
            <option value="curated">Curated Order</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div
        className="collections-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "var(--ref-space-4)",
          alignItems: "stretch",
        }}
      >
        {filteredProducts.map((product) => {
          const stateNumber = products.findIndex((p) => p.id === product.id) + 1;
          const startingPrice = product.sizes[0]?.price ?? product.price;
          const signatureAccords = [
            product.notes.top[0],
            product.notes.heart[0],
            product.notes.base[0],
          ]
            .filter(Boolean)
            .join(" · ");
          const volumesLabel = product.sizes
            .map((s) => s.variant.toUpperCase())
            .join(" / ");

          return (
            <article key={product.id} style={{ display: "flex" }}>
              <Link
                href={`/products/${product.slug}`}
                className="kodo-focus-ring collections-card-link"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  height: "100%",
                  textDecoration: "none",
                  color: "inherit",
                  border: "1px solid var(--sys-color-border)",
                  backgroundColor: "var(--sys-color-surface)",
                  transition:
                    "transform 320ms var(--ease-cinematic), border-color 320ms var(--ease-cinematic)",
                }}
              >
                <div
                  className="collections-card-image-frame"
                  style={{
                    aspectRatio: "3/4",
                    backgroundColor: "#09090b",
                    position: "relative",
                    overflow: "hidden",
                    borderBottom: "1px solid var(--sys-color-border)",
                  }}
                >
                  <div
                    className="collections-card-image"
                    style={{
                      position: "absolute",
                      inset: 0,
                      transition:
                        "transform var(--motion-duration-base) var(--ease-cinematic)",
                    }}
                  >
                    <Image
                      src={product.images.pureProduct}
                      alt={`KODŌ ${product.name} Eau de Parfum`}
                      fill
                      priority
                      sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div
                    className="collections-card-overlay"
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, transparent 58%, oklch(14% 0.01 260 / 0.85) 100%)",
                      pointerEvents: "none",
                    }}
                  />
                </div>

                <div
                  style={{
                    padding: "var(--ref-space-4)",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                  }}
                >
                  <p className="text-label" style={{ marginBottom: "6px" }}>
                    {product.family.toUpperCase()} / STATE{" "}
                    {String(stateNumber).padStart(2, "0")}
                  </p>
                  <h2
                    style={{
                      fontFamily:
                        "var(--font-editorial-display), Georgia, serif",
                      fontSize: "var(--ref-font-size-heading)",
                      fontWeight: 400,
                      lineHeight: 1.08,
                      marginBottom: "6px",
                    }}
                  >
                    {product.name}
                  </h2>
                  <p
                    className="text-caption"
                    style={{
                      color: "var(--sys-color-text-primary)",
                      opacity: 0.78,
                      marginBottom: "var(--ref-space-2)",
                    }}
                  >
                    {product.subtitle}
                  </p>
                  <p
                    className="text-body"
                    style={{
                      color: "var(--sys-color-text-secondary)",
                      fontSize: "0.9375rem",
                      lineHeight: 1.55,
                      marginBottom: "var(--ref-space-3)",
                    }}
                  >
                    {summarizeDescription(product.description)}
                  </p>

                  <div
                    style={{
                      marginTop: "auto",
                      paddingTop: "var(--ref-space-2)",
                      borderTop: "1px solid var(--sys-color-border)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "var(--ref-space-1)",
                    }}
                  >
                    <p
                      className="text-caption"
                      style={{
                        color: "var(--sys-color-text-secondary)",
                        opacity: 0.75,
                        letterSpacing: "var(--ref-letter-spacing-wide)",
                        textTransform: "uppercase",
                      }}
                    >
                      {signatureAccords}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                        gap: "var(--ref-space-2)",
                        marginTop: "4px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily:
                            "var(--font-utility-sans), system-ui, sans-serif",
                          fontSize: "var(--ref-font-size-title)",
                          fontVariantNumeric: "tabular-nums",
                          color: "var(--sys-color-text-accent)",
                        }}
                      >
                        From {formatCatalogPrice(startingPrice)}
                      </span>
                      <span
                        className="collections-card-cta text-label"
                        style={{
                          fontSize: "0.6875rem",
                          letterSpacing: "var(--ref-letter-spacing-ultra)",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <span>{volumesLabel}</span>
                        <span aria-hidden="true">&rarr;</span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
