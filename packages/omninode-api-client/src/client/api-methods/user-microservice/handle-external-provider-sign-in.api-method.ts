import {
  handleExternalProviderSignInHttpMetadata,
  handleExternalProviderSignInHttpResponseSchema,
  HandleExternalProviderSignInHttpResponse,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import type { HttpMethod } from "@/types/http-method.type";

export async function handleExternalProviderSignIn({
  apiConnection,
}: {
  apiConnection: AuthenticatedApiConnection;
}): Promise<HandleExternalProviderSignInHttpResponse> {
  return await authenticatedApiRequest<
    undefined,
    typeof handleExternalProviderSignInHttpResponseSchema
  >({
    method: handleExternalProviderSignInHttpMetadata.method as HttpMethod,
    path: `${handleExternalProviderSignInHttpMetadata.path}`,
    outputValidationSchema: handleExternalProviderSignInHttpResponseSchema,
    apiConnection,
  });
};