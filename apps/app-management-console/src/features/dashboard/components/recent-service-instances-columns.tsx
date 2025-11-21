"use client";

import { Badge } from "@repo/pkg-frontend-common-kit/components";
import { ColumnDef } from "@tanstack/react-table";
import {
  OrganizationServiceInstanceListItemReadModel,
  OrganizationServiceInstanceStatus,
  Service,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { Layers2 } from "lucide-react";
import Image from "next/image";

function getServiceIcon(service: Service): string {
  switch (service) {
    case Service.Weclapp:
      return "/management-console/assets/weclapp.svg";
    case Service.Acmp:
      return "/management-console/assets/acmp.svg";
  }
}

function getServiceDisplayName(service: Service): string {
  switch (service) {
    case Service.Weclapp:
      return "Weclapp";
    case Service.Acmp:
      return "ACMP";
    default:
      return service;
  }
}

export const recentServiceInstancesColumns: ColumnDef<OrganizationServiceInstanceListItemReadModel>[] = [
  {
    accessorKey: "serviceInstanceName",
    header: "Name",
    size: 50,
    minSize: 220,
    cell: ({ row }) => {
      const serviceInstance = row.original;
      return (
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-md bg-muted text-muted-foreground flex items-center justify-center">
            <Layers2 className="h-4 w-4" />
          </div>
          <span className="font-medium">{serviceInstance.serviceInstanceName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "service",
    header: "Type",
    size: 25,
    minSize: 140,
    cell: ({ row }) => (
      <Badge variant="outline">
        <Image
          src={getServiceIcon(row.original.service)}
          alt={getServiceDisplayName(row.original.service)}
          width={14}
          height={14}
          className="mr-1"
        />
        {getServiceDisplayName(row.original.service)}
      </Badge>
    ),
  },
  {
    id: "status",
    header: () => <div className="text-right">Status</div>,
    size: 25,
    minSize: 140,
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <div className="text-right">
          <Badge
            variant={status === OrganizationServiceInstanceStatus.Active ? "success" : "secondary"}
          >
            {status === OrganizationServiceInstanceStatus.Active ? "Active" : "Inactive"}
          </Badge>
        </div>
      );
    },
  },
];


