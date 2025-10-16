import type { AuthenticatedApiMethodInput } from "@/schemas/authenticated-api-method-input.schema";
import { HttpMethod } from "@/types/http-method.type";
import { authenticatedApiRequest } from "@/utils/api-request";
import {
  UpdateCurrentUserHttpRequest,
  UpdateCurrentUserHttpResponse,
  updateCurrentUserHttpMetadata,
  updateCurrentUserHttpRequestSchema,
  updateCurrentUserHttpResponseSchema,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { ContextlessRequest } from "@/types/contextless-request.type";
import { FlatObject } from "@/types/flat-object.type";

export type UpdateCurrentUserParams = AuthenticatedApiMethodInput<
FlatObject<ContextlessRequest<UpdateCurrentUserHttpRequest>>
>;

export async function updateCurrentUser({
  input,
  apiConnection,
}: UpdateCurrentUserParams
): Promise<UpdateCurrentUserHttpResponse> {
  const request: ContextlessRequest<UpdateCurrentUserHttpRequest> = {
    body: {
      firstName: input.firstName,
      lastName: input.lastName,
    },
  };
  return await authenticatedApiRequest<
    typeof updateCurrentUserHttpRequestSchema,
    typeof updateCurrentUserHttpResponseSchema
  >({
    method: updateCurrentUserHttpMetadata.method as HttpMethod,
    path: `${updateCurrentUserHttpMetadata.path}`,
    request,
    inputValidationSchema: updateCurrentUserHttpRequestSchema,
    outputValidationSchema: updateCurrentUserHttpResponseSchema,
    apiConnection,
  });
}
