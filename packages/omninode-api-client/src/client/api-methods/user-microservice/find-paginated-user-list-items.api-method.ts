import { AuthenticatedApiMethodInput } from "@/schemas/authenticated-api-method-input.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/api-request";
import {
  FindPaginatedUserListItemsHttpRequest,
  FindPaginatedUserListItemsHttpResponse,
  findPaginatedUserListItemsHttpMetadata,
  findPaginatedUserListItemsHttpRequestSchema,
  findPaginatedUserListItemsHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { ContextlessRequest } from "@/types/contextless-request.type";
import { FlatObject } from "@/types/flat-object.type";

export type findPaginatedUserListItemsParams = AuthenticatedApiMethodInput<
  FlatObject<ContextlessRequest<FindPaginatedUserListItemsHttpRequest>>
>;

export async function findPaginatedUserListItems({
  input,
  apiConnection,
}: findPaginatedUserListItemsParams): Promise<FindPaginatedUserListItemsHttpResponse> {
  const request: ContextlessRequest<FindPaginatedUserListItemsHttpRequest> = {
    queryParams: {
      page: input.page,
      pageSize: input.pageSize,
      searchTerm: input.searchTerm,
    },
  };
  return await authenticatedApiRequest<
    typeof findPaginatedUserListItemsHttpRequestSchema,
    typeof findPaginatedUserListItemsHttpResponseSchema
  >({
    method: findPaginatedUserListItemsHttpMetadata.method as HttpMethod,
    path: `${findPaginatedUserListItemsHttpMetadata.path}`,
    request: request,
    inputValidationSchema: findPaginatedUserListItemsHttpRequestSchema,
    outputValidationSchema: findPaginatedUserListItemsHttpResponseSchema,
    apiConnection,
  });
}
