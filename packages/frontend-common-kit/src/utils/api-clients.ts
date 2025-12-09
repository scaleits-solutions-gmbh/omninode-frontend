import { Session } from "next-auth";
import {
  createUserClient,
  createOrganizationClient,
  createFeedbackClient,
  createServiceClient,
  createServiceAcmpClient,
  createServiceWeclappClient,
  type UserClient,
  type OrganizationClient,
  type FeedbackClient,
  type ServiceClient,
  type ServiceAcmpClient,
  type ServiceWeclappClient,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

function getApiConfig(session: Session) {
  const baseUrl = process.env.NEXT_PUBLIC_OMNINODE_API_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_OMNINODE_API_URL is not set");
  }

  const timeout = process.env.OMNINODE_API_TIMEOUT_MS
    ? parseInt(process.env.OMNINODE_API_TIMEOUT_MS)
    : 10000;

  return {
    baseUrl,
    timeout,
    auth: {
      type: "bearer" as const,
      token: session.access_token,
    },
  };
}

export function getUserClient(session: Session): UserClient {
  return createUserClient(getApiConfig(session));
}

export function getOrganizationClient(session: Session): OrganizationClient {
  return createOrganizationClient(getApiConfig(session));
}

export function getFeedbackClient(session: Session): FeedbackClient {
  return createFeedbackClient(getApiConfig(session));
}

export function getServiceClient(session: Session): ServiceClient {
  return createServiceClient(getApiConfig(session));
}

export function getServiceAcmpClient(session: Session): ServiceAcmpClient {
  return createServiceAcmpClient(getApiConfig(session));
}

export function getServiceWeclappClient(session: Session): ServiceWeclappClient {
  return createServiceWeclappClient(getApiConfig(session));
}

