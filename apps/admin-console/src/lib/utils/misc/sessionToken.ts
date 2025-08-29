import { AdminConsoleLoginJwtPayload } from "@scaleits-solutions-gmbh/services";
import { decodeJwt } from "jose";
import { cookies } from "next/headers";

export async function getSessionTokenPayload(): Promise<AdminConsoleLoginJwtPayload> {
  const sessionToken = await getSessionToken();

  const decoded = decodeJwt(sessionToken) as AdminConsoleLoginJwtPayload;
  return decoded as AdminConsoleLoginJwtPayload;
}

export async function getSessionToken(): Promise<string> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("ac_sessionToken")?.value;
  if (!sessionToken) {
    throw new Error("Session token not found");
  }

  return sessionToken;
}
