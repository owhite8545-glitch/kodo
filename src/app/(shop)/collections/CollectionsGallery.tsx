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
              paddingInline: "12px",
              border: "1px solid var(--sys-color-border)",
              fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
              fontSize: "var(--ref-font-size-small)",
              letterSpacing: "var(--ref-letter-spacing-wide)",
              textTransform: "uppercase",
              cursor: "pointer",
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
        }}
      >
        {filteredProducts.map((product) => {
          const stateNumber = products.findIndex((p) => p.id === product.id) + 1;
          const startingPrice = product.sizes[0]?.price ?? product.price;
          return (
            <article key={product.id}>
              <Link
                href={`/products/${product.slug}`}
                className="kodo-focus-ring collections-card-link"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div
                  className="collections-card-image"
                  style={{
                    aspectRatio: "3/4",
                    backgroundColor: "var(--sys-color-surface)",
                    position: "relative",
                    overflow: "hidden",
                    marginBottom: "var(--ref-space-3)",
                    transition:
                      "transform var(--motion-duration-base) var(--ease-decelerate)",
                  }}
                >
                  <Image
                    src={product.images.pureProduct}
                    alt={`KODŌ ${product.name} Eau de Parfum`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    style={{ objectFit: "contain" }}
                  />
                  <div
                    className="collections-card-overlay"
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, transparent 50%, oklch(12% 0.01 260 / 0.5) 100%)",
                      pointerEvents: "none",
                    }}
                  />
                </div>

                <p className="text-label" style={{ marginBottom: "4px" }}>
                  {product.family.toUpperCase()} / STATE{" "}
                  {String(stateNumber).padStart(2, "0")}
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-editorial-display), Georgia, serif",
                    fontSize: "var(--ref-font-size-heading)",
                    fontWeight: 400,
                    marginBottom: "4px",
                  }}
                >
                  {product.name}
                </h2>
                <p
                  className="text-caption"
                  style={{ marginBottom: "var(--ref-space-2)" }}
                >
                  {product.subtitle}
                </p>
                <p
                  className="text-body"
                  style={{
                    color: "var(--sys-color-text-secondary)",
                    marginBottom: "var(--ref-space-3)",
                    maxWidth: "32ch",
                  }}
                >
                  {product.description.slice(0, 118)}…
                </p>
                <span
                  style={{
                    fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                    fontSize: "var(--ref-font-size-title)",
                    fontVariantNumeric: "tabular-nums",
                    color: "var(--sys-color-text-accent)",
                  }}
                >
                  From {formatCatalogPrice(startingPrice)}
                </span>
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
