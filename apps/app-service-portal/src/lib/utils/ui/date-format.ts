/**
 * Shared German date formatting helpers for table cells in Service Portal
 */

type InputDate = string | number | Date | null | undefined;

function parseToDate(value: InputDate): Date | null {
  if (value === null || value === undefined || value === "") return null;
  const date = value instanceof Date ? value : new Date(value);
  return isNaN(date.getTime()) ? null : date;
}

const dateFormatterDE = new Intl.DateTimeFormat("de-DE", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const dateTimeFormatterDE = new Intl.DateTimeFormat("de-DE", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDateDe(value: InputDate, fallback: string = "-"): string {
  const date = parseToDate(value);
  if (!date) return fallback;
  return dateFormatterDE.format(date);
}

export function formatDateTimeDe(value: InputDate, fallback: string = "-"): string {
  const date = parseToDate(value);
  if (!date) return fallback;
  return dateTimeFormatterDE.format(date);
}

export const deDateUtils = {
  formatDate: formatDateDe,
  formatDateTime: formatDateTimeDe,
};


