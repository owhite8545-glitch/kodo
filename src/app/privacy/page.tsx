import React from "react";
import type { Metadata } from "next";
import {
  PolicyDocument,
  type PolicySection,
} from "@/components/shared/PolicyDocument";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How KODŌ Fragrances handles patron information, checkout cookies, and studio inquiries.",
};

const SECTIONS: readonly PolicySection[] = [
  {
    heading: "Minimal Data Collection",
    paragraphs: [
      `${SITE_CONFIG.brand.fullName} collects only the details strictly necessary to fulfill orders, verify patron receipts, and respond to private concierge requests.`,
      "We do not operate third-party advertising trackers, behavioral profiling pixels, or data broker integrations.",
    ],
  },
  {
    heading: "Checkout & Payment Security",
    paragraphs: [
      "When Live Mode is active, card details are processed exclusively through Stripe's PCI-DSS Level 1 encrypted checkout. Full card numbers never pass through or rest on KODŌ application servers.",
      "Order confirmation sessions store strictly scoped, HTTP-only signed session tokens in your browser so receipts remain private to the ordering device.",
    ],
  },
  {
    heading: "Patron Rights & Inquiries",
    paragraphs: [
      `You may request access, correction, or removal of studio inquiry details at any time by writing to ${SITE_CONFIG.contact.conciergeEmail}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <PolicyDocument
      eyebrow="House Governance"
      title="Privacy Policy"
      summary="Restrained stewardship of personal data aligned with the privacy principles of KODŌ Studios."
      updatedAt="2026"
      sections={SECTIONS}
    />
  );
}
