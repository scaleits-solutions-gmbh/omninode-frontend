import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  ChangeOrganizationTypeHttpRequest,
  ChangeOrganizationTypeHttpResponse,
  changeOrganizationTypeHttpMetadata,
  changeOrganizationTypeHttpRequestSchema,
  changeOrganizationTypeHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type ChangeOrganizationTypeParams = {
  request: ContextlessRequest<ChangeOrganizationTypeHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function changeOrganizationType({
  request,
  apiConnection,
}: ChangeOrganizationTypeParams): Promise<ChangeOrganizationTypeHttpResponse> {
  return await authenticatedApiRequest<
    typeof changeOrganizationTypeHttpRequestSchema,
    typeof changeOrganizationTypeHttpResponseSchema
  >({
    method: changeOrganizationTypeHttpMetadata.method as HttpMethod,
    path: `${changeOrganizationTypeHttpMetadata.servicePath}`.replace(
      "{id}",
      request.pathParams.id
    ),
    request,
    inputValidationSchema: changeOrganizationTypeHttpRequestSchema,
    outputValidationSchema: changeOrganizationTypeHttpResponseSchema,
    apiConnection,
  });
}

