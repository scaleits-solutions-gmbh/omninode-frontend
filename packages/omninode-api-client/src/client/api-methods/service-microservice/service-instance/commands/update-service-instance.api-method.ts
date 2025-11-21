import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  UpdateServiceInstanceHttpRequest,
  UpdateServiceInstanceHttpResponse,
  updateServiceInstanceHttpMetadata,
  updateServiceInstanceHttpRequestSchema,
  updateServiceInstanceHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type UpdateServiceInstanceParams = {
  request: ContextlessRequest<UpdateServiceInstanceHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function updateServiceInstance({
  request,
  apiConnection,
}: UpdateServiceInstanceParams): Promise<UpdateServiceInstanceHttpResponse> {
  return await authenticatedApiRequest<
    typeof updateServiceInstanceHttpRequestSchema,
    typeof updateServiceInstanceHttpResponseSchema
  >({
    method: updateServiceInstanceHttpMetadata.method as HttpMethod,
    path: `${updateServiceInstanceHttpMetadata.servicePath}`,
    request,
    inputValidationSchema: updateServiceInstanceHttpRequestSchema,
    outputValidationSchema: updateServiceInstanceHttpResponseSchema,
    apiConnection,
  });
}

