/* Commented out - service-instances feature
"use client";

import OrganizationSelector from "./organization-selector";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
} from "@repo/pkg-frontend-common-kit/components";
import * as React from "react";

interface GrantOrganizationAccessProps {
  children: React.ReactNode;
}

export function GrantOrganizationAccess({ children }: GrantOrganizationAccessProps) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Grant organization access</Button>
      </DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Grant Organization Access</DialogTitle>
        </DialogHeader>
        <OrganizationSelector value={value} onValueChange={setValue} />
        {children}
      </DialogContent>
    </Dialog>
  );
}
*/
