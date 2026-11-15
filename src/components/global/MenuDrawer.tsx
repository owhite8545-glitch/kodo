"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useUIStore } from "@/store/ui-store";
import { MENU_LINKS } from "@/data/navigation";
import { SITE_CONFIG } from "@/config/site";

export function MenuDrawer() {
  const isOpen = useUIStore((s) => s.isMenuOpen);
  const closeMenu = useUIStore((s) => s.closeMenu);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, closeMenu]);

  return (
    <div
      className="kodo-menu-overlay"
      data-open={isOpen}
      role={isOpen ? "dialog" : undefined}
      aria-modal={isOpen ? "true" : undefined}
      aria-label="Navigation menu"
      aria-hidden={!isOpen}
      inert={!isOpen}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: "var(--ref-space-4)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-editorial-display), Georgia, serif",
            fontSize: "var(--ref-font-size-title)",
            letterSpacing: "var(--ref-letter-spacing-label)",
            color: "var(--sys-color-text-primary)",
            textTransform: "uppercase",
          }}
        >
          {SITE_CONFIG.brand.wordmark}
        </span>

        <button
          type="button"
          onClick={closeMenu}
          className="kodo-btn-utility kodo-focus-ring"
          aria-label="Close navigation menu"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "44px",
            minHeight: "44px",
          }}
        >
          Close
        </button>
      </div>

      <nav
        aria-label="Main navigation"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--ref-space-3)",
          maxWidth: "600px",
          marginInline: "auto",
          width: "100%",
          textAlign: "center",
        }}
      >
        {MENU_LINKS.map((item, idx) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={closeMenu}
            className="kodo-focus-ring kodo-menu-item"
            style={{
              fontFamily: "var(--font-editorial-display), Georgia, serif",
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              fontWeight: 400,
              color: "var(--sys-color-text-primary)",
              textDecoration: "none",
              letterSpacing: "var(--ref-letter-spacing-tight)",
              lineHeight: 1.3,
              transitionDelay: `${idx * 45}ms`,
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div
        style={{
          textAlign: "center",
          paddingTop: "var(--ref-space-4)",
        }}
      >
        <Link
          href="/collections"
          onClick={closeMenu}
          className="kodo-btn-solid kodo-focus-ring"
        >
          Explore Collection
        </Link>
      </div>
    </div>
  );
}
