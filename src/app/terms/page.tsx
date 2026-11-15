import React from "react";
import type { Metadata } from "next";
import {
  PolicyDocument,
  type PolicySection,
} from "@/components/shared/PolicyDocument";
import { COMMERCE_CONFIG } from "@/config/commerce";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Sale",
  description:
    "Terms governing small-batch fragrance acquisitions, pricing currency, and studio commissions.",
};

const SECTIONS: readonly PolicySection[] = [
  {
    heading: "Formulation Provenance & Small Batches",
    paragraphs: [
      `${SITE_CONFIG.brand.fullName} extraits incorporate high percentages of natural agricultural resins, barks, and absolutes. Subtle tonal variations between seasonal macerations reflect authentic raw harvest character.`,
      `All catalog pricing is quoted in ${COMMERCE_CONFIG.currency.code} and verified server-side prior to order confirmation or Stripe authorization.`,
    ],
  },
  {
    heading: "Studio Allocations & Order Modifications",
    paragraphs: [
      "Because parcels enter preparation promptly, address corrections or order cancellations must be requested within 2 hours of confirmation via concierge email.",
      "Custom bespoke commissions agreed through studio consultation follow written timeline schedules provided directly by our patron team.",
    ],
  },
  {
    heading: "Intellectual Property",
    paragraphs: [
      "All visual marks, vessel proportions, literary essays, and photographic plates remain the exclusive property of KODŌ Studio and may not be reproduced commercially without prior written consent.",
    ],
  },
];

export default function TermsPage() {
  return (
    <PolicyDocument
      eyebrow="House Governance"
      title="Terms of Sale"
      summary="Conditions governing acquisitions, small-batch provenance, and private commissions."
      updatedAt="2026"
      sections={SECTIONS}
    />
  );
}
