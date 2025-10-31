import { OrganizationRelationshipType } from "@scaleits-solutions-gmbh/services";

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
  relationship: OrganizationRelationshipType;
};
