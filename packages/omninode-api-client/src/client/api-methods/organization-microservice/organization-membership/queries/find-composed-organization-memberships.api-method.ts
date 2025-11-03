import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  FindComposedOrganizationMembershipsHttpRequest,
  FindComposedOrganizationMembershipsHttpResponse,
  findComposedOrganizationMembershipsHttpMetadata,
  findComposedOrganizationMembershipsHttpRequestSchema,
  findComposedOrganizationMembershipsHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type FindComposedOrganizationMembershipsParams = {
  request: ContextlessRequest<FindComposedOrganizationMembershipsHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function findComposedOrganizationMemberships({
  request,
  apiConnection,
}: FindComposedOrganizationMembershipsParams): Promise<FindComposedOrganizationMembershipsHttpResponse> {
  return await authenticatedApiRequest<
    typeof findComposedOrganizationMembershipsHttpRequestSchema,
    typeof findComposedOrganizationMembershipsHttpResponseSchema
  >({
    method: findComposedOrganizationMembershipsHttpMetadata.method as HttpMethod,
    path: `${findComposedOrganizationMembershipsHttpMetadata.servicePath}`.replace(
      "{id}",
      request.pathParams.id
    ),
    request,
    inputValidationSchema: findComposedOrganizationMembershipsHttpRequestSchema,
    outputValidationSchema: findComposedOrganizationMembershipsHttpResponseSchema,
    apiConnection,
  });
}

