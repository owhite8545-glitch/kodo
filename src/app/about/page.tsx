import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HomeClient } from "../HomeClient";
import { FooterDirectory } from "@/components/global/FooterDirectory";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { SITE_CONFIG } from "@/config/site";

export const metadata = {
  title: "About",
  description:
    "The philosophy, creative direction, and international studio architecture behind KODŌ Fragrances.",
};

const PRINCIPLES = [
  {
    number: "01",
    title: "Ma — Negative Space",
    body: "We design the silence between notes with the same precision as the molecules themselves. What is withheld defines the silhouette.",
  },
  {
    number: "02",
    title: "Shibui — Unobtrusive Complexity",
    body: "Simplicity on the surface; depth revealed slowly with time. Our formulations mature in cool dark glass before release.",
  },
  {
    number: "03",
    title: "Yūgen — Subtle Profundity",
    body: "A scent should never declare everything at once. Instead, it traces subtle impressions across shifting light and skin warmth.",
  },
  {
    number: "04",
    title: "Datsuzoku — Freedom from Habit",
    body: "Architectural independence from seasonal fragrance trends. Four enduring states rather than transient flankers.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <HomeClient />
      <main id="main-content" role="main">
        {/* Hero Statement */}
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
            The Studio
          </p>
          <h1
            className="text-display"
            style={{
              fontFamily: "var(--font-editorial-display), Georgia, serif",
              marginBottom: "var(--ref-space-4)",
            }}
          >
            Built on Restraint
          </h1>
          <p
            className="text-body-lg"
            style={{
              color: "var(--sys-color-text-secondary)",
              maxWidth: "52ch",
              marginInline: "auto",
            }}
          >
            KODŌ is a house of perfumers, spatial designers, and material
            researchers working between Tokyo and Paris to translate Japanese
            incense discipline into architectural extraits.
          </p>
        </section>

        {/* Four Guiding Principles */}
        <SectionReveal>
          <section
            style={{
              paddingInline: "var(--sys-space-page-margin)",
              maxWidth: "1200px",
              marginInline: "auto",
              marginBottom: "var(--sys-space-section)",
            }}
          >
            <div style={{ marginBottom: "var(--ref-space-10)" }}>
              <p className="text-label" style={{ marginBottom: "var(--ref-space-2)" }}>
                Philosophy
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-editorial-display), Georgia, serif",
                  fontSize: "var(--ref-font-size-heading)",
                }}
              >
                Four Guiding Principles
              </h2>
            </div>

            <div className="about-principles-grid">
              {PRINCIPLES.map((item) => (
                <div
                  key={item.number}
                  style={{
                    padding: "var(--ref-space-6)",
                    border: "1px solid var(--sys-color-border)",
                    background: "var(--sys-color-surface)",
                  }}
                >
                  <p className="text-label" style={{ marginBottom: "var(--ref-space-3)" }}>
                    {item.number}
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-editorial-display), Georgia, serif",
                      fontSize: "var(--ref-font-size-title)",
                      marginBottom: "var(--ref-space-2)",
                      fontWeight: 400,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-body" style={{ color: "var(--sys-color-text-secondary)" }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </SectionReveal>

        {/* Studio Architecture */}
        <SectionReveal>
          <section
            style={{
              paddingInline: "var(--sys-space-page-margin)",
              maxWidth: "1200px",
              marginInline: "auto",
              marginBottom: "var(--sys-space-section)",
            }}
          >
            <div style={{ marginBottom: "var(--ref-space-10)" }}>
              <p className="text-label" style={{ marginBottom: "var(--ref-space-2)" }}>
                Atelier Spaces
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-editorial-display), Georgia, serif",
                  fontSize: "var(--ref-font-size-heading)",
                }}
              >
                Two Flagship Sanctuaries
              </h2>
            </div>

            <div className="about-studios-grid">
              {SITE_CONFIG.studios.map((studio) => (
                <div
                  key={studio.id}
                  style={{
                    border: "1px solid var(--sys-color-border)",
                    background: "var(--sys-color-surface)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      aspectRatio: "4/3",
                      position: "relative",
                      background: "var(--ref-color-obsidian-50)",
                    }}
                  >
                    <Image
                      src={studio.image}
                      alt={studio.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ padding: "var(--ref-space-6)" }}>
                    <p className="text-label" style={{ marginBottom: "var(--ref-space-2)" }}>
                      {studio.region}
                    </p>
                    <h3
                      style={{
                        fontFamily: "var(--font-editorial-display), Georgia, serif",
                        fontSize: "var(--ref-font-size-title)",
                        marginBottom: "var(--ref-space-2)",
                        fontWeight: 400,
                      }}
                    >
                      {studio.title}
                    </h3>
                    <p
                      className="text-body"
                      style={{
                        color: "var(--sys-color-text-secondary)",
                        marginBottom: "var(--ref-space-2)",
                      }}
                    >
                      {studio.street}, {studio.cityPostal}
                    </p>
                    <p
                      className="text-caption"
                      style={{
                        color: "var(--sys-color-text-secondary)",
                        marginBottom: "var(--ref-space-3)",
                      }}
                    >
                      {studio.appointmentsNote}
                    </p>
                    <p className="text-caption" style={{ color: "var(--sys-color-text-accent)" }}>
                      {studio.hours}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </SectionReveal>

        {/* Craftspeople & Direction */}
        <SectionReveal>
          <section
            style={{
              paddingInline: "var(--sys-space-page-margin)",
              maxWidth: "1200px",
              marginInline: "auto",
              paddingBottom: "var(--sys-space-section)",
            }}
          >
            <div style={{ marginBottom: "var(--ref-space-10)" }}>
              <p className="text-label" style={{ marginBottom: "var(--ref-space-2)" }}>
                Craftspeople
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-editorial-display), Georgia, serif",
                  fontSize: "var(--ref-font-size-heading)",
                }}
              >
                Studio Direction
              </h2>
            </div>

            <div className="about-team-grid">
              {SITE_CONFIG.team.map((member) => (
                <div
                  key={member.name}
                  style={{
                    padding: "var(--ref-space-6)",
                    border: "1px solid var(--sys-color-border)",
                    background: "var(--sys-color-surface)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--ref-space-2)",
                  }}
                >
                  <p className="text-label">{member.location}</p>
                  <h3
                    style={{
                      fontFamily: "var(--font-editorial-display), Georgia, serif",
                      fontSize: "var(--ref-font-size-title)",
                      fontWeight: 400,
                    }}
                  >
                    {member.name}
                  </h3>
                  <p className="text-caption" style={{ color: "var(--sys-color-text-accent)" }}>
                    {member.role}
                  </p>
                  <p className="text-body" style={{ color: "var(--sys-color-text-secondary)" }}>
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "var(--ref-space-12)" }}>
              <Link href="/concierge" className="kodo-btn-solid kodo-focus-ring">
                Book a Private Consultation
              </Link>
            </div>
          </section>
        </SectionReveal>
      </main>
      <FooterDirectory />

      <style>{`
        .about-principles-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: var(--ref-space-6);
        }
        .about-studios-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: var(--ref-space-6);
        }
        .about-team-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: var(--ref-space-6);
        }
        @media (max-width: 900px) {
          .about-team-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .about-principles-grid { grid-template-columns: 1fr; }
          .about-studios-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
