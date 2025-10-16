import { z } from "zod";
import { apiConnectionSchema } from "./api-connection.schema";

export function createApiMethodInputSchema<TInput extends z.ZodTypeAny>(inputSchema: TInput) {
    return z.object({
        input: inputSchema,
        apiConnection: apiConnectionSchema,
    });
}

export type ApiMethodInput<TInput = any> = {
    input: TInput;
    apiConnection: z.infer<typeof apiConnectionSchema>;
};