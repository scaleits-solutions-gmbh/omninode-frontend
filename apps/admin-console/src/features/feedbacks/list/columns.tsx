import { ColumnDef } from "@tanstack/react-table";
import { Eye, MessageSquare } from "lucide-react";
import { Button, Badge, Avatar, AvatarImage, AvatarFallback } from "@repo/pkg-frontend-common-kit/components";
import {
  ProjectionFeedbackListItemReadModel,
  feedbackTypeLabel,
  Locale,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export interface ColumnProps {
  onViewDetails: (feedback: ProjectionFeedbackListItemReadModel) => void;
}

const MAX_DESCRIPTION_LENGTH = 100;

export const createColumns = (props: ColumnProps): ColumnDef<ProjectionFeedbackListItemReadModel>[] => {
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
              <MessageSquare className="size-4" />
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
      header: "User ",
      accessorKey: "user",
      cell: ({ row }) => {
        const user = row.original.user;
        return (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={""} />
              <AvatarFallback seed={user.id}>{user.firstName.charAt(0) + user.lastName.charAt(0)}</AvatarFallback>
            </Avatar>
          <span className="text-sm text-muted-foreground">
            {user.firstName} {user.lastName}
          </span>
          </div>
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

