import { AppLogo as AppLogoCommon } from "@repo/pkg-frontend-common-kit/components";
import { USER_PORTAL_BASE_URL } from "@repo/pkg-frontend-common-kit/constants";
import { getOriginUrl } from "@repo/pkg-frontend-common-kit/utils";
import { useTranslations } from "next-intl";

interface AppLogoProps {
  size?: "sm" | "md" | "lg";
  customSize?: number;
}

export function AppLogo({ size = "md", customSize }: AppLogoProps) {
  const t = useTranslations('components.custom.appLogo');
  
  return (
    <AppLogoCommon
      srcLight={getOriginUrl() + USER_PORTAL_BASE_URL + "/assets/logo-light.svg"}
      srcDark={getOriginUrl() + USER_PORTAL_BASE_URL + "/assets/logo-dark.svg"}
      alt={t('alt')}
      size={size}
      customSize={customSize}
    />
  );
}
