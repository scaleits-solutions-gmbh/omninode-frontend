import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  CancelOrganizationMembershipInviteHttpRequest,
  CancelOrganizationMembershipInviteHttpResponse,
  cancelOrganizationMembershipInviteHttpMetadata,
  cancelOrganizationMembershipInviteHttpRequestSchema,
  cancelOrganizationMembershipInviteHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type CancelOrganizationMembershipInviteParams = {
  request: ContextlessRequest<CancelOrganizationMembershipInviteHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function cancelOrganizationMembershipInvite({
  request,
  apiConnection,
}: CancelOrganizationMembershipInviteParams): Promise<CancelOrganizationMembershipInviteHttpResponse> {
  return await authenticatedApiRequest<
    typeof cancelOrganizationMembershipInviteHttpRequestSchema,
    typeof cancelOrganizationMembershipInviteHttpResponseSchema
  >({
    method: cancelOrganizationMembershipInviteHttpMetadata.method as HttpMethod,
    path: `${cancelOrganizationMembershipInviteHttpMetadata.servicePath}`.replace(
      "{id}",
      request.pathParams.id
    ),
    request,
    inputValidationSchema: cancelOrganizationMembershipInviteHttpRequestSchema,
    outputValidationSchema: cancelOrganizationMembershipInviteHttpResponseSchema,
    apiConnection,
  });
}

