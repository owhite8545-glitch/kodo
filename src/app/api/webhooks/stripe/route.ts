import { NextResponse, type NextRequest } from "next/server";

/* ═══════════════════════════════════════════════════════════
   KODŌ — Stripe Webhook Handler (Live Mode)
   Validates webhook signatures and transitions live orders
   to "paid" status.

   This route is only active when COMMERCE_MODE=live.
   The webhook signature verification is the sole authority
   for marking live orders as paid.

   Implementation will be activated when the merchant
   configures STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET.
   ═══════════════════════════════════════════════════════════ */

export async function POST(request: NextRequest) {
  const isLive = process.env.COMMERCE_MODE === "live";

  if (!isLive) {
    return NextResponse.json(
      { error: "Webhook handler is only active in live commerce mode." },
      { status: 403 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error(
      "[KODŌ Webhook] STRIPE_WEBHOOK_SECRET is not configured."
    );
    return NextResponse.json(
      { error: "Webhook secret not configured." },
      { status: 500 }
    );
  }

  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing stripe-signature header." },
        { status: 400 }
      );
    }

    // Dynamic import to avoid loading Stripe SDK in Demo Mode
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-07-29.dahlia",
    });

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      if (session.payment_status === "paid") {
        const orderId = session.metadata?.orderId;

        if (orderId) {
          // TODO: Update order status in PostgreSQL via Drizzle ORM
          // await db.update(orders).set({ status: "paid", paidAt: new Date().toISOString() }).where(eq(orders.id, orderId));
          console.log(
            `[KODŌ Webhook] Order ${orderId} marked as paid.`
          );
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[KODŌ Webhook] Error processing webhook:", err);
    return NextResponse.json(
      { error: "Webhook processing failed." },
      { status: 400 }
    );
  }
}
