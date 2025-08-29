"use client";
import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import SearchInput from "@/components/input/SearchInput";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

type Organization = {
  id: string;
  tenantId: string;
  IsMaster: boolean;
  name: string;
  type: "Service Provider" | "Customer";
  imageUrl: string;
};

export default function TenantSwitcher() {
  const companies: Organization[] = [
    {
      id: "1",
      tenantId: "1",
      IsMaster: true,
      name: "ScaleITS",
      type: "Service Provider",
      imageUrl: "",
    },
    {
      id: "2",
      tenantId: "1",
      IsMaster: false,
      name: "ScaleITS ES",
      type: "Customer",
      imageUrl: "",
    },
    {
      id: "3",
      tenantId: "1",
      IsMaster: false,
      name: "ScaleITS Solutions",
      type: "Customer",
      imageUrl: "",
    },
  ];

  const [search, setSearch] = React.useState("");

  const isMobile = useIsMobile();
  const [activeOrganization, setActiveOrganization] = React.useState(
    companies[0],
  );

  if (!activeOrganization) {
    return null;
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
                <AvatarImage src={activeOrganization.imageUrl} />
                <AvatarFallback seed={activeOrganization.id}>
                  {activeOrganization.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {activeOrganization.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {activeOrganization.type}
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
              {companies.map((organization: Organization) => (
                <DropdownMenuItem
                  key={organization.id}
                  onClick={() => setActiveOrganization(organization)}
                  className="gap-2 p-2"
                >
                  <Avatar className="size-6 rounded-sm">
                    <AvatarImage src={organization.imageUrl} />
                    <AvatarFallback seed={organization.id}>
                      {organization.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {organization.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {organization.type}
                    </span>
                  </div>
                </DropdownMenuItem>
              ))}
            </ScrollArea>
            <DropdownMenuSeparator />
            <div className="p-2 bg-white z-10">
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
