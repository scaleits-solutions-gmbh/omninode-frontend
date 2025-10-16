"use client";
import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Skeleton,
  Button,
  Avatar,
  AvatarFallback,
  AvatarImage,
  ScrollArea,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SearchInput,
} from "@repo/pkg-frontend-common-kit/components";
import { FeCompany } from "@/types/fe-company";
import { switchCompany } from "@/lib/api-client/auth/switch-company";
import { toast } from "sonner";
import { ApiClient } from "@repo/lib-api-client";
import { useSession } from "next-auth/react";
import { useGetCurrentCompany } from "@repo/pkg-frontend-common-kit/hooks";


export default function CompanySwitcher() {
  // Move all hooks to the top before any conditional logic
  const [search, setSearch] = React.useState("");
  const isMobile = useIsMobile();
  const { companies,selectedCompanyId, isLoading, error, setSelectedCompanyId, selectedCompany } = useGetCurrentCompany();


  if (isLoading || !companies) {
    return (
      <div className="flex items-center gap-2 px-2">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-4 w-24" />
      </div>
    );
  }

  if (error) {
    return <div className="text-sm text-muted-foreground">Failed to load</div>;
  }

  // After loading, if there are no companies, render nothing
  if (companies.length === 0) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 gap-2 hover:bg-accent hover:text-accent-foreground"
        >
          <Avatar className="h-6 w-6 rounded-sm">
            <AvatarImage />
            <AvatarFallback seed={selectedCompanyId ?? undefined}>
              {selectedCompany?.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium truncate max-w-24">
            {selectedCompany?.name}
          </span>
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-56 rounded-lg"
        align="end"
        side={isMobile ? "top" : "bottom"}
      >
        <ScrollArea className="max-h-[300px]">
          {companies.map((company: FeCompany) => (
            <DropdownMenuItem
              key={company.id}
              onClick={() => setSelectedCompanyId(company.id)}
              className="gap-2 p-2"
            >
              <Avatar className="size-6 rounded-sm">
                <AvatarImage />
                <AvatarFallback seed={company.id}>
                  {company.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{company.name}</span>
                <span className="text-xs text-muted-foreground">
                  {company.type}
                </span>
              </div>
              {company.id === selectedCompanyId && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </ScrollArea>
        <DropdownMenuSeparator className="hidden"/>
        <div className="p-2 data-[state=open]:bg-sidebar-accent z-10 hidden">
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
