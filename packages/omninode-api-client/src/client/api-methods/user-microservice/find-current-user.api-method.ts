import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/api-request";
import {
  FindCurrentUserHttpResponse,
  findCurrentUserHttpMetadata,
  findCurrentUserHttpRequestSchema,
  findCurrentUserHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export async function findCurrentUser({
  apiConnection,
}: {
  apiConnection: AuthenticatedApiConnection;
}): Promise<FindCurrentUserHttpResponse> {
  return await authenticatedApiRequest<
    typeof findCurrentUserHttpRequestSchema,
    typeof findCurrentUserHttpResponseSchema
  >({
    method: findCurrentUserHttpMetadata.method as HttpMethod,
    path: `${findCurrentUserHttpMetadata.path}`,
    outputValidationSchema: findCurrentUserHttpResponseSchema,
    apiConnection,
  });
}
