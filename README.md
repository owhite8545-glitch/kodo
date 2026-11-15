# KODŌ — Olfactory Quiet Luxury Storefront

A production-ready **Next.js 16 + React 19** luxury fragrance storefront built with an editorial OKLCH obsidian/alabaster/gold design system, `Playfair Display` + `DM Sans` typography, dual **Demo / Live Stripe** checkout architecture, HMAC-signed demo receipts, interactive collections filtering, and a complete editorial journal.

---

## Key Capabilities

- **Zero-Crash Dual Commerce Modes**
  - **Demo Mode (`COMMERCE_MODE="demo"`, default):** Works cleanly out of the box with zero API keys—ideal for live previews, agency demos, and template evaluation. Server Actions validate catalog pricing and stock server-side and issue signed `HttpOnly` receipt cookies (`kodo_demo_token` + `kodo_demo_receipt`).
  - **Live Stripe Mode (`COMMERCE_MODE="live"`):** Creates real Stripe Checkout Sessions (`stripe` v22+) and verifies payments via webhook (`/api/webhooks/stripe`) and session retrieval on `/checkout/success`.
- **Single-File Brand Customization:** Rebrand the entire maison from [`src/config/site.ts`](src/config/site.ts) and currency/shipping/Stripe settings from [`src/config/commerce.ts`](src/config/commerce.ts).
- **Zero-Error Hydration & Accessibility:** `useSyncExternalStore`-backed hydration and reduced-motion hooks prevent React SSR mismatches, paired with focus rings, `inert` overlays, skip links, and responsive `overflow-x: clip` grids.
- **Full Storefront & Editorial Suite:**
  - Flagship editorial homepage (`/`)
  - Interactive collections filter & sort (`/collections`)
  - Variant-aware Product Detail Pages with JSON-LD Product schema (`/products/[slug]`)
  - Dynamic Editorial Journal index & article reader (`/journal`, `/journal/[slug]`)
  - Story (`/story`), Atelier Studios (`/about`), Concierge Server Action form with optional webhook (`/concierge`), and legal/care documents (`/shipping`, `/privacy`, `/terms`)
  - Dynamic `/robots.txt`, `/sitemap.xml`, `not-found.tsx`, `error.tsx`, and `global-error.tsx`

---

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The storefront boots immediately in **Demo Mode** without configuring Stripe or Redis.

---

## Customization Guide

1. **Brand Identity, Copy & Navigation:** Edit [`src/config/site.ts`](src/config/site.ts) (`SITE_CONFIG.brand`, `studios`, `team`, `navigation`, `copy`).
2. **Pricing, Currency & Courier Thresholds:** Edit [`src/config/commerce.ts`](src/config/commerce.ts) (`COMMERCE_CONFIG`, `SHIPPING_REGIONS`).
3. **Catalog & Journal Essays:** Edit [`src/data/products.ts`](src/data/products.ts) and replace photography inside `public/images/products/`.
4. **Live Payments:** Set `COMMERCE_MODE="live"`, `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, and `STRIPE_WEBHOOK_SECRET` (pointing `/api/webhooks/stripe`), plus `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` for durable order persistence.

---

## Verification Commands

```bash
npm run typecheck   # TypeScript strict check
npm run lint        # ESLint + React Compiler / a11y rules
npm test            # Native Node test suite for pricing, schemas & HMAC receipts
npm run build       # Production Next.js build
```
