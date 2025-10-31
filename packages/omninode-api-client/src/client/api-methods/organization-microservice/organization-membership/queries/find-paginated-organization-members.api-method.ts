import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  FindPaginatedOrganizationMembersHttpRequest,
  FindPaginatedOrganizationMembersHttpResponse,
  findPaginatedOrganizationMembersHttpMetadata,
  findPaginatedOrganizationMembersHttpRequestSchema,
  findPaginatedOrganizationMembersHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type FindPaginatedOrganizationMembersParams = {
  request: ContextlessRequest<FindPaginatedOrganizationMembersHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function findPaginatedOrganizationMembers({
  request,
  apiConnection,
}: FindPaginatedOrganizationMembersParams): Promise<FindPaginatedOrganizationMembersHttpResponse> {
  return await authenticatedApiRequest<
    typeof findPaginatedOrganizationMembersHttpRequestSchema,
    typeof findPaginatedOrganizationMembersHttpResponseSchema
  >({
    method: findPaginatedOrganizationMembersHttpMetadata.method as HttpMethod,
    path: `${findPaginatedOrganizationMembersHttpMetadata.servicePath}`.replace(
      "{id}",
      request.pathParams.id
    ),
    request,
    inputValidationSchema: findPaginatedOrganizationMembersHttpRequestSchema,
    outputValidationSchema: findPaginatedOrganizationMembersHttpResponseSchema,
    apiConnection,
  });
}
