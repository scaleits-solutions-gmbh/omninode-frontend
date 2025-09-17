import { AppLogo as AppLogoCommon } from "@repo/pkg-frontend-common-kit/components";
import { USER_PORTAL_BASE_URL } from "@repo/pkg-frontend-common-kit/constants";
import { getOriginUrl } from "@repo/pkg-frontend-common-kit/utils";

interface AppLogoProps {
  size?: "sm" | "md" | "lg";
  customSize?: number;
}

export function AppLogo({ size = "md", customSize }: AppLogoProps) {
  return (
    <AppLogoCommon
      srcLight={
        getOriginUrl() + USER_PORTAL_BASE_URL + "/assets/logo-light.svg"
      }
      srcDark={getOriginUrl() + USER_PORTAL_BASE_URL + "/assets/logo-dark.svg"}
      alt={"OmniNode User Portal Logo"}
      size={size}
      customSize={customSize}
    />
  );
}
