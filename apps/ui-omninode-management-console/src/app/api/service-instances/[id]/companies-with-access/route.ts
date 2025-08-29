import { NextResponse } from "next/server";
import { AcmpFilterType, PaginatedResponse, Service, ServiceInstanceStatus, WeclappFilterType } from "@scaleits-solutions-gmbh/services";
import { FeAcmpServiceInstanceCompanyWithAccess, FeWeclappServiceInstanceCompanyWithAccess } from "@/types/feServiceInstance";

const mockAcmpData: PaginatedResponse<FeAcmpServiceInstanceCompanyWithAccess> = {
  items: [
    {
      id: "13214124",
      serviceInstanceId: "1123123",
      serviceInstanceName: "Service Instance 1",
      serviceInstanceService: Service.Weclapp,
      serviceInstanceStatus: ServiceInstanceStatus.Active,
      companyId: "123123123123",
      companyImageUrl: "https://via.placeholder.com/150",
      companyName: "ScaleITS",
      companyEmail: "info@scaleits.com",
      creatorFirstName: "John",
      creatorLastName: "Doe",
      creatorEmail: "john.doe@example.com",
      createdAt: new Date(),
      createdBy: "1",
      creatorImageUrl: "https://via.placeholder.com/150",
      acmpFilterType: AcmpFilterType.Tenant,
      acmpFilterValue1: "1",
      acmpFilterValue2: "2",
      canViewDashboard: true,
      canViewClients: true,
      canViewClientCommands: true,
      canViewRollouts: true,
      canPushClientCommands: true,
      canPushRollouts: true,
    },
  ],
  total: 1,
  page: 1,
  pageSize: 10,
  totalPages: 1,
};

const mockWeclappData: PaginatedResponse<FeWeclappServiceInstanceCompanyWithAccess> = {
  items: [
    {
      id: "13214124",
      serviceInstanceId: "1123123",
      serviceInstanceName: "Service Instance 1",
      serviceInstanceService: Service.Weclapp,
      serviceInstanceStatus: ServiceInstanceStatus.Active,
      companyId: "123123123123",
      companyImageUrl: "https://via.placeholder.com/150",
      companyName: "ScaleITS",
      companyEmail: "info@scaleits.com",
      creatorFirstName: "John",
      creatorLastName: "Doe",
      creatorEmail: "john.doe@example.com",
      createdAt: new Date(),
      createdBy: "1",
      creatorImageUrl: "https://via.placeholder.com/150",
      weclappFilterType: WeclappFilterType.None,
      weclappFilterValue1: "",
      canViewDashboard: true,
      canViewQuotations: true,
      canViewSalesOrders: true,
      canViewInvoices: true,
    },
  ],
  total: 1,
  page: 1,
  pageSize: 10,
  totalPages: 1,
};

export async function GET() {
  console.log(mockWeclappData);
  return NextResponse.json(mockAcmpData);
} 