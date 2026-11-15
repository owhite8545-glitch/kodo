"use client";

import React, { useEffect, useId, useRef, useState } from "react";

export interface KodoListboxOption<T extends string = string> {
  value: T;
  label: string;
}

interface KodoListboxProps<T extends string> {
  id: string;
  labelId?: string;
  options: readonly KodoListboxOption<T>[];
  value: T;
  onChange: (value: T) => void;
  minWidth?: string;
  height?: string;
  fullWidth?: boolean;
  uppercase?: boolean;
  align?: "left" | "right";
}

/**
 * Accessible obsidian glassmorphic listbox replacing browser-native OS
 * dropdowns while maintaining full WAI-ARIA keyboard semantics.
 */
export function KodoListbox<T extends string>({
  id,
  labelId,
  options,
  value,
  onChange,
  minWidth = "200px",
  height = "44px",
  fullWidth = false,
  uppercase = false,
  align = "right",
}: KodoListboxProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value)
  );
  const [highlightedIndex, setHighlightedIndex] = useState(selectedIndex);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reactId = useId();
  const listboxId = `${id}-listbox-${reactId}`;

  const selectedOption = options[selectedIndex] ?? options[0];

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (
        wrapperRef.current &&
        e.target instanceof Node &&
        !wrapperRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  const openMenu = (startIndex = selectedIndex) => {
    setHighlightedIndex(startIndex);
    setIsOpen(true);
  };

  const selectAt = (index: number) => {
    const chosen = options[index];
    if (!chosen) return;
    onChange(chosen.value);
    setIsOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (options.length === 0) return;

    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        if (!isOpen) {
          openMenu(selectedIndex);
        } else {
          setHighlightedIndex((prev) => (prev + 1) % options.length);
        }
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        if (!isOpen) {
          openMenu(selectedIndex);
        } else {
          setHighlightedIndex(
            (prev) => (prev - 1 + options.length) % options.length
          );
        }
        break;
      }
      case "Home": {
        if (!isOpen) return;
        e.preventDefault();
        setHighlightedIndex(0);
        break;
      }
      case "End": {
        if (!isOpen) return;
        e.preventDefault();
        setHighlightedIndex(options.length - 1);
        break;
      }
      case "Enter":
      case " ": {
        e.preventDefault();
        if (!isOpen) {
          openMenu(selectedIndex);
        } else {
          selectAt(highlightedIndex);
        }
        break;
      }
      case "Escape": {
        if (!isOpen) return;
        e.preventDefault();
        setIsOpen(false);
        break;
      }
      case "Tab": {
        if (isOpen) {
          setIsOpen(false);
        }
        break;
      }
    }
  };

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "relative",
        display: fullWidth ? "block" : "inline-block",
        width: fullWidth ? "100%" : "auto",
        minWidth: fullWidth ? undefined : minWidth,
      }}
    >
      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-labelledby={labelId}
        aria-activedescendant={
          isOpen ? `${id}-option-${highlightedIndex}` : undefined
        }
        onClick={() => (isOpen ? setIsOpen(false) : openMenu(selectedIndex))}
        onKeyDown={handleKeyDown}
        className="kodo-focus-ring kodo-listbox-trigger"
        data-open={isOpen}
        style={{
          width: "100%",
          height,
          minHeight: "var(--ref-touch-target)",
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--ref-space-2)",
          backgroundColor: "var(--sys-color-surface)",
          border: isOpen
            ? "1px solid var(--sys-color-text-accent)"
            : "1px solid var(--sys-color-border)",
          color: "var(--sys-color-text-primary)",
          fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
          fontSize: uppercase
            ? "var(--ref-font-size-small)"
            : "var(--ref-font-size-base)",
          fontWeight: uppercase ? 500 : 400,
          letterSpacing: uppercase ? "var(--ref-letter-spacing-wide)" : "normal",
          textTransform: uppercase ? "uppercase" : "none",
          cursor: "pointer",
          textAlign: "left",
          transition:
            "border-color var(--motion-duration-fast) var(--ease-decelerate), background-color var(--motion-duration-fast) var(--ease-decelerate)",
        }}
      >
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {selectedOption?.label}
        </span>

        <svg
          width="11"
          height="11"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          style={{
            flexShrink: 0,
            color: "var(--sys-color-text-accent)",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition:
              "transform var(--motion-duration-fast) var(--ease-cinematic)",
          }}
        >
          <path
            d="M2.5 4.25L6 7.75L9.5 4.25"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="square"
          />
        </svg>
      </button>

      {isOpen && (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={labelId}
          className="kodo-listbox-panel"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: align === "left" || fullWidth ? 0 : undefined,
            right: align === "right" && !fullWidth ? 0 : undefined,
            width: fullWidth ? "100%" : "max(100%, 220px)",
            zIndex: 60,
            listStyle: "none",
            backgroundColor: "oklch(14% 0.01 260 / 0.96)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid var(--sys-color-border-active)",
            boxShadow: "var(--ref-shadow-elevation-3)",
            paddingBlock: "4px",
          }}
        >
          {options.map((option, idx) => {
            const isSelected = option.value === value;
            const isHighlighted = idx === highlightedIndex;

            return (
              <li
                key={option.value}
                id={`${id}-option-${idx}`}
                role="option"
                aria-selected={isSelected}
                className="kodo-listbox-option"
                data-selected={isSelected}
                data-highlighted={isHighlighted}
                onMouseEnter={() => setHighlightedIndex(idx)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  selectAt(idx);
                }}
                style={{
                  minHeight: "var(--ref-touch-target)",
                  padding: "10px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "var(--ref-space-2)",
                  cursor: "pointer",
                  fontFamily:
                    "var(--font-utility-sans), system-ui, sans-serif",
                  fontSize: uppercase
                    ? "var(--ref-font-size-small)"
                    : "var(--ref-font-size-caption)",
                  fontWeight: isSelected ? 500 : 400,
                  letterSpacing: uppercase
                    ? "var(--ref-letter-spacing-wide)"
                    : "0.02em",
                  textTransform: uppercase ? "uppercase" : "none",
                  color: isSelected
                    ? "var(--sys-color-text-accent)"
                    : isHighlighted
                    ? "var(--sys-color-text-primary)"
                    : "var(--sys-color-text-secondary)",
                  backgroundColor: isHighlighted
                    ? "oklch(24% 0.012 260 / 0.85)"
                    : "transparent",
                  borderLeft: isSelected
                    ? "2px solid var(--sys-color-text-accent)"
                    : "2px solid transparent",
                  transition:
                    "background-color 140ms var(--ease-decelerate), color 140ms var(--ease-decelerate)",
                }}
              >
                <span>{option.label}</span>
                {isSelected && (
                  <span
                    aria-hidden="true"
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      backgroundColor: "var(--sys-color-text-accent)",
                      flexShrink: 0,
                    }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
