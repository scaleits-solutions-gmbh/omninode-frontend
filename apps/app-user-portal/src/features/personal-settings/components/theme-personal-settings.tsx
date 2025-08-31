"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { updateUserProfile } from "@/lib/api-client/personal-settings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Palette } from "lucide-react";

export default function ThemePersonalSettings() {
  const t = useTranslations('features.personalSettings.themePersonalSettings');
  const { theme, systemTheme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState("");
  const [mounted, setMounted] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: updateThemeMutation } = useMutation({
    mutationFn: (selectedTheme: string) => {
      toast.loading(t('updatingThemePreference'), {
        id: "update-theme",
      });
      return updateUserProfile({ theme: selectedTheme });
    },
    onSuccess: () => {
      toast.dismiss("update-theme");
      toast.success(t('themePreferenceUpdated'));
    },
    onError: () => {
      toast.dismiss("update-theme");
      toast.error(t('failedToUpdateTheme'));
    },
  });
  useEffect(() => {
    setMounted(true);
    setSelectedTheme(theme || "system");
  }, [theme]);

  const handleSelect = (value: string) => {
    setTheme(value);
    setSelectedTheme(value);
    updateThemeMutation(value);
    queryClient.invalidateQueries({ queryKey: ["userProfile"] });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <div className="flex gap-2 items-center">
          <Palette className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-medium">{t('themePreference')}</h3>
        </div>
        <p className="text-sm text-muted-foreground">{t('selectTheme')}</p>
      </div>
      <div className="flex gap-4">
        <div
          className={`p-2 flex-1 space-y-2 rounded-md border-2 cursor-pointer ${
            mounted && selectedTheme === "light"
              ? "border-primary"
              : "border-transparent"
          }`}
          onClick={() => handleSelect("light")}
        >
          <div className="h-40 bg-slate-100 rounded-md"></div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{t('light')}</span>
            <span className="text-sm text-muted-foreground">{t('defaultTheme')}</span>
          </div>
        </div>
        <div
          className={`p-2 flex-1 space-y-2 rounded-md border-2 cursor-pointer ${
            mounted && selectedTheme === "dark"
              ? "border-primary"
              : "border-transparent"
          }`}
          onClick={() => handleSelect("dark")}
        >
          <div className="h-40 bg-neutral-800 rounded-md"></div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{t('dark')}</span>
            <span className="text-sm text-muted-foreground">
              {t('beautifulDarkColors')}
            </span>
          </div>
        </div>

        <div
          className={`p-2 flex-1 space-y-2 rounded-md border-2 cursor-pointer ${
            mounted && selectedTheme === "system"
              ? "border-primary"
              : "border-transparent"
          }`}
          onClick={() => handleSelect("system")}
        >
          {mounted ? (
            <div
              className={
                "h-40 rounded-md " +
                (systemTheme === "dark" ? "bg-neutral-800" : "bg-slate-100")
              }
            ></div>
          ) : (
            <div className="h-40 rounded-md bg-slate-100"></div>
          )}
          <div className="flex flex-col">
            <span className="text-sm font-medium">{t('system')}</span>
            <span className="text-sm text-muted-foreground">
              {t('followSystemSettings')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
