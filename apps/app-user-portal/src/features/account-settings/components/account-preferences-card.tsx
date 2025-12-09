"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
} from "@repo/pkg-frontend-common-kit/components";
import { useAuthedMutation, useAuthedQuery } from "@repo/pkg-frontend-common-kit/hooks";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { getUserClient } from "@repo/pkg-frontend-common-kit/utils";
import { toast } from "sonner";
import { Theme, Locale, themeOptions, localeOptions } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { Session } from "next-auth";

type ThemeValue = "light" | "dark" | "system";

export default function AccountPreferencesCard() {
  const { setTheme } = useTheme();

  const { data: userData, isLoading } = useAuthedQuery({
    queryKey: ["me"],
    queryFn: async ({ session }) => {
      const response = await getUserClient(session).findCurrentUser({});
      return response.data;
    },
  });

  const current = userData;
  const currentLocale = (current?.userPreferences?.locale as Locale | undefined);
  const currentTheme = useMemo<ThemeValue | undefined>(() => {
    return (current?.userPreferences?.theme as ThemeValue | undefined);
  }, [current?.userPreferences?.theme]);

  const [selectedTheme, setSelectedTheme] = useState<ThemeValue | undefined>(undefined);
  const [selectedLocale, setSelectedLocale] = useState<Locale | undefined>(undefined);
  const [effectiveLocale, setEffectiveLocale] = useState<Locale>("en" as Locale);
  const [baselineTheme, setBaselineTheme] = useState<ThemeValue | undefined>(undefined);
  const [baselineLocale, setBaselineLocale] = useState<Locale | undefined>(undefined);

  useEffect(() => {
    if (!isLoading) {
      setSelectedTheme(currentTheme ?? themeOptions((currentLocale ?? "en") as Locale)[0]?.value as ThemeValue);
      setSelectedLocale(currentLocale ?? ("en" as Locale));
      setEffectiveLocale(currentLocale ?? ("en" as Locale));
      setBaselineTheme(currentTheme ?? themeOptions((currentLocale ?? "en") as Locale)[0]?.value as ThemeValue);
      setBaselineLocale(currentLocale ?? ("en" as Locale));
    }
  }, [isLoading, currentTheme, currentLocale]);

  const updatePreferences = useAuthedMutation({
    mutationFn: async ({ session, variables }: { session: Session; variables: { theme: Theme; locale: Locale } }) => {
      const response = await getUserClient(session).updateCurrentUserPreferences({
        body: {
          theme: variables.theme,
          locale: variables.locale,
        },
      });
      return response.data;
    },
    onMutate: () => toast.loading("Updating preferences...", { id: "prefs" }),
    onError: (e: Error) => toast.error(e.message || "Failed to update", { id: "prefs" }),
    onSuccess: (_data, _vars) => {
      // Apply client-side changes only after successful save
      if (_vars.theme) setTheme(_vars.theme as ThemeValue);
      if (_vars.locale) setEffectiveLocale(_vars.locale as Locale);
      // Update baselines so the new values are considered the initial state
      if (_vars.theme) setBaselineTheme(_vars.theme as ThemeValue);
      if (_vars.locale) setBaselineLocale(_vars.locale as Locale);
      toast.success("Preferences updated", { id: "prefs" });
    },
  });

  const isDirty = (selectedTheme !== baselineTheme) || (selectedLocale !== baselineLocale);

  const localizedLocaleOptions = useMemo(() => {
    try {
      const displayNames = new Intl.DisplayNames([effectiveLocale], { type: "language" });
      return localeOptions(effectiveLocale).map((opt) => ({
        value: opt.value,
        label: displayNames.of(String(opt.value)) ?? String(opt.value),
      }));
    } catch {
      // Fallback: use raw codes as labels if Intl.DisplayNames is unavailable
      return localeOptions(effectiveLocale).map((opt) => ({
        value: opt.value,
        label: String(opt.value),
      }));
    }
  }, [effectiveLocale]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Account preferences</CardTitle>
          <CardDescription>Theme and language</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Theme</Label>
              <Skeleton className="h-9 w-full rounded-md" />
            </div>
            <div className="space-y-2">
              <Label>Language</Label>
              <Skeleton className="h-9 w-full rounded-md" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-9 w-16" />
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account preferences</CardTitle>
        <CardDescription>Theme and language</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Theme</Label>
            <Select
              value={String(selectedTheme)}
              onValueChange={(val) => setSelectedTheme(val as ThemeValue)}
              disabled={updatePreferences.isPending}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                {themeOptions(effectiveLocale).map((opt) => (
                  <SelectItem key={String(opt.value)} value={String(opt.value)}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Language</Label>
            <Select
              value={String(selectedLocale)}
              onValueChange={(val) => setSelectedLocale(val as Locale)}
              disabled={updatePreferences.isPending}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {localizedLocaleOptions.map((opt) => (
                  <SelectItem key={String(opt.value)} value={String(opt.value)}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow-xs hover:opacity-90 h-9 px-4"
          disabled={!isDirty || updatePreferences.isPending}
          onClick={() => {
            if (!selectedTheme || !selectedLocale) return;
            updatePreferences.mutate({
              theme: selectedTheme as Theme,
              locale: selectedLocale as Locale,
            });
          }}
        >
          {updatePreferences.isPending ? "Saving..." : "Save"}
        </button>
      </CardFooter>
    </Card>
  );
}