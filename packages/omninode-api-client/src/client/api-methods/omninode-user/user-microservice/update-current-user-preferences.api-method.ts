import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import {
  UpdateCurrentUserPreferencesHttpRequest,
  UpdateCurrentUserPreferencesHttpResponse,
  updateCurrentUserPreferencesHttpMetadata,
  updateCurrentUserPreferencesHttpRequestSchema,
  updateCurrentUserPreferencesHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";

export type UpdateCurrentUserPreferencesParams = {
  request: ContextlessRequest<UpdateCurrentUserPreferencesHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function updateCurrentUserPreferences({
  request,
  apiConnection,
}: UpdateCurrentUserPreferencesParams): Promise<UpdateCurrentUserPreferencesHttpResponse> {
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
