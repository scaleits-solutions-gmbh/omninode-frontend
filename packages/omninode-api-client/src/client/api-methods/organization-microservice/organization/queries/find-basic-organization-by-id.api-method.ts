import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  FindBasicOrganizationByIdHttpRequest,
  FindBasicOrganizationByIdHttpResponse,
  findBasicOrganizationByIdHttpMetadata,
  findBasicOrganizationByIdHttpRequestSchema,
  findBasicOrganizationByIdHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type FindBasicOrganizationByIdParams = {
  request: ContextlessRequest<FindBasicOrganizationByIdHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function findBasicOrganizationById({
  request,
  apiConnection,
}: FindBasicOrganizationByIdParams): Promise<FindBasicOrganizationByIdHttpResponse> {
  return await authenticatedApiRequest<
    typeof findBasicOrganizationByIdHttpRequestSchema,
    typeof findBasicOrganizationByIdHttpResponseSchema
  >({
    method: findBasicOrganizationByIdHttpMetadata.method as HttpMethod,
    path: `${findBasicOrganizationByIdHttpMetadata.servicePath}`.replace(
      "{id}",
      request.pathParams.id
    ),
    request,
    inputValidationSchema: findBasicOrganizationByIdHttpRequestSchema,
    outputValidationSchema: findBasicOrganizationByIdHttpResponseSchema,
    apiConnection,
  });
}
