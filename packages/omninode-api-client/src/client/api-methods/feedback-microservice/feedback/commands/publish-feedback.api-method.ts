import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/client/api-request.util";
import { ContextlessRequest } from "@/schemas/contextless-request.schema";
import {
  PublishFeedbackHttpRequest,
  PublishFeedbackHttpResponse,
  publishFeedbackHttpMetadata,
  publishFeedbackHttpRequestSchema,
  publishFeedbackHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type PublishFeedbackParams = {
  request: ContextlessRequest<PublishFeedbackHttpRequest>;
  apiConnection: AuthenticatedApiConnection;
};

export async function publishFeedback({
  request,
  apiConnection,
}: PublishFeedbackParams): Promise<PublishFeedbackHttpResponse> {
  return await authenticatedApiRequest<
    typeof publishFeedbackHttpRequestSchema,
    typeof publishFeedbackHttpResponseSchema
  >({
    method: publishFeedbackHttpMetadata.method as HttpMethod,
    path: `${publishFeedbackHttpMetadata.servicePath}`,
    request,
    inputValidationSchema: publishFeedbackHttpRequestSchema,
    outputValidationSchema: publishFeedbackHttpResponseSchema,
    apiConnection,
  });
}

