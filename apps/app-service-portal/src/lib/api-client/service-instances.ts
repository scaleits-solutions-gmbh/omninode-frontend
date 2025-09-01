//import { BaseApiClient } from "@scaleits-solutions-gmbh/api-client";
import { Service } from "@scaleits-solutions-gmbh/services";

export const getServiceInstances = async () => {
    //wait 500ms
    await new Promise(resolve => setTimeout(resolve, 500));
  
  const serviceInstances = [
    {
      companyId: "2",
      company: "Edler & Stigler",
      imageUrl: "",
      serviceInstances: [
        {
          id: "3",
          label: "Prod ACMP",
          service: Service.Acmp,
          canViewClients: true
        },
        {
          id: "4",
          label: "Dev ACMP",
          service: Service.Acmp,
          canViewDashboard: false,
          canViewClients: true,
          canViewJobs: true,
        },
      ],
    },
  ];
  return serviceInstances;
  }