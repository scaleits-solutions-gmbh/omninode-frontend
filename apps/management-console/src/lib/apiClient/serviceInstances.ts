import { FeAcmpServiceInstanceCompanyWithAccess, FeAcmpServiceInstanceDetails, FeServiceInstance, FeServiceInstanceUserWithAccess, FeWeclappServiceInstanceCompanyWithAccess, FeWeclappServiceInstanceDetails } from "@/types/feServiceInstance";
import { FeUser } from "@/types/feUser";
import { BaseApiClient } from "@scaleits-solutions-gmbh/api-client";
import { PaginatedResponse } from "@scaleits-solutions-gmbh/services";
const apiClient = new BaseApiClient();

export const fetchServiceInstances = async (): Promise<PaginatedResponse<FeServiceInstance>> => {
  return apiClient.get<PaginatedResponse<FeServiceInstance>>("/service-instances");
};

export const fetchServiceInstance = async (id: string): Promise<FeAcmpServiceInstanceDetails | FeWeclappServiceInstanceDetails> => {
  return apiClient.get<FeAcmpServiceInstanceDetails | FeWeclappServiceInstanceDetails>(`/service-instances/${id}`);
};

export const fetchServiceInstanceUsersWithAccess = async (id: string): Promise<PaginatedResponse<FeServiceInstanceUserWithAccess>> => {
  return apiClient.get<PaginatedResponse<FeServiceInstanceUserWithAccess>>(`/service-instances/${id}/users-with-access`);
};

export const fetchServiceInstanceCompaniesWithAccess = async (id: string): Promise<PaginatedResponse<FeAcmpServiceInstanceCompanyWithAccess | FeWeclappServiceInstanceCompanyWithAccess>> => {
  return apiClient.get<PaginatedResponse<FeAcmpServiceInstanceCompanyWithAccess | FeWeclappServiceInstanceCompanyWithAccess>>(`/service-instances/${id}/companies-with-access`);
};

export const fetchServiceInstanceUsersWithoutAccess = async (id: string): Promise<PaginatedResponse<FeUser>> => {
  return apiClient.get<PaginatedResponse<FeUser>>(`/service-instances/${id}/users-without-access`);
};