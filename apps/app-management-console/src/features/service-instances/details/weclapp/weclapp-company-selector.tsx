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

const companys = [
  {
    value: "1",
    label: "Weclapp Company 1",
  },
  {
    value: "2",
    label: "Weclapp Company 2",
  },
  {
    value: "3",
    label: "Weclapp Company 3",
  },
  {
    value: "4",
    label: "Weclapp Company 4",
  },
  {
    value: "5",
    label: "Weclapp Company 5",
  },
];

interface AcmpCompanySelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export default function AcmpCompanySelector({
  value,
  onValueChange,
}: AcmpCompanySelectorProps) {
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const { isLoading, isError } = useQuery({
    queryKey: ["acmpCompanys"],
    queryFn: async () => {
      //wait 1 second
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return companys;
    },
  });

  if (isLoading) {
    return <Skeleton className="h-9 w-full" />;
  }

  if (isError) {
    return <div>Error loading companys.</div>;
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
            ? companys.find((company) => company.value === value)?.label
            : "Select Weclapp company..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder="Search company..." className="h-9" />
          <CommandList>
            <CommandEmpty>No company found.</CommandEmpty>
            <CommandGroup>
              {companys.map((company) => (
                <CommandItem
                  key={company.value}
                  value={company.value}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue === value ? "" : currentValue);
                    setPopoverOpen(false);
                  }}
                >
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
