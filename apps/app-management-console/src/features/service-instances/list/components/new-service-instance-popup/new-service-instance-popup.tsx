"use client";
import AcmpConfig from "./acmp-config";
import ServiceSelection from "./service-selection";
import WeclappConfig from "./weclapp-config";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
} from "frontend-common-kit";
import { useEffect, useState } from "react";

export default function NewServiceInstancePopup() {
  const [selectedService, setSelectedService] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setSelectedService(undefined);
      }, 500);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div>
          <Button>New Service Instance</Button>
        </div>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-4xl">
        {selectedService === "weclapp" ? (
          <WeclappConfig
            onBack={() => setSelectedService(undefined)}
            onFinish={() => {
              setIsOpen(false);
            }}
          />
        ) : selectedService === "acmp" ? (
          <AcmpConfig
            onBack={() => setSelectedService(undefined)}
            onFinish={() => {
              setIsOpen(false);
            }}
          />
        ) : (
          <ServiceSelection onServiceSelect={setSelectedService} />
        )}
      </DialogContent>
    </Dialog>
  );
}
