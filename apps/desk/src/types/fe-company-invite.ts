import { OrganizationType } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type feOrganizationInvite = {
  id: string;
  companyId: string;
  companyName: string;
  inviteeOrganizationId: string;
  inviteeOrganizationName: string;
  leftOrganizationId: string;
  leftOrganizationName: string;
  rightOrganizationId: string;
  rightOrganizationName: string;
  relationship: OrganizationType;
};
