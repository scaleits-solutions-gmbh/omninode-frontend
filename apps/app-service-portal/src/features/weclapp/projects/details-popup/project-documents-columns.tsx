import { ColumnDef } from "@tanstack/react-table";
import { FeWeclappDocument } from "@/types/weclapp/document";
import { Download } from "lucide-react";
import {
  Button
} from "../../../../../../../packages/frontend-common-kit/dist/components";


export const projectDocumentsColumns: ColumnDef<FeWeclappDocument>[] = [
  {
    size: 40,
    minSize: 250,
    header: "Name",
    accessorKey: "name",
  },
  {
    size: 27.5,
    minSize: 200,
    header: "Document Type",
    accessorKey: "documentType",
  },
  {
    size: 27.5,
    minSize: 200,
    header: "Size",
    accessorKey: "size",
  },
  {
    size: 5,
    minSize: 60,
    id: "actions",
    cell: () => {
      return (
        <div className="flex justify-end">
          <Button variant="secondary" size="icon" className="w-8 h-8">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];