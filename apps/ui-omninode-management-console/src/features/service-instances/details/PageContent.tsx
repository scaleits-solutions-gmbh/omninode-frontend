"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchServiceInstance } from "@/lib/apiClient/serviceInstances";
import LoadingPage from "./LoadingPage";
import { Service } from "@scaleits-solutions-gmbh/services";
import WeclappServiceInstancePageContent from "./weclapp/WeclappServiceInstancePageContent";
import AcmpServiceInstancePageContent from "./acmp/AcmpServiceInstancePageContent";

export default function PageContent() {
  const { id } = useParams();
  const { data: serviceInstance, isLoading, error} = useQuery({
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
