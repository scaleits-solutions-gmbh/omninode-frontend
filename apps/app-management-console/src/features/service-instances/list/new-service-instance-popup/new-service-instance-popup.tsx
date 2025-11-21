"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/pkg-frontend-common-kit/components";
import { useEffect, useState } from "react";
import ServiceGallery from "./service-gallery";
import { Service } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { cn } from "@repo/pkg-frontend-common-kit/utils";
import AcmpForm from "./services/acmp/acmp-service-configuration";
import WeclappForm from "./services/weclapp/weclapp-service-configuration";

export default function NewServiceInstancePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedService, setSelectedService] = useState<Service | undefined>(
    undefined
  );

  // Reset internal state when closing
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setSelectedService(undefined);
      }, 200);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">New Service</Button>
      </DialogTrigger>
      <DialogContent
        className={cn(
          "w-full transition-none sm:max-w-3xl",
          step === 1 ? "sm:max-w-2xl" : ""
        )}
      >
        <DialogHeader>
          <DialogTitle>Connect a new service</DialogTitle>
          <DialogDescription>
            Choose a service and provide connection details.
          </DialogDescription>
        </DialogHeader>

        {step === 1 ? (
          <ServiceGallery
            selectedService={selectedService}
            onSelect={setSelectedService}
            onContinue={() => setStep(2)}
          />
        ) : selectedService === Service.Acmp ? (
          <AcmpForm
            onBack={() => setStep(1)}
            onConnect={() => setIsOpen(false)}
          />
        ) : selectedService === Service.Weclapp ? (
          <WeclappForm
            onBack={() => setStep(1)}
            onConnect={() => setIsOpen(false)}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
