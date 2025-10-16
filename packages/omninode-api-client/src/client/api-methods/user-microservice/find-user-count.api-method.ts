import type { AuthenticatedApiMethodInput } from "@/schemas/authenticated-api-method-input.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/api-request";
import {
  FindUserCountHttpRequest,
  FindUserCountHttpResponse,
  findUserCountHttpMetadata,
  findUserCountHttpRequestSchema,
  findUserCountHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { FlatObject } from "@/types/flat-object.type";
import { ContextlessRequest } from "@/types/contextless-request.type";

export type FindUserCountParams = AuthenticatedApiMethodInput<
  FlatObject<ContextlessRequest<FindUserCountHttpRequest>>
>;

export type FindUserCountResponse = FindUserCountHttpResponse;

export async function findUserCount({
  input,
  apiConnection,
}: FindUserCountParams): Promise<FindUserCountHttpResponse> {
  const request: ContextlessRequest<FindUserCountHttpRequest> = {
    queryParams: {
      searchTerm: input.searchTerm,
    },
  };
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
