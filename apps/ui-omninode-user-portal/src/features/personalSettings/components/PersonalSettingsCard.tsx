"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ThemePersonalSettings from "./themePersonalSettings";
import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "@/lib/apiClient/personalSettings";

function PersonalSettingsSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-32" />
      <Card>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <div className="flex gap-4">
              <div className="p-2 flex-1 space-y-2 rounded-md border-2 border-transparent">
                <Skeleton className="h-40 w-full" />
                <div className="flex flex-col space-y-1">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <div className="p-2 flex-1 space-y-2 rounded-md border-2 border-transparent">
                <Skeleton className="h-40 w-full" />
                <div className="flex flex-col space-y-1">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <div className="p-2 flex-1 space-y-2 rounded-md border-2 border-transparent">
                <Skeleton className="h-40 w-full" />
                <div className="flex flex-col space-y-1">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PersonalSettingsCard() {
  const { isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });

  if (isLoading) {
    return <PersonalSettingsSkeleton />;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Settings</h3>
      <Card>
        <CardContent className="space-y-4">
          <ThemePersonalSettings />
        </CardContent>
      </Card>
    </div>
  );
}
