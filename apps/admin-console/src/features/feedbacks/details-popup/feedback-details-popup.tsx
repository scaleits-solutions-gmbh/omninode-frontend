import {
  FeedbackListItemReadModel, feedbackTypeLabel,
  Locale
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/pkg-frontend-common-kit/components";
interface FeedbackDetailsPopupProps {
  feedback?: FeedbackListItemReadModel;
  onClose: () => void;
}

export const FeedbackDetailsPopup = ({
  feedback,
  onClose,
}: FeedbackDetailsPopupProps) => {
  // Early return if no feedback
  if (!feedback) {
    return null;
  }

  return (
    <Dialog open={!!feedback} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold">
                Feedback Details
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                Details of the selected feedback.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Feedback Summary */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Title
              </p>
              <p className="text-sm font-medium">{feedback.title}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Type
              </p>
              <Badge variant="outline">
                {feedbackTypeLabel(feedback.feedbackType, Locale.En)}
              </Badge>
            </div>
            <div className="space-y-2 col-span-2">
              <p className="text-sm font-medium text-muted-foreground">
                Description
              </p>
              <p className="text-sm whitespace-pre-wrap">{feedback.description}</p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


