import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  FindPaginatedOrganizationRelationshipInvitesHttpRequest,
  FindPaginatedOrganizationRelationshipInvitesHttpResponse,
  findPaginatedOrganizationRelationshipInvitesHttpMetadata,
  findPaginatedOrganizationRelationshipInvitesHttpRequestSchema,
  findPaginatedOrganizationRelationshipInvitesHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type FindPaginatedOrganizationRelationshipInvitesParams = {
  request: ContextlessRequest<FindPaginatedOrganizationRelationshipInvitesHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function findPaginatedOrganizationRelationshipInvites({
  request,
  apiConnection,
}: FindPaginatedOrganizationRelationshipInvitesParams): Promise<FindPaginatedOrganizationRelationshipInvitesHttpResponse> {
  return await authenticatedApiRequest<
    typeof findPaginatedOrganizationRelationshipInvitesHttpRequestSchema,
    typeof findPaginatedOrganizationRelationshipInvitesHttpResponseSchema
  >({
    method: findPaginatedOrganizationRelationshipInvitesHttpMetadata.method as HttpMethod,
    path: `${findPaginatedOrganizationRelationshipInvitesHttpMetadata.servicePath}`.replace(
      "{id}",
      request.pathParams.id
    ),
    request,
    inputValidationSchema: findPaginatedOrganizationRelationshipInvitesHttpRequestSchema,
    outputValidationSchema: findPaginatedOrganizationRelationshipInvitesHttpResponseSchema,
    apiConnection,
  });
}

