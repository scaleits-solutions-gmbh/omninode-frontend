"use client";

import { BaseLocaleSelector } from "@repo/pkg-frontend-common-kit/components";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function AppLocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: string) => {
    // Set the locale cookie
    document.cookie = `locale=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}`; // 1 year
    
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <BaseLocaleSelector 
      value={locale} 
      onLocaleChange={handleLocaleChange}
      enabled={!isPending}
    />
  );
}