import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import {
  FindCurrentUserHttpResponse,
  findCurrentUserHttpMetadata,
  findCurrentUserHttpRequestSchema,
  findCurrentUserHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type FindCurrentUserParams = {
  apiConnection: AuthenticatedApiConnection;
};

export async function findCurrentUser({
  apiConnection,
}: FindCurrentUserParams): Promise<FindCurrentUserHttpResponse> {
  return await authenticatedApiRequest<
    typeof findCurrentUserHttpRequestSchema,
    typeof findCurrentUserHttpResponseSchema
  >({
    method: findCurrentUserHttpMetadata.method as HttpMethod,
    path: `${findCurrentUserHttpMetadata.path}`,
    inputValidationSchema: findCurrentUserHttpRequestSchema,
    outputValidationSchema: findCurrentUserHttpResponseSchema,
    apiConnection,
  });
}
