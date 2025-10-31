import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  FindOrganizationMembersCountHttpRequest,
  FindOrganizationMembersCountHttpResponse,
  findOrganizationMembersCountHttpMetadata,
  findOrganizationMembersCountHttpRequestSchema,
  findOrganizationMembersCountHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type FindOrganizationMembersCountParams = {
  request: ContextlessRequest<FindOrganizationMembersCountHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function findOrganizationMembersCount({
  request,
  apiConnection,
}: FindOrganizationMembersCountParams): Promise<FindOrganizationMembersCountHttpResponse> {
  return await authenticatedApiRequest<
    typeof findOrganizationMembersCountHttpRequestSchema,
    typeof findOrganizationMembersCountHttpResponseSchema
  >({
    method: findOrganizationMembersCountHttpMetadata.method as HttpMethod,
    path: `${findOrganizationMembersCountHttpMetadata.servicePath}`.replace(
      "{id}",
      request.pathParams.id
    ),
    request,
    inputValidationSchema: findOrganizationMembersCountHttpRequestSchema,
    outputValidationSchema: findOrganizationMembersCountHttpResponseSchema,
    apiConnection,
  });
}

