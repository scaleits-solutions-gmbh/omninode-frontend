import { PlatformUser } from "@/features/platform-users/list/columns";

import {
  Avatar, AvatarFallback, AvatarImage,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/pkg-frontend-common-kit/components";
interface PlatformUserDetailsPopupProps {
  platformUser?: PlatformUser;
  onClose: () => void;
}

export const PlatformUserDetailsPopup = ({
  platformUser,
  onClose,
}: PlatformUserDetailsPopupProps) => {
  // Early return if no platformUser
  if (!platformUser) {
    return null;
  }

  return (
    <Dialog open={!!platformUser} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold">
                Platform user Details
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                Details of the selected platform user.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* PlatformUser Summary */}
          <div className="flex justify-between items-center gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex-1 space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                User
              </p>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={""} />
                  <AvatarFallback seed={platformUser.id}>{platformUser.firstName.charAt(0) + platformUser.lastName.charAt(0)}</AvatarFallback>
                </Avatar>
              <p className="text-sm">{platformUser.firstName} {platformUser.lastName}</p>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">
                email
              </p>
              <p className="text-sm">{platformUser.email}</p>
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
