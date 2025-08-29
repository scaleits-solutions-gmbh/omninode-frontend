import { type ColumnDef } from "@tanstack/react-table";
import { FeUser } from "@/types/feUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "@/lib/apiClient/user-settings/profile";

const ActionsColumn = (user: FeUser) => {
  const router = useRouter();
  const { data: userProfile } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => fetchUserProfile(),
    retry: false,
  });
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" onClick={() => {
        if (user.id === userProfile?.id) {
          router.push(`/personal-settings`);
        } else {
          router.push(`/users/${user.UserCompanyId}`);
        }
      }}>
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
      return <div>{(row.getValue("managementConsoleAccess") as string).charAt(0).toUpperCase() + (row.getValue("managementConsoleAccess") as string).slice(1)}</div>;
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
          const formattedDate = date.toISOString().split('T')[0];
          const formattedTime = date.toTimeString().split(' ')[0];
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
