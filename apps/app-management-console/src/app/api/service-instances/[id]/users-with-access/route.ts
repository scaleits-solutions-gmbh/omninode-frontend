import { FeServiceInstanceUserWithAccess } from "@/types/fe/fe-service-instance";
import {
  PaginatedResponse,
  Service,
  ServiceInstanceStatus,
} from "@scaleits-solutions-gmbh/services";
import { NextRequest, NextResponse } from "next/server";

const mockData: PaginatedResponse<FeServiceInstanceUserWithAccess> = {
  items: [
    {
      id: "1",
      serviceInstanceId: "1",
      serviceInstanceName: "Service Instance 1",
      serviceInstanceService: Service.Weclapp,
      serviceInstanceStatus: ServiceInstanceStatus.Active,
      userCompanyId: "1",
      userImageUrl: "https://via.placeholder.com/150",
      userFirstName: "John",
      userLastName: "Doe",
      userEmail: "john.doe@example.com",
      accessGrantedAt: new Date(),
      creatorFirstName: "John",
      creatorLastName: "Doe",
      creatorEmail: "john.doe@example.com",
      createdAt: new Date(),
      createdBy: "1",
      creatorImageUrl: "https://via.placeholder.com/150",
    },
  ],
  total: 1,
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
  console.log(id);
  return NextResponse.json(mockData);
}
