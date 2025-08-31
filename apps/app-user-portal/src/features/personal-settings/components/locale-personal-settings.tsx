"use client";

import { Globe } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { BaseLocaleSelector } from "@repo/pkg-frontend-common-kit/components";
import { toast } from "sonner";

export default function LocalePersonalSettings() {
  const t = useTranslations('features.personalSettings.localePersonalSettings');
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: string) => {
    // Set the locale cookie
    document.cookie = `locale=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}`; // 1 year
    
    toast.loading(t('updatingLanguage'), {
      id: "locale-update",
    });
    
    startTransition(() => {
      router.refresh();
      toast.success(t('languageUpdated'), {
        id: "locale-update",
      });
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <div className="flex gap-2 items-center">
          <Globe className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-medium">{t('locale')}</h3>
        </div>
        <p className="text-sm text-muted-foreground">{t('selectLanguage')}</p>
      </div>
      <div className="space-y-2">
        <BaseLocaleSelector 
          value={locale} 
          onLocaleChange={handleLocaleChange}
          enabled={!isPending}
          className="border"
        />
      </div>
    </div>
  );
}