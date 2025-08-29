import {
  Company as CompanyBase,
  CompanyStatus,
  CompanyType,
  Currency,
  CountryCode,
  Industry,
} from "@scaleits-solutions-gmbh/services";

export type Company = Omit<CompanyBase, 'type' | 'industry' | 'countryCode' | 'currency' | 'status'> & {
  type?: CompanyType;
  industry?: Industry;
  countryCode?: CountryCode;
  currency?: Currency;
  status?: CompanyStatus;
};

export type NewCompany = Omit<Company, "id" | "createdAt" | "updatedAt">;

export function getEmptyCompany(): Company {
  return {
    id: "",
    name: "",
    type: undefined,
    industry: undefined,
    email: "",
    phone: "",
    taxId: "",
    countryCode: undefined,
    city: "",
    address: "",
    currency: undefined,
    status: undefined,
    primaryContactFirstName: "",
    primaryContactLastName: "",
    primaryContactEmail: "",
    primaryContactPhone: "",
    createdAt: "",
    updatedAt: "",
  };
}

export function getEmptyNewCompany(): NewCompany {
  return {
    name: "",
    type: undefined,
    industry: undefined,
    email: "",
    phone: "",
    taxId: "",
    countryCode: undefined,
    city: "",
    address: "",
    currency: undefined,
    status: undefined,
    primaryContactFirstName: "",
    primaryContactLastName: "",
    primaryContactEmail: "",
    primaryContactPhone: "",
  };
}
