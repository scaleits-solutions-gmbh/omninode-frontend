import { z } from "zod";

export const feCompanyUserInviteSchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  companyName: z.string(),
  email: z.string().email(),
  expiresAt: z.string().datetime(),
  userId: z
    .string()
    .nullable()
    .transform((val) => val ?? undefined),
});

export type FeCompanyUserInvite = z.infer<typeof feCompanyUserInviteSchema>;
