import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  ChangeOrganizationStatusHttpRequest,
  ChangeOrganizationStatusHttpResponse,
  changeOrganizationStatusHttpMetadata,
  changeOrganizationStatusHttpRequestSchema,
  changeOrganizationStatusHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type ChangeOrganizationStatusParams = {
  request: ContextlessRequest<ChangeOrganizationStatusHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function changeOrganizationStatus({
  request,
  apiConnection,
}: ChangeOrganizationStatusParams): Promise<ChangeOrganizationStatusHttpResponse> {
  return await authenticatedApiRequest<
    typeof changeOrganizationStatusHttpRequestSchema,
    typeof changeOrganizationStatusHttpResponseSchema
  >({
    method: changeOrganizationStatusHttpMetadata.method as HttpMethod,
    path: `${changeOrganizationStatusHttpMetadata.servicePath}`.replace(
      "{id}",
      request.pathParams.id
    ),
    request,
    inputValidationSchema: changeOrganizationStatusHttpRequestSchema,
    outputValidationSchema: changeOrganizationStatusHttpResponseSchema,
    apiConnection,
  });
}
