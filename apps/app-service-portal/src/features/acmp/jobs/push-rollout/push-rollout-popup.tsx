"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DropdownMenuItem
} from "../../../../../../../packages/frontend-common-kit/dist/components";
import { MonitorUp } from "lucide-react";
import { useState } from "react";
import PushRolloutPopupStep1 from "./push-rollout-popup-step1";
import PushRolloutPopupStep2 from "./push-rollout-popup-step2";
import PushRolloutPopupStep3 from "./push-rollout-popup-step3";
import { FeRollout } from "@/types/acmp/rollout";
import { FeClient } from "@/types/acmp/client";

export default function PushRolloutPopup() {
  const [step, setStep] = useState(1);
  const [rollout, setRollout] = useState<FeRollout | undefined>(undefined);
  const [clients, setClients] = useState<FeClient[]>([]);
  

  const handleNextStep1 = (rollout: FeRollout) => {
    setRollout(rollout);
    setStep(2);
  };

  const handleNextStep2 = (clients: FeClient[]) => {
    setClients(clients);
    setStep(3);
  };

  const handleFinishStep3 = () => {
    console.log(rollout, clients);
  };
  
  const handleBack = () => {
    setStep(step - 1);
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setStep(1);
      setRollout(undefined);
      setClients([]);
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
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
