"use client";

import React, { useState } from "react";
import type { ConciergeFormData, FormState } from "@/types/webgl";

/* ═══════════════════════════════════════════════════════════
   KODŌ — Concierge Form Client Component
   Handles form state and validation for the concierge page.
   ═══════════════════════════════════════════════════════════ */

const INQUIRY_TYPES: { value: ConciergeFormData["inquiryType"]; label: string }[] = [
  { value: "general", label: "General Inquiry" },
  { value: "consultation", label: "Private Consultation" },
  { value: "wholesale", label: "Wholesale & Partnerships" },
  { value: "press", label: "Press & Media" },
];

export function ConciergeForm() {
  const [formData, setFormData] = useState<ConciergeFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: "general",
  });

  const [formState, setFormState] = useState<FormState>({
    status: "idle",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ status: "success", message: "Thank you. Our team will be in touch shortly." });
  };

  const inputStyles: React.CSSProperties = {
    width: "100%",
    height: "var(--comp-input-height)",
    padding: "0 var(--ref-space-2)",
    backgroundColor: "transparent",
    border: "1px solid var(--sys-color-border)",
    color: "var(--sys-color-text-primary)",
    fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
    fontSize: "var(--ref-font-size-base)",
    outline: "none",
    transition: "border-color 150ms var(--ease-decelerate)",
  };

  const labelStyles: React.CSSProperties = {
    fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
    fontSize: "var(--ref-font-size-small)",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "var(--ref-letter-spacing-caps)",
    color: "var(--sys-color-text-accent)",
    marginBottom: "var(--ref-space-1)",
    display: "block",
  };

  if (formState.status === "success") {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "var(--ref-space-12) 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--ref-space-4)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-editorial-display), Georgia, serif",
            fontSize: "var(--ref-font-size-heading)",
            lineHeight: "var(--ref-line-height-tight)",
          }}
        >
          Message Received
        </p>
        <p
          className="text-body-lg"
          style={{
            color: "var(--sys-color-text-secondary)",
            maxWidth: "40ch",
          }}
        >
          {formState.message}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--ref-space-4)",
        maxWidth: "600px",
      }}
    >
      {/* Inquiry Type */}
      <div>
        <label htmlFor="concierge-inquiry" style={labelStyles}>
          Inquiry Type
        </label>
        <select
          id="concierge-inquiry"
          value={formData.inquiryType}
          onChange={(e) =>
            setFormData({ ...formData, inquiryType: e.target.value as ConciergeFormData["inquiryType"] })
          }
          className="kodo-focus-ring"
          style={{
            ...inputStyles,
            appearance: "none",
            cursor: "pointer",
          }}
        >
          {INQUIRY_TYPES.map((type) => (
            <option key={type.value} value={type.value} style={{ backgroundColor: "var(--sys-color-bg)" }}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Name */}
      <div>
        <label htmlFor="concierge-name" style={labelStyles}>
          Full Name
        </label>
        <input
          id="concierge-name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="kodo-focus-ring"
          placeholder="Your name"
          style={inputStyles}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="concierge-email" style={labelStyles}>
          Email Address
        </label>
        <input
          id="concierge-email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="kodo-focus-ring"
          placeholder="your@email.com"
          style={inputStyles}
        />
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="concierge-subject" style={labelStyles}>
          Subject
        </label>
        <input
          id="concierge-subject"
          type="text"
          required
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="kodo-focus-ring"
          placeholder="How may we assist you?"
          style={inputStyles}
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="concierge-message" style={labelStyles}>
          Message
        </label>
        <textarea
          id="concierge-message"
          required
          rows={6}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="kodo-focus-ring"
          placeholder="Please describe your inquiry in detail..."
          style={{
            ...inputStyles,
            height: "auto",
            padding: "var(--ref-space-2)",
            resize: "vertical",
            minHeight: "120px",
          }}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="kodo-btn-solid kodo-focus-ring"
        style={{
          width: "100%",
          marginTop: "var(--ref-space-2)",
        }}
      >
        Send Inquiry
      </button>

      <p className="text-caption" style={{ marginTop: "var(--ref-space-1)" }}>
        [Customize response time and availability details.]
      </p>
    </form>
  );
}
