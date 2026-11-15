import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  COMMERCE_CONFIG,
  calculateOrderFinancials,
  formatCatalogPrice,
  formatCents,
  resolveCommerceMode,
} from "../src/config/commerce.ts";
import { validateCheckout } from "../src/lib/checkout-schema.ts";
import {
  signDemoReceipt,
  verifyDemoReceipt,
} from "../src/lib/demo-receipt.ts";
import type { OrderRecord } from "../src/types/webgl.d.ts";

describe("Commerce financials and currency formatting", () => {
  it("charges standard courier fee below the free-shipping threshold", () => {
    const result = calculateOrderFinancials([
      { unitPriceCents: 18500, quantity: 1 },
    ]);

    assert.equal(result.currency, COMMERCE_CONFIG.currency.code);
    assert.equal(result.subtotalCents, 18500);
    assert.equal(result.shippingCents, COMMERCE_CONFIG.shipping.standardRateCents);
    assert.equal(result.taxCents, 0);
    assert.equal(
      result.totalCents,
      18500 + COMMERCE_CONFIG.shipping.standardRateCents
    );
    assert.equal(result.qualifiesFreeShipping, false);
    assert.equal(result.amountToFreeShippingCents, 3500);
  });

  it("applies complimentary courier shipping at or above the threshold", () => {
    const result = calculateOrderFinancials([
      { unitPriceCents: 22000, quantity: 1 },
    ]);

    assert.equal(result.subtotalCents, 22000);
    assert.equal(result.shippingCents, 0);
    assert.equal(result.totalCents, 22000);
    assert.equal(result.qualifiesFreeShipping, true);
    assert.equal(result.amountToFreeShippingCents, 0);
  });

  it("accumulates multi-item quantities accurately", () => {
    const result = calculateOrderFinancials([
      { unitPriceCents: 14000, quantity: 2 },
      { unitPriceCents: 24000, quantity: 1 },
    ]);

    assert.equal(result.subtotalCents, 52000);
    assert.equal(result.shippingCents, 0);
    assert.equal(result.totalCents, 52000);
  });

  it("formats cents and catalog dollar values consistently without placeholder symbols", () => {
    assert.equal(formatCents(24000), "$240.00");
    assert.equal(formatCents(1850), "$18.50");
    assert.equal(formatCatalogPrice(240), "$240");
    assert.equal(formatCatalogPrice(240.5), "$240.50");
  });
});

describe("Commerce mode resolution", () => {
  it("defaults safely to demo mode without Stripe credentials", () => {
    const prevMode = process.env.COMMERCE_MODE;
    const prevKey = process.env.STRIPE_SECRET_KEY;

    try {
      delete process.env.COMMERCE_MODE;
      delete process.env.STRIPE_SECRET_KEY;
      assert.equal(resolveCommerceMode(), "demo");

      process.env.COMMERCE_MODE = "live";
      process.env.STRIPE_SECRET_KEY = "   ";
      assert.equal(resolveCommerceMode(), "demo");

      process.env.COMMERCE_MODE = "live";
      process.env.STRIPE_SECRET_KEY = "sk_test_example_key";
      assert.equal(resolveCommerceMode(), "live");
    } finally {
      if (prevMode === undefined) delete process.env.COMMERCE_MODE;
      else process.env.COMMERCE_MODE = prevMode;

      if (prevKey === undefined) delete process.env.STRIPE_SECRET_KEY;
      else process.env.STRIPE_SECRET_KEY = prevKey;
    }
  });
});

describe("Checkout schema validation", () => {
  it("accepts a valid checkout submission payload", () => {
    const parsed = validateCheckout({
      customer: {
        name: "Amina Laurent",
        email: "amina@example.com",
        phone: "+1 212 555 0144",
      },
      shipping: {
        addressLine1: "48 Mercer Street",
        addressLine2: "Suite 4B",
        city: "New York",
        stateOrRegion: "NY",
        postalCode: "10013",
        country: "US",
      },
      cartItems: [
        {
          lineKey: "so-001::50ml",
          productId: "so-001",
          variant: "50ml",
          quantity: 1,
        },
      ],
      idempotencyKey: "550e8400-e29b-41d4-a716-446655440000",
    });

    assert.equal(parsed.success, true);
  });

  it("rejects empty carts, invalid emails, and non-UUID idempotency keys", () => {
    const parsed = validateCheckout({
      customer: {
        name: "Amina Laurent",
        email: "not-an-email",
      },
      shipping: {
        addressLine1: "48 Mercer Street",
        city: "New York",
        postalCode: "10013",
        country: "US",
      },
      cartItems: [],
      idempotencyKey: "bad-key",
    });

    assert.equal(parsed.success, false);
  });
});

describe("HMAC signed demo receipt lifecycle", () => {
  const sampleOrder: OrderRecord = {
    id: "KODO-DEMO-1234",
    idempotencyKey: "550e8400-e29b-41d4-a716-446655440000",
    mode: "demo",
    stripeSessionId: null,
    stripePaymentIntentId: null,
    customer: {
      name: "Kenji Sato",
      email: "kenji@example.com",
      phone: null,
    },
    shipping: {
      addressLine1: "5-7-21 Minami-Aoyama",
      addressLine2: null,
      city: "Minato-ku",
      stateOrRegion: "Tokyo",
      postalCode: "107-0062",
      country: "JP",
    },
    lineItems: [
      {
        productId: "so-001",
        productName: "SŌ",
        variant: "50ml",
        quantity: 1,
        unitPriceCents: 24000,
        lineTotalCents: 24000,
      },
    ],
    financials: {
      currency: "USD",
      subtotalCents: 24000,
      shippingCents: 0,
      taxCents: 0,
      totalCents: 24000,
    },
    status: "paid",
    createdAt: "2026-06-01T12:00:00.000Z",
    paidAt: "2026-06-01T12:00:00.000Z",
  };

  it("roundtrips a validly signed receipt within TTL", () => {
    const now = 1_780_000_000_000;
    const token = signDemoReceipt(sampleOrder, now);
    const verified = verifyDemoReceipt(token, sampleOrder.id, now + 5_000);

    assert.ok(verified);
    assert.equal(verified.id, sampleOrder.id);
    assert.equal(verified.financials.totalCents, 24000);
    assert.equal(verified.customer.email, "kenji@example.com");
  });

  it("rejects tampered payloads, altered signatures, mismatched order IDs, and expired receipts", () => {
    const now = 1_780_000_000_000;
    const token = signDemoReceipt(sampleOrder, now);
    const [payload, signature] = token.split(".");

    assert.equal(verifyDemoReceipt(undefined), null);
    assert.equal(verifyDemoReceipt("malformed"), null);
    assert.equal(verifyDemoReceipt(token, "KODO-OTHER-ID", now + 1000), null);
    assert.equal(
      verifyDemoReceipt(token, sampleOrder.id, now + 61 * 60 * 1000),
      null
    );

    const swappedChar = signature.startsWith("A") ? "B" : "A";
    assert.equal(
      verifyDemoReceipt(`${payload}.${swappedChar}${signature.slice(1)}`, sampleOrder.id, now + 1000),
      null
    );

    const forgedPayload = Buffer.from(
      JSON.stringify({
        exp: now + 60_000,
        order: { ...sampleOrder, financials: { ...sampleOrder.financials, totalCents: 1 } },
      }),
      "utf8"
    ).toString("base64url");
    assert.equal(
      verifyDemoReceipt(`${forgedPayload}.${signature}`, sampleOrder.id, now + 1000),
      null
    );
  });
});
