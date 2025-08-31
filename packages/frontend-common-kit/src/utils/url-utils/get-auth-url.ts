import { getOriginUrl } from "./get-origin-url";

export function getAuthUrl(callbackUrl: string): URL {
  const authUrl = new URL("/authflows/signin", getOriginUrl());
  authUrl.searchParams.set("callbackUrl", callbackUrl);
  return authUrl;
}
