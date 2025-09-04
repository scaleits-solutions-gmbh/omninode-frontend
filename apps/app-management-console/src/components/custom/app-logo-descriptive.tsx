import { AppLogo as AppLogoCommon } from "@repo/pkg-frontend-common-kit/components";

export function AppLogoDescriptive() {
  return (
    <AppLogoCommon
      customSize={53}
      srcLight="/management-console/assets/logo-light.svg"
      srcDark="/management-console/assets/logo-dark.svg"
    />
  );
}
