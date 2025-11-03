import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  FindOrganizationMembershipInvitesCountHttpRequest,
  FindOrganizationMembershipInvitesCountHttpResponse,
  findOrganizationMembershipInvitesCountHttpMetadata,
  findOrganizationMembershipInvitesCountHttpRequestSchema,
  findOrganizationMembershipInvitesCountHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type FindOrganizationMembershipInvitesCountParams = {
  request: ContextlessRequest<FindOrganizationMembershipInvitesCountHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function findOrganizationMembershipInvitesCount({
  request,
  apiConnection,
}: FindOrganizationMembershipInvitesCountParams): Promise<FindOrganizationMembershipInvitesCountHttpResponse> {
  return await authenticatedApiRequest<
    typeof findOrganizationMembershipInvitesCountHttpRequestSchema,
    typeof findOrganizationMembershipInvitesCountHttpResponseSchema
  >({
    method: findOrganizationMembershipInvitesCountHttpMetadata.method as HttpMethod,
    path: `${findOrganizationMembershipInvitesCountHttpMetadata.servicePath}`.replace(
      "{id}",
      request.pathParams.id
    ),
    request,
    inputValidationSchema: findOrganizationMembershipInvitesCountHttpRequestSchema,
    outputValidationSchema: findOrganizationMembershipInvitesCountHttpResponseSchema,
    apiConnection,
  });
}

