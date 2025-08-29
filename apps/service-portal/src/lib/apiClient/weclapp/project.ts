import { FeProject } from "@/types/weclapp/project";
import { FeWeclappDocument } from "@/types/weclapp/document";
import { PaginatedResponse } from "@scaleits-solutions-gmbh/services";
import { BaseApiClient } from "@scaleits-solutions-gmbh/api-client";

const apiClient = new BaseApiClient();

export const fetchWeclappProjects = async (
  page: number,
  pageSize: number
): Promise<PaginatedResponse<FeProject>> => {
  return apiClient.get<PaginatedResponse<FeProject>>(`/weclapp/projects`, {
    page,
    pageSize,
  });
};

export const fetchWeclappProjectDocuments = async (
  projectId: string,
  searchText: string,
  page: number,
  pageSize: number
): Promise<PaginatedResponse<FeWeclappDocument>> => {
  return apiClient.get<PaginatedResponse<FeWeclappDocument>>(
    `/weclapp/projects/${projectId}/documents`,
    {
      searchText,
      page,
      pageSize,
    }
  );
};
