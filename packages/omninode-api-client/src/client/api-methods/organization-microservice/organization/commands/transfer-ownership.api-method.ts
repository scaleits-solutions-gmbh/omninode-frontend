import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  TransferOwnershipHttpRequest,
  TransferOwnershipHttpResponse,
  transferOwnershipHttpMetadata,
  transferOwnershipHttpRequestSchema,
  transferOwnershipHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type TransferOwnershipParams = {
  request: ContextlessRequest<TransferOwnershipHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function transferOwnership({
  request,
  apiConnection,
}: TransferOwnershipParams): Promise<TransferOwnershipHttpResponse> {
  return await authenticatedApiRequest<
    typeof transferOwnershipHttpRequestSchema,
    typeof transferOwnershipHttpResponseSchema
  >({
    method: transferOwnershipHttpMetadata.method as HttpMethod,
    path: `${transferOwnershipHttpMetadata.servicePath}`.replace(
      "{id}",
      request.pathParams.id
    ),
    request,
    inputValidationSchema: transferOwnershipHttpRequestSchema,
    outputValidationSchema: transferOwnershipHttpResponseSchema,
    apiConnection,
  });
}

