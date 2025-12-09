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
      srcLight="/assets/logo-light.svg"
      srcDark="/assets/logo-dark.svg"
    />
  );
}
