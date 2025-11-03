import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  CreateOrganizationHttpRequest,
  CreateOrganizationHttpResponse,
  createOrganizationHttpMetadata,
  createOrganizationHttpRequestSchema,
  createOrganizationHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type CreateOrganizationParams = {
  request: ContextlessRequest<CreateOrganizationHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function createOrganization({
  request,
  apiConnection,
}: CreateOrganizationParams): Promise<CreateOrganizationHttpResponse> {
  return await authenticatedApiRequest<
    typeof createOrganizationHttpRequestSchema,
    typeof createOrganizationHttpResponseSchema
  >({
    method: createOrganizationHttpMetadata.method as HttpMethod,
    path: `${createOrganizationHttpMetadata.servicePath}`,
    request,
    inputValidationSchema: createOrganizationHttpRequestSchema,
    outputValidationSchema: createOrganizationHttpResponseSchema,
    apiConnection,
  });
}
