import AppLogo from "@/components/display/appLogo";
import ActivateAccountPageContent from "@/features/auth/activateAccount/components/ActivateAccountPageContent";

export default function ActivateAccountPage() {
  return (
    <div className="w-full max-w-md flex flex-col gap-4 items-center text-center">
      <AppLogo />
      <span className="text-sm text-gray-500">
        Follow the steps below to activate your account
      </span>
      <ActivateAccountPageContent />
    </div>
  );
}
