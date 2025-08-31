import { AppLogo as AppLogoCommon } from "frontend-common-kit";

export function AppLogoDescriptive() {
  return (
    <AppLogoCommon
      customSize={64}
      srcLight="/assets/logo-light.svg"
      srcDark="/assets/logo-dark.svg"
    />
  );
}
