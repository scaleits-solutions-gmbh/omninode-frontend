import { ColumnDef, CellContext } from "@tanstack/react-table";
import { FeCompanyRelationship } from "@/types/feCompanyRelationship";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentCompanyId } from "@/hooks/useCurrentCompany";

// Create cell renderer components that follow React naming conventions
const CompanyCell = (props: CellContext<FeCompanyRelationship, unknown>) => {
  const currentCompanyId = useCurrentCompanyId();
  const isCurrentLeft = props.row.original.leftCompanyId == currentCompanyId;
  console.log(`${props.row.original.leftCompanyId} - ${currentCompanyId}`);
  const companyName = isCurrentLeft
    ? props.row.original.rightCompanyName
    : props.row.original.leftCompanyName;
  const companyId = isCurrentLeft
    ? props.row.original.rightCompanyId
    : props.row.original.leftCompanyId;

  return (
    <div className="flex items-center gap-2">
      <Avatar className="size-8 rounded-md">
        <AvatarFallback seed={companyId}>
          {companyName.charAt(0)}
        </AvatarFallback>
      </Avatar>
      {companyName}
    </div>
  );
};

const RelationshipTypeCell = (
  props: CellContext<FeCompanyRelationship, unknown>
) => {
  const currentCompanyId = useCurrentCompanyId();
  return (
    <Badge variant="secondary">
      {props.row.original.relationshipType === "partner"
        ? "Partner"
        : props.row.original.relationshipType === "serviceProvision" &&
          props.row.original.leftCompanyId == currentCompanyId
        ? "Client"
        : "Provider"}
    </Badge>
  );
};

// Create cell renderer components that follow React naming conventions
const ContactCell = (props: CellContext<FeCompanyRelationship, unknown>) => {
  const currentCompanyId = useCurrentCompanyId();
  const isCurrentLeft = props.row.original.leftCompanyId == currentCompanyId;
  const companyContact = isCurrentLeft
    ? props.row.original.rightCompanyEmail
    : props.row.original.leftCompanyEmail;

  return <div>{companyContact}</div>;
};

export const companyRelationsTableColumns: ColumnDef<FeCompanyRelationship>[] = [
  {
    header: "Company",
    accessorKey: "company",
    cell: CompanyCell,
    size: 40,
    minSize: 150,
  },
  {
    header: "Contact",
    accessorKey: "contact",
    cell: ContactCell,
    size: 30,
    minSize: 120,
  },
  {
    header: "Relationship Type",
    accessorKey: "relationshipType",
    cell: RelationshipTypeCell,
    size: 30,
    minSize: 120,
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
    size: 25,
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
  // Actions column commented out
  /*
  {
    id: "actions",
    cell: () => {
      return (
        <div className="flex justify-end">
          <Button variant="ghost" size="icon">
            <Eye />
          </Button>
        </div>
      );
    },
    size: 5,
    minSize: 60,
  },
  */
];
