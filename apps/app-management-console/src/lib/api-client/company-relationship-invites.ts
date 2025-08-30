import { BaseApiClient } from "@scaleits-solutions-gmbh/api-client";
import { CompanyRelationshipType } from "@scaleits-solutions-gmbh/services";
const apiClient = new BaseApiClient();

export const sendCompanyRelationshipInvite = async ({
  email,
  leftCompanyId,
  rightCompanyId,
  companyId,
  relationshipType,
}: {
  email: string;
  leftCompanyId: string;
  rightCompanyId: string;
  companyId: string;
  relationshipType: CompanyRelationshipType;
}) => {
  await apiClient.post<void>(`/company-relationship-invites`, {
    email,
    leftCompanyId,
    rightCompanyId,
    companyId,
    relationshipType,
  });
};
