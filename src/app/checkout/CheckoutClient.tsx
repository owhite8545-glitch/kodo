"use client";

import React, { useState, useEffect, useCallback, useTransition, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { COMMERCE_CONFIG, isDemoMode, formatPrice } from "@/config/commerce";
import { submitCheckout } from "./actions";
import type { ScentVariant } from "@/types/webgl";

/* ═══════════════════════════════════════════════════════════
   KODŌ — Checkout Client Component
   Single-page editorial checkout with customer/shipping
   form, order summary, validation, idempotency, and
   demo mode notice.
   ═══════════════════════════════════════════════════════════ */

// ─── Idempotency Key Management ───────────────────────────

const IDEMPOTENCY_STORAGE_KEY = "kodo-checkout-idempotency-key";

function getOrCreateIdempotencyKey(): string {
  if (typeof window === "undefined") return crypto.randomUUID();
  let key = sessionStorage.getItem(IDEMPOTENCY_STORAGE_KEY);
  if (!key) {
    key = crypto.randomUUID();
    sessionStorage.setItem(IDEMPOTENCY_STORAGE_KEY, key);
  }
  return key;
}

function rotateIdempotencyKey(): string {
  const key = crypto.randomUUID();
  if (typeof window !== "undefined") {
    sessionStorage.setItem(IDEMPOTENCY_STORAGE_KEY, key);
  }
  return key;
}

// ─── Form Field Component ─────────────────────────────────

function FormField({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  required = false,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label
        htmlFor={id}
        className="text-caption"
        style={{
          textTransform: "uppercase",
          letterSpacing: "var(--ref-letter-spacing-wide)",
        }}
      >
        {label}
        {required && (
          <span style={{ color: "var(--sys-color-text-accent)" }}> *</span>
        )}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        autoComplete={
          id === "email"
            ? "email"
            : id === "name"
              ? "name"
              : id === "phone"
                ? "tel"
                : id === "addressLine1"
                  ? "address-line1"
                  : id === "addressLine2"
                    ? "address-line2"
                    : id === "city"
                      ? "address-level2"
                      : id === "stateOrRegion"
                        ? "address-level1"
                        : id === "postalCode"
                          ? "postal-code"
                          : undefined
        }
        className="kodo-focus-ring"
        style={{
          width: "100%",
          padding: "12px 16px",
          background: "transparent",
          border: error
            ? "1px solid oklch(65% 0.2 25)"
            : "1px solid var(--sys-color-border)",
          color: "var(--sys-color-text-primary)",
          fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
          fontSize: "var(--ref-font-size-base)",
          lineHeight: 1.5,
          transition: "border-color 200ms var(--ease-decelerate)",
          outline: "none",
        }}
      />
      {error && (
        <span
          style={{
            fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
            fontSize: "var(--ref-font-size-small)",
            color: "oklch(65% 0.2 25)",
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}

const emptySubscribe = () => () => {};
function useHydrated(): boolean {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

// ─── Main Checkout Client Component ───────────────────────

export function CheckoutClient() {
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const totalItems = useCartStore((s) => s.totalItems);
  const cartVersion = useCartStore((s) => s.cartVersion);

  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const hydrated = useHydrated();

  // Track previous cart version to rotate idempotency key on changes
  const prevCartVersionRef = useRef<number | null>(null);

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    stateOrRegion: "",
    postalCode: "",
    country: "",
  });

  // Rotate idempotency key when cart items or quantities change
  useEffect(() => {
    if (prevCartVersionRef.current === null) {
      getOrCreateIdempotencyKey();
      prevCartVersionRef.current = cartVersion;
    } else if (prevCartVersionRef.current !== cartVersion) {
      rotateIdempotencyKey();
      prevCartVersionRef.current = cartVersion;
    }
  }, [cartVersion]);

  const updateField = useCallback(
    (field: keyof typeof form) => (value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      // Clear field-specific errors upon edit
      setFieldErrors((prev) => {
        const next = { ...prev };
        for (const key of Object.keys(next)) {
          if (key.includes(field)) delete next[key];
        }
        return next;
      });
    },
    []
  );

  const getFieldError = (path: string): string | undefined => {
    const errors = fieldErrors[path];
    return errors?.[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setFieldErrors({});

    const idempotencyKey = getOrCreateIdempotencyKey();

    const payload = {
      customer: {
        name: form.name,
        email: form.email,
        phone: form.phone,
      },
      shipping: {
        addressLine1: form.addressLine1,
        addressLine2: form.addressLine2,
        city: form.city,
        stateOrRegion: form.stateOrRegion,
        postalCode: form.postalCode,
        country: form.country,
      },
      cartItems: items.map((item) => ({
        lineKey: item.lineKey,
        productId: item.product.id,
        variant: item.product.size as ScentVariant,
        quantity: item.quantity,
      })),
      idempotencyKey,
    };

    startTransition(async () => {
      try {
        const result = await submitCheckout(payload);
        if (!result.success) {
          if (result.fieldErrors) setFieldErrors(result.fieldErrors);
          setServerError(result.error || "An unexpected error occurred.");
        }
      } catch {
        // redirect() throws NEXT_REDIRECT internally, which Next.js uses for navigation.
      }
    });
  };

  /* ── Empty Cart State ────────────────────────────────── */
  if (hydrated && items.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          textAlign: "center",
          gap: "var(--ref-space-4)",
          paddingInline: "var(--sys-space-page-margin)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-editorial-display), Georgia, serif",
            fontSize: "var(--ref-font-size-display)",
            lineHeight: "var(--ref-line-height-tight)",
            color: "var(--sys-color-text-primary)",
          }}
        >
          The ritual awaits
        </p>
        <p
          className="text-body-lg"
          style={{
            color: "var(--sys-color-text-secondary)",
            maxWidth: "40ch",
          }}
        >
          Your collection is empty. Explore our scent taxonomy to begin
          composing your personal ritual.
        </p>
        <Link
          href="/collections"
          className="kodo-btn-solid kodo-focus-ring"
          style={{ marginTop: "var(--ref-space-4)", textDecoration: "none" }}
        >
          Explore Collections
        </Link>
      </div>
    );
  }

  // Pre-hydration placeholder to avoid layout shift / SSR flash
  if (!hydrated) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span className="text-caption" style={{ opacity: 0.5 }}>
          Preparing your ritual…
        </span>
      </div>
    );
  }

  const { symbol } = COMMERCE_CONFIG.currency;

  /* ── Checkout with Items ─────────────────────────────── */
  return (
    <form
      onSubmit={handleSubmit}
      className="checkout-layout"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 420px",
        gap: "var(--ref-space-12)",
        alignItems: "start",
        paddingInline: "var(--sys-space-page-margin)",
        maxWidth: "1440px",
        marginInline: "auto",
        paddingBottom: "var(--sys-space-section)",
      }}
    >
      {/* ── Form Fields Column ─── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--ref-space-8)",
        }}
      >
        {/* Demo Mode Notice */}
        {isDemoMode() && (
          <div
            style={{
              padding: "var(--ref-space-3) var(--ref-space-4)",
              border: "1px solid var(--sys-color-border)",
              background: "oklch(20% 0.005 260 / 0.4)",
            }}
          >
            <p
              className="text-caption"
              style={{
                color: "var(--sys-color-text-secondary)",
                textAlign: "center",
              }}
            >
              Atelier Concept Demonstration — Non-commercial simulation. No real
              payment method charged.
            </p>
          </div>
        )}

        {/* Server Error Alert */}
        {serverError && (
          <div
            role="alert"
            style={{
              padding: "var(--ref-space-3) var(--ref-space-4)",
              border: "1px solid oklch(65% 0.2 25)",
              background: "oklch(25% 0.04 25 / 0.3)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                fontSize: "var(--ref-font-size-caption)",
                color: "oklch(75% 0.15 25)",
              }}
            >
              {serverError}
            </p>
          </div>
        )}

        {/* Customer Information */}
        <fieldset
          style={{
            border: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "var(--ref-space-4)",
          }}
        >
          <legend
            className="text-label"
            style={{
              marginBottom: "var(--ref-space-2)",
              paddingBottom: "var(--ref-space-2)",
              borderBottom: "1px solid var(--sys-color-border)",
              width: "100%",
            }}
          >
            Customer Information
          </legend>

          <FormField
            id="email"
            label="Email Address"
            type="email"
            value={form.email}
            onChange={updateField("email")}
            error={getFieldError("customer.email")}
            required
            placeholder="your@email.com"
          />
          <FormField
            id="name"
            label="Full Name"
            value={form.name}
            onChange={updateField("name")}
            error={getFieldError("customer.name")}
            required
            placeholder="Your full name"
          />
          <FormField
            id="phone"
            label="Phone Number"
            type="tel"
            value={form.phone}
            onChange={updateField("phone")}
            error={getFieldError("customer.phone")}
            placeholder="Optional"
          />
        </fieldset>

        {/* Shipping Address */}
        <fieldset
          style={{
            border: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "var(--ref-space-4)",
          }}
        >
          <legend
            className="text-label"
            style={{
              marginBottom: "var(--ref-space-2)",
              paddingBottom: "var(--ref-space-2)",
              borderBottom: "1px solid var(--sys-color-border)",
              width: "100%",
            }}
          >
            Shipping Address
          </legend>

          {/* Region selector */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <label
              htmlFor="country"
              className="text-caption"
              style={{
                textTransform: "uppercase",
                letterSpacing: "var(--ref-letter-spacing-wide)",
              }}
            >
              Region <span style={{ color: "var(--sys-color-text-accent)" }}>*</span>
            </label>
            <select
              id="country"
              name="country"
              value={form.country}
              onChange={(e) => updateField("country")(e.target.value)}
              required
              className="kodo-focus-ring"
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "transparent",
                border: getFieldError("shipping.country")
                  ? "1px solid oklch(65% 0.2 25)"
                  : "1px solid var(--sys-color-border)",
                color: form.country
                  ? "var(--sys-color-text-primary)"
                  : "var(--sys-color-text-secondary)",
                fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                fontSize: "var(--ref-font-size-base)",
                lineHeight: 1.5,
                cursor: "pointer",
                outline: "none",
                appearance: "none",
              }}
            >
              <option value="" disabled>
                Select region…
              </option>
              {COMMERCE_CONFIG.supportedRegions.map((region) => (
                <option key={region.code} value={region.code}>
                  {region.name}
                </option>
              ))}
            </select>
            {getFieldError("shipping.country") && (
              <span
                style={{
                  fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                  fontSize: "var(--ref-font-size-small)",
                  color: "oklch(65% 0.2 25)",
                }}
              >
                {getFieldError("shipping.country")}
              </span>
            )}
          </div>

          <FormField
            id="addressLine1"
            label="Address"
            value={form.addressLine1}
            onChange={updateField("addressLine1")}
            error={getFieldError("shipping.addressLine1")}
            required
            placeholder="Street address"
          />
          <FormField
            id="addressLine2"
            label="Suite / Apartment"
            value={form.addressLine2}
            onChange={updateField("addressLine2")}
            error={getFieldError("shipping.addressLine2")}
            placeholder="Optional"
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "var(--ref-space-4)",
            }}
          >
            <FormField
              id="city"
              label="City"
              value={form.city}
              onChange={updateField("city")}
              error={getFieldError("shipping.city")}
              required
            />
            <FormField
              id="stateOrRegion"
              label="State / Province"
              value={form.stateOrRegion}
              onChange={updateField("stateOrRegion")}
              error={getFieldError("shipping.stateOrRegion")}
            />
          </div>

          <div style={{ maxWidth: "200px" }}>
            <FormField
              id="postalCode"
              label="Postal / Zip Code"
              value={form.postalCode}
              onChange={updateField("postalCode")}
              error={getFieldError("shipping.postalCode")}
              required
            />
          </div>
        </fieldset>
      </div>

      {/* ── Order Summary Sidebar ─── */}
      <div
        style={{
          position: "sticky",
          top: "var(--ref-space-6)",
          border: "1px solid var(--sys-color-border)",
          padding: "var(--ref-space-6)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--ref-space-4)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "var(--ref-space-3)",
            borderBottom: "1px solid var(--sys-color-border)",
          }}
        >
          <span className="text-label">
            Your Ritual ({totalItems()}{" "}
            {totalItems() === 1 ? "item" : "items"})
          </span>
          <Link
            href="/collections"
            className="text-caption"
            style={{
              color: "var(--sys-color-text-secondary)",
              textDecoration: "none",
              transition: "color 240ms var(--ease-decelerate)",
            }}
          >
            Edit
          </Link>
        </div>

        {/* Line Items List */}
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "var(--ref-space-3)",
            maxHeight: "320px",
            overflowY: "auto",
          }}
        >
          {items.map((item) => (
            <li
              key={item.lineKey}
              style={{
                display: "grid",
                gridTemplateColumns: "60px 1fr auto",
                gap: "var(--ref-space-3)",
                paddingBottom: "var(--ref-space-3)",
                borderBottom: "1px solid var(--sys-color-border)",
                alignItems: "center",
              }}
            >
              {/* Thumbnail */}
              <div
                style={{
                  aspectRatio: "3/4",
                  backgroundColor: "var(--sys-color-surface)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={item.product.images.pureProduct}
                  alt={`KODŌ ${item.product.name}`}
                  fill
                  sizes="60px"
                  style={{ objectFit: "contain" }}
                />
              </div>

              {/* Details */}
              <div>
                <p
                  style={{
                    fontFamily:
                      "var(--font-editorial-display), Georgia, serif",
                    fontSize: "var(--ref-font-size-caption)",
                    fontWeight: 400,
                  }}
                >
                  {item.product.name}
                </p>
                <p
                  className="text-caption"
                  style={{
                    opacity: 0.7,
                    fontSize: "var(--ref-font-size-small)",
                  }}
                >
                  {item.product.size} × {item.quantity}
                </p>
              </div>

              {/* Line total */}
              <p
                style={{
                  fontFamily:
                    "var(--font-utility-sans), system-ui, sans-serif",
                  fontSize: "var(--ref-font-size-caption)",
                  fontVariantNumeric: "tabular-nums",
                  color: "var(--sys-color-text-accent)",
                }}
              >
                {formatPrice(
                  Math.round(item.product.price * 100) * item.quantity
                )}
              </p>
            </li>
          ))}
        </ul>

        {/* Totals */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--ref-space-2)",
            paddingTop: "var(--ref-space-2)",
            borderTop: "1px solid var(--sys-color-border)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className="text-caption">Subtotal</span>
            <span
              style={{
                fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                fontSize: "var(--ref-font-size-caption)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {formatPrice(Math.round(totalPrice() * 100))}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className="text-caption">
              {COMMERCE_CONFIG.shipping.policyLabel}
            </span>
            <span className="text-caption">
              {COMMERCE_CONFIG.shipping.defaultRateCents === 0
                ? `${symbol}0.00`
                : formatPrice(COMMERCE_CONFIG.shipping.defaultRateCents)}
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "var(--ref-space-3)",
            borderTop: "1px solid var(--sys-color-border)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
              fontSize: "var(--ref-font-size-base)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "var(--ref-letter-spacing-sans)",
            }}
          >
            Total
          </span>
          <span
            style={{
              fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
              fontSize: "var(--ref-font-size-title)",
              fontVariantNumeric: "tabular-nums",
              color: "var(--sys-color-text-primary)",
            }}
          >
            {formatPrice(Math.round(totalPrice() * 100))}
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="kodo-btn-solid kodo-focus-ring"
          style={{
            width: "100%",
            opacity: isPending ? 0.6 : 1,
            cursor: isPending ? "not-allowed" : "pointer",
            position: "relative",
          }}
        >
          {isPending ? (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--ref-space-2)",
              }}
            >
              <span
                style={{
                  width: 16,
                  height: 16,
                  border: "2px solid var(--sys-color-text-inverted)",
                  borderTopColor: "transparent",
                  borderRadius: "50%",
                  display: "inline-block",
                  animation: "spin 800ms linear infinite",
                }}
              />
              Processing…
            </span>
          ) : isDemoMode() ? (
            "Complete Ritual"
          ) : (
            "Proceed to Payment"
          )}
        </button>
      </div>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        @media (max-width: 768px) {
          .checkout-layout {
            grid-template-columns: 1fr !important;
            gap: var(--ref-space-6) !important;
          }
        }
      `}</style>
    </form>
  );
}
