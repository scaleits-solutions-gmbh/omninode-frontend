"use client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Service } from "@scaleits-solutions-gmbh/services";
import { useEffect } from "react";
import { useGetCurrentCompany } from "@repo/pkg-frontend-common-kit/hooks";

export default function HomePageClient() {
  const router = useRouter();
  const { isLoading, error, selectedCompany } = useGetCurrentCompany();

  useEffect(() => {
    if (!isLoading && !error && selectedCompany) {
      outerLoop: for (const serviceInstanceHost of selectedCompany.serviceInstanceHosts) {
        if (serviceInstanceHost.instances.length > 0) {
          for (const serviceInstance of serviceInstanceHost.instances) {
            /*
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
            } else */ if (serviceInstance.service === Service.Acmp) {
              if (serviceInstance.permissions.canViewJobs) {
                router.replace(
                  `/service-instances/acmp/${serviceInstance.serviceInstanceId}/jobs`
                );
                break outerLoop;
              } else if (serviceInstance.permissions.canViewDevices) {
                router.replace(
                  `/service-instances/acmp/${serviceInstance.serviceInstanceId}/devices`
                );
                break outerLoop;
              }
            }
          }
        }
      }
    }
  }, [selectedCompany, isLoading, error, router]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-16 h-16 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div>Failed to load service instances</div>;
  }

  if (!selectedCompany) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p>No service instances found</p>
      </div>
    );
  }

  return <div className="flex-1 flex items-center justify-center"></div>;
}
