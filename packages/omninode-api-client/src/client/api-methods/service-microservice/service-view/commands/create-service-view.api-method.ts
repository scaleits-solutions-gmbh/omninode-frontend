import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  CreateServiceViewHttpRequest,
  CreateServiceViewHttpResponse,
  createServiceViewHttpMetadata,
  createServiceViewHttpRequestSchema,
  createServiceViewHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type CreateServiceViewParams = {
  request: ContextlessRequest<CreateServiceViewHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function createServiceView({
  request,
  apiConnection,
}: CreateServiceViewParams): Promise<CreateServiceViewHttpResponse> {
  return await authenticatedApiRequest<
    typeof createServiceViewHttpRequestSchema,
    typeof createServiceViewHttpResponseSchema
  >({
    method: createServiceViewHttpMetadata.method as HttpMethod,
    path: `${createServiceViewHttpMetadata.servicePath}`,
    request,
    inputValidationSchema: createServiceViewHttpRequestSchema,
    outputValidationSchema: createServiceViewHttpResponseSchema,
    apiConnection,
  });
}

