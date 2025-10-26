import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
    findUserOrganizationsHttpMetadata,
  FindUserOrganizationsHttpRequest,
  findUserOrganizationsHttpRequestSchema,
  FindUserOrganizationsHttpResponse,
  findUserOrganizationsHttpResponseSchema
  
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type FindUserOrganizationsParams = {
  request: ContextlessRequest<FindUserOrganizationsHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function findUserOrganizations({
  request,
  apiConnection,
}: FindUserOrganizationsParams): Promise<FindUserOrganizationsHttpResponse> {
  return await authenticatedApiRequest<
    typeof findUserOrganizationsHttpRequestSchema,
    typeof findUserOrganizationsHttpResponseSchema
  >({
    method: findUserOrganizationsHttpMetadata.method as HttpMethod,
    path: `${findUserOrganizationsHttpMetadata.path}`.replace(
      "{id}",
      request.pathParams.id
    ),
    request,
    inputValidationSchema: findUserOrganizationsHttpRequestSchema,
    outputValidationSchema: findUserOrganizationsHttpResponseSchema,
    apiConnection,
  });
}
