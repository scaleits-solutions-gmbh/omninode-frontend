import { ManagementConsoleAccess } from "@scaleits-solutions-gmbh/services";

export interface FeView {
  companyId: string;
  companyName: string;
  companyImageUrl: string;
  type: string;
  managementConsoleAccess: ManagementConsoleAccess;
}