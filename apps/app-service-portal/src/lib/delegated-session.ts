"use server";

import type { Session } from "next-auth";
import { cookies } from "next/headers";

/**
 * Fetches the NextAuth session from the entry-point app by forwarding cookies.
 * Set AUTH_DELEGATE_URL to the entry-point app origin (e.g. https://entry.example.com).
 * Falls back to NEXTAUTH_URL if AUTH_DELEGATE_URL is not provided.
 */
export async function getDelegatedSession(): Promise<Session> {
  const baseUrl = process.env.AUTH_DELEGATE_URL || process.env.NEXTAUTH_URL;
  if (!baseUrl) throw new Error("Missing AUTH_DELEGATE_URL or NEXTAUTH_URL");

  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c: { name: string; value: string }) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${baseUrl}/api/auth/session`, {
    method: "GET",
    headers: {
      cookie: cookieHeader,
    },
    // Never cache the session
    cache: "no-store",
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch session");
  }
  
  const session = (await res.json()) as Session | null;
  
  if (!session) {
    throw new Error("Session not found");
  }
  
  return session;
}

