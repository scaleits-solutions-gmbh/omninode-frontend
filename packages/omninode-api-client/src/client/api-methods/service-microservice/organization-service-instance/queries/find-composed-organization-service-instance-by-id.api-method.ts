import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  FindComposedOrganizationServiceInstanceByIdHttpRequest,
  FindComposedOrganizationServiceInstanceByIdHttpResponse,
  findComposedOrganizationServiceInstanceByIdHttpMetadata,
  findComposedOrganizationServiceInstanceByIdHttpRequestSchema,
  findComposedOrganizationServiceInstanceByIdHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type FindComposedOrganizationServiceInstanceByIdParams = {
  request: ContextlessRequest<FindComposedOrganizationServiceInstanceByIdHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function findComposedOrganizationServiceInstanceById({
  request,
  apiConnection,
}: FindComposedOrganizationServiceInstanceByIdParams): Promise<FindComposedOrganizationServiceInstanceByIdHttpResponse> {
  return await authenticatedApiRequest<
    typeof findComposedOrganizationServiceInstanceByIdHttpRequestSchema,
    typeof findComposedOrganizationServiceInstanceByIdHttpResponseSchema
  >({
    method: findComposedOrganizationServiceInstanceByIdHttpMetadata.method as HttpMethod,
    path: `${findComposedOrganizationServiceInstanceByIdHttpMetadata.servicePath}`.replace(
      "{id}",
      request.pathParams.id
    ),
    request,
    inputValidationSchema: findComposedOrganizationServiceInstanceByIdHttpRequestSchema,
    outputValidationSchema: findComposedOrganizationServiceInstanceByIdHttpResponseSchema,
    apiConnection,
  });
}

