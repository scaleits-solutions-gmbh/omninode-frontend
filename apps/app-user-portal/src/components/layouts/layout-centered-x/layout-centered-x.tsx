import { AppLocaleSwitcher } from "@/components/custom/app-locale-switcher";
import { LayoutCenteredX as BaseLayoutCenteredX } from "@repo/pkg-frontend-common-kit/components";
import Header from "../header/header";
interface LayoutCenteredXProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

export default function LayoutCenteredX({
  children,
  showHeader = true,
}: LayoutCenteredXProps) {
  return (
    <BaseLayoutCenteredX showHeader={showHeader} header={<Header />}>
      <div className={"absolute right-8 " + (showHeader ? "bottom-8" : "top-8 ")}>
        <AppLocaleSwitcher />
      </div>
      {children}
    </BaseLayoutCenteredX>
  );
}
