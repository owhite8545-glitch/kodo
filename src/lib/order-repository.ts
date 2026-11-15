import { Redis } from "@upstash/redis";
import type { OrderRecord, OrderStatus } from "@/types/webgl";

/* ═══════════════════════════════════════════════════════════
   Order Persistence Abstraction
   - Upstash Redis when configured (distributed across serverless lambdas)
   - In-Memory cache fallback for Demo Mode (paired with signed HttpOnly cookie
     in actions.ts for stateless serverless resilience)
   - Never crashes Vercel deployments missing external Redis/Postgres in Demo Mode
   ═══════════════════════════════════════════════════════════ */

const ORDER_TTL_SECONDS = 3600 * 24; // 24 hours for persistent order records
const MEMORY_MAX_ENTRIES = 100;

interface OrderAdapter {
  create(order: OrderRecord): Promise<void>;
  findById(orderId: string): Promise<OrderRecord | null>;
  findByIdempotencyKey(key: string): Promise<OrderRecord | null>;
  updateStatus(
    orderId: string,
    status: OrderStatus,
    extra?: Partial<
      Pick<OrderRecord, "stripeSessionId" | "stripePaymentIntentId" | "paidAt">
    >
  ): Promise<void>;
}

class InMemoryAdapter implements OrderAdapter {
  private orders = new Map<string, OrderRecord>();
  private idempotencyIndex = new Map<string, string>();

  async create(order: OrderRecord): Promise<void> {
    if (this.orders.size >= MEMORY_MAX_ENTRIES) {
      const oldestKey = this.orders.keys().next().value;
      if (oldestKey !== undefined) {
        const evicted = this.orders.get(oldestKey);
        if (evicted) {
          this.idempotencyIndex.delete(evicted.idempotencyKey);
        }
        this.orders.delete(oldestKey);
      }
    }
    this.orders.set(order.id, order);
    this.idempotencyIndex.set(order.idempotencyKey, order.id);
  }

  async findById(orderId: string): Promise<OrderRecord | null> {
    return this.orders.get(orderId) ?? null;
  }

  async findByIdempotencyKey(key: string): Promise<OrderRecord | null> {
    const orderId = this.idempotencyIndex.get(key);
    if (!orderId) return null;
    return this.orders.get(orderId) ?? null;
  }

  async updateStatus(
    orderId: string,
    status: OrderStatus,
    extra?: Partial<
      Pick<OrderRecord, "stripeSessionId" | "stripePaymentIntentId" | "paidAt">
    >
  ): Promise<void> {
    const existing = this.orders.get(orderId);
    if (!existing) return;
    this.orders.set(orderId, {
      ...existing,
      ...extra,
      status,
    });
  }
}

class UpstashRedisAdapter implements OrderAdapter {
  private redis: Redis;

  constructor(url: string, token: string) {
    this.redis = new Redis({ url, token });
  }

  private orderKey(id: string): string {
    return `kodo:order:${id}`;
  }

  private idempotencyKeyName(key: string): string {
    return `kodo:idempotency:${key}`;
  }

  async create(order: OrderRecord): Promise<void> {
    const idemKey = this.idempotencyKeyName(order.idempotencyKey);
    const wasSet = await this.redis.set(idemKey, order.id, {
      nx: true,
      ex: ORDER_TTL_SECONDS,
    });

    if (!wasSet) {
      return;
    }

    await this.redis.set(this.orderKey(order.id), JSON.stringify(order), {
      ex: ORDER_TTL_SECONDS,
    });
  }

  async findById(orderId: string): Promise<OrderRecord | null> {
    const data = await this.redis.get<string | OrderRecord>(
      this.orderKey(orderId)
    );
    if (!data) return null;
    if (typeof data === "string") {
      return JSON.parse(data) as OrderRecord;
    }
    return data;
  }

  async findByIdempotencyKey(key: string): Promise<OrderRecord | null> {
    const orderId = await this.redis.get<string>(
      this.idempotencyKeyName(key)
    );
    if (!orderId) return null;
    return this.findById(orderId);
  }

  async updateStatus(
    orderId: string,
    status: OrderStatus,
    extra?: Partial<
      Pick<OrderRecord, "stripeSessionId" | "stripePaymentIntentId" | "paidAt">
    >
  ): Promise<void> {
    const existing = await this.findById(orderId);
    if (!existing) return;
    const updated: OrderRecord = {
      ...existing,
      ...extra,
      status,
    };
    await this.redis.set(this.orderKey(orderId), JSON.stringify(updated), {
      ex: ORDER_TTL_SECONDS,
    });
  }
}

let cachedAdapter: OrderAdapter | null = null;
let cachedSignature = "";

function resolveAdapter(): OrderAdapter {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  const signature = `${url ?? ""}:${token ?? ""}`;

  if (cachedAdapter && cachedSignature === signature) {
    return cachedAdapter;
  }

  if (url && token) {
    cachedAdapter = new UpstashRedisAdapter(url, token);
  } else {
    // Clean in-memory fallback (demo checkout also issues an HMAC-signed cookie
    // receipt so stateless deployments always succeed without external Redis).
    cachedAdapter = new InMemoryAdapter();
  }

  cachedSignature = signature;
  return cachedAdapter;
}

export const OrderRepository = {
  async create(order: OrderRecord): Promise<void> {
    return resolveAdapter().create(order);
  },

  async findById(orderId: string): Promise<OrderRecord | null> {
    return resolveAdapter().findById(orderId);
  },

  async findByIdempotencyKey(key: string): Promise<OrderRecord | null> {
    return resolveAdapter().findByIdempotencyKey(key);
  },

  async updateStatus(
    orderId: string,
    status: OrderStatus,
    extra?: Partial<
      Pick<OrderRecord, "stripeSessionId" | "stripePaymentIntentId" | "paidAt">
    >
  ): Promise<void> {
    return resolveAdapter().updateStatus(orderId, status, extra);
  },
};
