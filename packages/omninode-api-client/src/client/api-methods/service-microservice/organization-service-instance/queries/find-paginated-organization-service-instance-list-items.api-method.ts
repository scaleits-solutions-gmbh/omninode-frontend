import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  FindComposedPaginatedOrganizationServiceInstanceListItemsHttpRequest,
  FindComposedPaginatedOrganizationServiceInstanceListItemsHttpResponse,
  findComposedPaginatedOrganizationServiceInstanceListItemsHttpMetadata,
  findComposedPaginatedOrganizationServiceInstanceListItemsHttpRequestSchema,
  findComposedPaginatedOrganizationServiceInstanceListItemsHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type FindComposedPaginatedOrganizationServiceInstanceListItemsParams = {
  request: ContextlessRequest<FindComposedPaginatedOrganizationServiceInstanceListItemsHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function findComposedPaginatedOrganizationServiceInstanceListItems({
  request,
  apiConnection,
}: FindComposedPaginatedOrganizationServiceInstanceListItemsParams): Promise<FindComposedPaginatedOrganizationServiceInstanceListItemsHttpResponse> {
  return await authenticatedApiRequest<
    typeof findComposedPaginatedOrganizationServiceInstanceListItemsHttpRequestSchema,
    typeof findComposedPaginatedOrganizationServiceInstanceListItemsHttpResponseSchema
  >({
    method: findComposedPaginatedOrganizationServiceInstanceListItemsHttpMetadata.method as HttpMethod,
    path: `${findComposedPaginatedOrganizationServiceInstanceListItemsHttpMetadata.servicePath}`,
    request,
    inputValidationSchema: findComposedPaginatedOrganizationServiceInstanceListItemsHttpRequestSchema,
    outputValidationSchema: findComposedPaginatedOrganizationServiceInstanceListItemsHttpResponseSchema,
    apiConnection,
  });
}

