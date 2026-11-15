import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { OrderRepository } from "@/lib/order-repository";

/* ═══════════════════════════════════════════════════════════
   Stripe Webhook Endpoint
   POST /api/webhooks/stripe

   Verifies the Stripe cryptographic signature on raw request body
   and reconciles checkout session lifecycle states idempotently.
   ═══════════════════════════════════════════════════════════ */

export async function POST(request: NextRequest) {
  const isLive = process.env.COMMERCE_MODE === "live";

  if (!isLive) {
    return NextResponse.json(
      { received: false, message: "Commerce is operating in demo mode." },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  const stripeSecret = process.env.STRIPE_SECRET_KEY?.trim();

  if (!webhookSecret || !stripeSecret) {
    console.error(
      "[Stripe Webhook] Missing STRIPE_WEBHOOK_SECRET or STRIPE_SECRET_KEY."
    );
    return NextResponse.json(
      { error: "Webhook configuration incomplete." },
      { status: 500 }
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header." },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    const rawBody = await request.text();
    const stripe = new Stripe(stripeSecret, {
      apiVersion: "2026-07-29.dahlia",
    });
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Invalid signature payload";
    console.error("[Stripe Webhook] Verification failed:", message);
    return NextResponse.json(
      { error: "Webhook verification failed." },
      { status: 400 }
    );
  }

  let handled = false;

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId =
        session.metadata?.orderId || session.client_reference_id || "";
      if (orderId) {
        const paymentIntentId =
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id;
        await OrderRepository.updateStatus(orderId, "paid", {
          stripeSessionId: session.id,
          stripePaymentIntentId: paymentIntentId,
          paidAt: new Date().toISOString(),
        });
        handled = true;
      }
      break;
    }

    case "checkout.session.expired": {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId =
        session.metadata?.orderId || session.client_reference_id || "";
      if (orderId) {
        await OrderRepository.updateStatus(orderId, "cancelled", {
          stripeSessionId: session.id,
        });
        handled = true;
      }
      break;
    }

    default:
      break;
  }

  return NextResponse.json({
    received: true,
    eventType: event.type,
    handled,
  });
}
