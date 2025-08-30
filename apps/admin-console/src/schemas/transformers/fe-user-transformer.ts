import { FeUser } from "@/types/fe/fe-user";
import { z } from "zod";
import { ManagementConsoleAccess } from "@scaleits-solutions-gmbh/services";

export const feUserTransformerSchema = z
  .object({
    id: z.string(),
    userId: z.string(),
    companyId: z.string(),
    managementConsoleAccess: z.nativeEnum(ManagementConsoleAccess),
    createdAt: z.string(),
    updatedAt: z.string(),
    userFirstName: z.string(),
    userLastName: z.string(),
    userEmail: z.string(),
    companyName: z.string(),
    lastLoginAt: z.string().optional(),
  })
  .transform(
    (data): FeUser => ({
      id: data.userId, // Use userId as the main id for FeUser
      firstName: data.userFirstName,
      lastName: data.userLastName,
      email: data.userEmail,
      managementConsoleAccess: data.managementConsoleAccess,
      lastLoginAt: data.lastLoginAt ? new Date(data.lastLoginAt) : undefined,
      // imageUrl is optional and not provided by API, so it remains undefined
    }),
  );

export type FeUserFromApi = z.input<typeof feUserTransformerSchema>;
export type FeUserTransformed = z.output<typeof feUserTransformerSchema>;
