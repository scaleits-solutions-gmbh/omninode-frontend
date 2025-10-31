import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  UpdateOrganizationCoreInfoHttpRequest,
  UpdateOrganizationCoreInfoHttpResponse,
  updateOrganizationCoreInfoHttpMetadata,
  updateOrganizationCoreInfoHttpRequestSchema,
  updateOrganizationCoreInfoHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type UpdateOrganizationCoreInfoParams = {
  request: ContextlessRequest<UpdateOrganizationCoreInfoHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function updateOrganizationCoreInfo({
  request,
  apiConnection,
}: UpdateOrganizationCoreInfoParams): Promise<UpdateOrganizationCoreInfoHttpResponse> {
  return await authenticatedApiRequest<
    typeof updateOrganizationCoreInfoHttpRequestSchema,
    typeof updateOrganizationCoreInfoHttpResponseSchema
  >({
    method: updateOrganizationCoreInfoHttpMetadata.method as HttpMethod,
    path: `${updateOrganizationCoreInfoHttpMetadata.servicePath}`.replace(
      "{id}",
      request.pathParams.id
    ),
    request,
    inputValidationSchema: updateOrganizationCoreInfoHttpRequestSchema,
    outputValidationSchema: updateOrganizationCoreInfoHttpResponseSchema,
    apiConnection,
  });
}
