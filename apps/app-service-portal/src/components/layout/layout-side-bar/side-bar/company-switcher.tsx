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
import { useState, useMemo } from "react";
import { ChevronsUpDown, Check } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  useRouteCurrentOrganization,
  setPersistedOrganizationId,
} from "@repo/pkg-frontend-common-kit/hooks";
import {
  UserOrganizationReadModel,
  Locale,
  organizationRoleLabel,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

type OrganizationSwitcherProps = {
  organizationId?: string;
};

// Paths that can be safely transferred when switching organizations
const transferablePaths = ["/views"];

export default function OrganizationSwitcher({
  organizationId: propOrganizationId,
}: OrganizationSwitcherProps) {
  const [search, setSearch] = useState("");
  const isMobile = useIsMobile();
  const router = useRouter();
  const pathname = usePathname();

  const {
    organizationId: routeOrganizationId,
    organizations,
    isLoading,
    error,
  } = useRouteCurrentOrganization({
    syncToPersisted: true,
  });

  // Use prop organizationId if provided, otherwise use route organizationId
  const currentOrganizationId = propOrganizationId || routeOrganizationId;

  // Filter organizations based on search
  const filteredOrganizations = useMemo(() => {
    if (!organizations) return undefined;
    if (!search.trim()) return organizations;

    const searchLower = search.toLowerCase();
    return organizations.filter((org) =>
      org.name.toLowerCase().includes(searchLower)
    );
  }, [organizations, search]);

  // Find the organization to display in the trigger button
  const organizationOnDisplay = useMemo(() => {
    if (!organizations?.length) return undefined;
    if (currentOrganizationId) {
      return organizations.find(
        (org) => org.organizationId === currentOrganizationId
      );
    }
    return organizations[0];
  }, [organizations, currentOrganizationId]);

  if (isLoading || !filteredOrganizations) {
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

  const handleOrganizationSelect = (org: UserOrganizationReadModel) => {
    setPersistedOrganizationId(org.organizationId);

    // Parse current path to determine navigation target
    const segments = pathname.split("/").filter(Boolean);
    const subpathIndex =
      segments.length && currentOrganizationId && segments[0] === currentOrganizationId
        ? 1
        : 0;
    const currentTopLevel = segments[subpathIndex]
      ? `/${segments[subpathIndex]}`
      : "/views";

    const allowed = new Set(transferablePaths);
    const target = allowed.has(currentTopLevel)
      ? `/${org.organizationId}${currentTopLevel}`
      : `/${org.organizationId}`;

    router.replace(target);
  };

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
                  {organizationOnDisplay?.role
                    ? organizationRoleLabel(organizationOnDisplay.role, Locale.En)
                    : "Organization"}
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
            <div className="p-2">
              <SearchInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <DropdownMenuSeparator />
            <ScrollArea className="max-h-[300px]">
              {filteredOrganizations?.map((org) => {
                const isSelected = org.organizationId === currentOrganizationId;

                return (
                  <DropdownMenuItem
                    key={org.id}
                    onClick={() => handleOrganizationSelect(org)}
                    className="gap-2 p-2"
                  >
                    <Avatar className="size-6 rounded-sm">
                      <AvatarImage />
                      <AvatarFallback seed={org.organizationId}>
                        {org.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">{org.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {org.role
                          ? organizationRoleLabel(org.role, Locale.En)
                          : "Organization"}
                      </span>
                    </div>
                    {isSelected && <Check className="h-4 w-4 text-primary" />}
                  </DropdownMenuItem>
                );
              })}
              {filteredOrganizations?.length === 0 && (
                <div className="p-4 text-sm text-muted-foreground text-center">
                  No organizations found
                </div>
              )}
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
