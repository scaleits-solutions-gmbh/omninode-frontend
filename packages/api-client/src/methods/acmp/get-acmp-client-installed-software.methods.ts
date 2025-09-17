import type { GetAcmpClientInstalledSoftwareResponseDto } from "@/types/acmp-client-installed-software";
import { safeReadError } from "../../utils/safe-read-error.util";

export async function getAcmpClientInstalledSoftware(
  baseUrl: string,
  accessToken: string,
  params: {
    serviceInstanceId: string;
    clientId: string;
    page?: number;
    pageSize?: number;
    search?: string;
  }
): Promise<GetAcmpClientInstalledSoftwareResponseDto> {
  const query = new URLSearchParams();
  if (params.page) query.set("page", String(params.page));
  if (params.pageSize) query.set("pageSize", String(params.pageSize));
  if (params.search) query.set("search", params.search);

  const url = new URL(
    `${baseUrl}/acmp-service/instances/${params.serviceInstanceId}/resources/clients/${params.clientId}/installed-software`
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
    throw new Error(`getAcmpClientInstalledSoftware failed: ${res.status} ${text}`);
  }
  return (await res.json()) as GetAcmpClientInstalledSoftwareResponseDto;
}



