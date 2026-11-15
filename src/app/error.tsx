"use client";

import { useEffect } from "react";
import Link from "next/link";
import { HomeClient } from "@/app/HomeClient";

interface RouteErrorProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

export default function RouteError({ error, unstable_retry }: RouteErrorProps) {
  useEffect(() => {
    console.error("KODO route error boundary triggered:", error);
  }, [error]);

  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <HomeClient />

      <main
        id="main-content"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding:
            "calc(var(--comp-nav-height) + var(--ref-space-12)) var(--sys-space-page-margin) var(--ref-space-12)",
          textAlign: "center",
        }}
      >
        <p
          className="text-label"
          style={{
            color: "var(--sys-color-text-accent)",
            marginBottom: "var(--ref-space-3)",
          }}
        >
          TEMPORARY DISRUPTION
        </p>

        <h1
          className="text-display"
          style={{
            fontFamily: "var(--font-editorial-display), Georgia, serif",
            marginBottom: "var(--ref-space-4)",
          }}
        >
          Momentary Interruption
        </h1>

        <p
          className="text-body"
          style={{
            color: "var(--sys-color-text-secondary)",
            maxWidth: "46ch",
            marginBottom: "var(--ref-space-6)",
          }}
        >
          We encountered an unexpected disturbance while rendering this page.
          Please retry or return to the main collection.
        </p>

        {error.digest ? (
          <p
            className="text-caption"
            style={{
              color: "var(--sys-color-text-secondary)",
              marginBottom: "var(--ref-space-6)",
              opacity: 0.75,
            }}
          >
            Reference Digest: {error.digest}
          </p>
        ) : null}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--ref-space-4)",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="kodo-focus-ring"
            style={{
              minHeight: "var(--ref-touch-target)",
              padding: "var(--ref-space-3) var(--ref-space-8)",
              backgroundColor: "var(--sys-color-text-primary)",
              color: "var(--sys-color-text-inverted)",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
              fontSize: "var(--ref-font-size-caption)",
              fontWeight: 500,
              letterSpacing: "var(--ref-letter-spacing-wider)",
              textTransform: "uppercase",
            }}
          >
            Retry View
          </button>

          <Link
            href="/collections"
            className="kodo-focus-ring"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "var(--ref-touch-target)",
              padding: "var(--ref-space-3) var(--ref-space-8)",
              border: "1px solid var(--sys-color-border)",
              color: "var(--sys-color-text-primary)",
              fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
              fontSize: "var(--ref-font-size-caption)",
              fontWeight: 500,
              letterSpacing: "var(--ref-letter-spacing-wider)",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Explore Collections
          </Link>
        </div>
      </main>
    </div>
  );
}
