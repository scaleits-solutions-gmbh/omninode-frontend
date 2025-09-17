"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DropdownMenuItem
} from "@repo/pkg-frontend-common-kit/components";
import { MonitorUp } from "lucide-react";
import { useState } from "react";
import PushRolloutPopupStep1 from "./push-rollout-popup-step1";
import PushRolloutPopupStep2 from "./push-rollout-popup-step2";
import PushRolloutPopupStep3 from "./push-rollout-popup-step3";
import { AcmpRolloutTemplateListItem, AcmpClientListItem } from "@repo/lib-api-client";

export default function PushRolloutPopup() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [rollout, setRollout] = useState<AcmpRolloutTemplateListItem | undefined>(undefined);
  const [clients, setClients] = useState<AcmpClientListItem[]>([]);
  

  const handleNextStep1 = (rollout: AcmpRolloutTemplateListItem) => {
    setRollout(rollout);
    setStep(2);
  };

  const handleNextStep2 = (clients: AcmpClientListItem[]) => {
    setClients(clients);
    setStep(3);
  };

  const handleFinishStep3 = () => {
    setOpen(false);
  };
  
  const handleBack = () => {
    setStep(step - 1);
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setStep(1);
      setRollout(undefined);
      setClients([]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
          <MonitorUp className="w-4 h-4" />
          Push Rollout Template
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Push Rollout Template</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Push a rollout template to selected clients.
        </DialogDescription>
        {step === 1 && <PushRolloutPopupStep1 initialSelectedRollout={rollout} onNext={handleNextStep1} />}
        {step === 2 && <PushRolloutPopupStep2 initialSelectedClients={clients} onNext={handleNextStep2} onBack={handleBack} />}
        {step === 3 && <PushRolloutPopupStep3 rollout={rollout!} clients={clients} onFinish={handleFinishStep3} onBack={handleBack} />}
      </DialogContent>
    </Dialog>
  );
}
