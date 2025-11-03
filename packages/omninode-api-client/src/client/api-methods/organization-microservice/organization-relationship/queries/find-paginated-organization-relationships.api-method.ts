import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  FindPaginatedOrganizationRelationshipsHttpRequest,
  FindPaginatedOrganizationRelationshipsHttpResponse,
  findPaginatedOrganizationRelationshipsHttpMetadata,
  findPaginatedOrganizationRelationshipsHttpRequestSchema,
  findPaginatedOrganizationRelationshipsHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type FindPaginatedOrganizationRelationshipsParams = {
  request: ContextlessRequest<FindPaginatedOrganizationRelationshipsHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function findPaginatedOrganizationRelationships({
  request,
  apiConnection,
}: FindPaginatedOrganizationRelationshipsParams): Promise<FindPaginatedOrganizationRelationshipsHttpResponse> {
  return await authenticatedApiRequest<
    typeof findPaginatedOrganizationRelationshipsHttpRequestSchema,
    typeof findPaginatedOrganizationRelationshipsHttpResponseSchema
  >({
    method: findPaginatedOrganizationRelationshipsHttpMetadata.method as HttpMethod,
    path: `${findPaginatedOrganizationRelationshipsHttpMetadata.servicePath}`.replace(
      "{id}",
      request.pathParams.id
    ),
    request,
    inputValidationSchema: findPaginatedOrganizationRelationshipsHttpRequestSchema,
    outputValidationSchema: findPaginatedOrganizationRelationshipsHttpResponseSchema,
    apiConnection,
  });
}


