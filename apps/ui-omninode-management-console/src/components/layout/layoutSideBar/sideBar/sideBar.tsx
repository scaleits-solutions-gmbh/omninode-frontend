"use client";
import * as React from "react";

import { Users, Smile, Layers2 } from "lucide-react";
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
} from "@/components/ui/sidebar";
import AppLogo from "@/components/display/appLogo";
import TenantSwitcher from "./companySwitcher";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="mx-auto">
          <AppLogo />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Company</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
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
                  isActive={pathname.startsWith("/services")}
                >
                  <Link
                    className="flex items-center gap-2"
                    href="/service-instances"
                  >
                    <Layers2 />
                    <span>Service Instances</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith("/company-relations")}
                >
                  <Link
                    className="flex items-center gap-2"
                    href="/company-relations"
                  >
                    <Smile />
                    <span>Company Relations</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Access controls</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith("/users")}
                >
                  <Link className="flex items-center gap-2" href="/users">
                    <Users />
                    <span>Users</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith("/identity-providers")}>
                  <Link className="flex items-center gap-2" href="/identity-providers">
                    <KeyRound />
                    <span>Identity Providers</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith("/billing")}>
                  <Link className="flex items-center gap-2" href="/billing">
                    <CreditCard />
                    <span>Billing</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith("/company-settings")}
                >
                  <Link className="flex items-center gap-2" href="/company-settings">
                    <Settings2 />
                    <span>Company Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>*/}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <TenantSwitcher />
      </SidebarFooter>
    </Sidebar>
  );
}
