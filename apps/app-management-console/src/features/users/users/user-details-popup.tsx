"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Badge,
} from "@repo/pkg-frontend-common-kit/components";
import {
  ComposedOrganizationMembershipReadModel,
  OrganizationRole,
  organizationRoleName,
  Locale,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

interface UserDetailsPopupProps {
  user?: ComposedOrganizationMembershipReadModel;
  onClose: () => void;
}

function getInitials(name: string): string {
  const parts = name.split(" ").filter(Boolean);
  const initials = parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
  return initials || "U";
}

export const UserDetailsPopup = ({
  user,
  onClose,
}: UserDetailsPopupProps) => {
  // Early return if no user
  if (!user) {
    return null;
  }

  const fullName = `${user.user.firstName} ${user.user.lastName}`.trim() || "Unknown User";

  return (
    <Dialog open={!!user} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold">
                User Details
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                Details of the selected user.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Summary */}
          <div className="flex justify-between items-center gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex-1 space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                User
              </p>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage alt={fullName} />
                  <AvatarFallback seed={user.user.id}>
                    {getInitials(fullName)}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm font-medium">{fullName}</p>
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Email
              </p>
              <p className="text-sm">{user.user.email}</p>
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Role
              </p>
              <Badge
                variant={user.role === OrganizationRole.Owner ? "default" : "secondary"}
              >
                {organizationRoleName(user.role, Locale.En)}
              </Badge>
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




