import { HttpRequestSchema } from "@scaleits-solutions-gmbh/org-lib-backend-serverless-common-kit/defs";
import { z } from "zod";
import { authenticatedApiConnectionSchema } from "./authenticated-api-connection.schema";
import { createApiRequestInputSchema } from "./api-request-input.schema";
import { HttpMethod } from "@/types/http-method.type";

/**
 * Creates a dynamic authenticated API request input schema with custom input and output validation schemas.
 * This extends the base API request input schema with authentication requirements.
 * 
 * @param inputValidationSchema - Zod schema for validating the input data
 * @param outputValidationSchema - Zod schema for validating the output/response data
 * @returns A Zod schema for the complete authenticated API request input
 */
export function createAuthenticatedApiRequestInputSchema<
    TInput extends z.ZodTypeAny,
    TOutput extends z.ZodTypeAny
>(
    inputValidationSchema: TInput,
    outputValidationSchema: TOutput
) {
    return createApiRequestInputSchema(inputValidationSchema, outputValidationSchema).extend({
        apiConnection: authenticatedApiConnectionSchema,
    });
}

/**
 * Type for authenticated API request input with generic input and output types.
 */
export type AuthenticatedApiRequestInput<TInput = any, TOutput = any> = {
    method: HttpMethod;
    path: string;
    inputValidationSchema?: z.ZodTypeAny;
    outputValidationSchema: z.ZodTypeAny;
    request?: z.infer<typeof HttpRequestSchema>;
    apiConnection: z.infer<typeof authenticatedApiConnectionSchema>;
};