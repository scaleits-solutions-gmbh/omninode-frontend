import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  FindUserFeedbacksHttpRequest,
  FindUserFeedbacksHttpResponse,
  findUserFeedbacksHttpMetadata,
  findUserFeedbacksHttpRequestSchema,
  findUserFeedbacksHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type FindUserFeedbacksParams = {
  request: ContextlessRequest<FindUserFeedbacksHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function findUserFeedbacks({
  request,
  apiConnection,
}: FindUserFeedbacksParams): Promise<FindUserFeedbacksHttpResponse> {
  return await authenticatedApiRequest<
    typeof findUserFeedbacksHttpRequestSchema,
    typeof findUserFeedbacksHttpResponseSchema
  >({
    method: findUserFeedbacksHttpMetadata.method as HttpMethod,
    path: `${findUserFeedbacksHttpMetadata.servicePath}`.replace(
      "{id}",
      request.pathParams.id
    ),
    request,
    inputValidationSchema: findUserFeedbacksHttpRequestSchema,
    outputValidationSchema: findUserFeedbacksHttpResponseSchema,
    apiConnection,
  });
}

