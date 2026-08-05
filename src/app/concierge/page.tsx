import React from "react";
import type { Metadata } from "next";
import { HomeClient } from "../HomeClient";
import { FooterDirectory } from "@/components/global/FooterDirectory";
import { ConciergeForm } from "./ConciergeForm";

/* ═══════════════════════════════════════════════════════════
   KODŌ — Concierge Page (Server Component)
   Private inquiry form with editorial presentation.
   ═══════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: "Concierge",
  description:
    "Contact the KODŌ concierge for private consultations, wholesale inquiries, and press requests. Tokyo & Paris studios.",
};

export default function ConciergePage() {
  return (
    <>
      <HomeClient />
      <main id="main-content" role="main">
        {/* ─── Hero Statement ─── */}
        <section
          style={{
            paddingTop: "calc(var(--comp-nav-height) + var(--ref-space-15))",
            paddingBottom: "var(--ref-space-15)",
            paddingInline: "var(--sys-space-page-margin)",
            textAlign: "center",
            maxWidth: "800px",
            marginInline: "auto",
          }}
        >
          <p className="text-label" style={{ marginBottom: "var(--ref-space-3)" }}>
            Private Service
          </p>
          <h1
            className="text-display"
            style={{
              fontFamily: "var(--font-editorial-display), Georgia, serif",
              marginBottom: "var(--ref-space-6)",
            }}
          >
            The{" "}
            <span style={{ color: "var(--sys-color-text-accent)" }}>
              Concierge
            </span>
          </h1>
          <p
            className="text-body-lg"
            style={{
              color: "var(--sys-color-text-secondary)",
              maxWidth: "50ch",
              marginInline: "auto",
            }}
          >
            For private consultations, bespoke commissions, wholesale
            partnerships, and press inquiries. Every interaction is personal.
          </p>
        </section>

        {/* ─── Contact Form & Info ─── */}
        <section
          aria-label="Contact form and information"
          style={{
            paddingInline: "var(--sys-space-page-margin)",
            maxWidth: "1440px",
            marginInline: "auto",
            paddingBottom: "var(--sys-space-section)",
          }}
        >
          <div
            className="concierge-layout"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "var(--ref-space-12)",
              alignItems: "start",
            }}
          >
            {/* Form */}
            <ConciergeForm />

            {/* Info */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--ref-space-8)",
              }}
            >
              {/* Direct Contact */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--ref-space-3)",
                }}
              >
                <p className="text-label">Direct Contact</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--ref-space-2)" }}>
                  <p
                    className="text-body"
                    style={{ color: "var(--sys-color-text-secondary)" }}
                  >
                    [your-email@example.com]
                  </p>
                  <p
                    className="text-body"
                    style={{ color: "var(--sys-color-text-secondary)" }}
                  >
                    [+00 0 0000 0000] (Location 1)
                  </p>
                  <p
                    className="text-body"
                    style={{ color: "var(--sys-color-text-secondary)" }}
                  >
                    [+00 0 0000 0000] (Location 2)
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--ref-space-3)",
                }}
              >
                <p className="text-label">Consultation Hours</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--ref-space-2)" }}>
                  <p
                    className="text-body"
                    style={{ color: "var(--sys-color-text-secondary)" }}
                  >
                    [Day] — [Day]
                  </p>
                  <p
                    className="text-body"
                    style={{ color: "var(--sys-color-text-secondary)" }}
                  >
                    [00:00] — [00:00] (Local Time)
                  </p>
                  <p
                    className="text-caption"
                    style={{ marginTop: "var(--ref-space-1)" }}
                  >
                    [Customize this note about appointment availability.]
                  </p>
                </div>
              </div>

              {/* Studios */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--ref-space-3)",
                }}
              >
                <p className="text-label">Studios</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--ref-space-4)" }}>
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                        fontSize: "var(--ref-font-size-caption)",
                        fontWeight: 700,
                        color: "var(--sys-color-text-accent)",
                        marginBottom: "4px",
                      }}
                    >
                      Tokyo / Aoyama
                    </p>
                    <p className="text-caption">5-11-23 Minami-Aoyama, Minato-ku</p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
                        fontSize: "var(--ref-font-size-caption)",
                        fontWeight: 700,
                        color: "var(--sys-color-text-accent)",
                        marginBottom: "4px",
                      }}
                    >
                      Paris / Le Marais
                    </p>
                    <p className="text-caption">18 Rue de la Verrerie, 75004</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterDirectory />

      <style>{`
        @media (max-width: 768px) {
          .concierge-layout {
            grid-template-columns: 1fr !important;
            gap: var(--ref-space-8) !important;
          }
        }
      `}</style>
    </>
  );
}
