"use client";

import React from "react";

/* ═══════════════════════════════════════════════════════════
   KODŌ — ButtonOutline (Variant B)
   Secondary CTA. Transparent with subtle border.
   Glassmorphic hover state.
   ═══════════════════════════════════════════════════════════ */

interface ButtonOutlineProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  ariaLabel?: string;
}

export function ButtonOutline({
  children,
  onClick,
  type = "button",
  disabled = false,
  fullWidth = false,
  className = "",
  ariaLabel,
}: ButtonOutlineProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`kodo-focus-ring ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        height: "var(--comp-button-height-secondary)",
        padding: "0 var(--ref-space-4)",
        width: fullWidth ? "100%" : "auto",
        backgroundColor: "transparent",
        color: "var(--sys-color-text-primary)",
        fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
        fontSize: "var(--ref-font-size-caption)",
        fontWeight: 500,
        textTransform: "uppercase" as const,
        letterSpacing: "var(--ref-letter-spacing-sans)",
        border: "1px solid var(--sys-color-border)",
        cursor: disabled ? "not-allowed" : "pointer",
        transition:
          "background-color 150ms var(--ease-decelerate), border-color 150ms var(--ease-decelerate)",
        opacity: disabled ? 0.3 : 1,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor =
            "oklch(98% 0.005 85 / 0.08)";
          (e.currentTarget as HTMLButtonElement).style.borderColor =
            "var(--sys-color-border-active)";
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
          "transparent";
        (e.currentTarget as HTMLButtonElement).style.borderColor =
          "var(--sys-color-border)";
      }}
    >
      {children}
    </button>
  );
}
