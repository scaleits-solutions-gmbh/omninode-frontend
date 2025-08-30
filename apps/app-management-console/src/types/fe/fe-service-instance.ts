import {
  AcmpFilterType,
  Service,
  ServiceInstance,
  ServiceInstanceStatus,
  WeclappFilterType,
} from "@scaleits-solutions-gmbh/services";

export type FeServiceInstance = ServiceInstance;

export type FeWeclappServiceInstanceDetails = {
  id: string;
  instanceName: string;
  sourceCompanyId: string;
  sourceCompanyName: string;
  sourceCompanyEmail: string;
  service: Service;
  status: ServiceInstanceStatus;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  hostName: string;
  apiKey: string;
  connectionStatus: string;
};

export type FeAcmpServiceInstanceDetails = {
  id: string;
  instanceName: string;
  sourceCompanyId: string;
  sourceCompanyName: string;
  sourceCompanyEmail: string;
  service: Service;
  status: ServiceInstanceStatus;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  hostName: string;
  apiKey: string;
  connectionStatus: string;
  acmpConnectorVersion: string;
  acmpServerVersion: string;
};

export type FeServiceInstanceUserWithAccess = {
  id: string;
  serviceInstanceId: string;
  serviceInstanceName: string;
  serviceInstanceService: Service;
  serviceInstanceStatus: ServiceInstanceStatus;
  userCompanyId: string;
  userImageUrl: string;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  accessGrantedAt: Date;
  createdAt: Date;
  createdBy: string;
  creatorImageUrl: string;
  creatorFirstName: string;
  creatorLastName: string;
  creatorEmail: string;
};

export type FeServiceInstanceCompanyWithAccess = {
  id: string;
  serviceInstanceId: string;
  serviceInstanceName: string;
  serviceInstanceService: Service;
  serviceInstanceStatus: ServiceInstanceStatus;
  companyId: string;
  companyName: string;
  companyEmail: string;
  companyImageUrl: string;
  createdAt: Date;
  createdBy: string;
  creatorImageUrl: string;
  creatorFirstName: string;
  creatorLastName: string;
  creatorEmail: string;
};

export type FeAcmpServiceInstanceCompanyWithAccess =
  FeServiceInstanceCompanyWithAccess & {
    acmpFilterType: AcmpFilterType;
    acmpFilterValue1: string;
    acmpFilterValue2: string;
    canViewDashboard: boolean;
    canViewClients: boolean;
    canViewClientCommands: boolean;
    canViewRollouts: boolean;
    canPushClientCommands: boolean;
    canPushRollouts: boolean;
  };

export type FeWeclappServiceInstanceCompanyWithAccess =
  FeServiceInstanceCompanyWithAccess & {
    weclappFilterType: WeclappFilterType;
    weclappFilterValue1: string;
    canViewDashboard: boolean;
    canViewQuotations: boolean;
    canViewSalesOrders: boolean;
    canViewInvoices: boolean;
  };
