"use client";

import React from "react";

/* ═══════════════════════════════════════════════════════════
   KODŌ — ButtonOutline (Variant B)
   Secondary CTA. Transparent with subtle border.
   CSS-driven hover fill + press spring-back.
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
      className={`kodo-btn-outline kodo-focus-ring ${className}`}
      style={{
        width: fullWidth ? "100%" : undefined,
      }}
    >
      {children}
    </button>
  );
}
