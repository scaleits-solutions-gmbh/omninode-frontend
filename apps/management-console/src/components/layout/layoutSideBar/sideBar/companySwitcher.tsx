"use client";
import * as React from "react";
import { ChevronsUpDown} from "lucide-react";
import SearchInput from "@/components/input/searchInput";

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
import { getViews } from "@/lib/apiClient/views/view";
import { useQuery } from "@tanstack/react-query";
import { View } from "@/types/feView";
import { Skeleton } from "@/components/ui/skeleton";


export default function TenantSwitcher() {
  // Move all hooks to the top before any conditional logic
  const [search, setSearch] = React.useState("");
  const isMobile = useIsMobile();  
  const [activeOrganization, setActiveOrganization] = React.useState<View | undefined>(undefined);
  
  const { data: views, isLoading, error } = useQuery({
    queryKey: ["views"],
    queryFn: getViews,
  });

  // Use useEffect to set the active organization when data is loaded
  React.useEffect(() => {
    if (views && views.length > 0 && !activeOrganization) {
      setActiveOrganization(views[0]);
      localStorage.setItem("currentCompanyId", views[0].companyId);
    }
  }, [views, activeOrganization]);

  if (isLoading) {
    return (
      <div className="flex items-center w-full gap-2">
        <Skeleton className="h-9 w-9 rounded-md" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    );
  }
  
  if (error || !views) {
    return <div>Failed to fetch views</div>;
  }

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
                <AvatarImage src={activeOrganization.companyImageUrl} />
                <AvatarFallback seed={activeOrganization.companyId}>
                  {activeOrganization.companyName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {activeOrganization.companyName}
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
              {views.map((view: View) => (
                <DropdownMenuItem
                  key={view.companyId}
                  onClick={() => setActiveOrganization(view)}
                  className="gap-2 p-2"
                >
                  <Avatar className="size-6 rounded-sm">
                    <AvatarImage src={view.companyImageUrl} />
                    <AvatarFallback seed={view.companyId}>
                      {view.companyName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {view.companyName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {view.type}
                    </span>
                  </div>
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
