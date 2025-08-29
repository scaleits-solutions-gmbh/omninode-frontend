"use client";
import AppLogo from "@/components/display/appLogo";
import Link from "next/link";
import UserIndicator from "./UserIndicator";
import { Lock } from "lucide-react";
import { ManagementConsoleAccess } from "@scaleits-solutions-gmbh/services";
import CompanySwitcher from "./companySwitcher";
import MobileHeader from "./MobileHeader";
import { useManagementConsoleAccess } from "@/hooks/useSession";

export default function Header() {
  const managementConsoleAccess = useManagementConsoleAccess();
  const canAccessManagementConsole =
    managementConsoleAccess === ManagementConsoleAccess.Admin ||
    managementConsoleAccess === ManagementConsoleAccess.User ||
    managementConsoleAccess === ManagementConsoleAccess.Owner;

  return (
    <>
      {/* Desktop Header */}
      <div className="hidden md:block p-4 bg-card border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/">
            <AppLogo size="sm" />
          </Link>
          <div className="flex items-center gap-6">
            {canAccessManagementConsole ? (
              <Link href={process.env.NEXT_PUBLIC_MANAGEMENT_CONSOLE_URL || ""}>Management Console</Link>
            ) : (
              <div className="flex gap-2 text-muted-foreground items-center">
                <Lock className="w-4 h-4" />
                <span className="">Management Console</span>
              </div>
            )}
            <Link href={process.env.NEXT_PUBLIC_SERVICE_PORTAL_URL || ""}>Service Portal</Link>
            <CompanySwitcher />
            <UserIndicator />
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <MobileHeader canAccessManagementConsole={canAccessManagementConsole} />
    </>
  );
}
