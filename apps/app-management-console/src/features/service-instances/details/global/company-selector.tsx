"use client";

import { cn } from "@/lib/utils/ui/cn";
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@repo/pkg-frontend-common-kit/components";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

const companies = [
  {
    value: "1",
    label: "Company 1",
    imageUrl: "https://api.dicebear.com/9.x/glass/svg?seed=company1",
  },
  {
    value: "2",
    label: "Company 2",
    imageUrl: "https://api.dicebear.com/9.x/glass/svg?seed=company2",
  },
  {
    value: "3",
    label: "Company 3",
    imageUrl: "https://api.dicebear.com/9.x/glass/svg?seed=company3",
  },
  {
    value: "4",
    label: "Company 4",
    imageUrl: "https://api.dicebear.com/9.x/glass/svg?seed=company4",
  },
  {
    value: "5",
    label: "Company 5",
    imageUrl: "https://api.dicebear.com/9.x/glass/svg?seed=company5",
  },
];

interface CompanySelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export default function CompanySelector({
  value,
  onValueChange,
}: CompanySelectorProps) {
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={popoverOpen}
          className="w-full justify-between"
        >
          <div className="flex items-center gap-2">
            {value && (
              <Avatar className="h-6 w-6 rounded-sm">
                <AvatarImage
                  src={
                    companies.find((company) => company.value === value)
                      ?.imageUrl
                  }
                  alt={
                    companies.find((company) => company.value === value)?.label
                  }
                />
                <AvatarFallback seed={value}>
                  {companies
                    .find((company) => company.value === value)
                    ?.label.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            )}
            {value
              ? companies.find((company) => company.value === value)?.label
              : "Select company..."}
          </div>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder="Search company..." className="h-9" />
          <CommandList>
            <CommandEmpty>No company found.</CommandEmpty>
            <CommandGroup>
              {companies.map((company) => (
                <CommandItem
                  key={company.value}
                  value={company.value}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue === value ? "" : currentValue);
                    setPopoverOpen(false);
                  }}
                  className="flex items-center gap-2"
                >
                  <Avatar className="h-6 w-6 rounded-sm">
                    <AvatarImage src={company.imageUrl} alt={company.label} />
                    <AvatarFallback seed={company.value}>
                      {company.label.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  {company.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === company.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
