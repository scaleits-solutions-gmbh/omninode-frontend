import { z } from "zod";

export const feOrganizationUserInviteSchema = z.object({
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

export type FeOrganizationUserInvite = z.infer<typeof feOrganizationUserInviteSchema>;
