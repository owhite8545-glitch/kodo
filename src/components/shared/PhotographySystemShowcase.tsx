"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ScentProduct } from "@/types/webgl";

interface PhotographySystemShowcaseProps {
  products: ScentProduct[];
}

const SPEC_COLUMNS = [
  {
    heading: "Optical Capture",
    rows: [
      { label: "Camera", value: "Full Frame" },
      { label: "Lens", value: "85mm Prime" },
      { label: "Perspective", value: "Eye-level · Slight elevation" },
      { label: "Lighting", value: "Soft key left · Rim light right" },
    ],
  },
  {
    heading: "Materiality & Tone",
    rows: [
      { label: "Background", value: "Charcoal gradient & mineral plaster" },
      { label: "Surface", value: "Honed basalt & warm travertine" },
      { label: "Color Profile", value: "Neutral · Low Saturation" },
      { label: "Contrast", value: "Medium – High" },
    ],
  },
  {
    heading: "Framing Standards",
    rows: [
      { label: "Occupancy", value: "65–75% vertical frame" },
      { label: "PDP Format", value: "3:4 Architectural Portrait" },
      { label: "Editorial", value: "16:9 Widescreen Campaign" },
      { label: "Social / OG", value: "1.91:1 Asymmetric Void" },
    ],
  },
] as const;

