import type { GetAcmpClientNetworkCardResponseDto } from "@/types/acmp-client-network-card";
import { safeReadError } from "../../utils/safe-read-error.util";

export async function getAcmpClientNetworkCards(
  baseUrl: string,
  accessToken: string,
  params: {
    serviceInstanceId: string;
    clientId: string;
    page?: number;
    pageSize?: number;
    search?: string;
  }
): Promise<GetAcmpClientNetworkCardResponseDto> {
  const query = new URLSearchParams();
  if (params.page) query.set("page", String(params.page));
  if (params.pageSize) query.set("pageSize", String(params.pageSize));
  if (params.search) query.set("search", params.search);

  const url = new URL(
    `${baseUrl}/acmp-service/instances/${params.serviceInstanceId}/resources/clients/${params.clientId}/network-cards`
  );
  url.search = query.toString();

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: "GET",
  });

  if (!res.ok) {
    const text = await safeReadError(res);
    throw new Error(`getAcmpClientNetworkCards failed: ${res.status} ${text}`);
  }
  return (await res.json()) as GetAcmpClientNetworkCardResponseDto;
}



