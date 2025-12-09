import {
  Badge,
  Checkbox
} from "@repo/pkg-frontend-common-kit/components";
import type { AcmpRolloutTemplateListItemReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { ColumnDef } from "@tanstack/react-table";


// Define the table meta interface for proper typing
interface TableMeta {
  selectedRollout: AcmpRolloutTemplateListItemReadModel | undefined;
  onSelectionChange: (rollout: AcmpRolloutTemplateListItemReadModel | undefined) => void;
}
export const columns: ColumnDef<AcmpRolloutTemplateListItemReadModel>[] = [
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