import { create } from "zustand";
import type { ScentProduct, ScentVariant, CartItem } from "@/types/webgl";

/* ═══════════════════════════════════════════════════════════
   KODŌ — Cart Store (Zustand)
   Transactional state for e-commerce cart operations.
   Uses useSyncExternalStore internally to prevent tearing
   during React concurrent renders.
   ═══════════════════════════════════════════════════════════ */

interface CartState {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addItem: (product: ScentProduct, variant?: ScentVariant) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;

  // Computed
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (product, variant) => {
    const items = get().items;
    const existingIndex = items.findIndex(
      (item) => item.product.id === product.id
    );

    if (existingIndex >= 0) {
      const updated = [...items];
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: updated[existingIndex].quantity + 1,
      };
      set({ items: updated, isOpen: true });
    } else {
      const productWithVariant = variant
        ? { ...product, size: variant }
        : product;
      set({
        items: [...items, { product: productWithVariant, quantity: 1 }],
        isOpen: true,
      });
    }
  },

  removeItem: (productId) => {
    set({ items: get().items.filter((item) => item.product.id !== productId) });
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    const items = get().items.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    set({ items });
  },

  clearCart: () => set({ items: [] }),
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

  totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: () =>
    get().items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    ),
}));
