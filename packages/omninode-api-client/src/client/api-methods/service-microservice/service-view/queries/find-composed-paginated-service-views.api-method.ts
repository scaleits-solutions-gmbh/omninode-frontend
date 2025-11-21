import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  FindComposedPaginatedServiceViewsHttpRequest,
  FindComposedPaginatedServiceViewsHttpResponse,
  findComposedPaginatedServiceViewsHttpMetadata,
  findComposedPaginatedServiceViewsHttpRequestSchema,
  findComposedPaginatedServiceViewsHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type FindComposedPaginatedServiceViewsParams = {
  request: ContextlessRequest<FindComposedPaginatedServiceViewsHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function findComposedPaginatedServiceViews({
  request,
  apiConnection,
}: FindComposedPaginatedServiceViewsParams): Promise<FindComposedPaginatedServiceViewsHttpResponse> {
  return await authenticatedApiRequest<
    typeof findComposedPaginatedServiceViewsHttpRequestSchema,
    typeof findComposedPaginatedServiceViewsHttpResponseSchema
  >({
    method: findComposedPaginatedServiceViewsHttpMetadata.method as HttpMethod,
    path: `${findComposedPaginatedServiceViewsHttpMetadata.servicePath}`.replace(
      "{id}",
      request.pathParams.id
    ),
    request,
    inputValidationSchema: findComposedPaginatedServiceViewsHttpRequestSchema,
    outputValidationSchema: findComposedPaginatedServiceViewsHttpResponseSchema,
    apiConnection,
  });
}

