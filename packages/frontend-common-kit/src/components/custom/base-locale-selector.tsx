"use client";

import * as React from "react";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { Languages } from "lucide-react";

export interface Locale {
  code: string;
  name: string;
  flag: string;
}

export interface BaseLocaleSelectorProps {
  value?: string;
  onLocaleChange: (locale: string) => void;
  enabled?: boolean;
  className?: string;
}

const locales: Locale[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
];

export function BaseLocaleSelector({
  value,
  onLocaleChange,
  enabled = true,
  className,
}: BaseLocaleSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const selectedLocale = locales.find((locale) => locale.code === value);

  const handleLocaleSelect = (localeCode: string) => {
    onLocaleChange(localeCode);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          disabled={!enabled}
          className={className}
          aria-label="Select language"
        >
          {selectedLocale ? (
            <span className="flex items-center gap-2">
              <span>{selectedLocale.flag}</span>
              <span className="hidden sm:inline">{selectedLocale.name}</span>
            </span>
          ) : (
            <Languages className="h-4 w-4" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-1" align="end">
        <div className="space-y-1">
          {locales.map((locale) => (
            <Button
              key={locale.code}
              variant={value === locale.code ? "secondary" : "ghost"}
              size="icon"
              onClick={() => handleLocaleSelect(locale.code)}
              className="w-full justify-start px-2"
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">{locale.flag}</span>
                <span>{locale.name}</span>
              </span>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
