"use client";
import { sendCompanyRelationshipInvite } from "@/lib/api-client/company-relationship-invites";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Label,
} from "@repo/pkg-frontend-common-kit/components";
import { CompanyRelationshipType } from "@scaleits-solutions-gmbh/services";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function InviteCompanyPopup() {
  const currentCompanyId = "7656d020-87c4-450e-b68b-9f3a170f1f16";
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      companyId: "",
      relationshipType: "",
    },
    onSubmit: async ({ value }) => {
      if (!value.companyId || !value.relationshipType) {
        toast.error("Please fill in all fields");
        return;
      }

      if (value.companyId === currentCompanyId) {
        toast.error("You cannot invite your own company");
        return;
      }

      let relationshipType: CompanyRelationshipType =
        CompanyRelationshipType.Partner;
      let leftCompanyId: string = "";
      let rightCompanyId: string = "";

      if (value.relationshipType === "partner") {
        relationshipType = CompanyRelationshipType.Partner;
        leftCompanyId = currentCompanyId;
        rightCompanyId = value.companyId;
      } else if (value.relationshipType === "provider") {
        relationshipType = CompanyRelationshipType.ServiceProvision;
        leftCompanyId = value.companyId;
        rightCompanyId = currentCompanyId;
      } else if (value.relationshipType === "customer") {
        relationshipType = CompanyRelationshipType.ServiceProvision;
        leftCompanyId = currentCompanyId;
        rightCompanyId = value.companyId;
      }

      sendInviteMutation.mutateAsync({
        email: "bernardo.cabral@outlook.com",
        leftCompanyId: leftCompanyId,
        rightCompanyId: rightCompanyId,
        companyId: value.companyId,
        relationshipType: relationshipType,
      });
    },
  });

  const sendInviteMutation = useMutation({
    mutationFn: sendCompanyRelationshipInvite,
    onSuccess: () => {
      toast.success("Invite sent successfully");
      form.reset();
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Error sending invite");
    },
  });

  const isCompanyValid = (value: string) => {
    if (!value) return "Company is required";
    return undefined;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Invite Company</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite Company</DialogTitle>
          <DialogDescription>
            Enter the email address of the company you want to invite. They will
            receive an invitation to join.
          </DialogDescription>
        </DialogHeader>
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="companyId"
            validators={{
              onSubmit: ({ value }) => isCompanyValid(value),
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Company</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="text"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Company ID"
                />
                {!field.state.meta.isValid &&
                  field.state.meta.errors.length > 0 && (
                    <div className="w-full flex justify-start">
                      <em
                        role="alert"
                        className="text-sm text-red-500 text-left"
                      >
                        {field.state.meta.errors.join(", ")}
                      </em>
                    </div>
                  )}
              </div>
            )}
          </form.Field>
          <form.Field
            name="relationshipType"
            validators={{
              onSubmit: ({ value }) => isCompanyValid(value),
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Relation Type</Label>
                <Select
                  name={field.name}
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a relation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="partner">Partner</SelectItem>
                    <SelectItem value="provider">Provider</SelectItem>
                    <SelectItem value="customer">Customer</SelectItem>
                  </SelectContent>
                </Select>
                {!field.state.meta.isValid &&
                  field.state.meta.errors.length > 0 && (
                    <div className="w-full flex justify-start">
                      <em
                        role="alert"
                        className="text-sm text-red-500 text-left"
                      >
                        {field.state.meta.errors.join(", ")}
                      </em>
                    </div>
                  )}
              </div>
            )}
          </form.Field>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  isLoading={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Invite"}
                </Button>
              </DialogFooter>
            )}
          </form.Subscribe>
        </form>
      </DialogContent>
    </Dialog>
  );
}
