import {
  FeAcmpServiceInstanceOrganizationWithAccess,
  FeWeclappServiceInstanceOrganizationWithAccess,
} from "@/types/fe/fe-service-instance";
import {
  AcmpFilterType,
  PaginatedResponse,
  Service,
  ServiceInstanceStatus,
  WeclappFilterType,
} from "@scaleits-solutions-gmbh/services";
import { NextResponse } from "next/server";

const mockAcmpData: PaginatedResponse<FeAcmpServiceInstanceOrganizationWithAccess> =
  {
    items: [
      {
        id: "13214124",
        serviceInstanceId: "1123123",
        serviceInstanceName: "Service Instance 1",
        serviceInstanceService: Service.Weclapp,
        serviceInstanceStatus: ServiceInstanceStatus.Active,
        organizationId: "123123123123",
        organizationImageUrl: "https://via.placeholder.com/150",
        organizationName: "ScaleITS",
        organizationEmail: "info@scaleits.com",
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

const mockWeclappData: PaginatedResponse<FeWeclappServiceInstanceOrganizationWithAccess> =
  {
    items: [
      {
        id: "13214124",
        serviceInstanceId: "1123123",
        serviceInstanceName: "Service Instance 1",
        serviceInstanceService: Service.Weclapp,
        serviceInstanceStatus: ServiceInstanceStatus.Active,
        organizationId: "123123123123",
        organizationImageUrl: "https://via.placeholder.com/150",
        organizationName: "ScaleITS",
        organizationEmail: "info@scaleits.com",
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
