import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  RemoveOrganizationRelationshipHttpRequest,
  RemoveOrganizationRelationshipHttpResponse,
  removeOrganizationRelationshipHttpMetadata,
  removeOrganizationRelationshipHttpRequestSchema,
  removeOrganizationRelationshipHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type RemoveOrganizationRelationshipParams = {
  request: ContextlessRequest<RemoveOrganizationRelationshipHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function removeOrganizationRelationship({
  request,
  apiConnection,
}: RemoveOrganizationRelationshipParams): Promise<RemoveOrganizationRelationshipHttpResponse> {
  return await authenticatedApiRequest<
    typeof removeOrganizationRelationshipHttpRequestSchema,
    typeof removeOrganizationRelationshipHttpResponseSchema
  >({
    method: removeOrganizationRelationshipHttpMetadata.method as HttpMethod,
    path: `${removeOrganizationRelationshipHttpMetadata.servicePath}`.replace(
      "{id}",
      request.pathParams.id
    ),
    request,
    inputValidationSchema: removeOrganizationRelationshipHttpRequestSchema,
    outputValidationSchema: removeOrganizationRelationshipHttpResponseSchema,
    apiConnection,
  });
}

