import { z } from "zod";

export const FeUserProfileSchema = z.object({
    id: z.string(),
    imageUrl: z.string(),
    email: z.string(),
    firstName: z.string(),
    middleNames: z.string(),
    lastName: z.string(),
    position: z.string(),
    theme: z.string(),
    language: z.string(),
    createdAt: z.coerce.date(),
});

export type FeUserProfile = z.infer<typeof FeUserProfileSchema>;