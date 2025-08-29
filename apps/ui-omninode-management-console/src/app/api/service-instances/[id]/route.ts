import { NextResponse } from "next/server";
import {
  Service,
  ServiceInstanceStatus,
} from "@scaleits-solutions-gmbh/services";
import {
  FeAcmpServiceInstanceDetails,
  FeWeclappServiceInstanceDetails,
} from "@/types/feServiceInstance";

const mockAcmpServiceInstance: FeAcmpServiceInstanceDetails = {
  id: "1",
  instanceName: "ScaleITS Acmp Prod",
  sourceCompanyId: "16c963db-1f1e-4f41-98f3-c6d13470090a",
  sourceCompanyName: "ScaleITS",
  sourceCompanyEmail: "info@scaleits.com",
  service: Service.Acmp,
  status: ServiceInstanceStatus.Active,
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: "John Doe",
  updatedBy: "John Doe",
  hostName: "https://scaleits.acmp.com",
  apiKey: "650e8440-f49b-53d4-e516-886655440000",
  acmpConnectorVersion: "1.0.0",
  acmpServerVersion: "4.7.0",
  connectionStatus: "connected",
};

const mockWeclappServiceInstance: FeWeclappServiceInstanceDetails = {
  id: "1",
  instanceName: "ScaleITS Weclapp Prod",
  sourceCompanyId: "16c963db-1f1e-4f41-98f3-c6d13470090a",
  sourceCompanyName: "ScaleITS",
  sourceCompanyEmail: "info@scaleits.com",
  service: Service.Weclapp,
  status: ServiceInstanceStatus.Active,
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: "John Doe",
  updatedBy: "John Doe",
  hostName: "https://scaleits.weclapp.com",
  apiKey: "550e8400-e29b-41d4-a716-446655440000",
  connectionStatus: "connected",
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
): Promise<
  NextResponse<FeAcmpServiceInstanceDetails | FeWeclappServiceInstanceDetails>
> {
  const { id } = params;
  
  // For demo purposes, return ACMP instance for even IDs and Weclapp for odd IDs

  return NextResponse.json(mockAcmpServiceInstance);
}
