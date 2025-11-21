import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  RemoveServiceInstanceAddonHttpRequest,
  RemoveServiceInstanceAddonHttpResponse,
  removeServiceInstanceAddonHttpMetadata,
  removeServiceInstanceAddonHttpRequestSchema,
  removeServiceInstanceAddonHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type RemoveServiceInstanceAddonParams = {
  request: ContextlessRequest<RemoveServiceInstanceAddonHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function removeServiceInstanceAddon({
  request,
  apiConnection,
}: RemoveServiceInstanceAddonParams): Promise<RemoveServiceInstanceAddonHttpResponse> {
  return await authenticatedApiRequest<
    typeof removeServiceInstanceAddonHttpRequestSchema,
    typeof removeServiceInstanceAddonHttpResponseSchema
  >({
    method: removeServiceInstanceAddonHttpMetadata.method as HttpMethod,
    path: `${removeServiceInstanceAddonHttpMetadata.servicePath}`,
    request,
    inputValidationSchema: removeServiceInstanceAddonHttpRequestSchema,
    outputValidationSchema: removeServiceInstanceAddonHttpResponseSchema,
    apiConnection,
  });
}

