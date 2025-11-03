import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import {
  UpdateCurrentUserHttpRequest,
  UpdateCurrentUserHttpResponse,
  updateCurrentUserHttpMetadata,
  updateCurrentUserHttpRequestSchema,
  updateCurrentUserHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";

export type UpdateCurrentUserParams = {
  request: ContextlessRequest<UpdateCurrentUserHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function updateCurrentUser({
  request,
  apiConnection,
}: UpdateCurrentUserParams): Promise<UpdateCurrentUserHttpResponse> {
  return await authenticatedApiRequest<
    typeof updateCurrentUserHttpRequestSchema,
    typeof updateCurrentUserHttpResponseSchema
  >({
    method: updateCurrentUserHttpMetadata.method as HttpMethod,
    path: `${updateCurrentUserHttpMetadata.servicePath}`,
    request,
    inputValidationSchema: updateCurrentUserHttpRequestSchema,
    outputValidationSchema: updateCurrentUserHttpResponseSchema,
    apiConnection,
  });
}
