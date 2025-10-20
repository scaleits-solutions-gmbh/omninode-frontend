import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@repo/pkg-frontend-common-kit/components";

export interface ColumnProps {
  onViewDetails: (user: PlatformUser) => void;
}

export interface PlatformUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export const createColumns = (props: ColumnProps): ColumnDef<PlatformUser>[] => {
  return [
    {
      size: 50,
      minSize: 150,
      header: "User",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={""} />
              <AvatarFallback seed={row.original.id}>{row.original.firstName.charAt(0) + row.original.lastName.charAt(0)}</AvatarFallback>
            </Avatar>
            {row.original.firstName} {row.original.lastName}
          </div>
        );
      },
    },
    {
      size: 49,
      minSize: 100,
      header: "Email",
      accessorKey: "email",
    },
    {
      size: 1,
      minSize: 60,
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex justify-end">
            <Button
              variant="secondary"
              size="icon"
              className="cursor-pointer"
              onClick={() => props.onViewDetails(row.original)}
            >
              <Eye />
            </Button>
          </div>
        );
      },
    },
  ];
};
