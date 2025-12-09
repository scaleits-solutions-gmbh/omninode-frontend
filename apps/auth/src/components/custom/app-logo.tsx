import { AppLogo as AppLogoCommon } from "@repo/pkg-frontend-common-kit/components";

interface AppLogoProps {
  size?: "sm" | "md" | "lg";
  customSize?: number;
}

export function AppLogo({ size = "md", customSize }: AppLogoProps) {
  return (
    <AppLogoCommon
      srcLight={"/assets/logo-light.svg"}
      srcDark={"/assets/logo-dark.svg"}
      alt={"OmniNode User Portal Logo"}
      size={size}
      customSize={customSize}
    />
  );
}
