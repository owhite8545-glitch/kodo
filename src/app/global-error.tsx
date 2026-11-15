"use client";

import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

export default function GlobalError({ error, unstable_retry }: GlobalErrorProps) {
  useEffect(() => {
    console.error("KODO global error boundary triggered:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          backgroundColor: "#0c0b0e",
          color: "#f1ede6",
          fontFamily: "system-ui, -apple-system, sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 24px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#c8a96e",
            marginBottom: "12px",
          }}
        >
          CRITICAL RECOVERY
        </p>

        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontWeight: 400,
            fontSize: "clamp(2rem, 5vw, 3.25rem)",
            margin: "0 0 16px 0",
          }}
        >
          Service Temporarily Interrupted
        </h1>

        <p
          style={{
            color: "#a7a298",
            maxWidth: "44ch",
            lineHeight: 1.6,
            margin: "0 0 28px 0",
          }}
        >
          An unrecoverable application error occurred. Reload this session or
          return to the KODŌ flagship archive.
        </p>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          <button
            type="button"
            onClick={() => unstable_retry()}
            style={{
              padding: "14px 28px",
              backgroundColor: "#f1ede6",
              color: "#0c0b0e",
              border: "none",
              cursor: "pointer",
              fontSize: "12px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Reload Application
          </button>

          <button
            type="button"
            onClick={() => {
              window.location.assign("/");
            }}
            style={{
              padding: "14px 28px",
              border: "1px solid rgba(241, 237, 230, 0.25)",
              backgroundColor: "transparent",
              color: "#f1ede6",
              cursor: "pointer",
              fontSize: "12px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Flagship Home
          </button>
        </div>
      </body>
    </html>
  );
}
