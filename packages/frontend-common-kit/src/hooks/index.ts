export { useIsMobile } from "./use-mobile";
export { useValidSession } from "./use-valid-session";
export { useAuthedQuery } from "./use-authed-query";
export { useAuthedMutation } from "./use-authed-mutation";
export { useMounted } from "./use-mounted";

// Organization hooks - new architecture
export { useCurrentUserOrganizations } from "./use-current-user-organizations";
export type { UseCurrentUserOrganizationsResult } from "./use-current-user-organizations";

export { useCurrentUserManageableOrganizations } from "./use-current-user-manageable-organizations";
export type { UseCurrentUserManageableOrganizationsResult } from "./use-current-user-manageable-organizations";

export { 
  usePersistedCurrentOrganization,
  setPersistedOrganizationId,
  getPersistedOrganizationId,
} from "./use-persisted-current-organization";
export type { UsePersistedCurrentOrganizationResult } from "./use-persisted-current-organization";

export { useRouteCurrentOrganization } from "./use-route-current-organization";
export type { 
  UseRouteCurrentOrganizationResult,
  UseRouteCurrentOrganizationOptions,
} from "./use-route-current-organization";

// Legacy hook - kept for backwards compatibility, uses new architecture internally
export { useGetCurrentOrganization } from "./use-get-current-company";