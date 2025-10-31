import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  SendOrganizationMembershipInviteHttpRequest,
  SendOrganizationMembershipInviteHttpResponse,
  sendOrganizationMembershipInviteHttpMetadata,
  sendOrganizationMembershipInviteHttpRequestSchema,
  sendOrganizationMembershipInviteHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type SendOrganizationMembershipInviteParams = {
  request: ContextlessRequest<SendOrganizationMembershipInviteHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function sendOrganizationMembershipInvite({
  request,
  apiConnection,
}: SendOrganizationMembershipInviteParams): Promise<SendOrganizationMembershipInviteHttpResponse> {
  return await authenticatedApiRequest<
    typeof sendOrganizationMembershipInviteHttpRequestSchema,
    typeof sendOrganizationMembershipInviteHttpResponseSchema
  >({
    method: sendOrganizationMembershipInviteHttpMetadata.method as HttpMethod,
    path: `${sendOrganizationMembershipInviteHttpMetadata.servicePath}`.replace(
      "{id}",
      request.pathParams.id
    ),
    request,
    inputValidationSchema: sendOrganizationMembershipInviteHttpRequestSchema,
    outputValidationSchema: sendOrganizationMembershipInviteHttpResponseSchema,
    apiConnection,
  });
}
