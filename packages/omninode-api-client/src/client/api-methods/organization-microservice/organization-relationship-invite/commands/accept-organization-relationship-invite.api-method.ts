import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  AcceptOrganizationRelationshipInviteHttpRequest,
  AcceptOrganizationRelationshipInviteHttpResponse,
  acceptOrganizationRelationshipInviteHttpMetadata,
  acceptOrganizationRelationshipInviteHttpRequestSchema,
  acceptOrganizationRelationshipInviteHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type AcceptOrganizationRelationshipInviteParams = {
  request: ContextlessRequest<AcceptOrganizationRelationshipInviteHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function acceptOrganizationRelationshipInvite({
  request,
  apiConnection,
}: AcceptOrganizationRelationshipInviteParams): Promise<AcceptOrganizationRelationshipInviteHttpResponse> {
  return await authenticatedApiRequest<
    typeof acceptOrganizationRelationshipInviteHttpRequestSchema,
    typeof acceptOrganizationRelationshipInviteHttpResponseSchema
  >({
    method: acceptOrganizationRelationshipInviteHttpMetadata.method as HttpMethod,
    path: `${acceptOrganizationRelationshipInviteHttpMetadata.servicePath}`.replace(
      "{id}",
      request.pathParams.id
    ),
    request,
    inputValidationSchema: acceptOrganizationRelationshipInviteHttpRequestSchema,
    outputValidationSchema: acceptOrganizationRelationshipInviteHttpResponseSchema,
    apiConnection,
  });
}

