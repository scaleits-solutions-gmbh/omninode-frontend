import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import {
  FindUserCountHttpRequest,
  FindUserCountHttpResponse,
  findUserCountHttpMetadata,
  findUserCountHttpRequestSchema,
  findUserCountHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";

export type FindUserCountParams = {
  request: ContextlessRequest<FindUserCountHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export type FindUserCountResponse = FindUserCountHttpResponse;

export async function findUserCount({
  request,
  apiConnection,
}: FindUserCountParams): Promise<FindUserCountHttpResponse> {
  return await authenticatedApiRequest<
    typeof findUserCountHttpRequestSchema,
    typeof findUserCountHttpResponseSchema
  >({
    method: findUserCountHttpMetadata.method as HttpMethod,
    path: `${findUserCountHttpMetadata.path}`,
    request,
    inputValidationSchema: findUserCountHttpRequestSchema,
    outputValidationSchema: findUserCountHttpResponseSchema,
    apiConnection,
  });
}
