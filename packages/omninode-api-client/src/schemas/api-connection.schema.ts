import { z } from "zod";

export const apiConnectionSchema = z.object({
    baseUrl: z.string(),
    timeoutMs: z.number().optional(),
});

export type ApiConnection = z.infer<typeof apiConnectionSchema>;