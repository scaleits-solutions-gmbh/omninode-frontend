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

const groups = [
  {
    value: "1",
    label: "Group 1",
  },
  {
    value: "2",
    label: "Group 2",
  },
  {
    value: "3",
    label: "Group 3",
  },
  {
    value: "4",
    label: "Group 4",
  },
  {
    value: "5",
    label: "Group 5",
  },
];

interface AcmpGroupSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export default function AcmpGroupSelector({
  value,
  onValueChange,
}: AcmpGroupSelectorProps) {
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const { isLoading, isError } = useQuery({
    queryKey: ["acmpGroups"],
    queryFn: async () => {
      //wait 1 second
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return groups;
    },
  });

  if (isLoading) {
    return <Skeleton className="h-9 w-full" />;
  }

  if (isError) {
    return <div>Error loading groups.</div>;
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
            ? groups.find((group) => group.value === value)?.label
            : "Select ACMP user group..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder="Search group..." className="h-9" />
          <CommandList>
            <CommandEmpty>No group found.</CommandEmpty>
            <CommandGroup>
              {groups.map((group) => (
                <CommandItem
                  key={group.value}
                  value={group.value}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue === value ? "" : currentValue);
                    setPopoverOpen(false);
                  }}
                >
                  {group.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === group.value ? "opacity-100" : "opacity-0",
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
