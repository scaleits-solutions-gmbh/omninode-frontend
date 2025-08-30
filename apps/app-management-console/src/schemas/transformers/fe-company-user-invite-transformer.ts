import { ManagementConsoleAccess } from "@scaleits-solutions-gmbh/services";
import { z } from "zod";

export const feCompanyUserInviteSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  managementConsoleAccess: z.nativeEnum(ManagementConsoleAccess),
  expiresAt: z.string().datetime(),
  createdAt: z.string().datetime(),
});

export type FeCompanyUserInvite = z.infer<typeof feCompanyUserInviteSchema>;
