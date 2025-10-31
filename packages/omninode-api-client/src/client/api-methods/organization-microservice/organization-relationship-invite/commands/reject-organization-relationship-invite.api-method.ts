import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  RejectOrganizationRelationshipInviteHttpRequest,
  RejectOrganizationRelationshipInviteHttpResponse,
  rejectOrganizationRelationshipInviteHttpMetadata,
  rejectOrganizationRelationshipInviteHttpRequestSchema,
  rejectOrganizationRelationshipInviteHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type RejectOrganizationRelationshipInviteParams = {
  request: ContextlessRequest<RejectOrganizationRelationshipInviteHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function rejectOrganizationRelationshipInvite({
  request,
  apiConnection,
}: RejectOrganizationRelationshipInviteParams): Promise<RejectOrganizationRelationshipInviteHttpResponse> {
  return await authenticatedApiRequest<
    typeof rejectOrganizationRelationshipInviteHttpRequestSchema,
    typeof rejectOrganizationRelationshipInviteHttpResponseSchema
  >({
    method: rejectOrganizationRelationshipInviteHttpMetadata.method as HttpMethod,
    path: `${rejectOrganizationRelationshipInviteHttpMetadata.servicePath}`.replace(
      "{id}",
      request.pathParams.id
    ),
    request,
    inputValidationSchema: rejectOrganizationRelationshipInviteHttpRequestSchema,
    outputValidationSchema: rejectOrganizationRelationshipInviteHttpResponseSchema,
    apiConnection,
  });
}

