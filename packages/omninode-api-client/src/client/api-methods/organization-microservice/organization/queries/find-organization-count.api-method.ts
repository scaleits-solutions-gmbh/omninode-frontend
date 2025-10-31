import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  FindOrganizationCountHttpRequest,
  FindOrganizationCountHttpResponse,
  findOrganizationCountHttpMetadata,
  findOrganizationCountHttpRequestSchema,
  findOrganizationCountHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type FindOrganizationCountParams = {
  request: ContextlessRequest<FindOrganizationCountHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function findOrganizationCount({
  request,
  apiConnection,
}: FindOrganizationCountParams): Promise<FindOrganizationCountHttpResponse> {
  return await authenticatedApiRequest<
    typeof findOrganizationCountHttpRequestSchema,
    typeof findOrganizationCountHttpResponseSchema
  >({
    method: findOrganizationCountHttpMetadata.method as HttpMethod,
    path: `${findOrganizationCountHttpMetadata.servicePath}`,
    request,
    inputValidationSchema: findOrganizationCountHttpRequestSchema,
    outputValidationSchema: findOrganizationCountHttpResponseSchema,
    apiConnection,
  });
}

