import Link from "next/link";
import { HomeClient } from "@/app/HomeClient";
import { FooterDirectory } from "@/components/global/FooterDirectory";

export default function NotFound() {
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
          padding: "var(--ref-space-16) var(--ref-space-4)",
          textAlign: "center",
        }}
      >
        <p className="text-label" style={{ marginBottom: "var(--ref-space-3)" }}>
          404 · UNCHARTED VESSEL
        </p>

        <h1
          className="text-hero"
          style={{
            fontFamily: "var(--font-editorial-display), Georgia, serif",
            marginBottom: "var(--ref-space-4)",
          }}
        >
          Absence of Form
        </h1>

        <p
          className="text-body-lg"
          style={{
            color: "var(--sys-color-text-secondary)",
            maxWidth: "46ch",
            marginBottom: "var(--ref-space-8)",
          }}
        >
          The formulation, journal entry, or chamber you requested is no longer
          on this coordinate. Return to the archive to resume exploration.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--ref-space-4)",
            justifyContent: "center",
          }}
        >
          <Link
            href="/collections"
            className="kodo-focus-ring"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "var(--ref-touch-target)",
              padding: "var(--ref-space-3) var(--ref-space-8)",
              backgroundColor: "var(--sys-color-text-primary)",
              color: "var(--sys-color-text-inverted)",
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
          <Link
            href="/"
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
            Return Home
          </Link>
        </div>
      </main>

      <FooterDirectory />
    </div>
  );
}
