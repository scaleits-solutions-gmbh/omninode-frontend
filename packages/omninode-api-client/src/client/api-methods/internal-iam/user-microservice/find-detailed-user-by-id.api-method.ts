import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import {
  FindDetailedUserByIdHttpRequest,
  FindDetailedUserByIdHttpResponse,
  findDetailedUserByIdHttpMetadata,
  findDetailedUserByIdHttpRequestSchema,
  findDetailedUserByIdHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { FlatObject } from "@/types/flat-object.type";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";

export type FindDetailedUserByIdParams = {
  request: ContextlessRequest<FindDetailedUserByIdHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function findDetailedUserById({
  request,
  apiConnection,
}: FindDetailedUserByIdParams): Promise<FindDetailedUserByIdHttpResponse> {
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
