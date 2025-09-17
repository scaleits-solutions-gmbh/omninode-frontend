import { safeReadError } from "../../utils/safe-read-error.util";

export type PushAcmpRolloutTemplateBody = {
  rolloutId: string;
  clients: { id: string; newName: string; newDescription: string }[];
};

export async function pushAcmpRolloutTemplate(
  baseUrl: string,
  accessToken: string,
  params: { serviceInstanceId: string },
  body: PushAcmpRolloutTemplateBody,
): Promise<void> {
  const url = `${baseUrl}/acmp-service/instances/${params.serviceInstanceId}/resources/rollout-templates`;

  // Backend currently expects clientIds array; map from clients
  const payload = {
    rolloutId: body.rolloutId,
    clientIds: body.clients.map((c) => c.id),
  } as const;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await safeReadError(res);
    throw new Error(`pushAcmpRolloutTemplate failed: ${res.status} ${text}`);
  }
}
