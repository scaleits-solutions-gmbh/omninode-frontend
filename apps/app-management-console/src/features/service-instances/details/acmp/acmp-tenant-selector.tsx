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
  Skeleton,
} from "frontend-common-kit/components";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

const tenants = [
  {
    value: "1",
    label: "Tenant 1",
  },
  {
    value: "2",
    label: "Tenant 2",
  },
  {
    value: "3",
    label: "Tenant 3",
  },
  {
    value: "4",
    label: "Tenant 4",
  },
  {
    value: "5",
    label: "Tenant 5",
  },
];

interface AcmpTenantSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export default function AcmpTenantSelector({
  value,
  onValueChange,
}: AcmpTenantSelectorProps) {
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const { isLoading, isError } = useQuery({
    queryKey: ["acmpTenants"],
    queryFn: async () => {
      //wait 1.5 seconds
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return tenants;
    },
  });

  if (isLoading) {
    return <Skeleton className="h-9 w-full" />;
  }

  if (isError) {
    return <div>Error loading tenants.</div>;
  }

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={popoverOpen}
          className="w-full justify-between"
        >
          {value
            ? tenants.find((tenant) => tenant.value === value)?.label
            : "Select ACMP tenant..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder="Search tenant..." className="h-9" />
          <CommandList>
            <CommandEmpty>No tenant found.</CommandEmpty>
            <CommandGroup>
              {tenants.map((tenant) => (
                <CommandItem
                  key={tenant.value}
                  value={tenant.value}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue === value ? "" : currentValue);
                    setPopoverOpen(false);
                  }}
                >
                  {tenant.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === tenant.value ? "opacity-100" : "opacity-0",
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
