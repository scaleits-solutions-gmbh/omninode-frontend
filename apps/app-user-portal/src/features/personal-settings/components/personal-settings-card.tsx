"use client";
import {
  Card,
  CardContent,
  Skeleton,
} from "@repo/pkg-frontend-common-kit/components";
import ThemePersonalSettings from "./theme-personal-settings";
import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "@/lib/api-client/personal-settings";
import { useTranslations } from "next-intl";
import LocalePersonalSettings from "./locale-personal-settings";

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
  const t = useTranslations('features.personalSettings.personalSettingsCard');
  const { isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });

  if (isLoading) {
    return <PersonalSettingsSkeleton />;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{t('settings')}</h3>
      <Card>
        <CardContent className="space-y-4">
          <LocalePersonalSettings />
          <ThemePersonalSettings />
        </CardContent>
      </Card>
    </div>
  );
}
