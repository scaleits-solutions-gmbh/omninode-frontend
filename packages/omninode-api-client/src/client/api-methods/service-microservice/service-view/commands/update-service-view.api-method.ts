import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  UpdateServiceViewHttpRequest,
  UpdateServiceViewHttpResponse,
  updateServiceViewHttpMetadata,
  updateServiceViewHttpRequestSchema,
  updateServiceViewHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type UpdateServiceViewParams = {
  request: ContextlessRequest<UpdateServiceViewHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function updateServiceView({
  request,
  apiConnection,
}: UpdateServiceViewParams): Promise<UpdateServiceViewHttpResponse> {
  return await authenticatedApiRequest<
    typeof updateServiceViewHttpRequestSchema,
    typeof updateServiceViewHttpResponseSchema
  >({
    method: updateServiceViewHttpMetadata.method as HttpMethod,
    path: `${updateServiceViewHttpMetadata.servicePath}`,
    request,
    inputValidationSchema: updateServiceViewHttpRequestSchema,
    outputValidationSchema: updateServiceViewHttpResponseSchema,
    apiConnection,
  });
}

