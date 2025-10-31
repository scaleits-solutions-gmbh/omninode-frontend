import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  SendOrganizationRelationshipInviteHttpRequest,
  SendOrganizationRelationshipInviteHttpResponse,
  sendOrganizationRelationshipInviteHttpMetadata,
  sendOrganizationRelationshipInviteHttpRequestSchema,
  sendOrganizationRelationshipInviteHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type SendOrganizationRelationshipInviteParams = {
  request: ContextlessRequest<SendOrganizationRelationshipInviteHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function sendOrganizationRelationshipInvite({
  request,
  apiConnection,
}: SendOrganizationRelationshipInviteParams): Promise<SendOrganizationRelationshipInviteHttpResponse> {
  return await authenticatedApiRequest<
    typeof sendOrganizationRelationshipInviteHttpRequestSchema,
    typeof sendOrganizationRelationshipInviteHttpResponseSchema
  >({
    method: sendOrganizationRelationshipInviteHttpMetadata.method as HttpMethod,
    path: `${sendOrganizationRelationshipInviteHttpMetadata.servicePath}`,
    request,
    inputValidationSchema: sendOrganizationRelationshipInviteHttpRequestSchema,
    outputValidationSchema: sendOrganizationRelationshipInviteHttpResponseSchema,
    apiConnection,
  });
}

