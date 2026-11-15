"use client";

import React, { useRef, useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import {
  calculateOrderFinancials,
  COMMERCE_CONFIG,
  formatCents,
  type CommerceMode,
} from "@/config/commerce";
import { SITE_CONFIG } from "@/config/site";
import { useHydrated } from "@/hooks/use-hydrated";
import { submitCheckout } from "./actions";

interface CheckoutClientProps {
  mode: CommerceMode;
  isCanceled?: boolean;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: "var(--comp-input-height)",
  paddingInline: "var(--ref-space-3)",
  backgroundColor: "transparent",
  border: "1px solid var(--sys-color-border)",
  borderRadius: "var(--ref-radius-none)",
  color: "var(--sys-color-text-primary)",
  fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
  fontSize: "var(--ref-font-size-base)",
  outline: "none",
  transition: "border-color var(--motion-duration-fast)",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "6px",
  fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
  fontSize: "var(--ref-font-size-small)",
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "var(--ref-letter-spacing-wide)",
  color: "var(--sys-color-text-secondary)",
};

const fieldErrorStyle: React.CSSProperties = {
  marginTop: "4px",
  fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
  fontSize: "var(--ref-font-size-small)",
  color: "var(--sys-color-error)",
};

export function CheckoutClient({ mode, isCanceled = false }: CheckoutClientProps) {
  const router = useRouter();
  const hydrated = useHydrated();
  const items = useCartStore((s) => s.items);
  const cartVersion = useCartStore((s) => s.cartVersion);
  const submissionKeysRef = useRef<{ version: number; key: string } | null>(
    null
  );

  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [stateOrRegion, setStateOrRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const financials = calculateOrderFinancials(
    items.map((item) => ({
      unitPriceCents: Math.round(item.product.price * 100),
      quantity: item.quantity,
    }))
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setFieldErrors({});

    if (
      !submissionKeysRef.current ||
      submissionKeysRef.current.version !== cartVersion
    ) {
      submissionKeysRef.current = {
        version: cartVersion,
        key: crypto.randomUUID(),
      };
    }

    const payload = {
      customer: {
        email: email.trim(),
        name: name.trim(),
        phone: phone.trim(),
      },
      shipping: {
        addressLine1: addressLine1.trim(),
        addressLine2: addressLine2.trim(),
        city: city.trim(),
        stateOrRegion: stateOrRegion.trim(),
        postalCode: postalCode.trim(),
        country,
      },
      cartItems: items.map((item) => ({
        lineKey: item.lineKey,
        productId: item.product.id,
        variant: item.product.size,
        quantity: item.quantity,
      })),
      idempotencyKey: submissionKeysRef.current.key,
    };

    startTransition(async () => {
      try {
        const result = await submitCheckout(payload);
        if (!result.success) {
          if (result.fieldErrors) setFieldErrors(result.fieldErrors);
          setServerError(result.error || "Unable to complete checkout.");
          return;
        }

        if (result.redirectUrl) {
          if (result.redirectUrl.startsWith("http")) {
            window.location.assign(result.redirectUrl);
          } else {
            router.push(result.redirectUrl);
          }
        }
      } catch {
        setServerError(
          "A network error interrupted your request. Please verify your connection and retry."
        );
      }
    });
  };

  if (!hydrated) {
    return (
      <main
        id="main-content"
        role="main"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "var(--ref-space-12) var(--sys-space-page-margin)",
        }}
      >
        <p className="text-caption">Preparing Checkout…</p>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main
        id="main-content"
        role="main"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "var(--ref-space-12) var(--sys-space-page-margin)",
          textAlign: "center",
          gap: "var(--ref-space-4)",
        }}
      >
        <Link
          href="/"
          className="kodo-focus-ring"
          style={{
            fontFamily: "var(--font-editorial-display), Georgia, serif",
            fontSize: "var(--ref-font-size-title)",
            letterSpacing: "var(--ref-letter-spacing-label)",
            color: "var(--sys-color-text-primary)",
            textDecoration: "none",
            textTransform: "uppercase",
            marginBottom: "var(--ref-space-4)",
          }}
        >
          {SITE_CONFIG.brand.wordmark}
        </Link>
        <h1
          style={{
            fontFamily: "var(--font-editorial-display), Georgia, serif",
            fontSize: "var(--ref-font-size-heading)",
            color: "var(--sys-color-text-primary)",
          }}
        >
          Your ritual is currently empty
        </h1>
        <p
          className="text-body"
          style={{
            color: "var(--sys-color-text-secondary)",
            maxWidth: "38ch",
          }}
        >
          Explore our curated architectural distillations before proceeding to
          checkout.
        </p>
        <Link
          href="/collections"
          className="kodo-btn-solid kodo-focus-ring"
          style={{ marginTop: "var(--ref-space-2)" }}
        >
          Explore Collection
        </Link>
      </main>
    );
  }

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <main
      id="main-content"
      role="main"
      style={{
        minHeight: "100vh",
        paddingBottom: "var(--ref-space-16)",
        paddingInline: "var(--sys-space-page-margin)",
      }}
    >
      <header
        style={{
          maxWidth: "1200px",
          marginInline: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "var(--comp-nav-height)",
          borderBottom: "1px solid var(--sys-color-border)",
          marginBottom: "var(--ref-space-10)",
        }}
      >
        <Link
          href="/"
          className="kodo-focus-ring"
          aria-label="Return to KODŌ home"
          style={{
            fontFamily: "var(--font-editorial-display), Georgia, serif",
            fontSize: "var(--ref-font-size-title)",
            letterSpacing: "var(--ref-letter-spacing-label)",
            color: "var(--sys-color-text-primary)",
            textDecoration: "none",
            textTransform: "uppercase",
          }}
        >
          {SITE_CONFIG.brand.wordmark}
        </Link>
        <span className="text-caption">Secure Checkout</span>
      </header>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="checkout-grid"
        style={{
          maxWidth: "1200px",
          marginInline: "auto",
          display: "grid",
          gridTemplateColumns: "1fr 420px",
          gap: "var(--ref-space-12)",
          alignItems: "start",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--ref-space-8)",
          }}
        >
          <div
            role="status"
            style={{
              padding: "var(--ref-space-3) var(--ref-space-4)",
              border: "1px solid var(--sys-color-border)",
              backgroundColor: "var(--ref-color-obsidian-50)",
              display: "flex",
              alignItems: "center",
              gap: "var(--ref-space-3)",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "var(--sys-color-text-accent)",
                flexShrink: 0,
              }}
            />
            <p className="text-caption" style={{ lineHeight: 1.5 }}>
              {mode === "live"
                ? COMMERCE_CONFIG.liveNotice
                : COMMERCE_CONFIG.demoNotice}
            </p>
          </div>

          {isCanceled && (
            <div
              role="status"
              style={{
                padding: "var(--ref-space-3) var(--ref-space-4)",
                border: "1px solid var(--sys-color-text-accent)",
                backgroundColor: "oklch(20% 0.02 85 / 0.25)",
              }}
            >
              <p
                className="text-body"
                style={{ color: "var(--sys-color-text-primary)" }}
              >
                Your Stripe session was cancelled before payment. Your ritual
                selections remain saved below.
              </p>
            </div>
          )}

          {serverError && (
            <div
              role="alert"
              style={{
                padding: "var(--ref-space-3) var(--ref-space-4)",
                border: "1px solid var(--sys-color-error)",
                backgroundColor: "oklch(16% 0.04 25 / 0.28)",
              }}
            >
              <p
                className="text-body"
                style={{ color: "var(--sys-color-error)" }}
              >
                {serverError}
              </p>
            </div>
          )}

          <fieldset
            style={{
              border: "none",
              display: "flex",
              flexDirection: "column",
              gap: "var(--ref-space-4)",
            }}
          >
            <legend
              style={{
                fontFamily: "var(--font-editorial-display), Georgia, serif",
                fontSize: "var(--ref-font-size-title)",
                color: "var(--sys-color-text-primary)",
                marginBottom: "var(--ref-space-2)",
              }}
            >
              Customer Information
            </legend>

            <div>
              <label htmlFor="checkout-email" style={labelStyle}>
                Email Address *
              </label>
              <input
                id="checkout-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="kodo-input kodo-focus-ring"
                aria-invalid={Boolean(fieldErrors["customer.email"])}
                style={{
                  ...inputStyle,
                  borderColor: fieldErrors["customer.email"]
                    ? "var(--sys-color-error)"
                    : undefined,
                }}
              />
              {fieldErrors["customer.email"] && (
                <p style={fieldErrorStyle}>{fieldErrors["customer.email"]}</p>
              )}
            </div>

            <div className="checkout-two-col">
              <div>
                <label htmlFor="checkout-name" style={labelStyle}>
                  Full Name *
                </label>
                <input
                  id="checkout-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="kodo-input kodo-focus-ring"
                  aria-invalid={Boolean(fieldErrors["customer.name"])}
                  style={{
                    ...inputStyle,
                    borderColor: fieldErrors["customer.name"]
                      ? "var(--sys-color-error)"
                      : undefined,
                  }}
                />
                {fieldErrors["customer.name"] && (
                  <p style={fieldErrorStyle}>{fieldErrors["customer.name"]}</p>
                )}
              </div>

              <div>
                <label htmlFor="checkout-phone" style={labelStyle}>
                  Phone Number
                </label>
                <input
                  id="checkout-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Optional (for courier SMS)"
                  className="kodo-input kodo-focus-ring"
                  style={inputStyle}
                />
              </div>
            </div>
          </fieldset>

          <fieldset
            style={{
              border: "none",
              display: "flex",
              flexDirection: "column",
              gap: "var(--ref-space-4)",
            }}
          >
            <legend
              style={{
                fontFamily: "var(--font-editorial-display), Georgia, serif",
                fontSize: "var(--ref-font-size-title)",
                color: "var(--sys-color-text-primary)",
                marginBottom: "var(--ref-space-2)",
              }}
            >
              Shipping Destination
            </legend>

            <div style={{ position: "relative" }}>
              <label htmlFor="checkout-country" style={labelStyle}>
                Country / Region *
              </label>
              <select
                id="checkout-country"
                name="country"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="kodo-input kodo-select kodo-focus-ring"
                aria-invalid={Boolean(fieldErrors["shipping.country"])}
                style={{
                  ...inputStyle,
                  height: "48px",
                  padding: "0 16px",
                  lineHeight: "46px",
                  cursor: "pointer",
                  borderColor: fieldErrors["shipping.country"]
                    ? "var(--sys-color-error)"
                    : undefined,
                }}
              >
                <option value="" disabled>
                  Select destination…
                </option>
                {COMMERCE_CONFIG.supportedRegions.map((region) => (
                  <option key={region.code} value={region.code}>
                    {region.name}
                  </option>
                ))}
              </select>
              {fieldErrors["shipping.country"] && (
                <p style={fieldErrorStyle}>{fieldErrors["shipping.country"]}</p>
              )}
            </div>

            <div>
              <label htmlFor="checkout-addr1" style={labelStyle}>
                Street Address *
              </label>
              <input
                id="checkout-addr1"
                name="addressLine1"
                type="text"
                required
                autoComplete="address-line1"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                placeholder="Street address"
                className="kodo-input kodo-focus-ring"
                aria-invalid={Boolean(fieldErrors["shipping.addressLine1"])}
                style={{
                  ...inputStyle,
                  borderColor: fieldErrors["shipping.addressLine1"]
                    ? "var(--sys-color-error)"
                    : undefined,
                }}
              />
              {fieldErrors["shipping.addressLine1"] && (
                <p style={fieldErrorStyle}>
                  {fieldErrors["shipping.addressLine1"]}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="checkout-addr2" style={labelStyle}>
                Suite / Apartment
              </label>
              <input
                id="checkout-addr2"
                name="addressLine2"
                type="text"
                autoComplete="address-line2"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
                placeholder="Optional"
                className="kodo-input kodo-focus-ring"
                style={inputStyle}
              />
            </div>

            <div className="checkout-two-col">
              <div>
                <label htmlFor="checkout-city" style={labelStyle}>
                  City *
                </label>
                <input
                  id="checkout-city"
                  name="city"
                  type="text"
                  required
                  autoComplete="address-level2"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="kodo-input kodo-focus-ring"
                  aria-invalid={Boolean(fieldErrors["shipping.city"])}
                  style={{
                    ...inputStyle,
                    borderColor: fieldErrors["shipping.city"]
                      ? "var(--sys-color-error)"
                      : undefined,
                  }}
                />
                {fieldErrors["shipping.city"] && (
                  <p style={fieldErrorStyle}>{fieldErrors["shipping.city"]}</p>
                )}
              </div>

              <div>
                <label htmlFor="checkout-state" style={labelStyle}>
                  State / Province
                </label>
                <input
                  id="checkout-state"
                  name="stateOrRegion"
                  type="text"
                  autoComplete="address-level1"
                  value={stateOrRegion}
                  onChange={(e) => setStateOrRegion(e.target.value)}
                  className="kodo-input kodo-focus-ring"
                  style={inputStyle}
                />
              </div>
            </div>

            <div className="checkout-postal-col">
              <label htmlFor="checkout-postal" style={labelStyle}>
                Postal / Zip Code *
              </label>
              <input
                id="checkout-postal"
                name="postalCode"
                type="text"
                required
                autoComplete="postal-code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="kodo-input kodo-focus-ring"
                aria-invalid={Boolean(fieldErrors["shipping.postalCode"])}
                style={{
                  ...inputStyle,
                  borderColor: fieldErrors["shipping.postalCode"]
                    ? "var(--sys-color-error)"
                    : undefined,
                }}
              />
              {fieldErrors["shipping.postalCode"] && (
                <p style={fieldErrorStyle}>
                  {fieldErrors["shipping.postalCode"]}
                </p>
              )}
            </div>
          </fieldset>
        </div>

        <aside
          aria-label="Order summary"
          style={{
            padding: "var(--ref-space-6)",
            border: "1px solid var(--sys-color-border)",
            backgroundColor: "var(--ref-color-obsidian-50)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--ref-space-4)",
            position: "sticky",
            top: "calc(var(--comp-nav-height) + var(--ref-space-4))",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              paddingBottom: "var(--ref-space-3)",
              borderBottom: "1px solid var(--sys-color-border)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-editorial-display), Georgia, serif",
                fontSize: "var(--ref-font-size-title)",
                color: "var(--sys-color-text-primary)",
              }}
            >
              Your Ritual ({totalCount} {totalCount === 1 ? "item" : "items"})
            </h2>
            <Link
              href="/collections"
              className="text-caption kodo-focus-ring"
              style={{
                color: "var(--sys-color-text-accent)",
                textDecoration: "none",
              }}
            >
              Modify
            </Link>
          </div>

          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "var(--ref-space-3)",
            }}
          >
            {items.map((item) => (
              <li
                key={item.lineKey}
                style={{
                  display: "flex",
                  gap: "var(--ref-space-3)",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "66px",
                    position: "relative",
                    flexShrink: 0,
                    overflow: "hidden",
                    backgroundColor: "var(--sys-color-bg)",
                    border: "1px solid var(--sys-color-border)",
                  }}
                >
                  <Image
                    src={item.product.image}
                    alt={`KODŌ ${item.product.name}`}
                    fill
                    sizes="52px"
                    style={{ objectFit: "contain", padding: "3px" }}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontFamily:
                        "var(--font-editorial-display), Georgia, serif",
                      fontSize: "var(--ref-font-size-base)",
                      color: "var(--sys-color-text-primary)",
                    }}
                  >
                    {item.product.name}
                  </p>
                  <p className="text-caption" style={{ fontSize: "0.75rem" }}>
                    {item.product.size} × {item.quantity}
                  </p>
                </div>

                <p
                  className="text-body"
                  style={{
                    color: "var(--sys-color-text-primary)",
                    fontWeight: 500,
                  }}
                >
                  {formatCents(Math.round(item.product.price * 100) * item.quantity)}
                </p>
              </li>
            ))}
          </ul>

          <div
            style={{
              paddingTop: "var(--ref-space-3)",
              borderTop: "1px solid var(--sys-color-border)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--ref-space-2)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span className="text-caption">Subtotal</span>
              <span
                className="text-body"
                style={{ color: "var(--sys-color-text-primary)" }}
              >
                {formatCents(financials.subtotalCents)}
              </span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span className="text-caption">
                {financials.qualifiesFreeShipping
                  ? COMMERCE_CONFIG.shipping.complimentaryLabel
                  : COMMERCE_CONFIG.shipping.methodLabel}
              </span>
              <span
                className="text-body"
                style={{
                  color: financials.qualifiesFreeShipping
                    ? "var(--sys-color-text-accent)"
                    : "var(--sys-color-text-primary)",
                }}
              >
                {financials.qualifiesFreeShipping
                  ? "Complimentary"
                  : formatCents(financials.shippingCents)}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                paddingTop: "var(--ref-space-2)",
                borderTop: "1px solid var(--sys-color-border)",
                marginTop: "var(--ref-space-1)",
              }}
            >
              <span className="text-label">Total</span>
              <span
                style={{
                  fontFamily: "var(--font-editorial-display), Georgia, serif",
                  fontSize: "var(--ref-font-size-title)",
                  color: "var(--sys-color-text-accent)",
                }}
              >
                {formatCents(financials.totalCents)}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="kodo-btn-solid kodo-focus-ring"
            style={{
              width: "100%",
              marginTop: "var(--ref-space-2)",
              opacity: isPending ? 0.65 : 1,
              cursor: isPending ? "wait" : "pointer",
            }}
          >
            {isPending ? (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span
                  aria-hidden="true"
                  className="kodo-spin"
                  style={{
                    width: "14px",
                    height: "14px",
                    border: "2px solid var(--sys-color-text-inverted)",
                    borderTopColor: "transparent",
                    borderRadius: "50%",
                    display: "inline-block",
                  }}
                />
                {mode === "live"
                  ? "Redirecting to Stripe…"
                  : "Confirming Atelier Order…"}
              </span>
            ) : mode === "live" ? (
              "Continue to Payment"
            ) : (
              "Complete Demo Order"
            )}
          </button>

          <p
            className="text-caption"
            style={{
              fontSize: "0.75rem",
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            {COMMERCE_CONFIG.shipping.estimatedTransit}
          </p>
        </aside>
      </form>

      <footer
        style={{
          maxWidth: "1200px",
          marginInline: "auto",
          marginTop: "var(--ref-space-12)",
          paddingTop: "var(--ref-space-4)",
          borderTop: "1px solid var(--sys-color-border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "var(--ref-space-3)",
        }}
      >
        <p className="text-caption">{SITE_CONFIG.brand.copyright}</p>
        <div style={{ display: "flex", gap: "var(--ref-space-4)" }}>
          {SITE_CONFIG.navigation.legal.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-caption kodo-focus-ring"
              style={{ textDecoration: "none" }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </footer>

      <style>{`
        .checkout-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--ref-space-4);
        }
        .checkout-postal-col {
          max-width: 240px;
        }
        @media (max-width: 900px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
          }
          .checkout-two-col {
            grid-template-columns: 1fr;
          }
          .checkout-postal-col {
            max-width: 100%;
          }
        }
      `}</style>
    </main>
  );
}
