import { FeUser } from "@/types/fe/fe-user";
import {
  ManagementConsoleAccess,
  PaginatedResponse,
  UserCompanyStatus,
} from "@scaleits-solutions-gmbh/services";
import { NextRequest, NextResponse } from "next/server";

const mockData: PaginatedResponse<FeUser> = {
  items: [
    {
      id: "101",
      UserCompanyId: "201",
      imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
      email: "emily.stevens@scaleits.com",
      firstName: "Emily",
      middleNames: "",
      lastName: "Stevens",
      position: "Technical",
      managementConsoleAccess: ManagementConsoleAccess.Admin,
      status: UserCompanyStatus.ACTIVE,
      lastSeenAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "102",
      UserCompanyId: "202",
      imageUrl: "https://randomuser.me/api/portraits/men/45.jpg",
      email: "john.smith@scaleits.com",
      firstName: "John",
      middleNames: "",
      lastName: "Smith",
      position: "Finance",
      managementConsoleAccess: ManagementConsoleAccess.User,
      status: UserCompanyStatus.ACTIVE,
      lastSeenAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  total: 2,
  page: 1,
  pageSize: 10,
  totalPages: 1,
};

export async function GET(
  request: NextRequest,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: any,
) {
  const { id } = await params;
  console.log("Mock users without access for service instance:", id);
  return NextResponse.json(mockData);
}
