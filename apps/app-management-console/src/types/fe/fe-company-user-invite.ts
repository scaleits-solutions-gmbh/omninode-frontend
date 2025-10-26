import { OrganizationRole } from "@scaleits-solutions-gmbh/services";

export interface FeCompanyUserInvite {
  id: string;
  email: string;
  expiresAt: string;
  createdAt: string;
  organizationRole: OrganizationRole;
}
