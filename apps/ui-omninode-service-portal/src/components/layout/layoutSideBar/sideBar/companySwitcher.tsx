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
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchCompanies } from "@/lib/apiClient/company";
import { FeCompany } from "@/types/feCompany";



export default function TenantSwitcher() {
  // Move all hooks to the top before any conditional logic
  const [search, setSearch] = React.useState("");
  const isMobile = useIsMobile();  
  const [activeOrganization, setActiveOrganization] = React.useState<FeCompany | undefined>(undefined);
  
  const { data: companies, isLoading, error } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const companies = (await fetchCompanies()).items;
      return companies;
    },
  });

  // Use useEffect to set the active organization when data is loaded
  React.useEffect(() => {
    if (companies && companies.length > 0 && !activeOrganization) {
      setActiveOrganization(companies[0]);
      localStorage.setItem("currentCompanyId", companies[0].id);
    }
  }, [companies, activeOrganization]);

  if (isLoading) {
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
  
  if (error || !companies) {
    return <div>Failed to fetch companies</div>;
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
                <AvatarImage />
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
              {companies.map((company: FeCompany) => (
                <DropdownMenuItem
                  key={company.id}
                  onClick={() => setActiveOrganization(company)}
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
                      {company.type}
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
