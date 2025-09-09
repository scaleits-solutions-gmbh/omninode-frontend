import { LayoutCenteredXY as LayoutCenteredXYCommon } from "@repo/pkg-frontend-common-kit/components";
import Header from "../header/header";

interface LayoutCenteredXYProps {
  showHeader?: boolean;
  children: React.ReactNode;
}

export default function LayoutCenteredXY({
  children,
  showHeader = true,
}: LayoutCenteredXYProps) {
  return (
    <LayoutCenteredXYCommon showHeader={showHeader} header={<Header />}>
      {children}
    </LayoutCenteredXYCommon>
  );
}
