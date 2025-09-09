import type { GetAcmpTicketsResponseDto } from "@/types/acmp-ticket";
import { safeReadError } from "../../utils/safe-read-error.util";

export async function getAcmpTickets(
  baseUrl: string,
  accessToken: string,
  params: {
    serviceInstanceId: string;
    page?: number;
    pageSize?: number;
    search?: string;
  }
): Promise<GetAcmpTicketsResponseDto> {
  const query = new URLSearchParams();
  if (params.page) query.set("page", String(params.page));
  if (params.pageSize) query.set("pageSize", String(params.pageSize));
  if (params.search) query.set("search", params.search);

  const url = new URL(
    `${baseUrl}/acmp-service/instances/${params.serviceInstanceId}/resources/tickets`
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
    throw new Error(`getAcmpTickets failed: ${res.status} ${text}`);
  }
  return (await res.json()) as GetAcmpTicketsResponseDto;
}



