import Cookies from "js-cookie";
import { ManagementConsoleAccess } from "@scaleits-solutions-gmbh/services";

// This function provides access to the current session data for non-React usage
export const getClientSessionData = () => {
  const managementConsoleAccessCookie = Cookies.get("managementConsoleAccess");

  return {
    currentUserId: Cookies.get("currentUserId"),
    currentCompanyId: Cookies.get("currentCompanyId"),
    managementConsoleAccess: managementConsoleAccessCookie
      ? (managementConsoleAccessCookie as ManagementConsoleAccess)
      : ManagementConsoleAccess.None,
  };
};

// For React components, use the hooks from @/hooks/useSession:
// useSession(), useUserId(), useCompanyId(), useManagementConsoleAccess()
