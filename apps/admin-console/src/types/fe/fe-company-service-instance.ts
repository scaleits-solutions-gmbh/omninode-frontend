import {
  Service,
  ServiceInstanceStatus,
} from "@scaleits-solutions-gmbh/services";

export type FeCompanyServiceInstance = {
  id: string;
  serviceInstanceName: string;
  service: Service;
  serviceInstanceId: string;
  sourceCompanyId: string;
  sourceCompanyName: string;
  status: ServiceInstanceStatus;
  createdAt: string;
  updatedAt: string;
};
