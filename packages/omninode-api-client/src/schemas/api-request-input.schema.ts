import { HttpRequestSchema } from "@scaleits-solutions-gmbh/org-lib-backend-serverless-common-kit/defs";
import { z } from "zod";
import { apiConnectionSchema } from "./api-connection.schema";
import { HttpMethod } from "@/types/http-method.type";

/**
 * Creates a dynamic API request input schema with custom input and output validation schemas.
 * 
 * @param inputValidationSchema - Zod schema for validating the input data
 * @param outputValidationSchema - Zod schema for validating the output/response data
 * @returns A Zod schema for the complete API request input
 */
export function createApiRequestInputSchema<
    TInput extends z.ZodTypeAny,
    TOutput extends z.ZodTypeAny
>(
    inputValidationSchema: TInput,
    outputValidationSchema: TOutput
) {
    return z.object({
        method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD']),
        inputValidationSchema: inputValidationSchema,
        outputValidationSchema: outputValidationSchema,
        request: HttpRequestSchema,
        apiConnection: apiConnectionSchema,
    });
}

/**
 * Type for API request input with generic input and output types.
 */
export type ApiRequestInput<TInput = any, TOutput = any> = {
    method: HttpMethod;
    path: string;
    inputValidationSchema?: z.ZodTypeAny;
    outputValidationSchema: z.ZodTypeAny;
    request?: z.infer<typeof HttpRequestSchema>;
    apiConnection: z.infer<typeof apiConnectionSchema>;
};