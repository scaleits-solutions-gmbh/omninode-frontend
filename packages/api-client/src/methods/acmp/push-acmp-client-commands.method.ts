import { safeReadError } from "../../utils/safe-read-error.util";

export type PushAcmpClientCommandsBody = {
  commandId: string;
  clientIds: string[];
};

export async function pushAcmpClientCommands(
  baseUrl: string,
  accessToken: string,
  params: { serviceInstanceId: string; organizationId?: string },
  body: PushAcmpClientCommandsBody,
): Promise<void> {
  const url = `${baseUrl}/acmp-service/instances/${params.serviceInstanceId}/resources/client-commands`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "content-type": "application/json",
      ...(params.organizationId ? { "x-organization-id": params.organizationId } : {}),
    },
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await safeReadError(res);
    throw new Error(`pushAcmpClientCommands failed: ${res.status} ${text}`);
  }
}
