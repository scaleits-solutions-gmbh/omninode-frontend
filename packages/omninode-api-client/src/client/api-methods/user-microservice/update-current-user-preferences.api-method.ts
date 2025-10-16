import type { AuthenticatedApiMethodInput } from "@/schemas/authenticated-api-method-input.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/api-request";
import {
  UpdateCurrentUserPreferencesHttpRequest,
  UpdateCurrentUserPreferencesHttpResponse,
  updateCurrentUserPreferencesHttpMetadata,
  updateCurrentUserPreferencesHttpRequestSchema,
  updateCurrentUserPreferencesHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { FlatObject } from "@/types/flat-object.type";
import { ContextlessRequest } from "@/types/contextless-request.type";

export type UpdateCurrentUserPreferencesParams = AuthenticatedApiMethodInput<
  FlatObject<ContextlessRequest<UpdateCurrentUserPreferencesHttpRequest>>
>;

export async function updateCurrentUserPreferences({
  input,
  apiConnection,
}: UpdateCurrentUserPreferencesParams): Promise<UpdateCurrentUserPreferencesHttpResponse> {
  const request: ContextlessRequest<UpdateCurrentUserPreferencesHttpRequest> = {
    body: {
      theme: input.theme,
      locale: input.locale,
    },
  };
  return await authenticatedApiRequest<
    typeof updateCurrentUserPreferencesHttpRequestSchema,
    typeof updateCurrentUserPreferencesHttpResponseSchema
  >({
    method: updateCurrentUserPreferencesHttpMetadata.method as HttpMethod,
    path: `${updateCurrentUserPreferencesHttpMetadata.path}`,
    request,
    inputValidationSchema: updateCurrentUserPreferencesHttpRequestSchema,
    outputValidationSchema: updateCurrentUserPreferencesHttpResponseSchema,
    apiConnection,
  });
}
