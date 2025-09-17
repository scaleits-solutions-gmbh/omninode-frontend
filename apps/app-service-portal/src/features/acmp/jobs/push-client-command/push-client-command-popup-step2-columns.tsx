import { ColumnDef } from "@tanstack/react-table";
import { AcmpClientListItem } from "@repo/lib-api-client";
import {
  Checkbox
} from "@repo/pkg-frontend-common-kit/components";

// Define the table meta interface for proper typing
interface TableMeta {
  selectedClients: AcmpClientListItem[] | undefined;
  onSelectionChange: (clients: AcmpClientListItem[] | undefined) => void;
}

export const columns: ColumnDef<AcmpClientListItem>[] = [
  {
    size: 30,
    header: "Computer Name",
    accessorKey: "name",
  },
  {
    size: 35,
    header: "Tenant",
    accessorKey: "tenantName",
  },
  {
    size: 5,
    id: "select",
    header: "Select",
    cell: ({ row, table }) => {
      const selectedClients = (table.options.meta as TableMeta)?.selectedClients || [];
      const onSelectionChange = (table.options.meta as TableMeta)?.onSelectionChange;
      const isSelected = selectedClients.some((client: AcmpClientListItem) => client.id === row.original.id);
      
      return (
        <div className="flex justify-end pr-2">
          <Checkbox
            checked={isSelected}
            onCheckedChange={(checked) => {
              if (checked) {
              onSelectionChange([...selectedClients, row.original]);
              } else {
              onSelectionChange(selectedClients.filter((client: AcmpClientListItem) => client.id !== row.original.id));
              }
            }}
          />
        </div>
      );
    },
  },
];