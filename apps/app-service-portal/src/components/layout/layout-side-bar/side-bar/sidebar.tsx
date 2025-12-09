"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail
} from "@repo/pkg-frontend-common-kit/components";
import * as React from "react";
import { Service } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { Minus, Plus, Lock, Inbox, ExternalLink } from "lucide-react";

import { usePathname, useParams } from "next/navigation";
import Image from "next/image";
import OrganizationSwitcher from "./company-switcher";
import { AppLogoDescriptive } from "@/components/custom/app-logo-descriptive";
import Link from "next/link";
import { SidebarSkeleton } from "./side-bar-skeleton";
import { getOriginUrl, getServiceClient } from "@repo/pkg-frontend-common-kit/utils";
import { SERVICE_PORTAL_BASE_URL, USER_PORTAL_BASE_URL } from "@repo/pkg-frontend-common-kit/constants";
import { useAuthedQuery } from "@repo/pkg-frontend-common-kit/hooks";
import type { FindCurrentUserServiceViewsHttpBodyResponse } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const params = useParams<{ organizationId?: string }>();
  const [openItems, setOpenItems] = React.useState<Record<string, boolean>>({});

  const toggleItem = (itemId: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  // Get organizationId from URL params
  const organizationId = params?.organizationId ?? "";
  const orgPrefix = organizationId ? `/${organizationId}` : "";

  // Fetch current user's service views for this organization
  const { data: serviceViews, isLoading, error } = useAuthedQuery<FindCurrentUserServiceViewsHttpBodyResponse>({
    queryKey: ["currentUserServiceViews", organizationId],
    queryFn: async ({ session }) => {
      const response = await getServiceClient(session).findCurrentUserServiceViews({
        pathParams: { organizationId },
      });
      return response.data;
    },
    enabled: Boolean(organizationId),
  });

  if (isLoading || !organizationId) {
    return <SidebarSkeleton />;
  }
  if (error) {
    return <div>Error loading side menu</div>;
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="mt-2 flex justify-center">
            <Link href="/">
              <AppLogoDescriptive />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Empty state when no services */}
        {(!serviceViews || serviceViews.length === 0 || serviceViews.every(org => org.ServiceViews.length === 0)) && (
          <SidebarGroup className="p-4">
            <div className="border rounded-md flex flex-col items-center justify-center py-8 px-4 text-center">
              <div className="rounded-full bg-muted p-3 mb-3">
                <Inbox className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                No Services Available
              </p>
              <p className="text-xs text-muted-foreground/70 mb-4">
                You don&apos;t have access to any services for this organization yet.
              </p>
              <a
                href={getOriginUrl() + USER_PORTAL_BASE_URL}
                className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
              >
                <span>Go to User Portal</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </SidebarGroup>
        )}

        {/* Service views list */}
        {serviceViews?.map((providerOrg) => (
          <SidebarGroup key={providerOrg.providerOrganizationId}>
            <SidebarGroupLabel className="flex items-center gap-2 p-0 pb-1 text-sm">
              <Avatar className="rounded-md w-6 h-6">
                <AvatarImage src={""} />
                <AvatarFallback seed={providerOrg.providerOrganizationId}>
                  {providerOrg.providerOrganizationName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {providerOrg.providerOrganizationName}
            </SidebarGroupLabel>
            <SidebarGroupContent className="pl-1">
              <SidebarMenu>
                {providerOrg.ServiceViews.map((view) => (
                  <Collapsible
                    key={view.id}
                    open={openItems[view.id]}
                    onOpenChange={() => toggleItem(view.id)}
                    className="group/collapsible"
                    defaultOpen={new RegExp(`${orgPrefix}/views/${view.id}(?:/|$)`).test(pathname)}
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          isActive={pathname.includes(
                            `/views/${view.id}`
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <Image
                              src={`${getOriginUrl() + SERVICE_PORTAL_BASE_URL}/assets/services/${view.service}.svg`}
                              alt={view.serviceViewName}
                              width={16}
                              height={16}
                            />
                            <span>{view.serviceViewName}</span>
                          </div>
                          <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                          <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      {view.service === Service.Weclapp ? (
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {view.serviceView.canViewDashboard && (
                              <SidebarMenuSubItem key="dashboard">
                                <SidebarMenuSubButton
                                  aria-disabled
                                  className="pointer-events-none opacity-60"
                                >
                                  <div className="flex items-center gap-2">
                                    <Lock className="h-4 w-4" />
                                    <span>Dashboard</span>
                                  </div>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )}
                            {view.serviceView.canViewQuotes && (
                              <SidebarMenuSubItem key="quotations">
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname.includes(
                                    `/views/${view.id}/weclapp/quotations`
                                  )}
                                >
                                  <Link
                                    href={`${orgPrefix}/views/${view.id}/weclapp/quotations`}
                                  >
                                    Quotations
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )}
                            {view.serviceView.canViewSalesOrders && (
                              <SidebarMenuSubItem key="sales-orders">
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname.includes(
                                    `/views/${view.id}/weclapp/sales-orders`
                                  )}
                                >
                                  <Link
                                    href={`${orgPrefix}/views/${view.id}/weclapp/sales-orders`}
                                  >
                                    Sales Orders
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )}
                            {view.serviceView.canViewInvoices && (
                              <SidebarMenuSubItem key="sales-invoices">
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname.includes(
                                    `/views/${view.id}/weclapp/sales-invoices`
                                  )}
                                >
                                  <Link
                                    href={`${orgPrefix}/views/${view.id}/weclapp/sales-invoices`}
                                  >
                                    Sales Invoices
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )}
                            {view.serviceView.canViewProjects && (
                              <SidebarMenuSubItem key="projects">
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname.includes(
                                    `/views/${view.id}/weclapp/projects`
                                  )}
                                >
                                  <Link
                                    href={`${orgPrefix}/views/${view.id}/weclapp/projects`}
                                  >
                                    Projects
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )}
                            {view.serviceView.canViewTickets && (
                              <SidebarMenuSubItem key="tickets">
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname.includes(
                                    `/views/${view.id}/weclapp/tickets`
                                  )}
                                >
                                  <Link
                                    href={`${orgPrefix}/views/${view.id}/weclapp/tickets`}
                                  >
                                    Tickets
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      ) : view.service === Service.Acmp ? (
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {view.serviceView.canViewDashboard && (
                              <SidebarMenuSubItem key="dashboard">
                                <SidebarMenuSubButton
                                  aria-disabled
                                  className="pointer-events-none opacity-60"
                                >
                                  <div className="flex items-center gap-2">
                                    <Lock className="h-4 w-4" />
                                    <span>Dashboard</span>
                                  </div>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )}
                            {view.serviceView.canViewJobs && (
                              <SidebarMenuSubItem key="jobs">
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname.includes(
                                    `/views/${view.id}/acmp/jobs`
                                  )}
                                >
                                  <Link
                                    href={`${orgPrefix}/views/${view.id}/acmp/jobs`}
                                  >
                                    Jobs
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )}
                            {view.serviceView.canViewDevices && (
                              <SidebarMenuSubItem key="clients">
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname.includes(
                                    `/views/${view.id}/acmp/clients`
                                  )}
                                >
                                  <Link
                                    href={`${orgPrefix}/views/${view.id}/acmp/clients`}
                                  >
                                    Clients
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )}
                            {view.serviceView.canViewTickets && (
                              <SidebarMenuSubItem key="tickets">
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname.includes(
                                    `/views/${view.id}/acmp/tickets`
                                  )}
                                >
                                  <Link
                                    href={`${orgPrefix}/views/${view.id}/acmp/tickets`}
                                  >
                                    Tickets
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )}
                            {view.serviceView.canViewAssets && (
                              <SidebarMenuSubItem key="assets">
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname.includes(
                                    `/views/${view.id}/acmp/assets`
                                  )}
                                >
                                  <Link
                                    href={`${orgPrefix}/views/${view.id}/acmp/assets`}
                                  >
                                    Assets
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      ) : null}
                    </SidebarMenuItem>
                  </Collapsible>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <OrganizationSwitcher organizationId={organizationId} />
      </SidebarFooter>
    </Sidebar>
  );
}
