import { z } from "zod";
import { authenticatedApiConnectionSchema } from "./authenticated-api-connection.schema";

export function createAuthenticatedApiMethodInputSchema<TInput extends z.ZodTypeAny>(inputSchema: TInput) {
    return z.object({
        input: inputSchema,
        apiConnection: authenticatedApiConnectionSchema,
    });
}

export type AuthenticatedApiMethodInput<TInput = any> = {
    input: TInput;
    apiConnection: z.infer<typeof authenticatedApiConnectionSchema>;
};