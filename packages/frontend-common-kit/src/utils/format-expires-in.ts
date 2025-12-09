export function formatExpiresIn(expiresAt: string | Date, now: Date = new Date()): string {
  const target = typeof expiresAt === "string" ? new Date(expiresAt) : expiresAt;
  const diffMs = target.getTime() - now.getTime();

  if (!Number.isFinite(diffMs)) return "";
  if (diffMs <= 0) return "expired";

  const minuteMs = 60 * 1000;
  const hourMs = 60 * minuteMs;
  const dayMs = 24 * hourMs;

  if (diffMs >= dayMs) {
    const days = Math.floor(diffMs / dayMs);
    const hours = Math.floor((diffMs % dayMs) / hourMs);
    return `${days}d ${hours}h`;
  }

  if (diffMs >= hourMs) {
    const hours = Math.floor(diffMs / hourMs);
    const minutes = Math.floor((diffMs % hourMs) / minuteMs);
    return `${hours}h ${minutes}m`;
  }

  const minutes = Math.max(0, Math.floor(diffMs / minuteMs));
  return `${minutes}m`;
}


