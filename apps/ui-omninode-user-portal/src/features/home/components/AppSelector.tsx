"use client";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Globe, ArrowRight, Lock } from "lucide-react";
import { ManagementConsoleAccess } from "@scaleits-solutions-gmbh/services";
import { useManagementConsoleAccess } from "@/hooks/useSession";

export default function AppSelector() {
  // All hooks must be called before any conditional logic
  const managementConsoleAccess = useManagementConsoleAccess();
  
  const managementConsoleUrl = process.env.NEXT_PUBLIC_MANAGEMENT_CONSOLE_URL;
  const servicePortalUrl = process.env.NEXT_PUBLIC_SERVICE_PORTAL_URL;

  if (!managementConsoleUrl || !servicePortalUrl) {
    return <div>No apps available</div>;
  }

  const canAccessManagementConsole = managementConsoleAccess !== ManagementConsoleAccess.None;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome to Omni<span className="text-primary">Node</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Choose the application you&apos;d like to access
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
                  <CardTitle className="text-xl">Management Console</CardTitle>
                  <CardDescription>
                    Administer and manage your organization
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
                    Access restricted - contact your administrator
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full" size="lg" disabled>
                Access Restricted
                <Lock className="ml-2 h-4 w-4" />
              </Button>
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
                <CardTitle className="text-xl">Service Portal</CardTitle>
                <CardDescription>
                  Access and manage your services
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
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Need help? Contact your system administrator
        </p>
      </div>
    </div>
  );
}
