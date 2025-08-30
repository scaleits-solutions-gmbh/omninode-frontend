import { FeCompanyServiceInstance } from "@/types/fe/fe-company-service-instance";
import {
  PaginatedResponse,
  Service,
  ServiceInstanceStatus,
} from "@scaleits-solutions-gmbh/services";

const mockData: FeCompanyServiceInstance[] = [
  {
    id: "1",
    serviceInstanceName: "ACMP Production Instance",
    service: Service.Acmp,
    serviceInstanceId: "acmp-prod-001",
    sourceCompanyId: "comp-123",
    sourceCompanyName: "TechCorp Solutions",
    status: ServiceInstanceStatus.Active,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T14:25:00Z",
  },
  {
    id: "2",
    serviceInstanceName: "WeCLAPP Development",
    service: Service.Weclapp,
    serviceInstanceId: "weclapp-dev-002",
    sourceCompanyId: "comp-456",
    sourceCompanyName: "Digital Innovations Ltd",
    status: ServiceInstanceStatus.Active,
    createdAt: "2024-01-14T09:15:00Z",
    updatedAt: "2024-01-19T16:45:00Z",
  },
  {
    id: "3",
    serviceInstanceName: "API Connector Staging",
    service: Service.Acmp,
    serviceInstanceId: "api-conn-staging-003",
    sourceCompanyId: "comp-789",
    sourceCompanyName: "Enterprise Systems Inc",
    status: ServiceInstanceStatus.Inactive,
    createdAt: "2024-01-12T11:20:00Z",
    updatedAt: "2024-01-18T13:30:00Z",
  },
  {
    id: "4",
    serviceInstanceName: "ACMP Testing Environment",
    service: Service.Acmp,
    serviceInstanceId: "acmp-test-004",
    sourceCompanyId: "comp-321",
    sourceCompanyName: "StartupHub Co",
    status: ServiceInstanceStatus.Active,
    createdAt: "2024-01-10T15:45:00Z",
    updatedAt: "2024-01-17T10:15:00Z",
  },
  {
    id: "5",
    serviceInstanceName: "WeCLAPP Production Suite",
    service: Service.Weclapp,
    serviceInstanceId: "weclapp-prod-005",
    sourceCompanyId: "comp-654",
    sourceCompanyName: "Manufacturing Plus",
    status: ServiceInstanceStatus.Active,
    createdAt: "2024-01-08T12:30:00Z",
    updatedAt: "2024-01-16T09:20:00Z",
  },
  {
    id: "6",
    serviceInstanceName: "Legacy API Bridge",
    service: Service.Acmp,
    serviceInstanceId: "api-legacy-006",
    sourceCompanyId: "comp-987",
    sourceCompanyName: "Global Trade Partners",
    status: ServiceInstanceStatus.Inactive,
    createdAt: "2024-01-05T08:10:00Z",
    updatedAt: "2024-01-15T14:40:00Z",
  },
  {
    id: "7",
    serviceInstanceName: "ACMP Analytics Platform",
    service: Service.Acmp,
    serviceInstanceId: "acmp-analytics-007",
    sourceCompanyId: "comp-135",
    sourceCompanyName: "Data Insights Corp",
    status: ServiceInstanceStatus.Active,
    createdAt: "2024-01-03T13:25:00Z",
    updatedAt: "2024-01-14T11:50:00Z",
  },
  {
    id: "8",
    serviceInstanceName: "WeCLAPP Mobile Integration",
    service: Service.Weclapp,
    serviceInstanceId: "weclapp-mobile-008",
    sourceCompanyId: "comp-246",
    sourceCompanyName: "Mobile First Solutions",
    status: ServiceInstanceStatus.Inactive,
    createdAt: "2024-01-01T16:00:00Z",
    updatedAt: "2024-01-12T12:15:00Z",
  },
];

export const getMockData = ({
  page,
  pageSize,
  search,
}: {
  page: number;
  pageSize: number;
  search?: string;
}): PaginatedResponse<FeCompanyServiceInstance> => {
  // Filter data based on search query
  const filteredData = search
    ? mockData.filter(
        (instance) =>
          instance.serviceInstanceName
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          instance.service.toLowerCase().includes(search.toLowerCase()) ||
          instance.sourceCompanyName
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          instance.status.toLowerCase().includes(search.toLowerCase()),
      )
    : mockData;

  // Calculate pagination
  const total = filteredData.length;
  const totalPages = Math.ceil(total / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const items = filteredData.slice(startIndex, endIndex);

  return {
    items,
    total,
    page,
    pageSize,
    totalPages,
  };
};
