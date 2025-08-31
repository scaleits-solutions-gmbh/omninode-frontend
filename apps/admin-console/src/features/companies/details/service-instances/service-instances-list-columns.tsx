import { formatDate } from "@/lib/utils/misc/date-utils";
import { FeCompanyServiceInstance } from "@/types/fe/fe-company-service-instance";
import { Badge } from "@repo/pkg-frontend-common-kit/components";
import {
  Service,
  ServiceInstanceStatus,
} from "@scaleits-solutions-gmbh/services";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

const getStatusVariant = (status: ServiceInstanceStatus) => {
  switch (status) {
    case ServiceInstanceStatus.Active:
      return "success";
    case ServiceInstanceStatus.Inactive:
      return "secondary";
    case ServiceInstanceStatus.Deleted:
      return "destructive";
    default:
      return "secondary";
  }
};

export const serviceInstancesColumns = (
  sourceCompanyId: string,
): ColumnDef<FeCompanyServiceInstance>[] => [
  {
    accessorKey: "serviceInstanceName",
    header: "Service Instance Name",
    size: 30,
    minSize: 250,
  },
  {
    accessorKey: "service",
    header: "Service",
    size: 15,
    minSize: 120,
    cell: ({ row }) => {
      const service = row.original.service;
      switch (service) {
        case Service.Weclapp:
          return (
            <div className="flex items-center gap-2">
              <Image
                src={`/assets/services/weclapp.svg`}
                alt={service}
                width={16}
                height={16}
              />
              Weclapp
            </div>
          );
        case Service.Acmp:
          return (
            <div className="flex items-center gap-2">
              <Image
                src={`/assets/services/acmp.svg`}
                alt={service}
                width={16}
                height={16}
              />
              ACMP
            </div>
          );
        default:
          return null;
      }
    },
  },
  {
    accessorKey: "source",
    header: "Source",
    size: 25,
    minSize: 200,
    cell: ({ row }) => {
      return row.original.sourceCompanyId === sourceCompanyId ? (
        <Badge variant="default">Direct</Badge>
      ) : (
        <Badge variant="secondary">{row.original.sourceCompanyName}</Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 15,
    minSize: 100,
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={getStatusVariant(status)} className="capitalize">
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    size: 15,
    minSize: 120,
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      return <span className="text-sm">{formatDate(createdAt)}</span>;
    },
  },
];
