import { ColumnDef } from "@tanstack/react-table";
import { FeClient } from "@/types/acmp/client";
import {
  Checkbox
} from "frontend-common-kit/components";

// Define the table meta interface for proper typing
interface TableMeta {
  selectedClients: FeClient[] | undefined;
  onSelectionChange: (clients: FeClient[] | undefined) => void;
}

export const columns: ColumnDef<FeClient>[] = [
  {
    size: 50,
    header: "Computer Name",
    accessorKey: "computerName",
  },
  {
    size: 48,
    header: "Tenant",
    accessorKey: "name",
  },
  {
    size: 2,
    id: "select",
    header: "Select",
    cell: ({ row, table }) => {
      const selectedClients = (table.options.meta as TableMeta)?.selectedClients || [];
      const onSelectionChange = (table.options.meta as TableMeta)?.onSelectionChange;
      const isSelected = selectedClients.some((client: FeClient) => client.id === row.original.id);
      
      return (
        <div className="flex justify-end pr-2">
          <Checkbox
            checked={isSelected}
            onCheckedChange={(checked) => {
              if (checked) {
                onSelectionChange([...selectedClients, row.original]);
              } else {
                onSelectionChange(selectedClients.filter((client: FeClient) => client.id !== row.original.id));
              }
            }}
          />
        </div>
      );
    },
  },
];