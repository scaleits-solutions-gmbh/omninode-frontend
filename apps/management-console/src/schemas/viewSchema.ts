import { registerSchema, CompanyType } from "@scaleits-solutions-gmbh/services";
import { z } from "zod";

// Define the View schema with Zod
export const ViewSchema = z.object({
  companyId: z.string(),

  companyName: z.string(),

  companyImageUrl: z.string().optional(),

  type: z.nativeEnum(CompanyType).default(CompanyType.CUSTOMER),
});

// Infer the TypeScript type from the schema
export type View = z.infer<typeof ViewSchema>;

// Register the schema globally for use with sanitizeWithZod
registerSchema("View", ViewSchema);

export { ViewSchema as default }; 