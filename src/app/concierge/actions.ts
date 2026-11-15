"use server";

import crypto from "node:crypto";
import {
  conciergeFormSchema,
  INQUIRY_LABELS,
} from "@/lib/concierge-schema";

export interface ConciergeActionResult {
  success: boolean;
  referenceId?: string;
  message?: string;
  error?: string;
  fieldErrors?: Record<string, string>;
}

export async function submitConciergeInquiry(
  formData: unknown
): Promise<ConciergeActionResult> {
  const parsed = conciergeFormSchema.safeParse(formData);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path.join(".");
      if (path && !fieldErrors[path]) {
        fieldErrors[path] = issue.message;
      }
    }
    return {
      success: false,
      error: "Please check the highlighted fields below.",
      fieldErrors,
    };
  }

  const data = parsed.data;
  const referenceId = `KDO-INQ-${crypto
    .randomBytes(4)
    .toString("hex")
    .toUpperCase()}`;

  // Honeypot anti-spam trap: silently accept without forwarding
  if (data.website && data.website.trim().length > 0) {
    return {
      success: true,
      referenceId,
      message: "Thank you. Your inquiry has been logged by our concierge team.",
    };
  }

  const webhookUrl = process.env.CONCIERGE_WEBHOOK_URL?.trim();
  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          referenceId,
          inquiryType: data.inquiryType,
          inquiryLabel: INQUIRY_LABELS[data.inquiryType],
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          submittedAt: new Date().toISOString(),
        }),
        signal: AbortSignal.timeout(5000),
      });

      if (!response.ok) {
        console.error(
          `[Concierge] Webhook returned status ${response.status}`
        );
      }
    } catch (err) {
      console.error("[Concierge] Webhook delivery warning:", err);
    }
  }

  return {
    success: true,
    referenceId,
    message:
      "Your inquiry has been received by our studio concierge. A specialist will reply within one business day.",
  };
}
