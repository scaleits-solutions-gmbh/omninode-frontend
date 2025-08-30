import { ManagementConsoleAccess } from "@scaleits-solutions-gmbh/services";

export type FeUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl?: string;
  managementConsoleAccess: ManagementConsoleAccess;
  lastLoginAt?: Date;
};
