import { useCompanyId } from "@/hooks/use-session";
import { FeServiceInstance } from "@/types/fe/fe-service-instance";
import {
  Badge,
  Button,
} from "frontend-common-kit/components";
import { Service } from "@scaleits-solutions-gmbh/services";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ActionsColumn = (serviceInstance: FeServiceInstance) => {
  const router = useRouter();
  return (
    <div className="flex justify-end">
      <Button
        variant="secondary"
        size="icon"
        className="cursor-pointer"
        onClick={() => {
          router.push(`/service-instances/${serviceInstance.id}`);
        }}
      >
        <Eye />
      </Button>
    </div>
  );
};

// Create a proper React component for the source cell
const SourceCellComponent = ({
  row,
}: {
  row: CellContext<FeServiceInstance, unknown>["row"];
}) => {
  const currentCompanyId = useCompanyId();
  if (row.original.sourceCompanyId === currentCompanyId) {
    return <Badge variant="default">Direct</Badge>;
  }
  return <Badge variant="secondary">{row.original.sourceCompanyName}</Badge>;
};

export const columns: ColumnDef<FeServiceInstance>[] = [
  {
    header: "Name",
    accessorKey: "instanceName",
    size: 23.75,
    minSize: 150,
    cell: ({ row }) => {
      const ServiceIcon = (): string => {
        switch (row.getValue("service")) {
          case Service.Weclapp:
            return "/assets/weclapp.svg";
          case Service.Acmp:
            return "/assets/acmp.svg";
          default:
            return "/assets/service-placeholder.svg";
        }
      };
      return (
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-md bg-muted text-muted-foreground flex items-center justify-center">
            <Image
              src={ServiceIcon()}
              alt={row.getValue("service") as string}
              width={16}
              height={16}
            />
          </div>
          {row.original.instanceName}
        </div>
      );
    },
  },
  {
    header: "Service",
    accessorKey: "service",
    size: 23.75,
    minSize: 150,
  },
  {
    header: "Source",
    accessorKey: "source",
    size: 23.75,
    minSize: 150,
    cell: ({ row }) => <SourceCellComponent row={row} />,
  },
  {
    header: "Status",
    accessorKey: "status",
    size: 23.75,
    minSize: 120,
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={status === "active" ? "success" : "error"}>
          {status === "active" ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
    size: 23.75,
    minSize: 120,
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt");
      if (createdAt && typeof createdAt === "string") {
        try {
          const date = new Date(createdAt);
          const formattedDate = date.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
          const formattedTime = date.toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
          });
          return <div>{`${formattedDate}, ${formattedTime}`}</div>;
        } catch (error) {
          console.error("Error formatting date:", error);
          return <div>{createdAt}</div>; // Fallback to original string if formatting fails
        }
      }
      return <div>{createdAt as string}</div>;
    },
  },
  {
    id: "actions",
    size: 5,
    minSize: 60,
    cell: ({ row }) => ActionsColumn(row.original),
  },
];
