import { AppLogoDescriptive } from "@/components/custom/app-logo-descriptive";
import LoginForm from "./login-form";

export default function PageContent() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full">
      <div className="flex flex-col gap-2 items-center justify-center">
        <AppLogoDescriptive />
        <h1 className="text-muted-foreground">Welcome back to Admin Console</h1>
      </div>
      <LoginForm />
    </div>
  );
}
