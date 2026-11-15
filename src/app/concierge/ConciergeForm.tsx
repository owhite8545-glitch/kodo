"use client";

import React, { useMemo, useState, useTransition } from "react";
import { SITE_CONFIG } from "@/config/site";
import { INQUIRY_LABELS, type InquiryType } from "@/lib/concierge-schema";
import {
  KodoListbox,
  type KodoListboxOption,
} from "@/components/shared/KodoListbox";
import { submitConciergeInquiry } from "./actions";

const fieldStyle: React.CSSProperties = {
  width: "100%",
  minHeight: "48px",
  padding: "12px 16px",
  backgroundColor: "var(--sys-color-surface)",
  border: "1px solid var(--sys-color-border)",
  color: "var(--sys-color-text-primary)",
  fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
  fontSize: "var(--ref-font-size-base)",
  outline: "none",
};

const errorTextStyle: React.CSSProperties = {
  marginTop: "6px",
  fontFamily: "var(--font-utility-sans), system-ui, sans-serif",
  fontSize: "var(--ref-font-size-small)",
  color: "var(--sys-color-error)",
};

export function ConciergeForm() {
  const [isPending, startTransition] = useTransition();
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    inquiryType: "consultation" as InquiryType,
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
  });

  const inquiryOptions = useMemo<KodoListboxOption<InquiryType>[]>(
    () =>
      (Object.keys(INQUIRY_LABELS) as InquiryType[]).map((key) => ({
        value: key,
        label: INQUIRY_LABELS[key],
      })),
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setFieldErrors({});

    startTransition(async () => {
      try {
        const result = await submitConciergeInquiry(formData);
        if (!result.success) {
          if (result.fieldErrors) setFieldErrors(result.fieldErrors);
          setServerError(result.error || "Unable to send inquiry.");
          return;
        }

        setSubmittedRef(result.referenceId ?? "CONFIRMED");
        setSuccessMessage(
          result.message ??
            "Thank you. Our team will be in touch shortly."
        );
      } catch {
        setServerError(
          "A connection interruption prevented submission. Please try again."
        );
      }
    });
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setSuccessMessage(null);
    setServerError(null);
    setFieldErrors({});
    setFormData({
      inquiryType: "consultation",
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    });
  };

  if (submittedRef) {
    return (
      <div
        role="status"
        style={{
          padding: "var(--ref-space-10)",
          border: "1px solid var(--sys-color-border)",
          background: "var(--sys-color-surface)",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--ref-space-3)",
        }}
      >
        <p className="text-label">Message Received</p>
        <h2
          style={{
            fontFamily: "var(--font-editorial-display), Georgia, serif",
            fontSize: "var(--ref-font-size-title)",
            fontWeight: 400,
          }}
        >
          Thank you, {formData.name || "Patron"}.
        </h2>
        <p className="text-caption" style={{ color: "var(--sys-color-text-accent)" }}>
          Reference: {submittedRef}
        </p>
        <p
          className="text-body"
          style={{
            color: "var(--sys-color-text-secondary)",
            maxWidth: "42ch",
          }}
        >
          {successMessage}
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="kodo-btn-outline kodo-focus-ring"
          style={{ marginTop: "var(--ref-space-3)" }}
        >
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--ref-space-6)",
      }}
    >
      {serverError && (
        <div
          role="alert"
          style={{
            padding: "var(--ref-space-3) var(--ref-space-4)",
            border: "1px solid var(--sys-color-error)",
            backgroundColor: "oklch(16% 0.04 25 / 0.28)",
          }}
        >
          <p className="text-body" style={{ color: "var(--sys-color-error)" }}>
            {serverError}
          </p>
        </div>
      )}

      {/* Hidden Honeypot */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        <label htmlFor="concierge-website">Website</label>
        <input
          id="concierge-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={(e) =>
            setFormData({ ...formData, website: e.target.value })
          }
        />
      </div>

      {/* Inquiry Type */}
      <div>
        <label
          id="inquiryType-label"
          htmlFor="inquiryType"
          className="text-label"
          style={{ display: "block", marginBottom: "var(--ref-space-2)" }}
        >
          Inquiry Type
        </label>
        <KodoListbox
          id="inquiryType"
          labelId="inquiryType-label"
          options={inquiryOptions}
          value={formData.inquiryType}
          onChange={(inquiryType) =>
            setFormData({ ...formData, inquiryType })
          }
          fullWidth
          height="48px"
          align="left"
        />
        {fieldErrors.inquiryType && (
          <p style={errorTextStyle}>{fieldErrors.inquiryType}</p>
        )}
      </div>

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="text-label"
          style={{ display: "block", marginBottom: "var(--ref-space-2)" }}
        >
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Your full name"
          className="kodo-input kodo-focus-ring"
          aria-invalid={Boolean(fieldErrors.name)}
          style={{
            ...fieldStyle,
            borderColor: fieldErrors.name ? "var(--sys-color-error)" : undefined,
          }}
        />
        {fieldErrors.name && <p style={errorTextStyle}>{fieldErrors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="text-label"
          style={{ display: "block", marginBottom: "var(--ref-space-2)" }}
        >
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="your@email.com"
          className="kodo-input kodo-focus-ring"
          aria-invalid={Boolean(fieldErrors.email)}
          style={{
            ...fieldStyle,
            borderColor: fieldErrors.email ? "var(--sys-color-error)" : undefined,
          }}
        />
        {fieldErrors.email && <p style={errorTextStyle}>{fieldErrors.email}</p>}
      </div>

      {/* Subject */}
      <div>
        <label
          htmlFor="subject"
          className="text-label"
          style={{ display: "block", marginBottom: "var(--ref-space-2)" }}
        >
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          value={formData.subject}
          onChange={(e) =>
            setFormData({ ...formData, subject: e.target.value })
          }
          placeholder="How may our studio assist you?"
          className="kodo-input kodo-focus-ring"
          aria-invalid={Boolean(fieldErrors.subject)}
          style={{
            ...fieldStyle,
            borderColor: fieldErrors.subject
              ? "var(--sys-color-error)"
              : undefined,
          }}
        />
        {fieldErrors.subject && (
          <p style={errorTextStyle}>{fieldErrors.subject}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="text-label"
          style={{ display: "block", marginBottom: "var(--ref-space-2)" }}
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          placeholder="Share preferred scent profiles, consultation dates, or architectural project details…"
          className="kodo-input kodo-focus-ring"
          aria-invalid={Boolean(fieldErrors.message)}
          style={{
            ...fieldStyle,
            resize: "vertical",
            borderColor: fieldErrors.message
              ? "var(--sys-color-error)"
              : undefined,
          }}
        />
        {fieldErrors.message && (
          <p style={errorTextStyle}>{fieldErrors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="kodo-btn-solid kodo-focus-ring"
        style={{
          opacity: isPending ? 0.65 : 1,
          cursor: isPending ? "wait" : "pointer",
        }}
      >
        {isPending ? "Sending Inquiry…" : "Send Inquiry"}
      </button>

      <p className="text-caption" style={{ textAlign: "center" }}>
        {SITE_CONFIG.contact.responseWindow}
      </p>
    </form>
  );
}
