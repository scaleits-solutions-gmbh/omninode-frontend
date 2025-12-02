/**
 * Format a date string or Date object to German date format (DD.MM.YYYY)
 */
export function formatDateDe(date: string | Date | null | undefined, fallback: string = "-"): string {
  if (!date) return fallback;
  
  const d = typeof date === "string" ? new Date(date) : date;
  
  if (isNaN(d.getTime())) return fallback;
  
  return d.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/**
 * Format a date string or Date object to German date time format (DD.MM.YYYY HH:mm)
 */
export function formatDateTimeDe(date: string | Date | null | undefined, fallback: string = "-"): string {
  if (!date) return fallback;
  
  const d = typeof date === "string" ? new Date(date) : date;
  
  if (isNaN(d.getTime())) return fallback;
  
  return d.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

