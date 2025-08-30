import { ManagementConsoleAccess } from "@scaleits-solutions-gmbh/services";

export interface FeCompanyUserInvite {
  id: string;
  userId?: string;
  companyId: string;
  companyName: string;
  email: string;
  expiresAt: string;
  createdAt: string;
  managementConsoleAccess: ManagementConsoleAccess;
}
