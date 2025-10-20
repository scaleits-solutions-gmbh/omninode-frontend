import { ApiAuthentication } from "@/schemas/authentication.schema";
export function getApiAuthentication(accessToken: string): ApiAuthentication {
  return { type: "bearer", token: accessToken };
}
