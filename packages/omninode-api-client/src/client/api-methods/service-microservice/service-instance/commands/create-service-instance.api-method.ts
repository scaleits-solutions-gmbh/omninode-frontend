import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  CreateServiceInstanceHttpRequest,
  CreateServiceInstanceHttpResponse,
  createServiceInstanceHttpMetadata,
  createServiceInstanceHttpRequestSchema,
  createServiceInstanceHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type CreateServiceInstanceParams = {
  request: ContextlessRequest<CreateServiceInstanceHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function createServiceInstance({
  request,
  apiConnection,
}: CreateServiceInstanceParams): Promise<CreateServiceInstanceHttpResponse> {
  return await authenticatedApiRequest<
    typeof createServiceInstanceHttpRequestSchema,
    typeof createServiceInstanceHttpResponseSchema
  >({
    method: createServiceInstanceHttpMetadata.method as HttpMethod,
    path: `${createServiceInstanceHttpMetadata.servicePath}`,
    request,
    inputValidationSchema: createServiceInstanceHttpRequestSchema,
    outputValidationSchema: createServiceInstanceHttpResponseSchema,
    apiConnection,
  });
}

