import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/pkg-frontend-common-kit/components";
import {
  ComposedOrganizationServiceInstanceListItemReadModel,
  OrganizationServiceInstanceStatus,
  Service,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Layers2, MoreVertical } from "lucide-react";
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

export interface ColumnProps {
  onViewDetails: (serviceInstance: ComposedOrganizationServiceInstanceListItemReadModel) => void;
}

export const createColumns = (
  props: ColumnProps
): ColumnDef<ComposedOrganizationServiceInstanceListItemReadModel>[] => {
  return [
    {
      size: 30,
      minSize: 200,
      header: "Name",
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
      size: 20,
      minSize: 120,
      header: "Service",
      cell: ({ row }) => {
        return (
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
        );
      },
    },
    {
      size: 20,
      minSize: 150,
      header: "Source",
      cell: ({ row }) => {
        const isDirect =
          row.original.providerOrganizationId === row.original.organizationId;
        return (
          <div className="text-sm text-muted-foreground">
            {isDirect ? (
              <Badge variant="default">Direct</Badge>
            ) : (
              row.original.providerOrganizationName
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      size: 15,
      minSize: 100,
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge
            variant={status === OrganizationServiceInstanceStatus.Active ? "success" : "secondary"}
          >
            {status === OrganizationServiceInstanceStatus.Active ? "Active" : "Inactive"}
          </Badge>
        );
      },
    },
    {
      size: 1,
      minSize: 60,
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => props.onViewDetails(row.original)}>
                  <Eye className="mr-2 h-4 w-4" />
                  View details
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
};

