import { AppLogo as AppLogoCommon } from "@repo/pkg-frontend-common-kit/components";

interface AppLogoDescriptiveProps {
  size?: "sm" | "md" | "lg";
  customSize?: number;
}

export function AppLogoDescriptive({ size, customSize = 53 }: AppLogoDescriptiveProps) {
  return (
    <AppLogoCommon
      size={size}
      customSize={customSize}
      srcLight="/management-console/assets/logo-light.svg"
      srcDark="/management-console/assets/logo-dark.svg"
    />
  );
}
