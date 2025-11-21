import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  RevokeServiceViewFromOrganizationRelationshipHttpRequest,
  RevokeServiceViewFromOrganizationRelationshipHttpResponse,
  revokeServiceViewFromOrganizationRelationshipHttpMetadata,
  revokeServiceViewFromOrganizationRelationshipHttpRequestSchema,
  revokeServiceViewFromOrganizationRelationshipHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type RevokeServiceViewFromOrganizationRelationshipParams = {
  request: ContextlessRequest<RevokeServiceViewFromOrganizationRelationshipHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function revokeServiceViewFromOrganizationRelationship({
  request,
  apiConnection,
}: RevokeServiceViewFromOrganizationRelationshipParams): Promise<RevokeServiceViewFromOrganizationRelationshipHttpResponse> {
  return await authenticatedApiRequest<
    typeof revokeServiceViewFromOrganizationRelationshipHttpRequestSchema,
    typeof revokeServiceViewFromOrganizationRelationshipHttpResponseSchema
  >({
    method: revokeServiceViewFromOrganizationRelationshipHttpMetadata.method as HttpMethod,
    path: `${revokeServiceViewFromOrganizationRelationshipHttpMetadata.servicePath}`,
    request,
    inputValidationSchema: revokeServiceViewFromOrganizationRelationshipHttpRequestSchema,
    outputValidationSchema: revokeServiceViewFromOrganizationRelationshipHttpResponseSchema,
    apiConnection,
  });
}

