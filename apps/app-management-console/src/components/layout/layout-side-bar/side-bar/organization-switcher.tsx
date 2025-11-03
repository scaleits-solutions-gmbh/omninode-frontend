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
  SearchInput,
} from "@repo/pkg-frontend-common-kit/components";
import { useEffect, useState } from "react";
import { ChevronsUpDown, Check } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

import { useIsMobile } from "@/hooks/use-mobile";
import { useGetCurrentOrganization } from "@repo/pkg-frontend-common-kit/hooks";
import { UserOrganizationReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
type organizationSwitcherProps = {
  organizationId?: string;
};

const transferablePaths = [
  "/dashboard",
  "/service-instances",
  "/organization-relationships",
  "/users",
  "/groups",
  "/billing",
  "/organization-settings",
];

export default function OrganizationSwitcher({
  organizationId,
}: organizationSwitcherProps) {
  // Move all hooks to the top before any conditional logic
  const [search, setSearch] = useState("");
  const isMobile = useIsMobile();
  const router = useRouter();
  const pathname = usePathname();
  const {
    companies,
    selectedOrganizationId,
    isLoading,
    error,
    setSelectedOrganizationId,
    selectedOrganization,
  } = useGetCurrentOrganization();

  // Initialize a default selection only when no explicit organizationId is provided
  // and no selection exists yet. Avoid mutating global selection for display-only mode.
  useEffect(() => {
    if (organizationId) return; // display-only mode
    if (companies?.length && !selectedOrganization) {
      setSelectedOrganizationId(companies[0].organizationId);
    }
  }, [organizationId, companies, selectedOrganization, setSelectedOrganizationId]);

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

  const organizationOnDisplay: UserOrganizationReadModel | undefined = organizationId
    ? companies.find((organization) => organization.organizationId === organizationId)
    : selectedOrganization;

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
                <AvatarFallback seed={organizationOnDisplay?.organizationId}>
                  {organizationOnDisplay?.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {organizationOnDisplay?.name}
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
              {companies?.map((organization) => (
                <DropdownMenuItem
                  key={organization.id}
                  onClick={() => {
                    setSelectedOrganizationId(organization.organizationId);
                    const segments = pathname.split("/").filter(Boolean);
                    const currentOrgId = organizationId ?? selectedOrganizationId;
                    const subpathIndex = segments.length && currentOrgId && segments[0] === currentOrgId ? 1 : 0;
                    const currentTopLevel = segments[subpathIndex] ? `/${segments[subpathIndex]}` : "/dashboard";

                    const allowed = new Set(transferablePaths);

                    const target = allowed.has(currentTopLevel)
                      ? `/${organization.organizationId}${currentTopLevel}`
                      : `/${organization.organizationId}/dashboard`;

                    router.replace(target);
                  }}
                  className="gap-2 p-2"
                >
                  <Avatar className="size-6 rounded-sm">
                    <AvatarImage />
                    <AvatarFallback seed={organization.organizationId}>
                      {organization.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{organization.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {"Organization"}
                    </span>
                  </div>
                  {organization.organizationId === selectedOrganizationId && (
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
