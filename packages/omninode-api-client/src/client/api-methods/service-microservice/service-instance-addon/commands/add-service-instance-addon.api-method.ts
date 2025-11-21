import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  AddServiceInstanceAddonHttpRequest,
  AddServiceInstanceAddonHttpResponse,
  addServiceInstanceAddonHttpMetadata,
  addServiceInstanceAddonHttpRequestSchema,
  addServiceInstanceAddonHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type AddServiceInstanceAddonParams = {
  request: ContextlessRequest<AddServiceInstanceAddonHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function addServiceInstanceAddon({
  request,
  apiConnection,
}: AddServiceInstanceAddonParams): Promise<AddServiceInstanceAddonHttpResponse> {
  return await authenticatedApiRequest<
    typeof addServiceInstanceAddonHttpRequestSchema,
    typeof addServiceInstanceAddonHttpResponseSchema
  >({
    method: addServiceInstanceAddonHttpMetadata.method as HttpMethod,
    path: `${addServiceInstanceAddonHttpMetadata.servicePath}`,
    request,
    inputValidationSchema: addServiceInstanceAddonHttpRequestSchema,
    outputValidationSchema: addServiceInstanceAddonHttpResponseSchema,
    apiConnection,
  });
}

