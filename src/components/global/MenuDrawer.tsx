"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useUIStore } from "@/store/ui-store";

/* ═══════════════════════════════════════════════════════════
   KODŌ — MenuDrawer
   Fullscreen overlay navigation. Slides down from top.
   Focus trapped inside. Esc closes menu.
   ═══════════════════════════════════════════════════════════ */

const MENU_LINKS = [
  { href: "/", label: "Home" },
  { href: "/collections", label: "Collections" },
  { href: "/story", label: "The Story" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Concierge" },
];

export function MenuDrawer() {
  const isOpen = useUIStore((s) => s.isMenuOpen);
  const closeMenu = useUIStore((s) => s.closeMenu);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Trap focus and handle Esc
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
        return;
      }

      // Focus trap
      if (e.key === "Tab" && containerRef.current) {
        const focusable = containerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeMenu]);

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "oklch(12% 0.01 260 / 0.95)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        animation: "menuSlideIn 450ms var(--ease-decelerate) forwards",
      }}
    >
      {/* Close Button */}
      <button
        ref={closeButtonRef}
        onClick={closeMenu}
        className="kodo-focus-ring"
        aria-label="Close navigation menu"
        style={{
          position: "absolute",
          top: "var(--ref-space-3)",
          right: "var(--sys-space-page-margin)",
          background: "none",
          border: "none",
          color: "var(--sys-color-text-secondary)",
          fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
          fontSize: "var(--ref-font-size-small)",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "var(--ref-letter-spacing-ultra)",
          cursor: "pointer",
          padding: "var(--ref-space-2)",
          minWidth: "var(--ref-touch-target)",
          minHeight: "var(--ref-touch-target)",
        }}
      >
        Close
      </button>

      {/* Brand */}
      <div
        style={{
          position: "absolute",
          top: "var(--ref-space-3)",
          left: "var(--sys-space-page-margin)",
          fontFamily: "var(--font-editorial-display), Georgia, serif",
          fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
          letterSpacing: "var(--ref-letter-spacing-label)",
          color: "var(--sys-color-text-primary)",
        }}
      >
        K O D Ō
      </div>

      {/* Navigation Links */}
      <nav
        aria-label="Main navigation"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--ref-space-6)",
        }}
      >
        {MENU_LINKS.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={closeMenu}
            className="kodo-focus-ring"
            style={{
              fontFamily: "var(--font-editorial-display), Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 400,
              color: "var(--sys-color-text-primary)",
              textDecoration: "none",
              letterSpacing: "var(--ref-letter-spacing-tight)",
              opacity: 0,
              animation: `menuItemFade 400ms var(--ease-decelerate) ${150 + index * 80}ms forwards`,
              transition: "color 200ms var(--ease-decelerate)",
            }}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <style jsx>{`
        @keyframes menuSlideIn {
          from {
            opacity: 0;
            transform: translate3d(0, -32px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes menuItemFade {
          from {
            opacity: 0;
            transform: translate3d(0, 16px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>
    </div>
  );
}
