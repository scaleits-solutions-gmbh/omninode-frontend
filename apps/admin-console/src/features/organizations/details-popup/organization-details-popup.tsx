import { Locale, OrganizationListItemReadModel, OrganizationStatus, organizationStatusLabel, organizationTypeLabel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

import {
  Avatar, AvatarFallback, AvatarImage,
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/pkg-frontend-common-kit/components";
interface OrganizationDetailsPopupProps {
  organization?: OrganizationListItemReadModel;
  onClose: () => void;
}

export const OrganizationDetailsPopup = ({
  organization,
  onClose,
}: OrganizationDetailsPopupProps) => {
  // Early return if no organization
  if (!organization) {
    return null;
  }

  return (
    <Dialog open={!!organization} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold">
                Organization Details
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                Details of the selected organization.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Organization Summary */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Organization
              </p>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={""} />
                  <AvatarFallback seed={organization.id}>{organization.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="text-sm">{organization.name}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Email
              </p>
              <p className="text-sm">{organization.email || "N/A"}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Type
              </p>
              <p className="text-sm">{organizationTypeLabel(organization.type, Locale.En)}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Status
              </p>
              <Badge variant={organization.status === OrganizationStatus.Active ? "success" : "secondary"}>
                {organizationStatusLabel(organization.status, Locale.En)}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Country Code
              </p>
              <p className="text-sm">{organization.countryCode}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                City
              </p>
              <p className="text-sm">{organization.city}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Industry
              </p>
              <p className="text-sm">{organization.industry}</p>
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

