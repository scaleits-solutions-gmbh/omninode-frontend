import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  GrantServiceViewToOrganizationMembershipHttpRequest,
  GrantServiceViewToOrganizationMembershipHttpResponse,
  grantServiceViewToOrganizationMembershipHttpMetadata,
  grantServiceViewToOrganizationMembershipHttpRequestSchema,
  grantServiceViewToOrganizationMembershipHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type GrantServiceViewToOrganizationMembershipParams = {
  request: ContextlessRequest<GrantServiceViewToOrganizationMembershipHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function grantServiceViewToOrganizationMembership({
  request,
  apiConnection,
}: GrantServiceViewToOrganizationMembershipParams): Promise<GrantServiceViewToOrganizationMembershipHttpResponse> {
  return await authenticatedApiRequest<
    typeof grantServiceViewToOrganizationMembershipHttpRequestSchema,
    typeof grantServiceViewToOrganizationMembershipHttpResponseSchema
  >({
    method: grantServiceViewToOrganizationMembershipHttpMetadata.method as HttpMethod,
    path: `${grantServiceViewToOrganizationMembershipHttpMetadata.servicePath}`,
    request,
    inputValidationSchema: grantServiceViewToOrganizationMembershipHttpRequestSchema,
    outputValidationSchema: grantServiceViewToOrganizationMembershipHttpResponseSchema,
    apiConnection,
  });
}

