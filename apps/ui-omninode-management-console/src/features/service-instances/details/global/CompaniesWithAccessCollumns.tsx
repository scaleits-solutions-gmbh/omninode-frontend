import { FeServiceInstanceCompanyWithAccess } from "@/types/feServiceInstance";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

type ActionsColumnProps = {
  company: FeServiceInstanceCompanyWithAccess;
  onCompanyAccessChange: (companyIndex: number) => void;
  rowIndex: number;
};

const ActionsColumn = ({ company, onCompanyAccessChange, rowIndex }: ActionsColumnProps) => {
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
          <DropdownMenuItem onClick={() => router.push(`/companies/${company.companyId}`)}>
            Go to company details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onCompanyAccessChange(rowIndex)}>
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

export const createColumns: (onCompanyAccessChange: (companyIndex: number) => void) => ColumnDef<FeServiceInstanceCompanyWithAccess>[] = (onCompanyAccessChange) => [
  {
    header: "Company",
    accessorKey: "name",
    minSize: 200,
    size: 30,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Avatar className="size-8 rounded-md">
            <AvatarImage src={row.original.companyImageUrl} />
            <AvatarFallback seed={row.original.companyId}>
              {row.original.companyName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span>{row.original.companyName}</span>
            <span className="text-sm text-muted-foreground">{row.original.companyEmail}</span>
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
        company={row.original}
        onCompanyAccessChange={onCompanyAccessChange}
        rowIndex={row.index}
      />
    ),
  },
];
