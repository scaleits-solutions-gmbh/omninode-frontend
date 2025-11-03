import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  FindCurrentUserActionableOrganizationMembershipInvitesHttpRequest,
  FindCurrentUserActionableOrganizationMembershipInvitesHttpResponse,
  findCurrentUserActionableOrganizationMembershipInvitesHttpMetadata,
  findCurrentUserActionableOrganizationMembershipInvitesHttpRequestSchema,
  findCurrentUserActionableOrganizationMembershipInvitesHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type FindCurrentUserActionableOrganizationMembershipInvitesParams = {
  request: ContextlessRequest<FindCurrentUserActionableOrganizationMembershipInvitesHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function findCurrentUserActionableOrganizationMembershipInvites({
  request,
  apiConnection,
}: FindCurrentUserActionableOrganizationMembershipInvitesParams): Promise<FindCurrentUserActionableOrganizationMembershipInvitesHttpResponse> {
  return await authenticatedApiRequest<
    typeof findCurrentUserActionableOrganizationMembershipInvitesHttpRequestSchema,
    typeof findCurrentUserActionableOrganizationMembershipInvitesHttpResponseSchema
  >({
    method: findCurrentUserActionableOrganizationMembershipInvitesHttpMetadata.method as HttpMethod,
    path: `${findCurrentUserActionableOrganizationMembershipInvitesHttpMetadata.servicePath}`,
    request,
    inputValidationSchema: findCurrentUserActionableOrganizationMembershipInvitesHttpRequestSchema,
    outputValidationSchema: findCurrentUserActionableOrganizationMembershipInvitesHttpResponseSchema,
    apiConnection,
  });
}

