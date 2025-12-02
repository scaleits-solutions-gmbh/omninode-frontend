"use client";

import { AppLogoDescriptive } from "@/components/custom/app-logo-descriptive";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@repo/pkg-frontend-common-kit/components";
import { useRouteCurrentOrganization } from "@repo/pkg-frontend-common-kit/hooks";
import { CreditCard, Group, Layers2, LayoutDashboard, Settings2, Smile, Users } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import * as React from "react";
import OrganizationSwitcher from "./organization-switcher";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const params = useParams<{ organizationId?: string }>();
  const { organizationId: routeOrgId } = useRouteCurrentOrganization();

  const organizationId = params?.organizationId ?? routeOrgId ?? "";
  const orgPrefix = organizationId ? `/${organizationId}` : "";

  const isActivePath = (subPath: string, exact?: boolean) => {
    const fullPath = `${orgPrefix}${subPath}` || "/";
    if (exact) {
      return pathname === fullPath || pathname === `${fullPath}/`;
    }
    return pathname === fullPath || pathname.startsWith(`${fullPath}`);
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="pt-4">
        <div className="mx-auto">
          <AppLogoDescriptive customSize={42} />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Business</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActivePath("/dashboard") || isActivePath("/", true)}
                >
                  <Link className="flex items-center gap-2" href={organizationId ? `${orgPrefix}/dashboard` : "/dashboard"}>
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/*<SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/"}>
                  <Link className="flex items-center gap-2" href="/">
                    <Home />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>*/}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActivePath("/service-instances")}
                >
                  <Link
                    className="flex items-center gap-2"
                    href={`${orgPrefix}/service-instances`}
                  >
                    <Layers2 />
                    <span>Service Instances</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActivePath("/organization-relationships")}
                >
                  <Link
                    className="flex items-center gap-2"
                    href={`${orgPrefix}/organization-relationships`}
                  >
                    <Smile />
                    <span>Org Relationships</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Organization</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActivePath("/users")}
                >
                  <Link className="flex items-center gap-2" href={`${orgPrefix}/users`}>
                    <Users />
                    <span>Users</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActivePath("/groups")}
                >
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Group />
                    <span>Groups</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActivePath("/billing")}
                >
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CreditCard />
                    <span>Billing</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActivePath("/organization-settings")}
                >
                  <Link className="flex items-center gap-2" href={`${orgPrefix}/organization-settings`}>
                    <Settings2 />
                    <span>Organization Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <OrganizationSwitcher organizationId={organizationId} />
      </SidebarFooter>
    </Sidebar>
  );
}
