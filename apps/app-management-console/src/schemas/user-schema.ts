import {
  OrganizationRole,
  UserCompanyStatus,
} from "@scaleits-solutions-gmbh/services";
import { z } from "zod";

export const UserProfileSchema = z.object({
  id: z.string(),
  imageUrl: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
});

// Input schema that matches the source data structure from the service
export const UserCompanyInputSchema = z
  .object({
    userId: z.string(), // This is the user ID from service, will map to final id
    id: z.string().optional(), // This will map to UserCompanyId
    userFirstName: z.string(),
    userMiddleNames: z.string().default(""),
    userLastName: z.string(),
    userPosition: z.string().default(""),
    userEmail: z.string().email(),
    imageUrl: z.string().default(""),
    organizationRole: z
      .nativeEnum(OrganizationRole)
      .or(z.string())
      .optional(),
    status: z.nativeEnum(UserCompanyStatus).or(z.string()).optional(),
    createdAt: z.string().or(z.date()),
    updatedAt: z.string().or(z.date()),
  })
  .transform((data) => {
    // Helper function to convert string to OrganizationRole
    const toOrganizationRole = (
      value: string | undefined,
    ): OrganizationRole => {
      if (!value) return OrganizationRole.Member;
      const normalized = value.toLowerCase();
      if (normalized === "owner") return OrganizationRole.Owner;
      if (normalized === "admin") return OrganizationRole.Admin;
      if (normalized === "user") return OrganizationRole.Member;
      if (normalized === "none") return OrganizationRole.None;
      return OrganizationRole.Member;
    };

    const toUserCompanyStatus = (
      value: string | undefined,
    ): UserCompanyStatus => {
      if (!value) return UserCompanyStatus.ACTIVE;
      const normalized = value.toLowerCase();
      if (normalized === "active") return UserCompanyStatus.ACTIVE;
      if (normalized === "inactive") return UserCompanyStatus.INACTIVE;
      return UserCompanyStatus.ACTIVE;
    };
    return {
      id: data.userId, // Service userId becomes final id
      UserCompanyId: data.id || "", // Service id becomes UserCompanyId
      firstName: data.userFirstName, // Map userFirstName to firstName
      middleNames: data.userMiddleNames, // Map userMiddleNames to middleNames
      lastName: data.userLastName, // Map userLastName to lastName
      position: data.userPosition, // Map userPosition to position
      email: data.userEmail, // Map userEmail to email
      imageUrl: data.imageUrl, // Default empty imageUrl
      organizationRole: toOrganizationRole(
        data.organizationRole,
      ), // Ensure proper enum value
      status: toUserCompanyStatus(data.status),
      lastSeenAt: new Date(), // Default to current date
      createdAt:
        typeof data.createdAt === "string"
          ? new Date(data.createdAt)
          : data.createdAt,
      updatedAt:
        typeof data.updatedAt === "string"
          ? new Date(data.updatedAt)
          : data.updatedAt,
    };
  });

// Type for the input data before transformation
export type UserCompanyInput = z.input<typeof UserCompanyInputSchema>;
