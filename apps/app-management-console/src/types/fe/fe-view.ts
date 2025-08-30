import { CompanyType } from "@scaleits-solutions-gmbh/services";

export type View = {
  companyId: string;
  companyName: string;
  companyImageUrl?: string;
  type: CompanyType;
};
