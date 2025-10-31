import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  FindOrganizationRelationshipsCountHttpRequest,
  FindOrganizationRelationshipsCountHttpResponse,
  findOrganizationRelationshipsCountHttpMetadata,
  findOrganizationRelationshipsCountHttpRequestSchema,
  findOrganizationRelationshipsCountHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type FindOrganizationRelationshipsCountParams = {
  request: ContextlessRequest<FindOrganizationRelationshipsCountHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function findOrganizationRelationshipsCount({
  request,
  apiConnection,
}: FindOrganizationRelationshipsCountParams): Promise<FindOrganizationRelationshipsCountHttpResponse> {
  return await authenticatedApiRequest<
    typeof findOrganizationRelationshipsCountHttpRequestSchema,
    typeof findOrganizationRelationshipsCountHttpResponseSchema
  >({
    method: findOrganizationRelationshipsCountHttpMetadata.method as HttpMethod,
    path: `${findOrganizationRelationshipsCountHttpMetadata.servicePath}`.replace(
      "{id}",
      request.pathParams.id
    ),
    request,
    inputValidationSchema: findOrganizationRelationshipsCountHttpRequestSchema,
    outputValidationSchema: findOrganizationRelationshipsCountHttpResponseSchema,
    apiConnection,
  });
}

