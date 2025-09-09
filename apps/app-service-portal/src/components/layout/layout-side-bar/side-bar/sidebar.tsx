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
import { Service } from "@scaleits-solutions-gmbh/services";
import { Minus, Plus } from "lucide-react";



import { usePathname } from "next/navigation";
import Image from "next/image";
import TenantSwitcher from "./company-switcher";
import { AppLogoDescriptive } from "@/components/custom/app-logo-descriptive";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { SidebarSkeleton } from "./side-bar-skeleton";
import { getServiceInstances } from "@/lib/api-client/service-instances";
import { getOriginUrl } from "@repo/pkg-frontend-common-kit/utils";
import { SERVICE_PORTAL_BASE_URL } from "@repo/pkg-frontend-common-kit/constants";
import { useGetCurrentCompany } from "@repo/pkg-frontend-common-kit/hooks";

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const [openItems, setOpenItems] = React.useState<Record<string, boolean>>({});

  const toggleItem = (itemId: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };


const {selectedCompany, isLoading, error} = useGetCurrentCompany();

  if (isLoading) {
    return <SidebarSkeleton />;
  }
  if (error) {
    return <div>Error loading side menu</div>;
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="p-0 flex justify-center">
            <Link href="/">
              <AppLogoDescriptive />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {selectedCompany?.serviceInstanceHosts.map((company) => (
          <SidebarGroup key={company.hostCompanyId}>
            <SidebarGroupLabel className="flex items-center gap-2 p-0 pb-1 text-sm">
              <Avatar className="rounded-md w-6 h-6">
                <AvatarImage src={""} />
                <AvatarFallback seed={company.hostCompanyId}>
                  {company.hostCompanyName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {company.hostCompanyName}
            </SidebarGroupLabel>
            <SidebarGroupContent className="pl-1">
              <SidebarMenu>
                {company.instances.map((serviceInstance) => (
                  <Collapsible
                    key={serviceInstance.serviceInstanceId}
                    open={openItems[serviceInstance.serviceInstanceId]}
                    onOpenChange={() => toggleItem(serviceInstance.serviceInstanceId)}
                    className="group/collapsible"
                    //can you make it so * is a wildcard for any service
                    defaultOpen={new RegExp(`^/service-instances/[^/]+/${serviceInstance.serviceInstanceId}(?:/|$)`).test(pathname)}
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          isActive={pathname.startsWith(
                            `/service-instances/${serviceInstance.serviceInstanceId}`
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <Image
                              src={`${getOriginUrl()+ SERVICE_PORTAL_BASE_URL}/assets/services/${serviceInstance.service}.svg`}
                              alt={serviceInstance.name}
                              width={16}
                              height={16}
                            />
                            <span>{serviceInstance.name}</span>
                          </div>
                          <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                          <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      {serviceInstance.service === Service.Weclapp ? (
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {serviceInstance.permissions.canViewDashboard && (
                              <SidebarMenuSubItem key="dashboard">
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname.startsWith(
                                    `/service-instances/weclapp/${serviceInstance.serviceInstanceId}/dashboard`
                                  )}
                                >
                                  <Link
                                    href={`/service-instances/weclapp/${serviceInstance.serviceInstanceId}/dashboard`}
                                  >
                                    Dashboard
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )}
                            {serviceInstance.permissions.canViewQuotes && (
                              <SidebarMenuSubItem key="quotations">
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname.startsWith(
                                    `/service-instances/weclapp/${serviceInstance.serviceInstanceId}/quotations`
                                  )}
                                >
                                  <Link
                                    href={`/service-instances/weclapp/${serviceInstance.serviceInstanceId}/quotations`}
                                  >
                                    Quotations
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )}
                            {serviceInstance.permissions.canViewSalesOrders && (
                              <SidebarMenuSubItem key="sales-orders">
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname.startsWith(
                                    `/service-instances/weclapp/${serviceInstance.serviceInstanceId}/sales-orders`
                                  )}
                                >
                                  <Link
                                    href={`/service-instances/weclapp/${serviceInstance.serviceInstanceId}/sales-orders`}
                                  >
                                    Sales Orders
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )}
                            {serviceInstance.permissions.canViewInvoices && (
                              <SidebarMenuSubItem key="sales-invoices">
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname.startsWith(
                                    `/service-instances/weclapp/${serviceInstance.serviceInstanceId}/sales-invoices`
                                  )}
                                >
                                  <Link
                                    href={`/service-instances/weclapp/${serviceInstance.serviceInstanceId}/sales-invoices`}
                                  >
                                    Sales Invoices
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )}{/*
                            {serviceInstance.permissions.canVicaewContracts && (
                              <SidebarMenuSubItem key="contracts">
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname.startsWith(
                                    `/service-instances/${serviceInstance.id}/contracts`
                                  )}
                                >
                                  <Link
                                    href={`/service-instances/${serviceInstance.id}/contracts`}
                                  >
                                    Contracts
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )}*/}
                            {serviceInstance.permissions.canViewProjects && (
                              <SidebarMenuSubItem key="projects">
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname.startsWith(
                                    `/service-instances/weclapp/${serviceInstance.serviceInstanceId}/projects`
                                  )}
                                >
                                  <Link
                                    href={`/service-instances/weclapp/${serviceInstance.serviceInstanceId}/projects`}
                                  >
                                    Projects
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )}
                            {serviceInstance.permissions.canViewTickets && (
                              <SidebarMenuSubItem key="tickets">
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname.startsWith(
                                    `/service-instances/weclapp/${serviceInstance.serviceInstanceId}/tickets`
                                  )}
                                >
                                  <Link
                                    href={`/service-instances/weclapp/${serviceInstance.serviceInstanceId}/tickets`}
                                  >
                                    Tickets
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      ) : serviceInstance.service === Service.Acmp ? (
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {serviceInstance.permissions.canViewDashboard && (
                              <SidebarMenuSubItem key="dashboard">
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname.startsWith(
                                    `/service-instances/acmp/${serviceInstance.serviceInstanceId}/dashboard`
                                  )}
                                >
                                  <Link
                                    href={`/service-instances/acmp/${serviceInstance.serviceInstanceId}/dashboard`}
                                  >
                                    Dashboard
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )}
                            {serviceInstance.permissions.canViewJobs && (
                              <SidebarMenuSubItem key="jobs">
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname.startsWith(
                                    `/service-instances/acmp/${serviceInstance.serviceInstanceId}/jobs`
                                  )}
                                >
                                  <Link
                                    href={`/service-instances/acmp/${serviceInstance.serviceInstanceId}/jobs`}
                                  >
                                    Jobs
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )}
                            {serviceInstance.permissions.canViewDevices && (
                              <SidebarMenuSubItem key="clients">
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname.startsWith(
                                    `/service-instances/acmp/${serviceInstance.serviceInstanceId}/clients`
                                  )}
                                >
                                  <Link
                                    href={`/service-instances/acmp/${serviceInstance.serviceInstanceId}/clients`}
                                  >
                                    Clients
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )}
                            {/*serviceInstance.permissions.canviewTickets*/ true && (
                              <SidebarMenuSubItem key="tickets">
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname.startsWith(
                                    `/service-instances/acmp/${serviceInstance.serviceInstanceId}/tickets`
                                  )}
                                >
                                  <Link
                                    href={`/service-instances/acmp/${serviceInstance.serviceInstanceId}/tickets`}
                                  >
                                    Tickets
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )}
                            {/*serviceInstance.permissions.canViewAssets*/ true && (
                              <SidebarMenuSubItem key="assets">
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname.startsWith(
                                    `/service-instances/acmp/${serviceInstance.serviceInstanceId}/assets`
                                  )}
                                >
                                  <Link
                                    href={`/service-instances/acmp/${serviceInstance.serviceInstanceId}/assets`}
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
        <TenantSwitcher />
      </SidebarFooter>
    </Sidebar>
  );
}
