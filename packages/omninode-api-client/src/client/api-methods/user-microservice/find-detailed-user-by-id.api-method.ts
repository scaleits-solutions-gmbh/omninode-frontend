import type { AuthenticatedApiMethodInput } from "@/schemas/authenticated-api-method-input.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/api-request";
import {
  FindDetailedUserByIdHttpRequest,
  FindDetailedUserByIdHttpResponse,
  findDetailedUserByIdHttpMetadata,
  findDetailedUserByIdHttpRequestSchema,
  findDetailedUserByIdHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { FlatObject } from "@/types/flat-object.type";
import { ContextlessRequest } from "@/types/contextless-request.type";

export type FindDetailedUserByIdParams = AuthenticatedApiMethodInput<
  FlatObject<ContextlessRequest<FindDetailedUserByIdHttpRequest>>
>;

export async function findDetailedUserById({
  input,
  apiConnection,
}: FindDetailedUserByIdParams): Promise<FindDetailedUserByIdHttpResponse> {
  const request: ContextlessRequest<FindDetailedUserByIdHttpRequest> = {
    pathParams: {
      id: input.id,
    },
  };
  const path = findDetailedUserByIdHttpMetadata.path.replace(
    "{id}",
    encodeURIComponent(request.pathParams.id)
  );
  return await authenticatedApiRequest<
    typeof findDetailedUserByIdHttpRequestSchema,
    typeof findDetailedUserByIdHttpResponseSchema
  >({
    method: findDetailedUserByIdHttpMetadata.method as HttpMethod,
    path,
    request,
    inputValidationSchema: findDetailedUserByIdHttpRequestSchema,
    outputValidationSchema: findDetailedUserByIdHttpResponseSchema,
    apiConnection,
  });
}
