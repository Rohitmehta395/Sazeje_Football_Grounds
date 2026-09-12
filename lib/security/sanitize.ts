/**
 * Input sanitization and HTML escaping utilities.
 * Protects against HTML injection, stored XSS in email clients, and control character exploits.
 */

/**
 * Escapes HTML entities to prevent HTML injection in email templates.
 */
export function escapeHtml(str: string): string {
  if (!str || typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/\//g, "&#x2F;");
}

/**
 * Strips non-printable ASCII control characters (preserving newlines and tabs)
 * and trims whitespace.
 */
export function sanitizeInput(str: string): string {
  if (!str || typeof str !== "string") return "";
  // Strip null bytes and non-printable control chars except \n, \r, \t
  return str
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .trim();
}
