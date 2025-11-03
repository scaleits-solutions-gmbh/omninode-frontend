import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  UpdateFeedbackHttpRequest,
  UpdateFeedbackHttpResponse,
  updateFeedbackHttpMetadata,
  updateFeedbackHttpRequestSchema,
  updateFeedbackHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type UpdateFeedbackParams = {
  request: ContextlessRequest<UpdateFeedbackHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function updateFeedback({
  request,
  apiConnection,
}: UpdateFeedbackParams): Promise<UpdateFeedbackHttpResponse> {
  return await authenticatedApiRequest<
    typeof updateFeedbackHttpRequestSchema,
    typeof updateFeedbackHttpResponseSchema
  >({
    method: updateFeedbackHttpMetadata.method as HttpMethod,
    path: `${updateFeedbackHttpMetadata.servicePath}`.replace(
      "{id}",
      request.pathParams.id
    ),
    request,
    inputValidationSchema: updateFeedbackHttpRequestSchema,
    outputValidationSchema: updateFeedbackHttpResponseSchema,
    apiConnection,
  });
}

