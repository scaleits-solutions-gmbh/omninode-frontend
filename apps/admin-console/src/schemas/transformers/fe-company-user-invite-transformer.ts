import { z } from "zod";
import { ManagementConsoleAccess } from "@scaleits-solutions-gmbh/services";

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
  managementConsoleAccess: z.nativeEnum(ManagementConsoleAccess),
  createdAt: z.string().datetime(),
});

export type FeCompanyUserInvite = z.infer<typeof feCompanyUserInviteSchema>;
