import { ColumnDef } from "@tanstack/react-table";
import { AcmpRolloutTemplateListItem } from "@repo/lib-api-client";
import {
  Badge,
  Checkbox
} from "@repo/pkg-frontend-common-kit/components";


// Define the table meta interface for proper typing
interface TableMeta {
  selectedRollout: AcmpRolloutTemplateListItem | undefined;
  onSelectionChange: (rollout: AcmpRolloutTemplateListItem | undefined) => void;
}
export const columns: ColumnDef<AcmpRolloutTemplateListItem>[] = [
  {
    size: 40,
    header: "Name",
    accessorKey: "name",
  },
  {
    size: 40,
    header: "OS",
    accessorKey: "os",
    cell: ({ row }) => {
      return <Badge variant="secondary">{row.original.os}</Badge>;
    },
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