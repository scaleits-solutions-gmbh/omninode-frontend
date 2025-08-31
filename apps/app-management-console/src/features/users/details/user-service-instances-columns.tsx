import { useCompanyId } from "@/hooks/use-session";
import { FeServiceInstance } from "@/types/fe/fe-service-instance";
import {
  Button,
  Badge,
} from "@repo/pkg-frontend-common-kit/components";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const SourceCell = (serviceInstance: FeServiceInstance) => {
  const currentCompanyId = useCompanyId();

  return (
    <>
      {currentCompanyId === serviceInstance.sourceCompanyId ? (
        <Badge>Direct</Badge>
      ) : (
        <Badge variant="outline">{serviceInstance.sourceCompanyName}</Badge>
      )}
    </>
  );
};

const ActionsCell = (serviceInstance: FeServiceInstance) => {
  const router = useRouter();
  return (
    <div className="flex justify-end">
      <Button
        size="icon"
        variant="secondary"
        className="cursor-pointer"
        onClick={() => router.push(`/service-instances/${serviceInstance.id}`)}
      >
        <EyeIcon className="size-4" />
      </Button>
    </div>
  );
};

const StatusCell = (serviceInstance: FeServiceInstance) => {
  return <Badge>{serviceInstance.status}</Badge>;
};

export const Columns: ColumnDef<FeServiceInstance>[] = [
  {
    size: 30,
    minSize: 100,
    header: "Name",
    accessorKey: "instanceName",
  },
  {
    size: 20,
    minSize: 100,
    header: "Service",
    accessorKey: "service",
  },
  {
    size: 20,
    header: "Source",
    accessorKey: "sourceCompanyName",
    cell: ({ row }) => <SourceCell {...row.original} />,
  },
  {
    size: 15,
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => <StatusCell {...row.original} />,
  },
  {
    size: 5,
    minSize: 32,
    id: "actions",
    accessorKey: "actions",
    cell: ({ row }) => <ActionsCell {...row.original} />,
  },
];
