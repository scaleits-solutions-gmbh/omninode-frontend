import { ColumnDef } from "@tanstack/react-table";
import { FeRollout } from "@/types/acmp/rollout";
import {
  Badge,
  Checkbox
} from "frontend-common-kit/components";


// Define the table meta interface for proper typing
interface TableMeta {
  selectedRollout: FeRollout | undefined;
  onSelectionChange: (rollout: FeRollout | undefined) => void;
}
export const columns: ColumnDef<FeRollout>[] = [
  {
    size: 40,
    header: "Name",
    accessorKey: "name",
  },
  {
    size: 40,
    header: "OS Edition",
    accessorKey: "osEdition",
    cell: ({ row }) => {
      return <Badge variant="secondary">{row.original.osEdition}</Badge>;
    },
  },
  {
    size: 15,
    header: "Language",
    accessorKey: "language",
  },
  {
    size: 5,
    id: "select",
    header: "Select",
    cell: ({ row, table }) => {
      const selectedRollout = (table.options.meta as TableMeta)
        ?.selectedRollout;
      const onSelectionChange = (table.options.meta as TableMeta)?.onSelectionChange;
      const isSelected = selectedRollout?.id === row.original.id;

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