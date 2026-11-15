"use client";

import React, { useEffect, useRef, useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { ButtonSolid } from "@/components/shared/ButtonSolid";
import { formatCatalogPrice } from "@/config/commerce";
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
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const selectedVariant = product.sizes.find((s) => s.variant === selectedSize);
  const currentPrice = selectedVariant?.price ?? product.price;

  const handleAddToCart = () => {
    addItem(
      { ...product, price: currentPrice, size: selectedSize },
      selectedSize
    );
    setAddedToCart(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setAddedToCart(false), 2000);
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const accordionSections = [
    {
      id: "composition",
      title: "Olfactory Composition",
      content: (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: "var(--ref-space-4)" }}>
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

      {/* Olfactory Architecture Dossier */}
      {(() => {
        const familyProfiles: Record<
          typeof product.family,
          { profile: string; tenacity: string; fillPercent: number }
        > = {
          mineral: {
            profile: "Crisp Mineral Sillage",
            tenacity: "8–10 hrs · High Volatility",
            fillPercent: 68,
          },
          botanical: {
            profile: "Structured Dry Woods",
            tenacity: "10–12 hrs · Balanced Projection",
            fillPercent: 80,
          },
          resinous: {
            profile: "Dense Ceremonial Trail",
            tenacity: "12–16 hrs · Deep Tenacity",
            fillPercent: 94,
          },
          aquatic: {
            profile: "Cool Saline Diffusion",
            tenacity: "7–9 hrs · Translucent Veil",
            fillPercent: 62,
          },
        };
        const intensity = familyProfiles[product.family];
        const tiers = [
          { code: "01 · Top", notes: product.notes.top.slice(0, 2), filled: false },
          { code: "02 · Heart", notes: product.notes.heart.slice(0, 2), filled: false },
          { code: "03 · Base", notes: product.notes.base.slice(0, 2), filled: true },
        ];

        return (
          <section
            aria-label="Olfactory Architecture"
            style={{
              padding: "16px",
              border: "1px solid var(--sys-color-border)",
              backgroundColor: "rgba(255, 255, 255, 0.015)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "8px",
                paddingBottom: "12px",
                marginBottom: "14px",
                borderBottom: "1px solid var(--sys-color-border)",
              }}
            >
              <span
                className="text-label"
                style={{
                  color: "var(--sys-color-text-primary)",
                  letterSpacing: "var(--ref-letter-spacing-wide)",
                }}
              >
                Olfactory Architecture
              </span>
              <span
                style={{
                  fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                  fontSize: "10px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--sys-color-text-accent)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                Extrait de Parfum · {product.concentration}
              </span>
            </div>

            <div
              style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "12px",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "3.5px",
                  left: 0,
                  right: 0,
                  height: "1px",
                  background:
                    "linear-gradient(90deg, var(--sys-color-text-accent) 0%, color-mix(in srgb, var(--sys-color-text-accent) 40%, transparent) 66%, var(--sys-color-border) 100%)",
                  pointerEvents: "none",
                }}
              />
              {tiers.map((tier) => (
                <div key={tier.code} style={{ position: "relative", minWidth: 0 }}>
                  <div
                    aria-hidden="true"
                    style={{
                      width: "8px",
                      height: "8px",
                      marginBottom: "10px",
                      border: "1.5px solid var(--sys-color-text-accent)",
                      backgroundColor: tier.filled ? "var(--sys-color-text-accent)" : "#0A0A0C",
                      position: "relative",
                      zIndex: 1,
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                      fontSize: "10px",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--sys-color-text-accent)",
                      marginBottom: "4px",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {tier.code}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    {tier.notes.map((note, idx) => (
                      <span
                        key={note}
                        style={{
                          fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                          fontSize: "12px",
                          lineHeight: 1.4,
                          color:
                            idx === 0
                              ? "var(--sys-color-text-primary)"
                              : "var(--sys-color-text-secondary)",
                          overflowWrap: "anywhere",
                        }}
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "14px",
                paddingTop: "12px",
                borderTop: "1px solid var(--sys-color-border)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "7px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                    fontSize: "11px",
                    letterSpacing: "0.06em",
                    color: "var(--sys-color-text-secondary)",
                  }}
                >
                  {intensity.profile}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                    fontSize: "11px",
                    fontVariantNumeric: "tabular-nums",
                    color: "var(--sys-color-text-secondary)",
                  }}
                >
                  {intensity.tenacity}
                </span>
              </div>
              <div
                aria-hidden="true"
                style={{
                  height: "2px",
                  width: "100%",
                  backgroundColor: "var(--sys-color-border)",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${intensity.fillPercent}%`,
                    background:
                      "linear-gradient(90deg, color-mix(in srgb, var(--sys-color-text-accent) 45%, transparent) 0%, var(--sys-color-text-accent) 100%)",
                  }}
                />
              </div>
            </div>
          </section>
        );
      })()}

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
          {formatCatalogPrice(currentPrice)}
        </span>
        <span className="text-caption">{selectedSize}</span>
      </div>

      {/* Volume Selectors */}
      {(() => {
        const parseVolumeMl = (variant: string): number => {
          const parsed = Number.parseFloat(variant);
          return Number.isFinite(parsed) && parsed > 0 ? parsed : 50;
        };
        const vesselDimensions: Record<string, string> = {
          "50ml": "12 × 6 × 6 cm",
          "100ml": "16 × 7 × 7 cm",
        };
        const baselineSize = product.sizes.reduce((smallest, candidate) =>
          parseVolumeMl(candidate.variant) < parseVolumeMl(smallest.variant)
            ? candidate
            : smallest
        );
        const baselineRate = baselineSize.price / parseVolumeMl(baselineSize.variant);

        return (
          <div role="radiogroup" aria-label="Select volume">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: "8px",
                marginBottom: "var(--ref-space-2)",
              }}
            >
              <p className="text-label">Volume</p>
              <span
                className="text-caption"
                style={{
                  fontSize: "11px",
                  color: "var(--sys-color-text-secondary)",
                }}
              >
                Borosilicate Carafe
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "12px",
              }}
            >
              {product.sizes.map((size) => {
                const isSelected = selectedSize === size.variant;
                const volumeMl = parseVolumeMl(size.variant);
                const unitRate = size.price / volumeMl;
                const savingsPct =
                  volumeMl > parseVolumeMl(baselineSize.variant) && unitRate < baselineRate
                    ? Math.round((1 - unitRate / baselineRate) * 100)
                    : 0;

                return (
                  <button
                    key={size.variant}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    className="kodo-focus-ring"
                    onClick={() => setSelectedSize(size.variant)}
                    disabled={!size.inStock}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "stretch",
                      justifyContent: "space-between",
                      gap: "10px",
                      padding: "14px 16px",
                      textAlign: "left",
                      backgroundColor: isSelected
                        ? "color-mix(in srgb, var(--sys-color-text-accent) 7%, transparent)"
                        : "rgba(255, 255, 255, 0.015)",
                      color: isSelected
                        ? "var(--sys-color-text-primary)"
                        : "var(--sys-color-text-secondary)",
                      fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                      border: isSelected
                        ? "1.5px solid var(--sys-color-text-accent)"
                        : "1px solid var(--sys-color-border)",
                      cursor: size.inStock ? "pointer" : "not-allowed",
                      opacity: size.inStock ? 1 : 0.3,
                      transition:
                        "border-color 240ms var(--ease-decelerate), background-color 240ms var(--ease-decelerate), color 240ms var(--ease-decelerate)",
                      minWidth: "var(--ref-touch-target)",
                      minHeight: "var(--ref-touch-target)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                        gap: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: 600,
                          letterSpacing: "var(--ref-letter-spacing-wide)",
                          textTransform: "uppercase",
                          color: isSelected
                            ? "var(--sys-color-text-primary)"
                            : "var(--sys-color-text-secondary)",
                        }}
                      >
                        {size.variant}
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: 500,
                          fontVariantNumeric: "tabular-nums",
                          color: isSelected
                            ? "var(--sys-color-text-accent)"
                            : "var(--sys-color-text-primary)",
                        }}
                      >
                        {formatCatalogPrice(size.price)}
                      </span>
                    </div>

                    <span
                      style={{
                        fontSize: "11px",
                        fontVariantNumeric: "tabular-nums",
                        color: "var(--sys-color-text-secondary)",
                      }}
                    >
                      {vesselDimensions[size.variant] ?? "Hand-blown glass"}
                    </span>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "6px",
                        paddingTop: "8px",
                        borderTop: "1px solid var(--sys-color-border)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11px",
                          fontVariantNumeric: "tabular-nums",
                          color: isSelected
                            ? "var(--sys-color-text-primary)"
                            : "var(--sys-color-text-secondary)",
                        }}
                      >
                        ${unitRate.toFixed(2)} / ml
                      </span>
                      {savingsPct > 0 ? (
                        <span
                          style={{
                            fontSize: "10px",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            fontVariantNumeric: "tabular-nums",
                            padding: "2px 6px",
                            border:
                              "1px solid color-mix(in srgb, var(--sys-color-text-accent) 42%, transparent)",
                            color: "var(--sys-color-text-accent)",
                          }}
                        >
                          −{savingsPct}% / ml
                        </span>
                      ) : (
                        <span
                          style={{
                            fontSize: "10px",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "var(--sys-color-text-secondary)",
                            opacity: 0.75,
                          }}
                        >
                          {size.inStock ? "Standard" : "Unavailable"}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* Add to Ritual CTA */}
      <ButtonSolid
        onClick={handleAddToCart}
        fullWidth
        ariaLabel={`Add ${product.name} ${selectedSize} to your ritual`}
      >
        <span
          key={addedToCart ? "confirmed" : "default"}
          style={{
            display: "inline-block",
            animation: "ctaFadeIn var(--motion-duration-fast) var(--ease-decelerate)",
          }}
        >
          {addedToCart ? "✓ Ritual Engaged" : "Add to Ritual"}
        </span>
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
                  transition: "transform var(--motion-duration-base) var(--ease-cinematic)",
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
                transition: "grid-template-rows var(--motion-duration-base) var(--ease-cinematic)",
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
                      "opacity var(--motion-duration-base) var(--ease-cinematic), transform var(--motion-duration-base) var(--ease-cinematic)",
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
