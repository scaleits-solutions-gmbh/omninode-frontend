import { FeUser } from "@/types/fe/feUser";
import { z } from "zod";
import { ManagementConsoleAccess } from "@scaleits-solutions-gmbh/services";

/*obj from api
    {
        "id": "3e675d17-b534-4861-a191-b44fa7e1763a",
        "userId": "c5664da2-b6cf-43d0-9a96-78bcfb0426a3",
        "companyId": "16c963db-1f1e-4f41-98f3-c6d13470090a",
        "managementConsoleAccess": "admin",
        "createdAt": "2025-06-03T09:46:02.440Z",
        "updatedAt": "2025-06-03T09:46:02.440Z",
        "userFirstName": "Jonas",
        "userLastName": "Santos",
        "userEmail": "delete9@example.com",
        "companyName": "ScaleITS"
    }
*/

export const feUserTransformerSchema = z.object({
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
}).transform((data): FeUser => ({
    id: data.userId, // Use userId as the main id for FeUser
    firstName: data.userFirstName,
    lastName: data.userLastName,
    email: data.userEmail,
    managementConsoleAccess: data.managementConsoleAccess,
    lastLoginAt: data.lastLoginAt ? new Date(data.lastLoginAt) : undefined,
    // imageUrl is optional and not provided by API, so it remains undefined
}));

export type FeUserFromApi = z.input<typeof feUserTransformerSchema>;
export type FeUserTransformed = z.output<typeof feUserTransformerSchema>;

