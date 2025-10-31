"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  ScrollArea,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Skeleton,
  SearchInput
} from "@repo/pkg-frontend-common-kit/components";
import * as React from "react";
import { ChevronsUpDown, Check} from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { useGetCurrentOrganization } from "@repo/pkg-frontend-common-kit/hooks";



export default function TenantSwitcher() {
  // Move all hooks to the top before any conditional logic
  const [search, setSearch] = React.useState("");
  const isMobile = useIsMobile();
  const { companies, selectedOrganizationId, isLoading, error, setSelectedOrganizationId, selectedOrganization } = useGetCurrentOrganization();


  if (isLoading || !companies) {
    return (
      <div className="flex items-center w-full gap-2 p-2">
        <Skeleton className="h-8 w-8 rounded-md" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-sm text-muted-foreground">Failed to load</div>;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="rounded-sm">
                <AvatarImage />
                <AvatarFallback seed={selectedOrganization?.id}>
                  {selectedOrganization?.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {selectedOrganization?.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {"Organization"}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "top" : "right"}
          >
            <ScrollArea className="max-h-[300px]">
              {companies?.map((company) => (
                <DropdownMenuItem
                  key={company.id}
                  onClick={() => setSelectedOrganizationId(company.id)}
                  className="gap-2 p-2"
                >
                  <Avatar className="size-6 rounded-sm">
                    <AvatarImage />
                    <AvatarFallback seed={company.id}>
                      {company.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {company.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {"Organization"}
                    </span>
                  </div>
                  {company.id === selectedOrganizationId && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </DropdownMenuItem>
              ))}
            </ScrollArea>
            <DropdownMenuSeparator />
            <div className="p-2 data-[state=open]:bg-sidebar-accent z-10">
              <SearchInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
