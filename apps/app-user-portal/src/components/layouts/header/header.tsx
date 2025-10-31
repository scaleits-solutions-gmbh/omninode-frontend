"use client";
import { AppLogo } from "@/components/custom/app-logo";
import { HelpIndicator, NotificationsIndicator, Skeleton } from "@repo/pkg-frontend-common-kit/components";
import {
  MANAGEMENT_CONSOLE_BASE_URL,
  SERVICE_PORTAL_BASE_URL,
  USER_PORTAL_BASE_URL,
} from "@repo/pkg-frontend-common-kit/constants";
import { getOriginUrl } from "@repo/pkg-frontend-common-kit/utils";
import { Lock } from "lucide-react";
import Link from "next/link";
import OrganizationSwitcher from "./company-switcher";
import MobileHeader from "./mobile-header";
import UserIndicator from "./user-indicator";
import { useGetCurrentOrganization } from "@repo/pkg-frontend-common-kit/hooks";

export default function Header() {
  const canAccessManagementConsole = false;


  const { companies, isLoading } = useGetCurrentOrganization();

  return (
    <>
      {/* Desktop Header */}
      <div className="hidden md:flex p-4 bg-card border-b h-20 align-center">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-1">
          <Link href={getOriginUrl() + USER_PORTAL_BASE_URL}>
            <AppLogo customSize={38} />
          </Link>
          <div className="flex items-center gap-6">
            {isLoading ? (
              <>
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-32" />
              </>
            ) : companies && companies.length > 0 ? (
              <>
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
              </>
            ) : null}
            <div className="flex items-center gap-4">
            <OrganizationSwitcher />
              <HelpIndicator />
              <NotificationsIndicator />
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
