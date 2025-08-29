import {
  registerSchema,
  ManagementConsoleAccess
} from "@scaleits-solutions-gmbh/services";
import { z } from "zod";

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PENDING = "pending",
}

// Define the User schema with Zod
export const UserSchema = z.object({
  id: z.string(),
  UserCompanyId: z.string(),
  imageUrl: z.string(),
  email: z.string().email(),

  firstName: z.string(),

  lastName: z.string(),

  managementConsoleAccess: z
    .nativeEnum(ManagementConsoleAccess)
    .or(z.string()) // Allow strings for backward compatibility
    .optional(),

  status: z
    .nativeEnum(UserStatus)
    .or(z.string()) // Allow strings for backward compatibility
    .optional(),

  lastSeenAt: z.date().or(z.string().datetime()),

  createdAt: z.date().or(z.string().datetime()).default(() => new Date()),

  updatedAt: z.date().or(z.string().datetime()).default(() => new Date()),
});

// Infer the TypeScript type from the schema
export type User = z.infer<typeof UserSchema>;

// Register the schema globally for use with sanitizeWithZod
registerSchema("User", UserSchema);

// Input schema that matches the source data structure from the service
export const UserInputSchema = z.object({
  userId: z.string(), // This is the user ID from service, will map to final id
  id: z.string().optional(), // This will map to UserCompanyId
  userFirstName: z.string(),
  userMiddleNames: z.string().default(""),
  userLastName: z.string(),
  userPosition: z.string().default(""),
  userEmail: z.string().email(),
  imageUrl: z.string().default(""),
  managementConsoleAccess: z.nativeEnum(ManagementConsoleAccess).or(z.string()).optional(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
}).transform((data) => {
  // Helper function to convert string to ManagementConsoleAccess
  const toManagementConsoleAccess = (value: string | undefined): ManagementConsoleAccess => {
    if (!value) return ManagementConsoleAccess.User;
    const normalized = value.toLowerCase();
    if (normalized === 'owner') return ManagementConsoleAccess.Owner;
    if (normalized === 'admin') return ManagementConsoleAccess.Admin;
    if (normalized === 'user') return ManagementConsoleAccess.User;
    if (normalized === 'none') return ManagementConsoleAccess.None;
    return ManagementConsoleAccess.User;
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
    managementConsoleAccess: toManagementConsoleAccess(data.managementConsoleAccess), // Ensure proper enum value
    status: "active", // Default status
    lastSeenAt: new Date(), // Default to current date
    createdAt: typeof data.createdAt === 'string' ? new Date(data.createdAt) : data.createdAt,
    updatedAt: typeof data.updatedAt === 'string' ? new Date(data.updatedAt) : data.updatedAt,
  };
});

// Type for the input data before transformation
export type UserInput = z.input<typeof UserInputSchema>;

export const UserProfileSchema = z.object({
  id: z.string(),
  imageUrl: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  middleNames: z.string(),
  lastName: z.string(),
  position: z.string(),
  theme: z.string(),
  language: z.string(),
  createdAt: z
    .string()
    .datetime()
    .transform((str) => new Date(str))
    .or(z.date())
    .default(() => new Date()),
  updatedAt: z
    .string()
    .datetime()
    .transform((str) => new Date(str))
    .or(z.date())
    .default(() => new Date()),
});


registerSchema("UserProfile", UserProfileSchema);
