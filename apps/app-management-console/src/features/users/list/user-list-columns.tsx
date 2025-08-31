import { FeUser } from "@/types/fe/fe-user";
import {
  Button,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
} from "frontend-common-kit";
import { type ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

const ActionsColumn = (user: FeUser) => {
  const router = useRouter();

  return (
    <div className="flex justify-end">
      <Button
        variant="secondary"
        size="icon"
        className="cursor-pointer"
        onClick={() => {
          router.push(`/users/${user.UserCompanyId}`);
        }}
      >
        <Eye />
      </Button>
    </div>
  );
};

export const collumns: ColumnDef<FeUser>[] = [
  {
    header: "Name",
    accessorKey: "name",
    minSize: 200,
    size: 25, // 25% of table width
    cell: ({ row }) => {
      console.log(row.original.id);
      return (
        <div className="flex items-center gap-2">
          <Avatar className="size-8 rounded-full">
            <AvatarImage src={row.original.imageUrl} />
            <AvatarFallback seed={row.original.id}>
              {row.original.firstName.charAt(0) +
                row.original.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          {row.original.firstName + " " + row.original.lastName}
        </div>
      );
    },
  },
  {
    header: "Email",
    accessorKey: "email",
    minSize: 200,
    size: 25, // 25% of table width
    cell: ({ row }) => {
      return <div>{row.getValue("email")}</div>;
    },
  },
  {
    header: "Access Level",
    accessorKey: "managementConsoleAccess",
    minSize: 150,
    size: 15, // 15% of table width
    cell: ({ row }) => {
      return (
        <div>
          {(row.getValue("managementConsoleAccess") as string)
            .charAt(0)
            .toUpperCase() +
            (row.getValue("managementConsoleAccess") as string).slice(1)}
        </div>
      );
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    minSize: 150,
    size: 15, // 15% of table width
    cell: ({ row }) => {
      const status = row.getValue("status");
      if (status === "active") {
        return <Badge variant="success">Active</Badge>;
      } else if (status === "inactive") {
        return <Badge variant="error">Inactive</Badge>;
      }
      return <Badge variant="secondary">{row.getValue("status")}</Badge>;
    },
  },
  {
    header: "Last Seen",
    accessorKey: "lastSeenAt",
    minSize: 150,
    size: 15, // 15% of table width
    cell: ({ row }) => {
      const lastSeenDate = row.getValue("lastSeenAt");
      if (lastSeenDate && typeof lastSeenDate === "string") {
        try {
          const date = new Date(lastSeenDate);
          const formattedDate = date.toISOString().split("T")[0];
          const formattedTime = date.toTimeString().split(" ")[0];
          return <div>{`${formattedDate} ${formattedTime}`}</div>;
        } catch (error) {
          console.error("Error formatting date:", error);
          return <div>{lastSeenDate}</div>;
        }
      }
      return <div>{lastSeenDate as string}</div>;
    },
  },
  {
    id: "actions",
    minSize: 60,
    size: 5, // 5% of table width
    cell: ({ row }) => ActionsColumn(row.original),
  },
];
