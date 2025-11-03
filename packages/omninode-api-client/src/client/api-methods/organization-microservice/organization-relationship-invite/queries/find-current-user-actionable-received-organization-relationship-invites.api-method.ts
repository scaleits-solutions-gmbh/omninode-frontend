import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  FindCurrentUserActionableReceivedOrganizationRelationshipInvitesHttpRequest,
  FindCurrentUserActionableReceivedOrganizationRelationshipInvitesHttpResponse,
  findCurrentUserActionableReceivedOrganizationRelationshipInvitesHttpMetadata,
  findCurrentUserActionableReceivedOrganizationRelationshipInvitesHttpRequestSchema,
  findCurrentUserActionableReceivedOrganizationRelationshipInvitesHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type FindCurrentUserActionableReceivedOrganizationRelationshipInvitesParams = {
  request: ContextlessRequest<FindCurrentUserActionableReceivedOrganizationRelationshipInvitesHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function findCurrentUserActionableReceivedOrganizationRelationshipInvites({
  request,
  apiConnection,
}: FindCurrentUserActionableReceivedOrganizationRelationshipInvitesParams): Promise<FindCurrentUserActionableReceivedOrganizationRelationshipInvitesHttpResponse> {
  return await authenticatedApiRequest<
    typeof findCurrentUserActionableReceivedOrganizationRelationshipInvitesHttpRequestSchema,
    typeof findCurrentUserActionableReceivedOrganizationRelationshipInvitesHttpResponseSchema
  >({
    method: findCurrentUserActionableReceivedOrganizationRelationshipInvitesHttpMetadata.method as HttpMethod,
    path: `${findCurrentUserActionableReceivedOrganizationRelationshipInvitesHttpMetadata.servicePath}`,
    request,
    inputValidationSchema: findCurrentUserActionableReceivedOrganizationRelationshipInvitesHttpRequestSchema,
    outputValidationSchema: findCurrentUserActionableReceivedOrganizationRelationshipInvitesHttpResponseSchema,
    apiConnection,
  });
}

