import { Service } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

/**
 * Shape of an individual service view with its permissions
 */
type AcmpServiceView = {
  canViewDashboard?: boolean;
  canViewDevices?: boolean;
  canViewJobs?: boolean;
  canViewTickets?: boolean;
  canViewAssets?: boolean;
};

type WeclappServiceView = {
  canViewDashboard?: boolean;
  canViewQuotes?: boolean;
  canViewSalesOrders?: boolean;
  canViewInvoices?: boolean;
  canViewProjects?: boolean;
  canViewTickets?: boolean;
};

type ServiceViewItem = {
  id: string;
  service: Service;
  serviceView: AcmpServiceView | WeclappServiceView;
};

type ProviderOrgViews = {
  providerOrganizationId: string;
  providerOrganizationName: string;
  ServiceViews: ServiceViewItem[];
};

/**
 * Determines the first accessible resource URL for a given ACMP service view
 */
function getFirstAcmpResource(
  orgId: string,
  viewId: string,
  sv: AcmpServiceView
): string | null {
  const basePath = `/${orgId}/views/${viewId}/acmp`;
  
  // Priority order for ACMP resources
  if (sv.canViewJobs) return `${basePath}/jobs`;
  if (sv.canViewDevices) return `${basePath}/clients`;
  if (sv.canViewTickets) return `${basePath}/tickets`;
  if (sv.canViewAssets) return `${basePath}/assets`;
  // Dashboard is disabled but if we have no other option, check if at least dashboard is enabled
  if (sv.canViewDashboard) return `${basePath}/dashboard`;
  
  return null;
}

/**
 * Determines the first accessible resource URL for a given Weclapp service view
 */
function getFirstWeclappResource(
  orgId: string,
  viewId: string,
  sv: WeclappServiceView
): string | null {
  const basePath = `/${orgId}/views/${viewId}/weclapp`;
  
  // Priority order for Weclapp resources
  if (sv.canViewQuotes) return `${basePath}/quotations`;
  if (sv.canViewSalesOrders) return `${basePath}/sales-orders`;
  if (sv.canViewInvoices) return `${basePath}/sales-invoices`;
  if (sv.canViewProjects) return `${basePath}/projects`;
  if (sv.canViewTickets) return `${basePath}/tickets`;
  // Dashboard is disabled but if we have no other option, check if at least dashboard is enabled
  if (sv.canViewDashboard) return `${basePath}/dashboard`;
  
  return null;
}

/**
 * Checks if a service view has ANY accessible permission
 */
function hasAnyPermission(view: ServiceViewItem): boolean {
  const sv = view.serviceView;
  
  if (view.service === Service.Acmp) {
    const acmpSv = sv as AcmpServiceView;
    return Boolean(
      acmpSv.canViewDashboard ||
      acmpSv.canViewDevices ||
      acmpSv.canViewJobs ||
      acmpSv.canViewTickets ||
      acmpSv.canViewAssets
    );
  }
  
  if (view.service === Service.Weclapp) {
    const weclappSv = sv as WeclappServiceView;
    return Boolean(
      weclappSv.canViewDashboard ||
      weclappSv.canViewQuotes ||
      weclappSv.canViewSalesOrders ||
      weclappSv.canViewInvoices ||
      weclappSv.canViewProjects ||
      weclappSv.canViewTickets
    );
  }
  
  return false;
}

/**
 * Determines the first accessible resource URL for a given service view
 */
function getFirstResourceForView(
  orgId: string,
  view: ServiceViewItem
): string | null {
  if (view.service === Service.Acmp) {
    return getFirstAcmpResource(orgId, view.id, view.serviceView as AcmpServiceView);
  }
  
  if (view.service === Service.Weclapp) {
    return getFirstWeclappResource(orgId, view.id, view.serviceView as WeclappServiceView);
  }
  
  return null;
}

/**
 * Gets the first accessible resource across all service views for an organization.
 * Iterates through provider organizations and their views in order.
 * 
 * @param orgId - The organization ID
 * @param serviceViews - Array of provider organizations with their service views
 * @returns The URL path to the first accessible resource, or null if none found
 */
export function getFirstAccessibleResource(
  orgId: string,
  serviceViews: ProviderOrgViews[] | undefined | null
): string | null {
  if (!serviceViews || serviceViews.length === 0) {
    return null;
  }

  for (const providerOrg of serviceViews) {
    for (const view of providerOrg.ServiceViews) {
      const resource = getFirstResourceForView(orgId, view);
      if (resource) {
        return resource;
      }
    }
  }
  
  return null;
}

/**
 * Checks if there are any service views with at least one permission
 */
export function hasAnyAccessibleViews(
  serviceViews: ProviderOrgViews[] | undefined | null
): boolean {
  if (!serviceViews || serviceViews.length === 0) {
    return false;
  }

  for (const providerOrg of serviceViews) {
    for (const view of providerOrg.ServiceViews) {
      if (hasAnyPermission(view)) {
        return true;
      }
    }
  }
  
  return false;
}

/**
 * Type export for use in other files
 */
export type { ProviderOrgViews, ServiceViewItem };
