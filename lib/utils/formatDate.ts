export function formatDate(
  dateInput?: string | null,
  lang: "nl" | "en" = "nl"
): string {
  if (!dateInput) return "";

  const clean = dateInput.trim();
  if (!clean) return "";

  // Try parsing ISO or Date standard format
  const parsed = new Date(clean);
  if (isNaN(parsed.getTime())) {
    // If it's already a custom string like "Voorjaar 2024" or already formatted, return as-is
    return clean;
  }

  try {
    const locale = lang === "nl" ? "nl-NL" : "en-GB";
    return new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(parsed);
  } catch {
    return clean;
  }
}
