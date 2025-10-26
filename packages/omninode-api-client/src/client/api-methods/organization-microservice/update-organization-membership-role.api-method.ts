import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  UpdateOrganizationMembershipRoleHttpRequest,
  UpdateOrganizationMembershipRoleHttpResponse,
  updateOrganizationMembershipRoleHttpMetadata,
  updateOrganizationMembershipRoleHttpRequestSchema,
  updateOrganizationMembershipRoleHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type UpdateOrganizationMembershipRoleParams = {
  request: ContextlessRequest<UpdateOrganizationMembershipRoleHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function updateOrganizationMembershipRole({
  request,
  apiConnection,
}: UpdateOrganizationMembershipRoleParams): Promise<UpdateOrganizationMembershipRoleHttpResponse> {
  return await authenticatedApiRequest<
    typeof updateOrganizationMembershipRoleHttpRequestSchema,
    typeof updateOrganizationMembershipRoleHttpResponseSchema
  >({
    method: updateOrganizationMembershipRoleHttpMetadata.method as HttpMethod,
    path: `${updateOrganizationMembershipRoleHttpMetadata.path}`.replace("{id}", request.pathParams?.id),
    request,
    inputValidationSchema: updateOrganizationMembershipRoleHttpRequestSchema,
    outputValidationSchema: updateOrganizationMembershipRoleHttpResponseSchema,
    apiConnection,
  });
}


