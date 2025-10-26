import type { Service, OrganizationRole } from '@scaleits-solutions-gmbh/omninode-lib-global-common-kit';

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
  hostCompanyId: string;
  hostCompanyName: string;
  instances: ServiceInstance[];
};

export type Company = {
  id: string;
  name: string;
  organizationRole: OrganizationRole;
  serviceInstanceHosts: ServiceInstanceHost[];
};

export type GetUserCompaniesResponseDto = {
  companies: Company[];
};