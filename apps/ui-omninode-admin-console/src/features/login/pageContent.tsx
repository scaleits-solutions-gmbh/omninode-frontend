import AppLogo from "@/components/display/appLogo";
import LoginForm from "./loginForm";

export default function PageContent() {
    return (
        <div className="flex flex-col gap-4 items-center justify-center w-full">
            <div className="flex flex-col gap-2 items-center justify-center">
                <AppLogo />
                <h1 className="text-muted-foreground">Welcome back to Admin Console</h1>
            </div>
            <LoginForm />
        </div>
    )
}