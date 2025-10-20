import { OmninodeApiClient } from "./omninode-api-client";

export const baseOmninodeApiClient = () => {
  const apiUrl = process.env.NEXT_PUBLIC_OMNINODE_API_URL;
  if (!apiUrl) {
    throw new Error("OMNINODE_API_URL is not set");
  }
  const timeoutMs = process.env.OMNINODE_API_TIMEOUT_MS
    ? parseInt(process.env.OMNINODE_API_TIMEOUT_MS)
    : 10000;

  return new OmninodeApiClient(apiUrl, timeoutMs);
};

