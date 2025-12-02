import {
  Checkbox
} from "@repo/pkg-frontend-common-kit/components";
import type { AcmpClientCommandListItemReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { ColumnDef } from "@tanstack/react-table";


// Define the table meta interface for proper typing
interface TableMeta {
  selectedClientCommand: AcmpClientCommandListItemReadModel | undefined;
  onSelectionChange: (clientCommand: AcmpClientCommandListItemReadModel | undefined) => void;
}

export const columns: ColumnDef<AcmpClientCommandListItemReadModel>[] = [
  {
    size: 50,
    header: "Name",
    accessorKey: "name",
  },
  {
    size: 50,
    header: "Version",
    // Generate consistent pseudo-random number 1-4 based on ID mocked for now
    cell: ({ row }) => {
      // Generate consistent pseudo-random number 1-4 based on ID
      const generateVersionFromId = (id: string): number => {
        let hash = 0;
        for (let i = 0; i < id.length; i++) {
          const char = id.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash = hash & hash; // Convert to 32-bit integer
        }
        // Ensure positive number and map to 1-4 range
        const positiveHash = Math.abs(hash);
        return (positiveHash % 4) + 1;
      };

      const version = generateVersionFromId(row.original.id);
      return <div>{version}</div>;
    },
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
