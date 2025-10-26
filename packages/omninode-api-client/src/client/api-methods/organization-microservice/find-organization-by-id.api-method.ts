import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  FindOrganizationByIdHttpRequest,
  FindOrganizationByIdHttpResponse,
  findOrganizationByIdHttpMetadata,
  findOrganizationByIdHttpRequestSchema,
  findOrganizationByIdHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type FindOrganizationByIdParams = {
  request: ContextlessRequest<FindOrganizationByIdHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function findOrganizationById({
  request,
  apiConnection,
}: FindOrganizationByIdParams): Promise<FindOrganizationByIdHttpResponse> {
  return await authenticatedApiRequest<
    typeof findOrganizationByIdHttpRequestSchema,
    typeof findOrganizationByIdHttpResponseSchema
  >({
    method: findOrganizationByIdHttpMetadata.method as HttpMethod,
    path: `${findOrganizationByIdHttpMetadata.path}`.replace("{id}", request.pathParams.id),
    request,
    inputValidationSchema: findOrganizationByIdHttpRequestSchema,
    outputValidationSchema: findOrganizationByIdHttpResponseSchema,
    apiConnection,
  });
}


