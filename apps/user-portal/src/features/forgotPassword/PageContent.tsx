import AppLogo from "@/components/display/appLogo";
import ForgotPasswordCard from "./components/ForgetPasswordCard";

export default function PageContent() {
    return (
        <div className="w-full flex flex-col items-center gap-6">
            <AppLogo />
            <ForgotPasswordCard />
        </div>
    );
}