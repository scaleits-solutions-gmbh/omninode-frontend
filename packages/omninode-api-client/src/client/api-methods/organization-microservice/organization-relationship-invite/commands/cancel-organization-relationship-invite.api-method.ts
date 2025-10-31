import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  CancelOrganizationRelationshipInviteHttpRequest,
  CancelOrganizationRelationshipInviteHttpResponse,
  cancelOrganizationRelationshipInviteHttpMetadata,
  cancelOrganizationRelationshipInviteHttpRequestSchema,
  cancelOrganizationRelationshipInviteHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type CancelOrganizationRelationshipInviteParams = {
  request: ContextlessRequest<CancelOrganizationRelationshipInviteHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function cancelOrganizationRelationshipInvite({
  request,
  apiConnection,
}: CancelOrganizationRelationshipInviteParams): Promise<CancelOrganizationRelationshipInviteHttpResponse> {
  return await authenticatedApiRequest<
    typeof cancelOrganizationRelationshipInviteHttpRequestSchema,
    typeof cancelOrganizationRelationshipInviteHttpResponseSchema
  >({
    method: cancelOrganizationRelationshipInviteHttpMetadata.method as HttpMethod,
    path: `${cancelOrganizationRelationshipInviteHttpMetadata.servicePath}`.replace(
      "{id}",
      request.pathParams.id
    ),
    request,
    inputValidationSchema: cancelOrganizationRelationshipInviteHttpRequestSchema,
    outputValidationSchema: cancelOrganizationRelationshipInviteHttpResponseSchema,
    apiConnection,
  });
}

