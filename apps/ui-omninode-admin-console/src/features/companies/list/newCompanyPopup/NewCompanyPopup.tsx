"use client";
import { useState } from "react";
import NewCompanyStep1 from "./NewCompanyStep1";
import NewCompanyStep2 from "./NewCompanyStep2";
import NewCompanyStep3 from "./NewCompanyStep3";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Step1CompanyData } from "./NewCompanyStep1";
import { Step2CompanyData } from "./NewCompanyStep2";
import { Step3CompanyData } from "./NewCompanyStep3";
import { toast } from "sonner";
import { Company, NewCompany, getEmptyNewCompany } from "@/types/company";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCompany, invalidateCompaniesQueries } from "@/lib/apiClient/company/company";

export default function NewCompanyPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [newCompany, setNewCompany] = useState<NewCompany>(getEmptyNewCompany());
  const queryClient = useQueryClient();

  const createCompanyMutation = useMutation({
    mutationFn: (companyData: Omit<Company, "id" | "createdAt" | "updatedAt">) => createCompany(companyData),
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
      ...newCompany,
      name: Step1CompanyData.name,
      taxId: Step1CompanyData.taxId,
      industry: Step1CompanyData.industry,
      email: Step1CompanyData.email,
      phone: Step1CompanyData.phone,
      countryCode: Step1CompanyData.countryCode,
      city: Step1CompanyData.city,
      address: Step1CompanyData.address,
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

  const handleStep3CreateCompany = async (Step3CompanyData: Step3CompanyData) => {    
    // Create the final company object with all the data
    const finalCompanyData = {
      ...newCompany,
      type: Step3CompanyData.type,
      status: Step3CompanyData.status,
      currency: Step3CompanyData.currency,
    };
    
    // Update the mutation to use the final company data directly
    await createCompanyMutation.mutateAsync(finalCompanyData);
    
    // Update state after successful creation
    setNewCompany(getEmptyNewCompany());
    setIsOpen(false);
    setStep(1);
  };

  const handleStep3Back = (Step3CompanyData: Step3CompanyData) => {
    console.log(Step3CompanyData);
    setNewCompany({
      ...newCompany,
      type: Step3CompanyData.type,
      status: Step3CompanyData.status,
    });
    setStep(2);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setStep(1);
            setNewCompany(getEmptyNewCompany());
        }
    }}>
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
              return <NewCompanyStep1
            onNext={handleStep1Next}
            Step1CompanyData={newCompany as Step1CompanyData}
          />
            case 2:
              return <NewCompanyStep2
            onNext={handleStep2Next}
            onBack={handleStep2Back}
            Step2CompanyData={newCompany as Step2CompanyData}
          />
            case 3:
              return <NewCompanyStep3
            OnCreateCompany={handleStep3CreateCompany}
            onBack={handleStep3Back}
            Step3CompanyData={{
              type: newCompany.type,
              status: newCompany.status,
              currency: newCompany.currency,
            }}
          />;
            default:
              return null;
          }
        })()}
      </DialogContent>
    </Dialog>
  );
}
