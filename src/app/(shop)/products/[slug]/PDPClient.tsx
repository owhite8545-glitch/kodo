"use client";

import React, { useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { ButtonSolid } from "@/components/shared/ButtonSolid";
import type { ScentProduct, ScentVariant } from "@/types/webgl";

/* ═══════════════════════════════════════════════════════════
   KODŌ — PDP Client (Product Detail Page Interactive Layer)
   Volume selectors, Add to Ritual CTA, Accordion panels.
   ═══════════════════════════════════════════════════════════ */

interface PDPClientProps {
  product: ScentProduct;
}

export function PDPClient({ product }: PDPClientProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [selectedSize, setSelectedSize] = useState<ScentVariant>(product.size);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);

  const selectedVariant = product.sizes.find((s) => s.variant === selectedSize);
  const currentPrice = selectedVariant?.price ?? product.price;

  const handleAddToCart = () => {
    addItem(
      { ...product, price: currentPrice, size: selectedSize },
      selectedSize
    );
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const accordionSections = [
    {
      id: "composition",
      title: "Olfactory Composition",
      content: (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--ref-space-4)" }}>
          {(["top", "heart", "base"] as const).map((tier) => (
            <div key={tier}>
              <p className="text-label" style={{ marginBottom: "var(--ref-space-2)" }}>
                {tier.toUpperCase()} NOTES
              </p>
              <ul style={{ listStyle: "none" }}>
                {product.notes[tier].map((note) => (
                  <li key={note} className="text-caption" style={{ marginBottom: "4px" }}>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "sourcing",
      title: "Material Sourcing",
      content: (
        <p className="text-body" style={{ color: "var(--sys-color-text-secondary)" }}>
          All raw materials are sourced through direct partnerships with artisanal
          suppliers in Grasse, Hokkaido, and the Ethiopian highlands. Each component
          undergoes rigorous purity analysis in our laboratory.
        </p>
      ),
    },
    {
      id: "dimensions",
      title: "Dimensions & Materials",
      content: (
        <p className="text-body" style={{ color: "var(--sys-color-text-secondary)" }}>
          Hand-blown borosilicate glass. Solid brass atomizer mechanism. Matte-black
          magnetic closure. 50ml: 12cm × 6cm × 6cm. 100ml: 16cm × 7cm × 7cm.
        </p>
      ),
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--ref-space-6)",
      }}
    >
      {/* Product Title */}
      <div>
        <p className="text-label" style={{ marginBottom: "var(--ref-space-1)" }}>
          {product.family.toUpperCase()}
        </p>
        <h1
          className="text-display"
          style={{ fontFamily: "var(--font-editorial-display), Georgia, serif" }}
        >
          {product.name}
        </h1>
        <p
          className="text-body-lg"
          style={{ color: "var(--sys-color-text-secondary)", marginTop: "var(--ref-space-1)" }}
        >
          {product.subtitle}
        </p>
      </div>

      {/* Description */}
      <p
        className="text-body"
        style={{
          color: "var(--sys-color-text-secondary)",
          maxWidth: "50ch",
          lineHeight: "var(--ref-line-height-relaxed)",
        }}
      >
        {product.description}
      </p>

      {/* Price */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "var(--ref-space-2)" }}>
        <span
          style={{
            fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
            fontSize: "var(--ref-font-size-heading)",
            fontVariantNumeric: "tabular-nums",
            color: "var(--sys-color-text-accent)",
          }}
        >
          ${currentPrice}
        </span>
        <span className="text-caption">{selectedSize}</span>
      </div>

      {/* Volume Selectors */}
      <div role="radiogroup" aria-label="Select volume">
        <p className="text-label" style={{ marginBottom: "var(--ref-space-2)" }}>
          Volume
        </p>
        <div style={{ display: "flex", gap: "var(--ref-space-2)" }}>
          {product.sizes.map((size) => (
            <button
              key={size.variant}
              role="radio"
              aria-checked={selectedSize === size.variant}
              className="kodo-focus-ring"
              onClick={() => setSelectedSize(size.variant)}
              disabled={!size.inStock}
              style={{
                padding: "var(--ref-space-2) var(--ref-space-4)",
                backgroundColor: "transparent",
                color:
                  selectedSize === size.variant
                    ? "var(--sys-color-text-primary)"
                    : "var(--sys-color-text-secondary)",
                fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                fontSize: "var(--ref-font-size-caption)",
                fontWeight: 500,
                letterSpacing: "var(--ref-letter-spacing-wide)",
                border: "none",
                outline:
                  selectedSize === size.variant
                    ? "2px solid var(--sys-color-text-accent)"
                    : "1px solid var(--sys-color-border)",
                outlineOffset: selectedSize === size.variant ? "2px" : "0px",
                cursor: size.inStock ? "pointer" : "not-allowed",
                opacity: size.inStock ? 1 : 0.3,
                transition:
                  "outline 200ms var(--ease-decelerate), color 200ms var(--ease-decelerate)",
                minWidth: "var(--ref-touch-target)",
                minHeight: "var(--ref-touch-target)",
              }}
            >
              {size.variant}
            </button>
          ))}
        </div>
      </div>

      {/* Add to Ritual CTA */}
      <ButtonSolid
        onClick={handleAddToCart}
        fullWidth
        ariaLabel={`Add ${product.name} ${selectedSize} to your ritual`}
      >
        {addedToCart ? "✓ Ritual Engaged" : "Add to Ritual"}
      </ButtonSolid>

      {/* Accordion Details */}
      <div
        style={{
          borderTop: "1px solid var(--sys-color-border)",
          marginTop: "var(--ref-space-4)",
        }}
      >
        {accordionSections.map((section) => (
          <div
            key={section.id}
            style={{
              borderBottom: "1px solid var(--sys-color-border)",
            }}
          >
            <button
              onClick={() => toggleAccordion(section.id)}
              aria-expanded={openAccordion === section.id}
              aria-controls={`accordion-${section.id}`}
              className="kodo-focus-ring"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "var(--ref-space-3) 0",
                background: "none",
                border: "none",
                color: "var(--sys-color-text-primary)",
                fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                fontSize: "var(--ref-font-size-base)",
                fontWeight: 500,
                cursor: "pointer",
                textAlign: "left",
                minHeight: "var(--ref-touch-target)",
              }}
            >
              {section.title}
              <span
                aria-hidden="true"
                style={{
                  transform:
                    openAccordion === section.id ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 300ms var(--ease-cinematic)",
                  fontSize: "18px",
                  color: "var(--sys-color-text-secondary)",
                }}
              >
                ›
              </span>
            </button>
            <div
              id={`accordion-${section.id}`}
              role="region"
              style={{
                display: "grid",
                gridTemplateRows: openAccordion === section.id ? "1fr" : "0fr",
                transition: "grid-template-rows 300ms var(--ease-cinematic)",
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <div
                  style={{
                    padding: "0 0 var(--ref-space-4) 0",
                    opacity: openAccordion === section.id ? 1 : 0,
                    transform:
                      openAccordion === section.id
                        ? "translate3d(0, 0, 0)"
                        : "translate3d(0, -10px, 0)",
                    transition:
                      "opacity 300ms var(--ease-cinematic), transform 300ms var(--ease-cinematic)",
                  }}
                >
                  {section.content}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
