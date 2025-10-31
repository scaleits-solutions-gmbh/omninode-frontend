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
  Skeleton,
} from "@repo/pkg-frontend-common-kit/components";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

const organizations = [
  {
    value: "1",
    label: "Weclapp Organization 1",
  },
  {
    value: "2",
    label: "Weclapp Organization 2",
  },
  {
    value: "3",
    label: "Weclapp Organization 3",
  },
  {
    value: "4",
    label: "Weclapp Organization 4",
  },
  {
    value: "5",
    label: "Weclapp Organization 5",
  },
];

interface AcmpOrganizationSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export default function AcmpOrganizationSelector({
  value,
  onValueChange,
}: AcmpOrganizationSelectorProps) {
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const { isLoading, isError } = useQuery({
    queryKey: ["acmpOrganizations"],
    queryFn: async () => {
      //wait 1 second
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return organizations;
    },
  });

  if (isLoading) {
    return <Skeleton className="h-9 w-full" />;
  }

  if (isError) {
    return <div>Error loading organizations.</div>;
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
            ? organizations.find((organization) => organization.value === value)?.label
            : "Select Weclapp organization..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder="Search organization..." className="h-9" />
          <CommandList>
            <CommandEmpty>No organization found.</CommandEmpty>
            <CommandGroup>
              {organizations.map((organization) => (
                <CommandItem
                  key={organization.value}
                  value={organization.value}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue === value ? "" : currentValue);
                    setPopoverOpen(false);
                  }}
                >
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
