import { CompanyRelationshipType } from "@scaleits-solutions-gmbh/services";

export type feCompanyInvite = {
  id: string;
  companyId: string;
  companyName: string;
  inviteeCompanyId: string;
  inviteeCompanyName: string;
  leftCompanyId: string;
  leftCompanyName: string;
  rightCompanyId: string;
  rightCompanyName: string;
  relationship: CompanyRelationshipType;
};
