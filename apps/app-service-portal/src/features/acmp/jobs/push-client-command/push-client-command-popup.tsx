"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenuItem
} from "@repo/pkg-frontend-common-kit/components";

import { TerminalIcon } from "lucide-react";
import { useState } from "react";
import PushClientCommandPopupStep1 from "./push-client-command-popup-step1";
import PushClientCommandPopupStep2 from "./push-client-command-popup-step2";
import PushClientCommandPopupStep3 from "./push-client-command-popup-step3";
import { FeClientCommand } from "@/types/acmp/client-command";
import type { AcmpClientListItemReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export default function PushClientCommandPopup() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [clientCommand, setClientCommand] = useState<FeClientCommand | undefined>(undefined);
  const [clients, setClients] = useState<AcmpClientListItemReadModel[]>([]);
  

  const handleNextStep1 = (clientCommand: FeClientCommand) => {
    setClientCommand(clientCommand);
    setStep(2);
  };

  const handleNextStep2 = (clients: AcmpClientListItemReadModel[]) => {
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
      setClientCommand(undefined);
      setClients([]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
          <TerminalIcon className="w-4 h-4" />
          Push Client Command
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Push Client Command</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Push a client command to selected clients.
        </DialogDescription>
        {step === 1 && <PushClientCommandPopupStep1 initialSelectedClientCommand={clientCommand} onNext={handleNextStep1} />}
        {step === 2 && <PushClientCommandPopupStep2 initialSelectedClients={clients} onNext={handleNextStep2} onBack={handleBack} />}
        {step === 3 && <PushClientCommandPopupStep3 clientCommand={clientCommand!} clients={clients} onFinish={handleFinishStep3} onBack={handleBack} />}
      </DialogContent>
    </Dialog>
  );
}
