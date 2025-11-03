import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  FindPaginatedFeedbackListItemsHttpRequest,
  FindPaginatedFeedbackListItemsHttpResponse,
  findPaginatedFeedbackListItemsHttpMetadata,
  findPaginatedFeedbackListItemsHttpRequestSchema,
  findPaginatedFeedbackListItemsHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type FindPaginatedFeedbackListItemsParams = {
  request: ContextlessRequest<FindPaginatedFeedbackListItemsHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function findPaginatedFeedbackListItems({
  request,
  apiConnection,
}: FindPaginatedFeedbackListItemsParams): Promise<FindPaginatedFeedbackListItemsHttpResponse> {
  return await authenticatedApiRequest<
    typeof findPaginatedFeedbackListItemsHttpRequestSchema,
    typeof findPaginatedFeedbackListItemsHttpResponseSchema
  >({
    method: findPaginatedFeedbackListItemsHttpMetadata.method as HttpMethod,
    path: `${findPaginatedFeedbackListItemsHttpMetadata.servicePath}`,
    request,
    inputValidationSchema: findPaginatedFeedbackListItemsHttpRequestSchema,
    outputValidationSchema:
      findPaginatedFeedbackListItemsHttpResponseSchema,
    apiConnection,
  });
}

