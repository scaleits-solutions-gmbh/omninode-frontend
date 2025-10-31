import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  RejectOrganizationMembershipInviteHttpRequest,
  RejectOrganizationMembershipInviteHttpResponse,
  rejectOrganizationMembershipInviteHttpMetadata,
  rejectOrganizationMembershipInviteHttpRequestSchema,
  rejectOrganizationMembershipInviteHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type RejectOrganizationMembershipInviteParams = {
  request: ContextlessRequest<RejectOrganizationMembershipInviteHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function rejectOrganizationMembershipInvite({
  request,
  apiConnection,
}: RejectOrganizationMembershipInviteParams): Promise<RejectOrganizationMembershipInviteHttpResponse> {
  return await authenticatedApiRequest<
    typeof rejectOrganizationMembershipInviteHttpRequestSchema,
    typeof rejectOrganizationMembershipInviteHttpResponseSchema
  >({
    method: rejectOrganizationMembershipInviteHttpMetadata.method as HttpMethod,
    path: `${rejectOrganizationMembershipInviteHttpMetadata.servicePath}`.replace(
      "{id}",
      request.pathParams.id
    ),
    request,
    inputValidationSchema: rejectOrganizationMembershipInviteHttpRequestSchema,
    outputValidationSchema: rejectOrganizationMembershipInviteHttpResponseSchema,
    apiConnection,
  });
}

