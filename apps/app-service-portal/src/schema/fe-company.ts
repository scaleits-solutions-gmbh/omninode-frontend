import { z } from "zod";

export const FeCompanySchema = z.object({
    id: z.string(),
    name: z.string(),
    type: z.string().optional(),
});

export type FeCompany = z.infer<typeof FeCompanySchema>;
