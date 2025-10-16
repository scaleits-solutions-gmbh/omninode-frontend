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
    findPaginatedUserListItemsParams,
} from "./api-methods/user-microservice/find-paginated-user-list-items.api-method";
import {
    findUserCount,
    FindUserCountParams,
} from "./api-methods/user-microservice/find-user-count.api-method";
import { handleExternalProviderSignIn } from "./api-methods/user-microservice/handle-external-provider-sign-in.api-method";
import {
    updateCurrentUserPreferences,
    UpdateCurrentUserPreferencesParams,
} from "./api-methods/user-microservice/update-current-user-preferences.api-method";
import {
    updateCurrentUser,
    UpdateCurrentUserParams,
} from "./api-methods/user-microservice/update-current-user.api-method";
export class OmninodeApiClient {
  constructor(private readonly baseUrl: string,
    private readonly timeoutMs?: number,
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
    findCurrentUser: async (apiAuthentication: ApiAuthentication) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await findCurrentUser({ apiConnection });
    },
    updateCurrentUser: async ({
      input,
      apiAuthentication,
    }: {
      input: UpdateCurrentUserParams["input"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await updateCurrentUser({ input, apiConnection });
    },
    updateCurrentUserPreferences: async ({
      input,
      apiAuthentication,
    }: {
      input: UpdateCurrentUserPreferencesParams["input"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await updateCurrentUserPreferences({ input, apiConnection });
    },
    findPaginatedUserListItems: async ({
      input,
      apiAuthentication,
    }: {
      input: findPaginatedUserListItemsParams["input"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await findPaginatedUserListItems({ input, apiConnection });
    },
    findUserCount: async ({
      input,
      apiAuthentication,
    }: {
      input: FindUserCountParams["input"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await findUserCount({ input, apiConnection });
    },
    findDetailedUserById: async ({
      input,
      apiAuthentication,
    }: {
      input: FindDetailedUserByIdParams["input"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await findDetailedUserById({ input, apiConnection });
    },
  };
}
