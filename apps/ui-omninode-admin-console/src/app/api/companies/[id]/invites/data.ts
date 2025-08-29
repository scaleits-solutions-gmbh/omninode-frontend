import { FeUserInvite } from "@/types/fe/feUserInvite";
import { PaginatedResponse, ManagementConsoleAccess } from "@scaleits-solutions-gmbh/services";

const mockData: FeUserInvite[] = [
  {
    id: "1",
    email: "john.doe@example.com",
    managementConsoleAccess: ManagementConsoleAccess.Admin,
    createdAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "2", 
    email: "jane.smith@company.com",
    managementConsoleAccess: ManagementConsoleAccess.User,
    createdAt: "2024-01-14T14:20:00Z"
  },
  {
    id: "3",
    email: "michael.johnson@business.org",
    managementConsoleAccess: ManagementConsoleAccess.User,
    createdAt: "2024-01-13T09:15:00Z"
  },
  {
    id: "4",
    email: "sarah.wilson@enterprise.net",
    managementConsoleAccess: ManagementConsoleAccess.Admin,
    createdAt: "2024-01-12T16:45:00Z"
  },
  {
    id: "5",
    email: "david.brown@tech.io",
    managementConsoleAccess: ManagementConsoleAccess.User,
    createdAt: "2024-01-11T11:30:00Z"
  },
  {
    id: "6",
    email: "emily.davis@startup.co",
    managementConsoleAccess: ManagementConsoleAccess.User,
    createdAt: "2024-01-10T13:20:00Z"
  },
  {
    id: "7",
    email: "alex.rodriguez@corp.com",
    managementConsoleAccess: ManagementConsoleAccess.Admin,
    createdAt: "2024-01-09T08:10:00Z"
  },
  {
    id: "8",
    email: "lisa.martinez@solutions.biz",
    managementConsoleAccess: ManagementConsoleAccess.User,
    createdAt: "2024-01-08T15:25:00Z"
  }
];

export const getMockData = ({page, pageSize, search}: {page: number, pageSize: number, search?: string}): PaginatedResponse<FeUserInvite> => {
  // Filter data based on search query
  const filteredData = search 
    ? mockData.filter(invite => 
        invite.email.toLowerCase().includes(search.toLowerCase())
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
    totalPages
  };
}