/* Commented out - service-instances feature
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
    label: "Organization 1",
    imageUrl: "https://api.dicebear.com/9.x/glass/svg?seed=organization1",
  },
  {
    value: "2",
    label: "Organization 2",
    imageUrl: "https://api.dicebear.com/9.x/glass/svg?seed=organization2",
  },
  {
    value: "3",
    label: "Organization 3",
    imageUrl: "https://api.dicebear.com/9.x/glass/svg?seed=organization3",
  },
  {
    value: "4",
    label: "Organization 4",
    imageUrl: "https://api.dicebear.com/9.x/glass/svg?seed=organization4",
  },
  {
    value: "5",
    label: "Organization 5",
    imageUrl: "https://api.dicebear.com/9.x/glass/svg?seed=organization5",
  },
];

interface OrganizationSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export default function OrganizationSelector({
  value,
  onValueChange,
}: OrganizationSelectorProps) {
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
                    companies.find((organization) => organization.value === value)
                      ?.imageUrl
                  }
                  alt={
                    companies.find((organization) => organization.value === value)?.label
                  }
                />
                <AvatarFallback seed={value}>
                  {companies
                    .find((organization) => organization.value === value)
                    ?.label.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            )}
            {value
              ? companies.find((organization) => organization.value === value)?.label
              : "Select organization..."}
          </div>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder="Search organization..." className="h-9" />
          <CommandList>
            <CommandEmpty>No organization found.</CommandEmpty>
            <CommandGroup>
              {companies.map((organization) => (
                <CommandItem
                  key={organization.value}
                  value={organization.value}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue === value ? "" : currentValue);
                    setPopoverOpen(false);
                  }}
                  className="flex items-center gap-2"
                >
                  <Avatar className="h-6 w-6 rounded-sm">
                    <AvatarImage src={organization.imageUrl} alt={organization.label} />
                    <AvatarFallback seed={organization.value}>
                      {organization.label.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  {organization.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === organization.value ? "opacity-100" : "opacity-0",
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
*/
