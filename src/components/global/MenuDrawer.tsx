"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useUIStore } from "@/store/ui-store";

/* ═══════════════════════════════════════════════════════════
   KODŌ — MenuDrawer
   Fullscreen overlay navigation. Slides down from top.
   Focus trapped inside. Esc closes menu.
   ═══════════════════════════════════════════════════════════ */

import { MENU_LINKS } from "@/data/navigation";

export function MenuDrawer() {
  const isOpen = useUIStore((s) => s.isMenuOpen);
  const [isMounted, setIsMounted] = React.useState(isOpen);
  const [isClosing, setIsClosing] = React.useState(false);
  const closeMenu = useUIStore((s) => s.closeMenu);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Trap focus and handle Esc
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

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

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeMenu]);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setIsClosing(false);
    } else if (isMounted) {
      setIsClosing(true);
    }
  }, [isOpen, isMounted]);

  if (!isMounted) return null;

  return (
    <div
      ref={containerRef}
      onAnimationEnd={(e) => {
        if (isClosing && e.target === containerRef.current) {
          setIsMounted(false);
          setIsClosing(false);
        }
      }}
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
        animation: isClosing
          ? "menuSlideOut 300ms var(--ease-cinematic) forwards"
          : "menuSlideIn 450ms var(--ease-cinematic) forwards",
      }}
    >
      {/* Top Bar matching HeaderNav */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "var(--comp-nav-height)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingInline: "var(--sys-space-page-margin)",
        }}
      >
        {/* Brand */}
        <div
          style={{
            fontFamily: "var(--font-editorial-display), Georgia, serif",
            fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
            letterSpacing: "var(--ref-letter-spacing-label)",
            color: "var(--sys-color-text-primary)",
          }}
        >
          K O D Ō
        </div>

        {/* Close Button */}
        <button
          ref={closeButtonRef}
          onClick={closeMenu}
          className="kodo-btn-utility kodo-focus-ring"
          aria-label="Close navigation menu"
          style={{
            fontSize: "var(--ref-font-size-small)",
            letterSpacing: "var(--ref-letter-spacing-ultra)",
            padding: "var(--ref-space-1)",
            minWidth: "var(--ref-touch-target)",
            minHeight: "var(--ref-touch-target)",
          }}
        >
          Close
        </button>
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
            className="kodo-focus-ring menu-link"
            style={{
              fontFamily: "var(--font-editorial-display), Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 400,
              color: "var(--sys-color-text-primary)",
              textDecoration: "none",
              letterSpacing: "var(--ref-letter-spacing-tight)",
              opacity: 0,
              animation: `menuItemFade 400ms var(--ease-decelerate) ${150 + index * 80}ms forwards`,
              transition: "opacity 240ms var(--ease-decelerate)",
            }}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <style jsx>{`
        .menu-link:hover {
          opacity: 0.85 !important;
        }
      `}</style>
    </div>
  );
}
