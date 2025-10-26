import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import {
  FindPaginatedUserListItemsHttpRequest,
  FindPaginatedUserListItemsHttpResponse,
  findPaginatedUserListItemsHttpMetadata,
  findPaginatedUserListItemsHttpRequestSchema,
  findPaginatedUserListItemsHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";

export type FindPaginatedUserListItemsParams = {
  request: ContextlessRequest<FindPaginatedUserListItemsHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function findPaginatedUserListItems({
  request,
  apiConnection,
}: FindPaginatedUserListItemsParams): Promise<FindPaginatedUserListItemsHttpResponse> {
  return await authenticatedApiRequest<
    typeof findPaginatedUserListItemsHttpRequestSchema,
    typeof findPaginatedUserListItemsHttpResponseSchema
  >({
    method: findPaginatedUserListItemsHttpMetadata.method as HttpMethod,
    path: `${findPaginatedUserListItemsHttpMetadata.path}`,
    request,
    inputValidationSchema: findPaginatedUserListItemsHttpRequestSchema,
    outputValidationSchema: findPaginatedUserListItemsHttpResponseSchema,
    apiConnection,
  });
}
