import { AppLogo } from "@/components/custom/app-logo";
import ForgotPasswordCard from "./components/forget-password-card";

export default function PageContent() {
  return (
    <div className="w-full flex flex-col items-center gap-6">
      <AppLogo />
      <ForgotPasswordCard />
    </div>
  );
}
