import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  FindDetailedFeedbackByIdHttpRequest,
  FindDetailedFeedbackByIdHttpResponse,
  findDetailedFeedbackByIdHttpMetadata,
  findDetailedFeedbackByIdHttpRequestSchema,
  findDetailedFeedbackByIdHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type FindDetailedFeedbackByIdParams = {
  request: ContextlessRequest<FindDetailedFeedbackByIdHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function findDetailedFeedbackById({
  request,
  apiConnection,
}: FindDetailedFeedbackByIdParams): Promise<FindDetailedFeedbackByIdHttpResponse> {
  return await authenticatedApiRequest<
    typeof findDetailedFeedbackByIdHttpRequestSchema,
    typeof findDetailedFeedbackByIdHttpResponseSchema
  >({
    method: findDetailedFeedbackByIdHttpMetadata.method as HttpMethod,
    path: `${findDetailedFeedbackByIdHttpMetadata.servicePath}`.replace(
      "{id}",
      request.pathParams.id
    ),
    request,
    inputValidationSchema: findDetailedFeedbackByIdHttpRequestSchema,
    outputValidationSchema: findDetailedFeedbackByIdHttpResponseSchema,
    apiConnection,
  });
}

