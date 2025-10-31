import { OrganizationRole } from "@scaleits-solutions-gmbh/services";
import { decodeJwt } from "jose";
import { cookies } from "next/headers";

type SessionTokenPayload = {
  sub: string;
  email: string;
  firstName: string;
  lastName: string;
  organizationRole: OrganizationRole;
  organizationId: string;
  iat: number;
  exp: number;
};

export async function getSessionTokenPayload(): Promise<SessionTokenPayload> {
  const sessionToken = await getSessionToken();

  const decoded = decodeJwt(sessionToken) as SessionTokenPayload;
  return decoded as SessionTokenPayload;
}

export async function getSessionToken(): Promise<string> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;
  if (!sessionToken) {
    throw new Error("Session token not found");
  }

  return sessionToken;
}
