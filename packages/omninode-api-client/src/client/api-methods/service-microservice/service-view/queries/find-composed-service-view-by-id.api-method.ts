import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  FindComposedServiceViewByIdHttpRequest,
  FindComposedServiceViewByIdHttpResponse,
  findComposedServiceViewByIdHttpMetadata,
  findComposedServiceViewByIdHttpRequestSchema,
  findComposedServiceViewByIdHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type FindComposedServiceViewByIdParams = {
  request: ContextlessRequest<FindComposedServiceViewByIdHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function findComposedServiceViewById({
  request,
  apiConnection,
}: FindComposedServiceViewByIdParams): Promise<FindComposedServiceViewByIdHttpResponse> {
  return await authenticatedApiRequest<
    typeof findComposedServiceViewByIdHttpRequestSchema,
    typeof findComposedServiceViewByIdHttpResponseSchema
  >({
    method: findComposedServiceViewByIdHttpMetadata.method as HttpMethod,
    path: `${findComposedServiceViewByIdHttpMetadata.servicePath}`.replace(
      "{id}",
      request.pathParams.id
    ),
    request,
    inputValidationSchema: findComposedServiceViewByIdHttpRequestSchema,
    outputValidationSchema: findComposedServiceViewByIdHttpResponseSchema,
    apiConnection,
  });
}

