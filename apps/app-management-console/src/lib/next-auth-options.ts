import { getUserClient } from "@repo/pkg-frontend-common-kit/utils";
import type { Account, AuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { ProviderType } from "next-auth/providers/index";
import KeycloakProvider from "next-auth/providers/keycloak";
import { logoutRequest, refreshTokenRequest } from "./oidc";

export const authOptions: AuthOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/authflows/signin",
  },
  providers: [
    // Configure the Keycloak provider
    KeycloakProvider({
      clientId: process.env.OIDC_CLIENT_ID || "",
      clientSecret: process.env.OIDC_CLIENT_SECRET || "",
      issuer: process.env.OIDC_ISSUER,
      authorization: {
        params: {
          scope: "openid",
        },
      },
      // Modify the user profile
      profile: (profile) => {
        profile.id = profile.sub;
        return profile;
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      try {
        if (account?.access_token) {
          // Create a temporary session-like object for the API client
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const tempSession = { access_token: account.access_token } as any;
          await getUserClient(tempSession).handleExternalProviderSignIn({});
          return true;
        }
        return false;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
    async jwt({
      token,
      account,
      user,
    }: {
      token: JWT;
      account: Account | null;
      user: User | null;
    }) {
      // Handle JWT token creation and refreshing
      if (account && user) {
        // Update token with account information
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;
        
        // Calculate expiry - Keycloak/NextAuth provides expires_at (absolute Unix timestamp in seconds)
        // instead of expires_in (relative seconds). We convert to milliseconds for middleware validation.
        const expiresInSeconds = account.expires_in ?? (account.expires_at - Math.floor(Date.now() / 1000));
        const refreshExpiresInSeconds = account.refresh_expires_in ?? 0;
        
        token.access_token_expired = Date.now() + (expiresInSeconds - 15) * 1000;
        token.refresh_token_expired = Date.now() + (refreshExpiresInSeconds - 15) * 1000;
        token.user = user;
        return token;
      } else {
        try {
          // Send a post request to refresh the token
          const response = await refreshTokenRequest(token.refresh_token);
          const tokens = await response.data;
          if (response.status !== 200) throw tokens;
          // Update token with refreshed information
          return {
            ...token,
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token ?? token.refresh_token,
            refresh_token_expired:
              tokens.refresh_expires_in ?? token.refresh_token_expired,
            expires_in: Math.floor(Date.now() / 1000 + tokens.expires_in),
            error: null,
          };
        } catch (e) {
          console.error(e);
          return null as unknown as JWT;
        }
      }
    },
    // Handle session information
    async session({ session, token }) {
      // Update session with user and access token information
      session.user = token.user;
      session.error = token.error;
      session.access_token = token.access_token;
      return session;
    },
  },
  events: {
    async signOut({ token }) {
      await logoutRequest(token.refresh_token);
    },
  },
};

// Declare custom types for NextAuth modules
declare module "next-auth" {
  // Define custom session properties
  interface Session {
    user: {
      sub: string;
      email_verified: boolean;
      name: string;
      preferred_username: string;
      given_name: string;
      family_name: string;
      email: string;
      id: string;
      org_name?: string;
      telephone?: string;
    };
    error?: string | null;
    access_token: string;
  }

  // Define custom user properties
  interface User {
    sub: string;
    email_verified: boolean;
    name: string;
    telephone: string;
    preferred_username: string;
    org_name: string;
    given_name: string;
    family_name: string;
    email: string;
    id: string;
  }

  // Define custom account properties
  interface Account {
    provider: string;
    type: ProviderType;
    id: string;
    access_token: string;
    refresh_token: string;
    idToken: string;
    expires_in: number; // Relative seconds until expiry (may not be provided by all OIDC providers)
    expires_at: number; // Absolute Unix timestamp in seconds when token expires (provided by Keycloak/NextAuth)
    refresh_expires_in: number;
    token_type: string;
    id_token: string;
    "not-before-policy": number;
    session_state: string;
    scope: string;
  }

  // Define custom profile properties
  interface Profile {
    sub?: string;
    email_verified: boolean;
    name?: string;
    telephone: string;
    preferred_username: string;
    org_name: string;
    given_name: string;
    family_name: string;
    email?: string;
  }
}

// Declare custom JWT properties
declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    refresh_token: string;
    access_token_expired: number; // timestamp in ms when access token expires
    refresh_token_expired: number;
    refresh_expires_in: number;
    expires_in: number;
    user: {
      sub: string;
      email_verified: boolean;
      name: string;
      telephone: string;
      preferred_username: string;
      org_name: string;
      given_name: string;
      family_name: string;
      email: string;
      id: string;
    };
    error?: string | null;
  }
}
