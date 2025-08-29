"use client";
import { useState } from "react";
import { toast } from "sonner";
import ActivateAccountStep1 from "./ActivateAccountStep1";
import ActivateAccountStep2 from "./ActivateAccountStep2";
import ActivateAccountStep0 from "./ActivateAccountStep0";
import { useRouter } from "next/navigation";
import { ActivatingUser } from "../types/ActivatingUser";

export default function ActivateAccountPageContent() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState<Partial<ActivatingUser>>({});

  const handleStep0Validate = () => {
    setStep(1);
  };

  const handleStep1Next = (password: string) => {
    setPassword(password);
    setStep(2);
  };

  const handleStep2Back = (userData: Partial<ActivatingUser>) => {
    setUserData(userData);
    setStep(1);
  };

  const handleActivateAccount = async (updatedUserData: Partial<ActivatingUser>) => {
    try {
      setUserData(updatedUserData);
      // Mock success for now
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Account activated successfully!");
      // Redirect to login or dashboard as needed
      router.push("/login");
    } catch (error) {
      console.error("Failed to activate account: ", error);
      toast.error("Failed to activate account. Please try again later.");
    }
  };

  switch (step) {
    case 0:
      return <ActivateAccountStep0 onValidate={handleStep0Validate} />;
    case 1:
      return (
        <ActivateAccountStep1 password={password} onNext={handleStep1Next} />
      );
    case 2:
      return (
        <ActivateAccountStep2
          userData={userData}
          onBack={handleStep2Back}
          onActivate={handleActivateAccount}
        />
      );
    default:
      return <div>Invalid step</div>;
  }
}
