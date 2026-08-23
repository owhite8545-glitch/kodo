/* ────────────────────────────────────────────────────────────
 * KODŌ — WebGL Type Safety Overrides
 * Strict type definitions for WebGL structures, performance
 * telemetry, e-commerce models, and spatial zone controllers.
 * ──────────────────────────────────────────────────────────── */

// ═══════════════════════════════════════════════════════════
// 1. Performance & Hardware Profiling
// ═══════════════════════════════════════════════════════════

export type PerformanceTier = "high" | "medium" | "low";

export interface PerformanceTelemetry {
  fps: number;
  drawCalls: number;
  frameTimeMs: number;
  vramAllocatedMb: number;
  tier: PerformanceTier;
  initialized: boolean;
}

// ═══════════════════════════════════════════════════════════
// 2. Spatial Zone Management
// ═══════════════════════════════════════════════════════════

export type ZoneId = "hero-vapor" | "product-bottles" | "craftsman-glass";

export interface SpatialZone {
  id: ZoneId;
  label: string;
  scrollStart: number; // 0.0 – 1.0
  scrollEnd: number;
  priority: number;
  loaded: boolean;
}

// ═══════════════════════════════════════════════════════════
// 3. Catmull-Rom Spline Control Points
// ═══════════════════════════════════════════════════════════

export interface SplineControlPoint {
  position: [number, number, number];
  lookAt: [number, number, number];
  progress: number; // 0.0 – 1.0
}

// ═══════════════════════════════════════════════════════════
// 4. E-Commerce Data Models
// ═══════════════════════════════════════════════════════════

export type ScentFamily = "mineral" | "botanical" | "resinous" | "aquatic";

export type ScentVariant = "30ml" | "50ml" | "100ml";

export interface ProductImages {
  hero: string;
  pureProduct: string;
  detail: string;
  socialOg: string;
}

export interface OgDimensions {
  width: number;
  height: number;
}

export interface ScentProduct {
  id: string;
  name: string;
  subtitle: string;
  family: ScentFamily;
  description: string;
  price: number;
  size: ScentVariant;
  sizes: { variant: ScentVariant; price: number; inStock: boolean }[];
  image: string;
  images: ProductImages;
  ogDimensions: OgDimensions;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  inStock: boolean;
  slug: string;
}

export interface CartItem {
  lineKey: string; // "so-001::50ml" — composite productId::variant
  product: ScentProduct;
  quantity: number;
}

// ═══════════════════════════════════════════════════════════
// 4b. Order & Checkout Models
// ═══════════════════════════════════════════════════════════

export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export interface OrderLineItem {
  productId: string;
  productName: string;
  variant: ScentVariant;
  quantity: number;
  unitPriceCents: number;
  lineTotalCents: number;
}

export interface OrderRecord {
  id: string;
  idempotencyKey: string;
  mode: "demo" | "live";
  stripeSessionId: string | null;
  stripePaymentIntentId: string | null;

  customer: {
    name: string;
    email: string;
    phone: string | null;
  };

  shipping: {
    addressLine1: string;
    addressLine2: string | null;
    city: string;
    stateOrRegion: string | null;
    postalCode: string;
    country: string;
  };

  lineItems: OrderLineItem[];

  financials: {
    currency: string;
    subtotalCents: number;
    shippingCents: number;
    taxCents: number;
    totalCents: number;
  };

  status: OrderStatus;
  createdAt: string;
  paidAt: string | null;
}

export interface CheckoutSubmission {
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shipping: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    stateOrRegion: string;
    postalCode: string;
    country: string;
  };
  cartItems: {
    lineKey: string;
    productId: string;
    variant: ScentVariant;
    quantity: number;
  }[];
  idempotencyKey: string;
}

// ═══════════════════════════════════════════════════════════
// 5. Editorial & Journal Models
// ═══════════════════════════════════════════════════════════

export interface JournalPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  image: string;
  readTime: string;
}

export interface JournalArticle extends JournalPost {
  content: string;
  footnotes?: string[];
}

// ═══════════════════════════════════════════════════════════
// 6. Testimonial Models
// ═══════════════════════════════════════════════════════════

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
}

// ═══════════════════════════════════════════════════════════
// 7. Contact & Form Models
// ═══════════════════════════════════════════════════════════

export interface ConciergeFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  inquiryType: "general" | "consultation" | "wholesale" | "press";
}

export interface FormState {
  status: "idle" | "pending" | "success" | "error";
  message: string;
}

// ═══════════════════════════════════════════════════════════
// 8. GLSL Shader Module Declarations
// ═══════════════════════════════════════════════════════════

declare module "*.vert" {
  const content: string;
  export default content;
}

declare module "*.frag" {
  const content: string;
  export default content;
}

declare module "*.glsl" {
  const content: string;
  export default content;
}
