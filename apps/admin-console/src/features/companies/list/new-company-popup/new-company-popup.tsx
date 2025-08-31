"use client";
import {
  createCompany,
  invalidateCompaniesQueries,
} from "@/lib/api-client/company/company";
import { FeCompany } from "@/types/fe/fe-company";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Progress,
} from "frontend-common-kit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { getEmptyNewCompany } from "../../lib/get-empty-new-company";
import { NewCompany } from "../../types/new-company";
import NewCompanyStep1, { Step1CompanyData } from "./new-company-step1";
import NewCompanyStep2, { Step2CompanyData } from "./new-company-step2";
import NewCompanyStep3, { Step3CompanyData } from "./new-company-step3";

export default function NewCompanyPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [newCompany, setNewCompany] =
    useState<NewCompany>(getEmptyNewCompany());
  const queryClient = useQueryClient();

  const createCompanyMutation = useMutation({
    mutationFn: (
      companyData: Omit<FeCompany, "id" | "createdAt" | "updatedAt">,
    ) => createCompany(companyData),
    onSuccess: () => {
      toast.success("Company created successfully");

      // Invalidate all companies queries regardless of parameters
      invalidateCompaniesQueries(queryClient);

      setStep(1);
      setNewCompany(getEmptyNewCompany());
    },
    onError: (error) => {
      console.error("Error creating company:", error);
      toast.error("Failed to create company. Please try again.");
    },
  });

  const handleStep1Next = (Step1CompanyData: Step1CompanyData) => {
    console.log(Step1CompanyData);
    setNewCompany({
      ...newCompany!,
      name: Step1CompanyData.name,
      taxId: Step1CompanyData.taxId,
      industry: Step1CompanyData.industry,
      email: Step1CompanyData.email,
      phone: Step1CompanyData.phone,
      countryCode: Step1CompanyData.countryCode,
    });
    setStep(2);
  };

  const handleStep2Next = (Step2CompanyData: Step2CompanyData) => {
    console.log(Step2CompanyData);
    setNewCompany({
      ...newCompany,
      primaryContactFirstName: Step2CompanyData.primaryContactFirstName,
      primaryContactLastName: Step2CompanyData.primaryContactLastName,
      primaryContactEmail: Step2CompanyData.primaryContactEmail,
      primaryContactPhone: Step2CompanyData.primaryContactPhone,
    });
    setStep(3);
  };

  const handleStep2Back = (Step2CompanyData: Step2CompanyData) => {
    console.log(Step2CompanyData);
    setNewCompany({
      ...newCompany,
      primaryContactFirstName: Step2CompanyData.primaryContactFirstName,
      primaryContactLastName: Step2CompanyData.primaryContactLastName,
      primaryContactEmail: Step2CompanyData.primaryContactEmail,
      primaryContactPhone: Step2CompanyData.primaryContactPhone,
    });
    setStep(1);
  };

  const handleStep3CreateCompany = async (
    Step3CompanyData: Step3CompanyData,
  ) => {
    // Create the final company object with all the data

    if (
      !newCompany.industry ||
      !newCompany.countryCode ||
      !newCompany.type ||
      !newCompany.status ||
      !newCompany.currency
    ) {
      throw new Error(
        "Industry, country code, type, status, and currency are required",
      );
    }

    const finalCompanyData: Omit<FeCompany, "id" | "createdAt" | "updatedAt"> =
      {
        ...newCompany,
        industry: newCompany.industry,
        countryCode: newCompany.countryCode,
        type: Step3CompanyData.type!,
        status: Step3CompanyData.status!,
        currency: Step3CompanyData.currency!,
      };

    // Update the mutation to use the final company data directly
    await createCompanyMutation.mutateAsync(finalCompanyData);

    // Update state after successful creation
    setNewCompany(getEmptyNewCompany());
    setIsOpen(false);
    setStep(1);
  };

  const handleStep3Back = (Step3CompanyData: Step3CompanyData) => {
    setNewCompany({
      ...newCompany,
      type: Step3CompanyData.type,
      status: Step3CompanyData.status,
      currency: Step3CompanyData.currency,
    });
    setStep(2);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen);
        if (!isOpen) {
          setStep(1);
          setNewCompany(getEmptyNewCompany());
        }
      }}
    >
      <DialogTrigger asChild>
        <Button>New Company</Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-2xl">
        <DialogHeader className="border-b space-y-4 pb-6">
          <DialogTitle>New Company</DialogTitle>
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-sm text-muted-foreground">
                {(() => {
                  switch (step) {
                    case 1:
                      return "General Information";
                    case 2:
                      return "Primary Contact Information";
                    case 3:
                      return "Settings";
                    default:
                      return "General Information";
                  }
                })()}
              </p>
              <p className="text-sm text-muted-foreground min-w-fit">
                {step} of 3
              </p>
            </div>
            <Progress value={(100 / 3) * step} />
          </div>
        </DialogHeader>
        {(() => {
          switch (step) {
            case 1:
              return (
                <NewCompanyStep1
                  onNext={handleStep1Next}
                  Step1CompanyData={newCompany as Step1CompanyData}
                />
              );
            case 2:
              return (
                <NewCompanyStep2
                  onNext={handleStep2Next}
                  onBack={handleStep2Back}
                  Step2CompanyData={newCompany as Step2CompanyData}
                />
              );
            case 3:
              return (
                <NewCompanyStep3
                  OnCreateCompany={handleStep3CreateCompany}
                  onBack={handleStep3Back}
                  Step3CompanyData={{
                    type: newCompany.type,
                    status: newCompany.status,
                    currency: newCompany.currency,
                  }}
                />
              );
            default:
              return null;
          }
        })()}
      </DialogContent>
    </Dialog>
  );
}
