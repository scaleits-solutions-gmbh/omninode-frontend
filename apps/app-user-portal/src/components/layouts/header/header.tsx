"use client";
import { AppLogo } from "@/components/custom/app-logo";
import { HelpIndicator } from "@repo/pkg-frontend-common-kit/components";
import {
  MANAGEMENT_CONSOLE_BASE_URL,
  SERVICE_PORTAL_BASE_URL,
  USER_PORTAL_BASE_URL,
} from "@repo/pkg-frontend-common-kit/constants";
import { getOriginUrl } from "@repo/pkg-frontend-common-kit/utils";
import { Lock } from "lucide-react";
import Link from "next/link";
import CompanySwitcher from "./company-switcher";
import MobileHeader from "./mobile-header";
import UserIndicator from "./user-indicator";

export default function Header() {
  const canAccessManagementConsole = false;

  return (
    <>
      {/* Desktop Header */}
      <div className="hidden md:block p-4 bg-card border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href={getOriginUrl() + USER_PORTAL_BASE_URL}>
            <AppLogo customSize={48} />
          </Link>
          <div className="flex items-center gap-6">
            {canAccessManagementConsole ? (
              <Link href={getOriginUrl() + MANAGEMENT_CONSOLE_BASE_URL}>
                Management Console
              </Link>
            ) : (
              <div className="flex gap-2 text-muted-foreground items-center">
                <Lock className="w-4 h-4" />
                <span className="">Management Console</span>
              </div>
            )}
            <Link href={getOriginUrl() + SERVICE_PORTAL_BASE_URL}>
              Service Portal
            </Link>
            <CompanySwitcher />
            <div className="-ml-2">
              <HelpIndicator />
            </div>
            <UserIndicator />
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <MobileHeader canAccessManagementConsole={canAccessManagementConsole} />
    </>
  );
}
