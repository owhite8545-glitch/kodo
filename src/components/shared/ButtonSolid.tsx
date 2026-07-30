"use client";

import React from "react";

/* ═══════════════════════════════════════════════════════════
   KODŌ — ButtonSolid (Variant A)
   Primary CTA. Warm off-white solid container,
   obsidian text. Spring-back press animation.
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
      className={`kodo-focus-ring ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        height: "var(--comp-button-height-primary)",
        padding: "0 var(--ref-space-6)",
        width: fullWidth ? "100%" : "auto",
        backgroundColor: disabled
          ? "oklch(98% 0.005 85 / 0.3)"
          : "var(--ref-color-alabaster-98)",
        color: "var(--ref-color-obsidian-10)",
        fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
        fontSize: "var(--ref-font-size-caption)",
        fontWeight: 700,
        textTransform: "uppercase" as const,
        letterSpacing: "var(--ref-letter-spacing-sans)",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "transform 150ms var(--ease-fluid-spring), background-color 150ms var(--ease-decelerate)",
        willChange: "transform",
        opacity: disabled ? 0.3 : 1,
        pointerEvents: disabled ? "none" as const : "auto" as const,
      }}
      onMouseDown={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLButtonElement).style.transform =
            "scale3d(0.96, 0.96, 0.96)";
        }
      }}
      onMouseUp={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform =
          "scale3d(1, 1, 1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform =
          "scale3d(1, 1, 1)";
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
