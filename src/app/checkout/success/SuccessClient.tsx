"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cart-store";

/* ═══════════════════════════════════════════════════════════
   KODŌ — Success Client Component
   Clears the cart and idempotency key upon successful
   order confirmation render.
   ═══════════════════════════════════════════════════════════ */

const IDEMPOTENCY_KEY = "kodo-checkout-idempotency-key";

export function SuccessClient() {
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    // Clear cart state
    clearCart();

    // Clear idempotency key from sessionStorage
    sessionStorage.removeItem(IDEMPOTENCY_KEY);
  }, [clearCart]);

  // This component renders nothing — it only performs side effects
  return null;
}
