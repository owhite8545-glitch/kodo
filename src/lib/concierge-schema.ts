import { z } from "zod/v4";

export const INQUIRY_TYPES = [
  "consultation",
  "bespoke",
  "wholesale",
  "press",
  "general",
] as const;

export type InquiryType = (typeof INQUIRY_TYPES)[number];

export const INQUIRY_LABELS: Record<InquiryType, string> = {
  consultation: "Private Scent Consultation",
  bespoke: "Bespoke Olfactory Commission",
  wholesale: "Wholesale & Hospitality Partnerships",
  press: "Press & Editorial Media",
  general: "General Patron Inquiry",
};

export const conciergeFormSchema = z.object({
  inquiryType: z.enum(INQUIRY_TYPES, {
    message: "Please select an inquiry type",
  }),
  name: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(120, "Full name is too long"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Please enter a valid email address")),
  subject: z
    .string()
    .trim()
    .min(3, "Subject must be at least 3 characters")
    .max(160, "Subject is too long"),
  message: z
    .string()
    .trim()
    .min(10, "Please share at least 10 characters so our atelier can assist properly")
    .max(3000, "Message must not exceed 3,000 characters"),
  website: z.string().max(120).optional().default(""),
});

export type ValidatedConciergeInput = z.infer<typeof conciergeFormSchema>;
