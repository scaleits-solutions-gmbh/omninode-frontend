"use client";

import AcmpServiceInstancePageContent from "./acmp/acmp-service-instance-page-content";
import LoadingPage from "./loading-page";
import WeclappServiceInstancePageContent from "./weclapp/weclapp-service-instance-page-content";
import { fetchServiceInstance } from "@/lib/api-client/service-instances";
import { Service } from "@scaleits-solutions-gmbh/services";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function PageContent() {
  const { id } = useParams();
  const {
    data: serviceInstance,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["serviceInstance", id],
    queryFn: () => fetchServiceInstance(id as string),
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error || !serviceInstance) {
    return <div>Error: {error?.message || "Service instance not found"}</div>;
  }

  switch (serviceInstance.service) {
    case Service.Weclapp:
      return <WeclappServiceInstancePageContent />;
    case Service.Acmp:
      return <AcmpServiceInstancePageContent />;
    default:
      return <div>Service not supported</div>;
  }
}
