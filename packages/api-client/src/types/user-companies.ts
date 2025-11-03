import type { Service } from '@scaleits-solutions-gmbh/omninode-lib-global-common-kit';

// TODO: Remove this local definition once @scaleits-solutions-gmbh/omninode-lib-global-common-kit
// exports OrganizationRole properly. This is a workaround for the published version
// that doesn't include this export.
export enum OrganizationRole {
  Owner = 'owner',
  Admin = 'admin',
  Member = 'member',
}

type AcmpPermissions = {
  canViewDashboard: boolean;
  canViewDevices: boolean;
  canViewJobs: boolean;
  canPushRollouts: boolean;
  canPushClientCommands: boolean;
};

type WeclappPermissions = {
  canViewDashboard: boolean;
  canViewQuotes: boolean;
  canViewSalesOrders: boolean;
  canViewInvoices: boolean;
  canViewProjects: boolean;
  canViewTickets: boolean;
  canCreateTickets: boolean;
  canRespondToTickets: boolean;
};

type BaseServiceInstance = {
  serviceInstanceId: string;
  name: string;
  service: Service;
};

type AcmpServiceInstance = BaseServiceInstance & {
  service: Service.Acmp;
  permissions: AcmpPermissions;
};

type WeclappServiceInstance = BaseServiceInstance & {
  service: Service.Weclapp;
  permissions: WeclappPermissions;
};

type ServiceInstance = AcmpServiceInstance | WeclappServiceInstance;

export type ServiceInstanceHost = {
  hostOrganizationId: string;
  hostOrganizationName: string;
  instances: ServiceInstance[];
};

export type Organization = {
  id: string;
  name: string;
  organizationRole: OrganizationRole;
  serviceInstanceHosts: ServiceInstanceHost[];
};

export type GetUserCompaniesResponseDto = {
  companies: Organization[];
};