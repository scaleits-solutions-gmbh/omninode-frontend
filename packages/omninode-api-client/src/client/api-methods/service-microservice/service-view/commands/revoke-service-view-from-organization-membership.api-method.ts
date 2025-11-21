import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  RevokeServiceViewFromOrganizationMembershipHttpRequest,
  RevokeServiceViewFromOrganizationMembershipHttpResponse,
  revokeServiceViewFromOrganizationMembershipHttpMetadata,
  revokeServiceViewFromOrganizationMembershipHttpRequestSchema,
  revokeServiceViewFromOrganizationMembershipHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type RevokeServiceViewFromOrganizationMembershipParams = {
  request: ContextlessRequest<RevokeServiceViewFromOrganizationMembershipHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function revokeServiceViewFromOrganizationMembership({
  request,
  apiConnection,
}: RevokeServiceViewFromOrganizationMembershipParams): Promise<RevokeServiceViewFromOrganizationMembershipHttpResponse> {
  return await authenticatedApiRequest<
    typeof revokeServiceViewFromOrganizationMembershipHttpRequestSchema,
    typeof revokeServiceViewFromOrganizationMembershipHttpResponseSchema
  >({
    method: revokeServiceViewFromOrganizationMembershipHttpMetadata.method as HttpMethod,
    path: `${revokeServiceViewFromOrganizationMembershipHttpMetadata.servicePath}`,
    request,
    inputValidationSchema: revokeServiceViewFromOrganizationMembershipHttpRequestSchema,
    outputValidationSchema: revokeServiceViewFromOrganizationMembershipHttpResponseSchema,
    apiConnection,
  });
}

