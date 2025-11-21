import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  FindComposedServiceViewMembershipGrantsHttpRequest,
  FindComposedServiceViewMembershipGrantsHttpResponse,
  findComposedServiceViewMembershipGrantsHttpMetadata,
  findComposedServiceViewMembershipGrantsHttpRequestSchema,
  findComposedServiceViewMembershipGrantsHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type FindComposedServiceViewMembershipGrantsParams = {
  request: ContextlessRequest<FindComposedServiceViewMembershipGrantsHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function findComposedServiceViewMembershipGrants({
  request,
  apiConnection,
}: FindComposedServiceViewMembershipGrantsParams): Promise<FindComposedServiceViewMembershipGrantsHttpResponse> {
  return await authenticatedApiRequest<
    typeof findComposedServiceViewMembershipGrantsHttpRequestSchema,
    typeof findComposedServiceViewMembershipGrantsHttpResponseSchema
  >({
    method:
      findComposedServiceViewMembershipGrantsHttpMetadata.method as HttpMethod,
    path: `${findComposedServiceViewMembershipGrantsHttpMetadata.servicePath}`.replace(
      "{id}",
      request.pathParams.id
    ),
    request,
    inputValidationSchema:
      findComposedServiceViewMembershipGrantsHttpRequestSchema,
    outputValidationSchema:
      findComposedServiceViewMembershipGrantsHttpResponseSchema,
    apiConnection,
  });
}


