"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CompanySelector from "./CompanySelector";

interface GrantCompanyAccessProps {
  children: React.ReactNode;
}

export function GrantCompanyAccess({ children }: GrantCompanyAccessProps) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Grant company access</Button>
      </DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Grant Company Access</DialogTitle>
        </DialogHeader>
        <CompanySelector value={value} onValueChange={setValue} />
        {children}
      </DialogContent>
    </Dialog>
  );
}
