import { OrganizationRole } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export interface FeView {
  companyId: string;
  companyName: string;
  companyImageUrl: string;
  type: string;
  organizationRole: OrganizationRole;
}
