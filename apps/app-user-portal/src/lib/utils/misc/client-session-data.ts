import Cookies from "js-cookie";
import { OrganizationRole } from "@scaleits-solutions-gmbh/services";

// This function provides access to the current session data for non-React usage
export const getClientSessionData = () => {
  const organizationRoleCookie = Cookies.get("organizationRole");

  return {
    currentUserId: Cookies.get("currentUserId"),
    currentCompanyId: Cookies.get("currentCompanyId"),
    organizationRole: organizationRoleCookie
      ? (organizationRoleCookie as OrganizationRole)
      : OrganizationRole.None,
  };
};

// For React components, use the hooks from @/hooks/useSession:
// useSession(), useUserId(), useCompanyId(), useOrganizationRole()
