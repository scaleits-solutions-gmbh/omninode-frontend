import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Button, Badge } from "@repo/pkg-frontend-common-kit/components";
import {
  FeedbackListItemReadModel,
  feedbackTypeLabel,
  Locale,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export interface ColumnProps {
  onViewDetails: (feedback: FeedbackListItemReadModel) => void;
}

const MAX_DESCRIPTION_LENGTH = 100;

export const createColumns = (props: ColumnProps): ColumnDef<FeedbackListItemReadModel>[] => {
  return [
    {
      size: 30,
      minSize: 200,
      header: "Title",
      accessorKey: "title",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <div className="size-8 bg-muted rounded-md flex items-center justify-center">
              <span className="text-xs">{row.original.feedbackType.charAt(0).toUpperCase()}</span>
            </div>
            <span className="font-medium">{row.original.title}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "Type",
      size: 20,
      minSize: 120,
      header: "Type",
      cell: ({ row }) => {
        const feedbackType = row.original.feedbackType;
        const typeLabel = feedbackTypeLabel(feedbackType, Locale.En);
        return (
          <Badge variant="outline">
            {typeLabel}
          </Badge>
        );
      },
    },
    {
      size: 40,
      minSize: 200,
      header: "Description",
      accessorKey: "description",
      cell: ({ row }) => {
        const description = row.original.description || "";
        const truncated = description.length > MAX_DESCRIPTION_LENGTH 
          ? description.substring(0, MAX_DESCRIPTION_LENGTH) + "..." 
          : description;
        return (
          <span className="text-sm text-muted-foreground" title={description}>
            {truncated}
          </span>
        );
      },
    },
    {
      size: 10,
      minSize: 60,
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex justify-end">
            <Button
              variant="secondary"
              size="icon"
              className="cursor-pointer"
              onClick={() => props.onViewDetails(row.original)}
            >
              <Eye />
            </Button>
          </div>
        );
      },
    },
  ];
};

