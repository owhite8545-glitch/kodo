/**
 * KODŌ — Design System Constants
 * Motion easings, spacing grid, and color palette tokens
 * mapped from OKLCH perceptual color space.
 */

// ═══════════════════════════════════════════════════════════
// Motion Easings (Non-linear cubic-bezier curves)
// ═══════════════════════════════════════════════════════════

export const MOTION_EASINGS = {
  decelerate: "cubic-bezier(0.25, 1, 0.5, 1)",
  cinematic: "cubic-bezier(0.76, 0, 0.24, 1)",
  spring: "cubic-bezier(0.22, 1, 0.36, 1)",
} as const;

export const MOTION_DURATIONS = {
  instant: 150,
  fast: 300,
  medium: 450,
  slow: 600,
  cinematic: 1000,
} as const;

// ═══════════════════════════════════════════════════════════
// 8pt Baseline Spacing Grid
// ═══════════════════════════════════════════════════════════

export const SPACING = {
  1: 8,
  2: 16,
  3: 24,
  4: 32,
  6: 48,
  8: 64,
  12: 96,
  15: 120,
  20: 160,
} as const;

// ═══════════════════════════════════════════════════════════
// Responsive Breakpoints
// ═══════════════════════════════════════════════════════════

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1440,
  wide: 1920,
} as const;

// ═══════════════════════════════════════════════════════════
// Grid System
// ═══════════════════════════════════════════════════════════

export const GRID = {
  mobile: { columns: 4, gutter: 16, margin: 24 },
  tablet: { columns: 8, gutter: 24, margin: 48 },
  desktop: { columns: 12, gutter: 32, margin: 96 },
} as const;

// ═══════════════════════════════════════════════════════════
// Performance Budgets
// ═══════════════════════════════════════════════════════════

export const PERFORMANCE_BUDGETS = {
  mainThreadMs: 50,
  drawCallsHigh: 850,
  drawCallsMedium: 320,
  vramMaxMb: 45,
  initialJsKb: 70,
  lcpTargetMs: 2500,
  inpTargetMs: 200,
  clsTarget: 0.1,
} as const;
