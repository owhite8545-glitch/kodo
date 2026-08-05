"use client";

import React from "react";

/* ═══════════════════════════════════════════════════════════
   KODŌ — ButtonSolid (Variant A)
   Primary CTA. Warm off-white solid container,
   obsidian text. CSS-driven hover dim + press spring-back.
   Min touch target: 44px × 44px (WCAG 2.5.5)
   ═══════════════════════════════════════════════════════════ */

interface ButtonSolidProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
  ariaLabel?: string;
}

export function ButtonSolid({
  children,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  fullWidth = false,
  className = "",
  ariaLabel,
}: ButtonSolidProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading}
      className={`kodo-btn-solid kodo-focus-ring ${className}`}
      style={{
        width: fullWidth ? "100%" : undefined,
      }}
    >
      {loading ? (
        <span
          style={{
            display: "inline-block",
            width: "16px",
            height: "16px",
            border: "2px solid var(--ref-color-obsidian-10)",
            borderTopColor: "transparent",
            borderRadius: "50%",
            animation: "spin 0.6s linear infinite",
          }}
        />
      ) : (
        children
      )}
    </button>
  );
}
