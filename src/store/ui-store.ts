import { create } from "zustand";

/* ═══════════════════════════════════════════════════════════
   KODŌ — UI Store (Zustand)
   Controls global navigation, overlays, and scroll state.
   High-frequency scroll values bypass React reconciliation.
   ═══════════════════════════════════════════════════════════ */

interface UIState {
  // Navigation
  isMenuOpen: boolean;
  isSearchOpen: boolean;
  activeNavItem: string | null;

  // Scroll
  scrollProgress: number;
  isScrollLocked: boolean;

  // Performance
  motionPaused: boolean;
  webglEnabled: boolean;

  // Actions
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  setScrollProgress: (progress: number) => void;
  lockScroll: () => void;
  unlockScroll: () => void;
  toggleMotionPause: () => void;
  setWebglEnabled: (enabled: boolean) => void;
  setActiveNavItem: (item: string | null) => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  isMenuOpen: false,
  isSearchOpen: false,
  activeNavItem: null,
  scrollProgress: 0,
  isScrollLocked: false,
  motionPaused: false,
  webglEnabled: true,

  openMenu: () => {
    set({ isMenuOpen: true, isScrollLocked: true });
  },

  closeMenu: () => {
    set({ isMenuOpen: false, isScrollLocked: false });
  },

  toggleMenu: () => {
    const isOpen = get().isMenuOpen;
    if (isOpen) {
      get().closeMenu();
    } else {
      get().openMenu();
    }
  },

  openSearch: () => {
    set({ isSearchOpen: true, isScrollLocked: true });
  },

  closeSearch: () => {
    set({ isSearchOpen: false, isScrollLocked: false });
  },

  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  lockScroll: () => {
    set({ isScrollLocked: true });
  },
  unlockScroll: () => {
    set({ isScrollLocked: false });
  },
  toggleMotionPause: () => set({ motionPaused: !get().motionPaused }),
  setWebglEnabled: (enabled) => set({ webglEnabled: enabled }),
  setActiveNavItem: (item) => set({ activeNavItem: item }),
}));
