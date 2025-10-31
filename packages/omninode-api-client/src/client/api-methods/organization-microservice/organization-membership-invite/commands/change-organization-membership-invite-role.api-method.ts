import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  ChangeOrganizationMembershipInviteRoleHttpRequest,
  ChangeOrganizationMembershipInviteRoleHttpResponse,
  changeOrganizationMembershipInviteRoleHttpMetadata,
  changeOrganizationMembershipInviteRoleHttpRequestSchema,
  changeOrganizationMembershipInviteRoleHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type ChangeOrganizationMembershipInviteRoleParams = {
  request: ContextlessRequest<ChangeOrganizationMembershipInviteRoleHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function changeOrganizationMembershipInviteRole({
  request,
  apiConnection,
}: ChangeOrganizationMembershipInviteRoleParams): Promise<ChangeOrganizationMembershipInviteRoleHttpResponse> {
  return await authenticatedApiRequest<
    typeof changeOrganizationMembershipInviteRoleHttpRequestSchema,
    typeof changeOrganizationMembershipInviteRoleHttpResponseSchema
  >({
    method: changeOrganizationMembershipInviteRoleHttpMetadata.method as HttpMethod,
    path: `${changeOrganizationMembershipInviteRoleHttpMetadata.servicePath}`.replace(
      "{id}",
      request.pathParams.id
    ),
    request,
    inputValidationSchema: changeOrganizationMembershipInviteRoleHttpRequestSchema,
    outputValidationSchema: changeOrganizationMembershipInviteRoleHttpResponseSchema,
    apiConnection,
  });
}

