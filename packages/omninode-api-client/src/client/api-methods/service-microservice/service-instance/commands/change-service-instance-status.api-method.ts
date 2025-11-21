import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  ChangeServiceInstanceStatusHttpRequest,
  ChangeServiceInstanceStatusHttpResponse,
  changeServiceInstanceStatusHttpMetadata,
  changeServiceInstanceStatusHttpRequestSchema,
  changeServiceInstanceStatusHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type ChangeServiceInstanceStatusParams = {
  request: ContextlessRequest<ChangeServiceInstanceStatusHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function changeServiceInstanceStatus({
  request,
  apiConnection,
}: ChangeServiceInstanceStatusParams): Promise<ChangeServiceInstanceStatusHttpResponse> {
  return await authenticatedApiRequest<
    typeof changeServiceInstanceStatusHttpRequestSchema,
    typeof changeServiceInstanceStatusHttpResponseSchema
  >({
    method: changeServiceInstanceStatusHttpMetadata.method as HttpMethod,
    path: `${changeServiceInstanceStatusHttpMetadata.servicePath}`,
    request,
    inputValidationSchema: changeServiceInstanceStatusHttpRequestSchema,
    outputValidationSchema: changeServiceInstanceStatusHttpResponseSchema,
    apiConnection,
  });
}

