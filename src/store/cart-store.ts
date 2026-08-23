import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ScentProduct, ScentVariant, CartItem } from "@/types/webgl";

/* ═══════════════════════════════════════════════════════════
   KODŌ — Cart Store (Zustand)
   Transactional state for e-commerce cart operations.

   Key design decisions:
   - Composite lineKey (productId::variant) prevents variant
     collisions (50ml vs 100ml of the same fragrance).
   - persist middleware saves items to localStorage.
   - Quantity bounded: min 1 (below removes), max 10.
   - isOpen is NOT persisted (ephemeral UI state).
   ═══════════════════════════════════════════════════════════ */

const MAX_QUANTITY = 10;

/** Build a deterministic composite key for cart line items */
export function buildLineKey(productId: string, variant: ScentVariant): string {
  return `${productId}::${variant}`;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  /** Incremented on every cart mutation. Used to invalidate idempotency keys. */
  cartVersion: number;

  // Actions
  addItem: (product: ScentProduct, variant: ScentVariant) => void;
  removeItem: (lineKey: string) => void;
  updateQuantity: (lineKey: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;

  // Computed
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      cartVersion: 0,

      addItem: (product, variant) => {
        const lineKey = buildLineKey(product.id, variant);
        const items = get().items;
        const existingIndex = items.findIndex(
          (item) => item.lineKey === lineKey
        );

        if (existingIndex >= 0) {
          const current = items[existingIndex];
          if (current.quantity >= MAX_QUANTITY) {
            // Already at maximum — open cart to show current state
            set({ isOpen: true });
            return;
          }
          const updated = [...items];
          updated[existingIndex] = {
            ...current,
            quantity: current.quantity + 1,
          };
          set((s) => ({
            items: updated,
            isOpen: true,
            cartVersion: s.cartVersion + 1,
          }));
        } else {
          // Resolve variant-specific price from product.sizes
          const sizeEntry = product.sizes.find((s) => s.variant === variant);
          const variantPrice = sizeEntry ? sizeEntry.price : product.price;

          const productWithVariant: ScentProduct = {
            ...product,
            size: variant,
            price: variantPrice,
          };
          set((s) => ({
            items: [...items, { lineKey, product: productWithVariant, quantity: 1 }],
            isOpen: true,
            cartVersion: s.cartVersion + 1,
          }));
        }
      },

      removeItem: (lineKey) => {
        set((s) => ({
          items: s.items.filter((item) => item.lineKey !== lineKey),
          cartVersion: s.cartVersion + 1,
        }));
      },

      updateQuantity: (lineKey, quantity) => {
        if (quantity < 1) {
          get().removeItem(lineKey);
          return;
        }
        const clampedQuantity = Math.min(quantity, MAX_QUANTITY);
        set((s) => ({
          items: s.items.map((item) =>
            item.lineKey === lineKey
              ? { ...item, quantity: clampedQuantity }
              : item
          ),
          cartVersion: s.cartVersion + 1,
        }));
      },

      clearCart: () => set({ items: [], cartVersion: 0 }),
      toggleCart: () => {
        const isOpen = get().isOpen;
        if (isOpen) {
          get().closeCart();
        } else {
          get().openCart();
        }
      },
      openCart: () => {
        set({ isOpen: true });
      },
      closeCart: () => {
        set({ isOpen: false });
      },

      totalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: () =>
        get().items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        ),
    }),
    {
      name: "kodo-cart",
      partialize: (state) => ({
        items: state.items,
        cartVersion: state.cartVersion,
      }),
    }
  )
);
