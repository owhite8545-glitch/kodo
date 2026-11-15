import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import {
  SITE_CONFIG,
  resolveBaseUrl,
} from "../src/config/site.ts";
import {
  JOURNAL_POSTS,
  PRODUCTS,
  getJournalArticleBySlug,
  getProductBySlug,
  getRelatedProducts,
} from "../src/data/products.ts";
import { conciergeFormSchema } from "../src/lib/concierge-schema.ts";

describe("Site URL resolution and configuration completeness", () => {
  it("resolves canonical base URL across environment precedence without throwing", () => {
    const savedPublic = process.env.NEXT_PUBLIC_BASE_URL;
    const savedProd = process.env.VERCEL_PROJECT_PRODUCTION_URL;
    const savedVercel = process.env.VERCEL_URL;

    try {
      delete process.env.NEXT_PUBLIC_BASE_URL;
      delete process.env.VERCEL_PROJECT_PRODUCTION_URL;
      delete process.env.VERCEL_URL;
      assert.equal(resolveBaseUrl(), "http://localhost:3000");

      process.env.VERCEL_URL = "kodo-preview-123.vercel.app/";
      assert.equal(resolveBaseUrl(), "https://kodo-preview-123.vercel.app");

      process.env.VERCEL_PROJECT_PRODUCTION_URL = "kodo-livid.vercel.app/";
      assert.equal(resolveBaseUrl(), "https://kodo-livid.vercel.app");

      process.env.NEXT_PUBLIC_BASE_URL = "https://kodo-maison.com///";
      assert.equal(resolveBaseUrl(), "https://kodo-maison.com");
    } finally {
      if (savedPublic === undefined) delete process.env.NEXT_PUBLIC_BASE_URL;
      else process.env.NEXT_PUBLIC_BASE_URL = savedPublic;

      if (savedProd === undefined)
        delete process.env.VERCEL_PROJECT_PRODUCTION_URL;
      else process.env.VERCEL_PROJECT_PRODUCTION_URL = savedProd;

      if (savedVercel === undefined) delete process.env.VERCEL_URL;
      else process.env.VERCEL_URL = savedVercel;
    }
  });

  it("contains zero unresolved template placeholders across brand copy and studios", () => {
    const collectStrings = (value: unknown): string[] => {
      if (typeof value === "string") return [value];
      if (Array.isArray(value)) return value.flatMap(collectStrings);
      if (value && typeof value === "object") {
        return Object.values(value).flatMap(collectStrings);
      }
      return [];
    };

    const strings = collectStrings(SITE_CONFIG);
    assert.ok(strings.length > 20);
    for (const entry of strings) {
      assert.equal(
        /\[[^\]]+\]|¤/.test(entry),
        false,
        `Found unresolved placeholder text inside SITE_CONFIG: ${entry}`
      );
    }
  });
});

describe("Catalog and Journal data + asset integrity", () => {
  it("has valid products, unique slugs, positive pricing, and non-self related items", () => {
    const slugs = new Set<string>();
    assert.ok(PRODUCTS.length >= 3);

    for (const product of PRODUCTS) {
      assert.equal(slugs.has(product.slug), false, `Duplicate slug ${product.slug}`);
      slugs.add(product.slug);
      assert.ok(product.price > 0);
      assert.ok(product.sizes.length >= 1);
      assert.equal(getProductBySlug(product.slug)?.id, product.id);

      const related = getRelatedProducts(product.slug, 2);
      assert.ok(related.length >= 1);
      assert.equal(
        related.some((item) => item.slug === product.slug),
        false
      );
    }
  });

  it("verifies every referenced product, journal, and studio image exists in public/", () => {
    const publicDir = path.join(process.cwd(), "public");
    const assertAssetExists = (webPath: string, owner: string) => {
      assert.ok(webPath.startsWith("/"), `${owner} image path must start with /`);
      const diskPath = path.join(publicDir, webPath.slice(1));
      assert.equal(
        fs.existsSync(diskPath),
        true,
        `Missing public asset for ${owner}: ${webPath}`
      );
    };

    for (const product of PRODUCTS) {
      assertAssetExists(product.image, `${product.slug}.image`);
      assertAssetExists(product.images.hero, `${product.slug}.images.hero`);
      assertAssetExists(product.images.detail, `${product.slug}.images.detail`);
      assertAssetExists(
        product.images.socialOg,
        `${product.slug}.images.socialOg`
      );
    }

    for (const article of JOURNAL_POSTS) {
      assertAssetExists(article.image, `journal/${article.slug}`);
      assert.ok(article.content.length > 200);
      assert.equal(getJournalArticleBySlug(article.slug)?.slug, article.slug);
    }

    for (const studio of SITE_CONFIG.studios) {
      assertAssetExists(studio.image, `studio/${studio.id}`);
    }
  });
});

describe("Concierge form validation", () => {
  it("validates well-formed inquiries and rejects short/malformed payloads", () => {
    const valid = conciergeFormSchema.safeParse({
      inquiryType: "bespoke",
      name: "Kenji Takahashi",
      email: "KENJI@EXAMPLE.COM",
      subject: "Private gallery installation",
      message: "We would like to discuss a custom wood-and-resin olfactory object for autumn.",
      website: "",
    });

    assert.equal(valid.success, true);
    if (valid.success) {
      assert.equal(valid.data.email, "kenji@example.com");
    }

    const invalid = conciergeFormSchema.safeParse({
      inquiryType: "invalid-category",
      name: "K",
      email: "bad-email",
      subject: "Hi",
      message: "Short",
      website: "",
    });

    assert.equal(invalid.success, false);
  });
});
