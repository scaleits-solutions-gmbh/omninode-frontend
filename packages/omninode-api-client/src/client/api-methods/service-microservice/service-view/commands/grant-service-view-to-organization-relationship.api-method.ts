import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  GrantServiceViewToOrganizationRelationshipHttpRequest,
  GrantServiceViewToOrganizationRelationshipHttpResponse,
  grantServiceViewToOrganizationRelationshipHttpMetadata,
  grantServiceViewToOrganizationRelationshipHttpRequestSchema,
  grantServiceViewToOrganizationRelationshipHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type GrantServiceViewToOrganizationRelationshipParams = {
  request: ContextlessRequest<GrantServiceViewToOrganizationRelationshipHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function grantServiceViewToOrganizationRelationship({
  request,
  apiConnection,
}: GrantServiceViewToOrganizationRelationshipParams): Promise<GrantServiceViewToOrganizationRelationshipHttpResponse> {
  return await authenticatedApiRequest<
    typeof grantServiceViewToOrganizationRelationshipHttpRequestSchema,
    typeof grantServiceViewToOrganizationRelationshipHttpResponseSchema
  >({
    method: grantServiceViewToOrganizationRelationshipHttpMetadata.method as HttpMethod,
    path: `${grantServiceViewToOrganizationRelationshipHttpMetadata.servicePath}`,
    request,
    inputValidationSchema: grantServiceViewToOrganizationRelationshipHttpRequestSchema,
    outputValidationSchema: grantServiceViewToOrganizationRelationshipHttpResponseSchema,
    apiConnection,
  });
}

