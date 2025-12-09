import Cookies from "js-cookie";
import { OrganizationRole } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

// This function provides access to the current session data for non-React usage
export const getClientSessionData = () => {
  const organizationRoleCookie = Cookies.get("organizationRole");

  return {
    currentUserId: Cookies.get("currentUserId"),
    currentOrganizationId: Cookies.get("currentOrganizationId"),
    organizationRole: organizationRoleCookie
      ? (organizationRoleCookie as OrganizationRole)
      : undefined,
  };
};

// For React components, use the hooks from @/hooks/useSession:
// useSession(), useUserId(), useOrganizationId(), useOrganizationRole()
