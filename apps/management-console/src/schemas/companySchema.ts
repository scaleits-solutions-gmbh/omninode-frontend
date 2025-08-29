import {
  registerSchema,
  CommonSchemas,
  CompanyStatus,
  CompanyType,
  Currency,
  CountryCode,
  Industry,
} from "@scaleits-solutions-gmbh/services";
import { z } from "zod";

// Define the Company schema with Zod
export const CompanySchema = z.object({
  id: z.string(),

  name: z.string(),

  type: z
    .nativeEnum(CompanyType)
    .optional(),

  industry: z
    .nativeEnum(Industry)
    .optional(),

  email: z.string(),

  phone: z.string().default(""),

  taxId: z.string().default(""),

  countryCode: z
    .nativeEnum(CountryCode)
    .optional(),

  city: z.string(),

  address: z.string(),

  currency: z
    .nativeEnum(Currency)
    .optional(),

  status: z
    .nativeEnum(CompanyStatus)
    .optional(),

  primaryContactFirstName: z.string(),

  primaryContactLastName: z.string(),

  primaryContactEmail: z.string(),

  primaryContactPhone: z.string().default(""),

  createdAt: CommonSchemas.isoDate.default(() => new Date().toISOString()),

  updatedAt: CommonSchemas.isoDate.default(() => new Date().toISOString()),
});

// Infer the TypeScript type from the schema
export type Company = z.infer<typeof CompanySchema>;

// Register the schema globally for use with sanitizeWithZod
registerSchema("Company", CompanySchema);

export { CompanySchema as default };
