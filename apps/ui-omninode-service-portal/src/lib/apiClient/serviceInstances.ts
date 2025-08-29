//import { BaseApiClient } from "@scaleits-solutions-gmbh/api-client";
import { Service } from "@scaleits-solutions-gmbh/services";

export const getServiceInstances = async () => {
    //wait 500ms
    await new Promise(resolve => setTimeout(resolve, 500));
  
  const serviceInstances = [
    {
      companyId: "1",
      company: "ScaleITs",
      imageUrl: "",
      serviceInstances: [
        {
          id: "1",
          label: "Prod Weclapp",
          service: Service.Weclapp,
          canViewDashboard: false,
          canViewSalesOrders: false,
          canViewSalesInvoices: false,
          canViewQuotations: false,
          canViewProjects: false,
          canViewContracts: true,
          canViewTickets: true,
        },
        {
          id: "2",
          label: "Dev Weclapp",
          service: Service.Weclapp,
          canViewDashboard: false,
          canViewSalesOrders: true,
          canViewSalesInvoices: true,
          canViewQuotations: true,
          canViewProjects: true,
          canViewContracts: true,
          canViewTickets: true,
        },
      ],
    },
    {
      companyId: "2",
      company: "Edler & Stigler",
      imageUrl: "",
      serviceInstances: [
        {
          id: "3",
          label: "Prod Weclapp",
          service: Service.Weclapp,
          canViewDashboard: false,
          canViewSalesOrders: true,
          canViewSalesInvoices: true,
          canViewQuotations: true,
          canViewProjects: true,
          canViewContracts: true,
          canViewTickets: true,
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