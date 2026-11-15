import React from "react";
import { HomeClient } from "../HomeClient";
import { ConciergeForm } from "./ConciergeForm";
import { FooterDirectory } from "@/components/global/FooterDirectory";
import { SITE_CONFIG } from "@/config/site";

export const metadata = {
  title: "Concierge",
  description:
    "Private scent consultations, bespoke fragrance commissions, and patron support at KODŌ studios in Tokyo and Paris.",
};

export default function ConciergePage() {
  return (
    <>
      <HomeClient />
      <main id="main-content" role="main">
        {/* Hero */}
        <section
          style={{
            paddingTop: "calc(var(--comp-nav-height) + var(--ref-space-15))",
            paddingBottom: "var(--ref-space-15)",
            paddingInline: "var(--sys-space-page-margin)",
            textAlign: "center",
            maxWidth: "850px",
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
              marginBottom: "var(--ref-space-4)",
            }}
          >
            The Concierge
          </h1>
          <p
            className="text-body-lg"
            style={{
              color: "var(--sys-color-text-secondary)",
              maxWidth: "50ch",
              marginInline: "auto",
            }}
          >
            For private consultations, bespoke commissions, hospitality
            partnerships, and press inquiries. Every dialogue is attended
            directly by our studio team.
          </p>
        </section>

        {/* Form & Contact Directory */}
        <section
          aria-label="Contact form and studio directory"
          style={{
            paddingInline: "var(--sys-space-page-margin)",
            maxWidth: "1100px",
            marginInline: "auto",
            paddingBottom: "var(--sys-space-section)",
          }}
        >
          <div className="concierge-grid">
            <div>
              <ConciergeForm />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--ref-space-8)",
                paddingTop: "var(--ref-space-2)",
              }}
            >
              {/* Direct Contact */}
              <div
                style={{
                  padding: "var(--ref-space-6)",
                  border: "1px solid var(--sys-color-border)",
                  background: "var(--sys-color-surface)",
                }}
              >
                <p
                  className="text-label"
                  style={{ marginBottom: "var(--ref-space-3)" }}
                >
                  Direct Contact
                </p>
                <p
                  className="text-body"
                  style={{
                    color: "var(--sys-color-text-primary)",
                    marginBottom: "var(--ref-space-2)",
                  }}
                >
                  <a
                    href={`mailto:${SITE_CONFIG.contact.conciergeEmail}`}
                    className="kodo-focus-ring"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    {SITE_CONFIG.contact.conciergeEmail}
                  </a>
                </p>
                {SITE_CONFIG.studios.map((studio) => (
                  <p
                    key={studio.id}
                    className="text-body"
                    style={{ color: "var(--sys-color-text-secondary)" }}
                  >
                    {studio.phone}{" "}
                    <span className="text-caption">({studio.region})</span>
                  </p>
                ))}
              </div>

              {/* Studio Consultation Hours */}
              <div
                style={{
                  padding: "var(--ref-space-6)",
                  border: "1px solid var(--sys-color-border)",
                  background: "var(--sys-color-surface)",
                }}
              >
                <p
                  className="text-label"
                  style={{ marginBottom: "var(--ref-space-3)" }}
                >
                  Consultation Hours
                </p>
                <p
                  className="text-body"
                  style={{
                    color: "var(--sys-color-text-primary)",
                    marginBottom: "4px",
                  }}
                >
                  {SITE_CONFIG.contact.consultationHours.days}
                </p>
                <p
                  className="text-body"
                  style={{
                    color: "var(--sys-color-text-secondary)",
                    marginBottom: "var(--ref-space-3)",
                  }}
                >
                  {SITE_CONFIG.contact.consultationHours.hours} (Local Studio
                  Time)
                </p>
                <p className="text-caption">
                  {SITE_CONFIG.contact.consultationHours.note}
                </p>
              </div>

              {/* Studio Addresses */}
              <div
                style={{
                  padding: "var(--ref-space-6)",
                  border: "1px solid var(--sys-color-border)",
                  background: "var(--sys-color-surface)",
                }}
              >
                <p
                  className="text-label"
                  style={{ marginBottom: "var(--ref-space-3)" }}
                >
                  Studios
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--ref-space-3)",
                  }}
                >
                  {SITE_CONFIG.studios.map((studio) => (
                    <div key={studio.id}>
                      <p
                        className="text-body"
                        style={{ color: "var(--sys-color-text-primary)" }}
                      >
                        {studio.title}
                      </p>
                      <p className="text-caption">{studio.street}</p>
                      <p className="text-caption">{studio.cityPostal}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterDirectory />

      <style>{`
        .concierge-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: var(--ref-space-12);
          align-items: start;
        }
        @media (max-width: 768px) {
          .concierge-grid { grid-template-columns: 1fr; gap: var(--ref-space-8); }
        }
      `}</style>
    </>
  );
}
