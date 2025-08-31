import { AppLogo as AppLogoCommon } from "@repo/pkg-frontend-common-kit/components";

export function AppLogoDescriptive() {
  return (
    <AppLogoCommon
      customSize={64}
      srcLight="/service-portal/assets/logo-light.svg"
      srcDark="/service-portal/assets/logo-dark.svg"
    />
  );
}
