"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCompanyId } from "@/hooks/use-session";
import { switchCompany } from "@/lib/api-client/auth/switch-company";
import { getViews } from "@/lib/api-client/views/view";
import { View } from "@/types/fe/fe-view";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  ScrollArea,
  Skeleton,
  SearchInput,
} from "frontend-common-kit";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

export default function TenantSwitcher() {
  // Move all hooks to the top before any conditional logic
  const queryClient = useQueryClient();
  const [search, setSearch] = React.useState("");
  const isMobile = useIsMobile();
  const [activeOrganization, setActiveOrganization] = React.useState<
    View | undefined
  >(undefined);

  const {
    data: views,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["views"],
    queryFn: getViews,
  });
  const currentCompanyId = useCompanyId();

  // Mutation for switching companies
  const switchCompanyMutation = useMutation({
    mutationFn: (companyId: string) => switchCompany(companyId),
    onSettled: () => {
      toast.dismiss("switch-company");
    },
    onSuccess: (_, companyId) => {
      toast.success("Company switched successfully");
      // Reset all queries to show loading states and get fresh company data
      queryClient.resetQueries();
      // Find and set the active organization
      const view = views?.find((v) => v.companyId === companyId);
      if (view) {
        setActiveOrganization(view);
      }
    },
    onError: () => {
      toast.error("Failed to switch company");
    },
  });

  // Use useEffect to set the active organization when data is loaded
  React.useEffect(() => {
    if (views && views.length > 0 && !activeOrganization) {
      setActiveOrganization(
        views.find((v) => v.companyId === currentCompanyId) || views[0],
      );
    }
  }, [views, activeOrganization, currentCompanyId]);

  const handleCompanySwitch = (view: View) => {
    if (view.companyId !== activeOrganization?.companyId) {
      toast.loading("Switching company...", {
        id: "switch-company",
      });
      switchCompanyMutation.mutate(view.companyId);
    }
  };

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
              disabled={switchCompanyMutation.isPending}
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
                  onClick={() => handleCompanySwitch(view)}
                  className="gap-2 p-2"
                  disabled={switchCompanyMutation.isPending}
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
                  {/* Show loading indicator for the company being switched to */}
                  {switchCompanyMutation.isPending &&
                    view.companyId === switchCompanyMutation.variables && (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
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
