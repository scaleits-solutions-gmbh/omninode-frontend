"use client";
import {
  AppWordmarkLogo,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/pkg-frontend-common-kit/components";
import {
  MANAGEMENT_CONSOLE_BASE_URL,
  SERVICE_PORTAL_BASE_URL,
} from "@repo/pkg-frontend-common-kit/constants";
import { useGetCurrentCompany } from "@repo/pkg-frontend-common-kit/hooks";
import { getOriginUrl } from "@repo/pkg-frontend-common-kit/utils";
import { ManagementConsoleAccess } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { ArrowRight, Globe, Lock, Settings } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function AppSelector() {
  const managementConsoleUrl = getOriginUrl() + MANAGEMENT_CONSOLE_BASE_URL;
  const servicePortalUrl = getOriginUrl() + SERVICE_PORTAL_BASE_URL;

  const { selectedCompany, companies, isLoading } = useGetCurrentCompany();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center items-end gap-2">
          <h1 className="text-3xl leading-none">Welcome to</h1>
          <div className="mb-0.5">
            <AppWordmarkLogo
              srcDark="/user-portal/assets/logo-wordmark-dark.svg"
              srcLight="/user-portal/assets/logo-wordmark-light.svg"
              customSize={48}
            />
          </div>
        </div>

        <p className="text-muted-foreground text-lg">Choose where to go next</p>
      </div>

      <div className={`grid gap-6 md:grid-cols-2`}>
        {isLoading ? (
          <>
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-12 w-12 rounded-lg" />
                  <div>
                    <Skeleton className="h-6 w-40 mb-2" />
                    <Skeleton className="h-4 w-56" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-12 w-12 rounded-lg" />
                  <div>
                    <Skeleton className="h-6 w-40 mb-2" />
                    <Skeleton className="h-4 w-56" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {companies?.length === 0 ? (
              <></>
            ) : (
              <>
                {selectedCompany?.managementConsoleAccess !==
                ManagementConsoleAccess.User ? (
                  <Card className="">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
                          <Settings className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">
                            Management Console
                          </CardTitle>
                          <CardDescription>
                            Administer your organization and settings
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Link href={managementConsoleUrl} className="block">
                        <Button className="w-full cursor-pointer" size="lg">
                          Access Console
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="opacity-60">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                          <Lock className="h-6 w-6 text-gray-500" />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-gray-500">
                            Management Console
                          </CardTitle>
                          <CardDescription>
                            You do not have permission to access this console
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button className="w-full" size="lg" disabled>
                            Access Restricted
                            <Lock className="ml-2 h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>No permission to access</p>
                        </TooltipContent>
                      </Tooltip>
                    </CardContent>
                  </Card>
                )}

                <Card className="">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20">
                        <Globe className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">
                          Service Portal
                        </CardTitle>
                        <CardDescription>
                          Manage your services and tickets
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Link href={servicePortalUrl} className="block">
                      <Button className="w-full cursor-pointer" size="lg">
                        Access Portal
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </>
            )}
          </>
        )}
      </div>
      {!isLoading && companies?.length === 0 && (
        <Card className="w-full max-w-md mx-auto -mt-8">
          <CardHeader className="pb-4">
            <CardTitle className="">No companies found</CardTitle>
            <CardDescription className="">
              Please contact your administrator to request access.
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Need help? Contact support.
        </p>
      </div>
    </div>
  );
}
