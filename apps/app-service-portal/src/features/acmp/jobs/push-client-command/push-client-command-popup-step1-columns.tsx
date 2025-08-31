import { ColumnDef } from "@tanstack/react-table";
import { FeClientCommand } from "@/types/acmp/client-command";
import {
  Checkbox
} from "../../../../../../../packages/frontend-common-kit/dist/components";


// Define the table meta interface for proper typing
interface TableMeta {
  selectedClientCommand: FeClientCommand | undefined;
  onSelectionChange: (clientCommand: FeClientCommand | undefined) => void;
}

export const columns: ColumnDef<FeClientCommand>[] = [
  {
    size: 50,
    header: "Name",
    accessorKey: "name",
  },
  {
    size: 50,
    header: "Version",
    accessorKey: "version",
  },
  {
    id: "select",
    header: "Select",
    cell: ({ row, table }) => {
      const selectedClientCommand = (table.options.meta as TableMeta)
        ?.selectedClientCommand;
      const onSelectionChange = (table.options.meta as TableMeta)?.onSelectionChange;
      const isSelected = selectedClientCommand?.id === row.original.id;

      return (
        <div className="flex justify-end pr-2">
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked) => {
            if (checked) {
              onSelectionChange(row.original);
            } else if (isSelected) {
              onSelectionChange(undefined);
            }
          }}
        />
        </div>
      );
    },
  },
];
