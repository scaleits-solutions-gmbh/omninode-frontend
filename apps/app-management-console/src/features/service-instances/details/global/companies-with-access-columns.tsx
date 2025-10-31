/* Commented out - service-instances feature
import { FeServiceInstanceOrganizationWithAccess } from "@/types/fe/fe-service-instance";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/pkg-frontend-common-kit/components";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

type ActionsColumnProps = {
  organization: FeServiceInstanceOrganizationWithAccess;
  onOrganizationAccessChange: (organizationIndex: number) => void;
  rowIndex: number;
};

const ActionsColumn = ({
  organization,
  onOrganizationAccessChange,
  rowIndex,
}: ActionsColumnProps) => {
  const router = useRouter();

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => router.push(`/companies/${organization.organizationId}`)}
          >
            Go to organization details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onOrganizationAccessChange(rowIndex)}>
            Edit access
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">
            Revoke access
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const createColumns: (
  onOrganizationAccessChange: (organizationIndex: number) => void,
) => ColumnDef<FeServiceInstanceOrganizationWithAccess>[] = (
  onOrganizationAccessChange,
) => [
  {
    header: "Organization",
    accessorKey: "name",
    minSize: 200,
    size: 30,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Avatar className="size-8 rounded-md">
            <AvatarImage src={row.original.organizationImageUrl} />
            <AvatarFallback seed={row.original.organizationId}>
              {row.original.organizationName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span>{row.original.organizationName}</span>
            <span className="text-sm text-muted-foreground">
              {row.original.organizationEmail}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    header: "Access Granted",
    accessorKey: "accessGrantedAt",
    minSize: 200,
    size: 30,
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      const formattedDate = date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      const formattedTime = date.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      });
      return (
        <div className="flex flex-col">
          <span>{`${formattedDate}, ${formattedTime}`}</span>
          <span className="text-sm text-muted-foreground">
            By {row.original.creatorFirstName} {row.original.creatorLastName}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    minSize: 60,
    size: 5,
    cell: ({ row }) => (
      <ActionsColumn
        organization={row.original}
        onOrganizationAccessChange={onOrganizationAccessChange}
        rowIndex={row.index}
      />
    ),
  },
];
*/
