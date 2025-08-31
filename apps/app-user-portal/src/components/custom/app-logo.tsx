import { AppLogo as AppLogoCommon } from "@repo/pkg-frontend-common-kit/components";
import { useTranslations } from "next-intl";

interface AppLogoProps {
  size?: "sm" | "md" | "lg";
  customSize?: number;
}

export function AppLogo({ size = "md", customSize }: AppLogoProps) {
  const t = useTranslations('components.custom.appLogo');
  
  return (
    <AppLogoCommon
      srcLight="user-portal/assets/logo-light.svg"
      srcDark="user-portal/assets/logo-dark.svg"
      alt={t('alt')}
      size={size}
      customSize={customSize}
    />
  );
}
