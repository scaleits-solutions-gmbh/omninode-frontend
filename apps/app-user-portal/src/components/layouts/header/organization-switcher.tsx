"use client";
import * as React from "react";
import { Check, ChevronDown, Plus } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
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
import { UserOrganizationReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { useGetCurrentOrganization } from "@repo/pkg-frontend-common-kit/hooks";
import { MANAGEMENT_CONSOLE_BASE_URL } from "@repo/pkg-frontend-common-kit/constants";
import { getOriginUrl } from "@repo/pkg-frontend-common-kit/utils";
import Link from "next/link";


export default function OrganizationSwitcher() {
  // Move all hooks to the top before any conditional logic
  const [search, setSearch] = React.useState("");
  const isMobile = useIsMobile();
  const { companies,selectedOrganizationId, isLoading, error, setSelectedOrganizationId, selectedOrganization } = useGetCurrentOrganization();


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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {companies.length > 0 ? (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 gap-2 hover:bg-accent hover:text-accent-foreground"
        >
          <Avatar className="h-6 w-6 rounded-sm">
            <AvatarImage />
            <AvatarFallback seed={selectedOrganizationId ?? undefined}>
              {selectedOrganization?.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium truncate max-w-24">
            {selectedOrganization?.name}
          </span>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </Button>
        ) : (
          <Button variant="ghost" size="sm" className="h-8 px-2 gap-2 hover:bg-accent hover:text-accent-foreground">
            <span className="text-sm font-medium">No Organization</span>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-56 rounded-lg"
        align="end"
        side={isMobile ? "top" : "bottom"}
      >
        <ScrollArea className="max-h-[300px]">
          <Link href={getOriginUrl() + MANAGEMENT_CONSOLE_BASE_URL + "/new-organization"}>
            <Button variant="ghost" size="sm" className="w-full justify-start gap-2 p-2">
              <Plus className="h-4 w-4" />
              <span className="text-sm font-medium">New Organization</span>
            </Button>
          </Link>
          {companies.map((company: UserOrganizationReadModel) => (
            <DropdownMenuItem
              key={company.id}
              onClick={() => setSelectedOrganizationId(company.organizationId)}
              className="gap-2 p-2"
            >
              <Avatar className="size-6 rounded-sm">
                <AvatarImage />
                <AvatarFallback seed={company.organizationId}>
                  {company.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{company.name}</span>
                <span className="text-xs text-muted-foreground">
                  {company.role}
                </span>
              </div>
              {company.organizationId === selectedOrganizationId && (
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
