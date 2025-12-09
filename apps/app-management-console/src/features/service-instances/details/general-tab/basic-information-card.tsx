import { Badge, Card, CardHeader, CardTitle, CardContent } from "@repo/pkg-frontend-common-kit/components";
import {
  ComposedOrganizationServiceInstanceReadModel,
  serviceName,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { Info } from "lucide-react";
import Image from "next/image";

/*
contains logo of the service type, name of the service instance and description of the service instance.
There is a button to edit the basic information.
*/

interface BasicInformationCardProps {
  serviceInstance: ComposedOrganizationServiceInstanceReadModel;
}

export default function BasicInformationCard({
  serviceInstance,
}: BasicInformationCardProps) {
  const serviceNameLabel = serviceName(serviceInstance.service);
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-3">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-md bg-muted">
            <Image
              src={`/management-console/assets/services/${serviceInstance.service.toLowerCase()}.svg`}
              alt="ACMP"
              width={32}
              height={32}
            />
          </div>
          <div className="flex flex-col gap-1">
            <CardTitle className="text-base leading-tight">
              {serviceInstance.serviceInstanceName}
            </CardTitle>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{serviceNameLabel} Service</span>
              <Badge variant="success">Active</Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Info className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">
              Description:
            </span>
          </div>
          <p className="text-sm text-foreground max-w-2xl">
            {serviceInstance.serviceInstanceDescription}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
