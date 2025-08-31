"use client";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  AppWordmarkLogo,
} from "@repo/pkg-frontend-common-kit/components";
import { Settings, Globe, ArrowRight, Lock } from "lucide-react";
import { ManagementConsoleAccess } from "@scaleits-solutions-gmbh/services";
import { useManagementConsoleAccess } from "@/hooks/use-session";
import { useTranslations } from "next-intl";

export default function AppSelector() {
  // All hooks must be called before any conditional logic
  const managementConsoleAccess = useManagementConsoleAccess();
  const tAppSelector = useTranslations("features.home.appSelector");
  //const tAppLogo = useTranslations("components.custom.appLogo");

  const managementConsoleUrl = process.env.NEXT_PUBLIC_MANAGEMENT_CONSOLE_URL;
  const servicePortalUrl = process.env.NEXT_PUBLIC_SERVICE_PORTAL_URL;

  if (!managementConsoleUrl || !servicePortalUrl) {
    return <div>{tAppSelector("noAppsAvailable")}</div>;
  }

  const canAccessManagementConsole =
    managementConsoleAccess !== ManagementConsoleAccess.None;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center">
          <h1 className="text-3xl tracking-tight">
            {tAppSelector("title").replace("OmniNode", "")}
          </h1>
          <AppWordmarkLogo
            srcDark="/assets/logo-wordmark-dark.svg"
            srcLight="/assets/logo-wordmark-light.svg"
            customSize={64}
          />
        </div>

        <p className="text-muted-foreground text-lg">
          {tAppSelector("subtitle")}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {canAccessManagementConsole ? (
          <Card className="">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
                  <Settings className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-xl">
                    {tAppSelector("managementConsole.title")}
                  </CardTitle>
                  <CardDescription>
                    {tAppSelector("managementConsole.description")}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Link href={managementConsoleUrl} className="block">
                <Button className="w-full cursor-pointer" size="lg">
                  {tAppSelector("managementConsole.accessConsole")}
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
                    {tAppSelector("managementConsole.title")}
                  </CardTitle>
                  <CardDescription>
                    {tAppSelector("managementConsole.restrictedDescription")}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className="w-full" size="lg" disabled>
                    {tAppSelector("managementConsole.accessRestricted")}
                    <Lock className="ml-2 h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{tAppSelector("managementConsole.noPermissionTooltip")}</p>
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
                  {tAppSelector("servicePortal.title")}
                </CardTitle>
                <CardDescription>
                  {tAppSelector("servicePortal.description")}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Link href={servicePortalUrl} className="block">
              <Button className="w-full cursor-pointer" size="lg">
                {tAppSelector("servicePortal.accessPortal")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          {tAppSelector("helpText")}
        </p>
      </div>
    </div>
  );
}
