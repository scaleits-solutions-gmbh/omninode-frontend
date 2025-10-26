import { OrganizationRole } from "@scaleits-solutions-gmbh/services";

export interface FeUserInvite {
  id: string;
  userId?: string;
  email: string;
  organizationRole: OrganizationRole;
  createdAt: string;
}
