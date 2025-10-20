import { z } from "zod";

export const apiAuthenticationSchema = z.object({
    type: z.enum(['bearer']),
    token: z.string(),
});

export type ApiAuthentication = z.infer<typeof apiAuthenticationSchema>;