"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenuItem
} from "frontend-common-kit";

import { TerminalIcon } from "lucide-react";
import { useState } from "react";
import PushClientCommandPopupStep1 from "./push-client-command-popup-step1";
import PushClientCommandPopupStep2 from "./push-client-command-popup-step2";
import PushClientCommandPopupStep3 from "./push-client-command-popup-step3";
import { FeClientCommand } from "@/types/acmp/client-command";
import { FeClient } from "@/types/acmp/client";

export default function PushClientCommandPopup() {
  const [step, setStep] = useState(1);
  const [clientCommand, setClientCommand] = useState<FeClientCommand | undefined>(undefined);
  const [clients, setClients] = useState<FeClient[]>([]);
  

  const handleNextStep1 = (clientCommand: FeClientCommand) => {
    setClientCommand(clientCommand);
    setStep(2);
  };

  const handleNextStep2 = (clients: FeClient[]) => {
    setClients(clients);
    setStep(3);
  };

  const handleFinishStep3 = () => {
    console.log(clientCommand, clients);
  };
  
  const handleBack = () => {
    setStep(step - 1);
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setStep(1);
      setClientCommand(undefined);
      setClients([]);
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
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
