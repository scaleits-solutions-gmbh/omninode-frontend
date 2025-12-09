
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
      <div className="max-w-4xl w-full mx-auto">{children}</div>
    </BaseLayoutCenteredX>
  );
}