export function PhotographySystemShowcase({
  products,
}: PhotographySystemShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = products[activeIndex] ?? products[0];

  const specimenPlates = [
    {
      index: "01",
      title: "Hero Still",
      caption: "Obsidian Pedestal · Rim Key",
      src: activeProduct.images.hero,
      alt: `KODŌ ${activeProduct.name} 01 Hero dark studio still`,
    },
    {
      index: "02",
      title: "Pure Form",
      caption: "Isolated Borosilicate Profile",
      src: activeProduct.images.pureProduct,
      alt: `KODŌ ${activeProduct.name} 02 Pure Form vessel silhouette`,
    },
    {
      index: "03",
      title: "Detail Study",
      caption: "Charred Hinoki & Glass Shoulder",
      src: activeProduct.images.detail,
      alt: `KODŌ ${activeProduct.name} 03 Macro detail craft study`,
    },
    {
      index: "04",
      title: "Scale Context",
      caption: activeProduct.scaleReference,
      src: activeProduct.images.scale,
      alt: `KODŌ ${activeProduct.name} 04 Scale context beside ${activeProduct.scaleReference}`,
    },
  ];

  const handleTabKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveIndex((idx + 1) % products.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveIndex((idx - 1 + products.length) % products.length);
    }
  };

  return (
    <section
      aria-labelledby="visual-grammar-heading"
      style={{
        paddingInline: "var(--sys-space-page-margin)",
        maxWidth: "1100px",
        marginInline: "auto",
        marginBottom: "var(--ref-space-15)",
      }}
    >
      {/* Part A: Widescreen Campaign Banner with True Right-Void Ma Typography */}
      <div
        className="kodo-campaign-banner"
        style={{
          position: "relative",
          border: "1px solid var(--sys-color-border)",
          backgroundColor: "var(--ref-color-obsidian-20)",
          overflow: "hidden",
          marginBottom: "var(--ref-space-12)",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
          }}
        >
          <Image
            src="/images/editorial/so-campaign-wide.jpg"
            alt="KODŌ SŌ widescreen campaign plate showing fractured basalt rock beside borosilicate flacon in dark negative space"
            fill
            sizes="(max-width: 1100px) 100vw, 1100px"
            style={{ objectFit: "cover", objectPosition: "center center" }}
          />
          <div
            aria-hidden="true"
            className="kodo-campaign-scrim"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, transparent 48%, oklch(10% 0.01 260 / 0.55) 75%, oklch(10% 0.01 260 / 0.88) 100%)",
              pointerEvents: "none",
            }}
          />
        </div>

        <div className="kodo-campaign-poem">
          <p
            style={{
              fontFamily: "var(--font-editorial-display), Georgia, serif",
              fontSize: "clamp(1.25rem, 2.3vw, 1.95rem)",
              fontWeight: 400,
              lineHeight: 1.25,
              color: "var(--sys-color-text-primary)",
              marginBottom: "16px",
            }}
          >
            A breath between worlds.
          </p>
          <div
            aria-hidden="true"
            style={{
              width: "36px",
              height: "1px",
              backgroundColor: "var(--sys-color-text-accent)",
              opacity: 0.75,
              marginBottom: "16px",
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
              fontSize: "12px",
              letterSpacing: "0.42em",
              color: "var(--sys-color-text-primary)",
              textTransform: "uppercase",
            }}
          >
            KODŌ
          </p>
        </div>
      </div>

      {/* Part B: Interactive 4-Register Specimen Ledger (Spec v1) */}
      <div
        style={{
          padding: "clamp(20px, 3vw, 32px)",
          border: "1px solid var(--sys-color-border)",
          backgroundColor: "oklch(13% 0.01 260 / 0.65)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "16px",
            paddingBottom: "20px",
            marginBottom: "24px",
            borderBottom: "1px solid var(--sys-color-border)",
          }}
        >
          <div>
            <p className="text-label" style={{ marginBottom: "6px" }}>
              Visual Grammar · Spec v1
            </p>
            <h2
              id="visual-grammar-heading"
              style={{
                fontFamily: "var(--font-editorial-display), Georgia, serif",
                fontSize: "var(--ref-font-size-heading)",
                fontWeight: 400,
                marginBottom: "6px",
              }}
            >
              Optical Specimen Archive
            </h2>
            <p
              className="text-caption"
              style={{ color: "var(--sys-color-text-secondary)" }}
            >
              Each scent state is documented across four spatial and daylight materiality registers.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Select scent specimen study"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {products.map((product, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={product.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className="kodo-focus-ring"
                  onClick={() => setActiveIndex(idx)}
                  onKeyDown={(e) => handleTabKeyDown(e, idx)}
                  style={{
                    minHeight: "var(--ref-touch-target)",
                    padding: "0 16px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 500,
                    letterSpacing: "var(--ref-letter-spacing-wide)",
                    textTransform: "uppercase",
                    backgroundColor: isSelected
                      ? "color-mix(in srgb, var(--sys-color-text-accent) 9%, transparent)"
                      : "transparent",
                    color: isSelected
                      ? "var(--sys-color-text-primary)"
                      : "var(--sys-color-text-secondary)",
                    border: isSelected
                      ? "1px solid var(--sys-color-text-accent)"
                      : "1px solid var(--sys-color-border)",
                    cursor: "pointer",
                    transition:
                      "border-color 220ms var(--ease-decelerate), color 220ms var(--ease-decelerate), background-color 220ms var(--ease-decelerate)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      backgroundColor: isSelected
                        ? "var(--sys-color-text-accent)"
                        : "var(--sys-color-border)",
                    }}
                  />
                  {product.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4-Column Specimen Strip */}
        <div
          role="tabpanel"
          aria-label={`${activeProduct.name} optical studies`}
          className="kodo-specimen-grid"
        >
          {specimenPlates.map((plate) => (
            <Link
              key={`${activeProduct.id}-${plate.index}`}
              href={`/products/${activeProduct.slug}`}
              className="kodo-specimen-card kodo-focus-ring"
              style={{
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
                color: "inherit",
                border: "1px solid var(--sys-color-border)",
                backgroundColor: "var(--ref-color-obsidian-20)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "3 / 4",
                  overflow: "hidden",
                  backgroundColor: "var(--ref-color-obsidian-20)",
                }}
              >
                <Image
                  src={plate.src}
                  alt={plate.alt}
                  fill
                  sizes="(max-width: 767px) 50vw, 250px"
                  className="kodo-specimen-img"
                  style={{
                    objectFit: "cover",
                    transition: "transform 420ms var(--ease-decelerate)",
                  }}
                />
              </div>
              <div
                style={{
                  padding: "12px 14px",
                  borderTop: "1px solid var(--sys-color-border)",
                  backgroundColor: "oklch(12% 0.01 260)",
                  flexGrow: 1,
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                    fontSize: "10px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--sys-color-text-accent)",
                    marginBottom: "4px",
                  }}
                >
                  {plate.index} · {plate.title}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                    fontSize: "12px",
                    lineHeight: 1.4,
                    color: "var(--sys-color-text-secondary)",
                  }}
                >
                  {plate.caption}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Selected Scent Quick Summary + Inspect Link */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            marginTop: "18px",
            paddingBottom: "22px",
            borderBottom: "1px solid var(--sys-color-border)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
              fontSize: "13px",
              color: "var(--sys-color-text-secondary)",
            }}
          >
            <strong
              style={{
                color: "var(--sys-color-text-primary)",
                fontWeight: 500,
                marginRight: "8px",
              }}
            >
              {activeProduct.name}
            </strong>
            {activeProduct.subtitle} · Extrait de Parfum ({activeProduct.concentration})
          </p>
          <Link
            href={`/products/${activeProduct.slug}`}
            className="kodo-focus-ring"
            style={{
              fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
              fontSize: "11px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--sys-color-text-accent)",
              textDecoration: "none",
            }}
          >
            Inspect {activeProduct.name} →
          </Link>
        </div>

        {/* Bottom Archival Spec Ledger Table */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            paddingTop: "22px",
          }}
        >
          {SPEC_COLUMNS.map((col) => (
            <div key={col.heading}>
              <p
                style={{
                  fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                  fontSize: "10px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--sys-color-text-accent)",
                  marginBottom: "10px",
                }}
              >
                {col.heading}
              </p>
              <dl style={{ display: "flex", flexDirection: "column", gap: "6px", margin: 0 }}>
                {col.rows.map((row) => (
                  <div
                    key={row.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "12px",
                      fontSize: "12px",
                      lineHeight: 1.45,
                    }}
                  >
                    <dt style={{ color: "var(--sys-color-text-secondary)" }}>
                      {row.label}
                    </dt>
                    <dd
                      style={{
                        margin: 0,
                        textAlign: "right",
                        color: "var(--sys-color-text-primary)",
                      }}
                    >
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .kodo-campaign-poem {
          position: absolute;
          top: 50%;
          right: clamp(24px, 6vw, 72px);
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          z-index: 2;
        }
        .kodo-specimen-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
        }
        .kodo-specimen-card {
          transition: border-color 240ms var(--ease-decelerate);
        }
        .kodo-specimen-card:hover {
          border-color: var(--sys-color-text-accent) !important;
        }
        .kodo-specimen-card:hover .kodo-specimen-img {
          transform: scale(1.025);
        }
        @media (max-width: 1023px) {
          .kodo-specimen-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 639px) {
          .kodo-campaign-scrim {
            display: none;
          }
          .kodo-campaign-poem {
            position: static;
            transform: none;
            padding: 20px 16px;
            border-top: 1px solid var(--sys-color-border);
            background-color: oklch(12% 0.01 260);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .kodo-specimen-card:hover .kodo-specimen-img {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
