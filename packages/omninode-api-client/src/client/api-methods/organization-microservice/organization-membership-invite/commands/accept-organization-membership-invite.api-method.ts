import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  AcceptOrganizationMembershipInviteHttpRequest,
  AcceptOrganizationMembershipInviteHttpResponse,
  acceptOrganizationMembershipInviteHttpMetadata,
  acceptOrganizationMembershipInviteHttpRequestSchema,
  acceptOrganizationMembershipInviteHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type AcceptOrganizationMembershipInviteParams = {
  request: ContextlessRequest<AcceptOrganizationMembershipInviteHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function acceptOrganizationMembershipInvite({
  request,
  apiConnection,
}: AcceptOrganizationMembershipInviteParams): Promise<AcceptOrganizationMembershipInviteHttpResponse> {
  return await authenticatedApiRequest<
    typeof acceptOrganizationMembershipInviteHttpRequestSchema,
    typeof acceptOrganizationMembershipInviteHttpResponseSchema
  >({
    method: acceptOrganizationMembershipInviteHttpMetadata.method as HttpMethod,
    path: `${acceptOrganizationMembershipInviteHttpMetadata.servicePath}`.replace(
      "{id}",
      request.pathParams.id
    ),
    request,
    inputValidationSchema: acceptOrganizationMembershipInviteHttpRequestSchema,
    outputValidationSchema: acceptOrganizationMembershipInviteHttpResponseSchema,
    apiConnection,
  });
}

