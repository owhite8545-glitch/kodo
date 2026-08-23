import { z } from "zod/v4";

/* ═══════════════════════════════════════════════════════════
   KODŌ — Checkout Form Validation Schemas (Zod v4)
   Server-side and client-side validation for checkout
   submission payloads.
   ═══════════════════════════════════════════════════════════ */

// ─── Cart Line Item Schema ────────────────────────────────

export const cartItemSchema = z.object({
  lineKey: z.string().min(1),
  productId: z.string().min(1),
  variant: z.enum(["30ml", "50ml", "100ml"]),
  quantity: z.int().min(1).max(10),
});

// ─── Customer Information ─────────────────────────────────

export const customerSchema = z.object({
  name: z
    .string()
    .min(1, "Full name is required")
    .max(120, "Name is too long"),
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .max(30, "Phone number is too long")
    .optional()
    .or(z.literal("")),
});

// ─── Shipping Address ─────────────────────────────────────

export const shippingSchema = z.object({
  addressLine1: z
    .string()
    .min(1, "Address is required")
    .max(200, "Address is too long"),
  addressLine2: z
    .string()
    .max(200, "Address line 2 is too long")
    .optional()
    .or(z.literal("")),
  city: z.string().min(1, "City is required").max(100, "City name is too long"),
  stateOrRegion: z
    .string()
    .max(100, "State/region is too long")
    .optional()
    .or(z.literal("")),
  postalCode: z
    .string()
    .min(1, "Postal/zip code is required")
    .max(20, "Postal code is too long"),
  country: z
    .string()
    .min(1, "Region is required")
    .max(100, "Region code is too long"),
});

// ─── Complete Checkout Submission ─────────────────────────

export const checkoutFormSchema = z.object({
  customer: customerSchema,
  shipping: shippingSchema,
  cartItems: z.array(cartItemSchema).min(1, "Cart must contain at least one item"),
  idempotencyKey: z.uuid("Invalid idempotency key format"),
});

export type CheckoutFormInput = z.infer<typeof checkoutFormSchema>;

// ─── Validation Helper ───────────────────────────────────

export function validateCheckout(data: unknown) {
  return checkoutFormSchema.safeParse(data);
}
