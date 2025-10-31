import { ApiConnection } from "@/schemas/api-connection.schema";
import { AuthenticatedApiConnection } from "@/schemas/authenticated-api-connection.schema";
import { ApiAuthentication } from "@/schemas/authentication.schema";
import {
  changeOrganizationStatus,
  ChangeOrganizationStatusParams,
} from "./api-methods/organization-microservice/organization/commands/change-organization-status.api-method";
import {
  createOrganization,
  CreateOrganizationParams,
} from "./api-methods/organization-microservice/organization/commands/create-organization.api-method";
import { findCurrentUserOrganizations } from "./api-methods/organization-microservice/organization/queries/find-current-user-organizations.api-method";
import {
  findPaginatedOrganizationListItems,
  FindPaginatedOrganizationListItemsParams,
} from "./api-methods/organization-microservice/organization/queries/find-paginated-organization-list-items.api-method";
import {
  findPaginatedOrganizationMembers,
  FindPaginatedOrganizationMembersParams,
} from "./api-methods/organization-microservice/organization-membership/queries/find-paginated-organization-members.api-method";
import {
  findUserOrganizations,
  FindUserOrganizationsParams,
} from "./api-methods/organization-microservice/organization/queries/find-user-organizations.api-method";
import {
  findOrganizationById,
  FindOrganizationByIdParams,
} from "./api-methods/organization-microservice/organization/queries/find-organization-by-id.api-method";
import {
  sendOrganizationMembershipInvite,
  SendOrganizationMembershipInviteParams,
} from "./api-methods/organization-microservice/organization-membership-invite/commands/send-organization-membership-invite.api-method";
import {
  sendOrganizationRelationshipInvite,
  SendOrganizationRelationshipInviteParams,
} from "./api-methods/organization-microservice/organization-relationship-invite/commands/send-organization-relationship-invite.api-method";
import {
  updateOrganizationCoreInfo,
  UpdateOrganizationCoreInfoParams,
} from "./api-methods/organization-microservice/organization/commands/update-organization-core-info.api-method";
import {
  updateOrganizationMembershipRole,
  UpdateOrganizationMembershipRoleParams,
} from "./api-methods/organization-microservice/organization-membership/commands/update-organization-membership-role.api-method";
import {
  findPaginatedOrganizationRelationships,
  FindPaginatedOrganizationRelationshipsParams,
} from "./api-methods/organization-microservice/organization-relationship/queries/find-paginated-organization-relationships.api-method";
import {
  findPaginatedOrganizationRelationshipInvites,
  FindPaginatedOrganizationRelationshipInvitesParams,
} from "./api-methods/organization-microservice/organization-relationship-invite/queries/find-paginated-organization-relationship-invites.api-method";
import {
  findPaginatedOrganizationMembershipInvites,
  FindPaginatedOrganizationMembershipInvitesParams,
} from "./api-methods/organization-microservice/organization-membership/queries/find-paginated-organization-membership-invites.api-method";
import { findCurrentUser } from "./api-methods/user-microservice/user/queries/find-current-user.api-method";
import {
  findDetailedUserById,
  FindDetailedUserByIdParams,
} from "./api-methods/user-microservice/user/queries/find-detailed-user-by-id.api-method";
import {
  findPaginatedUserListItems,
  FindPaginatedUserListItemsParams,
} from "./api-methods/user-microservice/user/queries/find-paginated-user-list-items.api-method";
import {
  findUserCount,
  FindUserCountParams,
} from "./api-methods/user-microservice/user/queries/find-user-count.api-method";
import { handleExternalProviderSignIn } from "./api-methods/user-microservice/user/commands/handle-external-provider-sign-in.api-method";
import {
  updateCurrentUserPreferences,
  UpdateCurrentUserPreferencesParams,
} from "./api-methods/user-microservice/user/commands/update-current-user-preferences.api-method";
import {
  updateCurrentUser,
  UpdateCurrentUserParams,
} from "./api-methods/user-microservice/user/commands/update-current-user.api-method";
import { findBasicOrganizationById, FindBasicOrganizationByIdParams } from "./api-methods/organization-microservice/organization/queries/find-basic-organization-by-id.api-method";
import {
  changeOrganizationType,
  ChangeOrganizationTypeParams,
} from "./api-methods/organization-microservice/organization/commands/change-organization-type.api-method";
import {
  transferOwnership,
  TransferOwnershipParams,
} from "./api-methods/organization-microservice/organization/commands/transfer-ownership.api-method";
import {
  findOrganizationCount,
  FindOrganizationCountParams,
} from "./api-methods/organization-microservice/organization/queries/find-organization-count.api-method";
import {
  findOrganizationMembersCount,
  FindOrganizationMembersCountParams,
} from "./api-methods/organization-microservice/organization/queries/find-organization-members-count.api-method";
import {
  acceptOrganizationMembershipInvite,
  AcceptOrganizationMembershipInviteParams,
} from "./api-methods/organization-microservice/organization-membership-invite/commands/accept-organization-membership-invite.api-method";
import {
  cancelOrganizationMembershipInvite,
  CancelOrganizationMembershipInviteParams,
} from "./api-methods/organization-microservice/organization-membership-invite/commands/cancel-organization-membership-invite.api-method";
import {
  changeOrganizationMembershipInviteRole,
  ChangeOrganizationMembershipInviteRoleParams,
} from "./api-methods/organization-microservice/organization-membership-invite/commands/change-organization-membership-invite-role.api-method";
import {
  rejectOrganizationMembershipInvite,
  RejectOrganizationMembershipInviteParams,
} from "./api-methods/organization-microservice/organization-membership-invite/commands/reject-organization-membership-invite.api-method";
import {
  findOrganizationMembershipInvitesCount,
  FindOrganizationMembershipInvitesCountParams,
} from "./api-methods/organization-microservice/organization-membership-invite/queries/find-organization-membership-invites-count.api-method";
import {
  findCurrentUserActionableOrganizationMembershipInvites,
  FindCurrentUserActionableOrganizationMembershipInvitesParams,
} from "./api-methods/organization-microservice/organization-membership-invite/queries/find-current-user-actionable-organization-membership-invites.api-method";
import {
  removeOrganizationRelationship,
  RemoveOrganizationRelationshipParams,
} from "./api-methods/organization-microservice/organization-relationship/commands/remove-organization-relationship.api-method";
import {
  findOrganizationRelationshipsCount,
  FindOrganizationRelationshipsCountParams,
} from "./api-methods/organization-microservice/organization-relationship/queries/find-organization-relationships-count.api-method";
import {
  acceptOrganizationRelationshipInvite,
  AcceptOrganizationRelationshipInviteParams,
} from "./api-methods/organization-microservice/organization-relationship-invite/commands/accept-organization-relationship-invite.api-method";
import {
  cancelOrganizationRelationshipInvite,
  CancelOrganizationRelationshipInviteParams,
} from "./api-methods/organization-microservice/organization-relationship-invite/commands/cancel-organization-relationship-invite.api-method";
import {
  rejectOrganizationRelationshipInvite,
  RejectOrganizationRelationshipInviteParams,
} from "./api-methods/organization-microservice/organization-relationship-invite/commands/reject-organization-relationship-invite.api-method";
import {
  findOrganizationRelationshipInvitesCount,
  FindOrganizationRelationshipInvitesCountParams,
} from "./api-methods/organization-microservice/organization-relationship-invite/queries/find-organization-relationship-invites-count.api-method";
import {
  findCurrentUserActionableReceivedOrganizationRelationshipInvites,
  FindCurrentUserActionableReceivedOrganizationRelationshipInvitesParams,
} from "./api-methods/organization-microservice/organization-relationship-invite/queries/find-current-user-actionable-received-organization-relationship-invites.api-method";
import {
  publishFeedback,
  PublishFeedbackParams,
} from "./api-methods/feedback-microservice/feedback/commands/publish-feedback.api-method";
import {
  updateFeedback,
  UpdateFeedbackParams,
} from "./api-methods/feedback-microservice/feedback/commands/update-feedback.api-method";
import {
  findFeedbackById,
  FindFeedbackByIdParams,
} from "./api-methods/feedback-microservice/feedback/queries/find-feedback-by-id.api-method";
import {
  findDetailedFeedbackById,
  FindDetailedFeedbackByIdParams,
} from "./api-methods/feedback-microservice/feedback/queries/find-detailed-feedback-by-id.api-method";
import {
  findPaginatedFeedbackListItems,
  FindPaginatedFeedbackListItemsParams,
} from "./api-methods/feedback-microservice/feedback/queries/find-paginated-feedback-list-items.api-method";
import {
  findUserFeedbacks,
  FindUserFeedbacksParams,
} from "./api-methods/feedback-microservice/feedback/queries/find-user-feedbacks.api-method";
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
    findBasicOrganizationInfoById: async ({
      request,
      apiAuthentication,
    }: {
      request: FindBasicOrganizationByIdParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await findBasicOrganizationById({ request, apiConnection });
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
    changeOrganizationType: async ({
      request,
      apiAuthentication,
    }: {
      request: ChangeOrganizationTypeParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await changeOrganizationType({ request, apiConnection });
    },
    transferOwnership: async ({
      request,
      apiAuthentication,
    }: {
      request: TransferOwnershipParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await transferOwnership({ request, apiConnection });
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
      return await findPaginatedOrganizationListItems({
        request,
        apiConnection,
      });
    },
    findPaginatedOrganizationRelationships: async ({
      request,
      apiAuthentication,
    }: {
      request: FindPaginatedOrganizationRelationshipsParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await findPaginatedOrganizationRelationships({
        request,
        apiConnection,
      });
    },
    findPaginatedOrganizationRelationshipInvites: async ({
      request,
      apiAuthentication,
    }: {
      request: FindPaginatedOrganizationRelationshipInvitesParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await findPaginatedOrganizationRelationshipInvites({
        request,
        apiConnection,
      });
    },
    findPaginatedOrganizationMembershipInvites: async ({
      request,
      apiAuthentication,
    }: {
      request: FindPaginatedOrganizationMembershipInvitesParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await findPaginatedOrganizationMembershipInvites({
        request,
        apiConnection,
      });
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
    sendOrganizationRelationshipInvite: async ({
      request,
      apiAuthentication,
    }: {
      request: SendOrganizationRelationshipInviteParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await sendOrganizationRelationshipInvite({ request, apiConnection });
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
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await findUserOrganizations({ request, apiConnection });
    },
    findCurrentUserOrganizations: async ({
      apiAuthentication,
    }: {
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await findCurrentUserOrganizations({ apiConnection });
    },
    findOrganizationCount: async ({
      request,
      apiAuthentication,
    }: {
      request: FindOrganizationCountParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await findOrganizationCount({ request, apiConnection });
    },
    findOrganizationMembersCount: async ({
      request,
      apiAuthentication,
    }: {
      request: FindOrganizationMembersCountParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await findOrganizationMembersCount({ request, apiConnection });
    },
    acceptOrganizationMembershipInvite: async ({
      request,
      apiAuthentication,
    }: {
      request: AcceptOrganizationMembershipInviteParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await acceptOrganizationMembershipInvite({ request, apiConnection });
    },
    cancelOrganizationMembershipInvite: async ({
      request,
      apiAuthentication,
    }: {
      request: CancelOrganizationMembershipInviteParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await cancelOrganizationMembershipInvite({ request, apiConnection });
    },
    changeOrganizationMembershipInviteRole: async ({
      request,
      apiAuthentication,
    }: {
      request: ChangeOrganizationMembershipInviteRoleParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await changeOrganizationMembershipInviteRole({ request, apiConnection });
    },
    rejectOrganizationMembershipInvite: async ({
      request,
      apiAuthentication,
    }: {
      request: RejectOrganizationMembershipInviteParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await rejectOrganizationMembershipInvite({ request, apiConnection });
    },
    findOrganizationMembershipInvitesCount: async ({
      request,
      apiAuthentication,
    }: {
      request: FindOrganizationMembershipInvitesCountParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await findOrganizationMembershipInvitesCount({ request, apiConnection });
    },
    findCurrentUserActionableOrganizationMembershipInvites: async ({
      request,
      apiAuthentication,
    }: {
      request: FindCurrentUserActionableOrganizationMembershipInvitesParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await findCurrentUserActionableOrganizationMembershipInvites({ request, apiConnection });
    },
    removeOrganizationRelationship: async ({
      request,
      apiAuthentication,
    }: {
      request: RemoveOrganizationRelationshipParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await removeOrganizationRelationship({ request, apiConnection });
    },
    findOrganizationRelationshipsCount: async ({
      request,
      apiAuthentication,
    }: {
      request: FindOrganizationRelationshipsCountParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await findOrganizationRelationshipsCount({ request, apiConnection });
    },
    acceptOrganizationRelationshipInvite: async ({
      request,
      apiAuthentication,
    }: {
      request: AcceptOrganizationRelationshipInviteParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await acceptOrganizationRelationshipInvite({ request, apiConnection });
    },
    cancelOrganizationRelationshipInvite: async ({
      request,
      apiAuthentication,
    }: {
      request: CancelOrganizationRelationshipInviteParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await cancelOrganizationRelationshipInvite({ request, apiConnection });
    },
    rejectOrganizationRelationshipInvite: async ({
      request,
      apiAuthentication,
    }: {
      request: RejectOrganizationRelationshipInviteParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await rejectOrganizationRelationshipInvite({ request, apiConnection });
    },
    findOrganizationRelationshipInvitesCount: async ({
      request,
      apiAuthentication,
    }: {
      request: FindOrganizationRelationshipInvitesCountParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await findOrganizationRelationshipInvitesCount({ request, apiConnection });
    },
    findCurrentUserActionableReceivedOrganizationRelationshipInvites: async ({
      request,
      apiAuthentication,
    }: {
      request: FindCurrentUserActionableReceivedOrganizationRelationshipInvitesParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await findCurrentUserActionableReceivedOrganizationRelationshipInvites({ request, apiConnection });
    },
  };

  feedbackMicroservice = {
    publishFeedback: async ({
      request,
      apiAuthentication,
    }: {
      request: PublishFeedbackParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await publishFeedback({ request, apiConnection });
    },
    updateFeedback: async ({
      request,
      apiAuthentication,
    }: {
      request: UpdateFeedbackParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await updateFeedback({ request, apiConnection });
    },
    findFeedbackById: async ({
      request,
      apiAuthentication,
    }: {
      request: FindFeedbackByIdParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await findFeedbackById({ request, apiConnection });
    },
    findDetailedFeedbackById: async ({
      request,
      apiAuthentication,
    }: {
      request: FindDetailedFeedbackByIdParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await findDetailedFeedbackById({ request, apiConnection });
    },
    findPaginatedFeedbackListItems: async ({
      request,
      apiAuthentication,
    }: {
      request: FindPaginatedFeedbackListItemsParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await findPaginatedFeedbackListItems({ request, apiConnection });
    },
    findUserFeedbacks: async ({
      request,
      apiAuthentication,
    }: {
      request: FindUserFeedbacksParams["request"];
      apiAuthentication: ApiAuthentication;
    }) => {
      const apiConnection =
        this.getAuthenticatedApiConnection(apiAuthentication);
      return await findUserFeedbacks({ request, apiConnection });
    },
  };
}
