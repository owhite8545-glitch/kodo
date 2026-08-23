import type { OrderRecord } from "@/types/webgl";

/* ═══════════════════════════════════════════════════════════
   KODŌ — Order Repository
   Server-side persistence for demo and live order records.

   Adapter Resolution (strictly deterministic):
   ─────────────────────────────────────────────
   1. Local Dev Demo: In-memory adapter (NODE_ENV=development,
      COMMERCE_MODE≠live, Upstash credentials absent).
      Non-durable across process restarts.

   2. Vercel Cloud Demo: Upstash Redis via the Vercel
      Marketplace integration. Mandatory in production.
      If credentials are missing in production, fails
      explicitly. NEVER silently falls back to in-memory.

   3. Live Mode: PostgreSQL via Drizzle ORM (stubbed here,
      activated when COMMERCE_MODE=live).
   ═══════════════════════════════════════════════════════════ */

const DEMO_ORDER_TTL_SECONDS = 86400; // 24 hours
const DEMO_ORDER_KEY_PREFIX = "demo:order:";
const DEMO_IDEMPOTENCY_KEY_PREFIX = "demo:idempotency:";

// ─── Adapter Interface ────────────────────────────────────

interface OrderAdapter {
  saveDemoOrder(token: string, order: OrderRecord): Promise<void>;
  getDemoOrder(token: string): Promise<OrderRecord | null>;
  getDemoOrderByIdempotencyKey(
    idempotencyKey: string
  ): Promise<{ token: string; order: OrderRecord } | null>;
}

// ─── In-Memory Development Adapter ────────────────────────

class InMemoryAdapter implements OrderAdapter {
  private orderStore = new Map<
    string,
    { order: OrderRecord; expiresAt: number }
  >();
  private idempotencyStore = new Map<
    string,
    { token: string; expiresAt: number }
  >();

  async saveDemoOrder(token: string, order: OrderRecord): Promise<void> {
    const expiresAt = Date.now() + DEMO_ORDER_TTL_SECONDS * 1000;
    this.orderStore.set(token, { order, expiresAt });
    this.idempotencyStore.set(order.idempotencyKey, { token, expiresAt });
  }

  async getDemoOrder(token: string): Promise<OrderRecord | null> {
    const entry = this.orderStore.get(token);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.orderStore.delete(token);
      return null;
    }
    return entry.order;
  }

  async getDemoOrderByIdempotencyKey(
    idempotencyKey: string
  ): Promise<{ token: string; order: OrderRecord } | null> {
    const entry = this.idempotencyStore.get(idempotencyKey);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.idempotencyStore.delete(idempotencyKey);
      return null;
    }
    const order = await this.getDemoOrder(entry.token);
    if (!order) return null;
    return { token: entry.token, order };
  }
}

// ─── Upstash Redis Adapter ────────────────────────────────

class UpstashRedisAdapter implements OrderAdapter {
  private redis: import("@upstash/redis").Redis | null = null;

  private async getClient() {
    if (!this.redis) {
      const { Redis } = await import("@upstash/redis");
      this.redis = Redis.fromEnv();
    }
    return this.redis;
  }

  async saveDemoOrder(token: string, order: OrderRecord): Promise<void> {
    const client = await this.getClient();
    // Save order payload keyed by opaque token
    await client.setex(
      `${DEMO_ORDER_KEY_PREFIX}${token}`,
      DEMO_ORDER_TTL_SECONDS,
      JSON.stringify(order)
    );
    // Save idempotency mapping keyed by idempotencyKey
    await client.setex(
      `${DEMO_IDEMPOTENCY_KEY_PREFIX}${order.idempotencyKey}`,
      DEMO_ORDER_TTL_SECONDS,
      token
    );
  }

  async getDemoOrder(token: string): Promise<OrderRecord | null> {
    const client = await this.getClient();
    const raw = await client.get<string | OrderRecord>(
      `${DEMO_ORDER_KEY_PREFIX}${token}`
    );
    if (!raw) return null;
    if (typeof raw === "object") return raw as OrderRecord;
    return JSON.parse(raw) as OrderRecord;
  }

  async getDemoOrderByIdempotencyKey(
    idempotencyKey: string
  ): Promise<{ token: string; order: OrderRecord } | null> {
    const client = await this.getClient();
    const token = await client.get<string>(
      `${DEMO_IDEMPOTENCY_KEY_PREFIX}${idempotencyKey}`
    );
    if (!token) return null;
    const order = await this.getDemoOrder(token);
    if (!order) return null;
    return { token, order };
  }
}

// ─── Adapter Resolution ───────────────────────────────────

function resolveAdapter(): OrderAdapter {
  const isProduction = process.env.NODE_ENV === "production";
  const isLive = process.env.COMMERCE_MODE === "live";

  // Live Mode: PostgreSQL (stubbed — will be implemented when activated)
  if (isLive) {
    throw new Error(
      "Live Mode OrderRepository requires PostgreSQL configuration. " +
        "Set COMMERCE_MODE=demo or configure POSTGRES_URL for live operation."
    );
  }

  // Production Demo Mode: Upstash Redis is MANDATORY
  if (isProduction) {
    const hasUrl = !!process.env.UPSTASH_REDIS_REST_URL;
    const hasToken = !!process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!hasUrl || !hasToken) {
      throw new Error(
        "Missing Upstash Redis configuration for Cloud Demo Mode: " +
          "UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN must be set in production. " +
          "The in-memory adapter is only available in local development (NODE_ENV=development)."
      );
    }

    return new UpstashRedisAdapter();
  }

  // Local Development Demo Mode: In-memory adapter
  // Intentionally non-durable across process restarts.
  return new InMemoryAdapter();
}

// Singleton adapter instance
let adapterInstance: OrderAdapter | null = null;

function getAdapter(): OrderAdapter {
  if (!adapterInstance) {
    adapterInstance = resolveAdapter();
  }
  return adapterInstance;
}

// ─── Public API ───────────────────────────────────────────

export const OrderRepository = {
  /**
   * Persist a demo order. The complete OrderRecord is stored
   * server-side; only the opaque token goes to the cookie.
   */
  async saveDemoOrder(token: string, order: OrderRecord): Promise<void> {
    const adapter = getAdapter();
    await adapter.saveDemoOrder(token, order);
  },

  /**
   * Retrieve a demo order by opaque token and validate against
   * the expected orderId for integrity.
   */
  async getDemoOrder(
    orderId: string,
    token: string
  ): Promise<OrderRecord | null> {
    const adapter = getAdapter();
    const order = await adapter.getDemoOrder(token);
    if (!order) return null;
    // Verify the order ID matches the token lookup
    if (order.id !== orderId) return null;
    return order;
  },

  /**
   * Retrieve an existing demo order by idempotency key.
   * Enforces server-side idempotency across retries/duplicate requests.
   */
  async getDemoOrderByIdempotencyKey(
    idempotencyKey: string
  ): Promise<{ token: string; order: OrderRecord } | null> {
    const adapter = getAdapter();
    return await adapter.getDemoOrderByIdempotencyKey(idempotencyKey);
  },
};
