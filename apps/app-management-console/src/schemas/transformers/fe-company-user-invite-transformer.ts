import { OrganizationRole } from "@scaleits-solutions-gmbh/services";
import { z } from "zod";

export const feCompanyUserInviteSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  organizationRole: z.nativeEnum(OrganizationRole),
  expiresAt: z.string().datetime(),
  createdAt: z.string().datetime(),
});

export type FeCompanyUserInvite = z.infer<typeof feCompanyUserInviteSchema>;
