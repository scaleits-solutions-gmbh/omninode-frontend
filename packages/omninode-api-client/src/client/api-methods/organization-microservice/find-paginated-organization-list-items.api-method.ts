import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  FindPaginatedOrganizationListItemsHttpRequest,
  FindPaginatedOrganizationListItemsHttpResponse,
  findPaginatedOrganizationListItemsHttpMetadata,
  findPaginatedOrganizationListItemsHttpRequestSchema,
  findPaginatedOrganizationListItemsHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type FindPaginatedOrganizationListItemsParams = {
  request: ContextlessRequest<FindPaginatedOrganizationListItemsHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function findPaginatedOrganizationListItems({
  request,
  apiConnection,
}: FindPaginatedOrganizationListItemsParams): Promise<FindPaginatedOrganizationListItemsHttpResponse> {
  return await authenticatedApiRequest<
    typeof findPaginatedOrganizationListItemsHttpRequestSchema,
    typeof findPaginatedOrganizationListItemsHttpResponseSchema
  >({
    method: findPaginatedOrganizationListItemsHttpMetadata.method as HttpMethod,
    path: `${findPaginatedOrganizationListItemsHttpMetadata.path}`,
    request,
    inputValidationSchema: findPaginatedOrganizationListItemsHttpRequestSchema,
    outputValidationSchema: findPaginatedOrganizationListItemsHttpResponseSchema,
    apiConnection,
  });
}


