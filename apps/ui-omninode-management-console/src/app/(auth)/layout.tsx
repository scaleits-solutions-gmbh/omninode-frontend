import LayoutCenteredXY from "@/components/layout/layoutCenteredXY/layoutCenteredXY";
import { notFound } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutCenteredXY>
      {children}
    </LayoutCenteredXY>
  );
}
