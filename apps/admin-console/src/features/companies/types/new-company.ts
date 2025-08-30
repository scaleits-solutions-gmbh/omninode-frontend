import { FeCompany } from "@/types/fe/fe-company";
import {
  CompanyStatus,
  CompanyType,
  Currency,
  Industry,
  CountryCode,
} from "@scaleits-solutions-gmbh/services";

export type NewCompany = Omit<
  FeCompany,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "industry"
  | "countryCode"
  | "type"
  | "status"
  | "currency"
> & {
  industry?: Industry;
  countryCode?: CountryCode;
  type?: CompanyType;
  status?: CompanyStatus;
  currency?: Currency;
};
