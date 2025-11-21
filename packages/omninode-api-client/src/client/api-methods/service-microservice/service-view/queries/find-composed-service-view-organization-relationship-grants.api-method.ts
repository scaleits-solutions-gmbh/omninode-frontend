import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  FindComposedServiceViewOrganizationRelationshipGrantsHttpRequest,
  FindComposedServiceViewOrganizationRelationshipGrantsHttpResponse,
  findComposedServiceViewOrganizationRelationshipGrantsHttpMetadata,
  findComposedServiceViewOrganizationRelationshipGrantsHttpRequestSchema,
  findComposedServiceViewOrganizationRelationshipGrantsHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type FindComposedServiceViewOrganizationRelationshipGrantsParams = {
  request: ContextlessRequest<FindComposedServiceViewOrganizationRelationshipGrantsHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function findComposedServiceViewOrganizationRelationshipGrants({
  request,
  apiConnection,
}: FindComposedServiceViewOrganizationRelationshipGrantsParams): Promise<FindComposedServiceViewOrganizationRelationshipGrantsHttpResponse> {
  return await authenticatedApiRequest<
    typeof findComposedServiceViewOrganizationRelationshipGrantsHttpRequestSchema,
    typeof findComposedServiceViewOrganizationRelationshipGrantsHttpResponseSchema
  >({
    method:
      findComposedServiceViewOrganizationRelationshipGrantsHttpMetadata.method as HttpMethod,
    path: `${findComposedServiceViewOrganizationRelationshipGrantsHttpMetadata.servicePath}`.replace(
      "{id}",
      request.pathParams.id
    ),
    request,
    inputValidationSchema:
      findComposedServiceViewOrganizationRelationshipGrantsHttpRequestSchema,
    outputValidationSchema:
      findComposedServiceViewOrganizationRelationshipGrantsHttpResponseSchema,
    apiConnection,
  });
}


