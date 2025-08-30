"use client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getServiceInstances } from "@/lib/api-client/service-instances";
import { Service } from "@scaleits-solutions-gmbh/services";
import { useEffect } from "react";

export default function HomePageClient() {
  const router = useRouter();
  const { data, isLoading, error } = useQuery({
    queryKey: ["sideMenu"],
    queryFn: getServiceInstances,
  });

  useEffect(() => {
    if (!isLoading && !error && data) {
      outerLoop: for (const serviceGroup of data) {
        if (serviceGroup.serviceInstances.length > 0) {
          for (const serviceInstance of serviceGroup.serviceInstances) {
            if (serviceInstance.service === Service.Weclapp) {
              console.log(serviceInstance);
              if (serviceInstance.canViewDashboard) {
                console.log(serviceInstance.canViewDashboard)
                router.push(`/service-instances/${serviceInstance.id}/dashboard`);
                break outerLoop;
              } else if (serviceInstance.canViewSalesOrders) {
                router.push(`/service-instances/${serviceInstance.id}/sales-orders`);
                break outerLoop;
              } else if (serviceInstance.canViewSalesInvoices) {
                router.push(`/service-instances/${serviceInstance.id}/sales-invoices`);
                break outerLoop;
              } else if (serviceInstance.canViewQuotations) {
                router.push(`/service-instances/${serviceInstance.id}/quotations`);
                break outerLoop;
              } else if (serviceInstance.canViewProjects) {
                router.push(`/service-instances/${serviceInstance.id}/projects`);
                break outerLoop;
              } else if (serviceInstance.canViewContracts) {
                router.push(`/service-instances/${serviceInstance.id}/contracts`);
                break outerLoop;
              } else if (serviceInstance.canViewTickets) {
                router.push(`/service-instances/${serviceInstance.id}/tickets`);
                break outerLoop;
              }
            } else if (serviceInstance.service === Service.Acmp) {
              if (serviceInstance.canViewClients) {
                router.push(`/service-instances/${serviceInstance.id}/clients`);
                break outerLoop;
              } else if (serviceInstance.canViewJobs) {
                router.push(`/service-instances/${serviceInstance.id}/jobs`);
                break outerLoop;
              }
            }
          }
        }
      }
    }
  }, [data, isLoading, error, router]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-16 h-16 animate-spin" />
      </div>
    );
  }
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p>No service instances found</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center">
    </div>
  );
} 