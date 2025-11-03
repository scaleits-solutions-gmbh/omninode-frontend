import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  FindOrganizationRelationshipInvitesCountHttpRequest,
  FindOrganizationRelationshipInvitesCountHttpResponse,
  findOrganizationRelationshipInvitesCountHttpMetadata,
  findOrganizationRelationshipInvitesCountHttpRequestSchema,
  findOrganizationRelationshipInvitesCountHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type FindOrganizationRelationshipInvitesCountParams = {
  request: ContextlessRequest<FindOrganizationRelationshipInvitesCountHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function findOrganizationRelationshipInvitesCount({
  request,
  apiConnection,
}: FindOrganizationRelationshipInvitesCountParams): Promise<FindOrganizationRelationshipInvitesCountHttpResponse> {
  return await authenticatedApiRequest<
    typeof findOrganizationRelationshipInvitesCountHttpRequestSchema,
    typeof findOrganizationRelationshipInvitesCountHttpResponseSchema
  >({
    method: findOrganizationRelationshipInvitesCountHttpMetadata.method as HttpMethod,
    path: `${findOrganizationRelationshipInvitesCountHttpMetadata.servicePath}`.replace(
      "{id}",
      request.pathParams.id
    ),
    request,
    inputValidationSchema: findOrganizationRelationshipInvitesCountHttpRequestSchema,
    outputValidationSchema: findOrganizationRelationshipInvitesCountHttpResponseSchema,
    apiConnection,
  });
}

