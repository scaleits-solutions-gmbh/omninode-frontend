import { z } from "zod";
import { apiConnectionSchema } from "./api-connection.schema";
import { apiAuthenticationSchema } from "./authentication.schema";

export const authenticatedApiConnectionSchema = apiConnectionSchema.extend({
    apiAuthenticationSchema: apiAuthenticationSchema,
});

export type AuthenticatedApiConnection = z.infer<typeof authenticatedApiConnectionSchema>;