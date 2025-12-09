import { z } from "zod";

export const FeOrganizationSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string().optional(),
});

export type FeOrganization = z.infer<typeof FeOrganizationSchema>;
