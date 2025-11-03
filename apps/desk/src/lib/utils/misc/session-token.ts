import { decodeJwt } from "jose";
import { cookies } from "next/headers";
import {
  OrganizationRole,
  OmninodeLoginTokenPayload,
} from "@scaleits-solutions-gmbh/services";

// TODO: remove this once the session token payload is updated to include the management console access
type OmninodeLoginTokenPayloadTemp = OmninodeLoginTokenPayload & {
  organizationRole: OrganizationRole;
};

/**
 * Get the session token payload from the cookies
 * @returns The session token payload
 */
export async function getSessionTokenPayload(): Promise<OmninodeLoginTokenPayloadTemp> {
  const sessionToken = await getSessionToken();

  const decoded = decodeJwt(sessionToken) as OmninodeLoginTokenPayloadTemp;
  decoded.organizationRole = OrganizationRole.Admin;
  return decoded;
}

export async function getSessionToken(): Promise<string> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;
  if (!sessionToken) {
    throw new Error("Session token not found");
  }

  return sessionToken;
}
