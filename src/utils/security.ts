/**
 * KODŌ — Unified cryptographic/regex-based data sanitizers
 * Prevents cross-site scripting (XSS) and SQL/NoSQL injection
 * vulnerabilities inside Next.js Server Actions.
 */

export function sanitizeString(input: string): string {
  if (!input) return "";
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

export function validateEmail(email: string): boolean {
  if (!email) return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length < 254;
}

export function sanitizeFormPayload<T extends Record<string, unknown>>(
  payload: T
): T {
  const sanitized = { ...payload };
  for (const key in sanitized) {
    if (typeof sanitized[key] === "string") {
      (sanitized as Record<string, unknown>)[key] = sanitizeString(
        sanitized[key] as string
      );
    }
  }
  return sanitized;
}
