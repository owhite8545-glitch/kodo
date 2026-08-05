import React from "react";
import type { Metadata } from "next";
import { HomeClient } from "../HomeClient";
import { FooterDirectory } from "@/components/global/FooterDirectory";

/* ═══════════════════════════════════════════════════════════
   KODŌ — About Page (Server Component)
   Studio philosophy, team, and creative process.
   ═══════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the KODŌ studio — a collective of perfumers, architects, and material scientists redefining olfactory design from Tokyo and Paris.",
};

const PRINCIPLES = [
  {
    number: "01",
    title: "Ma — Negative Space",
    description:
      "We design the silence between notes with the same precision as the notes themselves. The charged emptiness is where memory lives.",
  },
  {
    number: "02",
    title: "Wabi-Sabi — Imperfect Beauty",
    description:
      "Raw materials retain their natural imperfections. A wild vetiver from Haiti carries its terroir; aged oud bears the marks of time.",
  },
  {
    number: "03",
    title: "Kanso — Simplicity",
    description:
      "Each composition is reduced to its essential structure. No ingredient exists without purpose. Complexity arises from restraint.",
  },
  {
    number: "04",
    title: "Shibui — Subtle Depth",
    description:
      "The experience deepens with repeated encounter. A KODŌ scent on first wear reveals different architecture than it does on the twentieth.",
  },
];

const TEAM = [
  {
    name: "[Team Member Name]",
    role: "[Role Title]",
    detail: "[Brief biography or credentials. Customize this placeholder.]",
  },
  {
    name: "[Team Member Name]",
    role: "[Role Title]",
    detail: "[Brief biography or credentials. Customize this placeholder.]",
  },
  {
    name: "[Team Member Name]",
    role: "[Role Title]",
    detail: "[Brief biography or credentials. Customize this placeholder.]",
  },
];

export default function AboutPage() {
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
            The Studio
          </p>
          <h1
            className="text-display"
            style={{
              fontFamily: "var(--font-editorial-display), Georgia, serif",
              marginBottom: "var(--ref-space-6)",
            }}
          >
            Built on{" "}
            <span style={{ color: "var(--sys-color-text-accent)" }}>
              Restraint
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
            KODŌ is a collective of perfumers, architects, and material
            scientists working at the intersection of Japanese design philosophy
            and contemporary olfactory art.
          </p>
        </section>

        {/* ─── Ma Space ─── */}
        <div className="ma-space" />

        {/* ─── Design Principles ─── */}
        <section
          aria-label="Design Principles"
          style={{
            paddingInline: "var(--sys-space-page-margin)",
            maxWidth: "1440px",
            marginInline: "auto",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "var(--ref-space-12)" }}>
            <p className="text-label" style={{ marginBottom: "var(--ref-space-3)" }}>
              Philosophy
            </p>
            <h2
              className="text-heading"
              style={{
                fontFamily: "var(--font-editorial-display), Georgia, serif",
              }}
            >
              Four Guiding Principles
            </h2>
          </div>

          <div
            className="principles-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "var(--ref-space-4)",
            }}
          >
            {PRINCIPLES.map((principle) => (
              <div
                key={principle.number}
                style={{
                  padding: "var(--ref-space-6) var(--ref-space-4)",
                  border: "1px solid var(--sys-color-border)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--ref-space-3)",
                }}
              >
                <span
                  style={{
                    fontFamily:
                      "var(--font-editorial-display), Georgia, serif",
                    fontSize: "var(--ref-font-size-display)",
                    color: "oklch(98% 0.005 85 / 0.06)",
                    lineHeight: 1,
                  }}
                >
                  {principle.number}
                </span>
                <h3
                  style={{
                    fontFamily:
                      "var(--font-editorial-display), Georgia, serif",
                    fontSize: "var(--ref-font-size-title)",
                    fontWeight: 400,
                  }}
                >
                  {principle.title}
                </h3>
                <p
                  className="text-body"
                  style={{
                    color: "var(--sys-color-text-secondary)",
                    lineHeight: "var(--ref-line-height-relaxed)",
                  }}
                >
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Ma Space ─── */}
        <div className="ma-space" />

        {/* ─── Studio Locations ─── */}
        <section
          aria-label="Studio Locations"
          style={{
            paddingInline: "var(--sys-space-page-margin)",
            maxWidth: "1440px",
            marginInline: "auto",
          }}
        >
          <div
            className="about-two-col"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "var(--ref-space-8)",
              alignItems: "start",
            }}
          >
            {/* Tokyo Studio */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--ref-space-4)",
              }}
            >
              <div
                style={{
                  aspectRatio: "16/9",
                  backgroundColor: "var(--sys-color-surface)",
                  position: "relative",
                  overflow: "hidden",
                  marginBottom: "var(--ref-space-2)",
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(ellipse 60% 60% at 50% 50%, oklch(20% 0.02 85 / 0.12), transparent 70%)",
                  }}
                />
              </div>
              <p className="text-label">Tokyo / Aoyama</p>
              <p
                className="text-body"
                style={{
                  color: "var(--sys-color-text-secondary)",
                  maxWidth: "40ch",
                }}
              >
                Our research atelier in Minami-Aoyama houses the distillation
                laboratory and a private consultation space. Appointments by
                referral.
              </p>
              <p className="text-caption">5-11-23 Minami-Aoyama, Minato-ku, Tokyo</p>
            </div>

            {/* Paris Studio */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--ref-space-4)",
              }}
            >
              <div
                style={{
                  aspectRatio: "16/9",
                  backgroundColor: "var(--sys-color-surface)",
                  position: "relative",
                  overflow: "hidden",
                  marginBottom: "var(--ref-space-2)",
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(ellipse 60% 60% at 50% 50%, oklch(20% 0.02 85 / 0.12), transparent 70%)",
                  }}
                />
              </div>
              <p className="text-label">Paris / Le Marais</p>
              <p
                className="text-body"
                style={{
                  color: "var(--sys-color-text-secondary)",
                  maxWidth: "40ch",
                }}
              >
                The European creative studio and gallery. Source of our Grasse
                collaborations and European material partnerships.
              </p>
              <p className="text-caption">18 Rue de la Verrerie, 75004 Paris</p>
            </div>
          </div>
        </section>

        {/* ─── Ma Space ─── */}
        <div className="ma-space" />

        {/* ─── The Team ─── */}
        <section
          aria-label="The Team"
          style={{
            paddingInline: "var(--sys-space-page-margin)",
            maxWidth: "1440px",
            marginInline: "auto",
            paddingBottom: "var(--sys-space-section)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "var(--ref-space-12)" }}>
            <p className="text-label" style={{ marginBottom: "var(--ref-space-3)" }}>
              The Collective
            </p>
            <h2
              className="text-heading"
              style={{
                fontFamily: "var(--font-editorial-display), Georgia, serif",
              }}
            >
              Founders
            </h2>
          </div>

          <div
            className="team-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "var(--ref-space-6)",
              maxWidth: "1100px",
              marginInline: "auto",
            }}
          >
            {TEAM.map((member, index) => (
              <div
                key={index}
                style={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "var(--ref-space-3)",
                }}
              >
                {/* Avatar placeholder */}
                <div
                  style={{
                    width: 120,
                    height: 120,
                    backgroundColor: "var(--sys-color-surface)",
                    border: "1px solid var(--sys-color-border)",
                  }}
                />
                <h3
                  style={{
                    fontFamily:
                      "var(--font-editorial-display), Georgia, serif",
                    fontSize: "var(--ref-font-size-title)",
                    fontWeight: 400,
                  }}
                >
                  {member.name}
                </h3>
                <p className="text-label">{member.role}</p>
                <p
                  className="text-caption"
                  style={{ maxWidth: "28ch", lineHeight: "var(--ref-line-height-relaxed)" }}
                >
                  {member.detail}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <FooterDirectory />

      <style>{`
        @media (max-width: 1024px) {
          .principles-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .principles-grid {
            grid-template-columns: 1fr !important;
          }
          .about-two-col {
            grid-template-columns: 1fr !important;
          }
          .team-grid {
            grid-template-columns: 1fr !important;
            max-width: 320px;
          }
        }
      `}</style>
    </>
  );
}
