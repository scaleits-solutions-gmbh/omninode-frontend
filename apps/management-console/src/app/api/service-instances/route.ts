import { NextResponse } from "next/server";
import { Service, PaginatedResponse, ServiceInstanceStatus} from "@scaleits-solutions-gmbh/services";
import { FeServiceInstance } from "@/types/feServiceInstance";


type ServiceInstanceResponse = PaginatedResponse<FeServiceInstance>;


const mockServiceInstances: ServiceInstanceResponse = {
  items: [
    {
      id: "1",
      instanceName: "ScaleITS Weclapp Prod",
      sourceCompanyId: "16c963db-1f1e-4f41-98f3-c6d13470090a",
      sourceCompanyName: "ScaleITS",
      sourceCompanyEmail: "info@scaleits.com",
      service: Service.Weclapp,
      status: ServiceInstanceStatus.Active,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: "1",
      updatedBy: "1",
    },
    {
      id: "2",
      instanceName: "ScaleITS Weclapp Dev",
      sourceCompanyId: "16c963db-1f1e-4f41-98f3-c6d13470090a",
      sourceCompanyName: "ScaleITS",
      sourceCompanyEmail: "info@scaleits.com",
      service: Service.Weclapp,
      status: ServiceInstanceStatus.Active,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: "1",
      updatedBy: "1",
    },
    {
      id: "3",
      instanceName: "ScaleITS ACMP Prod",
      sourceCompanyId: "16c963db-1f1e-4f41-98f3-c6d13470090a",
      sourceCompanyName: "ScaleITS",
      sourceCompanyEmail: "info@scaleits.com",
      service: Service.Acmp,
      status: ServiceInstanceStatus.Active,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: "1",
      updatedBy: "1",
    },
    {
      id: "4",
      instanceName: "Cosmneo ACMP Dev",
      sourceCompanyId: "31c963db-1f1e-4f41-98f3-c6d13470000a",
      sourceCompanyName: "Cosmneo",
      sourceCompanyEmail: "info@cosmneo.com",
      service: Service.Acmp,
      status: ServiceInstanceStatus.Active,
      createdAt: new Date(),
      updatedAt: new Date(),  
      createdBy: "1",
      updatedBy: "1",
    },
  ],
  total: 4,
  page: 1,
  pageSize: 10,
  totalPages: 1,
};

export async function GET(): Promise<NextResponse<ServiceInstanceResponse>> {
  return NextResponse.json(mockServiceInstances);
}
