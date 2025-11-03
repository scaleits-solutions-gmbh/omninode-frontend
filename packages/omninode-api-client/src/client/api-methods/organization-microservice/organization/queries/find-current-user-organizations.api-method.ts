import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
    findCurrentUserOrganizationsHttpMetadata,
  FindCurrentUserOrganizationsHttpRequest,
  findCurrentUserOrganizationsHttpRequestSchema,
  FindCurrentUserOrganizationsHttpResponse,
  findCurrentUserOrganizationsHttpResponseSchema  
  
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type FindCurrentUserOrganizationsParams = {
  apiConnection: AuthenticatedApiConnection;
};

export async function findCurrentUserOrganizations({
  apiConnection,
}: FindCurrentUserOrganizationsParams): Promise<FindCurrentUserOrganizationsHttpResponse> {
  return await authenticatedApiRequest<
    typeof findCurrentUserOrganizationsHttpRequestSchema,
    typeof findCurrentUserOrganizationsHttpResponseSchema
  >({
    method: findCurrentUserOrganizationsHttpMetadata.method as HttpMethod,
    path: findCurrentUserOrganizationsHttpMetadata.servicePath,
    inputValidationSchema: findCurrentUserOrganizationsHttpRequestSchema,
    outputValidationSchema: findCurrentUserOrganizationsHttpResponseSchema,
    apiConnection,
  });
}
