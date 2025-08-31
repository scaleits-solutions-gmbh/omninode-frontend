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
} from "../../../../../../../packages/frontend-common-kit/dist/components";
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

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  forceSidebarLoading?: boolean;
}

export function AppSidebar({forceSidebarLoading = false, ...props}: AppSidebarProps) {
  const pathname = usePathname();
  const [openItems, setOpenItems] = React.useState<Record<string, boolean>>({});

  const toggleItem = (itemId: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const {data, isLoading, error} = useQuery({
    queryKey: ["sideMenu"],
    queryFn: getServiceInstances,
  });
  
  if (isLoading || forceSidebarLoading) {
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
        {data?.map((company) => (
          <SidebarGroup key={company.companyId}>
            <SidebarGroupLabel className="flex items-center gap-2 p-0">
              <Avatar className="rounded-md w-6 h-6">
                <AvatarImage src={company.imageUrl} />
                <AvatarFallback seed={company.companyId}>
                  {company.company.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {company.company}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {company.serviceInstances.map((serviceInstance) => (
                  <Collapsible
                    key={serviceInstance.id}
                    open={openItems[serviceInstance.id]}
                    onOpenChange={() => toggleItem(serviceInstance.id)}
                    className="group/collapsible"
                    defaultOpen={pathname.startsWith(
                      `/service-instances/${serviceInstance.id}`
                    )}
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          isActive={pathname.startsWith(
                            `/service-instances/${serviceInstance.id}`
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <Image
                              src={`/assets/services/${serviceInstance.service}.svg`}
                              alt={serviceInstance.label}
                              width={16}
                              height={16}
                            />
                            <span>{serviceInstance.label}</span>
                          </div>
                          <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                          <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      {serviceInstance.service === Service.Weclapp ? (
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {/*serviceInstance.canViewDashboard && (
                              <SidebarMenuSubItem key="dashboard">
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname.startsWith(
                                    `/service-instances/${serviceInstance.id}/dashboard`
                                  )}
                                >
                                  <Link
                                    href={`/service-instances/${serviceInstance.id}/dashboard`}
                                  >
                                    Dashboard
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )*/}
                            {serviceInstance.canViewQuotations && (
                              <SidebarMenuSubItem key="quotations">
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname.startsWith(
                                    `/service-instances/${serviceInstance.id}/quotations`
                                  )}
                                >
                                  <Link
                                    href={`/service-instances/${serviceInstance.id}/quotations`}
                                  >
                                    Quotations
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )}
                            {serviceInstance.canViewSalesOrders && (
                              <SidebarMenuSubItem key="sales-orders">
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname.startsWith(
                                    `/service-instances/${serviceInstance.id}/sales-orders`
                                  )}
                                >
                                  <Link
                                    href={`/service-instances/${serviceInstance.id}/sales-orders`}
                                  >
                                    Sales Orders
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )}
                            {serviceInstance.canViewSalesInvoices && (
                              <SidebarMenuSubItem key="sales-invoices">
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname.startsWith(
                                    `/service-instances/${serviceInstance.id}/sales-invoices`
                                  )}
                                >
                                  <Link
                                    href={`/service-instances/${serviceInstance.id}/sales-invoices`}
                                  >
                                    Sales Invoices
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )}
                            {serviceInstance.canViewContracts && (
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
                            )}
                            {serviceInstance.canViewProjects && (
                              <SidebarMenuSubItem key="projects">
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname.startsWith(
                                    `/service-instances/${serviceInstance.id}/projects`
                                  )}
                                >
                                  <Link
                                    href={`/service-instances/${serviceInstance.id}/projects`}
                                  >
                                    Projects
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )}
                            {/*serviceInstance.canViewTickets && (
                              <SidebarMenuSubItem key="tickets">
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname.startsWith(
                                    `/service-instances/${serviceInstance.id}/tickets`
                                  )}
                                >
                                  <Link
                                    href={`/service-instances/${serviceInstance.id}/tickets`}
                                  >
                                    Tickets
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )*/}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      ) : serviceInstance.service === Service.Acmp ? (
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {/*serviceInstance.canViewDashboard && (
                              <SidebarMenuSubItem key="dashboard">
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname.startsWith(
                                    `/service-instances/${serviceInstance.id}/dashboard`
                                  )}
                                >
                                  <Link
                                    href={`/service-instances/${serviceInstance.id}/dashboard`}
                                  >
                                    Dashboard
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )*/}
                            {serviceInstance.canViewJobs && (
                              <SidebarMenuSubItem key="jobs">
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname.startsWith(
                                    `/service-instances/${serviceInstance.id}/jobs`
                                  )}
                                >
                                  <Link
                                    href={`/service-instances/${serviceInstance.id}/jobs`}
                                  >
                                    Jobs
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )}
                            {serviceInstance.canViewClients && (
                              <SidebarMenuSubItem key="clients">
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname.startsWith(
                                    `/service-instances/${serviceInstance.id}/clients`
                                  )}
                                >
                                  <Link
                                    href={`/service-instances/${serviceInstance.id}/clients`}
                                  >
                                    Clients
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
