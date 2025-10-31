import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  FindFeedbackByIdHttpRequest,
  FindFeedbackByIdHttpResponse,
  findFeedbackByIdHttpMetadata,
  findFeedbackByIdHttpRequestSchema,
  findFeedbackByIdHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type FindFeedbackByIdParams = {
  request: ContextlessRequest<FindFeedbackByIdHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function findFeedbackById({
  request,
  apiConnection,
}: FindFeedbackByIdParams): Promise<FindFeedbackByIdHttpResponse> {
  return await authenticatedApiRequest<
    typeof findFeedbackByIdHttpRequestSchema,
    typeof findFeedbackByIdHttpResponseSchema
  >({
    method: findFeedbackByIdHttpMetadata.method as HttpMethod,
    path: `${findFeedbackByIdHttpMetadata.servicePath}`.replace(
      "{id}",
      request.pathParams.id
    ),
    request,
    inputValidationSchema: findFeedbackByIdHttpRequestSchema,
    outputValidationSchema: findFeedbackByIdHttpResponseSchema,
    apiConnection,
  });
}

