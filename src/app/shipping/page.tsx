import React from "react";
import type { Metadata } from "next";
import {
  PolicyDocument,
  type PolicySection,
} from "@/components/shared/PolicyDocument";
import { COMMERCE_CONFIG, formatCents } from "@/config/commerce";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description:
    "Atelier hazardous-compliant fragrance transit, complimentary courier threshold, and return guidelines for KODŌ.",
};

const SECTIONS: readonly PolicySection[] = [
  {
    heading: "Climate-Controlled Atelier Dispatch",
    paragraphs: [
      `All KODŌ extraits are bottled to order in borosilicate glass and sealed inside cushioned architectural sleeves. Standard dispatch occurs within 1–2 business days, with estimated delivery in ${COMMERCE_CONFIG.shipping.estimatedTransit}.`,
      `Orders totaling ${formatCents(
        COMMERCE_CONFIG.shipping.freeThresholdCents
      )} or more automatically qualify for ${COMMERCE_CONFIG.shipping.complimentaryLabel}. Orders below this threshold carry a flat courier fee of ${formatCents(
        COMMERCE_CONFIG.shipping.standardRateCents
      )}.`,
    ],
  },
  {
    heading: "International Destinations & Dangerous Goods Compliance",
    paragraphs: [
      "Because Extrait de Parfum contains natural botanical alcohols, air freight follows international IATA ground/dangerous-goods safety protocols so temperature exposure never compromises volatile top notes.",
      "Where local customs duties or import taxes apply outside your shipping hub, destination carriers collect applicable clearance charges directly prior to doorstep handover.",
    ],
  },
  {
    heading: "Returns & Sealed Vessel Exchanges",
    paragraphs: [
      "Unopened flacons with intact outer cellophane seals may be returned or exchanged within 14 calendar days of delivery.",
      `To arrange a courier return label or request assistance with damaged transit parcels, contact our studio concierge at ${SITE_CONFIG.contact.conciergeEmail} with your order reference.`,
    ],
  },
];

export default function ShippingPage() {
  return (
    <PolicyDocument
      eyebrow="Patron Care"
      title="Shipping & Returns"
      summary="Carefully insulated parcel fulfillment designed to preserve volatile aromatic notes from our studios to your collection."
      updatedAt="2026"
      sections={SECTIONS}
    />
  );
}
