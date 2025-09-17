import type { GetAcmpClientHardDriveResponseDto } from "@/types/acmp-client-hard-drive";
import { safeReadError } from "../../utils/safe-read-error.util";

export async function getAcmpClientHardDrives(
  baseUrl: string,
  accessToken: string,
  params: {
    serviceInstanceId: string;
    clientId: string;
    page?: number;
    pageSize?: number;
    search?: string;
  }
): Promise<GetAcmpClientHardDriveResponseDto> {
  const query = new URLSearchParams();
  if (params.page) query.set("page", String(params.page));
  if (params.pageSize) query.set("pageSize", String(params.pageSize));
  if (params.search) query.set("search", params.search);

  const url = new URL(
    `${baseUrl}/acmp-service/instances/${params.serviceInstanceId}/resources/clients/${params.clientId}/hard-drives`
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
    throw new Error(`getAcmpClientHardDrives failed: ${res.status} ${text}`);
  }
  const json = await res.json();
  console.log(json);
  return json as GetAcmpClientHardDriveResponseDto;
}


