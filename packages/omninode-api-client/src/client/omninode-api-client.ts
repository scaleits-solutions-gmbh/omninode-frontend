import { ApiConnection } from "@/schemas/api-connection.schema";
import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { ApiAuthentication } from "@/schemas/authentication.schema";
import { findCurrentUser } from "./api-methods/user-microservice/find-current-user.api-method";
import {
  findDetailedUserById,
  FindDetailedUserByIdParams,
} from "./api-methods/user-microservice/find-detailed-user-by-id.api-method";
import {
  findPaginatedUserListItems,
  FindPaginatedUserListItemsParams,
} from "./api-methods/user-microservice/find-paginated-user-list-items.api-method";
import {
  findUserCount,
  FindUserCountParams,
} from "./api-methods/user-microservice/find-user-count.api-method";
import { handleExternalProviderSignIn } from "./api-methods/user-microservice/handle-external-provider-sign-in.api-method";
import {
  updateCurrentUser,
  UpdateCurrentUserParams,
} from "./api-methods/user-microservice/update-current-user.api-method";
import {
  updateCurrentUserPreferences,
  UpdateCurrentUserPreferencesParams,
} from "./api-methods/user-microservice/update-current-user-preferences.api-method";
import {
  createOrganization,
  CreateOrganizationParams,
} from "./api-methods/organization-microservice/create-organization.api-method";
import {
  findOrganizationById,
  FindOrganizationByIdParams,
} from "./api-methods/organization-microservice/find-organization-by-id.api-method";
import {
  updateOrganizationCoreInfo,
  UpdateOrganizationCoreInfoParams,
} from "./api-methods/organization-microservice/update-organization-core-info.api-method";
import {
  changeOrganizationStatus,
  ChangeOrganizationStatusParams,
} from "./api-methods/organization-microservice/change-organization-status.api-method";
import {
  findPaginatedOrganizationListItems,
  FindPaginatedOrganizationListItemsParams,
} from "./api-methods/organization-microservice/find-paginated-organization-list-items.api-method";
import {
  updateOrganizationMembershipRole,
  UpdateOrganizationMembershipRoleParams,
} from "./api-methods/organization-microservice/update-organization-membership-role.api-method";
import {
  sendOrganizationMembershipInvite,
  SendOrganizationMembershipInviteParams,
} from "./api-methods/organization-microservice/send-organization-membership-invite.api-method";
import {
  findPaginatedOrganizationMembers,
  FindPaginatedOrganizationMembersParams,
} from "./api-methods/organization-microservice/find-paginated-organization-members.api-method";
import {
  findUserOrganizations,
  FindUserOrganizationsParams,
} from "./api-methods/organization-microservice/find-user-organizations.api-method";
export class OmninodeApiClient {
  constructor(
    private readonly baseUrl: string,
    private readonly timeoutMs?: number
  ) {}

  private getApiConnection(): ApiConnection {
    return {
      baseUrl: this.baseUrl,
      timeoutMs: this.timeoutMs,
    };
  }

  private getAuthenticatedApiConnection(
    apiAuthentication: ApiAuthentication
  ): AuthenticatedApiConnection {
    return {
      baseUrl: this.baseUrl,
      timeoutMs: this.timeoutMs,
      apiAuthenticationSchema: apiAuthentication,
    };
  }

  userMicroservice = {
    handleExternalProviderSignIn: async (
      apiAuthentication: ApiAuthentication
    ) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await handleExternalProviderSignIn({ apiConnection });
    },
    findCurrentUser: async ({
      apiAuthentication,
    }: {
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await findCurrentUser({ apiConnection });
    },
    updateCurrentUser: async ({
      request,
      apiAuthentication,
    }: {
      request: UpdateCurrentUserParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await updateCurrentUser({ request, apiConnection });
    },
    updateCurrentUserPreferences: async ({
      request,
      apiAuthentication,
    }: {
      request: UpdateCurrentUserPreferencesParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await updateCurrentUserPreferences({ request, apiConnection });
    },
    findPaginatedUserListItems: async ({
      request,
      apiAuthentication,
    }: {
      request: FindPaginatedUserListItemsParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await findPaginatedUserListItems({ request, apiConnection });
    },
    findUserCount: async ({
      request,
      apiAuthentication,
    }: {
      request: FindUserCountParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await findUserCount({ request, apiConnection });
    },
    findDetailedUserById: async ({
      request,
      apiAuthentication,
    }: {
      request: FindDetailedUserByIdParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await findDetailedUserById({ request, apiConnection });
    },
  };

  organizationMicroservice = {
    createOrganization: async ({
      request,
      apiAuthentication,
    }: {
      request: CreateOrganizationParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await createOrganization({ request, apiConnection });
    },
    findOrganizationById: async ({
      request,
      apiAuthentication,
    }: {
      request: FindOrganizationByIdParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await findOrganizationById({ request, apiConnection });
    },
    updateOrganizationCoreInfo: async ({
      request,
      apiAuthentication,
    }: {
      request: UpdateOrganizationCoreInfoParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await updateOrganizationCoreInfo({ request, apiConnection });
    },
    changeOrganizationStatus: async ({
      request,
      apiAuthentication,
    }: {
      request: ChangeOrganizationStatusParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await changeOrganizationStatus({ request, apiConnection });
    },
    findPaginatedOrganizationListItems: async ({
      request,
      apiAuthentication,
    }: {
      request: FindPaginatedOrganizationListItemsParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await findPaginatedOrganizationListItems({ request, apiConnection });
    },
    updateOrganizationMembershipRole: async ({
      request,
      apiAuthentication,
    }: {
      request: UpdateOrganizationMembershipRoleParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await updateOrganizationMembershipRole({ request, apiConnection });
    },
    sendOrganizationMembershipInvite: async ({
      request,
      apiAuthentication,
    }: {
      request: SendOrganizationMembershipInviteParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await sendOrganizationMembershipInvite({ request, apiConnection });
    },
    findPaginatedOrganizationMembers: async ({
      request,
      apiAuthentication,
    }: {
      request: FindPaginatedOrganizationMembersParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await findPaginatedOrganizationMembers({ request, apiConnection });
    },
    findUserOrganizations: async ({
      request,
      apiAuthentication,
    }: {
      request: FindUserOrganizationsParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection = this.getAuthenticatedApiConnection(apiAuthentication);
      return await findUserOrganizations({ request, apiConnection });
    },
  };
}
