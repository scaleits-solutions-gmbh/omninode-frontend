import { Company } from "@scaleits-solutions-gmbh/services";

export type FeOwnCompany = Company;

export type FeExternalCompany = Omit<
  Company,
  "type" | "industry" | "countryCode" | "currency" | "status"
>;
