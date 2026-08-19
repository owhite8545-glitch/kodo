"use client";

import React from "react";

/* ═══════════════════════════════════════════════════════════
   KODŌ — GlassmorphicCard
   Translucent carbon surface card with ultra-thin border.
   16px progressive blur. Hover parallax depth effect.
   ═══════════════════════════════════════════════════════════ */

interface GlassmorphicCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
  as?: "div" | "article" | "section";
  style?: React.CSSProperties;
}

export function GlassmorphicCard({
  children,
  className = "",
  hoverable = true,
  onClick,
  as: Tag = "div",
  style,
}: GlassmorphicCardProps) {
  return (
    <Tag
      className={`kodo-focus-ring ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      style={{
        position: "relative",
        backgroundColor: "var(--comp-card-bg)",
        border: "1px solid var(--comp-card-border)",
        overflow: "hidden",
        transition: hoverable
          ? "transform var(--motion-duration-base) var(--ease-cinematic), box-shadow var(--motion-duration-base) var(--ease-cinematic)"
          : "none",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
      onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
        if (hoverable) {
          e.currentTarget.style.transform =
            "translate3d(0, 0, 8px) scale(1.02)";
          e.currentTarget.style.boxShadow = "var(--ref-shadow-elevation-3)";
        }
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
        if (hoverable) {
          e.currentTarget.style.transform = "translate3d(0, 0, 0) scale(1)";
          e.currentTarget.style.boxShadow = "none";
        }
      }}
    >
      {children}
    </Tag>
  );
}
