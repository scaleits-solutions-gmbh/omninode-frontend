import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  FindPaginatedOrganizationMembershipInvitesHttpRequest,
  FindPaginatedOrganizationMembershipInvitesHttpResponse,
  findPaginatedOrganizationMembershipInvitesHttpMetadata,
  findPaginatedOrganizationMembershipInvitesHttpRequestSchema,
  findPaginatedOrganizationMembershipInvitesHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type FindPaginatedOrganizationMembershipInvitesParams = {
  request: ContextlessRequest<FindPaginatedOrganizationMembershipInvitesHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function findPaginatedOrganizationMembershipInvites({
  request,
  apiConnection,
}: FindPaginatedOrganizationMembershipInvitesParams): Promise<FindPaginatedOrganizationMembershipInvitesHttpResponse> {
  return await authenticatedApiRequest<
    typeof findPaginatedOrganizationMembershipInvitesHttpRequestSchema,
    typeof findPaginatedOrganizationMembershipInvitesHttpResponseSchema
  >({
    method: findPaginatedOrganizationMembershipInvitesHttpMetadata.method as HttpMethod,
    path: `${findPaginatedOrganizationMembershipInvitesHttpMetadata.servicePath}`.replace(
      "{id}",
      request.pathParams.id
    ),
    request,
    inputValidationSchema: findPaginatedOrganizationMembershipInvitesHttpRequestSchema,
    outputValidationSchema: findPaginatedOrganizationMembershipInvitesHttpResponseSchema,
    apiConnection,
  });
}

