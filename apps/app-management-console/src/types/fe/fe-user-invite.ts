import { ManagementConsoleAccess } from "@scaleits-solutions-gmbh/services";

export interface FeUserInvite {
  id: string;
  userId?: string;
  email: string;
  managementConsoleAccess: ManagementConsoleAccess;
  createdAt: string;
}
