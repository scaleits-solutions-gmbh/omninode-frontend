import LayoutCenteredXY from "@/components/layout/layoutCenteredXY/layoutCenteredXY";
import PageContent from "@/features/login/PageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

interface LoginPageProps {
  searchParams: { redirectUrl?: string };
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  return (
    <LayoutCenteredXY showHeader={false}>
      <PageContent searchParams={searchParams} />
    </LayoutCenteredXY>
  );
}