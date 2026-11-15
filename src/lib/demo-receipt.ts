import { createHmac, timingSafeEqual } from "node:crypto";
import type { OrderRecord } from "@/types/webgl";

const DEMO_RECEIPT_TTL_MS = 60 * 60 * 1000; // 1 hour

interface SignedEnvelope {
  readonly exp: number;
  readonly order: OrderRecord;
}

function getSigningSecret(): string {
  return (
    process.env.DEMO_SIGNING_SECRET?.trim() ||
    process.env.STRIPE_WEBHOOK_SECRET?.trim() ||
    process.env.UPSTASH_REDIS_REST_TOKEN?.trim() ||
    "kodo-atelier-stateless-demo-receipt-key-v1"
  );
}

function signPayload(encodedPayload: string): string {
  return createHmac("sha256", getSigningSecret())
    .update(encodedPayload)
    .digest("base64url");
}

/**
 * Serializes and HMAC-signs a demo OrderRecord so it can be stored in an
 * HttpOnly cookie and verified safely across stateless serverless lambdas.
 */
export function signDemoReceipt(
  order: OrderRecord,
  nowMs = Date.now()
): string {
  const envelope: SignedEnvelope = {
    exp: nowMs + DEMO_RECEIPT_TTL_MS,
    order,
  };
  const payload = Buffer.from(JSON.stringify(envelope), "utf8").toString(
    "base64url"
  );
  const signature = signPayload(payload);
  return `${payload}.${signature}`;
}

/**
 * Verifies signature integrity, expiration, and optional orderId binding.
 * Returns null cleanly if tampered, expired, or malformed.
 */
export function verifyDemoReceipt(
  token: string | undefined,
  expectedOrderId?: string,
  nowMs = Date.now()
): OrderRecord | null {
  if (!token || typeof token !== "string") return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [payload, providedSig] = parts;
  if (!payload || !providedSig) return null;

  const expectedSig = signPayload(payload);
  const providedBuf = Buffer.from(providedSig, "utf8");
  const expectedBuf = Buffer.from(expectedSig, "utf8");

  if (providedBuf.length !== expectedBuf.length) {
    return null;
  }

  if (!timingSafeEqual(providedBuf, expectedBuf)) {
    return null;
  }

  try {
    const decoded = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    ) as SignedEnvelope;

    if (
      !decoded ||
      typeof decoded.exp !== "number" ||
      decoded.exp < nowMs ||
      !decoded.order ||
      decoded.order.mode !== "demo" ||
      typeof decoded.order.id !== "string"
    ) {
      return null;
    }

    if (expectedOrderId && decoded.order.id !== expectedOrderId) {
      return null;
    }

    return decoded.order;
  } catch {
    return null;
  }
}
