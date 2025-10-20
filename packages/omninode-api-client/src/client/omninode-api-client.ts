import { ApiConnection } from "@/schemas/api-connection.schema";
import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { ApiAuthentication } from "@/schemas/authentication.schema";
import { findCurrentUser } from "./api-methods/omninode-user/user-microservice/find-current-user.api-method";
import { findDetailedUserById, FindDetailedUserByIdParams } from "./api-methods/internal-iam/user-microservice/find-detailed-user-by-id.api-method";
import { findPaginatedUserListItems, FindPaginatedUserListItemsParams } from "./api-methods/internal-iam/user-microservice/find-paginated-user-list-items.api-method";
import { findUserCount, FindUserCountParams } from "./api-methods/internal-iam/user-microservice/find-user-count.api-method";
import { handleExternalProviderSignIn } from "./api-methods/omninode-user/user-microservice/handle-external-provider-sign-in.api-method";
import { updateCurrentUser, UpdateCurrentUserParams } from "./api-methods/omninode-user/user-microservice/update-current-user.api-method";
import { updateCurrentUserPreferences, UpdateCurrentUserPreferencesParams } from "./api-methods/omninode-user/user-microservice/update-current-user-preferences.api-method";

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
  
  omninodeUser = {
    userMicroservice: {
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
      }
    },
  };
  
  internalIamUser = {
    userMicroservice: {
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
    },
  };
}
