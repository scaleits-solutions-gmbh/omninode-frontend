import { getOriginUrl } from "./get-origin-url";

/**
 * Checks whether the provided URL points to a trusted domain.
 * Rules:
 * - Relative URLs are trusted.
 * - Absolute URLs are trusted if their hostname matches the current origin's hostname
 *   or is a subdomain of the current origin's base domain (last two labels).
 */
export function isTrustedDomain(url: string): boolean {
  if (!url) return false;

  // Relative URLs (starting with '/') are trusted
  if (url.startsWith("/")) return true;

  try {
    const origin = new URL(getOriginUrl());
    const target = new URL(url, origin);

    // Only allow http/https
    if (target.protocol !== "http:" && target.protocol !== "https:") return false;

    // Same hostname as origin is trusted
    if (target.hostname === origin.hostname) return true;

    // Allow subdomains of the origin's base domain (last two labels)
    const originParts = origin.hostname.split(".");
    const baseDomain = originParts.slice(-2).join(".");
    return (
      target.hostname === baseDomain || target.hostname.endsWith(`.${baseDomain}`)
    );
  } catch {
    // If URL parsing fails, treat as untrusted
    return false;
  }
}

